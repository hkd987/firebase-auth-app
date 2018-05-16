<template>
  <div class="box">
    <textarea class="textarea" placeholder="Tell Your Friends How You Feel" v-model="status"></textarea>
    <br>
    <button class="button is-primary" @click.prevent="sendUpdate">Update Friends</button>
  </div>
</template>

<script>
export default {
  name: 'StatusBox',
  props: {},
  data () {
    return {
      status: ''
    }
  },
  methods: {
    sendUpdate () {
      const BLAH = new Date()
      const BLAH_STRING = BLAH.toLocaleString()
      const payload = {
        status: this.status,
        time: BLAH_STRING
      }
      this.$store.dispatch('statusUpdate', payload)
      this.status = ''
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
