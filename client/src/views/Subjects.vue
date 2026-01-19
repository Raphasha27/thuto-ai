<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-black text-slate-900 dark:text-white mb-4">Explore Subjects</h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto">
        Choose a subject to start practicing. All content is aligned with the CAPs curriculum.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="subject in subjects" :key="subject.id" class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-sky-500 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10">
        <div class="h-32 bg-slate-700/50 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-800 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <span class="text-3xl">{{ subject.emoji }}</span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ subject.name }}</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm mb-6">{{ subject.description }}</p>
          
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-700 text-slate-300">
              {{ subject.topics }} Topics
            </span>
            <router-link :to="'/quiz/' + subject.id" class="text-sky-400 hover:text-sky-300 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Start Quiz <span aria-hidden="true">&rarr;</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const subjects = [
  { 
    id: 'math', 
    name: 'Mathematics', 
    emoji: '📐', 
    description: 'Algebra, Geometry, Trigonometry and Calculus.',
    topics: 12
  },
  { 
    id: 'physics', 
    name: 'Physical Sciences', 
    emoji: '⚛️', 
    description: 'Physics and Chemistry concepts for Grade 12.',
    topics: 8
  },
  { 
    id: 'life-sciences', 
    name: 'Life Sciences', 
    emoji: '🧬', 
    description: 'Biology, evolution, and human systems.',
    topics: 10
  },
  { 
    id: 'accounting', 
    name: 'Accounting', 
    emoji: '📊', 
    description: 'Financial accounting, managerial accounting and auditing.',
    topics: 6
  },
  { 
    id: 'geography', 
    name: 'Geography', 
    emoji: '🌍', 
    description: 'Climatology, geomorphology and map work.',
    topics: 9
  },
  { 
    id: 'history', 
    name: 'History', 
    emoji: '📜', 
    description: 'Cold War, South African history and automated world.',
    topics: 7
  }
]
</script>
