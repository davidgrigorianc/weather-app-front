<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>My Weather App</v-toolbar-title>

      <v-spacer />

      <template v-if="isAuthenticated">
        <v-btn text>Welcome, {{ userName}}</v-btn>
        <v-btn text @click="auth.logout">Logout</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const isAuthenticated = computed(() => !!auth.user)
const userName = computed(() => auth.user?.name ?? '')

onMounted(async () => {
  if (!auth.user && localStorage.getItem('token')) {
    await auth.fetchUser()
  }
})
</script>
