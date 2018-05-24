<template>
  <div class="container">
    <div class="box" v-for="(item, key, index) in comments" :key="index" v-if="statusKey === item.status_key">
      <p class="is-small">{{ item.comment_comment }}</p>
    </div>
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
