<template>
  <!-- 解決同一組件不刷新  :key -->
  <router-view :key="$route.fullPath" />
</template>

<script>
import { toast, removeAlert } from '@/assets/js/mixin'
import {
  changeTabs, dateString
} from '@/assets/js/methods'

export default {
  provide () {
    return {
      removeAlert,
      toast,
      changeTabs,
      dateString
    }
  }
}
</script>
