<template>
  <Swiper
    class="swiper swiper1"
    :slidesPerView="'auto'"
    :spaceBetween="12"
    :modules="modules"
    :navigation="{
      nextEl: '.button-next',
      prevEl: '.button-prev',
    }"
    :centeredSlides="true"
    :effect="'coverflow'"
    :coverflowEffect="{
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
      scale: 0.9,
    }"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
  >
    <SwiperSlide
      class="swiper-slide"
      v-for="item in swiperItems"
      :key="item.id"
      :data-path="item.path"
      @click.stop="routerGo"
    >
      <button type="button" class="button-prev">
        <span class="material-symbols-outlined fs-2"> chevron_left </span>
      </button>
      <div class="card card1 bg-dark text-light rounded-0 border-0 h-100 w-100">
        <picture class="card-img h-100">
          <source
            media="(max-width: 600px)"
            :srcset="item.imagesUrl"
            width="320"
            height="320"
            :alt="item.id"
            decoding="async"
          />
          <img
            :src="item.imageUrl"
            :alt="item.id"
            width="320"
            height="320"
            decoding="async"
          />
        </picture>
        <div
          class="card-img-overlay bg-bottom-dark d-flex flex-column justify-content-end align-items-start p-20 pb-40 p-md-40 p-lg-80"
        >
          <h6 class="card-title ff-serif">{{ item.title }}</h6>
          <p class="card-text" v-html="item.content"></p>
        </div>
      </div>

      <button type="button" class="button-next">
        <span class="material-symbols-outlined fs-2"> chevron_right </span>
      </button>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow
} from 'swiper/modules'

export default {
  props: ['swiperItems'],
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      modules: [Autoplay, Pagination, Navigation, EffectCoverflow]
    }
  },
  methods: {
    routerGo (e) {
      const currentTarget = e.currentTarget
      if (currentTarget.className.match('swiper-slide-active') !== null) {
        this.$router.push(currentTarget.dataset.path)
      }
    },
    restSlide (swiper) {
      console.log(swiper)
    }
  }
}
</script>
