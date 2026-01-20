import { convertActorTo2024, previewActorConversion } from "./conversion.js";
import { buildInitiativeUpdate, escapeHtml, getExpectedAttacksByCR, isLegendary, parseCR, snapshotFromData, stripSaveFromAttackActivities } from "./conversion-utils.js";

const MODULE_ID = "monsters-2014-to-2024";
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

function formatRange(summary) {
  if (!summary) return "-";
  return summary.min === summary.max ? `${summary.min}` : `${summary.min}-${summary.max}`;
}

function formatSaves(saves) {
  if (!saves?.length) return "-";
  return saves.map((s) => `${s.key} ${s.value}`).join(", ");
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    if ("value" in value) return value.value;
    return JSON.stringify(value);
  }
  return value;
}

function buildAttackSaveHtml(items) {
  if (!Array.isArray(items) || !items.length) return "-";
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
}

function buildSuggestionsHtml(actor, snapshot, crValue) {
  const suggestions = [];
  const details = actor?.system?.details ?? {};
  const typeValue = String(details?.type?.value ?? details?.type ?? "").toLowerCase();
  const subtypeValue = String(details?.type?.subtype ?? "").toLowerCase();
  const isDragon = typeValue.includes("dragon") || subtypeValue.includes("dragon");
  const legendary = isLegendary(actor);
  const crLabel = Number.isFinite(crValue) && crValue > 0 ? `CR ${crValue}` : "this CR";
  const expectedHp = Number.isFinite(crValue) && crValue > 0 ? getExpectedHpByCr(crValue) : null;
  const actualHp = Number(snapshot?.hp?.max);

  if (Number.isFinite(actualHp) && Number.isFinite(expectedHp)) {
    if (actualHp > expectedHp) {
      suggestions.push(
        `The original hit points are above the (2014) ${crLabel} average (~${expectedHp}) - consider lowering its damage to keep the overall threat balanced.`
      );
    } else if (actualHp < expectedHp) {
      suggestions.push(
        `The original hit points are below the (2014) ${crLabel} average (~${expectedHp}) - consider boosting its damage to keep the overall threat balanced.`
      );
    } 
  }

  const expectedAttacks = Number.isFinite(crValue) && crValue > 0 ? getExpectedAttacksByCR(crValue) : null;
  const actionCount = Number(snapshot?.actions ?? 0);
  const multiattackCount = Number(snapshot?.multiattackCount ?? 0);
  if (Number.isFinite(expectedAttacks) && expectedAttacks >= 2) {
    if (multiattackCount < expectedAttacks && actionCount <= expectedAttacks) {
      suggestions.push(
        `Action economy looks light for ${crLabel} - consider adding multiattack or an extra bonus action/reaction to keep up with expected pressure.`
      );
    }
  }

  const saveSummary = snapshot?.save;
  if (saveSummary?.count >= 2 && Number.isFinite(saveSummary.min) && Number.isFinite(saveSummary.max)) {
    const spread = saveSummary.max - saveSummary.min;
    if (spread >= 3) {
      suggestions.push(
        `Save DCs vary by ${spread}; consider tightening the spread so saves feel consistent across the kit.`
      );
    }
  }

  if (legendary || isDragon) {
    const tag = legendary && isDragon ? "Legendary dragons" : legendary ? "Legendary creatures" : "Dragons";
    if (Number.isFinite(crValue) && crValue >= 13) {
      suggestions.push(
        `${tag} at ${crLabel} should feel more explosive - consider boosting damage by 45% and lowering hp by 20% to keep the pacing sharp while maintaining the threat.`
      );
    } else {
      suggestions.push(
        `${tag} at ${crLabel} are expected to hit harder - consider boosting damage by 25% while keeping hp in check to preserve threat without extending fight length.`
      );
    }
  }

  const resistances = String(snapshot?.resistances ?? "").trim();
  if (resistances && resistances !== "-") {
    suggestions.push(
      "If resistances remain, remove any 'non-magical' wording and consider lowering AC by 1 to offset the durability bump."
    );
  }

  const vulnerabilities = String(snapshot?.vulnerabilities ?? "").trim();
  if (vulnerabilities && vulnerabilities !== "-") {
    const parts = vulnerabilities.split(",").map((part) => part.trim()).filter(Boolean);
    if (parts.length > 1) {
      suggestions.push(
        "Multiple vulnerabilities make the creature easier to drop - consider raising AC by 1 to compensate."
      );
    }
  }

  if (!suggestions.length) return "";

  return `
    <div class="m1424-suggestions-title">Suggestions</div>
    <ul class="m1424-suggestions-list">
      ${suggestions.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
    </ul>
  `;
}

