<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()

const logout = () => {
    userStore.logOut()
    router.push('/')
}

const scrollClass = ref('bg-transparent')

onMounted(() => {
    let lastScrollY = window.scrollY

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            if (window.scrollY < lastScrollY) {
                scrollClass.value = 'bg-transparent'
            } else {
                scrollClass.value = 'bg-gray-900 backdrop-blur-xl bg-opacity-30'
            }
        } else {
            scrollClass.value = 'bg-transparent'
        }
    })
})
</script>

<template>
    <header class="header" :class="scrollClass">
        <div class="header__wrapper">
            <NuxtLink to="/" :class="userStore.isLogged ? '' : 'mx-auto'">
                <h1>Cineflix</h1>
            </NuxtLink>
            <button v-if="userStore.isLogged" @click="logout" class="header__logout">Logout</button>
        </div>
    </header>
</template>

<style lang="postcss" scoped>
.header {
    @apply fixed w-full transition duration-300 z-[100];
    & h1 {
        @apply text-4xl lg:text-5xl font-semibold font-Poppins hover:brightness-125 transition text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500;
    }
    &__wrapper {
        @apply container mx-auto w-full flex justify-between items-center text-white py-4 z-[100];
    }
    &__logout {
        @apply border rounded-full px-8 py-2 hover:bg-white hover:text-black transition-colors z-[200];
    }
}
</style>
