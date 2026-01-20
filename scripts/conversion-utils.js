export const MODULE_ID = "monsters-2014-to-2024";

export const PROF_BY_CR = [
  { min: 0, max: 4, prof: 2 },
  { min: 5, max: 8, prof: 3 },
  { min: 9, max: 12, prof: 4 },
  { min: 13, max: 16, prof: 5 },
  { min: 17, max: 20, prof: 6 },
  { min: 21, max: 24, prof: 7 },
  { min: 25, max: 28, prof: 8 },
  { min: 29, max: 30, prof: 9 }
];

export const ATTACK_BY_CR = [
  { min: 0, max: 3, bonus: 3 },
  { min: 4, max: 5, bonus: 5 },
  { min: 6, max: 7, bonus: 6 },
  { min: 8, max: 9, bonus: 7 },
  { min: 10, max: 12, bonus: 8 },
  { min: 13, max: 15, bonus: 9 },
  { min: 16, max: 18, bonus: 10 },
  { min: 19, max: 21, bonus: 11 },
  { min: 22, max: 24, bonus: 12 },
  { min: 25, max: 27, bonus: 13 },
  { min: 28, max: 30, bonus: 14 }
];

export const SAVE_DC_BY_CR = [
  { min: 0, max: 3, dc: 13 },
  { min: 4, max: 7, dc: 14 },
  { min: 8, max: 10, dc: 15 },
  { min: 11, max: 13, dc: 16 },
  { min: 14, max: 16, dc: 17 },
  { min: 17, max: 20, dc: 18 },
  { min: 21, max: 23, dc: 19 },
  { min: 24, max: 26, dc: 20 },
  { min: 27, max: 29, dc: 21 },
  { min: 30, max: 30, dc: 22 }
];

export const BLOG_TABLE = [
  { cr: 0, ac: 13, hp: 3, attack: 2, damage: 1, dc: 9, pb: 2, ability: 0 },
  { cr: 0.125, ac: 13, hp: 9, attack: 3, damage: 3, dc: 10, pb: 2, ability: 1 },
  { cr: 0.25, ac: 13, hp: 15, attack: 3, damage: 6, dc: 10, pb: 2, ability: 1 },
  { cr: 0.5, ac: 14, hp: 24, attack: 4, damage: 9, dc: 11, pb: 2, ability: 2 },
  { cr: 1, ac: 14, hp: 30, attack: 4, damage: 12, dc: 11, pb: 2, ability: 2 },
  { cr: 2, ac: 14, hp: 45, attack: 5, damage: 18, dc: 12, pb: 2, ability: 3 },
  { cr: 3, ac: 15, hp: 60, attack: 5, damage: 24, dc: 12, pb: 2, ability: 3 },
  { cr: 4, ac: 15, hp: 75, attack: 6, damage: 30, dc: 13, pb: 2, ability: 4 },
  { cr: 5, ac: 15, hp: 90, attack: 6, damage: 36, dc: 13, pb: 3, ability: 4 },
  { cr: 6, ac: 16, hp: 105, attack: 7, damage: 42, dc: 14, pb: 3, ability: 4 },
  { cr: 7, ac: 16, hp: 120, attack: 7, damage: 48, dc: 14, pb: 3, ability: 4 },
  { cr: 8, ac: 16, hp: 135, attack: 8, damage: 54, dc: 15, pb: 3, ability: 4 },
  { cr: 9, ac: 17, hp: 150, attack: 8, damage: 60, dc: 15, pb: 4, ability: 4 },
  { cr: 10, ac: 17, hp: 165, attack: 9, damage: 66, dc: 16, pb: 4, ability: 5 },
  { cr: 11, ac: 17, hp: 180, attack: 9, damage: 72, dc: 16, pb: 4, ability: 5 },
  { cr: 12, ac: 18, hp: 195, attack: 10, damage: 78, dc: 17, pb: 4, ability: 5 },
  { cr: 13, ac: 18, hp: 210, attack: 10, damage: 84, dc: 17, pb: 5, ability: 5 },
  { cr: 14, ac: 18, hp: 225, attack: 11, damage: 90, dc: 18, pb: 5, ability: 6 },
  { cr: 15, ac: 19, hp: 240, attack: 11, damage: 96, dc: 18, pb: 5, ability: 6 },
  { cr: 16, ac: 19, hp: 255, attack: 12, damage: 102, dc: 19, pb: 5, ability: 6 },
  { cr: 17, ac: 19, hp: 270, attack: 12, damage: 108, dc: 19, pb: 6, ability: 6 },
  { cr: 18, ac: 20, hp: 285, attack: 13, damage: 114, dc: 20, pb: 6, ability: 7 },
  { cr: 19, ac: 20, hp: 300, attack: 13, damage: 120, dc: 20, pb: 6, ability: 7 },
  { cr: 20, ac: 20, hp: 315, attack: 14, damage: 126, dc: 21, pb: 6, ability: 7 },
  { cr: 21, ac: 21, hp: 350, attack: 14, damage: 132, dc: 21, pb: 7, ability: 7 },
  { cr: 22, ac: 21, hp: 400, attack: 15, damage: 138, dc: 22, pb: 7, ability: 8 },
  { cr: 23, ac: 21, hp: 450, attack: 15, damage: 144, dc: 22, pb: 7, ability: 8 },
  { cr: 24, ac: 22, hp: 500, attack: 16, damage: 150, dc: 23, pb: 7, ability: 8 },
  { cr: 25, ac: 22, hp: 550, attack: 16, damage: 156, dc: 23, pb: 8, ability: 8 },
  { cr: 26, ac: 22, hp: 600, attack: 17, damage: 162, dc: 24, pb: 8, ability: 9 }
];

export const A5E_TABLE = [
  { cr: 0, ac: 12, hp: 3, pb: 2, ability: 0, attacks: 1, dpr: 1, easyDc: 10, hardDc: 10 },
  { cr: 0.125, ac: 12, hp: 9, pb: 2, ability: 1, attacks: 1, dpr: 3, easyDc: 11, hardDc: 11 },
  { cr: 0.25, ac: 12, hp: 15, pb: 2, ability: 1, attacks: 1, dpr: 5, easyDc: 11, hardDc: 11 },
  { cr: 0.5, ac: 13, hp: 24, pb: 2, ability: 2, attacks: 1, dpr: 8, easyDc: 12, hardDc: 12 },
  { cr: 1, ac: 13, hp: 30, pb: 2, ability: 2, attacks: 1, dpr: 10, easyDc: 12, hardDc: 12 },
  { cr: 2, ac: 13, hp: 45, pb: 2, ability: 3, attacks: 2, dpr: 15, easyDc: 13, hardDc: 13 },
  { cr: 3, ac: 14, hp: 60, pb: 2, ability: 3, attacks: 2, dpr: 20, easyDc: 13, hardDc: 13 },
  { cr: 4, ac: 14, hp: 75, pb: 2, ability: 4, attacks: 2, dpr: 25, easyDc: 13, hardDc: 14 },
  { cr: 5, ac: 14, hp: 90, pb: 3, ability: 4, attacks: 2, dpr: 30, easyDc: 14, hardDc: 15 },
  { cr: 6, ac: 15, hp: 105, pb: 3, ability: 4, attacks: 2, dpr: 35, easyDc: 14, hardDc: 15 },
  { cr: 7, ac: 15, hp: 125, pb: 3, ability: 4, attacks: 2, dpr: 40, easyDc: 14, hardDc: 15 },
  { cr: 8, ac: 15, hp: 135, pb: 3, ability: 4, attacks: 2, dpr: 45, easyDc: 14, hardDc: 15 },
  { cr: 9, ac: 16, hp: 150, pb: 4, ability: 4, attacks: 2, dpr: 50, easyDc: 15, hardDc: 16 },
  { cr: 10, ac: 16, hp: 165, pb: 4, ability: 5, attacks: 2, dpr: 55, easyDc: 15, hardDc: 17 },
  { cr: 11, ac: 16, hp: 180, pb: 4, ability: 5, attacks: 3, dpr: 60, easyDc: 15, hardDc: 17 },
  { cr: 12, ac: 17, hp: 195, pb: 4, ability: 5, attacks: 3, dpr: 65, easyDc: 15, hardDc: 17 },
  { cr: 13, ac: 17, hp: 210, pb: 5, ability: 5, attacks: 3, dpr: 70, easyDc: 15, hardDc: 18 },
  { cr: 14, ac: 17, hp: 225, pb: 5, ability: 6, attacks: 3, dpr: 75, easyDc: 15, hardDc: 19 },
  { cr: 15, ac: 18, hp: 240, pb: 5, ability: 6, attacks: 3, dpr: 80, easyDc: 15, hardDc: 19 },
  { cr: 16, ac: 18, hp: 255, pb: 5, ability: 6, attacks: 3, dpr: 85, easyDc: 15, hardDc: 19 },
  { cr: 17, ac: 18, hp: 270, pb: 6, ability: 6, attacks: 4, dpr: 90, easyDc: 16, hardDc: 20 },
  { cr: 18, ac: 19, hp: 285, pb: 6, ability: 7, attacks: 4, dpr: 95, easyDc: 16, hardDc: 21 },
  { cr: 19, ac: 19, hp: 300, pb: 6, ability: 7, attacks: 4, dpr: 100, easyDc: 16, hardDc: 21 },
  { cr: 20, ac: 19, hp: 315, pb: 6, ability: 7, attacks: 4, dpr: 105, easyDc: 16, hardDc: 21 },
  { cr: 21, ac: 20, hp: 330, pb: 7, ability: 7, attacks: 4, dpr: 110, easyDc: 17, hardDc: 22 },
  { cr: 22, ac: 20, hp: 350, pb: 7, ability: 8, attacks: 4, dpr: 116, easyDc: 17, hardDc: 23 },
  { cr: 23, ac: 20, hp: 375, pb: 7, ability: 8, attacks: 4, dpr: 125, easyDc: 17, hardDc: 23 },
  { cr: 24, ac: 21, hp: 400, pb: 7, ability: 8, attacks: 4, dpr: 133, easyDc: 17, hardDc: 23 },
  { cr: 25, ac: 21, hp: 425, pb: 8, ability: 8, attacks: 4, dpr: 141, easyDc: 18, hardDc: 24 },
  { cr: 26, ac: 21, hp: 450, pb: 8, ability: 9, attacks: 4, dpr: 150, easyDc: 18, hardDc: 25 },
  { cr: 27, ac: 22, hp: 475, pb: 8, ability: 9, attacks: 4, dpr: 158, easyDc: 18, hardDc: 25 },
  { cr: 28, ac: 22, hp: 500, pb: 8, ability: 9, attacks: 4, dpr: 166, easyDc: 18, hardDc: 25 },
  { cr: 29, ac: 22, hp: 550, pb: 9, ability: 9, attacks: 4, dpr: 183, easyDc: 19, hardDc: 26 },
  { cr: 30, ac: 23, hp: 600, pb: 9, ability: 10, attacks: 4, dpr: 200, easyDc: 19, hardDc: 27 }
];

