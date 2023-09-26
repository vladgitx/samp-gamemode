import { og } from "../../.."
import { getPlayerCharacter } from "../../../components/character"

og.events.playerDisconnect((player) => {
    getPlayerCharacter(player)?.save()
})