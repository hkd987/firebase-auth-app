<template>
  <div class="container">
    <div class="box" v-for="(status, key, index) in sortedStream" :key="index">
      <article class="media">
      <section class="section">
        <b-message type="is-primary">
          <div class="box">
            <p class="is-size-6">{{ status.items.status_user.user_email }} on {{ status.items.status_time_string }}</p>
          </div>
          <p class="is-size-3" v-if="user.email !== status.items.status_user.user_email">{{ status.items.status_text }}</p>
          <p class="is-size-3" v-if="user.email === status.items.status_user.user_email">{{ status.items.status_text }}</p>
          <br />
          <!-- WORKING ON VOTING FUNCTION
          <div class="box">
            <VoteButton :statusKey="status.key"/>
          </div> -->
        </b-message>
        <StreamShowComments :statusKey="status.key"/>
        <br/>
        <StreamComment :statusKey="status.key" />
      </section>
    </article>
    </div>
  </div>
</template>

<script>
import StreamComment from '@/components/StreamComment.vue'
import StreamShowComments from '@/components/StreamShowComments.vue'
import VoteButton from '@/components/VoteButton.vue'
export default {
  name: 'Stream',
  components: {
    StreamComment,
    StreamShowComments,
    VoteButton
  },
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
  mounted () {
    this.$on('addComment', (payload) => {
      this.$store.dispatch('addComment', payload)
    })
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
        temp.push({ items: stream[item], key: item })
      }
      temp.sort((a, b) => {
        if (a.items.status_time_stamp >= b.items.status_time_stamp) {
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
