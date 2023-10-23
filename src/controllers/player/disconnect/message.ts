import { KickReasons } from "open-godfather"
import { og } from "../../.."
import Colors from "../../../common/colors"
import { sendNearbyMessage, toRoleplayName } from "../../../utils/misc"
import { serverConfig } from "../../../common/config"

og.events.playerDisconnect((player, reasonId) => {
    if (player.isSpawned) {
        let reasonMsg: string
        if (reasonId === KickReasons.Crash) {
            reasonMsg = "Timeout/Crash"
        } else if (reasonId === KickReasons.Kick) {
            reasonMsg = "Kick/Ban"
        } else if (reasonId === KickReasons.Quit) {
            reasonMsg = "Iesire"
        } else {
            return
        }
        sendNearbyMessage(`${toRoleplayName(player.name)} a iesit de pe server. (${reasonMsg})`, Colors.Gray, player.getPosition(), serverConfig.playerViewDistance.normal, player.world, player.interior)
    }
})