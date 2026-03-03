import { propertiesApi } from '@/api'
import { defineStore } from 'pinia'

const usePropertiesStore = defineStore('properties', {
    state: () => ({
        properties: [],
        loaded: false
    }),

    actions: {
        async loadProperties() {
            if (this.loaded) return

            const response = await propertiesApi.getAll()

            this.properties = response.data
            this.loaded = true

            return response
        }
    },

    persist: true
})

export default usePropertiesStore