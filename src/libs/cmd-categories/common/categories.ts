import { CommandCategory } from "../types"

export const commandCategories: CommandCategory[] = [
    {
        name: "General",
    },
    {
        name: "Player",
    },
    {
        name: "Vehicle",
    },
    {
        name: "Admin",
        subCategories: [
            {
                name: "Helper",
            },
            {
                name: "Admin junior",
            },
            {
                name: "Admin general",
            },
            {
                name: "Admin senior",
            },
            {
                name: "Manager",
            },
            {
                name: "Director",
            },
        ],
    },
]