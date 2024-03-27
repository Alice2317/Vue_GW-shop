<template>
  <swiper
    class="swiper swiper2"
    :modules="modules"
    :pagination="{
      clickable: true,
      dynamicBullets: true
    }"
    :breakpoints="{
      '576': {
        slidesPerView: 2,
        spaceBetween: 12
      },
      '768': {
        slidesPerView: 3
      },
      '990': {
        slidesPerView: 4
      },
    }"
    :spaceBetween="24"
  >
    <swiper-slide
      class="swiper-slide"
      v-for="item in swiperScrollbarItem"
      :key="item.id"
    >
      <div class="card h-100">
        <img src="../../public/bg-logo.png" class="card-img object-fit-cover" height="400" alt="person" />
        <div class="card-img-overlay">
          <div class="d-flex mb-2">
          <img :src="item.image" class="max-width-50 me-2 rounded-circle">
          <p class="card-text">
            {{ item.author }}

            <br />
           <small class="text-muted">{{ dateString(item.create_at) }}</small>
          </p>
          </div>
          <p class="card-text">
            <span>★{{ item.title }}</span>
            <br />
            {{ item.description }}
          </p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import { Pagination } from 'swiper/modules'
import { dateString } from '@/assets/js/methods'

export default {
  props: ['swiperScrollbarItem'],
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      modules: [Pagination]
    }
  },
  methods: {
    dateString
  }
}
</script>
