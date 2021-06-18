<template>
  <div class="navbar">
    <breadcrumb></breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb
  }
  // setup () {}
})
</script>
