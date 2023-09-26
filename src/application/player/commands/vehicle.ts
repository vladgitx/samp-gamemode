import { PlayerStates, VehicleSeats } from "open-godfather"
import { og } from "../../.."
import Messages from "../../../common/messages"
import { errorMessage } from "../../../utils/messages"
import Colors from "../../../common/colors"
import { serverConfig } from "../../../common/config"
import { sendNearbyMessage, toRoleplayName } from "../../../utils/misc"
import { setCommandCategory } from "../../../libs/cmd-categories"
import { isPlayerWounded } from "../../../features/player-wounded"

og.commands.add("/engine", [], (player) => {
    if (isPlayerWounded(player)) {
        return player.sendMessage(errorMessage(Messages.Wounded))
    }
    const vehicle = player.vehicle
    if (!vehicle) {
        return player.sendMessage(errorMessage(Messages.NotInVehicle))
    }
    if (player.vehicleSeat !== VehicleSeats.Driver) {
        return player.sendMessage(errorMessage("Nu esti soferul vehiculului."))
    }

    if (vehicle.engine === "on") {
        vehicle.engine = "off"
        vehicle.lights = "off"

        sendNearbyMessage(`* ${toRoleplayName(player.name)} opreste motorul vehiculului ${vehicle.name}.`, Colors.Roleplay, player.getPosition(), serverConfig.playerViewDistance.normal, player.world, player.interior)
    } else {
        vehicle.engine = "on"
        vehicle.lights = "on"
        
        sendNearbyMessage(`* ${toRoleplayName(player.name)} porneste motorul vehiculului ${vehicle.name}.`, Colors.Roleplay, player.getPosition(), serverConfig.playerViewDistance.normal, player.world, player.interior)
    }
})
setCommandCategory("/engine", "Vehicle")

og.commands.add("/lights", [], (player) => {
    if (isPlayerWounded(player)) {
        return player.sendMessage(errorMessage(Messages.Wounded))
    }
    const vehicle = player.vehicle
    if (!vehicle) {
        return player.sendMessage(errorMessage(Messages.NotInVehicle))
    }
    if (player.vehicleSeat !== VehicleSeats.Driver) {
        return player.sendMessage(errorMessage("Nu esti soferul vehiculului."))
    }
    vehicle.lights = vehicle.lights === "on" ? "off" : "on"
})
setCommandCategory("/lights", "Vehicle")

og.commands.add("/trunk", [], (player) => {
    if (isPlayerWounded(player)) {
        return player.sendMessage(errorMessage(Messages.Wounded))
    }
    if (player.state !== PlayerStates.OnFoot) {
        return player.sendMessage(errorMessage("Trebuie sa fii pe jos."))
    }

    for (const [vehicle, distance] of og.vehicles.getInRange(player. getPosition(), serverConfig.interactionDistance.playerToVehicle, player.world, player.interior)) {
        vehicle.trunk = vehicle.trunk === "open" ? "closed" : "open"
        return
    }
    player.sendMessage(errorMessage(Messages.VehicleTooFar))
})
setCommandCategory("/trunk", "Vehicle")

og.commands.add("/hood", [], (player) => {
    if (isPlayerWounded(player)) {
        return player.sendMessage(errorMessage(Messages.Wounded))
    }
    if (player.state !== PlayerStates.OnFoot) {
        return player.sendMessage(errorMessage("Trebuie sa fii pe jos."))
    }
    
    for (const [vehicle, distance] of og.vehicles.getInRange(player. getPosition(), serverConfig.interactionDistance.playerToVehicle, player.world, player.interior)) {
        vehicle.bonnet = vehicle.bonnet === "open" ? "closed" : "open"
        return
    }
    player.sendMessage(errorMessage(Messages.VehicleTooFar))
})
setCommandCategory("/hood", "Vehicle")