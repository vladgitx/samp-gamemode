import { Player } from "open-godfather"
import { og } from "../../.."
import Colors from "../../../common/colors"

export function setWoundedLabel(player: Player) {
    if (player.getVariable("player-damage::label")) {
        return
    }

    const label = og.textLabels.new("(( Acest jucator este ranit grav ))", Colors.Red, player.getPosition(), 12)
    if (label) {
        label.attachToPlayer(player, { x: 0, y: 0, z: 0.4 })
        player.setVariable("player-damage::label", label)
    }
}

export function deleteWoundedLabel(player: Player) {
    const label = player.getVariable("player-damage::label")
    if (label?.exists) {
        og.textLabels.destroy(label)
    }

    player.deleteVariable("player-damage::label")
}