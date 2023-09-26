import { WorldPosition } from "open-godfather"
import { db } from "../../.."

export async function getCharacterStatsFromDb(characterId: number) {
    try {
        const res = await db.query("SELECT name, skin, age, sex, race, talking_style, last_health, last_armour, last_x, last_y, last_z, last_rotation, last_world, last_interior FROM characters WHERE id = $1", [characterId])
        if (!res.rowCount) {
            return undefined
        }
        const row = res.rows[0]

        return {
            id: characterId,
            name: row.name as string,
            skin: row.skin as number,
            age: row.age as number,
            sex: row.sex as number,
            race: row.race as number,
            talkingStyle: row.talking_style as number,
            lastHealth: row.last_health as number,
            lastArmour: row.last_armour as number,
            lastPosition: {
                x: row.last_x,
                y: row.last_y,
                z: row.last_z,
            } as WorldPosition,
            lastRotation: row.last_rotation as number,
            lastWorld: row.last_world as number,
            lastInterior: row.last_interior as number,
        }
    } catch (error) {
        console.error(`Error while getting stats for character ID ${characterId}`, error)
        return undefined
    }
}

export async function getAccountCharacters(accountId: number) {
    try {
        const res = await db.query("SELECT id FROM characters WHERE account_id = $1", [accountId])
        return res.rows.map((row) => {
            return {
                id: row.id as number
            }
        })
    } catch (error) {
        console.error(`Error while getting characters for account ID ${accountId}`, error)
        return []
    }
}

export function saveCharacterStatsInDb(characterId: number, health: number, armour: number, position: WorldPosition, rotation: number, world: number, interior: number) {
    try {
        db.query("UPDATE characters SET last_health = $1, last_armour = $2, last_x = $3, last_y = $4, last_z = $5, last_rotation = $6, last_world = $7, last_interior = $8, last_seen = NOW() WHERE id = $9", [health, armour, position.x, position.y, position.z, rotation, world, interior, characterId])
    } catch (error) {
        console.error(`Error while saving character ID ${characterId}`, error)
    }
}

export function updateCharacterTalkingStyleInDb(characterId: number, styleId: number) {
    try {
        db.query("UPDATE characters SET talking_style = $1 WHERE id = $2", [styleId, characterId])
    } catch (error) {
        console.error(`Error while updating talking style of character ID ${characterId}`, error)
    }
}