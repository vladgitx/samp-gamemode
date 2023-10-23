import { BodyParts, isBulletWeapon } from "open-godfather"
import { og } from "../../.."
import { isPlayerWounded, setPlayerWounded } from "../../../features/player-wounded"
import { greaterFloat } from "../../../utils/misc"

og.events.playerDamage((player, issuer, amount, weapon, bodyPart) => {
    if (isPlayerWounded(player)) {
        return
    }

    if (bodyPart === BodyParts.Head) {
        amount = amount * 1.8
    } else if (bodyPart !== BodyParts.Torso) {
        amount = amount * 0.6
    }

    const health = player.health
    const armour = player.armour

    if (greaterFloat(armour, 0) && bodyPart === BodyParts.Torso && isBulletWeapon(weapon)) {
        if (armour > amount + 1) {
            player.armour -= amount
        } else {
            player.armour = 0
        }
    } else if (health > amount + 1) {
        player.health -= amount
    } else if (issuer !== undefined) {
        setPlayerWounded(player, "living")
    } else {
        player.health = 0
    }
})