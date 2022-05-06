import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'denglu',
      component: login
    },
    {
      path: '/register',
      name: 'zhuce',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
