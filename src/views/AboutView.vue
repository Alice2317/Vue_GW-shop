<template>
  <HeaderComponent />
  <AsideComponent />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-aside-layout has-header-layout">
    <section class="mt-0 my-lg-40">
      <SwiperBanner :swiperItems="swiperItems" />
    </section>

    <section class="py-40">
      <div class="section-layout container">
        <p class="max-width-637 m-0 m-auto" data-aos="fade-up">
          我們對自己更高的期許，也是品牌的使命，期望在這裡的每一個你都能輕鬆擁有屬於你的美麗。
          <br /><br />
          讓美好生活觸手可及，堅持不分年齡、性別、身形，讓人人都有追求美麗的自由，進而從容展現自信喜悅的美好！
        </p>
      </div>
    </section>

    <FooterComponent />
  </main>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import SwiperBanner from '@/components/SwiperBanner.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    LoadingComponent,
    SwiperBanner,
    AsideComponent,
    FooterComponent
  },
  data () {
    return {
      swiperItems: []
    }
  },
  methods: {
    getSwiper () {
      this.isLoading = true
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_BN_NAME
      }/products
      `
      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.swiperItems = res.data.products.filter((item) => {
              return item.category.match('about')
            })
            this.swiperItems.reverse()
          } else {
            this.toast('error', '尚未抓到資料')
          }
        })
        .catch((error) => {
          this.isLoading = false
          this.toast('error', '尚未抓到資料')
          console.error('about-getSwiper error', error)
        })
    }
  },
  created () {
    this.getSwiper()
  }
}
</script>
