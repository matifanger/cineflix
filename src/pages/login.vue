<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
    email: 'admin@admin.com',
    password: 'password',
})

const disabled = computed(() => {
    return !form.value.email || !form.value.password
})

const loading = ref(false)

const login = async () => {
    try {
        loading.value = true
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
            const { error } = await res.json()
            console.log(error)
        }
    } catch (error) {
        console.log(error)
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

                    <button :disabled="disabled" type="submit" class="form__submit">Login</button>

                    <div class="form__others">
                        <span class="others__bar"></span>
                        <span class="others__text">Log in with social</span>
                    </div>

                    <button class="form__fb">
                        <svg
                            class="h-5 w-5 shrink-0"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z"
                                fill="white"
                            />
                        </svg>

                        Continue with Facebook
                    </button>

                    <button class="form__google">
                        <svg
                            class="h-5 w-5 shrink-0"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                                fill="#EA4335"
                            />
                        </svg>

                        Continue with Google
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
            &__label {
                @apply mb-2 inline-block text-base text-gray-200 sm:text-lg;
            }
            &__input {
                @apply w-full rounded bg-zinc-900 px-3 py-2 text-gray-200 outline-none ring-indigo-400 transition duration-100 focus:ring;
            }
            &__submit {
                @apply disabled:cursor-not-allowed
                 disabled:bg-gray-400 disabled:border-gray-400 mt-4 flex items-center justify-center 
                 gap-2 rounded-lg border border-gray-300 bg-white px-8 py-2 text-center text-sm
                 font-semibold text-gray-800 outline-none ring-gray-300 transition
                  hover:brightness-90 focus-visible:ring active:bg-gray-200 md:text-base;
            }
            &__others {
                @apply relative flex items-center justify-center mt-5;
                & .others__bar {
                    @apply absolute inset-x-0 h-px bg-gray-300;
                }
                & .others__text {
                    @apply relative bg-zinc-800 bg-opacity-90 backdrop-blur-md px-4 text-sm text-gray-300;
                }
            }
            &__fb {
                @apply flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:grayscale focus-visible:ring active:bg-blue-700 md:text-base;
            }
            &__google {
                @apply flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:grayscale focus-visible:ring active:bg-gray-200 md:text-base;
            }
        }
    }
}
</style>
