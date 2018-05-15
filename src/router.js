import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Main from './views/Main.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import store from './store.js'
Vue.use(Router)

const PROTECTED = (to, from, next) => {
  if (store.getters.user !== null) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      beforeEnter: PROTECTED
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: PROTECTED
    }
  ]
})
