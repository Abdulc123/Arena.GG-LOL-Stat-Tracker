import React, { Component } from 'react';
import '../css/App.css';

// queueIDS for determining what type of match
const gameModes = {
  420: 'Ranked Solo/Duo',
  440: 'Ranked Flex',
  430: 'Normal Blind Pick',
  450: 'ARAM',
  400: 'Normal Draft Pick',
  490: 'Quickplay',
  700: 'Clash',
  830: 'Co-op vs AI Intro Bots',
  840: 'Co-op vs AI Beginner Bots',
  850: 'Co-op vs AI Intermediate Bots',
  900: 'ARURF',
  1020: 'One for All',
  1300: 'Nexus Blitz',
  1700: 'Arena',
  1710: 'Arena',
  1900: 'Urf'
  // Add more if needed
};

const summonerSpellMapping = {
  21: 'SummonerBarrier',
  1: 'SummonerBoost',
  2202: 'SummonerCherryFlash',
  2201: 'SummonerCherryHold',
  14: 'SummonerDot',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  13: 'SummonerMana',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  11: 'SummonerSmite',
  39: 'SummonerSnowURFSnowball_Mark',
  32: 'SummonerSnowball',
  12: 'SummonerTeleport',
  54: 'Summoner_UltBookPlaceholder',
  55: 'Summoner_UltBookSmitePlaceholder',
  // Add more mappings as needed
};

const runeStyleMapping = {
  8000: 'Precision',
  8100: 'Domination',
  8200: 'Sorcery',
  8400: 'Resolve',
  8300: 'Inspiration',
};

const keystoneMapping = {
  8005: 'PressTheAttack',
  8008: 'LethalTempo', // good 1/2 LethalTempoTemp
  8021: 'FleetFootwork',
  8010: 'Conqueror',
  8112: 'Electrocute',
  8124: 'Predator',
  8128: 'DarkHarvest',
  9923: 'HailOfBlades',
  8214: 'SummonAery',
  8229: 'ArcaneComet',
  8230: 'PhaseRush',
  8437: 'GraspOfTheUndying',
  8439: 'VeteranAftershock',
  8465: 'Guardian',
  8351: 'GlacialAugment',
  8360: 'UnsealedSpellbook',
  8369: 'FirstStrike',
};

const summonerSpellDescription = {
    SummonerBarrier: "Shields your champion for 115-455 (based on level) for 2 seconds and grants a burst of movement speed.",
    SummonerBoost: "Removes all disables (excluding suppression and airborne) and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
    SummonerCherryFlash: "Teleports your champion a short distance toward your cursor's location.",
    SummonerCherryHold: "Your champion can move through units and has 28-45% (based on level) Movement Speed for 10 seconds.",
    SummonerDot: "Ignites target enemy champion, dealing 70-410 (based on level) true damage over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
    SummonerExhaust: "Exhausts target enemy champion, reducing their Movement Speed by 30%, and their damage dealt by 40% for 3 seconds.",
    SummonerFlash: "Teleports your champion a short distance toward your cursor's location.",
    SummonerHaste: "Your champion can move through units and has 28-45% (based on level) Movement Speed for 10 seconds.",
    SummonerHeal: "Restores 90-345 (based on level) Health and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units that have been affected by another Summoner Heal within the last 35 seconds.",
    SummonerMana: "Restores 50% of your champion's maximum Mana. Also restores allies for 25% of their maximum Mana.",
    SummonerPoroRecall: "Quickly travel to the Poro King's side.",
    SummonerPoroThrow: "Throw a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
    SummonerSmite: "Deals 390-1000 (based on level) true damage to a large or epic monster or enemy minion. Restores Health based on your maximum life when used against monsters.",
    SummonerSnowURFSnowball_Mark: "Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked, granting you vision, and you gain the ability to quickly travel to the marked target as a follow up.",
    SummonerSnowball: "Throw a snowball a long distance, dealing 20-40 (based on level) true damage to the first enemy unit hit and granting True Sight of the target. If it hits an enemy, this ability can be recast for 3 seconds to Dash to the tagged unit, dealing an additional 20-40 (based on level) true damage. Dashing to the target will reduce the cooldown of this ability by 25%.",
    SummonerTeleport: "After channeling for 4 seconds, teleports your champion to target allied structure, minion, or ward and grants a Movement Speed boost. The cooldown of Teleport scales from 420-240 seconds depending on the game time.",
    Summoner_UltBookPlaceholder: "Swap one of your equipped Summoner Spells to a new, single use Summoner Spell. Each unique Summoner Spell you swap to permanently decreases your swap cooldown by 20s (initial swap cooldown is at 5 mins). Your first swap becomes available at 6 mins.",
    Summoner_UltBookSmitePlaceholder: "Swap one of your equipped Summoner Spells to a new, single use Summoner Spell. Each unique Summoner Spell you swap to permanently decreases your swap cooldown by 20s (initial swap cooldown is at 5 mins). Your first swap becomes available at 6 mins. Swapping to Smite will grant you a one time use of the Challenging Smite item which can be cast on enemy champions only."
  }
  
