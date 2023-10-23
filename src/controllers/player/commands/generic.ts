import { PlayerStates } from "open-godfather"
import { og } from "../../.."
import Colors from "../../../common/colors"
import { errorMessage, usageMessage } from "../../../utils/messages"
import { getPlayerAccount } from "../../../components/account"
import Messages from "../../../common/messages"
import { getPlayerCharacter } from "../../../components/character"
import { Roleplay } from "../../../components/roleplay"
import { clearChat, sendNearbyMessage, toRoleplayName } from "../../../utils/misc"
import { searchPlayer } from "../../../utils/search-player"
import { serverConfig } from "../../../common/config"
import { setCommandCategory } from "../../../libs/cmd-categories"
import { playerTalkingAnim } from "../../../features/talking-anim"

og.commands.add("/stats", [], (player) => {
    const account = getPlayerAccount(player)
    if (account === undefined) {
        return player.sendMessage(errorMessage(Messages.NotLoggedIn))
    }
    const character = getPlayerCharacter(player)
    if (character === undefined) {
        return player.sendMessage(errorMessage(Messages.NotInCharacter))
    }
    player.sendMessage(`Statisticile lui ${toRoleplayName(character.name)} [#${character.id}] - ${account.name} [#${account.id}]`)
    player.sendMessage(`Nume: ${toRoleplayName(character.name)} | Sex: ${character.sex} | Varsta: ${character.age} ani | Rasa: ${character.race}`)
    player.sendMessage(`Level: 1 | Experienta: 0/4 | Ore jucate: 0 | Minute jucate: 0 | Admin: Nu`)
}, "Vezi statisticile caracterului tau.")
setCommandCategory("/stats", "Player")

og.commands.add("/me", [], (player, ...params) => {
    const action = params.join(" ")
    if (!action) {
        return player.sendMessage(usageMessage("/me [actiune]"))
    }
    sendNearbyMessage(`* ${toRoleplayName(player.name)} ${action}`, Colors.Roleplay, player.getPosition(), serverConfig.playerViewDistance.normal, player.world, player.interior)
})
setCommandCategory("/me", "Player")

og.commands.add("/melow", [], (player, ...params) => {
    const action = params.join(" ")
    if (!action) {
        return player.sendMessage(usageMessage("/melow [actiune]"))
    }
    sendNearbyMessage(`* ${toRoleplayName(player.name)} ${action}`, Colors.Roleplay, player.getPosition(), serverConfig.playerViewDistance.low, player.world, player.interior)
}, "Are raza mai mica decat /me.")
setCommandCategory("/melow", "Player")

og.commands.add("/ame", [], (player, ...params) => {
    const action = params.join(" ")
    if (!action) {
        return player.sendMessage(usageMessage("/ame [actiune]"))
    }
    player.sendMessage(`> ${toRoleplayName(player.name)} ${action}`, Colors.Roleplay)
    player.setChatBubble(`* ${toRoleplayName(player.name)} ${action}`, Colors.Roleplay)
})
setCommandCategory("/ame", "Player")

og.commands.add("/do", [], (player, ...params) => {
    const action = params.join(" ")
    if (!action) {
        return player.sendMessage(usageMessage("/do [actiune]"))
    }
    sendNearbyMessage(`* ${action} (( ${toRoleplayName(player.name)} ))`, Colors.Roleplay, player.getPosition(), serverConfig.playerViewDistance.normal, player.world, player.interior)
})
setCommandCategory("/do", "Player")

og.commands.add("/dolow", [], (player, ...params) => {
    const action = params.join(" ")
    if (!action) {
        return player.sendMessage(usageMessage("/dolow [actiune]"))
    }
    sendNearbyMessage(`* ${action} (( ${toRoleplayName(player.name)} ))`, Colors.Roleplay, player.getPosition(), serverConfig.playerViewDistance.low, player.world, player.interior)
}, "Are raza mai mica decat /do.")
setCommandCategory("/dolow", "Player")

og.commands.add("/shout", ["/s"], (player, ...params) => {
    const text = params.join(" ")
    if (!text) {
        return player.sendMessage(usageMessage("/shout [text]"))
    }
    sendNearbyMessage(`${toRoleplayName(player.name)} striga: ${text}`, Colors.White, player.getPosition(), serverConfig.playerViewDistance.high, player.world, player.interior, true)
    playerTalkingAnim(player, getPlayerCharacter(player)?.talkingStyle || 0, text.length * 100)
})
setCommandCategory("/shout", "Player")

og.commands.add("/low", ["/l"], (player, ...params) => {
    const text = params.join(" ")
    if (!text) {
        return player.sendMessage(usageMessage("/low [text]"))
    }
    sendNearbyMessage(`${toRoleplayName(player.name)} spune (incet): ${text}`, Colors.White, player.getPosition(), serverConfig.playerViewDistance.low, player.world, player.interior, true)
    playerTalkingAnim(player, getPlayerCharacter(player)?.talkingStyle || 0, text.length * 100)
})
setCommandCategory("/low", "Player")

