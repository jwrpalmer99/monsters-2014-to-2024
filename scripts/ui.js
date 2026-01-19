import { convertActorTo2024, previewActorConversion } from "./conversion.js";
import { buildInitiativeUpdate, escapeHtml, snapshotFromData, stripSaveFromAttackActivities } from "./conversion-utils.js";

const MODULE_ID = "monsters-2014-to-2024";
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class PreviewApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "m1424-preview",
    position: {
      width: 1100,
      height: 700
    },
    classes: ["m1424-preview"],
    window: {
      title: "Preview",
      resizable: true
    }
  };

  static PARTS = {
    content: {
      template: "modules/monsters-2014-to-2024/templates/preview.hbs"
    }
  };

  constructor(title, html, comparison) {
    super();
    this.options.window.title = title;
    this.previewHtml = html;
    this.comparison = comparison;
  }

  async _prepareContext() {
    return {
      content: this.previewHtml
    };
  }

  async _onRender(...args) {
    await super._onRender(...args);
    this.attachListeners();
    const root = this.element?.[0] ?? this.element;
    if (root) {
      const needsWidth = root.querySelector(".m1424-attack-save-list");
      if (needsWidth) {
        this.setPosition({ width: 1200, height: 720 });
      }
    }
  }

  attachListeners() {
    const root = this.element?.[0] ?? this.element;
    if (!root) return;
    const table = root.querySelector(".m1424-compare-table");
    if (!table) return;

    const clearRow = (rowKey) => {
      for (const cell of table.querySelectorAll(`td[data-row="${rowKey}"]`)) {
        cell.classList.remove("m1424-picked");
      }
    };
    const updateRowDefault = (rowKey) => {
      const row = table.querySelector(`tr[data-row="${rowKey}"]`);
      if (!row) return;
      const picked = row.querySelector("td.m1424-picked");
      const original = row.querySelector(`td[data-row="${rowKey}"][data-mode="original"]`);
      if (!original) return;
      original.classList.toggle("m1424-default", !picked);
    };

    for (const row of table.querySelectorAll("tr[data-row]")) {
      updateRowDefault(row.dataset.row);
    }

    table.addEventListener("click", (event) => {
      if (event.target?.classList?.contains("m1424-attack-save-toggle")) {
        event.stopPropagation();
        return;
      }
      const header = event.target.closest("th[data-mode]");
      if (header) {
        const modeKey = header.dataset.mode;
        for (const row of table.querySelectorAll("tr[data-row]")) {
          const rowKey = row.dataset.row;
          const cell = row.querySelector(`td[data-row="${rowKey}"][data-mode="${modeKey}"]`);
          if (!cell) continue;
          clearRow(rowKey);
          cell.classList.add("m1424-picked");
          updateRowDefault(rowKey);
        }
        return;
      }

      const cell = event.target.closest("td[data-row][data-mode]");
      if (!cell) return;
      const rowKey = cell.dataset.row;
      if (cell.classList.contains("m1424-picked")) {
        cell.classList.remove("m1424-picked");
        updateRowDefault(rowKey);
        return;
      }
      clearRow(rowKey);
      cell.classList.add("m1424-picked");
      updateRowDefault(rowKey);
    });

    const button = root.querySelector(".m1424-update-selected");
    if (button) {
      button.addEventListener("click", () => this.applySelectedUpdates(root, false));
    }
    const replaceButton = root.querySelector(".m1424-update-selected-replace");
    if (replaceButton) {
      replaceButton.addEventListener("click", () => this.applySelectedUpdates(root, true));
    }
  }

  async applySelectedUpdates(root, replaceInScenes) {
    const comparison = this.comparison;
    if (!comparison) return;
    const actor = game.actors.get(comparison.actorId);
    if (!actor) return;

    const table = root.querySelector(".m1424-compare-table");
    if (!table) return;

    const selectedByRow = {};
    for (const row of table.querySelectorAll("tr[data-row]")) {
      const rowKey = row.dataset.row;
      const picked = row.querySelector("td.m1424-picked");
      if (picked) selectedByRow[rowKey] = picked.dataset.mode;
    }

    const selectedModes = Object.values(selectedByRow).filter((mode) => mode && mode !== "original");
    if (!selectedModes.length) {
      ui.notifications.warn("No non-original selections made. Click a column header or a cell first.");
      return;
    }

    const modeByKey = new Map(comparison.results.map((result) => [result.key, result]));
    const updates = {};
    const itemUpdates = [];
    const itemCreates = [];
    const actorItemsById = new Map(actor.items.map((item) => [item.id, item]));

    const mergeUpdates = (target, source) => {
      if (!source) return;
      for (const [path, value] of Object.entries(source)) {
        target[path] = value;
      }
    };
    const computeAbilityMod = (ability) => {
      if (!ability) return 0;
      if (typeof ability.mod === "number") return ability.mod;
      const score = ability.value ?? ability.score ?? ability.base;
      if (typeof score === "number") return Math.floor((score - 10) / 2);
      return 0;
    };

    const filterItemUpdate = (update, allowedPrefixes) => {
      const filtered = { _id: update._id };
      for (const [path, value] of Object.entries(update)) {
        if (path === "_id") continue;
        if (allowedPrefixes.some((prefix) => path.startsWith(prefix))) {
          filtered[path] = value;
        }
      }
      return Object.keys(filtered).length > 1 ? filtered : null;
    };
    const getActivityEntries = (activities) => {
      if (!activities) return [];
      if (typeof activities.entries === "function") return Array.from(activities.entries());
      if (Array.isArray(activities.entries)) return activities.entries;
      return Object.entries(activities);
    };
    const collectSaveDcUpdates = (item, targetDc) => {
      const update = { _id: item.id };
      if (foundry.utils.hasProperty(item, "system.save.dc")) {
        update["system.save.dc"] = targetDc;
      }
      const desc = foundry.utils.getProperty(item, "system.description.value");
      if (typeof desc === "string" && desc.length) {
        let updatedDesc = desc.replace(/\bDC\s*\d+\b/gi, `DC ${targetDc}`);
        updatedDesc = updatedDesc.replace(
          /\[\[\/save\s+([a-zA-Z]+)\s+\d+([^\]]*)\]\]/g,
          `[[/save $1 ${targetDc}$2]]`
        );
        if (updatedDesc !== desc) {
          update["system.description.value"] = updatedDesc;
        }
      }
      const activities = foundry.utils.getProperty(item, "system.activities");
      for (const [id, activity] of getActivityEntries(activities)) {
        const hasSave = foundry.utils.hasProperty(activity, "save.ability")
          || foundry.utils.hasProperty(activity, "save.dc")
          || foundry.utils.hasProperty(activity, "save.formula");
        if (!hasSave) continue;
        if (foundry.utils.hasProperty(activity, "save.dc.value")) {
          update[`system.activities.${id}.save.dc.value`] = targetDc;
        }
        if (foundry.utils.hasProperty(activity, "save.dc.formula")) {
          update[`system.activities.${id}.save.dc.formula`] = String(targetDc);
        } else if (foundry.utils.hasProperty(activity, "save.dc")) {
          update[`system.activities.${id}.save.dc`] = targetDc;
        }
      }
      return Object.keys(update).length > 1 ? update : null;
    };

    const includeMultiattack = (update) => {
      const item = actorItemsById.get(update._id);
      if (!item) return false;
      return String(item.name || "").toLowerCase().includes("multiattack");
    };

    const STAT_PATHS = {
      hp: ["system.attributes.hp.max", "system.attributes.hp.value"],
      ac: ["system.attributes.ac.value"],
      prof: ["system.attributes.prof"],
      init: ["system.attributes.init.bonus", "system.attributes.init.ability", "system.attributes.init.mod"]
    };

    for (const [rowKey, modeKey] of Object.entries(selectedByRow)) {
      if (modeKey === "original") continue;
      const result = modeByKey.get(modeKey);
      if (!result?.plan) continue;
      const plan = result.plan;

      if (STAT_PATHS[rowKey]) {
        if (rowKey === "init") {
          const profValue = plan.updates?.["system.attributes.prof"] ?? actor.system.attributes.prof ?? 2;
          const initUpdates = buildInitiativeUpdate(actor.toObject(), profValue, plan.cr);
          mergeUpdates(updates, initUpdates);
        } else {
          const allowed = new Set(STAT_PATHS[rowKey]);
          const filtered = {};
          for (const [path, value] of Object.entries(plan.updates || {})) {
            if (allowed.has(path)) filtered[path] = value;
          }
          mergeUpdates(updates, filtered);
        }
        continue;
      }

      if (rowKey === "attack") {
        for (const update of plan.itemUpdates || []) {
          const filtered = filterItemUpdate(update, ["system.attackBonus", "system.attack.bonus"]);
          if (filtered) itemUpdates.push(filtered);
        }
        continue;
      }

      if (rowKey === "save") {
        const targetDc =
          plan.targets?.dc
          ?? result?.after?.save?.max
          ?? result?.after?.save?.min;
        if (typeof targetDc === "number") {
          for (const item of actor.items) {
            const update = collectSaveDcUpdates(item, targetDc);
            if (update) itemUpdates.push(update);
          }
        }
        continue;
      }

      if (rowKey === "saves") {
        const srdAbilities = result?.plan?.updates?.system?.abilities;
        if (srdAbilities && typeof srdAbilities === "object") {
          const saveUpdates = {};
          const pb = result?.plan?.updates?.system?.attributes?.prof ?? actor.system.attributes.prof ?? 2;
          for (const [key, ability] of Object.entries(srdAbilities)) {
            if (!ability || typeof ability !== "object") continue;
            const proficient = ability.proficient ?? ability.proficiency;
            if (!proficient) continue;
            if (foundry.utils.hasProperty(actor, `system.abilities.${key}.proficient`)) {
              saveUpdates[`system.abilities.${key}.proficient`] = proficient;
            }
            if (foundry.utils.hasProperty(actor, `system.abilities.${key}.proficiency`)) {
              saveUpdates[`system.abilities.${key}.proficiency`] = proficient;
            }
            if (typeof ability.save === "number") {
              saveUpdates[`system.abilities.${key}.save`] = ability.save;
            } else {
              const mod = computeAbilityMod(ability);
              saveUpdates[`system.abilities.${key}.save`] = mod + proficient * pb;
            }
          }
          mergeUpdates(updates, saveUpdates);
        } else {
          const savesList = result?.after?.saves ?? [];
          if (savesList.length) {
            const saveUpdates = {};
            for (const entry of savesList) {
              if (!entry?.key || typeof entry.value !== "number") continue;
              saveUpdates[`system.abilities.${entry.key}.save`] = entry.value;
            }
            mergeUpdates(updates, saveUpdates);
          }
        }
        continue;
      }

      if (rowKey === "attackSaveRemoved") {
        if (game.settings.get(MODULE_ID, "removeAttackSave")) {
          const cell = table.querySelector(`td[data-row="${rowKey}"][data-mode="${modeKey}"]`);
          const selectedIds = cell
            ? Array.from(cell.querySelectorAll("input.m1424-attack-save-toggle:checked"))
              .map((input) => input.dataset.itemId)
              .filter(Boolean)
            : [];
          for (const itemId of selectedIds) {
            const item = actor.items.get(itemId);
            if (!item) continue;
            const stripUpdate = stripSaveFromAttackActivities(item);
            if (stripUpdate) itemUpdates.push(stripUpdate);
          }
        }
        continue;
      }

      if (rowKey === "multiattack") {
        for (const update of plan.itemUpdates || []) {
          if (includeMultiattack(update)) itemUpdates.push(update);
        }
        for (const created of plan.itemCreates || []) {
          if (String(created.name || "").toLowerCase().includes("multiattack")) {
            itemCreates.push(created);
          }
        }
      }
    }

    if (!Object.keys(updates).length && !itemUpdates.length && !itemCreates.length) {
      ui.notifications.warn("No applicable updates found for the selected cells.");
      return;
    }

    const backupMode = comparison.backupMode ?? game.settings.get(MODULE_ID, "backupMode");
    const backupMessage = (() => {
      if (backupMode === "duplicate") return "A duplicate backup actor will be created. The original will be updated.";
      if (backupMode === "journal") return "A Journal snapshot backup will be created. The original will be updated.";
      if (backupMode === "compendium") return "A compendium snapshot backup will be created. The original will be updated.";
      return "No backup will be created. The original will be updated.";
    })();
    const replaceNote = replaceInScenes
      ? "Unlinked tokens in scenes will be updated to the new actor data."
      : "";
    const confirmed = await new Promise((resolve) => {
      const dialog = new Dialog({
        title: "Update Monster",
        content: `<p>Apply the selected changes to ${actor.name}?</p><p>${backupMessage}</p>${replaceNote ? `<p>${replaceNote}</p>` : ""}`,
        buttons: {
          yes: {
            label: "Update",
            callback: () => resolve(true)
          },
          no: {
            label: "Cancel",
            callback: () => resolve(false)
          }
        },
        default: "no",
        close: () => resolve(false)
      });
      dialog.render(true);
    });
    if (!confirmed) return;

    await createBackup(actor, backupMode);
    if (Object.keys(updates).length) {
      await actor.update(updates);
    }
    if (itemUpdates.length) {
      const merged = new Map();
      for (const update of itemUpdates) {
        const existing = merged.get(update._id) || { _id: update._id };
        for (const [path, value] of Object.entries(update)) {
          if (path === "_id") continue;
          existing[path] = value;
        }
        merged.set(update._id, existing);
      }
      await actor.updateEmbeddedDocuments("Item", Array.from(merged.values()));
    }
    if (itemCreates.length) {
      const seen = new Set();
      const deduped = [];
      for (const created of itemCreates) {
        const key = `${created.type || ""}::${String(created.name || "").toLowerCase()}`;
        if (seen.has(key)) continue;
        seen.add(key);
        deduped.push(created);
      }
      await actor.createEmbeddedDocuments("Item", deduped);
    }
    const uniqueModes = Array.from(new Set(selectedModes));
    const conversionMode = uniqueModes.length === 1 ? uniqueModes[0] : "mixed";
    await actor.update({
      "flags.monsters-2014-to-2024.converted2024": true,
      "flags.monsters-2014-to-2024.convertedAt": new Date().toISOString(),
      "flags.monsters-2014-to-2024.conversionMode": conversionMode
    });
    if (replaceInScenes) {
      await this.replaceInScenes(actor);
    }
    ui.notifications.info(`${actor.name} updated from selected preview values.`);
  }

  async replaceInScenes(actor) {
    if (!game.scenes) return;
    const actorData = actor.toObject();
    for (const scene of game.scenes) {
      const updates = [];
      for (const token of scene.tokens) {
        if (token.actorId !== actor.id) continue;
        if (token.actorLink) continue;
        updates.push({ _id: token.id, actorData });
      }
      if (updates.length) {
        await scene.updateEmbeddedDocuments("Token", updates);
      }
    }
  }
}

