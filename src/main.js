import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import { initApp } from './config/keys.js'
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    firebase.initializeApp(initApp)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
