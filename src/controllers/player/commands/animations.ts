import { SpecialActions } from "open-godfather"
import { og } from "../../.."
import { usageMessage } from "../../../utils/messages"
import { setCommandCategory } from "../../../libs/cmd-categories"

og.commands.add("/animations", ["/anims"], (player, partParam) => {
    const part = parseInt(partParam)
    if(isNaN(part) || part < 1 || part > 5) {
        return player.sendMessage(usageMessage("/animations [1-5]"))
    }
    switch(part) {
        case 1:
            player.sendMessage("[Part 1] /carry /phoneanim /hiker /cardsloop /camera /walk /sit /seat /lean")
            player.sendMessage("[Part 1] /gsign /salute /cry /injured /blowjob /gym")
            player.sendMessage("[Part 1] /fuckyou /wave /batcrack /punch /aim /bat /batblock")
            player.sendMessage("[Part 1] /cover /crawl /crack /sipdrink /drugsbuy /bitchslap /reload")
            player.sendMessage("[Part 1] /knife /knifeblock /knifeidle /safeopen /saferob /cshoot /shoot")
            break
        case 2:
            player.sendMessage("[Part 2] /crossroad /mourn /stretch /barorder")
            player.sendMessage("[Part 2] /baridle /servebottle /serveglass /forwardlook /shouldercheck")
            player.sendMessage("[Part 2] /camshot /washhands /dunk /shotgun /fixcar")
            player.sendMessage("[Part 2] /fixcarout /crossarms /shottyreload /dropflag")
            break
        case 3:
            player.sendMessage("[Part 3] /groundhit /dodge /tired /box")
            player.sendMessage("[Part 3] /kungfu /agree")
            player.sendMessage("[Part 3] /reject /downpush /kungfublock /spray /lowbump")
            player.sendMessage("[Part 3] /kungfustomp /flykick /deskbored /deskdrink /shoppay")
            break
        case 4:
            player.sendMessage("[Part 4] /desksit /hit /backhit /fallhit /openleft ")
            player.sendMessage("[Part 4] /openright /stopcop /leftcop /fallkick /choke")
            player.sendMessage("[Part 4] /aimfast /what /baseballslap /laugh /rap")
            player.sendMessage("[Part 4] /kickdoor")
            break
        case 5:
            player.sendMessage("[Part 5] /defenser /dribble /fakeshot /stealball")
            player.sendMessage("[Part 5] /jumpshot /pickupball /angry /throw")
            player.sendMessage("[Part 5] /deal /dealerstance")
            player.sendMessage("[Part 5] /getshot /fightstance /frontfall /push")
            player.sendMessage("[Part 5] /riot /vomit /eatanim /cpr /caranim")
            break
    }
}, "Lista cu toate animatiile.")
setCommandCategory("/animations", "Player")

og.commands.add("/stopanim", ["/sa"], (player) => {
    const vehicle = player.vehicle
    const seat = player.vehicleSeat

    player.clearAnimations()
    player.specialAction = SpecialActions.None

    if (vehicle !== undefined && seat !== undefined) {
        player.putIntoVehicle(vehicle, seat)
    }
}, "Opreste animatia curenta.")
setCommandCategory("/stopanim", "Player")

og.commands.add("/carry", [], (player) => {
    player.specialAction = SpecialActions.Carry
})

og.commands.add("/phoneanim", [], (player) => {
    player.specialAction = SpecialActions.UseCellphone
})

og.commands.add("/hiker", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("MISC", "HIKER_POSE", 4.1, false, true, true, true, 0)
        case 2:
			return player.applyAnimation("MISC", "HIKER_POSE_L", 4.1, false, true, true, true, 0)
        default:
			return player.sendMessage(usageMessage("/hiker [1-2]"));
    }
})

og.commands.add("/cardsloop", [], (player) => {
    player.applyAnimation("CASINO", "CARDS_LOOP", 4.1, false, true, true, true, 0)
})

og.commands.add("/camera", [], (player, variant) => {
	switch(parseInt(variant)) {
		case 1:
			return player.applyAnimation("CAMERA", "CAMCRCH_CMON", 4.1, false, true, true, true, 0)
    	case 2:
			return player.applyAnimation("CAMERA", "camcrch_idleloop", 4.0, true, false, false, false, 0)
     	case 3:
			return player.applyAnimation("CAMERA", "camcrch_stay", 4.0, true, false, false, false, 0)
     	case 4:
			return player.applyAnimation("CAMERA", "camcrch_to_camstnd", 4.0, true, false, false, false, 0)
     	case 5:
			return player.applyAnimation("CAMERA", "camstnd_cmon", 4.0, true, false, false, false, 0)
     	case 6:
			return player.applyAnimation("CAMERA", "camstnd_idleloop", 4.0, true, false, false, false, 0)
     	case 7:
			return player.applyAnimation("CAMERA", "camstnd_lkabt", 4.0, true, false, false, false, 0)
     	case 8:
			return player.applyAnimation("CAMERA", "camstnd_to_camcrch", 4.0, true, false, false, false, 0)
     	default:
			return player.sendMessage(usageMessage("/camera [1-8]"));
	}
})

