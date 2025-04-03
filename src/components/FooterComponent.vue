<template>
  <section class="py-12 bg-primary text-center text-light">
    <p class="d-none d-lg-block m-0 m-auto">
      本網站僅作為求職作品集使用，不供商業用途 © 2024 XXXXXX
    </p>
    <p class="d-block d-lg-none m-0 m-auto">
      本網站僅作為求職作品集使用<br />
      不供商業用途 © 2024 XXXXXX
    </p>
  </section>

  <FixedIcon />
</template>

<script>
import FixedIcon from '@/components/FixedIcon.vue'

export default {
  components: {
    FixedIcon
  }
}
</script>
