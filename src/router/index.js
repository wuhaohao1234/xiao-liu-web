import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Calendar from '../views/Calendar.vue'

const router = createRouter({
  history: createWebHashHistory('/xiao-liu-web/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    }
  ]
})

export default router 