og.commands.add("/walk", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("PED", "WALK_civi", 4.1, true, true, true, true, 1)
        case 2:
			return player.applyAnimation("PED", "WALK_gang1", 4.1, true, true, true, true, 1)
        case 3:
			return player.applyAnimation("PED", "WOMAN_walksexy", 4.1, true, true, true, true, 1)
        case 4:
			return player.applyAnimation("PED", "WALK_armed", 4.1, true, true, true, true, 1)
        case 5:
			return player.applyAnimation("PED", "WALK_civi", 4.1, true, true, true, true, 1)
        case 6:
			return player.applyAnimation("PED", "WALK_csaw", 4.1, true, true, true, true, 1)
        case 7:
			return player.applyAnimation("PED", "WALK_gang2", 4.1, true, true, true, true, 1)
        case 8:
			return player.applyAnimation("PED", "WALK_drunk", 4.1, true, true, true, true, 1)
        case 9:
			return player.applyAnimation("PED", "WALK_fat", 4.1, true, true, true, true, 1)
        case 10:
			return player.applyAnimation("PED", "WALK_fatold", 4.1, true, true, true, true, 1)
        case 11:
			return player.applyAnimation("PED", "WALK_old", 4.1, true, true, true, true, 1)
        case 12:
			return player.applyAnimation("PED", "WALK_player", 4.1, true, true, true, true, 1)
        case 13:
			return player.applyAnimation("PED", "WALK_rocket", 4.1, true, true, true, true, 1)
        case 14:
			return player.applyAnimation("PED", "WALK_shuffle", 4.1, true, true, true, true, 1)
        case 15:
			return player.applyAnimation("PED", "WOMAN_walknorm", 4.1, true, true, true, true, 1)
        case 16:
			return player.applyAnimation("PED", "WOMAN_walkpro", 4.1, true, true, true, true, 1)
        case 17:
			return player.applyAnimation("PED", "WOMAN_walkbusy", 4.1, true, true, true, true, 1)
        case 18:
			return player.applyAnimation("PED", "WOMAN_walknorm", 4.1, true, true, true, true, 1)
        case 19:
			return player.applyAnimation("PED", "Walk_Wuzi", 4.1, true, true, true, true, 1)
        default:
			return player.sendMessage(usageMessage("/walk [1-19]"));
    }
})

og.commands.add("/sit", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("BEACH", "PARKSIT_M_LOOP", 4.1, false, false, false, true, 0)
        case 2:
			return player.applyAnimation("BEACH", "SITNWAIT_LOOP_W", 4.1, false, false, false, true, 0)
        case 3:
			return player.applyAnimation("BEACH", "PARKSIT_W_LOOP", 4.1, false, false, false, true, 0)
        default:
			return player.sendMessage(usageMessage("/sit [1-3]"));
    }
})

og.commands.add("/seat", [], (player) => {
    player.applyAnimation("PED", "SEAT_DOWN", 4.1, false, false, false, true, 0)
})

og.commands.add("/lean", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("GANGS", "LEANIDLE", 4.0, false, true, true, true, 0)
        case 2:
			return player.applyAnimation("MISC", "PLYRLEAN_LOOP", 4.1, true, true, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/lean [1-2]"));
    }
})

og.commands.add("/gsign", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("GHANDS", "gsign1", 4.0, false, false, false, true, 1)
        case 2:
			return player.applyAnimation("GHANDS", "gsign1LH", 4.0, false, false, false, true, 1)
        case 3:
			return player.applyAnimation("GHANDS", "gsign2", 4.0, false, false, false, true, 1)
        case 4:
			return player.applyAnimation("GHANDS", "gsign2LH", 4.0, false, false, false, true, 1)
        case 5:
			return player.applyAnimation("GHANDS", "gsign3", 4.0, false, false, false, true, 1)
        case 6:
			return player.applyAnimation("GHANDS", "gsign3LH", 4.0, false, false, false, true, 1)
        case 7:
			return player.applyAnimation("GHANDS", "gsign4", 4.0, false, false, false, true, 1)
        case 8:
			return player.applyAnimation("GHANDS", "gsign4LH", 4.0, false, false, false, true, 1)
        case 9:
			return player.applyAnimation("GHANDS", "gsign5", 4.0, false, false, false, true, 1)
        case 10:
			return player.applyAnimation("GHANDS", "gsign5", 4.0, false, false, false, true, 1)
        case 11:
			return player.applyAnimation("GHANDS", "gsign5LH", 4.0, false, false, false, true, 1)
        case 12:
			return player.applyAnimation("GANGS", "Invite_Yes", 4.0, false, false, false, false, 0)
        case 13:
			return player.applyAnimation("GANGS", "prtial_gngtlkD", 4.0, false, false, false, true, 0)
        case 14:
			return player.applyAnimation("GANGS", "smkcig_prtl", 4.0, false, false, false, true, 1)
        default:
			return player.sendMessage(usageMessage("/gsign [1-14]"));
    }
})

