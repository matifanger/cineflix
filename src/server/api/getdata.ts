const runtimeConfig = useRuntimeConfig()

const BASE_URL = runtimeConfig.BASE_URL
const API_KEY = runtimeConfig.API_KEY

// Calls directly from the server, so we can hide the API_KEY key and the BASE_URL.
export default defineEventHandler(async (event) => {
    // Query must contain any of the parameters accepted by the API.
    // https://www.omdbapi.com/
    const query = getQuery(event)

    return await $fetch(BASE_URL, {
        params: {
            ...query,
            apikey: API_KEY,
        },
    })
})