export const INIT_PROF_CHANCE_BY_CR = [
  { cr: 0, chance: 0.15 },
  { cr: 0.125, chance: 0.2 },
  { cr: 0.25, chance: 0.3 },
  { cr: 0.5, chance: 0.25 },
  { cr: 1, chance: 0.35 },
  { cr: 2, chance: 0.48 },
  { cr: 3, chance: 0.62 },
  { cr: 4, chance: 0.88 },
  { cr: 5, chance: 0.92 },
  { cr: 6, chance: 0.94 },
  { cr: 7, chance: 0.75 },
  { cr: 8, chance: 1.03 },
  { cr: 9, chance: 1.0 },
  { cr: 10, chance: 1.0 },
  { cr: 11, chance: 1.0 },
  { cr: 12, chance: 1.2 },
  { cr: 13, chance: 1.0 },
  { cr: 14, chance: 1.0 },
  { cr: 15, chance: 1.0 },
  { cr: 16, chance: 1.0 },
  { cr: 17, chance: 1.0 },
  { cr: 18, chance: 1.0 },
  { cr: 19, chance: 1.0 },
  { cr: 20, chance: 1.0 },
  { cr: 21, chance: 1.0 },
  { cr: 22, chance: 1.0 },
  { cr: 23, chance: 1.0 },
  { cr: 24, chance: 1.0 },
  { cr: 25, chance: 1.0 },
  { cr: 26, chance: 1.0 },
  { cr: 27, chance: 1.0 },
  { cr: 28, chance: 1.0 },
  { cr: 29, chance: 1.0 },
  { cr: 30, chance: 1.0 }
];

const ROLE_DAMAGE_MULTIPLIER = {
  brute: 1.1,
  skirmisher: 1.0,
  caster: 0.9,
  controller: 1.0,
  solo: 1.05,
  artillery: 1.05,
  defender: 0.95,
  support: 0.95,
  ambusher: 1.1,
  balanced: 1.0
};

const ROLE_HP_MULTIPLIER = {
  brute: 1.2,
  skirmisher: 1.0,
  caster: 0.9,
  controller: 1.0,
  solo: 1.15,
  artillery: 0.9,
  defender: 1.25,
  support: 1.05,
  ambusher: 0.95,
  balanced: 1.0
};

const CONDITION_KEYWORDS = [
  "stunned",
  "paralyzed",
  "restrained",
  "charmed",
  "frightened",
  "poisoned",
  "grappled",
  "prone",
  "incapacitated",
  "blinded",
  "deafened",
  "petrified"
];

const SUPPORT_KEYWORDS = [
  "heal",
  "healing",
  "restore",
  "regain",
  "revive",
  "resurrect",
  "temporary hit points",
  "temp hp",
  "ally",
  "allies",
  "aura",
  "bless",
  "cure"
];

const AMBUSHER_KEYWORDS = [
  "invisible",
  "invisibility",
  "stealth",
  "hide",
  "hidden",
  "ambush",
  "surprise",
  "shadow",
  "burrow"
];

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function parseCR(value) {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  const text = String(value).trim();
  if (!text) return 0;
  if (text.includes("/")) {
    const [num, den] = text.split("/");
    const n = Number(num);
    const d = Number(den);
    if (!Number.isNaN(n) && !Number.isNaN(d) && d !== 0) return n / d;
  }
  const parsed = Number(text);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function lookupByCR(table, cr, fallback) {
  for (const row of table) {
    if (cr >= row.min && cr <= row.max) return row;
  }
  return fallback;
}

export function normalizeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBlogRow(cr) {
  let best = BLOG_TABLE[0];
  let bestDiff = Math.abs(cr - best.cr);
  for (const row of BLOG_TABLE) {
    const diff = Math.abs(cr - row.cr);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = row;
    }
  }
  return best;
}

export function getA5eRow(cr) {
  let best = A5E_TABLE[0];
  let bestDiff = Math.abs(cr - best.cr);
  for (const row of A5E_TABLE) {
    const diff = Math.abs(cr - row.cr);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = row;
    }
  }
  return best;
}

export function getExpectedAttacksByCR(cr) {
  const row = getA5eRow(cr);
  return row?.attacks ?? 1;
}

export function getInitProfChance(cr) {
  let best = INIT_PROF_CHANCE_BY_CR[0];
  let bestDiff = Math.abs(cr - best.cr);
  for (const row of INIT_PROF_CHANCE_BY_CR) {
    const diff = Math.abs(cr - row.cr);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = row;
    }
  }
  return clamp(best.chance, 0, 1);
}

export function calculateProfFromCR(cr) {
  if (cr <= 0) return 2;
  const value = 2 + Math.floor((cr - 1) / 4);
  return clamp(value, 2, 9);
}

export function isLegendary(actorData) {
  const legact = foundry.utils.getProperty(actorData, "system.resources.legact");
  if (legact && ((legact.max ?? 0) > 0 || (legact.value ?? 0) > 0)) return true;
  return false;
}

export function stableRandomFromString(value) {
  let hash = 0;
  const text = String(value ?? "");
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  const unsigned = hash >>> 0;
  return unsigned / 4294967295;
}

export function getActorAbilities(actorData) {
  return foundry.utils.getProperty(actorData, "system.abilities") || {};
}

function computeAbilityMod(ability) {
  if (!ability) return 0;
  if (typeof ability.mod === "number") return ability.mod;
  const score = ability.value ?? ability.score ?? ability.base;
  if (typeof score === "number") return Math.floor((score - 10) / 2);
  return 0;
}

export function getAbilityMod(abilities, key) {
  const ability = abilities?.[key];
  return computeAbilityMod(ability);
}

export function getHighestMentalMod(abilities) {
  const mods = ["int", "wis", "cha"].map((key) => getAbilityMod(abilities, key));
  return Math.max(...mods);
}

