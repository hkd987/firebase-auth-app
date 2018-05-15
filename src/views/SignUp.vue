<template>
  <div class="container">
    <signUp></signUp>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SignUp from '@/components/signUpWithEmailAndPassword.vue'
export default {
  name: 'SignUpForm',
  components: {
    SignUp
  }
}
</script>
