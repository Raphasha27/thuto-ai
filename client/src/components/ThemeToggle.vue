<template>
  <button @click="toggleTheme" class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200 transition-colors" title="Toggle Theme">
    <sun-icon v-if="isDark" class="w-5 h-5" />
    <moon-icon v-else class="w-5 h-5" />
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    isDark.value = true
  } else {
    isDark.value = false
  }
  updateTheme()
})
</script>
