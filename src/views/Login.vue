<template>
  <div>
    <LoginIn></LoginIn>
  </div>
</template>

<script>
import LoginIn from '@/components/signInWithEmailAndPassword.vue'
export default {
  name: 'LoginForm',
  components: {
    LoginIn
  }
}
</script>
