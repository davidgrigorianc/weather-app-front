<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6 text-center success-card" elevation="10">
      <v-icon color="green" size="64" class="mb-3">mdi-check-circle</v-icon>

      <h1 class="text-h4 font-weight-bold">Payment Successful!</h1>

      <p class="text-body-1 mt-2">
        Thank you for your purchase.<br>
        Your payment for the tariff has been successfully processed.
      </p>

      <v-divider class="my-4" />

      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card outlined class="pa-4">
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Tariff:</v-list-item-title>
                <v-list-item-subtitle>{{ tariffKey }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="font-weight-bold">Transaction ID:</v-list-item-title>
                <v-list-item-subtitle>{{ transactionId }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="font-weight-bold">Amount Paid:</v-list-item-title>
                <v-list-item-subtitle>${{ amount }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-btn class="mt-4" color="primary" @click="router.push('/search')">
        Go to Search
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tariffKey = ref('')
const transactionId = ref('')
const amount = ref('')

onMounted(() => {
  tariffKey.value = route.query.tariff_key || 'N/A'
  transactionId.value = route.query.session_id || 'Unknown'
  amount.value = route.query.amount || '0.00'
})
</script>

<style scoped>
.success-card {
  max-width: 600px;
  border-radius: 16px;
}
</style>
