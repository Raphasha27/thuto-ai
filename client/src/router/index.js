import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Subjects from '../views/Subjects.vue'
import Quiz from '../views/Quiz.vue'
import Leaderboard from '../views/Leaderboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: Subjects
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    }
  ]
})

export default router
