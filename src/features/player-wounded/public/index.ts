import { Player, VehicleSeats } from "open-godfather"
import { setRandomWoundedAnimation, stopWoundedAnimation } from "../domain/animation"
import { deleteWoundedLabel, setWoundedLabel } from "../domain/label"
import { og } from "../../.."

og.events.playerStartEnterVehicle((player) => {
    if (isPlayerWounded(player)) {
        player.clearAnimations()
        player.setPosition(player.getPosition())
    }
})

og.events.playerStartExitVehicle((player, vehicle) => {
    if (isPlayerWounded(player)) {
        const seat = player.vehicleSeat

        player.clearAnimations()

        if (seat !== undefined) {
            player.putIntoVehicle(vehicle, seat)
        }
    }
})

export function setPlayerWounded(player: Player, mode: "living" | "dead") {
    player.setVariable("player-damage::wounded-mode", mode)
    player.health = 1.0

    if (player.vehicleSeat === VehicleSeats.Driver) {
        const vehicle = player.vehicle
        if (vehicle) {
            vehicle.engine = "off"
        }
    }

    if (mode === "living") {
        player.sendMessage("Esti ranit grav. Poti sa folosesti /acceptdeath in 60 de secunde.")
    } else {
        player.sendMessage("Esti mort. Poti sa folosesti /acceptdeath in 60 de secunde.")
    }

    setRandomWoundedAnimation(player)
    setWoundedLabel(player)
}

export function revivePlayer(player: Player) {
    player.deleteVariable("player-damage::wounded-mode")
    player.health = 100
    
    stopWoundedAnimation(player)
    deleteWoundedLabel(player)
}

export function isPlayerWounded(player: Player) {
    return player.getVariable("player-damage::wounded-mode") as "living" | "dead" | undefined
}