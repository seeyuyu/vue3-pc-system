<template>
  <div>
    <h1>Dashboard page</h1>
    测试缓存 <input />
    <svg-icon icon-class="bug"></svg-icon>
    <!-- <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>
    <svg-icon icon-class="404" class-name="custom-class"></svg-icon> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'Dashboard',
  setup () {
    // const { proxy } = getCurrentInstance()!
    const proxy = getCurrentInstance()?.proxy
    const sayHi = () => {
      alert('sayhi')
      proxy?.$message.success('success')
    }
    return { sayHi }
  }
})
</script>
<style lang="scss">
.custom-class {
  font-size: 200px;
  color: green;
}
</style>
