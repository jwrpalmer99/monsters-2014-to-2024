import {
  MODULE_ID,
  applyUpdatesToData,
  buildInitiativeUpdate,
  buildUpdateSummary,
  escapeHtml,
  getMultiattackTemplate,
  parseCR,
  renderDiffHtml,
  snapshotFromData
} from "./conversion-utils.js";
import { buildIntelligentPlan } from "./modes/intelligent.js";
import { buildBlogPlan } from "./modes/blog.js";
import { buildA5ePlan } from "./modes/a5e.js";
import { buildSrdReplacement, findSrdMatch } from "./modes/srd.js";

function applyUpdatesWithCreates(actorData, updates, itemUpdates, itemCreates) {
  return applyUpdatesToData(actorData, updates, itemUpdates, itemCreates);
}

function applyUpdatesToRollData(rollData, updates) {
  if (!rollData || !updates) return rollData;
  const map = {
    "system.attributes.hp.max": "attributes.hp.max",
    "system.attributes.hp.value": "attributes.hp.value",
    "system.attributes.ac.value": "attributes.ac.value",
    "system.attributes.prof": "attributes.prof",
    "system.attributes.init.mod": "attributes.init.mod",
    "system.attributes.init.bonus": "attributes.init.bonus",
    "system.attributes.init.ability": "attributes.init.ability"
  };
  for (const [path, value] of Object.entries(updates)) {
    const target = map[path];
    if (!target) continue;
    foundry.utils.setProperty(rollData, target, value);
  }
  return rollData;
}

async function createBackup(actor, backupMode, backupOptions = {}) {
  if (!backupMode || backupMode === "none") return;
  const actorData = actor.toObject();
  if (backupMode === "duplicate" && !actor.pack) {
    const name = `${actor.name} (2014 backup)`;
    await actor.collection.documentClass.create({ ...actorData, name });
    return;
  }
  if (backupMode === "journal") {
    const content = `<pre>${escapeHtml(JSON.stringify(actorData, null, 2))}</pre>`;
    const journalId = backupOptions.backupJournalId ?? game.settings.get(MODULE_ID, "backupJournalId");
    if (journalId) {
      const existing = await fromUuid(journalId).catch(() => null);
      const entry = existing?.documentName === "JournalEntry"
        ? existing
        : game.journal.get(journalId);
      if (!entry) {
        ui.notifications.warn("Backup journal entry not found.");
        return;
      }
      await entry.createEmbeddedDocuments("JournalEntryPage", [
        {
          name: `Snapshot: ${actor.name}`,
          type: "text",
          text: {
            content,
            format: 1
          }
        }
      ]);
      return;
    }
    await JournalEntry.create({
      name: `Backup: ${actor.name}`,
      pages: [
        {
          name: "Snapshot",
          type: "text",
          text: {
            content,
            format: 1
          }
        }
      ]
    });
  }
  if (backupMode === "compendium") {
    const packIdRaw = backupOptions.backupCompendiumId ?? game.settings.get(MODULE_ID, "backupCompendiumId");
    const packId = String(packIdRaw ?? "").trim();
    let pack = packId ? game.packs.get(packId) : null;
    if (!pack && packId) {
      pack = game.packs.find((p) => String(p.collection || "").toLowerCase() === packId.toLowerCase())
        ?? game.packs.find((p) => String(p.title || "").toLowerCase() === packId.toLowerCase());
    }
    if (!pack) {
      ui.notifications.warn("Backup compendium not found.");
      return;
    }
    if (pack.documentName !== "Actor") {
      ui.notifications.warn("Backup compendium must be an Actor pack.");
      return;
    }
    if (pack.locked) {
      ui.notifications.warn("Backup compendium is locked.");
      return;
    }
    await pack.importDocument(actor);
  }
}

export function buildPreview(actor, planData) {
  const rollData = actor.getRollData?.() ?? {};
  const before = snapshotFromData(actor.toObject(), rollData);
  const afterData = applyUpdatesWithCreates(
    actor.toObject(),
    planData.updates,
    planData.itemUpdates,
    planData.itemCreates
  );
  const afterRoll = applyUpdatesToRollData(foundry.utils.duplicate(rollData), planData.updates);
  const after = snapshotFromData(afterData, afterRoll);
  return {
    before,
    after,
    html: renderDiffHtml(before, after)
  };
}

