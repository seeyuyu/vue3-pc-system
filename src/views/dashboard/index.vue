<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>

  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard',
  setup () {
    const sayHi = () => {
      // alert('sayhi')
    }
    return sayHi
  }
})
</script>
<style lang ="scss">
  .custom-class {
    font-size: 200px;
    color:green
  }
</style>