og.commands.add("/salute", [], (player) => {
    player.applyAnimation("GHANDS", "GSIGN5LH", 4.1, false, false, false, false, 0)
})

og.commands.add("/cry", [], (player) => {
    player.applyAnimation("GRAVEYARD", "MRNF_LOOP", 4.1, true, false, false, false, 0)
})

og.commands.add("/injured", [], (player) => {
    player.applyAnimation("SWEET", "SWEET_INJUREDLOOP", 4.1, false, true, true, true, 0)
})

og.commands.add("/blowjob", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("BLOWJOBZ", "BJ_COUCH_START_W", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("BLOWJOBZ", "BJ_COUCH_LOOP_W", 4.1, true, false, false, false, 0)
        case 3:
			return player.applyAnimation("BLOWJOBZ", "BJ_COUCH_END_W", 4.1, false, false, false, false, 0)
        case 4:
			return player.applyAnimation("BLOWJOBZ", "BJ_COUCH_START_P", 4.1, false, false, false, false, 0)
        case 5:
			return player.applyAnimation("BLOWJOBZ", "BJ_COUCH_LOOP_P", 4.1, true, false, false, false, 0)
        case 6:
			return player.applyAnimation("BLOWJOBZ", "BJ_COUCH_END_P", 4.1, false, false, false, false, 0)
        case 7:
			return player.applyAnimation("BLOWJOBZ", "BJ_STAND_START_W", 4.1, false, false, false, false, 0)
        case 8:
			return player.applyAnimation("BLOWJOBZ", "BJ_STAND_LOOP_W", 4.1, true, false, false, false, 0)
        case 9:
			return player.applyAnimation("BLOWJOBZ", "BJ_STAND_END_W", 4.1, false, false, false, false, 0)
        case 10:
			return player.applyAnimation("BLOWJOBZ", "BJ_STAND_START_P", 4.1, false, false, false, false, 0)
        case 11:
			return player.applyAnimation("BLOWJOBZ", "BJ_STAND_LOOP_P", 4.1, true, false, false, false, 0)
        case 12:
			return player.applyAnimation("BLOWJOBZ", "BJ_STAND_END_P", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/blowjob [1-12]"));
    }
})

og.commands.add("/gym", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_CELEBRATE", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_DOWN", 4.1, false, false, false, false, 0)
        case 3:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_GETOFF", 4.1, false, false, false, false, 0)
        case 4:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_GETON", 4.1, false, false, false, false, 0)
        case 5:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_UP_A", 4.1, true, false, false, false, 0)
        case 6:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_UP_B", 4.1, true, false, false, false, 0)
        case 7:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_UP_SMOOTH", 4.1, true, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/gym [1-7]"));
    }
})

og.commands.add("/fuckyou", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("RIOT", "RIOT_FUKU", 4.0, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("RIOT", "RIOT_FUKU", 4.0, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/fuckyou [1-2]"));
    }
})

og.commands.add("/wave", [], (player, variant) => {
    switch(parseInt(variant)) {
 		case 1:
			return player.applyAnimation("ON_LOOKERS", "wave_loop", 4.0, true, false, false, false, 0)
 		case 2:
			return player.applyAnimation("KISSING", "gfwave2", 4.0, false, false, false, false, 0)
 		case 3:
			return player.applyAnimation("PED", "endchat_03", 4.0, false, false, false, false, 0)
 		default:
			return player.sendMessage(usageMessage("/wave [1-3]"));
 	}
 })

og.commands.add("/batcrack", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("CRACK", "BBALBAT_IDLE_01", 4.1, true, false, false, false, 0)
        case 2:
			return player.applyAnimation("CRACK", "BBALBAT_IDLE_02", 4.1, true, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/batcrack [1-2]"));
    }
})

og.commands.add("/punch", [], (player) => {
    player.applyAnimation("RIOT", "RIOT_PUNCHES", 4.1, false, true, true, false, 0)
})

