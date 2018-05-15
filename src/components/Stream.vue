<template>
  <div>
    <p v-for="status in stream">{{ status.status_text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Stream',
  props: {},
  data () {
    return {

    }
  },
  methods: {
    getStream () {
      this.$store.dispatch('getStream')
    }
  },
  created () {
    this.getStream()
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    stream () {
      return this.$store.getters.stream
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
