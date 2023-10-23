import { CommandResponses, Player } from "open-godfather"
import { errorMessage } from "../../../utils/messages"
import Colors from "../../../common/colors"
import { og } from "../../.."

og.events.playerCommand((player: Player, command: string, response: CommandResponses) => {
    if (response === CommandResponses.Spam) {
        player.sendMessage("Nu face spam.", Colors.Red)
    } else if (response === CommandResponses.Restricted) {
        player.sendMessage(errorMessage("Nu ai acces la comenzi."))
    } else if (response === CommandResponses.NotFound) {
        player.sendMessage(errorMessage(`Comanda "${command}" nu a fost gasita!`))
    }
})