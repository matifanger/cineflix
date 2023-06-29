const runtimeConfig = useRuntimeConfig()

const BASE_URL = runtimeConfig.BASE_URL
const API_KEY = runtimeConfig.API_KEY

// This endpoint is used to fetch data from the OMDB API via the server.
// API_KEY and BASE_URL are hidden to the client.
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
