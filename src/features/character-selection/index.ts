import { Player, WorldPosition } from "open-godfather"
import { Account } from "../../components/account"
import { Character, getAccountCharacters, loadAndLinkCharacter } from "../../components/character"
import Colors from "../../common/colors"
import { errorMessage } from "../../utils/messages"

export async function chooseCharacter(player: Player, account: Account, callback: (character: Character, lastHealth: number, lastArmour: number, lastPosition: WorldPosition, lastRotation: number, lastWorld: number, lastInterior: number) => void) {
    const characters = await getAccountCharacters(account.id)
    if (characters.length === 0) {
        player.sendMessage("Nu ai niciun caracter pe cont, creaza-ti unul pe site.", Colors.Red)
        player.kick()
        return
    }

    const character = await loadAndLinkCharacter(player, characters[0].id)
    if (!character) {
        player.sendMessage(errorMessage("Caracterul tau nu a putut fi initializat."))
        player.kick() 
        return
    }
    
    callback(character.character, character.lastHealth, character.lastArmour, character.lastPosition, character.lastRotation, character.lastWorld, character.lastInterior)
}