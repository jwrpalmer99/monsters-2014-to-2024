import {
  applyAttackBaseline,
  applyDamageDeltaFirstPart,
  applySaveBaseline,
  buildInitiativeUpdate,
  computeAverageDamage,
  ensureMultiattack,
  getBlogRow,
  getExpectedAttacksByCR,
  inferCR,
  normalizeSenses,
  normalizeSkills,
  setAc,
  setHpToTarget,
  setProf,
  listAttackSaveItems,
  stripSaveFromAttackActivities
} from "../conversion-utils.js";

export function buildBlogPlan(actor, options = {}) {
  const actorData = actor.toObject();
  const cr = inferCR(actor);
  const row = getBlogRow(cr);
  const baseTarget = cr <= 20 ? 7.5 * cr : 12.5 * (cr - 8);
  const damageTarget = baseTarget;

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
      const attackUpdate = applyAttackBaseline(item, row.attack, floorAttacks);
      if (attackUpdate) Object.assign(itemUpdate, attackUpdate);
      if (primaryItem && item.id === primaryItem.id && primaryDamage > 0) {
        const delta = Math.round(damageTarget - primaryDamage);
        const damageUpdate = applyDamageDeltaFirstPart(item, delta);
        if (damageUpdate) Object.assign(itemUpdate, damageUpdate);
      }
    }
    const saveUpdate = applySaveBaseline(item, row.dc, floorSaves);
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
    const expectedAttacks = getExpectedAttacksByCR(cr);
    const multiattack = ensureMultiattack(actor, expectedAttacks, options.multiattackTemplate);
    if (multiattack.update) itemUpdates.push(multiattack.update);
    if (multiattack.create) itemCreates.push(multiattack.create);
  }

  return {
    updates,
    itemUpdates,
    itemCreates,
    cr,
    role: "blog",
    blogRow: row,
    attackSaveRemoved,
    targets: {
      attack: row.attack,
      dc: row.dc
    }
  };
}