function getDefaultOptions() {
  return {
    mode: "inbuilt",
    srdPackId: game.settings.get(MODULE_ID, "srdPackId"),
    backupMode: game.settings.get(MODULE_ID, "backupMode"),
    dryRun: false
  };
}

function buildPackOptions(selectedId) {
  const packs = game.packs.filter((pack) => pack.documentName === "Actor");
  return packs
    .map((pack) => {
      const selected = pack.collection === selectedId ? "selected" : "";
      return `<option value="${pack.collection}" ${selected}>${pack.title} (${pack.collection})</option>`;
    })
    .join("");
}

function getFormData(html) {
  const form = html[0].querySelector("form");
  const data = new FormData(form);
  return {
    mode: data.get("mode"),
    srdPackId: data.get("srdPackId"),
    backupMode: data.get("backupMode"),
    dryRun: data.get("dryRun") === "on",
    target: data.get("target"),
    folderId: data.get("folderId"),
    packId: data.get("packId")
  };
}

function renderPreviewDialog(title, html, comparison) {
  if (ApplicationV2 && HandlebarsApplicationMixin) {
    const app = new PreviewApp(title, html, comparison);
    app.render(true);
    return app;
  }
  new Dialog({
    title,
    content: html,
    buttons: {
      ok: { label: "Close" }
    }
  }).render(true);
}

