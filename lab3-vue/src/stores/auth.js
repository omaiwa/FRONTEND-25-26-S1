import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem("accessToken"))

    const setToken = (newToken) => {
        token.value = newToken
        localStorage.setItem("accessToken", newToken)
    }

    const logout = () => {
        token.value = null
        localStorage.removeItem("accessToken")
    }

    return { token, setToken, logout }
})