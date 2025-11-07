import * as process from "node:process";

export default defineEventHandler(async (event) => {
    const {email} = await readBody(event)
    return {u: btoa(process.env.NUXT_DESTINATION + email)}
})