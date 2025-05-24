<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-4">Choose a Weather Package</h1>
        <p class="text-subtitle-1 text-grey-darken-1">Buy credits to get accurate weather forecasts anytime you need them.</p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-6" align="stretch">
      <v-col
        v-for="tariff in tariffs"
        :key="tariff.key"
        cols="12"
        sm="6"
        md="4"
        class="d-flex"
      >
        <v-card class="flex-grow-1 elevation-3">
          <v-card-title class="text-h6 font-weight-bold text-center">
            ${{ tariff.price }} Package
          </v-card-title>

          <v-card-text class="text-center">
            <v-icon color="primary" size="36">mdi-weather-partly-cloudy</v-icon>
            <div class="my-2">
              <span class="text-subtitle-1">
                Includes <b>{{ tariff.count }}</b> forecasts
              </span>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              variant="elevated"
              :loading="loading && activeTariffId === tariff.id"
              @click="handleCheckout(tariff.id)"
            >
              Buy Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

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
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { doPaymentCheckout } from '@/api/payment'

const loading = ref(false)
const errorMessage = ref(false)
const activeTariffId = ref(null)

const tariffs = ref([
  { id: 1, key: 'tariff_25', price: 25, count: 10 },
  { id: 2, key: 'tariff_50', price: 50, count: 30 },
  { id: 3, key: 'tariff_100', price: 100, count: 100 }
])

const handleCheckout = async (id) => {
  loading.value = true
  activeTariffId.value = id
  errorMessage.value = false

  try {
    const data = await doPaymentCheckout({ tariff_id: id })
    window.location.href = data.url
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ?? 'Checkout failed. Please try again.'
  } finally {
    loading.value = false
    activeTariffId.value = null
  }
}

</script>
