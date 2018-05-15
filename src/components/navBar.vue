<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a v-if="user === null" class="navbar-item is-size-5" href="/#/">
        Fire Friends
      </a>
      <a v-if="user !== null" class="navbar-item is-size-5" href="/#/main">
        Fire Friends
      </a>

      <a role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      :class="{ 'is-active': navActive}"
      @click.prevent="navActiveToggle">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <NavMobile :navActive="navActive" v-on:closeNav="closeNav()"></NavMobile>
  </nav>
</template>

<script>
import NavMobile from '@/components/navBarMobile.vue'
export default {
  name: 'navBar',
  props: {
  },
  components: {
    NavMobile
  },
  data () {
    return {
      navActive: false
    }
  },
  methods: {
    navActiveToggle () {
      this.navActive = !this.navActive
    },
    closeNav () {
      this.navActiveToggle()
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
<style scoped lang="scss">

</style>