export function detectRoleDetails(actor) {
  const abilities = getActorAbilities(actor);
  const strMod = getAbilityMod(abilities, "str");
  const dexMod = getAbilityMod(abilities, "dex");
  const hasSpells = actor.items.some((item) => item.type === "spell");
  const saves = actor.items.filter((item) => foundry.utils.getProperty(item, "system.save.dc"));

  let meleeCount = 0;
  let rangedCount = 0;
  let conditionCount = 0;
  let supportCount = 0;
  let ambusherCount = 0;
  const supportHits = new Set();
  const ambusherHits = new Set();
  const conditionHits = new Set();

  for (const item of actor.items) {
    const actionType = foundry.utils.getProperty(item, "system.actionType");
    if (actionType === "mwak" || actionType === "msak") meleeCount += 1;
    if (actionType === "rwak" || actionType === "rsak") rangedCount += 1;
    const description = String(foundry.utils.getProperty(item, "system.description.value") || "").toLowerCase();
    if (CONDITION_KEYWORDS.some((keyword) => description.includes(keyword))) {
      conditionCount += 1;
      for (const keyword of CONDITION_KEYWORDS) {
        if (description.includes(keyword)) conditionHits.add(keyword);
      }
    }
    if (SUPPORT_KEYWORDS.some((keyword) => description.includes(keyword))) {
      supportCount += 1;
      for (const keyword of SUPPORT_KEYWORDS) {
        if (description.includes(keyword)) supportHits.add(keyword);
      }
    }
    if (AMBUSHER_KEYWORDS.some((keyword) => description.includes(keyword))) {
      ambusherCount += 1;
      for (const keyword of AMBUSHER_KEYWORDS) {
        if (description.includes(keyword)) ambusherHits.add(keyword);
      }
    }
  }

  const acValue = (() => {
    const raw = foundry.utils.getProperty(actor, "system.attributes.ac.value")
      ?? foundry.utils.getProperty(actor, "system.attributes.ac");
    if (typeof raw === "number") return raw;
    if (typeof raw === "string") {
      const parsed = Number(raw);
      if (!Number.isNaN(parsed)) return parsed;
    }
    if (raw && typeof raw === "object") {
      const maybe = raw.value ?? raw.total ?? raw.base ?? raw.flat;
      if (typeof maybe === "number") return maybe;
    }
    return null;
  })();

  const reasons = [];

  if (isLegendary(actor)) {
    reasons.push("Legendary resources detected.");
    return { role: "solo", reasons };
  }
  if (supportCount >= 2) {
    const hits = Array.from(supportHits).sort().join(", ");
    reasons.push(`Support/healing traits detected (${hits || "no keywords"}).`);
    return { role: "support", reasons };
  }
  if (hasSpells || saves.length >= 2) {
    reasons.push(hasSpells ? "Spellcasting detected." : "Multiple saving throw abilities detected.");
    if (conditionCount >= 2) {
      const hits = Array.from(conditionHits).sort().join(", ");
      reasons.push(`Control conditions detected (${hits || "no keywords"}).`);
      return { role: "controller", reasons };
    }
    return { role: "caster", reasons };
  }
  if (rangedCount >= meleeCount + 2) {
    reasons.push("Heavy ranged focus detected.");
    return { role: "artillery", reasons };
  }
  if (ambusherCount >= 2 || (dexMod > strMod && meleeCount > 0 && rangedCount === 0)) {
    if (ambusherCount >= 2) {
      const hits = Array.from(ambusherHits).sort().join(", ");
      reasons.push(`Ambusher keywords detected (${hits || "no keywords"}).`);
    } else {
      reasons.push("Dex-focused melee profile detected.");
    }
    return { role: "ambusher", reasons };
  }
  if ((acValue !== null && acValue >= 18) || (meleeCount >= rangedCount + 1 && strMod >= dexMod)) {
    reasons.push(acValue !== null && acValue >= 18 ? "High AC detected." : "Melee-focused strength profile detected.");
    return { role: "defender", reasons };
  }
  if (strMod >= dexMod && meleeCount >= rangedCount) {
    reasons.push("Strength-focused melee profile detected.");
    return { role: "brute", reasons };
  }
  if (dexMod >= strMod && rangedCount >= meleeCount) {
    reasons.push("Dex-focused ranged profile detected.");
    return { role: "skirmisher", reasons };
  }
  if (conditionCount >= 2) {
    const hits = Array.from(conditionHits).sort().join(", ");
    reasons.push(`Control conditions detected (${hits || "no keywords"}).`);
    return { role: "controller", reasons };
  }
  reasons.push("No strong role indicators detected.");
  return { role: "balanced", reasons };
}

export function detectRole(actor) {
  return detectRoleDetails(actor).role;
}

export function inferCR(actor) {
  const crValue = foundry.utils.getProperty(actor, "system.details.cr");
  const parsed = parseCR(crValue);
  if (parsed > 0) return parsed;

  let bestCr = 1;
  let bestDiff = Number.POSITIVE_INFINITY;

  const attackBonuses = [];
  const saveDcs = [];
  for (const item of actor.items) {
    const attackBonus = getAttackBonus(item);
    if (attackBonus !== null) attackBonuses.push(attackBonus);
    const saveDc = getSaveDc(item);
    if (saveDc !== null) saveDcs.push(saveDc);
  }
  const maxAttack = attackBonuses.length ? Math.max(...attackBonuses) : null;
  const maxDc = saveDcs.length ? Math.max(...saveDcs) : null;

  for (const row of ATTACK_BY_CR) {
    if (maxAttack === null) break;
    const diff = Math.abs(row.bonus - maxAttack);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestCr = (row.min + row.max) / 2;
    }
  }
  for (const row of SAVE_DC_BY_CR) {
    if (maxDc === null) break;
    const diff = Math.abs(row.dc - maxDc);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestCr = (row.min + row.max) / 2;
    }
  }
  return bestCr || 1;
}

export function getHpMultiplier(cr, role) {
  const baseMultiplier = (() => {
    if (cr <= 4) return game.settings.get(MODULE_ID, "hpMultiplierLow");
    if (cr <= 10) return game.settings.get(MODULE_ID, "hpMultiplierMid");
    if (cr <= 16) return game.settings.get(MODULE_ID, "hpMultiplierHigh");
    return game.settings.get(MODULE_ID, "hpMultiplierEpic");
  })();
  const roleMultiplier = ROLE_HP_MULTIPLIER[role] ?? 1.0;
  return baseMultiplier * roleMultiplier;
}

export function getAcBoost(cr) {
  if (cr <= 4) return game.settings.get(MODULE_ID, "acBoostLow");
  if (cr <= 10) return game.settings.get(MODULE_ID, "acBoostMid");
  if (cr <= 16) return game.settings.get(MODULE_ID, "acBoostHigh");
  return game.settings.get(MODULE_ID, "acBoostEpic");
}

export function parseHpFormula(formula) {
  if (!formula || typeof formula !== "string") return null;
  const match = formula.trim().match(/^(\d+)\s*d\s*(\d+)\s*([+-]\s*\d+)?/i);
  if (!match) return null;
  const dice = Number(match[1]);
  const die = Number(match[2]);
  const bonus = match[3] ? Number(match[3].replace(/\s+/g, "")) : 0;
  if (Number.isNaN(dice) || Number.isNaN(die) || Number.isNaN(bonus)) return null;
  return { dice, die, bonus };
}

export function rebuildHp(actorData, multiplier) {
  const hp = foundry.utils.getProperty(actorData, "system.attributes.hp");
  if (!hp) return {};
  const oldMax = hp.max ?? 0;
  const oldValue = hp.value ?? oldMax;
  const ratio = oldMax > 0 ? oldValue / oldMax : 1;
  const formula = hp.formula;
  const parsed = parseHpFormula(formula);
  let newMax = oldMax;

  if (parsed) {
    const avg = parsed.dice * (parsed.die + 1) / 2 + parsed.bonus;
    newMax = Math.max(1, Math.round(avg * multiplier));
  } else if (oldMax > 0) {
    newMax = Math.max(oldMax + 1, Math.round(oldMax * multiplier));
  }
  const newValue = Math.max(1, Math.round(newMax * ratio));

  return {
    "system.attributes.hp.max": newMax,
    "system.attributes.hp.value": newValue
  };
}

export function bumpAc(actorData, boost) {
  const raw = foundry.utils.getProperty(actorData, "system.attributes.ac.value");
  const acData = foundry.utils.getProperty(actorData, "system.attributes.ac");
  let acValue = null;
  if (typeof raw === "number") {
    acValue = raw;
  } else if (typeof raw === "string") {
    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) acValue = parsed;
  } else if (raw && typeof raw === "object") {
    const maybe = raw.value ?? raw.total ?? raw.base ?? raw.flat;
    if (typeof maybe === "number") acValue = maybe;
  } else if (acData && typeof acData === "object") {
    const maybe = acData.value ?? acData.total ?? acData.base ?? acData.flat;
    if (typeof maybe === "number") acValue = maybe;
  }
  if (acValue === null) return {};
  return {
    "system.attributes.ac.value": acValue + boost
  };
}