const runeDescription = {
8005: 'Hitting an enemy champion 3 consecutive times makes them vulnerable, dealing bonus damage and causing them to take more damage from all sources for 6s.',
8008: 'Attacking and moving builds Energy stacks. At 100 stacks, your next attack is Energized',
8021: 'Attacking and moving builds Energy stacks. At 100 stacks, your next attack heals you and grants increased MS.',
8010: 'Gain stacks of adaptive force when attacking enemy champions. After reaching 12 stacks, heal for a portion of damage you deal to champions.',
9101: 'Takedowns restore health and grant bonus MS.',
9111: 'Takedowns restore 12% of your missing health and grant an additional 20 gold.',
8009: 'Periodically, gain a corrupting stack that restores health and mana when you damage an enemy champion.',
9104: 'Gain 3% attack speed plus an additional 1.5% for every Legend stack (max 10 stacks).',
9105: 'Gain 5% tenacity plus an additional 2.5% for every Legend stack (max 10 stacks).',
9103: 'Gain 0.6% life steal for every Legend stack (max 20 stacks).',
8014: 'Deal more damage to low health enemy champions.',
8017: 'Deal more damage to champions with more max health than you.',
8299: 'Deal bonus damage to champions with less than 40% health.',
8112: 'Hitting a champion with 3 separate attacks or abilities in 3s deals bonus adaptive damage.',
8124: 'Gain a burst of Lethality and Magic Penetration after using a dash, leap, blink, teleport, or when leaving stealth.',
8128: 'Champions, large minions, and large monsters drop soul essence on death. Touch souls to absorb them and deal bonus damage on your next attack based on total soul essence collected.',
9923: 'Gain a burst of MS when you damage a champion. While in combat, you generate stacks of Hail of Blades, up to a maximum of 3. Your next attack expends a stack to increase your attack speed for a short duration.',
8126: 'Damaging champions with impaired movement or actions deals bonus true damage.',
8139: 'Heal when you damage an enemy champion.',
8143: 'After exiting stealth or using a dash, leap, blink, or teleport, dealing any damage to a champion grants you 7 Lethality and 6 Magic Penetration for 5s.',
8136: 'Gain an adaptive bonus of 1.2 Attack Damage or 2 Ability Power for every Zombie Ward spawned, up to 10.',
8120: 'Gain an adaptive bonus of 1.2 Attack Damage or 2 Ability Power for every Ghost Poro spawned and when your Ghost Poro spots an enemy champion up to 10 stacks.',
8138: 'Collect eyeballs for champion takedowns. Gain an adaptive bonus of 1.2 Attack Damage or 2 Ability Power, per eyeball collected.',
8135: 'Heal for a percentage of the damage dealt by your abilities.',
8134: 'When you enter brush, a poro appears. It will stay behind to give you vision.',
8105: 'Your first ability hit every 20s burns champions.',
8106: 'When you damage an enemy champion, you steal 20% of their movement speed for 3 seconds.',
8110: 'After immobilizing an enemy champion, increase your Armor and Magic Resist by 35 + 80% of your Bonus Resists for 2.5s. Then explode, dealing magic damage to nearby enemies.',
8129: 'Gain 5% damage reduction against enemy champions for each stack of Eyeball Collection. Upon reaching 10 eyeballs, additionally gain an adaptive bonus of 6 Attack Damage, or 10 Ability Power.',
8137: 'Deal bonus true damage to enemy champions who are impaired by crowd control.',
8205: 'Your first damaging ability hit every 10s burns champions.',
8210: 'Gain increasing amounts of AD or AP, adaptive over 5 seconds when in combat with enemy champions.',
8229: 'Hitting an enemy champion with 3 separate attacks or abilities grants a burst of MS.',
8230: 'Gain a free Biscuit every 2 min, until 6 min. Consuming or selling a Biscuit permanently increases your max mana and restores health and mana.',
8224: 'Gain 15% Attack Speed, 8 Ability Haste, and increase your Mana Regen by 1.5.',
8226: 'Gain bonuses upon reaching the following levels: Level 5: +5 Ability Haste Level 8: +5 Ability Haste Level 11: On Champion takedown, reduce the remaining cooldown of basic abilities by 20%.',
8275: 'Damaging a champion with an ability hurls a comet at their location, or, if Arcane Comet is on cooldown, reduces its remaining cooldown.',
8214: 'Damaging a champion with an ability hurls a comet at their location, or, if Arcane Comet is on cooldown, reduces its remaining cooldown.',
8234: 'Gain a free Summoner Spell that changes based on your choices.',
8233: 'Gain a free Summoner Spell that changes based on your choices.',
8237: 'Damaging a champion with an ability hurls a comet at their location, or, if Arcane Comet is on cooldown, reduces its remaining cooldown.',
8242: 'Gain a free Summoner Spell that changes based on your choices.',
8211: 'Gain a free Summoner Spell that changes based on your choices.',
8236: 'Gain a free Summoner Spell that changes based on your choices.',
8243: 'Gain a free Summoner Spell that changes based on your choices.',
8212: 'Gain a free Summoner Spell that changes based on your choices.',
8232: 'Gain a free Summoner Spell that changes based on your choices.',
8306: 'Your first attack against an enemy champion slows them (per unit cooldown). Slowing champions with active items shoots a freeze ray at them, creating a lingering slow zone.',
8304: 'Gain a free Summoner Spell that changes based on your choices.',
8313: 'Gain a free Summoner Spell that changes based on your choices.',
8321: 'Gain a free Summoner Spell that changes based on your choices.',
8316: 'Gain a free Summoner Spell that changes based on your choices.',
8345: ' '
}

