<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// Load token cookie on page load
await useAsyncData('user', async () => userStore.handleCookie())

useHead({
    titleTemplate: (title) => `${title} | Cineflix`,
    meta: [
        {
            name: 'description',
            content: 'High-Quality, Unique, and free movies for anyone - Cineflix',
        },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
})
</script>

<template>
    <div class="app">
        <NuxtLoadingIndicator :throttle="1" />
        <Header />
        <div class="app__slot">
            <slot />
        </div>
    </div>
</template>

<style lang="postcss">
.app {
    @apply min-h-screen bg-cover bg-center text-white bg-fixed;
    background-image: linear-gradient(rgb(0 0 0 / 80%), rgb(0 0 0 / 80%)),
        url('https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_large.jpg');
    &__slot {
        @apply font-Poppins;
    }
}
</style>
