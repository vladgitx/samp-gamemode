import { Command, DialogStyles, Player } from "open-godfather"
import { og } from "../../.."
import { CommandCategory, getCategoryCommands, getCommandCategories, setCommandCategory } from "../../../libs/cmd-categories"
import { errorMessage } from "../../../utils/messages"

og.commands.add("/help", ["/commands", "/cmds"], (player, searchCommand) => {
    if (searchCommand) {
        return searchCommandInfo(player, searchCommand)
    }
    showHelpDialog(player)
}, "Poti sa folosesti si /help [comanda] ca sa vezi informatii despre o anumita comanda.")
setCommandCategory("/help", "General")

function searchCommandInfo(player: Player, searchCommand: string) {
    if (searchCommand[0] != "/") {
        searchCommand = "/" + searchCommand
    }
    if (searchCommand.length < 2) {
        player.sendMessage(errorMessage("Trebuie sa scrii minim 2 caractere ca sa cauti o comanda."))
        return false
    }

    const command = og.commands.at(searchCommand)
    if (command) {
        showCommandInfo(player, command)
        return true
    }

    for (const iterCommand of og.commands.all) {
        if (iterCommand.name.toLowerCase().startsWith(searchCommand.toLowerCase())) {
            showCommandInfo(player, iterCommand)
            return true
        }
        for (const alias of iterCommand.aliases) {
            if (alias.toLowerCase().startsWith(searchCommand.toLowerCase())) {
                showCommandInfo(player, iterCommand)
                return true
            }
        }
    }

    player.sendMessage(errorMessage("Acea comanda nu exista sau nu este documentata."))
    return false
}

function showHelpDialog(player: Player) {
    showCommandCategories()

    function showCommandCategories(categories = getCommandCategories()) {
        let bodyText = ""
        const listItemCategory = new Map<number, CommandCategory>()
        let count = 0

        for (const category of categories) {
            bodyText += category.name + "\n"
            listItemCategory.set(count++, category)
        }
        player.showDialog(DialogStyles.List, "Informatii despre comenzi", bodyText, "Continua", "Iesi", (response, listItem) => {
            if (!response) {
                // TODO: make it go to the parent categories on cancel
                return
            }
            const category = listItemCategory.get(listItem)
            if (category === undefined) {
                return
            }
            if (category.subCategories && category.subCategories.length > 0) {
                showCommandCategories(category.subCategories)
            } else {
                showCommandList(category, 1, categories)
            }
        })
    }

    function showCommandList(category: CommandCategory, page = 1, fromCategories?: CommandCategory[]) {
        const listItems: string[] = []
        const listItemCommand = new Map<number, string>()

        for (const command of getCategoryCommands(category.name)) {
            const info = command.info || "{b2b2b2}Fara informatii."
            const sliceInfo = info.length > 34 ? `${info.slice(0, 31)}...` : info
            const length = listItems.push(`${[command.name].concat(command.aliases).join(", ")}\t${sliceInfo}`)

            listItemCommand.set(length - 1, command.name)
        }
        if (listItems.length === 0) {
            player.sendMessage(errorMessage("Nu exista comenzi documentate in aceasta categorie."))
            if (fromCategories) {
                showCommandCategories(fromCategories)
            }
            return
        }
        player.showDialog(DialogStyles.Tablist, "Informatii despre comenzi", listItems.join("\n"), "Vezi", "Inchide", (response, listItem, fromPage) => {
            if (!response) {
                if (fromCategories) {
                    showCommandCategories(fromCategories)
                }
                return
            }
            const command = og.commands.at(listItemCommand.get(listItem) || "")
            if (!command) {
                player.sendMessage(errorMessage("Acea comanda nu a fost gasita."))
                return showCommandList(category, page, fromCategories)
            }
            showCommandInfo(player, command, () => showCommandList(category, page, fromCategories))
        })
    }
}

function showCommandInfo(player: Player, command: Command, onResponse?: () => void) {
    player.showDialog(DialogStyles.MessageBox, "Informatii despre comenzi", `Informatii despre "${command.name}"${command.aliases.length > 0 ? ` (${command.aliases.join(", ")}):` : ":"}\n\n${command.info || "Fara informatii."}`, "Inchide", "", () => {
        if (onResponse !== undefined) {
            onResponse()
        }
    })
}