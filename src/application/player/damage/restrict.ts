import { og } from "../../.."
import { isPlayerWounded } from "../../../features/player-wounded"

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