og.commands.add("/aim", [], (player) => {
    player.applyAnimation("SHOP", "ROB_Loop_Threat", 4.0, true, false, false, false, 0)
   })

og.commands.add("/bat", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("BASEBALL", "BAT_1", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("BASEBALL", "BAT_2", 4.1, false, false, false, false, 0)
        case 3:
			return player.applyAnimation("BASEBALL", "BAT_3", 4.1, false, false, false, false, 0)
        case 4:
			return player.applyAnimation("BASEBALL", "BAT_4", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/bat [1-4]"));
    }
})

og.commands.add("/batblock", [], (player) => {
    player.applyAnimation("BASEBALL", "BAT_BLOCK", 4.1, false, false, false, false, 0)
})

og.commands.add("/cover", [], (player) => {
    player.applyAnimation("PED", "COWER", 4.1, false, false, false, true, 0)
})

og.commands.add("/crawl", [], (player) => {
    player.applyAnimation("PED", "CAR_CRAWLOUTRHS", 4.1, false, false, false, false, 0)
})

og.commands.add("/crack", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("CRACK", "CRCKDETH2", 4.1, true, false, false, false, 0)
        case 2:
			return player.applyAnimation("CRACK", "CRCKIDLE1", 4.1, true, false, false, false, 0)
        case 3:
			return player.applyAnimation("CRACK", "CRCKDETH3", 4.1, false, false, false, true, 0)
        case 4:
			return player.applyAnimation("CRACK", "CRCKDETH1", 4.1, false, false, false, true, 0)
        default:
			return player.sendMessage(usageMessage("/crack [1-4]"));
    }
})

og.commands.add("/sipdrink", [], (player) => {
    player.applyAnimation("BAR", "DNK_STNDM_LOOP", 4.1, false, false, false, false, 0)
})

og.commands.add("/drugsbuy", [], (player) => {
    player.applyAnimation("DEALER", "DRUGS_BUY", 4.1, false, false, false, false, 0)
})

og.commands.add("/bitchslap", [], (player) => {
    player.applyAnimation("MISC", "BITCHSLAP", 4.1, false, false, false, false, 0)
})

og.commands.add("/reload", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("COLT45", "COLT45_RELOAD", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("COLT45", "COLT45_CROUCHRELOAD", 4.1, false, false, false, false, 0)
        case 3:
			return player.applyAnimation("COLT45", "SAWNOFF_RELOAD", 4.1, false, false, false, false, 0)
        case 4:
			return player.applyAnimation("BUDDY", "BUDDY_RELOAD", 4.1, false, false, false, false, 0)
        case 5:
			return player.applyAnimation("BUDDY", "BUDDY_CROUCHRELOAD", 4.1, false, false, false, false, 0)
        case 6:
			return player.applyAnimation("PYTHON", "PYTHON_RELOAD", 4.1, false, false, false, false, 0)
        case 7:
			return player.applyAnimation("SILENCED", "SILENCE_RELOAD", 4.1, false, false, false, false, 0)
        case 8:
			return player.applyAnimation("TEC", "TEC_RELOAD", 4.1, false, false, false, false, 0)
        case 9:
			return player.applyAnimation("UZI", "UZI_RELOAD", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/reload [1-9]"));
    }
})

og.commands.add("/knifeblock", [], (player) => {
    player.applyAnimation("KNIFE", "KNIFE_BLOCK", 4.1, false, false, false, false, 0)
})

og.commands.add("/knifeidle", [], (player) => {
    player.applyAnimation("KNIFE", "KNIFE_IDLE", 4.1, false, false, false, false, 0)
})

og.commands.add("/safeopen", [], (player) => {
    player.applyAnimation("ROB_BANK", "CAT_SAFE_OPEN", 4.1, false, false, false, false, 0)
})

og.commands.add("/saferob", [], (player) => {
    player.applyAnimation("ROB_BANK", "CAT_SAFE_ROB", 4.1, false, false, false, false, 0)
})

og.commands.add("/knife", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("KNIFE", "KNIFE_HIT_1", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("KNIFE", "KNIFE_HIT_2", 4.1, false, false, false, false, 0)
        case 3:
			return player.applyAnimation("KNIFE", "KNIFE_HIT_3", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/knife [1-3]"));
    }
})