const augmentMapping = {
  93: ['WarmupRoutine', 'Gain the <spellName>Warmup Routine</spellName> Summoner Spell<br><br><rules><spellName>Warmup Routine</spellName> allows you to channel to increase your damage for the rest of the round.</rules>'],
  89: ['Vanish', 'Gain the <spellName>Vanish</spellName> Summoner Spell<br><br><rules><spellName>Vanish</spellName> turns you <stealth>Invisible</stealth>.</rules>'],
  166: ['ChainLightning', "Dealing damage to an enemy also damages their partner for <trueDamage>@DamageMod*100@% true damage</trueDamage> if they're nearby."],
  87: ['Typhoon', 'Your Attacks fire a bolt at an additional target dealing reduced damage and applying on-hits.'],
  108: ['SelfDestruct', 'Start each round with a bomb attached to you. After @BombDelay@ seconds, it explodes for <trueDamage>@MaxHealthDamage*100@% max Health true damage</trueDamage> and <status>Knocks Up</status> for @KnockupDuration@ seconds.<br>'],
  120: ['ServeBeyondDeath', 'The first time you would die each round, instead return to full Health, decaying over @DecayDuration@ seconds. Taking down an enemy champion while your Health is decaying stops the decay and sets your Health to <healing>@TriumphPercent@% max Health</healing>.'],
  66: ['QuantumComputing', '<keywordMajor>Automatically</keywordMajor> slash in a circle around you, dealing bonus damage on the outer edge every @AutoCastCooldown@ seconds.'],
  23: ['DemonsDance', 'Gain the <spellName>Fleet Footwork</spellName> and <spellName>Grasp of the Undying</spellName> Keystone Runes.<br>'],
  21: ['DefensiveManeuvers', 'Gain the <spellName>Defensive Maneuvers</spellName> Summoner Spell<br><br><rules><spellName>Defensive Maneuvers</spellName> Casts both Summoner <spellName>Barrier</spellName> and <spellName>Heal</spellName> on you and your teammate.</rules>'],
  14: ['Chauffeur', "You are attached to your ally and can't move on your own. Your bonus movespeed is also granted to your ally, and you gain <scaleLevel>Ability Haste</scaleLevel> and <attackSpeed>Attack Speed</attackSpeed>."],
  129: ['Marksmage', 'Your Attacks deal additional <physicalDamage>physical damage</physicalDamage> equal to <magicDamage>@APRatio*100@% Ability Power</magicDamage>.'],
  6: ['BladeWaltz', 'Gain the <spellName>Blade Waltz</spellName> Summoner Spell.<br><br><rules><spellName>Blade Waltz</spellName> makes you untargetable while you dash at and damage enemies @TotalHits@ times.</rules>'],
  94: ['WillingSacrifice', 'When your ally drops below <health>@AllyHealthThreshold*100@% Health</health>, trade some of your health for a <shield>Shield</shield> on your ally.'],
  44: ['IceCold', 'Your <status>Slowing</status> effects reduce Move Speed by an extra 100.'],
  214: ['SpinToWin', 'Your spin Abilities gain @SpinHaste@ Ability Haste and deal @SpinDamageAmp*100@% more damage!'],
  5: ['BannerofCommand', 'Gain the <spellName>Banner of Command</spellName> Summoner Spell.<br><br><rules><spellName>Banner of Command</spellName> empowers your ally for a brief duration</rules>.'],
  80: ['TankItOrLeaveIt', 'You can <crit>Critically Defend</crit> using your Crit Chance (max @MaxChance*100@% chance), giving you a chance to reduce damage. Gain @CritChance*100@% Crit Chance.'],
  97: ['WitchfulThinking', 'Gain <scaleAP>@AP@ Ability Power</scaleAP>.'],
  154: ['Quest_UrfsChampion', 'Requirement: Score @TakedownsNeeded@ takedowns.<br><br>Reward: Golden Spatula'],
  90: ['Vengeance', 'After your partner dies, gain massively increased damage and Omnivamp for the remainder of the round.'],
  28: ['Erosion', 'Damaging enemies adds a stacking <scaleArmor>Armor</scaleArmor> and <scaleMR>Magic Resist</scaleMR> shred for @ShredDuration@s. '],
  54: ['MasterofDuality', 'Your Attacks grant you stacking <scaleAP>Ability Power</scaleAP> and your Abilities grant you <scaleAD>Attack Damage</scaleAD>.'],
  51: ['LightemUp', 'Every 4th Attack deals additional <scaleMagic>magic damage</scaleMagic>.'],
  72: ['SearingDawn', "Your Abilities mark enemies, causing them to take extra damage from your ally's next effect."],
  136: ['SlapAround', 'Each time you <status>Immobilize</status> an enemy, gain @AdaptiveForce@ Adaptive Force for the round, stacking infinitely.'],
  133: ['MagicMissile', 'Dealing damage with an Ability fires @NumberOfMissiles@ magic missiles at each enemy hit, each dealing up to <trueDamage>@MaxHealthDamagePerMissile*300@% max Health true damage</trueDamage> based on distance traveled.'],
  135: ['Spellwake', 'Hitting enemies with Abilities creates a blast that deals <magicDamage>magic damage</magicDamage> from you to the location you hit them.'],
  193: ['CenterOfTheUniverse', 'Stars orbit you at your Attack Range, dealing <magicDamage>magic damage</magicDamage> to enemies they pass through.'],
  65: ['PhenomenalEvil', 'Permanently gain <scaleAP>@APPerProc@ Ability Power</scaleAP> when you hit enemies with Abilities.'],
  180: ['BigBrain', 'At the start of each round, gain<shield> @ShieldBase@ Shield </shield>for every <attention>%i:scaleAP% @AP@</attention> Ability Power.'],
  92: ['Vulnerability', 'Your Item and damage over time effects can Critically Strike. Gain @CritChance*100@% Crit chance.'],
  10: ['CannonFodder', 'You enter combat launching from a cannon.'],
  53: ['MadScientist', 'On Round start you grow large (<scaleAD>Adaptive Force</scaleAD> and <healing>Health</healing>) or tiny (<scaleLevel>Ability Haste</scaleLevel> and <speed>Move Speed</speed>).'],
  57: ['MountainSoul', 'You gain the Mountain Soul, gaining <shield>Shield</shield> after being out of combat for a short time.'],
  88: ['UltimateRevolution', 'Once per round, refresh your Ultimate Ability after casting it.'],
  171: ['Dematerialize', 'Gain @AdaptiveForce@ Adaptive Force on takedown, once per champion per round.'],
  39: ['FrostWraith', 'Every @Cooldown@ seconds, <keywordMajor>Automatically</keywordMajor> <status>Root</status> nearby enemies for @RootDuration@ second.<br>'],
  79: ['SymphonyofWar', 'Gain the <spellName>Lethal Tempo</spellName> and <spellName>Conqueror</spellName> Keystone Runes.'],
  86: ['TrueshotProdigy', 'When you damage a champion from far away, <keywordMajor>Autocast</keywordMajor> a <abilityName>Trueshot Barrage</abilityName> at them.'],
  30: ['Eureka', 'Gain Ability Haste equal to <scaleAP>@APToHasteConversion*100@% of your Ability Power</scaleAP>'],
  60: ['OceanSoul', 'Gain the Ocean Soul, granting high <healing>Health</healing> and <scaleMana>Mana</scaleMana> regen after damaging enemies.'],
  15: ['CircleofDeath', '<health>Healing</health> and Regen you do deals a portion of the value in <scaleAP>Magic Damage</scaleAP> to the nearest enemy champion.'],
  156: ['Quest_WoogletsWitchcap', "Immediate: Gain Needlessly Large Rod.<br><br>Requirement: Possess Needlessly Large Rod, Rabadon's Deathcap, and Zhonya's Hourglass.<br><br>Reward: Gain Wooglet's Witchcap"],
  27: ['Earthwake', 'Your dash, leap, blink, or teleport Abilities leave behind a trail that detonates after 1 second.'],
  170: ['ScopedWeapons', 'Gain @MeleeRangeIncrease@ Attack Range, reduced to @RangedRangeIncrease@ if you are Ranged.'],
  103: ['BreadAndButter', 'Your Q gains @QAbilityHaste@ Ability Haste.'],
  82: ['TheBrutalizer', 'Gain <scaleAD>@AD@ Attack Damage</scaleAD>, <scaleLevel>@AbilityHaste@ Ability Haste</scaleLevel>, and <scaleAD>@Lethality@ Lethality</scaleAD>.'],
  213: ['FullyAutomated', 'Your <keywordMajor>Autocast</keywordMajor> Cooldowns are reduced by @AutocastFlatCDR@ seconds and benefit from your Ability Haste.'],
  76: ['SonicBoom', 'Buffing, <healing>Healing</healing>, or <shield>Shielding</shield> your ally deals damage and <status>Slows</status> enemies surrounding them.'],
  107: ['TwiceThrice', 'Every third Attack, your On-Hits trigger a second time.'],
  13: ['CelestialBody', 'Gain <health>@Health@ Health</health>, but you deal @DamageReduction*100@% less damage.'],
  150: ['BreadAndJam', 'Your W gains @WAbilityHaste@ Ability Haste.'],
  98: ['WithHaste', 'Gain <moveSpeed>Move Speed</moveSpeed> equal to @AbilityHasteToMSConversion@ times your <scaleLevel>Ability Haste</scaleLevel>.'],
  34: ['FallenAegis', 'Start combat with a <abilityName>Black Shield</abilityName> for @ShieldDuration@s.<br><br><rules><abilityName>Black Shield</abilityName> blocks Magic Damage and <status>Immobilizing</status> effects.</rules>'],
  198: ['HolyFire', 'Your <healing>Healing</healing> and <shield>Shielding</shield> apply an infinitely stacking <keywordMajor>Burn</keywordMajor> to a nearby enemy, dealing damage over time.'],
  35: ['FeeltheBurn', 'Gain the <spellName>Feel the Burn</spellName> Summoner Spell.<br><br><rules><spellName>Feel the Burn</spellName> casts <spellName>Ignite</spellName> and <spellName>Exhaust</spellName> on all nearby enemy champions.</rules>'],
  42: ['GuiltyPleasure', '<status>Immobilizing</status> enemy champions <healing>restores @TotalHeal@ Health</healing>.'],
  71: ['ScopierWeapons', 'Gain @MeleeRangeIncrease@ Attack Range, reduced to @RangedRangeIncrease@ if you are Ranged.'],
  9: ['BuffBuddies', 'You gain permanent Red and Blue Buffs.'],
  125: ['RaidBoss', 'You start each round imprisoned in the center of the arena, unable to act. While imprisoned, you have @DamageReductionMax*100@% damage reduction and gain size, <healing>Health</healing>, <physicalDamage>Attack Damage</physicalDamage>, and <magicDamage>Ability Power</magicDamage> over time (max @StatIncrease*100@%). After @ImprisonDuration@ seconds or reaching <healing>@BreakoutHealthThreshold*100@% Health</healing>, you break out, <status>Knocking Back</status> enemies and gaining <shield>@ShieldHealthRatio*100@% max Health Shield</shield>.'],
  63: ['OutlawsGrit', 'After using a dash, leap, blink, or teleport Ability you gain <scaleArmor>@ResistsPerStack@ Armor</scaleArmor> and <scaleMR>Magic Resist</scaleMR>.<br><br>This stacks up to @MaxStacks@ times.'],
  26: ['DontBlink', 'Deal more damage to enemies the faster you are than them.'],
  73: ['ShadowRunner', 'After using a dash, leap, blink, or teleport Ability or exiting <stealth>Stealth</stealth>, gain @MSAmount@ Move Speed for @BuffDuration@ seconds.'],
  45: ['InfernalConduit', 'Your Abilities apply a stacking <keywordMajor>Burn</keywordMajor>, dealing <scaleAP>Magic Damage</scaleAP> over time.<br><br>Your <keywordMajor>Burn</keywordMajor> effects reduce your basic Ability cooldowns.'],
  205: ['ADAPt', 'Convert <physicalDamage>Bonus Attack Damage</physicalDamage> to <magicDamage>Ability Power</magicDamage>. Gain <magicDamage>@APAmp*100@% Ability Power</magicDamage>.'],
  4: ['BacktoBasics', 'Gain increased damage, <scaleLevel>Damage</scaleLevel>, <healing>Healing</healing>, <shield>Shielding</shield>, and <scaleBonus>Ability Haste</scaleBonus>, but you <keywordMajor>cannot use your Ultimate Ability</keywordMajor>.'],
  110: ['Clothesline', 'There is a tether between you and your partner that constantly damages enemies inside.'],
  83: ['ThiefsGloves', 'Remove your current items, gain random items each combat instead. Bonus stats and item damage is increased by @ItemStatAmp*100@%.'],
  102: ['DontChase', 'You become Ghosted and leave a trail of poisonous gas behind you, dealing <magicDamage>magic damage</magicDamage> to enemies inside.'],
  77: ['SoulSiphon', 'Gain <crit>@CritChance*100@% Crit Chance</crit> and @HealPercentage*100@% Lifesteal on <crit>Critical Strikes</crit>.'],
  84: ['ThreadtheNeedle', 'Gain @PercentPen*100@% <scaleAD>Armor Penetration</scaleAD> and <scaleAP>Magic Penetration</scaleAP>.'],
  151: ['BreadAndCheese', 'Your E gains @EAbilityHaste@ Ability Haste.'],
  149: ['Impassable', 'Gain the <keywordMajor>Aftershock</keywordMajor> and <keywordMajor>Glacial Augment</keywordMajor> Keystone Runes.'],
  33: ['ExtendoArm', '<keywordMajor>Automatically</keywordMajor> fire a Blitzcrank hook every 12 seconds at a nearby enemy champion.'],
  75: ['SlowCooker', 'Every second, apply a stacking <keywordMajor>Burn</keywordMajor> to nearby enemy champions scaling with your <health>Max Health</health>. The <keywordMajor>Burn</keywordMajor> stacks infinitely.'],
  24: ['DieAnotherDay', 'Gain the <spellName>Die Another Day</spellName> Summoner Spell<br><br><rules><spellName>Die Another Day</spellName> creates a zone where no unit can die for 4 seconds.</rules>'],
  78: ['SpiritLink', '@DamageRedirectPercentage*100@% of damage dealt to your ally is redirected to you, and @HealCopyPercentage*100@% of <healing>healing</healing> they receive is given to you as well.'],
  192: ['Quest_AngelofRetribution', 'Requirement: Restore or prevent @RequirementAmount@ damage to allies.<br><br>Reward: Gain <attackspeed>@AttackSpeed*100@% Attack Speed</attackspeed>, and your Attacks deal additional <magicdamage>magic damage</magicdamage> equal to <healing>@HealPowerToDamageConversion*100@% Heal/Shield Power</healing>.'],
  17: ['ContractKiller', 'Each round, mark an opponent to take @DamageAmp*100@% more damage and grant an extra @Gold@ gold on death.'],
  138: ['Goredrink', 'Gain @Omnivamp*100@% Omnivamp'],
  37: ['FirstAidKit', 'Gain <healing>@HealShieldAmp*100@% Heal and Shield Power</healing>.'],
  61: ['OkBoomerang', '<keywordMajor>Autocast</keywordMajor> a boomerang at a nearby enemy every 7s.'],
  49: ['JuiceBox', 'Each round, you and your teammate get an additional Juice for free.'],
  115: ['ScopiestWeapons', 'Gain @MeleeRangeIncrease@ Attack Range, reduced to @RangedRangeIncrease@ if you are Ranged.'],
  204: ['StackosaurusRex', 'When you gain permanent <keywordMajor>Stacks</keywordMajor> of an Ability, gain @StackModifier*100@% more!'],
  206: ['escAPADe', 'Convert <magicDamage>Ability Power</magicDamage> to <physicalDamage>Bonus Attack Damage</physicalDamage>. Gain <physicalDamage>@ADAmp*100@% Attack Damage</physicalDamage>.'],
  194: ['FeyMagic', 'Damaging with your Ultimate <status>Polymorphs</status> enemies for @PolyDuration@ seconds (@PolyCooldown@ second Cooldown).'],
  36: ['Firebrand', 'Your Attacks apply an infinitely stacking <keywordMajor>Burn</keywordMajor>, dealing damage over time.'],
  116: ['Flashy', 'Your Flash has 3 Ammo and a @FlashCooldown@ second Cooldown.'],
  177: ['NestingDoll', 'When you die for the first time, revive as a smaller version of yourself with @ReviveMod*100@% max Health and deal @ReviveMod*100@% damage. If you die again, revive as an even smaller version of yourself with @SecondReviveMod*100@% max Health and deal @SecondReviveMod*100@% damage.<br><br>When you revive, <status>Knockback</status> enemies around you.'],
  81: ['TapDancer', 'Your Attacks grant you <moveSpeed>@MSPerHit@ Move Speed</moveSpeed>, stacking infinitely. Gain AS equal to @MSToASConversion*10000@% of your MS.'],
  85: ['Tormentor', '<status>Immobilizing</status> enemy champions applies a <keywordMajor>Burn</keywordMajor> that deals damage over time, stacking infinitely.'],
  104: ['Minionmancer', 'Your summons gain @MinionSizeIncrease*100@% increased size, health, and damage.'],
  29: ['EtherealWeapon', 'Your Abilities apply on-hit effects. 1 second cooldown per target.'],
  62: ['OmniSoul', 'Gain 3 random Dragon Souls.'],
  20: ['DawnbringersResolve', 'Upon dropping below @HealthThreshold*100@% Health, heal for @HealAmount*100@% max Health over 3 seconds.<br>'],
  207: ['HoldVeryStill', 'Gain <spellName>Guerrilla Warfare</spellName><br><br><rules>After not moving for @HoldStillDuration@ seconds, turn <keywordStealth>Invisibile</keywordStealth> until you move. When you exit this <keywordStealth>Invisibility</keywordStealth>, gain <attackSpeed>@BonusAS@ Attack Speed</attackSpeed>.</rules>'],
  38: ['FromBeginningToEnd', 'Gain the <spellName>First Strike</spellName> and <spellName>Dark Harvest</spellName> Keystone Runes.'],
  11: ['CantTouchThis', 'Casting your Ultimate also makes you <status>Invulnerable</status> for a short duration.'],
  176: ['SnowballFight', 'Replace Summoner Flee with Mark.<br><br><rules>Mark throws a snowball that marks the first enemy hit and deals damage. <recast>Recast</recast> to dash to the marked enemy.</rules>'],
  47: ['ItsCritical', 'Gain <crit>@CritChance*100@% Crit Chance</crit>.'],
  200: ['BloodBrother', "Gain Darius's Passive <spellName>Hemorrhage</spellName>.<br><br><rules>Attacks and damaging Abilities cause the target to <keywordMajor>Hemorrhage</keywordMajor>, dealing <physicalDamage>@BleedDamagePerStack@ physical damage</physicalDamage> over @BleedDuration@ seconds, stacking up to @MaxStacks@ times.<br><br>Draven gains  <scaleAD>@NoxianMightBonusAD@ Attack Damage</scaleAD> at @MaxStacks@ <keywordMajor>Hemorrhage</keywordMajor> stacks.</rules><br><br>"],
  112: ['UltimateUnstoppable', 'After using your Ultimate, you become immune to crowd control for @UnstoppableDuration@ seconds. (@Cooldown@ second Cooldown).'],
  68: ['Recursion', 'Gain <scaleLevel>@AbilityHaste@ Ability Haste</scaleLevel>.'],
  22: ['Deft', 'Gain @AttackSpeed*100@% Attack Speed.'],
  41: ['Goliath', 'Become large, gaining @HealthAmp*100@% <scaleHealth>Health</scaleHealth> and @ADAmp*100@% <scaleAP>Adaptive Force</scaleAP>.'],
  1: ['AcceleratingSorcery', 'Using Abilities grant you infinitely stacking <scaleBonus>Ability Haste</scaleBonus>.'],
  208: ['OrbitalLaser', 'Replace Summoner Flee with <spellName>Orbital Laser</spellName>.<br><br><rules>After a delay, call down an orbital laser that deals <trueDamage>@DamagetoChampions*100@% max Health true damage</trueDamage> plus <magicDamage>@TotalDamageOverTimeTooltip@ magic damage</magicDamage> over @GroundDuration@ seconds.</rules>'],
  58: ['MysticPunch', 'Your Attacks reduce your cooldowns by @CooldownRefund@ seconds.'],
  105: ['Homeguard', 'Gain <speed>@MovementSpeed*100@% Move Speed</speed>, disabled for @DisableCooldown@ seconds after taking damage.'],
  181: ['HeavyHitter', 'Your Attacks deal additional <physicalDamage>physical damage</physicalDamage> equal to @HealthPercent*100@% of your <healing>max Health.</healing>'],
  67: ['RabbleRousing', 'Using an Ability heals you for <healing>@HealAmount@ Health</healing>.'],
  195: ['GiantSlayer', 'Become tiny, gain <speed>Move Speed</speed>, and bonus damage to champions based on how much larger they are than you.'],
  40: ['FrozenFoundations', 'Gain the <spellName>Frozen Foundations</spellName> Summoner Spell<br><br><rules><spellName>Frozen Foundations</spellName> summons a wall of ice at a location.</rules>'],
  118: ['CriticalHealing', 'Your Heals and Shields can Critically Strike. Gain @CritChance*100@% Crit Chance.'],
  2: ['ApexInventor', 'Gain <scaleBonus>@ItemHaste@ Item Haste</scaleBonus> (equivalent to @TooltipCDR@% Item CDR).<br><br><rules>Item Haste reduces the cooldown of all Item Abilities.</rules>'],
  172: ['MirrorImage', 'When you drop below @HealthThreshold*100@% Health, briefly become <keywordStealth>Invisible</keywordStealth> and create a clone of yourself.'],
  141: ['AllForYou', 'Your Heals/Shields are @HealShieldAmp*100@% stronger when used on your partner.'],
  50: ['KeystoneConjurer', 'Gain the <spellName>Summon Aery</spellName> and <spellName>Arcane Comet</spellName> Keystone Runes.'],
  174: ['LaserEyes', 'There is a laser in the direction you are facing that deals continuous <magicDamage>magic damage</magicDamage>.'],
  59: ['Mythical', 'You can buy any number of Mythic Items.'],
  19: ['Dashing', 'Your dash, leap, blink, or teleport Abilities gain <scaleLevel>@Haste@ Ability Haste</scaleLevel>.'],
  52: ['LightningStrikes', 'Gain <scaleAD>Attack Damage</scaleAD> scaling with your <attackSpeed>Attack Speed</attackSpeed>.'],
  69: ['Repulsor', 'On dropping below @HealthThreshold1*100@ or @HealthThreshold2*100@% Health, nearby enemies are <status>Knocked Back</status>.'],
  113: ['SkilledSniper', 'Hitting an enemy with a non-Ultimate Ability at over @SnipeDistance@ range reduces its Cooldown to @ReducedCooldown@ seconds.'],
  175: ['ParasiticRelationship', 'You heal for @HealPercent*100@% of the damage dealt by your partner.'],
  165: ['Restart', 'Your non-Ultimate Abilities <keywordMajor>Automatically</keywordMajor> refresh every @CoolDown@ seconds.'],
  134: ['DrawYourSword', 'You are now melee. Gain <physicalDamage>@BonusAD*100@% Attack Damage</physicalDamage>, <healing>@BonusHP*100@% Health</healing>, <attackSpeed>@BonusAS*100@% Attack Speed</attackSpeed>, <lifesteal>@BonusLifesteal*100@% Lifesteal</lifesteal>, and <speed>@BonusMS*100@% Move Speed</speed> (each further increased based on Attack Range lost).'],
  70: ['RestlessRestoration', 'You constantly <healing>heal</healing> while moving, increased by distance travelled.'],
  25: ['DiveBomber', "Your team's first death each round explodes, dealing massive damage."],
  7: ['BluntForce', 'Gain <scaleAD>@ADIncrease*100@% Attack Damage</scaleAD>.'],
  109: ['Oathsworn', "Replace Summoner Flee with <spellName>Fate's Call</spellName> <br><br><rules><spellName>Fate's Call</spellName> pulls your partner inside of you for up to 4 seconds, making them Untargetable. The partner can move to launch themself out, <status>Knocking Back</status> the first champion hit and all surrounding enemies.</rules><br>"],
  187: ['Flashbang', 'When you Flash, there is an explosion around you dealing <MagicalDamage>magic damage </MagicalDamage> and <status>Slowing</status> enemies hit. Additionally, Flash resets every round.'],
  123: ['SummonersRoulette', 'Replace your Summoner spells with random ones. When you use a Summoner Spell in combat, replace it with another random one on a @Cooldown@ second Cooldown.'],
  74: ['ShrinkRay', "Your Attacks reduce an enemy's damage by @DamageReduction*100@% for 3 seconds."],
  12: ['Castle', 'Gain the <spellName>Castle</spellName> Summoner Spell<br><br><rules><spellName>Castle</spellName> allows you to swap places with your ally.</rules>'],
  152: ['Quest_SteelYourHeart', 'Requirement: Possess Heartsteel with @StackThreshold@+ stacks.<br><br>Reward: Multiply your Heartsteel stacks by @StackMultiplication@. Increase your <healing>Health Regeneration</healing> by @StacktoRegenConversion*100@% of your Heartsteel stacks.'],
  32: ['Executioner', 'Deal @BonusDamage*100@% more damage to enemies below @HealthThreshold*100@% health. Reset your basic abilities on takedown.'],
  18: ['CourageoftheColossus', 'Gain a <shield>@TotalShield@ Shield</shield> after <status>Immobilizing</status> an enemy champion.<br>'],
  46: ['InfernalSoul', 'You gain the Infernal Soul, dealing bonus damage when you hit enemies with Abilities or Attacks.'],
  16: ['ComboMaster', 'Gain the <spellName>Electrocute</spellName> and <spellName>Phase Rush</spellName> Keystone Runes.'],
  56: ['MindtoMatter', 'Increase <healing>max Health</healing> by half of your <scaleMana>Mana</scaleMana>.'],
  211: ['ItsKillingTime', 'After casting your Ultimate, mark all enemy champions for death. The mark stores @DamageStorePercentage*100@% of damage dealt to them, then detonates for the stored damage after @MarkDuration@ seconds. (@Cooldown@ second Cooldown).'],
  96: ['WisdomofAges', 'Gain 1 level now, and 1 bonus level every other round. Your level cap is removed.'],
  43: ['NowYouSeeMe', 'Gain the <spellName>Now You See Me</spellName> Summoner Spell<br><br><rules><spellName>Now You See Me</spellName> teleports you back to the starting position of your last Movement Ability.</rules>'],
  64: ['Perseverance', 'Gain hugely increased <healing>Health Regen</healing>, which is further increased while low on Health.'],
  48: ['JeweledGauntlet', 'Your Abilities can Critically Strike. Gain 20% Crit Chance.'],
}


