import { Player, WorldPosition } from "open-godfather"
import { og } from ".."

export function toRoleplayName(name: string) {
    return name.replace("_", " ")
}

export function shadeColor(hexColor: string, percentage: number): string {
    // Parse the hex color string into its red, green, and blue components
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);

    // Calculate the delta for each component
    const delta = Math.floor(255 * (percentage / 100));

    // Calculate the new color values
    const newRed = Math.max(0, Math.min(255, red + delta));
    const newGreen = Math.max(0, Math.min(255, green + delta));
    const newBlue = Math.max(0, Math.min(255, blue + delta));

    // Convert the new color values back to a hex string
    const newHexColor = (
        (newRed << 16 | newGreen << 8 | newBlue) // RGB components
        .toString(16) // Convert to hexadecimal string
        .padStart(6, '0') // Ensure 6 digits in the string
    );

    return newHexColor
}

export function sendNearbyMessage(message: string, color: string, position: WorldPosition, range: number, world?: number, interior?: number, distanceShade = false) {
    if (!distanceShade) {
        for (const [player, distance] of og.players.getInRange(position, range, world, interior)) {
            player.sendMessage(message, color)
        }
        return
    }
    for (const [player, distance] of og.players.getInRange(position, range, world, interior)) {
        if (distance < range / 16) {
            player.sendMessage(message, color)
        } else if (distance < range / 8) {
            player.sendMessage(message, shadeColor(color, -5))
        } else if (distance < range / 4) {
            player.sendMessage(message, shadeColor(color, -15))
        } else if (distance < range / 2) {
            player.sendMessage(message, shadeColor(color, -25))
        } else if (distance < range) {
            player.sendMessage(message, shadeColor(color, -35))
        }
    }
}

export function clearChat(player: Player) {
    for (let i = 0; i < 30; i++) {
        player.sendMessage(" ")
    }
}

export function equalFloats(x: number, y: number) {
    return Math.abs(x - y) < Number.EPSILON
}

export function greaterFloat(x: number, y: number) {
    return x - y > Number.EPSILON
}