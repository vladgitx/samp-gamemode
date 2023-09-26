import bcrypt from "bcryptjs"
import { DialogStyles, Player } from "open-godfather"
import Colors from "../../common/colors"
import { errorMessage } from "../../utils/messages"
import { Account, getAccountLoginInfoFromDb, loadAndLinkAccount } from "../../components/account"
import { serverConfig } from "../../common/config"

export async function playerLogin(player: Player, time = 60, maxAttempts = 3, callback: (account: Account) => void) {
    const loginInfo = await getAccountLoginInfoFromDb(player.name)

    if (!loginInfo) {
        player.sendMessage("Contul tau nu a fost gasit, creaza-ti unul pe site.", Colors.Red)
        player.kick()
        return
    }

    const kickIfNotLoggedIn = player.setTimeout(() => {
        player.sendMessage("Nu te-ai conectat la timp.", Colors.Red)
        player.kick()
    }, time * 1000)

    attemptLogin(loginInfo.id, loginInfo.password)

    function attemptLogin(accountId: number, passwordHash: string, attempts = 0) {
        player.showDialog(DialogStyles.Password, `${serverConfig.name} - Logare`, "Scrie-ti parola in casuta de mai jos ca sa te loghezi.", "Inainte", "Iesi", async (response, listItem, inputText) => {
            if (!response) {
                player.kick()
                return
            }
    
            player.showDialog(DialogStyles.Password, `${serverConfig.name} - Logare`, "Se verifica...", "Inainte", "Iesi")
    
            try {
                const match = await bcrypt.compare(inputText, passwordHash)
    
                if (match) {
                    player.hideDialog()
    
                    const account = await loadAndLinkAccount(player, accountId)
                    if (!account) {
                        player.sendMessage(errorMessage("Contul tau nu a putut fi initializat."))
                        player.kick() 
                    } else {
                        clearTimeout(kickIfNotLoggedIn)
                        callback(account)
                    }
                } else {
                    if (++attempts >= maxAttempts) {
                        player.hideDialog()
        
                        player.sendMessage(`Ai gresit parola de ${maxAttempts} ori.`, Colors.Red)
                        player.kick()
                        return
                    }
                    player.sendMessage(errorMessage(`Parola este incorecta. (${attempts}/${maxAttempts} incercari)`))
                    attemptLogin(accountId, passwordHash, attempts)
                }
            } catch (error) {
                console.error("Error while comparing hashes:", error)
                player.sendMessage(errorMessage("Parola nu a putut fi verificata."))
                player.kick()
            }
        })
    }
}