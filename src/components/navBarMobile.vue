<template>
  <div class="navbar-menu is-hidden-desktop"
  :class="{ 'is-active': navActive}">
    <div class="navbar-start">
      <div class="navbar-item"
      v-if="user === null"
      @click.prevent="closeNav">
      <router-link
        to="/login"
        class="navbar-link">
        Login
      </router-link>
      </div>

      <div class="navbar-item"
      v-if="user === null"
      @click.prevent="closeNav">
      <router-link
        to="/signup"
        class="navbar-link">
        Sign Up
      </router-link>
      </div>

      <!-- main nav mobile -->
      <div class="navbar-item"
        v-if="user !== null"
        @click.prevent="closeNav">
        <router-link
          to="/profile"
          class="navbar-link">
          Profile
        </router-link>
      </div>

      <div class="navbar-item"
        v-show="user !== null">
        <a
        @click="signout()"
        href="/#/"
        class="navbar-link">
          Sign Out
        </a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['navActive'],
  name: 'NavMobile',
  data () {
    return {

    }
  },
  methods: {
    signout () {
      this.$store.dispatch('logout')
      this.closeNav()
    },
    closeNav () {
      this.$emit('closeNav')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