export async function previewActorConversion(actor, options = {}) {
  const multiattackTemplate = await getMultiattackTemplate();
  const planOptions = { ...options, multiattackTemplate };
  const modeRaw = options.mode ?? "inbuilt";
  const mode = modeRaw === "intelligent" ? "inbuilt" : modeRaw;
  if (mode === "srd") {
    const packId = options.srdPackId ?? game.settings.get(MODULE_ID, "srdPackId");
    const pack = game.packs.get(packId);
    if (!pack) {
      const fallbackPlan = buildIntelligentPlan(actor, planOptions);
      const fallback = buildPreview(actor, fallbackPlan);
      return {
        ...fallback,
        html: `<p>SRD pack not found. Using inbuilt preview.</p>${fallback.html}`,
        matched: false,
        plan: fallbackPlan
      };
    }
    const srdActor = await findSrdMatch(actor, pack);
    if (!srdActor) {
      const fallbackPlan = buildIntelligentPlan(actor, planOptions);
      const fallback = buildPreview(actor, fallbackPlan);
      return {
        ...fallback,
        html: `<p>No SRD match found. Using inbuilt preview.</p>${fallback.html}`,
        matched: false,
        plan: fallbackPlan
      };
    }
    const { updateData, items } = buildSrdReplacement(actor, srdActor);
    const before = snapshotFromData(actor.toObject(), actor.getRollData?.() ?? {});
    const afterData = { ...updateData, items };
    const afterRollData = srdActor?.getRollData?.() ?? actor.getRollData?.() ?? {};
    const after = snapshotFromData(afterData, afterRollData);
    return {
      before,
      after: { ...after, attackSaveRemoved: [] },
      html: renderDiffHtml(before, after),
      matched: true,
      plan: {
        updates: updateData,
        itemUpdates: [],
        itemCreates: items,
        attackSaveRemoved: []
      }
    };
  }

  if (mode === "blog") {
    const plan = buildBlogPlan(actor, planOptions);
    const preview = buildPreview(actor, plan);
    preview.targets = plan.targets;
    preview.plan = plan;
    preview.after.attackSaveRemoved = plan.attackSaveRemoved ?? [];
    return preview;
  }

  if (mode === "a5e" || mode === "a5e-easy" || mode === "a5e-hard") {
    const dcMode = mode === "a5e-easy" ? "easy" : "hard";
    const plan = buildA5ePlan(actor, { ...planOptions, a5eDcMode: dcMode });
    const preview = buildPreview(actor, plan);
    preview.targets = plan.targets;
    preview.plan = plan;
    preview.after.attackSaveRemoved = plan.attackSaveRemoved ?? [];
    return preview;
  }

  const plan = buildIntelligentPlan(actor, planOptions);
  const preview = buildPreview(actor, plan);
  preview.targets = plan.targets;
  preview.after.detectedRole = plan.role;
  preview.plan = plan;
  preview.after.attackSaveRemoved = plan.attackSaveRemoved ?? [];
  return preview;
}

