import { og } from "../../.."
import Colors from "../../../common/colors"
import { setPlayerWounded } from "../../../features/player-wounded"

og.events.playerDeath((player) => {
    player.setVariable("player-damage::state-before-death", {
        position: player.getPosition(),
        rotation: player.rotation,
        world: player.world,
        interior: player.interior,
        skin: player.skin,
        holdingWeapon: player.holdingWeapon,
        weapons: player.getWeapons(),
    })
})

og.events.playerSpawn((player) => {
    const state = player.getVariable("player-damage::state-before-death")
    if (!state) {
        return
    }

    player.setPosition(state.position)
    player.rotation = state.rotation
    player.world = state.world
    player.interior = state.interior
    player.skin = state.skin

    for (const weapon of state.weapons) {
        player.giveWeapon(weapon.model, weapon.ammo)
    }
    player.holdingWeapon = state.holdingWeapon

    player.sendMessage("Ai murit intr-un mod ciudat. Pozitia si armele ti-au fost restituite, dar ar trebui sa dai relog.", Colors.Red)

    setPlayerWounded(player, "dead")
    player.deleteVariable("player-damage::state-before-death")
})