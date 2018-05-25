<template>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-dark" @click.prevent="sendUpVote">Up Vote</span>
          <span class="tag is-primary">0</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-dark" @click.prevent="sendDownVote">Down Vote</span>
          <span class="tag is-primary">0</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'UpVoteButton',
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
    sendUpVote () {
      const payload = {
        status_key: this.statusKey,
        like_user: {
          user_email: this.user.email,
          user_uid: this.user.id
        },
        like_up: 1
      }
      // console.log(payload)
    },
    sendDownVote () {
      const payload = {
        status_key: this.statusKey,
        like_user: {
          user_email: this.user.email,
          user_uid: this.user.id
        },
        like_up: -1
      }
      // console.log(payload)
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
