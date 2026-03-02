<template>
  <div class="card">
    <h3>{{ property.name }}</h3>
    <p>Type: {{ capitalize(property.type) }}</p>
    <p>Location: {{ capitalize(property.location) }}</p>
    <p>Price: ${{ property.price }}/month</p>
    <img :src="property.img" :alt="property.name" />
    <router-link class="button" :to="`/property/${property.id}`">
      View Property
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)
</script>