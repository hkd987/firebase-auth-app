<template>
  <div class="section">
    <div class="box">
      <b-field label="Email">
        <b-input type="email" palceholder="Email" maxlength="30" v-model="email"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" placehoder="Password" v-model="password" password-reveal>
        </b-input>
      </b-field>

      <button class="button is-primary" @click="signUpWithEmailAndPassword">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blank',
  props: {},
  date () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUpWithEmailAndPassword () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signInUser', payload)
      this.email = ''
      this.password = ''
      if (this.user !== null) {
        this.$router.push({ path: '/main' })
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    if (this.user !== null) {
      this.$router.push({ path: '/main' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
