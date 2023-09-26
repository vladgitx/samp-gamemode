import { Client } from "pg"
import { OpenGf } from "open-godfather"
import { serverConfig } from "./common/config"

export const og = new OpenGf({
    name: serverConfig.name,
    website: serverConfig.website,
    language: serverConfig.language,
    map: serverConfig.map,
    mode: serverConfig.mode,
    nametagDrawDistance: serverConfig.playerViewDistance.normal,
    stuntBonuses: false,
})

export const db = new Client({
    user: serverConfig.database.user,
    host: serverConfig.database.host,
    database: serverConfig.database.database,
    password: serverConfig.database.password,
})

db.connect()
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error)
    })

og.events.exit(() => {
    db.end()
        .then(() => {
            console.log("Database connection closed!")
        })
        .catch((error) => {
            console.error("Error closing database connection:", error)
        })
})

import "./application/player"
import "./application/automobile"