export function setAc(actorData, target) {
  if (typeof target !== "number") return {};
  return {
    "system.attributes.ac.value": target
  };
}

export function setHpToTarget(actorData, targetMax) {
  const hp = foundry.utils.getProperty(actorData, "system.attributes.hp");
  if (!hp) return {};
  const oldMax = hp.max ?? 0;
  const oldValue = hp.value ?? oldMax;
  const ratio = oldMax > 0 ? oldValue / oldMax : 1;
  const newMax = Math.max(1, Math.round(targetMax));
  const newValue = Math.max(1, Math.round(newMax * ratio));
  return {
    "system.attributes.hp.max": newMax,
    "system.attributes.hp.value": newValue
  };
}

export function setProf(actorData, targetProf) {
  const current = foundry.utils.getProperty(actorData, "system.attributes.prof");
  if (current === targetProf) return {};
  return {
    "system.attributes.prof": targetProf
  };
}

export function normalizeSkills(actorData, targetProf) {
  const skills = foundry.utils.getProperty(actorData, "system.skills");
  if (!skills) return {};

  const updates = {};
  for (const [key, skill] of Object.entries(skills)) {
    if (!skill) continue;
    const mod = skill.mod ?? 0;
    const prof = skill.prof ?? 0;
    const profMultiplier = prof === 2 ? 2 : prof === 1 ? 1 : 0;
    const target = mod + profMultiplier * targetProf;
    const existingTotal = skill.total ?? target;
    const bonusPath = foundry.utils.hasProperty(skill, "bonuses.check")
      ? `system.skills.${key}.bonuses.check`
      : foundry.utils.hasProperty(skill, "bonus")
        ? `system.skills.${key}.bonus`
        : null;
    if (bonusPath && existingTotal !== target) {
      const delta = target - existingTotal;
      updates[bonusPath] = delta >= 0 ? `${delta}` : `${delta}`;
    }
  }
  return updates;
}

export function normalizeSenses(actorData) {
  const senses = foundry.utils.getProperty(actorData, "system.attributes.senses");
  if (!senses || typeof senses !== "object") return {};

  const cleaned = {};
  for (const [key, value] of Object.entries(senses)) {
    if (key === "units" || key === "special") continue;
    if (value === 0 || value === "" || value === null || value === undefined) continue;
    cleaned[key] = value;
  }
  return {
    "system.attributes.senses": cleaned
  };
}

export function getAttackBonus(item) {
  const direct = foundry.utils.getProperty(item, "system.attackBonus");
  if (direct !== undefined && direct !== null && direct !== "") return Number(direct);
  const nested = foundry.utils.getProperty(item, "system.attack.bonus");
  if (nested !== undefined && nested !== null && nested !== "") return Number(nested);
  return null;
}

export function setAttackBonus(updateData, item, bonus) {
  if (foundry.utils.hasProperty(item, "system.attackBonus")) {
    updateData["system.attackBonus"] = String(bonus);
  }
  if (foundry.utils.hasProperty(item, "system.attack.bonus")) {
    updateData["system.attack.bonus"] = String(bonus);
  }
}

export function getSaveDc(item) {
  let dc = foundry.utils.getProperty(item, "system.save.dc");
  if (dc === undefined || dc === null || dc === "") dc = foundry.utils.getProperty(item, "save.dc");
  if (!Number.isFinite(dc)) dc = foundry.utils.getProperty(item, "save.dc.formula");
  if (dc === undefined || dc === null || dc === "") return null;
  return Number(dc);
}

export function setSaveDc(updateData, item, dc) {
  if (foundry.utils.hasProperty(item, "system.save.dc")) {
    updateData["system.save.dc"] = dc;
  }
  if (foundry.utils.hasProperty(item, "save.dc.formula")) {
    updateData["save.dc.formula"] = String(dc);
  }
}

function getActivityEntries(activities) {
  if (!activities) return [];
  if (typeof activities.entries === "function") return Array.from(activities.entries());
  if (Array.isArray(activities.entries)) return activities.entries;
  return Object.entries(activities);
}

export function stripSaveFromAttackActivities(item) {
  const update = { _id: item.id };
  let changed = false;
  const activities = foundry.utils.getProperty(item, "system.activities");
  const entries = getActivityEntries(activities);
  const hasAttackActivity = entries.some(([, activity]) => (
    foundry.utils.hasProperty(activity, "attack.ability")
    || foundry.utils.hasProperty(activity, "attack.type")
    || foundry.utils.hasProperty(activity, "attack")
  ));
  if (!hasAttackActivity) return null;

  const hasSaveInActivity = (activity) => (
    foundry.utils.hasProperty(activity, "save.ability")
    || foundry.utils.hasProperty(activity, "save.dc")
    || foundry.utils.hasProperty(activity, "save.formula")
  );

  const filteredEntries = entries.filter(([id, activity]) => !hasSaveInActivity(activity));
  if (filteredEntries.length !== entries.length) {
    const next = {};
    for (const [id, activity] of filteredEntries) {
      next[id] = activity;
    }
    update["system.activities"] = next;
    update["system.activities.entries"] = filteredEntries;
    for (const [id, activity] of entries) {
      if (hasSaveInActivity(activity)) {
        update[`system.activities.-=${id}`] = null;
      }
    }
    changed = true;
  }

  for (const [id, activity] of entries) {
    if (!hasSaveInActivity(activity)) continue;
    const effects = foundry.utils.getProperty(activity, "effects");
    if (effects) {
      update[`system.activities.${id}.effects`] = [];
      changed = true;
    }
    update[`system.activities.${id}.save.ability`] = null;
    if (foundry.utils.hasProperty(activity, "save.dc.value")) {
      update[`system.activities.${id}.save.dc.value`] = null;
    }
    if (foundry.utils.hasProperty(activity, "save.dc.formula")) {
      update[`system.activities.${id}.save.dc.formula`] = "";
    }
    if (foundry.utils.hasProperty(activity, "save.dc.bonus")) {
      update[`system.activities.${id}.save.dc.bonus`] = "";
    }
    if (foundry.utils.hasProperty(activity, "save.dc.calculation")) {
      update[`system.activities.${id}.save.dc.calculation`] = "";
    }
    changed = true;
  }

  const cleanSaveText = (text) => {
    let updated = text;
    const saveInfo = (() => {
      const matchTag = updated.match(/\[\[\/save[^\]]*?\bability\s*=\s*([a-z]+)[^\]]*?\bdc\s*=\s*(\d+)[^\]]*\]\]/i);
      if (matchTag) return { ability: matchTag[1], dc: matchTag[2], raw: matchTag[0] };
      const matchAltTag = updated.match(/\[\[\/save\s+([a-zA-Z]+)\s+(\d+)[^\]]*\]\]/i);
      if (matchAltTag) return { ability: matchAltTag[1], dc: matchAltTag[2], raw: matchAltTag[0] };
      const matchText = updated.match(/\bDC\s*(\d+)\s*([a-z]+)\s+saving\s+throw\b/i);
      if (matchText) return { ability: matchText[2], dc: matchText[1], raw: null };
      return null;
    })();
    let protectedToken = "";
    let protectedText = "";
    if (saveInfo) {
      const abilityLabel = saveInfo.ability.toUpperCase();
      protectedText = saveInfo.raw
        ? `${saveInfo.raw} saving throw`
        : `DC ${saveInfo.dc} ${abilityLabel} saving throw`;
      protectedToken = `__M1424_SAVE_${saveInfo.dc}_${abilityLabel}__`;
      if (saveInfo.raw) {
        updated = updated.replace(saveInfo.raw, protectedToken);
      }
      if (protectedToken) {
        const tokenPattern = protectedToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        updated = updated.replace(
          new RegExp(`\\bmust\\s+succeed\\s+on\\s+a\\s+${tokenPattern}\\s+saving\\s+throw\\s+or\\s+take\\b`, "gi"),
          "takes"
        );
        updated = updated.replace(
          new RegExp(`\\bmust\\s+succeed\\s+on\\s+a\\s+${tokenPattern}\\s+saving\\s+throw\\s+or\\s+become\\b`, "gi"),
          "becomes"
        );
        updated = updated.replace(
          new RegExp(`\\bmust\\s+succeed\\s+on\\s+a\\s+${tokenPattern}\\s+saving\\s+throw\\b`, "gi"),
          ""
        );
      }
      const timing =
        "(?:at\\s+the\\s+(?:start|end)\\s+of\\s+(?:each\\s+of\\s+)?its\\s+turns?|at\\s+the\\s+(?:start|end)\\s+of\\s+its\\s+turn)";
      const withTiming = (pattern) => new RegExp(`${pattern}[^.]*${timing}`, "gi");
      const replacement = `make a ${protectedToken || protectedText}`;
      updated = updated.replace(
        withTiming("\\brepeat\\s+(?:the\\s+)?saving\\s+throw\\b"),
        (match) => match.replace(/\brepeat\s+(?:the\s+)?saving\s+throw\b/i, replacement)
      );
      updated = updated.replace(
        withTiming("\\brepeat\\s+(?:the\\s+)?save\\b"),
        (match) => match.replace(/\brepeat\s+(?:the\s+)?save\b/i, replacement)
      );
      updated = updated.replace(
        withTiming("\\bmake\\s+(?:a\\s+)?saving\\s+throw\\b"),
        (match) => match.replace(/\bmake\s+(?:a\s+)?saving\s+throw\b/i, replacement)
      );
      updated = updated.replace(
        withTiming("\\bmake\\s+(?:a\\s+)?save\\b"),
        (match) => match.replace(/\bmake\s+(?:a\s+)?save\b/i, replacement)
      );
      updated = updated.replace(
        new RegExp(`DC\\s*${saveInfo.dc}\\s*${abilityLabel}\\s+saving\\s+throw`, "gi"),
        protectedToken
      );
    }
    updated = updated.replace(
      /\bmust\s+succeed\s+on\s+a\s+\[\[\/save[^\]]+\]\]\s+or\s+become\b/gi,
      "becomes"
    );
    updated = updated.replace(
      /\bmust\s+succeed\s+on\s+a\s+\[\[\/save[^\]]+\]\]\s+saving\s+throw\s+becomes\b/gi,
      "becomes"
    );
    updated = updated.replace(
      /\bmust\s+succeed\s+on\s+a\s+\[\[\/save[^\]]+\]\]\s+saving\s+throw\b/gi,
      ""
    );
    updated = updated.replace(
      /\bmust\s+succeed\s+on\s+a\s+\[\[\/save[^\]]+\]\]\s+or\b/gi,
      ""
    );
    updated = updated.replace(/\[\[\/save[^\]]+\]\]/gi, "");
    updated = updated.replace(/\bDC\s*\d+\b/gi, "");
    updated = updated.replace(/\b(?:strength|dexterity|constitution|intelligence|wisdom|charisma)\s+saving\s+throw\b/gi, "");
    updated = updated.replace(/\b(?:str|dex|con|int|wis|cha)\s+saving\s+throw\b/gi, "");
    updated = updated.replace(
      /\bmust\s+succeed\s+on\s+a\s+saving\s+throw\s+or\s+take\b/gi,
      "takes"
    );
    updated = updated.replace(/\bmust\s+succeed\s+on\s+a\s+saving\s+throw\b/gi, "");
    updated = updated.replace(/\b(?:repeat|make)\s+(?:the\s+)?(?:saving\s+throw|save)\b/gi, "");
    updated = updated.replace(/\bmust\s+succeed\s+on\s+a\s+becomes\b/gi, "becomes");
    updated = updated.replace(/\bor\s+become\b/gi, "becomes");
    updated = updated.replace(/\bsaving\s+throw\s+saving\s+throw\b/gi, "saving throw");
    updated = updated.replace(/\s{2,}/g, " ").replace(/\s+([.,;:])/g, "$1").trim();
    if (protectedToken && protectedText) {
      updated = updated.replace(new RegExp(protectedToken, "g"), protectedText);
    }
    updated = updated.replace(/must succeed.*?\[\[\/save.*?\]\].*?saving throw/gi, "");
    updated = updated.replace("  ", " ");
    return updated;
  };

  const desc = foundry.utils.getProperty(item, "system.description.value");
  if (typeof desc === "string" && desc.length) {
    const updated = cleanSaveText(desc);
    if (updated !== desc) {
      update["system.description.value"] = updated;
      changed = true;
    }
  }
  const chat = foundry.utils.getProperty(item, "system.description.chat");
  if (typeof chat === "string" && chat.trim() !== "") {
    const updated = cleanSaveText(chat);
    if (updated !== chat) {
      update["system.description.chat"] = updated;
      changed = true;
    }
  }

  return changed ? update : null;
}