og.commands.add("/shoot", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("COLT45", "COLT45_FIRE", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("PYTHON", "PYTHON_FIRE", 4.1, false, false, false, false, 0)
        case 3:
			return player.applyAnimation("RIFLE", "RIFLE_FIRE", 4.1, false, false, false, false, 0)
        case 4:
			return player.applyAnimation("SHOTGUN", "SHOTGUN_FIRE", 4.1, false, false, false, false, 0)
        case 5:
			return player.applyAnimation("SILENCED", "SILENCE_FIRE", 4.1, false, false, false, false, 0)
        case 6:
			return player.applyAnimation("TEC", "TEC_FIRE", 4.1, false, false, false, false, 0)
        case 7:
			return player.applyAnimation("UZI", "UZI_FIRE", 4.1, false, false, false, false, 0)
        case 8:
			return player.applyAnimation("BUDDY", "BUDDY_FIRE", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/shoot [1-8]"));
    }
})

og.commands.add("/cshoot", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("COLT45", "COLT45_CROUCHFIRE", 4.1, true, false, false, false, 0)
        case 2:
			return player.applyAnimation("PYTHON", "PYTHON_CROUCHFIRE", 4.1, true, false, false, false, 0)
        case 3:
			return player.applyAnimation("RIFLE", "RIFLE_CROUCHFIRE", 4.1, true, false, false, false, 0)
        case 4:
			return player.applyAnimation("SHOTGUN", "SHOTGUN_CROUCHFIRE", 4.1, true, false, false, false, 0)
        case 5:
			return player.applyAnimation("TEC", "TEC_CROUCHFIRE", 4.1, true, false, false, false, 0)
        case 6:
			return player.applyAnimation("UZI", "UZI_CROUCHFIRE", 4.1, true, false, false, false, 0)
        case 7:
			return player.applyAnimation("BUDDY", "BUDDY_CROUCHFIRE", 4.1, true, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/cshoot [1-7]"));
    }
})

og.commands.add("/crossroad", [], (player, variant) => {
    switch(parseInt(variant)) {
		case 1:
			return player.applyAnimation("ped", "roadcross", 4.1, false, false, false, false, 0)
    	case 2:
			return player.applyAnimation("ped", "roadcross_female", 4.1, false, false, false, false, 0)
     	case 3:
			return player.applyAnimation("ped", "roadcross_gang", 4.1, false, false, false, false, 0)
     	case 4:
			return player.applyAnimation("ped", "roadcross_old", 4.1, false, false, false, false, 0)
     	default:
			return player.sendMessage(usageMessage("/crossroad [1-4]"));
	}
})

og.commands.add("/mourn", [], (player) => {
    player.applyAnimation("GRAVEYARD", "MRNM_LOOP", 4.1, true, false, false, false, 0)
})

og.commands.add("/stretch", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("BENCHPRESS", "GYM_BP_CELEBRATE", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("PLAYIDLES", "STRETCH", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/stretch [1-2]"));
    }
})

og.commands.add("/baridle", [], (player) => {
    player.applyAnimation("BAR", "BARMAN_IDLE", 4.0, false, false, false, false, 0)
})

og.commands.add("/barorder", [], (player) => {
    player.applyAnimation("BAR", "BARCUSTOM_ORDER", 4.0, false, false, false, false, 0)
})

og.commands.add("/servebottle", [], (player) => {
    player.applyAnimation("BAR", "BARSERVE_BOTTLE", 4.0, false, false, false, false, 0)
})

og.commands.add("/serveglass", [], (player) => {
    player.applyAnimation("BAR", "BARSERVE_GLASS", 4.0, false, false, false, false, 0)
})

og.commands.add("/forwardlook", [], (player) => {
    player.applyAnimation("BD_FIRE", "BD_PANIC_02", 4.1, false, false, false, false, 0)
})

og.commands.add("/shouldercheck", [], (player) => {
    player.applyAnimation("BD_FIRE", "BD_PANIC_04", 4.1, false, false, false, false, 0)
})

og.commands.add("/camshot", [], (player) => {
    player.applyAnimation("CAMERA", "PICCRCH_IN", 4.1, false, false, false, false, 0)
})

og.commands.add("/washhands", [], (player) => {
    player.applyAnimation("BD_FIRE", "WASH_UP", 4.1, false, false, false, false, 0)
})

og.commands.add("/dunk", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("BSKTBALL", "BBALL_DNK", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("BSKTBALL", "BBALL_DNK_GLI", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/dunk [1-2]"));
    }
})

og.commands.add("/shotgun", [], (player) => {
    player.applyAnimation("BUDDY", "BUDDY_FIRE_POOR", 4.1, false, false, false, false, 0)
})

og.commands.add("/fixcar", [], (player) => {
    player.applyAnimation("CAR", "FIXN_CAR_LOOP", 4.1, false, false, false, true, 0)
})

og.commands.add("/fixcarout", [], (player) => {
    player.applyAnimation("CAR", "FIXN_CAR_OUT", 4.1, false, false, false, false, 0)
})