function getExpectedHpByCr(crValue) {
  const hpByCr = [
    { cr: 0, hp: 3 },
    { cr: 0.125, hp: 9 },
    { cr: 0.25, hp: 15 },
    { cr: 0.5, hp: 24 },
    { cr: 1, hp: 30 },
    { cr: 2, hp: 45 },
    { cr: 3, hp: 60 },
    { cr: 4, hp: 75 },
    { cr: 5, hp: 90 },
    { cr: 6, hp: 105 },
    { cr: 7, hp: 120 },
    { cr: 8, hp: 120 },
    { cr: 9, hp: 135 },
    { cr: 10, hp: 150 },
    { cr: 11, hp: 165 },
    { cr: 12, hp: 180 },
    { cr: 13, hp: 195 },
    { cr: 14, hp: 210 },
    { cr: 15, hp: 225 },
    { cr: 16, hp: 240 },
    { cr: 17, hp: 255 },
    { cr: 18, hp: 270 },
    { cr: 19, hp: 285 },
    { cr: 20, hp: 300 },
    { cr: 21, hp: 315 },
    { cr: 22, hp: 330 },
    { cr: 23, hp: 345 },
    { cr: 24, hp: 360 },
    { cr: 25, hp: 375 },
    { cr: 26, hp: 390 }
  ];

  if (!Number.isFinite(crValue)) return null;
  if (crValue > 26) {
    const perCr = 15;
    return Math.round(390 + (crValue - 26) * perCr);
  }

  for (const row of hpByCr) {
    if (crValue === row.cr) return row.hp;
  }
  return null;
}

