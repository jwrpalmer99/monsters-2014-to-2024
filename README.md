# Monsters 2014 to 2024

Foundry VTT v13 module for D&D 5e (5.2.4) that scales 2014 monsters to 2024 levels. The module provides several methods of scaling and backup methods for original actors.

<img width="982" height="598" alt="preview" src="https://github.com/user-attachments/assets/6708de58-f031-492b-9969-0d636d533e13" />

## Usage

1. Open preview window
   
    - Actor Directory: right-click an NPC, choose "Convert 2014 → 2024". (NB: you can select this option in compendiums but Update will do nothing)
    - NPC Sheet: choose "Convert 2014 → 2024" in the window menu.

2. Select desired changes
   
    - You will be presented with a preview showing the changes (dark green = increases, dark red = decreases) suggested by several methods (and possibly additional suggestions)
    - Click on a column header or on a cell in the table to set that as the new value for the updated monster; cells which are currently set to be updated will have a green border.
    - If there are abilities which will have Saves removed (if you have that setting enabled) you can selectively disable/enable them - if there is a red X on the ability, the Save will be removed from the updated monster. If there are follow up saves (at start/end of turn) they should still be mentioned in the description.
    - Make a mental note of any suggestions!
  
  (If you don't like the suggested values of the conversion modes, just use them as a guide to make your own manual changes)

3. Update NPC
     
    - Update Button: will (optionally) backup the existing actor to compendium/journal/actor (see settings) and update the existing npc
    - Update and Replace in Scenes: as above but will additionally update any matching unlinked tokens in scenes

## Settings
- Many options are configurable in the module settings window - this includes setting the location for compendium/journal backups
  
<img width="437" height="820" alt="settings" src="https://github.com/user-attachments/assets/e0ad568e-3ae9-4680-8573-e86646bfadca" />

## Conversion Modes

- Inbuilt Scaling: normalizes PB/AC/HP/attack bonuses/save DCs, skills, and senses based on CR and detected role. Can be configured by user.
- Match SRD 5.2: replaces the actor with a matching SRD creature from a compendium pack and preserves customizations.
- [Blog of Holding](https://www.blogofholding.com/?p=8469): applies the CR table targets for AC/HP/Attack/Damage/DC/PB with a primary-attack damage adjustment.
- [A5E Monster Design](https://a5e.tools/rules/designing-monsters): applies Level Up monster table targets for AC/HP/PB/attacks/DPR with easy or hard DC targets.

## Detected Roles

Inbuilt scaling assigns a role to each creature and uses it to tune HP and damage multipliers:

- Solo (legendary bosses)
- Support (healing/support traits)
- Controller (multiple control effects)
- Caster (has spells, but not Support/Controller)
- Artillery (ranged-heavy)
- Ambusher (stealth/ambush traits or dex-focused melee)
- Defender (high AC or melee-focused)
- Brute (strength-focused melee)
- Skirmisher (dex-focused ranged)
- Balanced (fallback)

The preview UI shows the detected role with a tooltip explaining why it was chosen.

## Preview Suggestions

The preview window includes a suggestions panel with balance notes such as:

- HP vs expected CR averages (raise/lower damage accordingly)
- Legendary/dragon pacing guidance
- Action economy notes (multiattack/bonus action/reaction)
- Save DC spread consistency
- Resistance/vulnerability adjustments

## API Options

`convertActorTo2024(actor, options)` and `previewActorConversion(actor, options)` accept:

- `mode`: `inbuilt` | `srd` | `blog` | `a5e` | `a5e-easy` | `a5e-hard` (default: `inbuilt`)
- `srdPackId`: compendium pack id for SRD matching (default: module setting)
- `backupMode`: `none` | `duplicate` | `journal` | `compendium` (default: module setting)
- `backupJournalId`: Journal entry id or UUID to store snapshots in (default: module setting)
- `backupCompendiumId`: Compendium pack id to store backups in (default: module setting)
- `dryRun`: boolean (if true, returns a preview and makes no changes)
- `force`: boolean (if true, converts even if already flagged as converted)

Example:

```js
game.modules.get("monsters-2014-to-2024").api.convertActorTo2024(actor, {
  mode: "srd",
  srdPackId: "dnd-monster-manual.actors",
  backupMode: "journal",
  force: true
});
```

## Backup and Preview

- Dry-run preview shows a before/after diff for key stats.
- Backup mode can duplicate the actor, store a JSON snapshot in a Journal entry, or store a copy in a compendium pack.
- Preview from the Actor Directory compares all conversion modes side-by-side in a single table.

## Initiative

- Initiative bonus can be set to Dex, Dex + PB, or a CR-based proficiency chance.
- Legendary monsters always use expertise (Dex + 2x PB) in CR-based mode.

## Multiattack

- Multiattack upgrades are enabled by default and can be disabled in module settings.

## Attack + Save Cleanup

- Option: **Remove Save on Attack Abilities** (default: on).
- When enabled, if an ability uses an attack roll and a saving throw, the (initial) save is removed and descriptions are cleaned. 
- In the preview window this functionality can be disabled/enabled for each ability.

## What It Adjusts

- Proficiency bonus (floors to CR-based 2024 targets).
- AC (adds a CR-tier boost).
- HP (multiplies by CR-tier).
- Attack bonus (floors to CR-based 2024 targets).
- Save DC (floors to CR-based 2024 targets).
- Skill bonuses (floors to ability mod + proficiency).
- Damage bonuses (adds delta based on proficiency increase).
- NB: (Condition) Immunities, Resistances, Vulnerabilities are shown for info only
