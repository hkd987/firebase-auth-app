<template>
  <div class="container">
    <StatusBox></StatusBox>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import StatusBox from '@/components/StatusBox.vue'
export default {
  name: 'Main',
  components: {
    StatusBox
  }
}
</script>