export function listAttackSaveItems(actor) {
  const items = new Map();
  for (const item of actor.items || []) {
    const activities = foundry.utils.getProperty(item, "system.activities");
    const entries = getActivityEntries(activities);
    const hasAttackActivity = entries.some(([, activity]) => (
      foundry.utils.hasProperty(activity, "attack.ability")
      || foundry.utils.hasProperty(activity, "attack.type")
      || foundry.utils.hasProperty(activity, "attack")
    ));
    if (!hasAttackActivity) continue;
    for (const [id, activity] of entries) {
      const hasAttack =
        foundry.utils.hasProperty(activity, "attack.ability")
        || foundry.utils.hasProperty(activity, "attack.type")
        || foundry.utils.hasProperty(activity, "attack");
      const hasSave =
        foundry.utils.hasProperty(activity, "save.ability")
        || foundry.utils.hasProperty(activity, "save.dc")
        || foundry.utils.hasProperty(activity, "save.formula");
      if (hasSave && (hasAttack || hasAttackActivity)) {
        const desc = String(foundry.utils.getProperty(item, "system.description.value") || "");
        const cleaned = desc.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        items.set(item.id, { name: item.name || item.id, description: cleaned });
      }
    }
  }
  return Array.from(items, ([id, data]) => ({ id, name: data.name, description: data.description }));
}

export function applyAttackBaseline(item, targetBonus, floorOnly) {
  const current = getAttackBonus(item);
  if (current !== null && floorOnly && current >= targetBonus) return null;
  const updateData = {};
  setAttackBonus(updateData, item, targetBonus);
  return Object.keys(updateData).length ? updateData : null;
}

export function applySaveBaseline(item, targetDc, floorOnly) {
  const current = getSaveDc(item);
  if (current !== null && floorOnly && current >= targetDc) return null;
  const updateData = {};
  setSaveDc(updateData, item, targetDc);
  return Object.keys(updateData).length ? updateData : null;
}

export function boostDamageParts(item, bonusDelta) {
  if (!bonusDelta) return null;
  const parts = foundry.utils.getProperty(item, "system.damage.parts");
  if (!Array.isArray(parts)) return null;

  const updated = parts.map(([formula, dtype]) => {
    if (typeof formula !== "string") return [formula, dtype];
    const match = formula.match(/^(.*?)([+-]\s*\d+)\s*$/);
    if (match) {
      const base = match[1].trim();
      const mod = Number(match[2].replace(/\s+/g, ""));
      const newMod = mod + bonusDelta;
      return [`${base}${newMod >= 0 ? "+" : ""}${newMod}`, dtype];
    }
    return [`${formula}+${bonusDelta}`, dtype];
  });

  return {
    "system.damage.parts": updated
  };
}

export function averageDamageFormula(formula) {
  if (!formula || typeof formula !== "string") return 0;
  const cleaned = formula.replace(/\s+/g, "");
  const tokens = cleaned.match(/[+-]?[^+-]+/g);
  if (!tokens) return 0;
  let total = 0;
  for (const token of tokens) {
    if (!token) continue;
    const sign = token.startsWith("-") ? -1 : 1;
    const raw = token.replace(/^[-+]/, "");
    const diceMatch = raw.match(/^(\d+)d(\d+)$/i);
    if (diceMatch) {
      const count = Number(diceMatch[1]);
      const die = Number(diceMatch[2]);
      if (!Number.isNaN(count) && !Number.isNaN(die)) {
        total += sign * (count * (die + 1) / 2);
      }
      continue;
    }
    const numeric = Number(raw);
    if (!Number.isNaN(numeric)) {
      total += sign * numeric;
    }
  }
  return total;
}

export function computeAverageDamage(item) {
  const parts = foundry.utils.getProperty(item, "system.damage.parts");
  if (!Array.isArray(parts)) return 0;
  return parts.reduce((sum, [formula]) => sum + averageDamageFormula(formula), 0);
}

export function applyDamageDeltaFirstPart(item, delta) {
  if (!delta) return null;
  const parts = foundry.utils.getProperty(item, "system.damage.parts");
  if (!Array.isArray(parts) || !parts.length) return null;
  const updated = parts.map(([formula, dtype], index) => {
    if (index !== 0 || typeof formula !== "string") return [formula, dtype];
    const match = formula.match(/^(.*?)([+-]\s*\d+)\s*$/);
    if (match) {
      const base = match[1].trim();
      const mod = Number(match[2].replace(/\s+/g, ""));
      const newMod = mod + delta;
      return [`${base}${newMod >= 0 ? "+" : ""}${newMod}`, dtype];
    }
    return [`${formula}${delta >= 0 ? "+" : ""}${delta}`, dtype];
  });
  return {
    "system.damage.parts": updated
  };
}

