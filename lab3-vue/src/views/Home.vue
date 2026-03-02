<template>
  <div class="container">
    <h2>Search</h2>

    <select v-model="typeFilter">
      <option value="">All types</option>
      <option value="apartment">Apartment</option>
      <option value="house">House</option>
    </select>

    <select v-model="locationFilter">
      <option value="">All locations</option>
      <option value="england">England</option>
      <option value="wales">Wales</option>
      <option value="scotland">Scotland</option>
    </select>

    <input type="number" v-model.number="maxPriceFilter" placeholder="Max price">

    <div class="grid">
      <PropertyCard v-for="item in filteredProperties" :key="item.id" :property="item" />
    </div>
  </div>
</template>

<script setup>
import PropertyCard from "@/components/PropertyCard.vue";
//import { propertiesApi } from "@/api"
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const API_URL = "http://localhost:3000/properties";

const properties = ref([]);
const typeFilter = ref("");
const locationFilter = ref("");
const maxPriceFilter = ref(0);

const loadProperties = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
    });
    properties.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadProperties();
});

const filteredProperties = computed(() => {
  return properties.value.filter((item) => {
    return (
      (typeFilter.value === "" || item.type === typeFilter.value) &&
      (maxPriceFilter.value === 0 || item.price <= maxPriceFilter.value) &&
      (locationFilter.value === "" || item.location === locationFilter.value)
    );
  });
});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>