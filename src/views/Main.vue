<template>
  <div class="container">
    <StatusBox></StatusBox>
    <Stream></Stream>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import StatusBox from '@/components/StatusBox.vue'
import Stream from '@/components/Stream.vue'
export default {
  name: 'Main',
  components: {
    StatusBox,
    Stream
  }
}
</script>