og.commands.add("/crossarms", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("COP_AMBIENT", "COPLOOK_LOOP", 4.1, false, false, false, true, 0)
        case 2:
			return player.applyAnimation("COP_AMBIENT", "COPLOOK_THINK", 4.1, false, false, false, false, 0)
        case 3:
			return player.applyAnimation("COP_AMBIENT", "COPLOOK_NOD", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/crossarms [1-3]"));
    }
})

og.commands.add("/shottyreload", [], (player) => {
    player.applyAnimation("BUDDY", "BUDDY_RELOAD", 4.1, false, false, false, false, 0)
})

og.commands.add("/dropflag", [], (player) => {
    player.applyAnimation("CAR", "FLAG_DROP", 4.1, false, false, false, false, 0)
})

og.commands.add("/dodge", [], (player) => {
    player.applyAnimation("KNIFE", "KNIFE_HIT_1", 4.1, false, false, false, false, 0)
})

og.commands.add("/groundhit", [], (player) => {
    player.applyAnimation("FIGHT_B", "FIGHTB_G", 4.1, false, false, false, false, 0)
})

og.commands.add("/tired", [], (player) => {
    player.applyAnimation("PED", "IDLE_TIRED", 4.1, false, false, false, true, 0)
})

og.commands.add("/box", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("FIGHT_B", "FIGHTB_1", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("FIGHT_B", "FIGHTB_2", 4.1, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/box [1-2]"));
    }
})

og.commands.add("/kungfu", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("FIGHT_C", "FIGHTC_1", 4.1, false, true, true, false, 0)
        case 2:
			return player.applyAnimation("FIGHT_C", "FIGHTC_2", 4.1, false, true, true, false, 0)
        case 3:
			return player.applyAnimation("FIGHT_C", "FIGHTC_3", 4.1, false, true, true, false, 0)
        default:
			return player.sendMessage(usageMessage("/kungfu [1-3]"));
    }
})

og.commands.add("/agree", [], (player) => {
    player.applyAnimation("GANGS", "INVITE_YES", 4.1, false, false, false, false, 0)
})

og.commands.add("/reject", [], (player) => {
    player.applyAnimation("GANGS", "INVITE_NO", 4.1, false, false, false, false, 0)
})

og.commands.add("/downpush", [], (player) => {
    player.applyAnimation("GANGS", "SHAKE_CARA", 4.1, false, false, false, false, 0)
})

og.commands.add("/kungfublock", [], (player) => {
    player.applyAnimation("FIGHT_C", "FIGHTC_BLOCK", 4.1, false, true, true, false, 0)
})

og.commands.add("/spray", [], (player) => {
    player.applyAnimation("GRAFFITI", "SPRAYCAN_FIRE", 4.1, false, false, false, false, 0)
})

og.commands.add("/lowbump", [], (player) => {
    player.applyAnimation("GANGS", "SHAKE_CARSH", 4.1, false, false, false, false, 0)
})

og.commands.add("/kungfustomp", [], (player) => {
    player.applyAnimation("FIGHT_C", "FIGHTC_G", 4.1, false, true, true, false, 0)
})

og.commands.add("/flykick", [], (player) => {
    player.applyAnimation("FIGHT_C", "FIGHTC_M", 4.1, false, false, false, false, 0)
})

og.commands.add("/deskbored", [], (player) => {
    player.applyAnimation("INT_OFFICE", "OFF_SIT_BORED_LOOP", 4.1, true, false, false, false, 0)
})

og.commands.add("/deskdrink", [], (player) => {
    player.applyAnimation("INT_OFFICE", "OFF_Sit_Drink", 4.1, true, false, false, false, 0)
})

og.commands.add("/shoppay", [], (player) => {
    player.applyAnimation("DEALER", "SHOP_PAY", 4.1, false, false, false, false, 0)
})

og.commands.add("/desksit", [], (player) => {
    player.applyAnimation("INT_OFFICE", "OFF_SIT_IDLE_LOOP", 4.1, true, false, false, false, 0)
})

og.commands.add("/hit", [], (player) => {
    player.applyAnimation("FIGHT_B", "HITB_2", 4.1, false, false, false, false, 0)
})

og.commands.add("/backhit", [], (player) => {
    player.applyAnimation("FIGHT_B", "HITB_1", 4.1, false, false, false, false, 0)
})

og.commands.add("/fallhit", [], (player) => {
    player.applyAnimation("FIGHT_C", "HITC_3", 4.1, false, false, false, false, 0)
})

og.commands.add("/openleft", [], (player) => {
    player.applyAnimation("VAN", "VAN_OPEN_BACK_LHS", 4.1, false, false, false, false, 0)
})

