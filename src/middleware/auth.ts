export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token').value

    // if the user is logged in, redirect to home page if they try to access login page
    if (to.path === '/login') {
        if (token) {
            return navigateTo('/')
        }
    }

    // if the user is not logged in, redirect to login page if they try to access movie page
    if (to.path.includes('/movie')) {
        if (!token) {
            return navigateTo('/login')
        }
    }
})
