import * as process from "node:process";

export default defineEventHandler(async (event) => {
    const {token} = await readBody(event)

    if (!token) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Token not provided.',
        })
    }

    if (await verifyTurnstileToken(token)) {
        return {r: btoa(process.env.NUXT_FIRST_ROUTE), u: btoa(process.env.NUXT_SECOND_ROUTE)}
    }
})