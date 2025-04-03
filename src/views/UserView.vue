<template>
  <RouterView />
  <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    FooterComponent
  }
}
</script>