og.commands.add("/openright", [], (player) => {
    player.applyAnimation("VAN", "VAN_OPEN_BACK_RHS", 4.1, false, false, false, false, 0)
})

og.commands.add("/stopcop", [], (player) => {
    player.applyAnimation("POLICE", "COPTRAF_STOP", 4.1, false, false, false, false, 0)
})

og.commands.add("/leftcop", [], (player) => {
    player.applyAnimation("POLICE", "COPTRAF_LEFT", 4.1, false, false, false, false, 0)
})

og.commands.add("/fallkick", [], (player) => {
    player.applyAnimation("PED", "KO_SKID_FRONT", 4.1, false, false, false, true, 0)
})

og.commands.add("/choke", [], (player) => {
    player.applyAnimation("KNIFE", "KILL_KNIFE_PED_DIE", 4.1, false, true, true, true, 0)
})

og.commands.add("/aimfast", [], (player) => {
	player.applyAnimation("SNIPER", "WEAPON_SNIPER", 4.1, false, false, false, false, 0)
})

og.commands.add("/what", [], (player) => {
    player.applyAnimation("RIOT", "RIOT_ANGRY", 4.0, false, false, false, false, 0)
})

og.commands.add("/baseballslap", [], (player) => {
    player.applyAnimation("BASEBALL", "BAT_M", 4.1, false, false, false, false, 0)
})

og.commands.add("/laugh", [], (player) => {
    player.applyAnimation("RAPPING", "LAUGH_01", 4.1, false, false, false, false, 0)
})

og.commands.add("/rap", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("RAPPING", "RAP_A_LOOP", 4.1, true, true, false, false, 0)
        case 2:
			return player.applyAnimation("RAPPING", "RAP_B_LOOP", 4.1, true, true, false, false, 0)
        case 3:
			return player.applyAnimation("RAPPING", "RAP_C_LOOP", 4.1, true, true, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/rap [1-3]"));
    }
})

og.commands.add("/kickdoor", [], (player) => {
    player.applyAnimation("POLICE", "DOOR_KICK", 4.1, false, false, false, false, 0)
})

og.commands.add("/defenser", [], (player) => {
    player.applyAnimation("BSKTBALL", "BBALL_DEF_STEPR", 4.1, true, true, true, false, 0)
})

og.commands.add("/dribble", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("BSKTBALL", "BBALL_IDLE", 4.1, false, false, false, false, 0)
        case 2:
			return player.applyAnimation("BSKTBALL", "BBALL_WALK", 4.1, true, true, true, false, 0)
        case 3:
			return player.applyAnimation("BSKTBALL", "BBALL_RUN", 4.1, true, true, true, false, 0)
        default:
			return player.sendMessage(usageMessage("/dribble [1-3]"));
    }
})

og.commands.add("/fakeshot", [], (player) => {
    player.applyAnimation("BSKTBALL", "BBALL_DNK_LND", 4.1, false, false, false, false, 0)
})

og.commands.add("/stealball", [], (player) => {
    player.applyAnimation("BSKTBALL", "BBALL_JUMP_END", 4.1, false, false, false, false, 0)
})

og.commands.add("/jumpshot", [], (player) => {
    player.applyAnimation("BSKTBALL", "BBALL_JUMP_SHOT", 4.1, false, false, false, false, 0)
})

og.commands.add("/pickupball", [], (player) => {
    player.applyAnimation("BSKTBALL", "BBALL_PICKUP", 4.1, false, false, false, false, 0)
})

og.commands.add("/angry", [], (player) => {
    player.applyAnimation("BSKTBALL", "BBALL_REACT_MISS", 4.1, false, false, false, false, 0)
})

og.commands.add("/throw", [], (player) => {
    player.applyAnimation("GRENADE", "WEAPON_THROW", 4.1, false, false, false, false, 0)
})

og.commands.add("/deal", [], (player) => {
    player.applyAnimation("GANGS", "DEALER_DEAL", 4.1, false, false, false, false, 0)
})

og.commands.add("/dealerstance", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("DEALER", "DEALER_IDLE", 4.1, true, false, false, false, 0)
        case 2:
			return player.applyAnimation("DEALER", "DEALER_IDLE_01", 4.1, true, false, false, false, 0)
        case 3:
			return player.applyAnimation("DEALER", "DEALER_IDLE_02", 4.1, true, false, false, false, 0)
        case 4:
			return player.applyAnimation("DEALER", "DEALER_IDLE_03", 4.1, true, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/dealerstance [1-4]"));
    }
})

og.commands.add("/getshot", [], (player) => {
    player.applyAnimation("PED", "KO_SHOT_STOM", 4.1, false, true, true, true, 0)
})

