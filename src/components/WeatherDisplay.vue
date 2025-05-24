<template>
  <v-card class="pa-6" max-width="500" elevation="8">
    <v-row align="center" justify="space-between" class="mb-4">
      <div>
        <h2 class="text-h4 font-weight-bold">{{ weather.name }}, {{ weather.sys.country }}</h2>
        <div class="text-subtitle-1 text--secondary">
          {{  capitalize(weather.weather[0].description) }}
        </div>
      </div>
      <v-icon size="64" :title="weather.weather[0].main" color="primary">
        {{ weatherIcon }}
      </v-icon>
    </v-row>

    <v-divider class="my-4"></v-divider>

    <v-row justify="space-around" class="mb-4">
      <div class="text-center">
        <div class="text-h3 font-weight-bold">{{ weather.main.temp.toFixed(1) }}°C</div>
        <div class="text-caption text--secondary">Temperature</div>
      </div>

      <div class="text-center">
        <div class="text-h6 font-weight-bold">{{ weather.main.feels_like.toFixed(1) }}°C</div>
        <div class="text-caption text--secondary">Feels Like</div>
      </div>

      <div class="text-center">
        <div class="text-h6 font-weight-bold">{{ weather.main.humidity }}%</div>
        <div class="text-caption text--secondary">Humidity</div>
      </div>
    </v-row>

    <v-row justify="space-around" class="mb-4">
      <div class="text-center">
        <div class="text-h6 font-weight-bold">{{ weather.wind.speed.toFixed(1) }} m/s</div>
        <div class="text-caption text--secondary">Wind Speed</div>
      </div>

      <div class="text-center">
        <div class="text-h6 font-weight-bold">{{ weather.wind.deg }}°</div>
        <div class="text-caption text--secondary">Wind Direction</div>
      </div>

      <div class="text-center">
        <div class="text-h6 font-weight-bold">{{ weather.clouds.all }}%</div>
        <div class="text-caption text--secondary">Cloudiness</div>
      </div>
    </v-row>

    <v-divider class="my-4"></v-divider>

    <v-row justify="space-around" class="text-center">
      <div>
        <div class="font-weight-bold">Pressure</div>
        <div class="text-caption">{{ weather.main.pressure }} hPa</div>
      </div>

      <div>
        <div class="font-weight-bold">Visibility</div>
        <div class="text-caption">{{ (weather.visibility / 1000).toFixed(1) }} km</div>
      </div>

      <div>
        <div class="font-weight-bold">Sunrise</div>
        <div class="text-caption">{{ formatTime(weather.sys.sunrise, weather.timezone) }}</div>
      </div>

      <div>
        <div class="font-weight-bold">Sunset</div>
        <div class="text-caption">{{ formatTime(weather.sys.sunset, weather.timezone) }}</div>
      </div>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const formatTime = (unixTimestamp, timezoneOffset) => {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const weatherIcon = computed(() => {
  const main = props.weather.weather[0].main.toLowerCase()
  switch (main) {
    case 'clear':
      return 'mdi-weather-sunny'
    case 'clouds':
      return 'mdi-weather-partly-cloudy'
    case 'rain':
      return 'mdi-weather-rainy'
    case 'snow':
      return 'mdi-weather-snowy'
    case 'thunderstorm':
      return 'mdi-weather-lightning'
    case 'drizzle':
      return 'mdi-weather-hail'
    case 'mist':
    case 'fog':
    case 'haze':
      return 'mdi-weather-fog'
    default:
      return 'mdi-weather-cloudy'
  }
})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
