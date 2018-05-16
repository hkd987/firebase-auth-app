<template>
  <div class="container">
    <div class="box" v-for="status in sortedStream">
    <section class="section">
      <b-message type="is-primary">
        {{ status.status_text }}
      </b-message>
    </section>
  </div>
    <!--<p v-for="status in sortedStream">{{ status.status_text }}</p>-->
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
    },
    sortedStream () {
      const temp = []
      const stream = this.stream
      for (const item in stream) {
        temp.push(stream[item])
      }
      temp.sort((a, b) => {
        return a.status_time_stamp > b.status_time_stamp
      })
      return temp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
