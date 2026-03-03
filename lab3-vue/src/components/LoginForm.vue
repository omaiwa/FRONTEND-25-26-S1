<template>
    <form @submit.prevent="handleLogin">
        <div class="mb-3">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" autocomplete="off" />
            <div class="form-text">
                We'll never share your email with anyone else.
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" autocomplete="off" />
        </div>

        <button type="submit" class="btn btn-primary">
            Submit
        </button>
    </form>
</template>

<script setup>
import useAuthStore from "@/stores/auth"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const authStore = useAuthStore()

const email = ref("")
const password = ref("")

const handleLogin = async () => {
    try {
        await authStore.login({
            email: email.value,
            password: password.value
        })

        alert("Login successful!")

        router.push("/")
    } catch (error) {
        console.error(error)
        alert("Login failed")
    }
}
</script>