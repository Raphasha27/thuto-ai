<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Provincial Leaderboard</h1>
      <div class="flex gap-2">
        <select class="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded focus:ring-sky-500 focus:border-sky-500 text-sm shadow-sm">
          <option>Gauteng</option>
          <option>Western Cape</option>
          <option>KwaZulu-Natal</option>
        </select>
        <select class="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded focus:ring-sky-500 focus:border-sky-500 text-sm shadow-sm">
          <option>All Time</option>
          <option>This Month</option>
          <option>This Week</option>
        </select>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
      <table class="w-full text-left">
        <thead class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase font-semibold">
          <tr>
            <th class="px-6 py-4">Rank</th>
            <th class="px-6 py-4">Student</th>
            <th class="px-6 py-4">Province</th>
            <th class="px-6 py-4 text-right">Points</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
          <tr v-for="(user, index) in users" :key="user.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
            <td class="px-6 py-4">
              <div v-if="index < 3" class="w-8 h-8 flex items-center justify-center rounded-full" 
                :class="{
                  'bg-yellow-500/20 text-yellow-500': index === 0,
                  'bg-slate-400/20 text-slate-400': index === 1,
                  'bg-amber-700/20 text-amber-700': index === 2
                }">
                <span class="text-lg">{{ ['🥇', '🥈', '🥉'][index] }}</span>
              </div>
              <span v-else class="text-slate-500 font-mono w-8 text-center block">{{ index + 1 }}</span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                  {{ user.initials }}
                </div>
                <div>
                  <div class="font-medium text-slate-900 dark:text-white">{{ user.name }}</div>
                  <div class="text-xs text-slate-500">{{ user.school }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                {{ user.province }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <span class="font-mono font-bold text-indigo-600 dark:text-sky-400">{{ user.points.toLocaleString() }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const users = [
  { id: 1, name: 'Thabo Mokoena', initials: 'TM', school: 'Parktown Boys', province: 'Gauteng', points: 15400 },
  { id: 2, name: 'Lerato Kgosi', initials: 'LK', school: 'Westerford High', province: 'Western Cape', points: 14200 },
  { id: 3, name: 'Sipho Zulu', initials: 'SZ', school: 'Durban High', province: 'KZN', points: 13800 },
  { id: 4, name: 'Kevin Peterson', initials: 'KP', school: 'Jeppe Boys', province: 'Gauteng', points: 12100 },
  { id: 5, name: 'Zandile Ndlovu', initials: 'ZN', school: 'Mary Waters', province: 'Eastern Cape', points: 11550 },
  { id: 6, name: 'Michael Ross', initials: 'MR', school: 'Grey College', province: 'Free State', points: 10900 },
  { id: 7, name: 'Amanda Smit', initials: 'AS', school: 'Affies Meisies', province: 'Gauteng', points: 10200 },
  { id: 8, name: 'Noluthando Xaba', initials: 'NX', school: 'Inanda Seminary', province: 'KZN', points: 9850 },
]
</script>
