<template>
  <div class="container">
    <button v-if="!commentClicked" class="button is-pulled-right is-primary is-small" @click.prevent="flipClicked">Add Comment</button>
    <button v-if="commentClicked" class="button is-pulled-right is-primary is-small" @click.prevent="flipClicked">Cancel</button>
    <div class="section" v-if="commentClicked">
      <textarea class="textarea" placeholder="Let Your Friends Know!!!" v-model="comment"></textarea>
      <br>
      <button class="button is-primary is-small" @click.prevent="sendComment">Comment</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StreamComment',
  props: {
    statusKey: {
      type: String
    }
  },
  data () {
    return {
      commentClicked: false,
      comment: ''
    }
  },
  methods: {
    flipClicked () {
      this.commentClicked = !this.commentClicked
    },
    sendComment () {
      const BLAH = new Date()
      const BLAH_STRING = BLAH.toLocaleString()
      const payload = {
        comment_comment: this.comment,
        comment_time: BLAH_STRING,
        comment_user: {
          comment_user_email: this.user.email,
          comment_user_id: this.user.id
        },
        comment_status_key: this.statusKey
      }
      this.$parent.$emit('addComment', payload)
      this.comment = ''
      this.flipClicked()
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
