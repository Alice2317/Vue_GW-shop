<template>
  <HeaderComponent />
  <AsideComponent />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-aside-layout has-header-layout">
    <section class="mt-0 my-lg-40">
      <SwiperBanner :swiperItems="swiperItems" />
    </section>

    <section class="bg-left-primary py-40 py-lg-80" v-if="products">
      <div class="section-layout container" data-aos="fade-up">
        <div
          class="d-flex justify-content-center justify-content-lg-between align-items-center"
        >
            <h3 class="text-light m-0 lh-lg ff-serif text-uppercase">NEW IN</h3>
          <router-link
            class="d-none d-lg-flex link-dark display-8 align-items-center ff-serif"
            to="/products/新品"
          >
            MORE
            <span class="material-symbols-outlined ms-2">
              arrow_circle_right
            </span>
          </router-link>
        </div>
        <HomeCard :products="products" />
        <router-link
          class="link-light display-8 d-flex d-lg-none justify-content-center align-items-center ff-serif mt-40"
          to="/products/新品"
        >
          MORE
          <span class="material-symbols-outlined ms-2">
            arrow_circle_right
          </span>
        </router-link>
      </div>
    </section>

    <section class="py-40 py-lg-80">
      <div class="section-layout container" data-aos="fade-up">
        <h3 class="text-dark m-0 lh-lg ff-serif text-uppercase">COMMENT</h3>
        <SwiperCard :swiperScrollbarItem="swiperScrollbarItem" />
      </div>
    </section>

    <section class="py-40 py-lg-80">
      <div class="section-layout container" data-aos="fade-up">
        <div class="row row-cols-1 row-cols-md-2 align-items-center">
          <div class="col">
            <p class="m-0 mb-12 text-center text-lg-start">
              馬上訂閱我們的電子報，優先得到最新活動。
            </p>
            <VForm @submit="emailSubmit">
              <div class="input-group">
                <VField
                  name="email"
                  type="email"
                  rules="required|email"
                  class="form-control"
                  placeholder="請輸入EMAIL"
                  aria-label="請輸入EMAIL"
                  aria-describedby="button-addon2"
                />
                <button class="btn btn-dark" type="submit" id="button-addon2">
                  訂閱
                </button>
              </div>
              <ErrorMessage class="text-danger" name="email" />
            </VForm>
          </div>
          <div class="col">
            <p class="m-0 text-center text-lg-end">
              本網站僅作為求職作品集使用，不供商業用途 © 2024 XXXXXX
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <FixedIcon />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import SwiperBanner from '@/components/SwiperBanner.vue'
import SwiperCard from '@/components/SwiperCard.vue'
import HomeCard from '@/components/HomeCard.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import FixedIcon from '@/components/FixedIcon.vue'

export default {
  components: {
    HeaderComponent,
    AsideComponent,
    SwiperBanner,
    LoadingComponent,
    HomeCard,
    SwiperCard,
    FixedIcon
  },
  data () {
    return {
      isLoading: false,
      products: [],
      swiperItems: [],
      swiperScrollbarItem: []
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
      this.axios.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.swiperItems = res.data.products.filter((item) => {
            return item.category.match('home')
          })
          this.swiperItems.reverse()
        } else {
          this.toast('error', '尚未抓到資料')
        }
      }).catch((error) => {
        this.isLoading = false
        this.toast('error', '尚未抓到資料')
        console.error('home-getSwiper error', error)
      })
    },
    getSwiperScrollbar () {
      this.isLoading = true
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/articles
      `
      this.axios.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.swiperScrollbarItem = res.data.articles
        } else {
          this.toast('error', '尚未抓到資料')
        }
      }).catch((error) => {
        this.isLoading = false
        this.toast('error', '尚未抓到資料')
        console.error('home-getSwiperScrollbar error', error)
      })
    },
    getProducts () {
      this.isLoading = true
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/products
      `
      this.axios.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          const result = res.data.products.filter((item) =>
            item.category.match('新品')
          )
          this.products = result.slice(0, 4)
        } else {
          this.toast('error', '尚未抓到資料')
        }
      }).catch((error) => {
        this.isLoading = false
        this.toast('error', '尚未抓到資料')
        console.error('home-getProducts error', error)
      })
    },
    emailSubmit (value) {
      this.$swal.fire({
        icon: 'success',
        text: `已傳送至${value.email}`,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  created () {
    this.getProducts()
    this.getSwiper()
    this.getSwiperScrollbar()
  }
}
</script>