export function buildMultiattackData(count) {
  const attacks = count === 1 ? "one attack" : `${count} attacks`;
  return {
    name: "Multiattack",
    type: "feat",
    img: "icons/svg/sword.svg",
    system: {
      description: {
        value: `<p>The creature makes ${attacks}.</p>`
      },
      activation: {
        type: "action",
        cost: 1
      }
    }
  };
}

let cachedMultiattackTemplate = null;

export async function getMultiattackTemplate() {
  if (cachedMultiattackTemplate) return cachedMultiattackTemplate;
  const pack = game.packs.get("dnd5e.monsterfeatures24");
  if (!pack) return null;
  const index = await pack.getIndex({ fields: ["name"] });
  const entry = index.find((doc) => String(doc.name || "").toLowerCase() === "multiattack");
  if (!entry) return null;
  const doc = await pack.getDocument(entry._id);
  if (!doc) return null;
  cachedMultiattackTemplate = doc.toObject();
  return cachedMultiattackTemplate;
}

function findMultiattackItem(actor) {
  const items = actor.items || [];
  const candidates = items.filter((item) => item.type === "feat");
  const byIdentifier = candidates.find((item) => {
    const id = String(foundry.utils.getProperty(item, "system.identifier") || "").toLowerCase();
    return id === "multiattack" || id.includes("multiattack");
  });
  if (byIdentifier) return byIdentifier;
  const byName = candidates.find((item) => String(item.name || "").toLowerCase().includes("multiattack"));
  if (byName) return byName;
  const byDescription = candidates.find((item) => {
    const desc = String(foundry.utils.getProperty(item, "system.description.value") || "").toLowerCase();
    return desc.includes("multiattack") || /\bmakes?\s+\w+\s+attacks?\b/.test(desc);
  });
  return byDescription || null;
}

function updateMultiattackDescription(original, count) {
  if (!original) return original;
  const updated = String(original).replace(/\{count\}/gi, String(count));
  if (updated !== original) return updated;
  const replaceNumber = (text) => text.replace(
    /(makes?\s+)(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)(\s+[^.]*?\battacks?\b)/i,
    `$1${count}$3`
  );
  const replaced = replaceNumber(updated);
  return replaced;
}

