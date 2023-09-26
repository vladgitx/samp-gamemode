import { Player } from "open-godfather"
import { og } from "../.."
import Colors from "../../common/colors"
import { sendNearbyMessage, toRoleplayName } from "../../utils/misc"
import { serverConfig } from "../../common/config"
import { playerTalkingAnim } from "../../features/talking-anim"
import { getPlayerCharacter } from "../../components/character"

og.events.playerText((player: Player, text: string) => {
    if (isSpammingChat(player)) {
        return player.sendMessage("Nu face spam.", Colors.Red)
    }

    sendNearbyMessage(`${toRoleplayName(player.name)} spune: ${text}`, Colors.White, player.getPosition(), serverConfig.playerViewDistance.normal, player.world, player.interior, true)
    playerTalkingAnim(player, getPlayerCharacter(player)?.talkingStyle || 0, text.length * 100)
})

function isSpammingChat(player: Player) {
    const now = Date.now()
    const lastTextDate = player.getVariable("lastChatMsg")
    if (lastTextDate !== undefined && now - lastTextDate < 1000) {
        player.setVariable("lastChatMsg", now)
        return true
    }
    player.setVariable("lastChatMsg", now)
    return false
}