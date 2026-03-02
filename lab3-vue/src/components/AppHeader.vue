<template>
  <header class="header">
    <router-link to="/" class="logo">Rentussy</router-link>

    <div class="navbar">
      <svg class="icon" @click="toggleTheme">
        <use :xlink:href="iconHref"></use>
      </svg>

      <template v-if="isLoggedIn">
        <router-link to="/profile" class="profile-icon">
          Profile
        </router-link>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const isLoggedIn = ref(!!localStorage.getItem("accessToken"))
const darkTheme = ref(localStorage.getItem("darkTheme") === "true")

onMounted(() => {
  if (darkTheme.value) {
    document.body.classList.add("dark-theme")
  }
})

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value
  document.body.classList.toggle("dark-theme")
  localStorage.setItem("darkTheme", darkTheme.value)
}

const iconHref = computed(() =>
  darkTheme.value
    ? "/sprite.svg#sun"
    : "/sprite.svg#moon"
)
</script>