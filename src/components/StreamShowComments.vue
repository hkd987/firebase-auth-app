<template>
  <div class="container">
    <p v-if="statusKey === comments.status_key">{{ comments }}</p>
  </div>
</template>

<script>
export default {
  name: 'StreamShowComments',
  props: {
    statusKey: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getComments () {
      this.$store.dispatch('getComments')
    }
  },
  created () {
    this.getComments()
  },
  computed: {
      user () {
        return this.$store.getters.user
      },
      comments () {
        return this.$store.getters.comments
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
