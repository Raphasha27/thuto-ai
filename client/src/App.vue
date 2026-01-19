<script setup>
import { RouterView } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans transition-colors duration-300">
    <nav class="border-b border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <span class="text-2xl font-black bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
              THUTO AI
            </span>
            <span class="ml-2 px-2 py-0.5 rounded text-xs bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-700">BETA</span>
          </div>
          <div class="hidden md:flex items-center">
            <div class="ml-10 flex items-baseline space-x-4 mr-4">
              <router-link to="/" class="hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</router-link>
              <router-link to="/dashboard" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</router-link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>
