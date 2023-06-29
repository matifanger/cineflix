<script lang="ts" setup>
import { MoviesResponse } from 'global'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// Search query
const search = getRandomMovie()

// Store data here after fetching it (only if user is logged in)
const result = ref(null) as Ref<MoviesResponse | null>

// Check if user is logged in, then fetch data
if (userStore.isLogged) {
    await useAsyncData<MoviesResponse>('movies', () => $fetch(`/api/getdata?s=${search}`), {
        transform: (data) => (result.value = data),
    })
}

useHead({
    title: 'Homepage',
    meta: [{ name: 'description', content: 'Homepage - Cineflix' }],
})
</script>

<template>
    <div>
        <MainpageIndexMovies v-if="userStore.isLogged && result?.Search" :data="result.Search" />
        <Mainpage v-else />
    </div>
</template>
