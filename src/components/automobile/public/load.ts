import { Vehicle } from "open-godfather"
import { Automobile } from "./model"
import { og } from "../../.."
import { getAllSpawnedAutomobilesFromDb, getAutomobileStatsFromDb } from "../data"

export async function loadAutomobile(automobileId: number) {
    const data = await getAutomobileStatsFromDb(automobileId)
    if (!data) {
        return undefined
    }

    const vehicle = og.vehicles.new(data.model, data.position, data.rotation, data.primaryColor, data.secondaryColor)
    if (!vehicle) {
        return undefined
    }
    vehicle.plate = data.plate

    const automobile = new Automobile(vehicle, data)
    vehicle.setVariable("linked-automobile", automobile)

    return automobile
}

export async function loadAllSpawnedAutomobiles() {
    let count = 0
    const automobiles = await getAllSpawnedAutomobilesFromDb()

    for (const data of automobiles) {
        const vehicle = og.vehicles.new(data.model, data.position, data.rotation, data.primaryColor, data.secondaryColor)
        if (!vehicle) {
            continue
        }
        vehicle.plate = data.plate
        
        const automobile = new Automobile(vehicle, data)
        vehicle.setVariable("linked-automobile", automobile)

        count++
    }

    return count
}

export function getVehicleAutomobile(vehicle: Vehicle) {
    return vehicle.getVariable("linked-automobile") as Automobile | undefined
}