export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token').value

    if (to.path === '/login') {
        if (token) {
            return navigateTo('/')
        }
    }

    if (to.path.includes('/movie')) {
        if (!token) {
            return navigateTo('/login')
        }
    }
})
