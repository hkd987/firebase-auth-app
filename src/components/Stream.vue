<template>
  <div class="container">
    <div class="box" v-for="status in sortedStream">
      <section class="section">
        <b-message type="is-primary">
          <div class="box">
            <p class="is-size-6">{{ status.status_user.user_email }} on {{ status.status_time_string }}</p>
          </div>
          <p class="is-size-3">{{ status.status_text }}</p>
        </b-message>
        <button class="button is-pulled-right is-primary">Comment</button>
      </section>
    </div>
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
        if (a.status_time_stamp >= b.status_time_stamp) {
          return true
        }
      })
      return temp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