og.commands.add("/whisper", ["/w"], (player, targetNameOrId, ...params) => {
    const text = params.join(" ")
    if (!targetNameOrId || !text) {
        return player.sendMessage(usageMessage("/whisper [player] [text]"))
    }
    const target = searchPlayer(targetNameOrId)
    if (target === undefined) {
        return player.sendMessage(errorMessage(Messages.NotConnected))
    }
    if (player.id === target.id) {
        return player.sendMessage(errorMessage("Iti soptesti singur."))
    }
    if (player.getDistance(target.getPosition(), target.world, target.interior) > serverConfig.interactionDistance.playerToPlayer) {
        return player.sendMessage(errorMessage(Messages.PlayerTooFar))
    }
    player.sendMessage(`I-ai soptit lui ${toRoleplayName(target.name)}: ${text}`, Colors.Yellow)
    target.sendMessage(`${toRoleplayName(player.name)} ti-a soptit: ${text}`, Colors.Yellow)

    player.setChatBubble(`* ${toRoleplayName(player.name)} i-a soptit ceva lui ${toRoleplayName(target.name)}.`, Colors.Roleplay)
    playerTalkingAnim(player, getPlayerCharacter(player)?.talkingStyle || 0, text.length * 100)
})
setCommandCategory("/whisper", "Player")

og.commands.add("/cwhisper", ["/cw"], (player, ...params) => {
    const text = params.join(" ")
    if (!text) {
        return player.sendMessage(usageMessage("/cwhisper [text]"))
    }
    const vehicle = player.vehicle
    if (vehicle === undefined) {
        return player.sendMessage(errorMessage(Messages.NotInVehicle))
    }
    for (const occupantId of vehicle.occupants) {
        og.players.at(occupantId)?.sendMessage(`${player.state === PlayerStates.Driver ? "Sofer" : "Pasager"} ${toRoleplayName(player.name)} spune: ${text}`, Colors.Yellow)
    }
    playerTalkingAnim(player, getPlayerCharacter(player)?.talkingStyle || 0, text.length * 100)
}, "Textul tau va aparea doar in masina.")
setCommandCategory("/cwhisper", "Player")

og.commands.add("/ooc", ["/o"], (player, ...params) => {
    if (Roleplay.globalOOC === false) {
        return player.sendMessage(errorMessage("Acest chat este dezactivat."))
    }
    const text = params.join(" ")
    if (!text) {
        return player.sendMessage(usageMessage("/ooc [text]"))
    }
    og.players.broadcast(`[OOC] ${toRoleplayName(player.name)}: ${text}`, "A6BCEC")
}, "Chat OOC global.")
setCommandCategory("/ooc", "General")

og.commands.add("/b", [], (player, ...params) => {
    if (Roleplay.localOOC === false) {
        return player.sendMessage(errorMessage("Acest chat este dezactivat."))
    }
    const text = params.join(" ")
    if (!text) {
        return player.sendMessage(usageMessage("/b [text]"))
    }
    sendNearbyMessage(`(( [${player.id}] ${toRoleplayName(player.name)}: ${text} ))`, "F0EFE1", player.getPosition(), serverConfig.playerViewDistance.high, player.world, player.interior)
}, `Chat OOC local, proximitate de ${serverConfig.playerViewDistance.high} de metri.`)
setCommandCategory("/b", "General")

og.commands.add("/pm", [], (player, targetNameOrId, ...params) => {
    const text = params.join(" ")
    if (!targetNameOrId || !text) {
        return player.sendMessage(usageMessage("/pm [player] [text]"))
    }
    const target = searchPlayer(targetNameOrId)
    if (target === undefined) {
        return player.sendMessage(errorMessage(Messages.NotConnected))
    }
    if (player.id === target.id) {
        return player.sendMessage(errorMessage("Iti dai PM singur."))
    }
    player.sendMessage(`(( PM catre ${toRoleplayName(target.name)} (${target.id}): ${text} ))`, Colors.Yellow)
    target.sendMessage(`(( PM de la ${toRoleplayName(player.name)} (${player.id}): ${text} ))`, Colors.Yellow)
}, "Trimite un mesaj privat.")
setCommandCategory("/pm", "General")

og.commands.add("/flush", ["/clearchat"], (player) => {
    clearChat(player)
}, "Ascunde ultimele mesaje din chat.")
setCommandCategory("/flush", "General")

og.commands.add("/id", [], (player, targetNameOrId) => {
    if (!targetNameOrId) {
        return player.sendMessage(usageMessage("/id [player]")) 
    }
    const target = searchPlayer(targetNameOrId)
    if (target === undefined) {
        return player.sendMessage(errorMessage(Messages.NotConnected))
    }

    const targetAccount = getPlayerAccount(target)
    player.sendMessage(`(ID ${target.id}) ${toRoleplayName(target.name)} - ${targetAccount ? `Level 1` : "Nelogat"}`)
}, "Informatii generale despre un player.")
setCommandCategory("/id", "General")