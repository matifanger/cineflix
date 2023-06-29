<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// Form filled for faster login
const form = ref({
    email: 'admin@admin.com',
    password: 'password',
})

// Disable button if form is not filled
const disabled = computed(() => {
    return !form.value.email || !form.value.password || loading.value
})

const loading = ref(false)
const errors = ref<null | string[]>(null)

const login = async () => {
    try {
        loading.value = true
        // add a pause of 1 second to show the loading animation
        await new Promise((r) => setTimeout(r, 1000))

        // Send login request
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(form.value),
        })

        if (res.ok) {
            const { token } = await res.json()

            // Set cookie
            const cookie = useCookie('token')
            cookie.value = token

            // Set user status
            userStore.setStatus(true, token)

            router.push('/')
        } else {
            // Set errors
            const jsonres = await res.json()
            errors.value = jsonres.data
        }
    } catch (error) {
        errors.value = error as any
    } finally {
        loading.value = false
    }
}

definePageMeta({
    middleware: ['auth'],
})

useHead({
    title: 'Login',
    meta: [{ name: 'description', content: 'Login - Cineflix' }],
})
</script>

<template>
    <div class="login">
        <div class="login__wrapper">
            <form class="login__form" @submit.prevent="login">
                <div class="form">
                    <div v-if="errors" class="form__errors">
                        <button @click="errors = null"><UnoIcon class="i-mdi:close" /></button>
                        <p v-for="err in errors">{{ err }}</p>
                    </div>
                    <div>
                        <label for="email" class="form__label">Email</label>
                        <input
                            name="email"
                            type="email"
                            class="form__input"
                            placeholder="john@doe.com"
                            v-model="form.email"
                        />
                    </div>

                    <div>
                        <label for="password" class="form__label">Password</label>
                        <input
                            name="password"
                            type="password"
                            class="form__input"
                            placeholder="*******"
                            v-model="form.password"
                        />
                    </div>

                    <button :disabled="disabled" type="submit" class="form__submit">
                        <span :class="loading ? 'text-transparent' : ''">Login</span>
                        <UnoIcon v-if="loading" class="i-mdi:loading animate-spin text-2xl absolute" />
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.login {
    @apply min-h-screen flex items-center justify-center;
    &__wrapper {
        @apply mx-auto max-w-screen-2xl px-4 md:px-8;
    }
    & h1 {
        @apply mb-4 text-center text-2xl font-bold text-gray-200 md:mb-8 lg:text-3xl;
    }
    &__form {
        @apply mx-auto  max-w-lg rounded-lg bg-zinc-800 bg-opacity-90 backdrop-blur-md;
        & .form {
            @apply flex flex-col gap-4 p-4 md:p-8;
            &__errors {
                @apply relative bg-red-200 text-red-700 p-3 rounded text-sm font-semibold border-l-4 border-red-500 pt-5;
                & button {
                    @apply absolute right-0 top-0 text-red-600 text-lg font-bold hover:brightness-125 transition;
                }
            }
            &__label {
                @apply mb-2 inline-block text-base text-gray-200 sm:text-lg;
            }
            &__input {
                @apply w-full rounded bg-zinc-900 px-3 py-2 text-gray-200 outline-none ring-indigo-400 transition duration-100 focus:ring;
            }
            &__submit {
                @apply relative disabled:cursor-not-allowed
                 disabled:bg-gray-400 disabled:border-gray-400 mt-4 flex items-center justify-center 
                 gap-2 rounded-lg bg-white px-8 py-2 text-center text-sm
                 font-semibold text-gray-800 outline-none ring-gray-300 transition
                  enabled:hover:brightness-90 focus-visible:ring md:text-base;
            }
        }
    }
}
</style>
