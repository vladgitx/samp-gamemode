import { Player, VehicleSeats } from "open-godfather"
import { equalFloats } from "../../../utils/misc"
import { talkingStyles } from "../common/talking-styles"

export function playerTalkingAnim(player: Player, styleId: number, milliseconds: number) {    
    const talkingStyle = talkingStyles[styleId]
    if (!talkingStyle) {
        return
    }

    const talking = getTalkingVariable(player)
    if (talking) {
        clearTimeout(talking.timeoutId)
        clearInterval(talking.intervalId)
    }
    removeTalkingVariable(player)

    if (player.vehicleSeat === VehicleSeats.Driver) {
        talkAsDriver(player, talkingStyle.animation.library, talkingStyle.animation.name, milliseconds)
    } else {
        talk(player, talkingStyle.animation.library, talkingStyle.animation.name, milliseconds)
    }
}

function talk(player: Player, animationLibrary: string, animationName: string, milliseconds: number) {
    player.applyAnimation(animationLibrary, animationName, 4.1, true, false, false, true, 1)

    const timeoutId = player.setTimeout(() => {
        player.applyAnimation("CARRY", "crry_prtial", 4.1, false, false, false, false, 0)
        removeTalkingVariable(player)
    }, milliseconds)
    setTalkingVariable(player, { timeoutId })
}

function talkAsDriver(player: Player, animationLibrary: string, animationName: string, milliseconds: number) {
    const velocity = player.vehicle?.getVelocity() || { x: 0, y: 0, z: 0 }
    if (!equalFloats(velocity.x, 0) || !equalFloats(velocity.y, 0) || !equalFloats(velocity.z, 0)) {
        return
    }
    
    player.applyAnimation(animationLibrary, animationName, 4.1, true, true, true, false, 0)

    const intervalId = player.setInterval(() => {
        const velocity = player.vehicle?.getVelocity() || { x: 0, y: 0, z: 0 }
        if (!equalFloats(velocity.x, 0) || !equalFloats(velocity.y, 0) || !equalFloats(velocity.z, 0)) {
            stopTalking()
        }
    }, 2000)

    const timeoutId = player.setTimeout(() => {
        stopTalking()
    }, milliseconds)
    setTalkingVariable(player, { timeoutId, intervalId })

    function stopTalking() {
        removeTalkingVariable(player)

        clearInterval(intervalId)
        clearTimeout(timeoutId)

        player.applyAnimation("CARRY", "crry_prtial", 4.1, false, false, false, false, 0)
    }
}

function setTalkingVariable(player: Player, timer: { timeoutId?: NodeJS.Timeout, intervalId?: NodeJS.Timeout }) {
    player.setVariable("talkingTimer", timer)
}

function getTalkingVariable(player: Player): { timeoutId?: NodeJS.Timeout, intervalId?: NodeJS.Timeout } | undefined {
    return player.getVariable("talkingTimer")
}

function removeTalkingVariable(player: Player) {
    return player.deleteVariable("talkingTimer")
}