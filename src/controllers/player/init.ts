import { Player, WeaponSkills, WorldPosition } from "open-godfather"
import { og } from "../.."
import { playerLogin } from "../../features/auth"
import { chooseCharacter } from "../../features/character-selection"
import { clearChat, toRoleplayName } from "../../utils/misc"

og.events.playerConnect(async (player) => {
    player.color = "C3C3C3"
    player.setSpectating(true)

    playerLogin(player, 60, 3, (account) => {
        chooseCharacter(player, account, (character, lastHealth, lastArmour, lastPosition, lastRotation, lastWorld, lastInterior) => {
            player.color = "FFFFFF"

            clearChat(player)
            player.sendMessage(`Buna ${toRoleplayName(player.name)}! :)`)
        
            spawnInWorld(player, character.skin, lastHealth, lastArmour, lastPosition, lastRotation, lastWorld, lastInterior)
        })
    })
})

og.events.playerRequestClass((player) => {
    player.spawn()
})

function spawnInWorld(player: Player, skin: number, health: number, armour: number, position: WorldPosition, rotation: number, world: number, interior: number) {
    player.setWeaponSkill(WeaponSkills.Colt45, 0)
    player.setWeaponSkill(WeaponSkills.Uzi, 0)
    player.setWeaponSkill(WeaponSkills.SilencedColt45, 999)
    player.setWeaponSkill(WeaponSkills.DesertEagle, 999)
    player.setWeaponSkill(WeaponSkills.Shotgun, 999)
    player.setWeaponSkill(WeaponSkills.SawnoffShotgun, 0)
    player.setWeaponSkill(WeaponSkills.CombatShotgun, 999)
    player.setWeaponSkill(WeaponSkills.MP5, 999)
    player.setWeaponSkill(WeaponSkills.AK47, 999)
    player.setWeaponSkill(WeaponSkills.M4, 999)
    player.setWeaponSkill(WeaponSkills.Sniper, 999)

    player.setSpawnInfo(1, skin, position, rotation)

    player.world = world
    player.interior = interior
    player.health = health
    player.armour = armour

    player.setSpectating(false)
}