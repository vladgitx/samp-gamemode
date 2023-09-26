import { Vehicle } from "open-godfather"
import { AutomobileData } from "../types"
import { og } from "../../.."
import { updateAutomobilePlateInDb } from "../data"

export class Automobile {
    readonly id: number
    readonly vehicleId: number

    constructor(vehicle: Vehicle, data: AutomobileData) {
        this.id = data.id
        this.vehicleId = vehicle.id
    }

    set plate(plate: string) {
        const vehicle = og.vehicles.at(this.vehicleId)
        if (vehicle) {
            vehicle.plate = plate
        }
        updateAutomobilePlateInDb(this.id, plate)
    }

    get plate() {
        const vehicle = og.vehicles.at(this.vehicleId)
        if (vehicle) {
            return vehicle.plate
        }
        return ""
    }
}