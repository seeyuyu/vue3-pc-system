
<script lang="ts">
import { defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { query, params } = route
    router.replace({
      path: '/' + params.path,
      query
    })
    // 手动render了一个template节点
    return () => {
      return h('template')
    }
  }

})
</script>
