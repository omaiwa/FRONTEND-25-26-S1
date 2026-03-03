<template>
    <div v-if="property" class="container">
        <img :src="property.img" :alt="property.name" />

        <h2>{{ property.name }}</h2>
        <p>Type: {{ capitalized(property.type) }}</p>
        <p>Location: {{ capitalized(property.location) }}</p>
        <p>{{ property.description }}</p>

        <h3>Price: ${{ property.price }}/month</h3>

        <div v-if="isRented" class="rented-msg">
            You have already rented this property.
        </div>

        <button v-else @click="rent">Rent</button>
        <button @click="chatOpen = true">Open chat</button>

        <ChatModal v-if="chatOpen" :property="property" @close="chatOpen = false" />
    </div>
</template>

<script setup>
import ChatModal from "@/components/Chat.vue"
import useAuthStore from "@/stores/auth"
import usePropertiesStore from "@/stores/properties"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const propertiesStore = usePropertiesStore()
const chatOpen = ref(false)

onMounted(async () => {
    await propertiesStore.loadProperties()
})

const property = computed(() =>
    propertiesStore.properties.find(
        (p) => p.id == route.params.id
    )
)


const rented = ref(JSON.parse(localStorage.getItem("rented")) || [])

const isRented = computed(() =>
    rented.value.some(p => p.id == property.value?.id)
)

function rent() {
    rented.value.push(property.value)
    localStorage.setItem("rented", JSON.stringify(rented.value))

    addRentalToHistory(property.value)

    alert("You have rented this property!")
}

function capitalized(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1)
}

function getCurrentUser() {
    const authStore = useAuthStore()
    return authStore.user?.email || null;
}

function addRentalToHistory(property) {
    const history = JSON.parse(localStorage.getItem("history")) || []

    history.push({
        type: "rent",
        propertyId: property.id,
        propertyName: property.name,
        timestamp: new Date().toISOString(),
        user: getCurrentUser()
    })

    localStorage.setItem("history", JSON.stringify(history))
}
</script>