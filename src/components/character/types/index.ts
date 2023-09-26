import { CharacterRaces, CharacterSexes } from "../common/enums"

export type CharacterData = {
    id: number
    name: string
    skin: number
    age: number
    sex: CharacterSexes
    race: CharacterRaces
    talkingStyle: number
}