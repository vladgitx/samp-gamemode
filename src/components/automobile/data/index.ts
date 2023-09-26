import { db } from "../../.."
import { AutomobileData } from "../types"

export async function getAutomobileStatsFromDb(automobileId: number): Promise<AutomobileData | undefined> {
    try {
        const res = await db.query("SELECT model, x, y, z, rotation, color_1, color_2, plate FROM automobiles WHERE id = $1", [automobileId])
        if (!res.rowCount) {
            return undefined
        }
        const row = res.rows[0]

        return {
            id: automobileId,
            model: row.model,
            position: {
                x: row.x,
                y: row.y,
                z: row.z
            },
            rotation: row.rotation,
            primaryColor: row.color_1,
            secondaryColor: row.color_2,
            plate: row.plate,
        }
    } catch (error) {
        console.error(`Error while getting stats for automobile ID ${automobileId}:`, error)
        return undefined
    }
}

export async function getAllSpawnedAutomobilesFromDb() {
    const automobiles: AutomobileData[] = []

    try {
        const res = await db.query("SELECT id, model, x, y, z, rotation, color_1, color_2, plate FROM automobiles WHERE spawned = true")
        for (const row of res.rows) {
            automobiles.push({
                id: row.id,
                model: row.model,
                position: {
                    x: row.x,
                    y: row.y,
                    z: row.z
                },
                rotation: row.rotation,
                primaryColor: row.color_1,
                secondaryColor: row.color_2,
                plate: row.plate,
            })
        }
    } catch (error) {
        console.error("Error while getting all the spawned vehicles:", error)
    } finally {
        return automobiles
    }
}

export async function updateAutomobilePlateInDb(automobileId: number, plate: string) {
    try {
        const res = await db.query("UPDATE automobiles SET plate = $1 WHERE id = $2", [plate, automobileId])
        if (!res.rowCount) {
            return false
        }
        return true
    } catch (error) {
        console.error(`Error while updating plate for automobile ID ${automobileId}:`, error)
        return false
    }
}