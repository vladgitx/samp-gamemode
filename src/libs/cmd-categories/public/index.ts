import { Command } from "open-godfather"
import { CommandCategory } from "../types"
import { og } from "../../.."
import { commandCategories } from "../common/categories"

const categorizedCommands = new Map<string, CommandCategory>()

export function setCommandCategory(commandName: string, ...categories: string[]) {
    const command = og.commands.at(commandName)
    if (!command) {
        return console.error(`Error: Failed to document command ${commandName} because it doesn't exist!`)
    }

    if (!validateCategoryHierarchy(categories)) {
        return console.error(`Error: Failed to document command ${command}. Invalid category hierarchy: ${categories}`)
    }

    const category = findCategoryByName(categories[categories.length - 1])
    if (category) {
        if (categorizedCommands.get(commandName)) {
            console.error(`Warning: Command ${commandName} was assigned another category!`)
        }

        categorizedCommands.set(command.name, category)
    }
}

export function getCategoryCommands(categoryName: string) {
    const commands = new Set<Command>()

    const category = findCategoryByName(categoryName)
    if (!category) {
        return commands
    }

    for (const [cmdName, cmdCategory] of categorizedCommands) {
        if (cmdCategory === category) {
            const command = og.commands.at(cmdName)
            if (command) {
                commands.add(command)
            }
        }
    }
    return commands
}

export function getCommandCategories() {
    return commandCategories
}

function findCategoryByName(name: string, categories = commandCategories): CommandCategory | undefined {
    for (const category of categories) {
        if (category.name === name) {
            return category
        }
        if (category.subCategories) {
            const subCategory = findCategoryByName(name, category.subCategories)
            if (subCategory) {
                return subCategory
            }
        }
    }
    return undefined
}

function validateCategoryHierarchy(categoryPath: string[]): boolean {
    if (categoryPath.length === 0) {
        return false
    }
    let currentCategory = findCategoryByName(categoryPath[0])

    for (let i = 1; i < categoryPath.length; i++) {
        if (currentCategory === undefined) {
            return false
        }
        if (!currentCategory.subCategories || currentCategory.subCategories.length === 0) {
            return false
        }
        const nextCategoryName = categoryPath[i]
        const nextCategory = currentCategory.subCategories.find((category) => category.name === nextCategoryName)
    
        if (!nextCategory) {
            return false
        }
        currentCategory = nextCategory
    }
    if (currentCategory === undefined) {
        return false
    }
    if (currentCategory.subCategories && currentCategory.subCategories.length > 0) {
        return false
    }
    return true
}