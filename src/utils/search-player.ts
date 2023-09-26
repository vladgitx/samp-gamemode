import { og } from ".."

export function searchPlayer(nameOrId: string) {
    const playerId = parseInt(nameOrId)
    if (!isNaN(playerId)) {
        const player = og.players.at(playerId)
        if (player !== undefined) {
            return player
        }
    }
    if (nameOrId.length < 3) {
        return undefined
    }
    for (const player of og.players.all) {
        if (player.name.toLowerCase().startsWith(nameOrId.toLowerCase())) {
            return player
        }
    }
    return undefined
}