og.commands.add("/fightstance", [], (player) => {
    player.applyAnimation("PED", "FIGHTIDLE", 4.1, true, false, false, false, 0)
})

og.commands.add("/frontfall", [], (player) => {
    player.applyAnimation("PED", "FLOOR_HIT_F", 4.1, false, false, false, true, 0)
})

og.commands.add("/getupb", [], (player) => {
    player.applyAnimation("FIGHT_E", "HIT_FIGHTKICK_B", 4.1, false, false, false, true, 0)
})

og.commands.add("/push", [], (player) => {
    player.applyAnimation("FIGHT_D", "FIGHTD_3", 4.1, false, false, false, false, 0)
})

og.commands.add("/riot", [], (player, variant) => {
    switch(parseInt(variant)) {
        case 1:
			return player.applyAnimation("RIOT", "RIOT_CHANT", 4.0, true, false, false, false, 0)
        case 2:
			return player.applyAnimation("RIOT", "RIOT_PUNCHES", 4.0, false, false, false, false, 0)
        default:
			return player.sendMessage(usageMessage("/riot [1-2]"));
    }
})

og.commands.add("/vomit", [], (player) => {
    player.applyAnimation("FOOD", "EAT_Vomit_P", 3.0, false, false, false, false, 0)
})

og.commands.add("/eatanim", [], (player, variant) => {
    switch(parseInt(variant)) {
		case 1:
			return player.applyAnimation("FOOD", "EAT_Burger", 4.0999, true, true, true, false, 0)
		case 2:
			return player.applyAnimation("FOOD", "EAT_Chicken", 4.0999, true, true, true, false, 0)
		case 3:
			return player.applyAnimation("FOOD", "EAT_Pizza", 4.0999, true, true, true, false, 0)
		case 4:
			return player.applyAnimation("FOOD", "FF_Sit_Eat1", 4.0999, true, true, true, false, 0)
		case 5:
			return player.applyAnimation("FOOD", "FF_Sit_Eat2", 4.0999, true, true, true, false, 0)
		case 6:
			return player.applyAnimation("FOOD", "FF_Sit_Eat3", 4.0999, true, true, true, false, 0)
		case 7:
			return player.applyAnimation("PED", "gum_eat", 4.0999, true, true, true, false, 0)
		default:
			return player.sendMessage(usageMessage("/eatanim [1-7]"));
	}
})

og.commands.add("/cpr", [], (player) => {
    player.applyAnimation("MEDIC", "CPR", 4.0, true, false, false, false, 0)
})

og.commands.add("/caranim", [], (player, variant) => {
    switch(parseInt(variant)) {
		case 1:
			return player.applyAnimation("CAR_CHAT", "carfone_in", 4.0999, false, true, true, true, 0)
		case 2:
			return player.applyAnimation("CAR_CHAT", "carfone_loopA", 4.0999, true, true, true, true, 0)
		case 3:
			return player.applyAnimation("CAR_CHAT", "carfone_loopA_to_B", 4.0999, false, true, true, true, 0)
		case 4:
			return player.applyAnimation("CAR_CHAT", "carfone_loopB", 4.0999, true, true, true, true, 0)
		case 5:
			return player.applyAnimation("CAR_CHAT", "carfone_loopB_to_A", 4.0999, true, true, true, true, 0)
		case 6:
			return player.applyAnimation("CAR_CHAT", "carfone_out", 4.0999, false, true, true, true, 0)
		case 7:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc1_BL", 4.0999, false, true, true, true, 0)
		case 8:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc1_BR", 4.0999, false, true, true, true, 0)
		case 9:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc1_FL", 4.0999, false, true, true, true, 0)
		case 10:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc1_FR", 4.0999, false, true, true, true, 0)
		case 11:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc2_FL", 4.0999, false, true, true, true, 0)
		case 12:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc3_BR", 4.0999, false, true, true, true, 0)
		case 13:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc3_FL", 4.0999, false, true, true, true, 0)
		case 14:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc3_FR", 4.0999, false, true, true, true, 0)
		case 15:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc4_BL", 4.0999, false, true, true, true, 0)
		case 16:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc4_BR", 4.0999, false, true, true, true, 0)
		case 17:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc4_FL", 4.0999, false, true, true, true, 0)
		case 18:
			return player.applyAnimation("CAR_CHAT", "CAR_Sc4_FR", 4.0999, false, true, true, true, 0)
		case 19:
			return player.applyAnimation("PED", "CAR_tune_radio", 4.0999, false, true, true, true, 0)
		default:
			return player.sendMessage(usageMessage("/caranim [1-19]"));
	}
})