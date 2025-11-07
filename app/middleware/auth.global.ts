export default defineNuxtRouteMiddleware((to, from) => {
    const email = extractEmail(decodeURIComponent(to.fullPath));
    const conditionMet = !!email;

    if (!conditionMet) {
        return abortNavigation(createError({
            statusCode: 403,
            statusMessage: 'Forbidden: Access Denied',
            data: { details: 'Authentication required' },
        }))
    }
})