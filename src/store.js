import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoading: false,
    errorMsg: '',
    showError: false
  },
  getter: {
    user: state => state.user,
    isLoading: state => state.isLoading,
    errorMsg: state => state.errorMsg,
    showError: state => state.showError
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    isLoading (state) {
      state.isLoading = !state.isLoading
    },
    error (state, payload) {
      if (payload.error === true) state.errorMsg = payload.msg
      if (payload === false) state.errorMsg = ''
      state.showError = !state.showError
    }
  },
  actions: {
    signUserUp ({ commit }, { email, password }) {
      commit('isLoading')
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit('isLoading')
          commit('setUser', {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          })
        })
        .catch(err => {
          commit('isLoading')
          commit('error', err)
          console.log(err)
        })
    },
    autoSignIn ({ commit }, { uid, displayName, email, photoURL }) {
      commit('setUser', {
        id: uid,
        name: displayName,
        email: email,
        photoUrl: photoURL
      })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    isLoading ({ commit }) {
      commit('isLoading')
    },
    closeError ({ commit }, payload) {
      commit('error', payload)
    }
  }
})