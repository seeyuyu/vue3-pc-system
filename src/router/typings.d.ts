import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // 路由菜单title
    icon?: string;
    hidden?: boolean;
    noCache?: boolean; // 路由是否缓存，没有或者false都会缓存，true不缓存
    activeMenu?: string; // 指定菜单激活
    breadcrumb?: boolean; // 是否显示面包屑
    affix?: boolean; // 固定显示在tagsview
    alwaysShow?: boolean; // 菜单是否一直显示根路由
  }
}
