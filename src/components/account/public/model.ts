import { Player } from "open-godfather"
import { AccountData } from "../types"

export class Account {
    readonly id: number
    readonly playerId: number
    readonly name: string

    constructor(player: Player, data: AccountData) {
        this.id = data.id
        this.playerId = player.id
        this.name = data.name
    }
}