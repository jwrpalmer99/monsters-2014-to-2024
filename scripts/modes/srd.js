import { normalizeSlug } from "../conversion-utils.js";

export async function findSrdMatch(actor, pack) {
  if (!pack) return null;
  const normalizeName = (name) => String(name || "").replace(/\s*\(legacy\)\s*/gi, " ").trim();
  const index = await pack.getIndex({ fields: ["name"] });
  const actorSlug = normalizeSlug(normalizeName(actor.name));
  const sourceId = foundry.utils.getProperty(actor, "flags.core.sourceId");
  let match = index.find((entry) => normalizeSlug(normalizeName(entry.name)) === actorSlug);

  if (!match && sourceId) {
    match = index.find((entry) => `Compendium.${pack.collection}.${entry._id}` === sourceId);
  }
  if (!match) return null;
  return pack.getDocument(match._id);
}

export function buildSrdReplacement(actor, srdActor) {
  const srdData = srdActor.toObject();
  const originalData = actor.toObject();
  srdData.name = actor.name;
  srdData.img = actor.img;
  srdData.prototypeToken = foundry.utils.duplicate(originalData.prototypeToken);

  const originalBio = foundry.utils.getProperty(originalData, "system.details.biography");
  if (originalBio !== undefined) {
    foundry.utils.setProperty(srdData, "system.details.biography", originalBio);
  }

  const srdItems = srdData.items || [];
  const srdLookup = new Set(srdItems.map((item) => `${item.type}::${normalizeSlug(item.name)}`));
  const customItems = (originalData.items || []).filter((item) => {
    const key = `${item.type}::${normalizeSlug(item.name)}`;
    return !srdLookup.has(key);
  });

  const mergedItems = [...srdItems, ...customItems];
  return {
    updateData: srdData,
    items: mergedItems
  };
}
