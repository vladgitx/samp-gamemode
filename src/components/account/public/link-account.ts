import { Player } from "open-godfather"
import { Account } from ".."
import { getAccountStatsFromDb } from "../data"

export async function loadAndLinkAccount(player: Player, accountId: number) {
    if (getPlayerAccount(player)) {
        return undefined
    }

    const data = await getAccountStatsFromDb(accountId)
    if (!data) {
        return undefined
    }

    const account = new Account(player, data)
    player.setVariable("linked-account", account)

    return account
}

export function getPlayerAccount(player: Player) {
    return player.getVariable("linked-account") as Account | undefined
}