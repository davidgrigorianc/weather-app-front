<template>
  <v-card outlined class="pa-4" style="min-width: 600px" >
    <h2 class="text-h6 font-weight-bold mb-3">Try Weather Search</h2>
    <template v-if="remaining_requests > 0">
      <v-alert type="success" border="start" class="mb-4">
        <p class="text-h6 font-weight-medium">
          You have {{ remaining_requests }} remaining request<span v-if="remaining_requests > 1">s</span>.
        </p>
      </v-alert>
    </template>

    <template v-else>
      <v-alert type="warning" border="start" class="mb-4">
        <p class="text-h6 font-weight-medium mb-2">
          You don't have any available requests.
        </p>
        <p>
          Please purchase a plan to continue using the weather search.
          <br />
          If you already bought one, it might not be confirmed yet — please wait a moment and try again.
        </p>
      </v-alert>

      <v-btn
        color="primary"
        variant="flat"
        block
        @click="goToHome"
      >
        Go to Pricing
      </v-btn>
    </template>

   <div v-if="remaining_requests">
     <CitiesAutocomplete v-model="selectedCity" />

     <v-btn color="primary" class="mt-3" :loading="loading" @click="searchWeather">
       Search
     </v-btn>
     <v-snackbar
       color="red-darken-2"
       timeout="6000"
       v-model="errorMessage"
     >
       {{ errorMessage }}

       <template v-slot:actions>
         <v-btn
           color="blue"
           variant="text"
           @click="errorMessage = false"
         >
           Close
         </v-btn>
       </template>
     </v-snackbar>
     <div v-if="weather && !loading" class="mt-4 text-left">
       <h3 class="text-subtitle-1">Weather in {{ weather.name }}:</h3>
       <WeatherDisplay :weather="weather" />
     </div>
   </div>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import CitiesAutocomplete from '@/components/CitiesAutocomplete.vue'
import { doWeatherSearch } from '@/api/weather.js'
import WeatherDisplay from '@/components/WeatherDisplay.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const selectedCity = ref('')
const weather = ref(null)
const errorMessage = ref(false)
const loading = ref(false)

const remaining_requests = computed(() => auth.user?.remaining_requests ?? 0)

const searchWeather = async () => {
  if (!selectedCity.value) return

  try {
    loading.value = true
    const data = { city: selectedCity.value }
    weather.value = await doWeatherSearch(data)
    errorMessage.value = null
    await auth.fetchUser()
  } catch (e) {
    weather.value = null
    errorMessage.value =  e.response?.data?.error || 'Failed To fetch weather'
  } finally {
    loading.value = false
  }
}

const goToHome = () => {
  router.push({ name: 'home' })
}
</script>
