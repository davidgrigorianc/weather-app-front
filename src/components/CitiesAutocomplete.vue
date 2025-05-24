<template>
  <v-autocomplete
    v-model="model"
    :items="suggestions"
    :loading="loading"
    class="autocomplete"
    clearable
    no-filter
    v-model:search-input="search"
    item-title="display"
    item-value="display"
    label="Enter a city"
    @update:search="onSearchUpdate"
  />
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import { getCities } from '@/api/api-ninjas.js'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)
const search = ref(props.modelValue || '')
const suggestions = ref([])
const loading = ref(false)

let debounceTimer = null

watch(model, (val) => {
  emit('update:modelValue', val)
})

const fetchCities = async (query) => {
  if (!query || query.length < 2) {
    suggestions.value = []
    return
  }

  loading.value = true
  try {
    suggestions.value = await getCities(query)
  } catch (error) {
    console.error('API Ninjas error:', error)
    suggestions.value = []
  } finally {
    loading.value = false
  }
}

const onSearchUpdate = (query) => {
  if (model.value === query) return
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    fetchCities(query)
  }, 300)
}
</script>
