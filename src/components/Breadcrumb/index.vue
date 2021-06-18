<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <!-- 面包屑导航最后一个是不可点击的，最后一个是当前显示的路由 -->
      <span v-if="index == levelList.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }} </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import {
  useRoute,
  useRouter,
  RouteLocationMatched,
  RouteLocationRaw
} from 'vue-router'
import { compile } from 'path-to-regexp'

type PartialRouteLocationMatched = Partial<RouteLocationMatched>;

export default defineComponent({
  name: 'Breadcrumb',
  setup () {
    const route = useRoute() // 相当于 this.$route对象
    const router = useRouter() // 相当于 this.$router对象
    // 导航列表，存放matched里筛选的路由记录
    const levelList = ref<Array<PartialRouteLocationMatched>>([])

    // 判断是否为dashboard的路由
    const isDashboard = (route?: PartialRouteLocationMatched) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        (name as string).trim().toLocaleLowerCase() ===
        'Dashboard'.toLocaleLowerCase()
      )
    }
    const getBreadcrumb = () => {
      // 对匹配的路由进行过滤，过滤掉没有title属性的路由，没有title就无法作为面包屑导航
      let matched = route.matched.filter(
        item => item.meta && item.meta.title
      ) as PartialRouteLocationMatched[]
      // 获取第一个匹配的路由记录
      const first = matched[0]

      if (!isDashboard(first)) {
        matched = ([
          {
            path: '/dashboard',
            meta: {
              title: 'Dashboard'
            }
          }
        ] as PartialRouteLocationMatched[]).concat(matched)
      }
      levelList.value = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }

    onBeforeMount(() => {
      getBreadcrumb()
    })
    watch(
      () => route.path,
      () => {
        getBreadcrumb()
      }
    )

    // 针对动态路由 /user/:id 动态参数填充
    const pathCompile = (path: string) => {
      const toPath = compile(path)
      const params = route.params
      return toPath(params)
    }
    // 点击面包屑导航可以跳转
    const handleLink = (route: RouteLocationMatched) => {
      const { path, redirect } = route
      // 如果是重定向路由，就走重定向路由
      if (redirect) {
        router.push(redirect as RouteLocationRaw)
        return
      }
      router.push(pathCompile(path))
    }

    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb .el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect{
  color: #97a8be;
  cursor: text;
}

</style>
<style lang="scss">
  .breadcrumb-enter-active,
  .breadcrumb-leave-active{
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
  .breadcrumb-move {
    transition: all .5s;
  }
</style>
