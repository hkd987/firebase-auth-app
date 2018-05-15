<template>
  <div id="app" class="container">

      <navBar/>

      <div class="container">
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :canCancel="false"></b-loading>
        <div class="section" v-if="showError">
          <b-notification type="is-danger" :active.sync="showError" v-if="showError" has-icon>
            <p>{{ this.errorMsg }}</p>
          </b-notification>
        </div>

        <router-view/>

      </div>
    </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
export default {
  name: 'App',
  components: {
    navBar
  },
  data () {
    return {
      isFullPage: true
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    showError: {
      get: function () {
        return this.$store.getters.showError
      },
      set: function (newValue) {
        this.$store.dispatch('closeError', newValue)
      }
    },
    errorMsg () {
      return this.$store.getters.errorMsg
    }
  },
  methods: {}
}
</script>

<style lang="scss">

</style>
