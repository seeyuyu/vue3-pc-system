<template>
  <div>
    <h1>
      Documentation page
    </h1>
     测试缓存 <input/>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>
    <svg-icon icon-class="404" class-name="custom-class"></svg-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Documentation'
  // setup () {

  // }
})
</script>
