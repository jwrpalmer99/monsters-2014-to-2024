import {
  applyAttackBaseline,
  applyDamageDeltaFirstPart,
  applySaveBaseline,
  buildInitiativeUpdate,
  computeAverageDamage,
  ensureMultiattack,
  getA5eRow,
  inferCR,
  normalizeSenses,
  normalizeSkills,
  setAc,
  setHpToTarget,
  setProf,
  listAttackSaveItems,
  stripSaveFromAttackActivities
} from "../conversion-utils.js";

export function buildA5ePlan(actor, options = {}) {
  const actorData = actor.toObject();
  const cr = inferCR(actor);
  const row = getA5eRow(cr);
  const dcMode = options.a5eDcMode ?? "hard";
  const targetDc = dcMode === "easy" ? row.easyDc : row.hardDc;
  const attackBaseline = row.pb + row.ability;

  const updates = {};
  Object.assign(updates, setProf(actorData, row.pb));
  Object.assign(updates, setAc(actorData, row.ac));
  Object.assign(updates, setHpToTarget(actorData, row.hp));
  Object.assign(updates, normalizeSkills(actorData, row.pb));
  Object.assign(updates, normalizeSenses(actorData));
  Object.assign(updates, buildInitiativeUpdate(actorData, row.pb, cr));

  const itemUpdates = [];
  const itemCreates = [];
  const attackSaveRemoved = game.settings.get("monsters-2014-to-2024", "removeAttackSave")
    ? listAttackSaveItems(actor)
    : [];
  const floorAttacks = game.settings.get("monsters-2014-to-2024", "attackBonusFloor");
  const floorSaves = game.settings.get("monsters-2014-to-2024", "saveDcFloor");

  let primaryItem = null;
  let primaryDamage = 0;
  for (const item of actor.items) {
    const actionType = foundry.utils.getProperty(item, "system.actionType");
    if (!["mwak", "rwak", "msak", "rsak"].includes(actionType)) continue;
    const avg = computeAverageDamage(item);
    if (avg > primaryDamage) {
      primaryDamage = avg;
      primaryItem = item;
    }
  }

  for (const item of actor.items) {
    const actionType = foundry.utils.getProperty(item, "system.actionType");
    const isAttack = ["mwak", "rwak", "msak", "rsak"].includes(actionType);
    const itemUpdate = {};

    if (isAttack) {
      const attackUpdate = applyAttackBaseline(item, attackBaseline, floorAttacks);
      if (attackUpdate) Object.assign(itemUpdate, attackUpdate);
      if (primaryItem && item.id === primaryItem.id && primaryDamage > 0) {
        const delta = Math.round(row.dpr - primaryDamage);
        const damageUpdate = applyDamageDeltaFirstPart(item, delta);
        if (damageUpdate) Object.assign(itemUpdate, damageUpdate);
      }
    }
    const saveUpdate = applySaveBaseline(item, targetDc, floorSaves);
    if (saveUpdate) Object.assign(itemUpdate, saveUpdate);
    if (game.settings.get("monsters-2014-to-2024", "removeAttackSave")) {
      const stripUpdate = stripSaveFromAttackActivities(item);
      if (stripUpdate) Object.assign(itemUpdate, stripUpdate);
    }

    if (Object.keys(itemUpdate).length) {
      itemUpdates.push({ _id: item.id, ...itemUpdate });
    }
  }

  if (game.settings.get("monsters-2014-to-2024", "multiattackUpgrades")) {
    const multiattack = ensureMultiattack(actor, row.attacks, options.multiattackTemplate);
    if (multiattack.update) itemUpdates.push(multiattack.update);
    if (multiattack.create) itemCreates.push(multiattack.create);
  }

  return {
    updates,
    itemUpdates,
    itemCreates,
    cr,
    role: "a5e",
    a5eRow: row,
    a5eDcMode: dcMode,
    attackSaveRemoved,
    targets: {
      attack: attackBaseline,
      dc: targetDc
    }
  };
}
