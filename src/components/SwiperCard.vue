<template>
  <Swiper class="swiper swiper2" :modules="modules" :navigation="{
    nextEl: '.button-card-next',
    prevEl: '.button-card-prev',
  }" :pagination="{
    clickable: true,
    dynamicBullets: true,
  }" :breakpoints="{
    '576': {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    '768': {
      slidesPerView: 3,
    },
    '990': {
      slidesPerView: 4,
    },
  }" :spaceBetween="24">
    <SwiperSlide class="swiper-slide" v-for="item in swiperCardItems" :key="item.id">
      <div class="card h-100">
        <img src="/bg-logo.png" class="card-img object-fit-cover" width="320" height="320" alt="person" />
        <div class="card-img-overlay">
          <div class="d-flex mb-2">
            <img :src="item.image" class="max-width-50 me-2 rounded-circle" width="320" height="320"
              :alt="item.author" />
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
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

import { Navigation, Pagination } from 'swiper/modules'
import { dateString } from '@/assets/js/methods'

export default {
  props: ['swiperCardItems'],
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      modules: [Navigation, Pagination]
    }
  },
  methods: {
    dateString
  }
}
</script>