export function ensureMultiattack(actor, count, template) {
  if (!count || count <= 1) return { update: null, create: null };
  const existing = findMultiattackItem(actor);
  if (existing) {
    const original = foundry.utils.getProperty(existing, "system.description.value") ?? "";
    const currentCount = parseMultiattackCount(String(original));
    if (currentCount === count) {
      return { update: null, create: null };
    }
    const updated = updateMultiattackDescription(original, count);
    if (updated === original) {
      return { update: null, create: null };
    }
    return {
      update: {
        _id: existing.id,
        "system.description.value": updated
      },
      create: null
    };
  }
  if (template) {
    const created = foundry.utils.duplicate(template);
    const fallback = buildMultiattackData(count);
    if (!created?.system) created.system = {};
    created.system.description = fallback.system.description;
    return { update: null, create: created };
  }
  return { update: null, create: buildMultiattackData(count) };
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function snapshotFromData(actorData, rollData) {
  const evaluateFormula = (formula, context) => {
    if (formula === null || formula === undefined) return null;
    const raw = String(formula).toLowerCase();
    let expr = raw
      .replace(/@mod/g, String(context.mod ?? 0))
      .replace(/@prof/g, String(context.prof ?? 0))
      .replace(/@pb/g, String(context.prof ?? 0))
      .replace(/\bpb\b/g, String(context.prof ?? 0))
      .replace(/\bprof\b/g, String(context.prof ?? 0))
      .replace(/\bmod\b/g, String(context.mod ?? 0));
    expr = expr.replace(/[^0-9+\-*/().]/g, "");
    if (!expr || /[a-z]/i.test(expr)) return null;
    if (!expr) return null;
    try {
      const value = Function(`"use strict"; return (${expr});`)();
      return Number.isNaN(value) ? null : value;
    } catch (error) {
      return null;
    }
  };

  const hp = foundry.utils.getProperty(rollData, "attributes.hp") || foundry.utils.getProperty(actorData, "system.attributes.hp") || {};
  const acData = foundry.utils.getProperty(rollData, "attributes.ac") ?? foundry.utils.getProperty(actorData, "system.attributes.ac");
  const rawAc =
    foundry.utils.getProperty(rollData, "attributes.ac.value")
    ?? acData?.value
    ?? foundry.utils.getProperty(rollData, "attributes.ac.base")
    ?? acData?.base
    ?? foundry.utils.getProperty(rollData, "attributes.ac.total")
    ?? acData?.total
    ?? foundry.utils.getProperty(rollData, "attributes.ac.flat")
    ?? acData?.flat
    ?? foundry.utils.getProperty(rollData, "attributes.ac.calc")
    ?? acData;
  const ac = typeof rawAc === "object" && rawAc
    ? rawAc.value ?? rawAc.base ?? rawAc.total ?? rawAc.flat ?? rawAc.bonus ?? "-"
    : rawAc;
  const rawProf = foundry.utils.getProperty(rollData, "attributes.prof")
    ?? foundry.utils.getProperty(actorData, "system.attributes.prof");
  const prof = typeof rawProf === "number"
    ? rawProf
    : calculateProfFromCR(parseCR(foundry.utils.getProperty(actorData, "system.details.cr")));
  const senses = foundry.utils.getProperty(rollData, "attributes.senses") || foundry.utils.getProperty(actorData, "system.attributes.senses") || {};
  const initAbilityRaw = foundry.utils.getProperty(rollData, "attributes.init.ability")
    ?? foundry.utils.getProperty(actorData, "system.attributes.init.ability");
  const initAbility = initAbilityRaw === "" || initAbilityRaw === null || initAbilityRaw === undefined
    ? "dex"
    : initAbilityRaw;
  const initAbilityData =
    foundry.utils.getProperty(rollData, `abilities.${initAbility}`)
    ?? foundry.utils.getProperty(actorData, `system.abilities.${initAbility}`);
  const abilityModForInit = computeAbilityMod(initAbilityData);
  const initModValue = foundry.utils.getProperty(rollData, "attributes.init.mod")
    ?? foundry.utils.getProperty(actorData, "system.attributes.init.mod");
  const initBonusValue = foundry.utils.getProperty(rollData, "attributes.init.bonus")
    ?? foundry.utils.getProperty(actorData, "system.attributes.init.bonus");
  const initMod = typeof abilityModForInit === "number"
    ? abilityModForInit
    : (typeof initModValue === "number" ? initModValue : 0);
  let initBonus = typeof initBonusValue === "number" ? initBonusValue : 0;
  if (typeof initBonusValue === "string") {
    const evaluated = evaluateFormula(initBonusValue, { mod: initMod, prof });
    if (evaluated !== null) initBonus = evaluated;
  }
  const initDisplay = `${initMod}+${initBonus}`;
  const movement = foundry.utils.getProperty(rollData, "attributes.movement") || foundry.utils.getProperty(actorData, "system.attributes.movement") || {};
  const speedParts = [];
  for (const [key, value] of Object.entries(movement)) {
    if (value === 0 || value === "" || value === null || value === undefined) continue;
    speedParts.push(`${key} ${value}`);
  }

  const senseParts = [];
  const normalizeSenseValue = (val) => {
    if (val === null || val === undefined || val === "") return null;
    if (typeof val === "number") return val;
    const cleaned = String(val).replace(/\bunits?\s*ft\b/gi, "").trim();
    const match = cleaned.match(/-?\d+(\.\d+)?/);
    return match ? Number(match[0]) : cleaned;
  };
  let senseText = "";
  if (typeof senses === "string") {
    senseText = senses.replace(/\bunits?\s*ft\b/gi, "").replace(/\s+,/g, ",").trim();
  } else {
    for (const [key, value] of Object.entries(senses)) {
      if (key === "units" || key === "special") continue;
      if (value === 0 || value === "" || value === null || value === undefined) continue;
      const normalized = normalizeSenseValue(value);
      if (normalized === null || normalized === 0 || normalized === "") continue;
      const label = key.replace(/([A-Z])/g, " $1").toLowerCase();
      senseParts.push(`${label} ${normalized}`);
    }
    senseText = senseParts.join(", ");
  }

  const items = actorData.items || [];
  const attackBonuses = [];
  const saveDcs = [];
  const saveBonuses = [];
  let traitsCount = 0;
  let actionsCount = 0;
  let multiattack = null;
  let multiattackCount = null;

  for (const item of items) {
    const actionType = foundry.utils.getProperty(item, "system.actionType");
    const activation = foundry.utils.getProperty(item, "system.activation.type");
    const isAttack = ["mwak", "rwak", "msak", "rsak"].includes(actionType);
    const attackBonus = getAttackBonus(item);
    if (isAttack && attackBonus !== null) attackBonuses.push(attackBonus);
    const saveDc = getSaveDc(item);
    if (saveDc !== null) saveDcs.push(saveDc);

    if (item.type === "feat" && !activation && !actionType) traitsCount += 1;
    if (activation || isAttack) actionsCount += 1;
    if (item.type === "feat" && String(item.name || "").toLowerCase().includes("multiattack")) {
      const raw = String(foundry.utils.getProperty(item, "system.description.value") || "");
      const text = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const resolved = resolveItemLinks(text, items);
      multiattackCount = parseMultiattackCount(resolved);
      if (multiattackCount) {
        const summary = `${multiattackCount} attacks`;
        multiattack = resolved ? `${summary} — ${resolved}` : summary;
      } else {
        multiattackCount = 2;
        const summary = `${multiattackCount} attacks`;
        multiattack = resolved ? `${summary} — ${resolved}` : summary;
      }
    }
  }

  const abilities = foundry.utils.getProperty(rollData, "abilities") || foundry.utils.getProperty(actorData, "system.abilities") || {};
  const pb = typeof prof === "number" ? prof : 0;

  const computeAttackBonus = (item) => {
    const direct = getAttackBonus(item);
    if (direct !== null && !Number.isNaN(direct)) return direct;
    const activities = foundry.utils.getProperty(item, "system.activities");
    if (activities && typeof activities === "object") {
      for (const activity of Object.values(activities)) {
        const activityBonus = getAttackBonus(activity);
        if (activityBonus !== null && !Number.isNaN(activityBonus)) return activityBonus;
        const abilityKeyRaw = foundry.utils.getProperty(activity, "attack.ability");
        const abilityKey = abilityKeyRaw === "" || abilityKeyRaw === null || abilityKeyRaw === undefined
          ? null
          : abilityKeyRaw;
        if (!abilityKey) continue;
        const mod = computeAbilityMod(abilities?.[abilityKey]);
        const formula = foundry.utils.getProperty(activity, "attack.bonus");
        const formulaValue = evaluateFormula(formula, { mod, prof: pb });
        if (formulaValue !== null) return formulaValue;
        return mod + pb;
      }
    }
    const actionType = foundry.utils.getProperty(item, "system.actionType");
    if (!["mwak", "rwak", "msak", "rsak"].includes(actionType)) return null;
    const abilityKeyRaw =
      foundry.utils.getProperty(item, "system.attack.ability")
      ?? foundry.utils.getProperty(item, "system.ability");
    const abilityKey = abilityKeyRaw === "" || abilityKeyRaw === null || abilityKeyRaw === undefined
      ? null
      : abilityKeyRaw;
    if (!abilityKey) return null;
    const mod = computeAbilityMod(abilities?.[abilityKey]);
    const formula =
      foundry.utils.getProperty(item, "system.attack.bonus")
      ?? foundry.utils.getProperty(item, "system.attackBonus");
    const formulaValue = evaluateFormula(formula, { mod, prof: pb });
    if (formulaValue !== null) return formulaValue;
    const proficient = Number(foundry.utils.getProperty(item, "system.proficient") ?? 1);
    const bonus = Number(foundry.utils.getProperty(item, "system.bonuses.attack") ?? 0);
    return mod + (proficient ? pb : 0) + bonus;
  };

  const computeSaveDc = (item) => {
    const direct = getSaveDc(item);
    if (direct !== null && !Number.isNaN(direct)) return direct;
    const activities = foundry.utils.getProperty(item, "system.activities");
    if (activities && typeof activities === "object") {
      for (const activity of Object.values(activities)) {
        const activityDc = getSaveDc(activity);
        if (activityDc !== null && !Number.isNaN(activityDc)) return activityDc;
        const abilityKeyRaw = foundry.utils.getProperty(activity, "save.ability");
        const abilityKey = abilityKeyRaw === "" || abilityKeyRaw === null || abilityKeyRaw === undefined
          ? null
          : abilityKeyRaw;
        if (!abilityKey) continue;
        const mod = computeAbilityMod(abilities?.[abilityKey]);
        const formula = foundry.utils.getProperty(activity, "save.dc")
          ?? foundry.utils.getProperty(activity, "save.formula");
        const formulaValue = evaluateFormula(formula, { mod, prof: pb });
        if (formulaValue !== null) return formulaValue;
        return 8 + pb + mod;
      }
    }
    const abilityKeyRaw = foundry.utils.getProperty(item, "system.save.ability");
    const abilityKey = abilityKeyRaw === "" || abilityKeyRaw === null || abilityKeyRaw === undefined
      ? null
      : abilityKeyRaw;
    if (!abilityKey) return null;
    const mod = computeAbilityMod(abilities?.[abilityKey]);
    const bonus = Number(foundry.utils.getProperty(item, "system.save.bonus") ?? 0);
    const formula =
      foundry.utils.getProperty(item, "system.save.dc")
      ?? foundry.utils.getProperty(item, "system.save.formula");
    const formulaValue = evaluateFormula(formula, { mod, prof: pb });
    if (formulaValue !== null) return formulaValue;
    return 8 + pb + mod + bonus;
  };
  for (const [key, ability] of Object.entries(abilities)) {
    const saveValue = ability?.save;
    const mod = computeAbilityMod(ability);
    const bonus = Number(ability?.bonuses?.save ?? 0);
    const proficient = Number(ability?.proficient ?? ability?.proficiency ?? 0);
    const computed = mod + proficient * pb + bonus;
    if (proficient || bonus) {
      saveBonuses.push({ key, value: typeof saveValue === "number" ? saveValue : computed });
      continue;
    }
    if (typeof saveValue === "number" && saveValue !== computed) {
      saveBonuses.push({ key, value: saveValue });
    }
  }

  const traitsData = foundry.utils.getProperty(rollData, "traits") || foundry.utils.getProperty(actorData, "system.traits") || {};
  const formatTraitList = (trait) => {
    const values = trait?.value ?? [];
    if (!Array.isArray(values) || !values.length) return "-";
    return values.map((value) => String(value)).join(", ");
  };

  if (!attackBonuses.length) {
    for (const item of items) {
      const bonus = computeAttackBonus(item);
      if (bonus !== null && !Number.isNaN(bonus)) attackBonuses.push(bonus);
    }
  }
  if (!saveDcs.length) {
    for (const item of items) {
      const dc = computeSaveDc(item);
      if (dc !== null && !Number.isNaN(dc)) saveDcs.push(dc);
    }
  }

  const attackSummary = attackBonuses.length
    ? { min: Math.min(...attackBonuses), max: Math.max(...attackBonuses), count: attackBonuses.length }
    : null;
  const saveSummary = saveDcs.length
    ? { min: Math.min(...saveDcs), max: Math.max(...saveDcs), count: saveDcs.length }
    : null;

  return {
    name: actorData.name,
    cr: foundry.utils.getProperty(actorData, "system.details.cr"),
    hp: { value: hp.value, max: hp.max },
    ac,
    prof,
    init: initDisplay ?? "-",
    attack: attackSummary,
    save: saveSummary,
    saves: saveBonuses,
    speed: speedParts.join(", "),
    senses: senseText,
    traits: traitsCount,
    actions: actionsCount,
    multiattack,
    multiattackCount,
    resistances: formatTraitList(traitsData.dr),
    immunities: formatTraitList(traitsData.di),
    vulnerabilities: formatTraitList(traitsData.dv),
    conditionImmunities: formatTraitList(traitsData.ci)
  };
}

function parseMultiattackCount(text) {
  if (!text) return null;
  const normalized = text.toLowerCase();
  const wordMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12
  };
  const sumMatches = Array.from(
    normalized.matchAll(/\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+[^.]*?\battacks?\b/g)
  );
  if (sumMatches.length > 1) {
    const total = sumMatches.reduce((sum, match) => {
      const raw = match[1];
      const value = Number.isNaN(Number(raw)) ? (wordMap[raw] ?? 0) : Number(raw);
      return sum + value;
    }, 0);
    if (total > 0) return total;
  }
  const matchTimes = normalized.match(/\b(\d+)\s+times?\b/);
  if (matchTimes) return Number(matchTimes[1]);
  const matchTimesWord = normalized.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+times?\b/);
  if (matchTimesWord) return wordMap[matchTimesWord[1]] ?? null;
  const matchNumber = normalized.match(/\bmakes?\s+(\d+)\s+attacks?\b/);
  if (matchNumber) return Number(matchNumber[1]);
  const matchWord = normalized.match(/\bmakes?\s+(one|two|three|four|five|six|seven|eight|nine|ten)\s+attacks?\b/);
  if (matchWord) return wordMap[matchWord[1]] ?? null;
  const matchWordWithName = normalized.match(/\bmakes?\s+(one|two|three|four|five|six|seven|eight|nine|ten)\s+.+?\s+attacks?\b/);
  if (matchWordWithName) return wordMap[matchWordWithName[1]] ?? null;
  const matchNumberWithName = normalized.match(/\bmakes?\s+(\d+)\s+.+?\s+attacks?\b/);
  if (matchNumberWithName) return Number(matchNumberWithName[1]);
  const matchAlt = normalized.match(/\b(\d+)\s+attacks?\b/);
  if (matchAlt) return Number(matchAlt[1]);
  const matchAltWord = normalized.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\s+attacks?\b/);
  if (matchAltWord) return wordMap[matchAltWord[1]] ?? null;
  return null;
}

