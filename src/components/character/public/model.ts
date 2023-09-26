import { Player } from "open-godfather"
import { CharacterData } from "../types"
import { CharacterRaces, CharacterSexes } from "../common/enums"
import { og } from "../../.."
import { saveCharacterStatsInDb, updateCharacterTalkingStyleInDb } from "../data"

export class Character {
    readonly id: number
    readonly playerId: number
    #name: string
    #skin: number
    #age: number
    #sex: CharacterSexes
    #race: CharacterRaces
    #talkingStyle: number

    constructor(player: Player, data: CharacterData) {
        this.id = data.id
        this.playerId = player.id
        this.#name = data.name
        this.#skin = data.skin
        this.#age = data.age
        this.#sex = data.sex
        this.#race = data.race
        this.#talkingStyle = data.talkingStyle
    }

    save() {
        const player = og.players.at(this.playerId)
        if (player === undefined) {
            return
        }
        
        saveCharacterStatsInDb(this.id, player.health, player.armour, player.getPosition(), player.rotation, player.world, player.interior)
    }

    set name(name: string) {
        this.#name = name
    }

    get name() {
        return this.#name
    }

    set skin(modelId: number) {
        this.#skin = modelId
    }

    get skin() {
        return this.#skin
    }

    set age(age: number) {
        this.#age = age
    }

    get age() {
        return this.#age
    }

    set sex(sex: CharacterSexes) {
        this.#sex = sex
    }

    get sex() {
        return this.#sex
    }

    set race(race: CharacterRaces) {
        this.#race = race
    }

    get race() {
        return this.#race
    }

    set talkingStyle(style: number) {
        this.#talkingStyle = style
        updateCharacterTalkingStyleInDb(this.id, style)
    }

    get talkingStyle() {
        return this.#talkingStyle
    }
}