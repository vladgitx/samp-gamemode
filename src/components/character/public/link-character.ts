import { Player } from "open-godfather"
import { Character } from "./model"
import { getCharacterStatsFromDb } from "../data"
import { CharacterRaces, CharacterSexes } from "../common/enums"

export async function loadAndLinkCharacter(player: Player, characterId: number) {
    if (getPlayerCharacter(player)) {
        return undefined
    }

    const data = await getCharacterStatsFromDb(characterId)
    if (!data) {
        return undefined
    }

    const character = new Character(player, {
        id: data.id,
        name: data.name,
        skin: data.skin,
        age: data.age,
        sex: Object.values(CharacterSexes)[data.sex] || CharacterSexes.Male,
        race: Object.values(CharacterRaces)[data.race] || CharacterRaces.White,
        talkingStyle: data.talkingStyle,
    })
    player.setVariable("linked-character", character)

    player.name = character.name
    player.skin = character.skin

    return {
        character,
        lastHealth: data.lastHealth,
        lastArmour: data.lastArmour,
        lastPosition: data.lastPosition,
        lastRotation: data.lastRotation,
        lastWorld: data.lastWorld,
        lastInterior: data.lastInterior,
    }
}

export function getPlayerCharacter(player: Player) {
    return player.getVariable("linked-character") as Character | undefined
}