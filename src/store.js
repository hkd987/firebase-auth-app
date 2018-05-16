import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoading: false,
    errorMsg: '',
    showError: false,
    stream: null
  },
  getters: {
    user: state => state.user,
    isLoading: state => state.isLoading,
    errorMsg: state => state.errorMsg,
    showError: state => state.showError,
    stream: state => state.stream
  },
  mutations: {
    getStream (state, payload) {
      state.stream = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    isLoading (state) {
      state.isLoading = !state.isLoading
    },
    error (state, payload) {
      if (payload) state.errorMsg = payload.message
      if (!payload) state.errorMsg = ''
      state.showError = !state.showError
    }
  },
  actions: {
    getStream ({ commit }) {
      commit('isLoading')
      // const d = new Date()
      const STREAM = firebase.database().ref(`all_statues`)
      STREAM.orderByChild('status_time_stamp').on('value', (snapshot) => {
        console.log(snapshot)
        const data = snapshot.val()
        commit('getStream', data)
      })
      commit('isLoading')
    },
    statusUpdate ({ commit }, payload) {
      commit('isLoading')
      const PATH = firebase.database().ref(`all_statues`)
      const PATH_KEY = PATH.push({
        status_user: {
          user_id: this.getters.user.id,
          user_email: this.getters.user.email
        },
        status_text: payload.status,
        status_time_string: payload.time,
        status_time_stamp: firebase.database.ServerValue.TIMESTAMP
      }).getKey()
      const UPDATE_TIME = PATH.child(`${PATH_KEY}/status_time_stamp`)
      UPDATE_TIME.once('value', (snapshot) => {
        const newStamp = parseInt(snapshot.val() * -1)
        UPDATE_TIME.set(newStamp)
      })
      commit('isLoading')
    },
    signInUser ({ commit }, { email, password }) {
      commit('isLoading')
      firebase.auth().signInWithEmailAndPassword(email, password)
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
        })
    },
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
