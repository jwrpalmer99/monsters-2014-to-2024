import { convertActorTo2024, previewActorConversion } from "./conversion.js";
import { openActorPreviewComparison, registerPreviewHandlebarsHelpers } from "./ui.js";

const MODULE_ID = "monsters-2014-to-2024";

function registerSettings() {
  game.settings.register(MODULE_ID, "srdPackId", {
    name: "SRD Pack ID",
    hint: "Compendium pack id to use for SRD matching (e.g. dnd-monster-manual.actors).",
    scope: "world",
    config: true,
    type: String,
    default: "dnd-monster-manual.actors"
  });
  game.settings.register(MODULE_ID, "backupMode", {
    name: "Backup Mode",
    hint: "Choose how to back up a creature before converting.",
    scope: "world",
    config: true,
    type: String,
    choices: {
      none: "No backup",
      duplicate: "Duplicate actor (world only)",
      journal: "Snapshot JSON in Journal",
      compendium: "Store copy in Compendium"
    },
    default: "duplicate"
  });
  game.settings.register(MODULE_ID, "backupCompendiumId", {
    name: "Backup Compendium ID",
    hint: "Compendium pack id to store backups (must be an Actor pack).",
    scope: "world",
    config: true,
    type: String,
    default: ""
  });
  game.settings.register(MODULE_ID, "backupNameSuffixEnabled", {
    name: "Backup Name Suffix Enabled",
    hint: "If enabled, append a suffix to backup actor names.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(MODULE_ID, "backupNameSuffix", {
    name: "Backup Name Suffix",
    hint: "Suffix to append to backup actor names when enabled.",
    scope: "world",
    config: true,
    type: String,
    default: " (2014 backup)"
  });
  game.settings.register(MODULE_ID, "backupJournalId", {
    name: "Backup Journal ID",
    hint: "Journal entry id or UUID to store snapshots in (leave blank to create a new entry).",
    scope: "world",
    config: true,
    type: String,
    default: ""
  });
  game.settings.register(MODULE_ID, "initiativeRule", {
    name: "Initiative Bonus Rule",
    hint: "Set initiative bonus to Dex, Dex + PB, or CR-based chance (legendary uses 2x PB).",
    scope: "world",
    config: true,
    type: String,
    choices: {
      dex: "Dexterity only",
      "dex+pb": "Dexterity + Proficiency",
      "cr-chance": "CR-based proficiency chance"
    },
    default: "cr-chance"
  });
  game.settings.register(MODULE_ID, "hpMultiplierLow", {
    name: "HP Multiplier (CR 0-4)",
    hint: "Scale HP for low CR monsters. 1.15 means +15%.",
    scope: "world",
    config: true,
    type: Number,
    default: 1.15
  });
  game.settings.register(MODULE_ID, "hpMultiplierMid", {
    name: "HP Multiplier (CR 5-10)",
    hint: "Scale HP for mid CR monsters.",
    scope: "world",
    config: true,
    type: Number,
    default: 1.2
  });
  game.settings.register(MODULE_ID, "hpMultiplierHigh", {
    name: "HP Multiplier (CR 11-16)",
    hint: "Scale HP for high CR monsters.",
    scope: "world",
    config: true,
    type: Number,
    default: 1.25
  });
  game.settings.register(MODULE_ID, "hpMultiplierEpic", {
    name: "HP Multiplier (CR 17+)",
    hint: "Scale HP for epic CR monsters.",
    scope: "world",
    config: true,
    type: Number,
    default: 1.3
  });
  game.settings.register(MODULE_ID, "acBoostLow", {
    name: "AC Boost (CR 0-4)",
    scope: "world",
    config: true,
    type: Number,
    default: 1
  });
  game.settings.register(MODULE_ID, "acBoostMid", {
    name: "AC Boost (CR 5-10)",
    scope: "world",
    config: true,
    type: Number,
    default: 2
  });
  game.settings.register(MODULE_ID, "acBoostHigh", {
    name: "AC Boost (CR 11-16)",
    scope: "world",
    config: true,
    type: Number,
    default: 3
  });
  game.settings.register(MODULE_ID, "acBoostEpic", {
    name: "AC Boost (CR 17+)",
    scope: "world",
    config: true,
    type: Number,
    default: 4
  });
  game.settings.register(MODULE_ID, "attackBonusFloor", {
    name: "Attack Bonus Floor Only",
    hint: "If enabled, only raise attack bonuses when below the baseline.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(MODULE_ID, "saveDcFloor", {
    name: "Save DC Floor Only",
    hint: "If enabled, only raise save DCs when below the baseline.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(MODULE_ID, "multiattackUpgrades", {
    name: "Upgrade Multiattack",
    hint: "If enabled, add or update Multiattack based on the conversion mode's expectations.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(MODULE_ID, "removeAttackSave", {
    name: "Remove Save on Attack Abilities",
    hint: "If enabled, removes saving throws from abilities that already require attack rolls.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(MODULE_ID, "applyRoleMultipliers", {
    name: "Apply Role Multipliers",
    hint: "If enabled, apply role-based HP and damage multipliers during inbuilt scaling.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
}

function addActorContextOptions(sidebar, menuItems) {
  if (sidebar instanceof foundry.applications.sidebar.apps.Compendium) return;
  menuItems.push({
    name: "Convert 2014 → 2024",
    icon: '<i class="fas fa-arrow-up"></i>',
    condition: (li) => {
      const actor = game.actors.get(li?.dataset?.documentId ?? li?.dataset?.entryId);
      return actor?.type === "npc";
    },
    callback: async (header) => {
      const li = header.closest(".directory-item");
      const actor = game.actors.get(li?.dataset?.documentId ?? li?.dataset?.entryId);
      if (!actor) return;
      await openActorPreviewComparison(actor);
    },
    group: "system"
  });
}

function addActorSheetButton() {
  const handler = (app, html) => {
    const actor = app.actor ?? app.document;
    if (!actor || actor.type !== "npc") return;

    const $html = html instanceof jQuery ? html : $(html);
    const header = $html.closest(".app").find(".window-title, .window-header .window-title");
    if (!header.length) return;

    const existing = $html.closest(".app").find(".convert-2024");
    if (existing.length) return;

    const button = $(
      '<a class="convert-2024" title="Convert to 2024"><i class="fas fa-arrow-up"></i></a>'
    );
    button.on("click", async () => {
      await openActorPreviewComparison(actor);
    });
    header.after(button);
  };

  Hooks.on("renderActorSheet", handler);
}

function addActorSheetHeaderButton() {
  const attachHeaderButton = (app, buttons) => {
    if (!game.user.isGM) return;
    const actor = app?.document ?? app?.actor;
    if (!actor || actor.documentName !== "Actor" || actor.type !== "npc") return;
    if (buttons.some((button) => button.label === "Convert 2014 → 2024")) return;
    buttons.unshift({
      label: "Convert 2014 → 2024",
      tooltip: "Convert 2014 → 2024",
      class: "convert-2024",
      icon: "fas fa-arrow-up",
      onClick: () => openActorPreviewComparison(actor),      
      onclick: () => openActorPreviewComparison(actor)
    });
  };

  Hooks.on("getHeaderControlsApplicationV2", attachHeaderButton);

  const watchedHooks = ["ActorSheet", "Application"];
  watchedHooks.forEach((hook) => {
    Hooks.on(`get${hook}HeaderButtons`, attachHeaderButton);
  });
}

Hooks.once("init", () => {
  registerSettings();
  registerPreviewHandlebarsHelpers();
  if (globalThis.loadTemplates) {
    globalThis.loadTemplates([
      "modules/monsters-2014-to-2024/templates/partials/preview-table.hbs"
    ]);
  }

  game.modules.get(MODULE_ID).api = {
    convertActorTo2024,
    previewActorConversion,
    openActorPreviewComparison
  };
});

Hooks.on("getActorContextOptions", addActorContextOptions);

Hooks.once("ready", () => {
  addActorSheetButton();
  addActorSheetHeaderButton();
});
