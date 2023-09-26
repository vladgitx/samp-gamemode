import { CameraModes, Player, Weapons } from "open-godfather"
import { woundedAnimations } from "../common/wounded-animations"

const vehicleWoundedAnimation = {
    id: 1019,
    library: "PED",
    name: "CAR_dead_RHS",
}

export function setRandomWoundedAnimation(player: Player) {
    if (player.getVariable("player-damage::anim-check-interval")) {
        return false
    }

    const animation = woundedAnimations[Math.floor(Math.random() * woundedAnimations.length)]

    if (player.vehicle) {
        if (player.cameraMode === CameraModes.PassengerAiming) {
            player.holdingWeapon = Weapons.Fist
        }
        player.applyAnimation(vehicleWoundedAnimation.library, vehicleWoundedAnimation.name, 4.1, false, true, true, true, 0)
    } else {
        player.applyAnimation(animation.library, animation.name, 4.1, false, true, true, true, 0)
    }

    const intervalId = player.setInterval(() => {
        if (!player.vehicle) {
            if (player.animation !== animation.id) {
                player.applyAnimation(animation.library, animation.name, 4.1, false, true, true, true, 0)
            }
        } else if (player.animation !== vehicleWoundedAnimation.id) {
            if (player.cameraMode === CameraModes.PassengerAiming) {
                player.holdingWeapon = Weapons.Fist
            }
            player.applyAnimation(vehicleWoundedAnimation.library, vehicleWoundedAnimation.name, 4.1, false, true, true, true, 0)
        }
    }, 1000)

    player.setVariable("player-damage::anim-check-interval", intervalId)
    return true
}

export function stopWoundedAnimation(player: Player) {
    clearInterval(player.getVariable("player-damage::anim-check-interval"))
    player.deleteVariable("player-damage::anim-check-interval")

    const vehicle = player.vehicle
    const seat = player.vehicleSeat

    player.clearAnimations()

    if (vehicle !== undefined && seat !== undefined) {
        player.putIntoVehicle(vehicle, seat)
    }
}