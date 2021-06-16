<template>
  <div
    class="svg-icon svg-external-icon"
    v-if="isExt"
    :style="styleExternalIcon"
    v-bind="$attrs"
  ></div>
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  name: 'SvgIcon',
  inheritAttrs: false,
  props: {
    iconClass: {
      type: String,
      require: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 判断是否是带协议的图片链接
    const isExt = computed(() => isExternal(props.iconClass || ''))
    // 拼接sysbloId在loader中制定了sysbolId的格式，icon-图标名称
    const iconName = computed(() => `#icon-${props.iconClass}`)
    // 添加类名 props.className外部传入自定义类名
    const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repaet 50% 50%`
    }))
    return {
      isExt,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }

})
</script>
<style lang="scss" scoped>
  .svg-icon{
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .svg-external-icon{
    background-color: currentColor;
    mask-size: cover !important;
    display:  inline-block;
  }
</style>
