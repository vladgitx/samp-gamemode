import "dotenv/config"

export const serverConfig = {
    name: "Node.js Roleplay",
    website: "nodejs.org",
    language: "Romanian",
    map: "San Andreas",
    mode: "Roleplay",
    database: {
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_DB,
        password: process.env.DATABASE_PASSWORD,
    },
    playerViewDistance: {
        normal: 17,
        high: 40,
        low: 5,
    },
    interactionDistance: {
        playerToPlayer: 1.5,
        playerToVehicle: 3.5,
    },
}