function resolveItemLinks(text, items) {
  if (!text) return text;
  const idToName = new Map((items || []).map((item) => [item._id ?? item.id, item.name]));
  const identifierToName = new Map((items || []).map((item) => {
    const identifier = String(foundry.utils.getProperty(item, "system.identifier") || "").trim();
    return [identifier, item.name];
  }).filter(([identifier]) => identifier));
  const tokenToName = new Map();
  for (const [key, value] of idToName) {
    if (key) tokenToName.set(String(key), value);
  }
  for (const [key, value] of identifierToName) {
    if (key) tokenToName.set(String(key), value);
  }
  let resolved = text;
  resolved = resolved.replace(/\[\[\s*lookup\s+@name\s+lowercase\s*\]\]/gi, "creature");
  resolved = resolved.replace(/\[\[\s*lookup\s+@name\s*\]\]/gi, "creature");
  resolved = resolved.replace(/\[\[\s*lookup\s+@item\.name\s*\]\]/gi, "an attack");
  resolved = resolved.replace(/\[\[\/item\s+([^\]|]+)(?:\|([^\]]+))?\]\]/gi, (match, name, label) => {
    const display = String(label || name || "").trim();
    return display || match;
  });
  resolved = resolved.replace(/\[\[\/item\s*\.?([a-zA-Z0-9]+)\]\]/g, (match, id) => {
    const normalized = String(id || "").replace(/^\./, "");
    const name = tokenToName.get(normalized) || tokenToName.get(id);
    return name ? name : match;
  });
  resolved = resolved.replace(/\.([a-zA-Z0-9]{6,})/g, (match, token) => {
    const name = tokenToName.get(token);
    return name ? name : match;
  });
  resolved = resolved.replace(/\bthe\s+the\s+/gi, "the ");
  resolved = resolved.replace(/@UUID\[[^\]]+Item\.([a-zA-Z0-9]+)\](?:\{([^}]+)\})?/g, (match, id, label) => {
    if (label) return label;
    const name = idToName.get(id);
    return name ? name : match;
  });
  return resolved;
}

export function renderDiffHtml(before, after) {
  const rows = [];
  rows.push(`<tr><td>HP</td><td>${before.hp.value}/${before.hp.max}</td><td>${after.hp.value}/${after.hp.max}</td></tr>`);
  rows.push(`<tr><td>AC</td><td>${before.ac ?? "-"}</td><td>${after.ac ?? "-"}</td></tr>`);
  rows.push(`<tr><td>Proficiency</td><td>${before.prof ?? "-"}</td><td>${after.prof ?? "-"}</td></tr>`);
  rows.push(`<tr><td>Initiative</td><td>${before.init ?? "-"}</td><td>${after.init ?? "-"}</td></tr>`);
  rows.push(
    `<tr><td>Attack Bonus</td><td>${before.attack ? `${before.attack.min}-${before.attack.max}` : "-"}</td><td>${after.attack ? `${after.attack.min}-${after.attack.max}` : "-"}</td></tr>`
  );
  rows.push(
    `<tr><td>Save DC</td><td>${before.save ? `${before.save.min}-${before.save.max}` : "-"}</td><td>${after.save ? `${after.save.min}-${after.save.max}` : "-"}</td></tr>`
  );
  rows.push(
    `<tr><td>Saves</td><td>${before.saves.length ? before.saves.map((s) => `${s.key} ${s.value}`).join(", ") : "-"}</td><td>${after.saves.length ? after.saves.map((s) => `${s.key} ${s.value}`).join(", ") : "-"}</td></tr>`
  );
  rows.push(`<tr><td>Speed</td><td>${escapeHtml(before.speed || "-")}</td><td>${escapeHtml(after.speed || "-")}</td></tr>`);
  rows.push(`<tr><td>Senses</td><td>${escapeHtml(before.senses || "-")}</td><td>${escapeHtml(after.senses || "-")}</td></tr>`);
  rows.push(`<tr><td>Traits</td><td>${before.traits}</td><td>${after.traits}</td></tr>`);
  rows.push(`<tr><td>Actions</td><td>${before.actions}</td><td>${after.actions}</td></tr>`);
  rows.push(`<tr><td>Multiattack</td><td>${escapeHtml(before.multiattack || "-")}</td><td>${escapeHtml(after.multiattack || "-")}</td></tr>`);

  return `
    <table class="m1424-diff">
      <thead>
        <tr><th>Stat</th><th>Before</th><th>After</th></tr>
      </thead>
      <tbody>
        ${rows.join("")}
      </tbody>
    </table>
  `;
}

export function applyUpdatesToData(actorData, updates, itemUpdates, itemCreates) {
  const updated = foundry.utils.duplicate(actorData);
  for (const [path, value] of Object.entries(updates)) {
    foundry.utils.setProperty(updated, path, value);
  }
  if (Array.isArray(updated.items) && itemUpdates?.length) {
    const updateById = new Map(itemUpdates.map((update) => [update._id, update]));
    for (const item of updated.items) {
      const change = updateById.get(item._id);
      if (!change) continue;
      for (const [path, value] of Object.entries(change)) {
        if (path === "_id") continue;
        foundry.utils.setProperty(item, path, value);
      }
    }
  }
  if (Array.isArray(updated.items) && itemCreates?.length) {
    for (const created of itemCreates) {
      updated.items.push(foundry.utils.duplicate(created));
    }
  }
  return updated;
}

export function buildUpdateSummary(actor, updates, itemUpdates) {
  const lines = [];
  if (Object.keys(updates).length) {
    lines.push(`${actor.name}: updated core stats.`);
  }
  if (itemUpdates.length) {
    lines.push(`${actor.name}: updated ${itemUpdates.length} item(s).`);
  }
  return lines.join(" ");
}

export function buildInitiativeUpdate(actorData, profValue, crValue) {
  const mode = game.settings.get(MODULE_ID, "initiativeRule");
  const abilities = getActorAbilities(actorData);
  const dexMod = getAbilityMod(abilities, "dex");
  const cr = crValue ?? parseCR(foundry.utils.getProperty(actorData, "system.details.cr")) ?? 0;
  const initAbilityRaw = foundry.utils.getProperty(actorData, "system.attributes.init.ability");
  const initAbility = initAbilityRaw === "" || initAbilityRaw === null || initAbilityRaw === undefined
    ? "dex"
    : initAbilityRaw;
  const abilityMod = getAbilityMod(abilities, initAbility);
  const currentMod = foundry.utils.getProperty(actorData, "system.attributes.init.mod");
  const baseMod = typeof currentMod === "number" ? currentMod : abilityMod;
  let bonus = dexMod;
  const pb = profValue ?? foundry.utils.getProperty(actorData, "system.attributes.prof") ?? 2;
  if (mode === "dex+pb") {
    const multiplier = isLegendary(actorData) ? 2 : 1;
    bonus = dexMod + pb * multiplier;
  }
  if (mode === "cr-chance") {
    if (isLegendary(actorData)) {
      bonus = dexMod + pb * 2;
    } else {
      const chance = getInitProfChance(cr);
      const seed = `${actorData.id ?? actorData._id ?? actorData.name ?? "actor"}:${cr}`;
      const roll = stableRandomFromString(seed);
      bonus = dexMod + (roll < chance ? pb : 0);
    }
  }
  const bonusDelta = bonus - baseMod;
  if (foundry.utils.hasProperty(actorData, "system.attributes.init.bonus")) {
    return { "system.attributes.init.bonus": bonusDelta };
  }
  return { "system.attributes.init.bonus": bonusDelta };
}

export function getRoleDamageMultiplier(role) {
  return ROLE_DAMAGE_MULTIPLIER[role] ?? 1.0;
}