async function createBackup(actor, backupMode) {
  if (!backupMode || backupMode === "none") return;
  const actorData = actor.toObject();
  if (backupMode === "duplicate" && !actor.pack) {
    const name = `${actor.name} (2014 backup)`;
    await actor.collection.documentClass.create({ ...actorData, name });
    return;
  }
  if (backupMode === "journal") {
    const content = `<pre>${foundry.utils.escapeHTML(JSON.stringify(actorData, null, 2))}</pre>`;
    const journalId = game.settings.get(MODULE_ID, "backupJournalId");
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
    const packIdRaw = game.settings.get(MODULE_ID, "backupCompendiumId");
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

function formatPreviewTitle(actor, baseTitle) {
  const cr = foundry.utils.getProperty(actor, "system.details.cr");
  const suffix = cr === null || cr === undefined || cr === "" ? "" : ` [CR ${cr}]`;
  const converted = foundry.utils.getProperty(actor, "flags.monsters-2014-to-2024.converted2024");
  const convertedTag = converted ? " [Already Converted]" : "";
  return `${baseTitle}${suffix}${convertedTag}`;
}



export async function openActorPreviewComparison(actor) {
  const defaults = getDefaultOptions();
  const modes = [
    { key: "inbuilt", label: "Inbuilt Scaling" },
    { key: "srd", label: "Match SRD 5.2" },
    { key: "blog", label: "Blog of Holding" },
    { key: "a5e-easy", label: "A5E Monster (Easy DC)" },
    { key: "a5e-hard", label: "A5E Monster (Hard DC)" }
  ];

  
  const base = snapshotFromData(actor.toObject(), actor.getRollData?.() ?? {});
  const acLive = actor?.system?.attributes?.ac?.value;
  if (typeof acLive === "number") {
    base.ac = acLive;
  }
  base.attackSaveRemoved = [];
  
  const results = [];
  const roleLines = [];
  let srdMatched = false;
  for (const mode of modes) {
    const preview = await previewActorConversion(actor, {
      mode: mode.key,
      srdPackId: defaults.srdPackId,
      dryRun: true
    });
    if (mode.key === "srd" && preview?.matched) srdMatched = true;
    if (mode.key === "srd" && preview?.matched === false) continue;
    results.push({
      key: mode.key,
      mode: mode.label,
      before: preview?.before,
      after: preview?.after,
      targets: preview?.targets,
      plan: preview?.plan
    });
    if (mode.key === "inbuilt" && preview?.after?.detectedRole) {
      roleLines.push(`Detected Role: ${preview.after.detectedRole}`);
    }
  }

  const formatRange = (summary) => {
    if (!summary) return "-";
    return summary.min === summary.max ? `${summary.min}` : `${summary.min}-${summary.max}`;
  };
  const formatSaves = (saves) => {
    if (!saves?.length) return "-";
    return saves.map((s) => `${s.key} ${s.value}`).join(", ");
  };
  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") {
      if ("value" in value) return value.value;
      return JSON.stringify(value);
    }
    return value;
  };
  const isNumber = (value) => typeof value === "number" && !Number.isNaN(value);
  const buildAttackSaveHtml = (items) => {
    if (!items?.length) return "-";
    return `
      <div class="m1424-attack-save-list">
        ${items.map((entry) => `
          <label class="m1424-attack-save-option">
            <input class="m1424-attack-save-toggle" type="checkbox" data-item-id="${entry.id}" checked />
            <span class="m1424-attack-save-name">${escapeHtml(entry.name)}</span>
          </label>
        `).join("")}
      </div>
    `;
  };

  const rows = [
    {
      label: "HP",
      key: "hp",
      format: (snap) => `${snap.hp.value}/${snap.hp.max}`,
      compare: (snap) => snap.hp?.max
    },
    { label: "AC", key: "ac", compare: (snap) => snap.ac },
    { label: "Proficiency", key: "prof", compare: (snap) => snap.prof },
    { label: "Initiative", key: "init", compare: (snap) => snap.init },
    {
      label: "Attack Bonus",
      key: "attack",
      format: (snap) => formatRange(snap.attack),
      compare: (snap) => snap.attack?.max ?? snap.attack?.min,
      useTargets: "attack"
    },
    {
      label: "Save DC",
      key: "save",
      format: (snap) => formatRange(snap.save),
      compare: (snap) => snap.save?.max ?? snap.save?.min,
      useTargets: "dc"
    },
    { label: "Saves", key: "saves", format: (snap) => formatSaves(snap.saves) },
    ...(srdMatched ? [{ label: "Senses", key: "senses" }] : []),
    { label: "Resistances", key: "resistances" },
    { label: "Immunities", key: "immunities" },
    { label: "Vulnerabilities", key: "vulnerabilities" },
    { label: "Condition Immunities", key: "conditionImmunities" },
    ...(game.settings.get(MODULE_ID, "removeAttackSave")
      ? [{ label: "Attack Save Removed", key: "attackSaveRemoved" }]
      : []),
    {
      label: "Multiattack",
      key: "multiattack",
      compare: (snap) => snap.multiattackCount ?? null
    }
  ];

  const header = `<tr><th>Stat</th><th data-mode="original">Original</th>${results.map((result) => `<th data-mode="${result.key}">${result.mode}</th>`).join("")}</tr>`;
  const body = rows.map((row) => {
    const baseValue = row.useTargets ? (row.format ? row.format(base) : base[row.key]) : (row.format ? row.format(base) : base[row.key]);
    const baseCompare = row.compare ? row.compare(base) : null;
    const cells = results.map((result) => {
      const after = result.after ?? {};
      const afterValue = row.useTargets
        ? result?.targets?.[row.useTargets] ?? (row.format ? row.format(after) : after[row.key])
        : (row.format ? row.format(after) : after[row.key]);
      const afterCompare = row.compare ? row.compare(after) : null;
      let cellClass = "m1424-compare-cell";
      const numericComparable = isNumber(baseCompare) && isNumber(afterCompare);
      if (numericComparable && baseCompare !== afterCompare) {
        cellClass += afterCompare > baseCompare ? " m1424-inc" : " m1424-dec";
      } else if (!numericComparable && formatValue(baseValue) !== formatValue(afterValue)) {
        cellClass += " m1424-change";
      }
      const cellContent = row.key === "attackSaveRemoved"
        ? buildAttackSaveHtml(afterValue)
        : formatValue(afterValue);
      return `<td class="${cellClass}" data-row="${row.key}" data-mode="${result.key}">${cellContent}</td>`;
    });
    const baseContent = row.key === "attackSaveRemoved"
      ? buildAttackSaveHtml(baseValue)
      : formatValue(baseValue);
    return `<tr data-row="${row.key}"><td class="m1424-compare-stat">${row.label}</td><td class="m1424-compare-cell" data-row="${row.key}" data-mode="original">${baseContent}</td>${cells.join("")}</tr>`;
  }).join("");

  const roleBlock = roleLines.length ? `<p class="m1424-role">${roleLines.join(" ")}</p>` : "";
  const content = `
    ${roleBlock}
    <table class="m1424-compare-table">
      <thead>${header}</thead>
      <tbody>${body}</tbody>
    </table>
    <div class="m1424-compare-actions">
      <button type="button" class="m1424-update-selected">Update Monster</button>
      <button type="button" class="m1424-update-selected-replace">Update and Replace in Scenes</button>
    </div>
  `;

  renderPreviewDialog(formatPreviewTitle(actor, `Preview: ${actor.name}`), content, {
    actorId: actor.id,
    results,
    backupMode: defaults.backupMode
  });
}