export async function convertActorTo2024(actor, options = {}) {
  if (!actor) return;
  if (actor.type !== "npc") {
    ui.notifications.warn("Only NPC actors are supported.");
    return;
  }

  const already = actor.getFlag(MODULE_ID, "converted2024");
  if (already && !options.force) {
    ui.notifications.info(`${actor.name} is already flagged as converted.`);
    return;
  }

  const multiattackTemplate = await getMultiattackTemplate();
  const planOptions = { ...options, multiattackTemplate };
  const modeRaw = options.mode ?? "inbuilt";
  const mode = modeRaw === "intelligent" ? "inbuilt" : modeRaw;
  const backupMode = options.backupMode ?? game.settings.get(MODULE_ID, "backupMode");

  if (mode === "srd") {
    const packId = options.srdPackId ?? game.settings.get(MODULE_ID, "srdPackId");
    const pack = game.packs.get(packId);
    if (!pack) {
      ui.notifications.warn("SRD pack not found. Falling back to inbuilt scaling.");
    } else {
      const srdActor = await findSrdMatch(actor, pack);
      if (srdActor) {
        if (options.dryRun) {
          return previewActorConversion(actor, options);
        }
        await createBackup(actor, backupMode, options);
        const { updateData, items } = buildSrdReplacement(actor, srdActor);
        delete updateData.items;

        const existingIds = actor.items.map((item) => item.id);
        await actor.update(updateData, { diff: false, recursive: false });
        if (existingIds.length) {
          await actor.deleteEmbeddedDocuments("Item", existingIds);
        }
        if (items.length) {
          await actor.createEmbeddedDocuments("Item", items);
        }
        await actor.update(
          buildInitiativeUpdate(
            actor,
            foundry.utils.getProperty(actor, "system.attributes.prof"),
            parseCR(foundry.utils.getProperty(actor, "system.details.cr"))
          )
        );
        await actor.setFlag(MODULE_ID, "converted2024", true);
        await actor.setFlag(MODULE_ID, "convertedAt", new Date().toISOString());
        await actor.setFlag(MODULE_ID, "conversionMode", "srd");
        ui.notifications.info(`${actor.name}: matched SRD and updated.`);
        return;
      }
      ui.notifications.info("No SRD match found. Falling back to inbuilt scaling.");
    }
  }

  if (mode === "blog") {
    const plan = buildBlogPlan(actor, planOptions);
    if (options.dryRun) {
      return buildPreview(actor, plan);
    }
    await createBackup(actor, backupMode, options);
    const updates = plan.updates;
    const itemUpdates = plan.itemUpdates;
    const itemCreates = plan.itemCreates ?? [];

    updates["flags.monsters-2014-to-2024.converted2024"] = true;
    updates["flags.monsters-2014-to-2024.convertedAt"] = new Date().toISOString();
    updates["flags.monsters-2014-to-2024.conversionMode"] = "blog";
    updates["flags.monsters-2014-to-2024.inferredCR"] = plan.cr;
    updates["flags.monsters-2014-to-2024.blogRow"] = plan.blogRow;

    await actor.update(updates);
    if (itemUpdates.length) {
      await actor.updateEmbeddedDocuments("Item", itemUpdates);
    }
    if (itemCreates.length) {
      await actor.createEmbeddedDocuments("Item", itemCreates);
    }

    const summary = buildUpdateSummary(actor, updates, itemUpdates);
    ui.notifications.info(summary || `${actor.name}: conversion complete.`);
    return;
  }

  if (mode === "a5e") {
    const plan = buildA5ePlan(actor, planOptions);
    if (options.dryRun) {
      return buildPreview(actor, plan);
    }
    await createBackup(actor, backupMode, options);
    const updates = plan.updates;
    const itemUpdates = plan.itemUpdates;
    const itemCreates = plan.itemCreates ?? [];

    updates["flags.monsters-2014-to-2024.converted2024"] = true;
    updates["flags.monsters-2014-to-2024.convertedAt"] = new Date().toISOString();
    updates["flags.monsters-2014-to-2024.conversionMode"] = "a5e";
    updates["flags.monsters-2014-to-2024.inferredCR"] = plan.cr;
    updates["flags.monsters-2014-to-2024.a5eRow"] = plan.a5eRow;
    updates["flags.monsters-2014-to-2024.a5eDcMode"] = plan.a5eDcMode;

    await actor.update(updates);
    if (itemUpdates.length) {
      await actor.updateEmbeddedDocuments("Item", itemUpdates);
    }
    if (itemCreates.length) {
      await actor.createEmbeddedDocuments("Item", itemCreates);
    }

    const summary = buildUpdateSummary(actor, updates, itemUpdates);
    ui.notifications.info(summary || `${actor.name}: conversion complete.`);
    return;
  }

  const plan = buildIntelligentPlan(actor, planOptions);
  if (options.dryRun) {
    return buildPreview(actor, plan);
  }

  await createBackup(actor, backupMode, options);
  const updates = plan.updates;
  const itemUpdates = plan.itemUpdates;
  const itemCreates = plan.itemCreates ?? [];

  updates["flags.monsters-2014-to-2024.converted2024"] = true;
  updates["flags.monsters-2014-to-2024.convertedAt"] = new Date().toISOString();
  updates["flags.monsters-2014-to-2024.conversionMode"] = "inbuilt";
  updates["flags.monsters-2014-to-2024.inferredCR"] = plan.cr;
  updates["flags.monsters-2014-to-2024.detectedRole"] = plan.role;

  await actor.update(updates);
  if (itemUpdates.length) {
    await actor.updateEmbeddedDocuments("Item", itemUpdates);
  }
  if (itemCreates.length) {
    await actor.createEmbeddedDocuments("Item", itemCreates);
  }

  const summary = buildUpdateSummary(actor, updates, itemUpdates);
  ui.notifications.info(summary || `${actor.name}: conversion complete.`);
}
