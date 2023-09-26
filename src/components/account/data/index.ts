import { db } from "../../.."
import { Account } from "../public/model"
import { AccountData } from "../types"

export async function getAccountStatsFromDb(accountId: number): Promise<AccountData | undefined> {
    try {
        const res = await db.query("SELECT name FROM accounts WHERE id = $1", [accountId])
        if (!res.rowCount) {
            return undefined
        }

        return {
            id: accountId,
            name: res.rows[0].name as string,
        }
    } catch (error) {
        console.error(`Error while getting stats for account ID ${accountId}:`, error)
        return undefined
    }
}

export async function getAccountLoginInfoFromDb(name: string) {
    try {
        const res = await db.query("SELECT id, password FROM accounts WHERE name = $1", [name])
        if (!res.rowCount) {
            return undefined
        }

        return {
            id: res.rows[0].id as number,
            password: res.rows[0].password as string,
        }
    } catch (error) {
        console.error(`Error while getting account login info for ${name}:`, error)
        return undefined
    }
}

export async function updateAccountNameInDb(account: Account, name: string) {
    try {
        const res = await db.query("UPDATE accounts SET name = $1 WHERE id = $2", [name, account.id])
        return res.rowCount > 0
    } catch (error) {
        console.error(`Error while updating account ID ${account.id} name:`, error)
        return false
    }
}