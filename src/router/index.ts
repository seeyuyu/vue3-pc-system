import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
        meta: {
          title: 'Documentation',
          icon: '404',
          hidden: false,
          noCache: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    name: 'Guide',
    redirect: '/guide/index',
    meta: {
      title: 'Guide',
      icon: '404'
      // alwaysShow: true
    },
    children: [
      {
        path: 'index',
        name: 'GuideIndex',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: '404',
          activeMenu: '/documentation/index'
        }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: '404',
      alwaysShow: true
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu.vue'),
        meta: {
          title: 'menu management',
          icon: '404'
          // hidden: true
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/system/role.vue'),
        meta: {
          title: 'role management',
          icon: '404',
          affix: true
          // hidden: true
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/system/user.vue'),
        meta: {
          title: 'user management',
          icon: '404'
        }
      }
    ]
  },
  // {
  //   path: '/external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://www.baidu.com',
  //       redirect: '/',
  //       meta: {
  //         title: 'External link',
  //         icon: 'link'
  //       }
  //     }
  //   ]
  // }
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true
    }

  }
]
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'el-icon-platform-eleme'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-platform-eleme',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'ReDirect',
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/401',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/error-page/401.vue'),
        meta: {
          title: '401',
          icon: '401',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true
    }
  }
]

export const routes: Array<RouteRecordRaw> = [
  ...constantRoutes,
  ...asyncRoutes
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
