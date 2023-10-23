import { og } from "../.."
import { loadAllSpawnedAutomobiles } from "../../components/automobile"

og.events.init(async () => {
    const count = await loadAllSpawnedAutomobiles()
    console.log(`Loaded ${count} vehicles!`)
})