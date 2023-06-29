import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
    state: () => ({
        isLogged: ref(false),
        email: ref<string>(''),
    }),
    actions: {
        // Set the user login and email status
        setStatus(status: boolean, email: string): void {
            this.isLogged = status
            this.email = email
        },
        // Check if the user has cookies and then set the status
        handleCookie(): void {
            const token = useCookie('token')
            if (token.value?.length) {
                this.setStatus(true, token.value)
            } else {
                this.setStatus(false, '')
            }
        },
        // Log the user out and remove the cookie
        logOut(): void {
            const token = useCookie('token')
            token.value = null
            this.setStatus(false, '')
        },
    },
})