// Determines the game mode type based on unique queueID
function determineGameMode(queueId) {
  return gameModes[queueId] || 'Unknown Mode';
}

// Determines how long match took place based on current time
function calculateTimeAgo(gameCreationTimestamp) {
  const currentTimestamp = Date.now();
  const gameCreationDate = new Date(gameCreationTimestamp);

  const timeDifference = currentTimestamp - gameCreationDate.getTime();
  const secondsAgo = Math.floor(timeDifference / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);

  if (monthsAgo > 0) {
    return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
}


function formatGameDuration(gameDurationInSeconds) {
  const minutes = Math.floor(gameDurationInSeconds / 60)
  const seconds = gameDurationInSeconds % 60

  const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return formattedDuration
}


function csperminute(gameDurationInSeconds) {
  const minutes = Math.floor(gameDurationInSeconds / 60)
  return minutes
}

function formatGold(value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  } else {
    return value.toString();
  }
}

/*Helps with dropdown container toggle */
class DropdownContent extends Component {
  render() {
    return;
  }
}

/*Helps with dropdown container toggle */
class MatchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDropdownIndex: null,
    };
  }

  handleSummonerNameClick = (summonerName) => {
    const url = `/data/${summonerName}`;
    window.location.href = url;
  };

  toggleDropdown = (index) => {
    this.setState((prevState) => ({
      activeDropdownIndex: prevState.activeDropdownIndex === index ? null : index,
    }));
  };

  render() {
    const { gameList, rankedData, currentSummonerName, searchInput, version } = this.props;
    const { activeDropdownIndex } = this.state;

    
    // Decides data slicing based on if its regular or Arena
    function chooseSlice(datax) {
      if (datax.info && datax.info.queueId) {
        if (determineGameMode(datax.info.queueId) === "Arena") {
          return [0, 4, 8];
        } else {
          return [0, 5, 10];
        }
      } else {
        // Handle the case where datax.info or datax.info.queueId is undefined
        return [0, 5, 10];
      }
    }
    function chooseAugmentDropdown(DATA, x) {
      // Check if DATA and DATA.info.queueId are defined, and if playerAugmentX is not undefined
      if (
        DATA &&
        (DATA)['playerAugment' + x] !== undefined
      ) {
        let augmentEntry = augmentMapping[(DATA)['playerAugment' + x]];
    
        if (augmentEntry && augmentEntry.length > 0) {
          return augmentEntry[0];
        } else {
          return "Unknown";
        }
      } else {
        return "Unknown";
      }
    }
    
    // Match summary rendering for ally team and enemy team
    const renderPlayer = (data, participantIndex) => (
      <div key={participantIndex} className="ally-match-summary-row">
        <div className="ms-champion-face">
          <img
            className="icon"
            src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${data.championName === 'FiddleSticks' ? 'Fiddlesticks' : data.championName}.png`}
            alt={`${data.championName} Icon`}
          />
          <div className="champion-level">{data.champLevel}</div>
        </div>

        <div className="g2-row-two">
          <div className="summoner-spells-column">
            <>
              <div className="summoner-spell">
                <img
                  className="icon1"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[data.summoner1Id]}.png`}
                  alt={`${summonerSpellMapping[data.summoner1Id]} Icon`}
                />
              </div>
              <div className="summoner-spell">
                <img
                  className="icon2"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[data.summoner2Id]}.png`}
                  alt={`${summonerSpellMapping[data.summoner2Id]} Icon`}
                />
              </div>
            </>

          </div>

          {/*Check if keystone exists in keystonemapping, if so output runes, else dont (fixes Arena layout) */}
          {data.perks.styles[0] && data.perks.styles[0].selections[0].perk in keystoneMapping ? (
            <div className="runes-column">
              <>
                <div className="single-rune">
                  <img
                    className="icon1"
                    src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/small-perk-images/Styles/${runeStyleMapping[data.perks.styles[0].style]}/${keystoneMapping[data.perks.styles[0].selections[0].perk]}/${keystoneMapping[data.perks.styles[0].selections[0].perk]}${keystoneMapping[data.perks.styles[0].selections[0].perk] === 'LethalTempo' ? 'Temp' : ''}.png`}
                    alt={`${keystoneMapping[data.perks.styles[0].selections[0].perk]} Icon`}
                  />
                </div>
                <div className="single-rune">
                  <img
                    className="icon2"
                    src={`https://static.bigbrain.gg/assets/lol/runes/${data.perks.styles[1].style}.png`}
                    alt={`${data.perks.styles[1].style} Icon`}
                  />
                </div>
              </>
            </div>
          ) : (
            <>
            {data.playerAugment1 !== 0 && data.playerAugment2 !== 0 && (
              <div className="runes-column">
                {/* Content for the first case */}
                <div className="augment-container">
                  <img
                    className="icon1"
                    src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdown(data, 1)}.png`}
                    alt={`${chooseAugmentDropdown(data, 1)} Augment Icon`}
                  />
                </div>
                <div className="augment-container">
                  <img
                    className="icon2"
                    src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdown(data, 2)}.png`}
                    alt={`${chooseAugmentDropdown(data, 2)} Augment Icon`}
                  />
                </div>
              </div>
              )}
          
          {data.playerAugment3 !== 0 && data.playerAugment4 !== 0 && (
              <div className="runes-column">
                {/* Content for the first case */}
                <div className="augment-container">
                  <img
                    className="icon1"
                    src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdown(data, 3)}.png`}
                    alt={`${chooseAugmentDropdown(data, 3)} Augment Icon`}
                  />
                </div>
                <div className="augment-container">
                  <img
                    className="icon2"
                    src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdown(data, 4)}.png`}
                    alt={`${chooseAugmentDropdown(data , 4)} Augment Icon`}
                  />
                </div>
              </div>
              )}
            </>
          )}

        </div>

        <div>
          <div className="ms-rank-and-summonername-row">
            <div className="ms-summoner-name-container" onClick={() => this.handleSummonerNameClick(data.summonerName)}>
              <p className={currentSummonerName === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
            </div>

          </div>
        </div>

        <div>
          <div className="ms-kda">
            {data?.kills}/{data?.deaths}/{data?.assists}
          </div>
          <div className="ms-kda-ratio">
            <b>{((data?.kills + data?.assists) / data?.deaths).toFixed(2)}</b>&nbsp;KDA
          </div>
        </div>

        <div>
          {(data?.totalDamageDealtToChampions).toLocaleString()}
        </div>

        <div>
          {formatGold(data?.goldEarned)}
        </div>

        <div>
          {data?.totalMinionsKilled + data?.neutralMinionsKilled} CS
        </div>

        <div>
          {data?.wardsPlaced}
        </div>

        <div className="ms-items">
          <div className="ms-item-container">
            <div className="ms-item-row-1">
              <div className="item-0">
                {data?.item0 !== 0 && (
                  <img
                    className="item-image"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item0}.png`}
                    alt={`${data.item0} Icon`}
                  />
                )}
              </div>
              <div className="item-1">
                {data?.item1 !== 0 && (
                  <img
                    className="item-image"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item1}.png`}
                    alt={`${data.item1} Icon`}
                  />
                )}
              </div>
              <div className="item-2">
                {data?.item2 !== 0 && (
                  <img
                    className="item-image"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item2}.png`}
                    alt={`${data.item2} Icon`}
                  />
                )}
              </div>
              <div className="item-6">
                {data?.item6 !== 0 && (
                  <img
                    className="item-image"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item6}.png`}
                    alt={`${data.item6} Icon`}
                  />
                )}
              </div>
            </div>
            <div className="ms-item-row-2">
              <div className="item-3">
                {data?.item3 !== 0 && (
                  <img
                    className="item-image"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item3}.png`}
                    alt={`${data.item3} Icon`}
                  />
                )}
              </div>
              <div className="item-4">
                {data?.item4 !== 0 && (
                  <img
                    className="item-image"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item4}.png`}
                    alt={`${data.item4} Icon`}
                  />
                )}
              </div>
              <div className="item-5">
                {data?.item5 !== 0 && (
                  <img
                    className="item-image"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item5}.png`}
                    alt={`${data.item5} Icon`}
                  />
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    );
    return (
      <div class="column">
        {gameList.length !== 0 ? (
          <>
            {gameList.map((gameData, index) => {
              const searchedParticipant = gameData.info.participants.find(participant => participant.summonerName === currentSummonerName);
              const searchedParticipantIndex = gameData.info.participants.findIndex(participant => participant.summonerName === searchInput);
              const runePrimaryPath = runeStyleMapping[searchedParticipant?.perks.styles[0].style];
              const runePrimaryKeystone = keystoneMapping[searchedParticipant?.perks.styles[0].selections[0].perk];
              const dataSlice = chooseSlice(gameData);
              
              function chooseAugment(x) {
                // Check if searchedParticipant is defined and has the property playerAugmentX
                if (
                  searchedParticipant &&
                  searchedParticipant['playerAugment' + x] !== undefined
                ) {
                  let augmentEntry = augmentMapping[searchedParticipant['playerAugment' + x]];
                  
                  if (augmentEntry && augmentEntry.length > 0) {
                    return augmentEntry[0];
                  } else {
                    return "Unknown"; // Corrected the spelling of 'Unknown'
                  }
                } else {
                  return "Unknown";
                }
              }

              return (
                <div key={index} className="match-summary-box">

                  <div className="content-container">

                    <div className="group-one">
                      <div className="g1-row-one">
                        <div className="queue-type-box">
                          <p>{determineGameMode(gameData.info.queueId)}</p>
                        </div>

                        <div className="date-box">
                          <p>{calculateTimeAgo(gameData.info.gameCreation)}</p>
                        </div>
                      </div>

                      <div className="g1-row-two">
                        <p> ? LP * </p>
                      </div>

                      <div className="g1-row-three">
                        <div className="win-or-loss-box">
                          {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                            <>
                              <p className={searchedParticipant?.win ? 'win' : 'loss'}>
                                {searchedParticipant?.win ? 'Win' : 'Loss'}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="match-duration-box">
                          <p>{formatGameDuration(gameData.info.gameDuration)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="group-two">
                      <div className="g2-row-one">
                        <div className="g2-champion-container">
                          <div className="g2-champion-face">
                            {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                              <>
                                <img
                                  className="icon"
                                  src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${searchedParticipant?.championName === 'FiddleSticks' ? 'Fiddlesticks' : searchedParticipant?.championName}.png`}
                                  alt={`${searchedParticipant?.championName} Icon`}
                                />
                                <div className="champion-level">
                                  {searchedParticipant?.champLevel}
                                </div>
                              </>

                            )}
                          </div>
                        </div>
                      </div>

                      <div className="g2-row-two">
                        <div className="summoner-spells-column">
                          {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                            <>
                              <div className="summoner-spell">
                                <img
                                  className="icon1"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[searchedParticipant?.summoner1Id]}.png`}
                                  alt={`${summonerSpellMapping[searchedParticipant?.summoner1Id]} Icon`}
                                />
                              </div>
                              <div className="summoner-spell">
                                <img
                                  className="icon2"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[searchedParticipant?.summoner2Id]}.png`}
                                  alt={`${summonerSpellMapping[searchedParticipant?.summoner2Id]} Icon`}
                                />
                              </div>
                            </>
                          )}
                        </div>

                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && determineGameMode(gameData.info.queueId) !== "Arena" ? (
                          <div className="runes-column">
                            <>
                              <div className="single-rune">
                                <img
                                  className="icon1"
                                  src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/small-perk-images/Styles/${runePrimaryPath}/${runePrimaryKeystone}/${runePrimaryKeystone}${runePrimaryKeystone === 'LethalTempo' ? 'Temp' : ''}.png`}
                                  alt={`${runePrimaryKeystone} Icon`}
                                />
                              </div>
                              <div className="single-rune">
                                <img
                                  className="icon2"
                                  src={`https://static.bigbrain.gg/assets/lol/runes/${searchedParticipant.perks.styles[1].style}.png`}
                                  alt={`${searchedParticipant.perks.styles[1].style} Icon`}
                                />
                              </div>
                            </>
                          </div>
                        ) : (
                          <>
                        {searchedParticipant?.playerAugment1 !== 0 && searchedParticipant?.playerAugment2 !== 0 &&  (
                          <div className="runes-column">
                            {/* Content for the first case */}
                            <div className="augment-container">
                              <img
                                className="icon1"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(1)}.png`}
                                alt={`${chooseAugment(1)} Augment Icon`}
                              />
                            </div>
                            <div className="augment-container">
                              <img
                                className="icon2"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(2)}.png`}
                                alt={`${chooseAugment(2)} Augment Icon`}
                              />
                            </div>
                          </div>
                          )}
                      
                      {searchedParticipant?.playerAugment3 !== 0 && searchedParticipant?.playerAugment4 !== 0 && (
                          <div className="runes-column">
                            {/* Content for the first case */}
                            <div className="augment-container">
                              <img
                                className="icon1"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(3)}.png`}
                                alt={`${chooseAugment(3)} Augment Icon`}
                              />
                            </div>
                            <div className="augment-container">
                              <img
                                className="icon2"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(4)}.png`}
                                alt={`${chooseAugment(4)} Augment Icon`}
                              />
                            </div>
                          </div>
                          )}
                        </>
                      )}
                      </div>

                    </div>

                    <div className="group-three">
                      <div className="g3-kda">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                            {searchedParticipant?.kills}/{searchedParticipant?.deaths}/{searchedParticipant?.assists}
                          </>
                        )}
                      </div>
                      <div className="g3-kda-ratio">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                            {((searchedParticipant?.kills + searchedParticipant?.assists) / searchedParticipant?.deaths).toFixed(2)} KDA
                          </>
                        )}
                      </div>
                      <div className="g3-cs">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                            {searchedParticipant?.totalMinionsKilled + searchedParticipant?.neutralMinionsKilled} CS ({((searchedParticipant?.totalMinionsKilled + searchedParticipant?.neutralMinionsKilled) / csperminute(gameData.info.gameDuration)).toFixed(1)})
                          </>
                        )}
                      </div>
                      <div className="g3-vision-score">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                            {searchedParticipant?.visionScore} Vision
                          </>
                        )}
                      </div>
                    </div>

                    <div className="group-four">
                      <div className="item-container">
                        <div className="item-row-1">
                          <div className="item-0">
                            {searchedParticipant && searchedParticipant.item0 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0 !== 0) && (
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item0}.png`}
                                    alt={`${searchedParticipant.item0} Icon`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                          <div className="item-1">
                            {searchedParticipant && searchedParticipant.item1 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item1}.png`}
                                    alt={`${searchedParticipant.item1} Icon`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                          <div className="item-2">
                            {searchedParticipant && searchedParticipant.item2 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item2}.png`}
                                    alt={`${searchedParticipant.item2} Icon`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                          <div className="item-6">
                            {searchedParticipant && searchedParticipant.item6 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item6}.png`}
                                    alt={`${searchedParticipant.item6} Icon`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="item-row-2">
                          <div className="item-3">
                            {searchedParticipant && searchedParticipant.item3 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item3}.png`}
                                    alt={`${searchedParticipant.item3} Icon`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                          <div className="item-4">
                            {searchedParticipant && searchedParticipant.item4 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item4}.png`}
                                    alt={`${searchedParticipant.item4} Icon`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                          <div className="item-5">
                            {searchedParticipant && searchedParticipant.item5 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item5}.png`}
                                    alt={`${searchedParticipant.item5} Icon`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="group-five">
                      <div className="champion-icon-and-summoner-name-column">
                        {gameData.info.participants.slice(dataSlice[0], dataSlice[1]).map((data, participantIndex) => (
                          <div key={participantIndex} className="champion-icon-and-summoner-name-row" onClick={() => this.handleSummonerNameClick(data.summonerName)}>
                            <div className="champion-img-container">
                              <img
                                className="icon"
                                src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${data.championName === 'FiddleSticks' ? 'Fiddlesticks' : data.championName}.png`}
                                alt={`${data.championName} Icon`}
                              />
                              <div className="summoner-name-container">
                                <p className={currentSummonerName === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="champion-icon-and-summoner-name-column">
                        {gameData.info.participants.slice(dataSlice[1], dataSlice[2]).map((data, participantIndex) => (
                          <div key={participantIndex} className="champion-icon-and-summoner-name-row" onClick={() => this.handleSummonerNameClick(data.summonerName)}>
                            <div className="champion-img-container">
                              <img
                                className="icon"
                                src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${data.championName === 'FiddleSticks' ? 'Fiddlesticks' : data.championName}.png`}
                                alt={`${data.championName} Icon`}
                              />
                              <div className="summoner-name-container">
                                <p className={currentSummonerName === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`dropdown-triangle ${activeDropdownIndex === index ? 'upside-down' : ''}`} onClick={() => this.toggleDropdown(index)}>
                      <p> V </p>
                    </div>

                    {/* Dropdown Content */}
                    {activeDropdownIndex === index && (
                      <>
                        <DropdownContent />
                        <div className="dropdown-box">
                          <div className="ally-side-container">
                            <div className="ally-header-container" >
                              <div className="ally-match-result">
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                                  <>
                                    <p className={searchedParticipant?.win ? 'win' : 'loss'}>
                                      {searchedParticipant?.win ? 'Victory' : 'Defeat'}
                                    </p>
                                  </>
                                )}
                              </div>
                              <div>KDA</div>
                              <div>Damage</div>
                              <div>Gold</div>
                              <div>CS</div>
                              <div>Wards</div>
                              <div>Items</div>
                            </div>

                            <div className="ally-match-summary-container">
                              {searchedParticipantIndex < 5 ? (
                                // Output data for ally teammates, index 0,5
                                gameData.info.participants.slice(dataSlice[0], dataSlice[1]).map(renderPlayer)
                              ) : (
                                // Output data for enemy players, 5,10
                                gameData.info.participants.slice(dataSlice[1], dataSlice[2]).map(renderPlayer)
                              )}
                            </div>

                          </div>

                          <div className="enemy-side-container">
                            <div className="enemy-header-container">
                              <div className="enemy-match-result">
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                                  <>
                                    <p className={searchedParticipant?.win ? 'loss' : 'win'}>
                                      {searchedParticipant?.win ? 'Defeat' : 'Victory'}
                                    </p>
                                  </>
                                )}
                              </div>
                              <div>KDA</div>
                              <div>Damage</div>
                              <div>Gold</div>
                              <div>CS</div>
                              <div>Wards</div>
                              <div>Items</div>
                            </div>

                            <div className="enemy-match-summary-container">
                              {searchedParticipantIndex < 5 ? (
                                // Output data for enemy players, index 5,10
                                gameData.info.participants.slice(dataSlice[1], dataSlice[2]).map(renderPlayer)
                              ) : (
                                // Output data for enemy players, 0,5
                                gameData.info.participants.slice(dataSlice[0], dataSlice[1]).map(renderPlayer)
                              )}
                            </div>
                          </div>

                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p>We have no data!</p>
        )}
      </div>
    );
  }
}

export default MatchHistory;