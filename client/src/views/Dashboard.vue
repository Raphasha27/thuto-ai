<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Dumela, <span class="text-indigo-600 dark:text-sky-400">Student</span></h1>
      <p class="text-slate-600 dark:text-slate-400 mt-2">Grade 12 • Gauteng • English</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div v-for="stat in stats" :key="stat.name" class="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg border border-slate-200 dark:border-slate-700">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <component :is="stat.icon" class="h-6 w-6 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{{ stat.name }}</dt>
                <dd>
                  <div class="text-lg font-medium text-slate-900 dark:text-white">{{ stat.value }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Subjects / Progress -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">Subject Mastery</h2>
          <div class="space-y-4">
            <div v-for="subject in subjects" :key="subject.name" class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <div class="flex justify-between items-end mb-2">
                <span class="font-medium text-lg text-slate-900 dark:text-white">{{ subject.name }}</span>
                <span class="text-indigo-600 dark:text-indigo-400 font-bold">{{ subject.progress }}%</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div class="bg-gradient-to-r from-indigo-500 to-sky-500 h-2.5 rounded-full" :style="{ width: subject.progress + '%' }"></div>
              </div>
              <div class="mt-3 flex justify-end">
                <router-link :to="'/quiz/' + subject.name.toLowerCase().replace(' ', '-') " class="text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 px-3 py-1 rounded text-slate-700 dark:text-white transition-colors">
                  Take Quiz
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">Recommended for You</h2>
          <div class="grid gap-4">
            <router-link to="/quiz/math" class="block border border-slate-200 dark:border-slate-600 rounded p-4 hover:border-sky-500 cursor-pointer transition-colors group">
              <h3 class="font-bold text-indigo-600 dark:text-sky-400 group-hover:text-indigo-500 dark:group-hover:text-sky-300">Euclidean Geometry</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Mathematics • Grade 12</p>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Based on your recent quiz results</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Leaderboard Sidebar -->
      <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 h-fit shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Top Learners</h2>
          <span class="text-xs bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 px-2 py-1 rounded">Gauteng</span>
        </div>
        <div class="space-y-4">
          <div v-for="(user, index) in leaderboard" :key="user.id" class="flex items-center space-x-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <span class="font-bold w-6 text-slate-500">#{{ index + 1 }}</span>
            <div class="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
              {{ user.initials }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-900 dark:text-white">{{ user.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ user.points }} pts</p>
            </div>
          </div>
        </div>
        <router-link to="/leaderboard" class="block w-full text-center mt-6 py-2 border border-slate-200 dark:border-slate-600 rounded text-sm text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          View Full Leaderboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  UsersIcon, 
  AcademicCapIcon, 
  FireIcon, 
  TrophyIcon 
} from '@heroicons/vue/24/outline'

const stats = [
  { name: 'Global Rank', value: '#1,204', icon: TrophyIcon },
  { name: 'Study Streak', value: '5 Days', icon: FireIcon },
  { name: 'Quizzes Taken', value: '42', icon: AcademicCapIcon },
  { name: 'Points', value: '12,450', icon: UsersIcon },
]

const subjects = [
  { name: 'Mathematics', progress: 65 },
  { name: 'Physical Sciences', progress: 42 },
  { name: 'Life Sciences', progress: 88 },
]

const leaderboard = [
  { id: 1, name: 'Thabo M.', initials: 'TM', points: 15400 },
  { id: 2, name: 'Lerato K.', initials: 'LK', points: 14200 },
  { id: 3, name: 'Sipho Z.', initials: 'SZ', points: 13800 },
  { id: 4, name: 'Kevin P.', initials: 'KP', points: 12100 },
  { id: 5, name: 'Zandile N.', initials: 'ZN', points: 11550 },
]
</script>