export function registerPreviewHandlebarsHelpers() {
  if (!globalThis.Handlebars?.registerHelper) return;
  if (globalThis.Handlebars.helpers?.formatPreviewCell) return;
  globalThis.Handlebars.registerHelper("formatPreviewCell", (rowKey, value) => {
    if (rowKey === "attackSaveRemoved") {
      return new globalThis.Handlebars.SafeString(buildAttackSaveHtml(value));
    }
    const formatted = formatValue(value);
    return new globalThis.Handlebars.SafeString(globalThis.Handlebars.escapeExpression(formatted));
  });
}

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

  constructor(title, previewData, comparison) {
    super();
    this.options.window.title = title;
    this.previewData = previewData;
    this.comparison = comparison;
  }

  async _prepareContext() {
    return this.previewData ?? {};
  }

  async _onRender(...args) {
    await super._onRender(...args);
    this.attachListeners();
    this.sizeToContent();
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

  sizeToContent() {
    const root = this.element?.[0] ?? this.element;
    if (!root) return;
    const body = root.querySelector(".m1424-preview-body");
    const table = root.querySelector(".m1424-compare-table");
    const scrollWrap = root.querySelector(".m1424-compare-scroll");
    if (!body || !table) return;

    requestAnimationFrame(() => {
      const maxWidth = Math.min(1600, Math.floor(window.innerWidth * 0.95));
      const maxHeight = Math.floor(window.innerHeight * 0.95);
      const minWidth = 720;
      const minHeight = 520;
      const outer = root.getBoundingClientRect();
      const inner = body.getBoundingClientRect();
      const chromeWidth = Math.max(0, outer.width - inner.width);
      const chromeHeight = Math.max(0, outer.height - inner.height);
      const desiredWidth = Math.min(
        maxWidth,
        Math.max(minWidth, table.scrollWidth + chromeWidth + 24)
      );

      const getBlockHeight = (element) => {
        if (!element) return 0;
        const styles = window.getComputedStyle(element);
        const marginTop = Number.parseFloat(styles.marginTop) || 0;
        const marginBottom = Number.parseFloat(styles.marginBottom) || 0;
        return element.getBoundingClientRect().height + marginTop + marginBottom;
      };

      const role = root.querySelector(".m1424-role");
      const suggestions = root.querySelector(".m1424-suggestions");
      const actions = root.querySelector(".m1424-compare-actions");
      const extrasHeight = getBlockHeight(role) + getBlockHeight(suggestions) + getBlockHeight(actions);

      const scrollContentHeight = body.scrollHeight;
      const maxScrollHeight = Math.max(200, maxHeight - chromeHeight - 24);
      const desiredScrollHeight = Math.min(scrollContentHeight, maxScrollHeight);
      const desiredHeight = Math.min(
        maxHeight,
        Math.max(minHeight, desiredScrollHeight + chromeHeight + 24)
      );

      this.setPosition({ width: desiredWidth, height: desiredHeight });
    });
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

async function renderPreviewDialog(title, previewData, comparison) {
  if (ApplicationV2 && HandlebarsApplicationMixin) {
    const app = new PreviewApp(title, previewData, comparison);
    app.render(true);
    return app;
  }
  const content = await renderTemplate(
    "modules/monsters-2014-to-2024/templates/preview.hbs",
    previewData ?? {}
  );
  new Dialog({
    title,
    content,
    buttons: {
      ok: { label: "Close" }
    }
  }).render(true);
}

async function createBackup(actor, backupMode) {
  if (!backupMode || backupMode === "none") return;
  const actorData = actor.toObject();
  if (backupMode === "duplicate" && !actor.pack) {
    const suffixEnabled = game.settings.get(MODULE_ID, "backupNameSuffixEnabled");
    const suffix = String(game.settings.get(MODULE_ID, "backupNameSuffix") ?? "");
    const name = suffixEnabled && suffix ? `${actor.name}${suffix}` : `${actor.name}`;
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
  const crValue = parseCR(base.cr);
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
      const rawRole = String(preview.after.detectedRole || "");
      const displayRole = rawRole ? `${rawRole.charAt(0).toUpperCase()}${rawRole.slice(1)}` : rawRole;
      roleLines.push(`Detected Role: ${displayRole}`);
    }
  }
  const sourceText = (() => {
    const sourceData = foundry.utils.getProperty(actor, "system.source");
    if (!sourceData || typeof sourceData !== "object") return "";
    const book = String(sourceData.book ?? sourceData.value ?? "").trim();
    const rules = String(sourceData.rules ?? "").trim();
    const label = String(sourceData.label ?? "").trim();
    if (book && rules) return `${book}, Rules: ${rules}`;
    if (label) return `${label}`;
    if (book) return `${book}`;
    return "";
  })();

  const isNumber = (value) => typeof value === "number" && !Number.isNaN(value);

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

  const previewData = {
    roleText: roleLines.length ? roleLines.join(" ") : "",
    roleTooltip: Array.isArray(results.find((result) => result.key === "inbuilt")?.plan?.roleReasons)
      ? results.find((result) => result.key === "inbuilt").plan.roleReasons.join(" ")
      : "",
    sourceText,
    suggestionsHtml: buildSuggestionsHtml(actor, base, crValue),
    headerModes: results.map((result) => {
      const link = (() => {
        if (result.key === "blog") return "https://www.blogofholding.com/?p=8469";
        if (result.key === "a5e-easy" || result.key === "a5e-hard") {
          return "https://a5e.tools/rules/designing-monsters";
        }
        return "";
      })();
      return {
        key: result.key,
        label: result.mode,
        link
      };
    }),
    rows: rows.map((row) => {
      const baseValue = row.useTargets
        ? (row.format ? row.format(base) : base[row.key])
        : (row.format ? row.format(base) : base[row.key]);
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
        return {
          modeKey: result.key,
          className: cellClass,
          value: afterValue
        };
      });
      return {
        label: row.label,
        key: row.key,
        base: {
          value: baseValue
        },
        cells
      };
    })
  };

  await renderPreviewDialog(formatPreviewTitle(actor, `Preview: ${actor.name}`), previewData, {
    actorId: actor.id,
    results,
    backupMode: defaults.backupMode
  });
}


