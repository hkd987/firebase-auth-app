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
    stream: null,
    comments: null
  },
  getters: {
    user: state => state.user,
    isLoading: state => state.isLoading,
    errorMsg: state => state.errorMsg,
    showError: state => state.showError,
    stream: state => state.stream,
    comments: state => state.comments
  },
  mutations: {
    getStream (state, payload) {
      state.stream = payload
    },
    getComments (state, payload) {
      state.comments = payload
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
    getComments ({ commit }) {
      commit('isLoading')
      const COMMENTS = firebase.database().ref(`all_comments/`)
      COMMENTS.orderByKey().on('value', (snapshot) => {
        const data = snapshot.val()
        commit('getComments', data)
      })
      commit('isLoading')
    },
    addComment ({ commit }, payload) {
      commit('isLoading')
      const PATH = firebase.database().ref(`all_comments`)
      const PATH_KEY = PATH.push({
        status_key: payload.comment_status_key,
        comment_comment: payload.comment_comment,
        comment_time_string: payload.comment_time,
        comment_user: {
          comment_user_email: payload.comment_user.comment_user_email,
          comment_user_id: payload.comment_user.comment_user_id
        },
        comment_time_stamp: firebase.database.ServerValue.TIMESTAMP
      }).getKey()
      const UPDATE_TIME = PATH.child(`${PATH_KEY}/comment_time_stamp`)
      UPDATE_TIME.once('value', (snapshot) => {
        const newStamp = parseInt(snapshot.val() * -1)
        UPDATE_TIME.set(newStamp)
      })
      commit('isLoading')
    },
    getStream ({ commit }) {
      commit('isLoading')
      const STREAM = firebase.database().ref(`all_statues/`)
      STREAM.orderByKey().on('value', (snapshot) => {
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
