import {
  buildInitiativeUpdate,
  calculateProfFromCR,
  detectRoleDetails,
  ensureMultiattack,
  getExpectedAttacksByCR,
  getAbilityMod,
  getActorAbilities,
  getHighestMentalMod,
  getHpMultiplier,
  getAcBoost,
  getRoleDamageMultiplier,
  inferCR,
  normalizeSenses,
  normalizeSkills,
  rebuildHp,
  setProf,
  bumpAc,
  applyAttackBaseline,
  applySaveBaseline,
  boostDamageParts,
  listAttackSaveItems,
  stripSaveFromAttackActivities
} from "../conversion-utils.js";

export function buildIntelligentPlan(actor, options = {}) {
  const actorData = actor.toObject();
  const roleInfo = detectRoleDetails(actor);
  const role = roleInfo.role;
  const cr = inferCR(actor);
  const abilities = getActorAbilities(actorData);
  const targetProf = calculateProfFromCR(cr);
  const keyMod =
    role === "caster" || role === "controller"
      ? getHighestMentalMod(abilities)
      : role === "skirmisher"
        ? getAbilityMod(abilities, "dex")
        : getAbilityMod(abilities, "str");

  const attackBaseline = targetProf + keyMod;
  const saveBaseline = 8 + targetProf + keyMod;
  const updates = {};

  Object.assign(updates, setProf(actorData, targetProf));
  Object.assign(updates, bumpAc(actorData, getAcBoost(cr)));
  const applyRoleMultipliers = game.settings.get("monsters-2014-to-2024", "applyRoleMultipliers");
  const hpRole = applyRoleMultipliers ? role : "balanced";
  Object.assign(updates, rebuildHp(actorData, getHpMultiplier(cr, hpRole)));
  Object.assign(updates, normalizeSkills(actorData, targetProf));
  Object.assign(updates, normalizeSenses(actorData));
  Object.assign(updates, buildInitiativeUpdate(actorData, targetProf, cr));

  const itemUpdates = [];
  const itemCreates = [];
  const attackSaveRemoved = game.settings.get("monsters-2014-to-2024", "removeAttackSave")
    ? listAttackSaveItems(actor)
    : [];
  const floorAttacks = game.settings.get("monsters-2014-to-2024", "attackBonusFloor");
  const floorSaves = game.settings.get("monsters-2014-to-2024", "saveDcFloor");
  const currentProf = foundry.utils.getProperty(actorData, "system.attributes.prof") ?? targetProf;
  const profDelta = Math.max(0, targetProf - currentProf);
  const damageRole = applyRoleMultipliers ? role : "balanced";
  const damageDelta = Math.round(profDelta * getRoleDamageMultiplier(damageRole));

  for (const item of actor.items) {
    const actionType = foundry.utils.getProperty(item, "system.actionType");
    const isAttack = ["mwak", "rwak", "msak", "rsak"].includes(actionType);
    const itemUpdate = {};

    if (isAttack) {
      const attackUpdate = applyAttackBaseline(item, attackBaseline, floorAttacks);
      if (attackUpdate) Object.assign(itemUpdate, attackUpdate);
      const damageUpdate = boostDamageParts(item, damageDelta);
      if (damageUpdate) Object.assign(itemUpdate, damageUpdate);
    }
    const saveUpdate = applySaveBaseline(item, saveBaseline, floorSaves);
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
    role,
    roleReasons: roleInfo.reasons,
    attackSaveRemoved,
    targets: {
      attack: attackBaseline,
      dc: saveBaseline
    }
  };
}
