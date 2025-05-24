<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="formRef" v-model="isValid">
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                required
              />
              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                :rules="[rules.required]"
                required
              />
              <v-btn
                :disabled="!isValid || loading"
                type="submit"
                color="primary"
                block
                class="mt-4"
              >
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="20"
                  color="white"
                  class="mr-2"
                />
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
              variant="outlined"
              border="start"
              prominent
            >
              {{ error }}
            </v-alert>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const isValid = ref(false)
const formRef = ref(null)
const loading = ref(false)
const error = ref('')

const rules = {
  required: value => !!value || 'Required.',
  email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.'
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await auth.login(form.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.error || 'Login failed'
  } finally {
    loading.value = false
  }
}

</script>
