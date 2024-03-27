<template>
  <swiper
    class="swiper swiper1"
    :modules="modules"
    :direction="'vertical'"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide
      class="swiper-slide"
      v-for="(item, index) in swiperItems"
      :key="`${item}${index}`"
    >
      <!-- 首頁 -->
      <router-link
        class="card card1 bg-dark text-white rounded-0 border-0 h-100 w-100"
        to="/products/all"
        v-if="$route.path === '/'"
      >
        <img
          class="card-img"
          :src="resize === true ? item.imagesUrl : item.imageUrl"
          :alt="`輪播圖${index}`"
        />
        <div
          class="card-img-overlay d-flex flex-column justify-content-end align-items-start p-20 p-lg-80"
        >
          <h5 class="card-title ff-serif">{{ item.title }}</h5>
          <p class="card-text" v-html="item.content"></p>
        </div>
      </router-link>

      <!-- about頁 -->
      <div
        class="card card1 bg-dark text-white rounded-0 border-0 h-100 w-100"
        v-else
      >
        <img
          class="card-img"
          :src="resize === true ? item.imagesUrl : item.imageUrl"
          :alt="`輪播圖${index}`"
        />
        <div
          class="card-img-overlay d-flex flex-column justify-content-end align-items-start p-20 p-lg-80"
        >
          <h5 class="card-title ff-serif">{{ item.title }}</h5>
          <p class="card-text" v-html="item.content"></p>
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
import { Autoplay, Pagination } from 'swiper/modules'
import { windowWidth } from '@/assets/js/mixin'

export default {
  props: ['swiperItems'],
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      modules: [Autoplay, Pagination]
    }
  },
  mixins: [windowWidth]
}
</script>
