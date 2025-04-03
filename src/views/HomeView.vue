<template>
  <HeaderComponent />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-header-layout">
    <section class="py-40">
      <SwiperBanner :swiperItems="swiperItems" />
    </section>

    <section class="py-40 py-lg-80" v-if="products">
      <div class="container" data-aos="fade-up">
        <div class="d-flex justify-content-center justify-content-lg-between align-items-center">
          <h3 class="m-0 lh-lg ff-serif text-uppercase">NEW IN</h3>
          <router-link class="d-none d-lg-flex display-8 align-items-center fw-bold" to="/products?categoryName=新品">
            MORE
            <span class="material-symbols-outlined ms-2">
              arrow_circle_right
            </span>
          </router-link>
        </div>
        <HomeCard :products="products" />
        <router-link class="display-8 d-flex d-lg-none justify-content-center align-items-center fw-bold mt-40"
          to="/products?categoryName=新品">
          MORE
          <span class="material-symbols-outlined ms-2">
            arrow_circle_right
          </span>
        </router-link>
      </div>
    </section>

    <section class="py-40 py-lg-80">
      <div class="container" data-aos="fade-up">
        <div class="d-flex justify-content-between">
          <h3 class="m-0 lh-lg ff-serif text-uppercase">COMMENT</h3>
          <div class="d-flex">
            <button type="button" class="button-card-prev">
              <span class="material-symbols-outlined fs-2"> chevron_left </span>
            </button>
            <button type="button" class="button-card-next">
              <span class="material-symbols-outlined fs-2">
                chevron_right
              </span>
            </button>
          </div>
        </div>
        <SwiperCard :swiperCardItems="swiperCardItems" />
      </div>
    </section>

    <section class="py-40 py-lg-80">
      <div class="container" data-aos="fade-up">
        <div class="row row-cols-1 row-cols-md-2 align-items-center">
          <div class="col">
            <p class="m-0 mb-12 text-center text-lg-start">
              馬上訂閱我們的電子報，優先得到最新活動。
            </p>
            <VForm @submit="emailSubmit">
              <div class="input-group">
                <VField name="email" type="email" rules="required|email" class="form-control" placeholder="請輸入EMAIL"
                  aria-label="請輸入EMAIL" aria-describedby="button-addon2" />
                <button class="btn btn-primary" type="submit" id="button-addon2">
                  訂閱
                </button>
              </div>
              <ErrorMessage class="text-danger" name="email" />
            </VForm>
          </div>
          <div class="col">
            <p class="m-0 text-center text-lg-end">
              本網站僅作為求職作品集使用<br />不供商業用途 © 2024 XXXXXX
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
import SwiperBanner from '@/components/SwiperBanner.vue'
import SwiperCard from '@/components/SwiperCard.vue'
import HomeCard from '@/components/HomeCard.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import FixedIcon from '@/components/FixedIcon.vue'

export default {
  components: {
    HeaderComponent,
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
      swiperItems: [
        {
          id: 'banner1',
          path: '/products',
          imageUrl:
            'https://images.unsplash.com/photo-1557821552-17105176677c?q=72&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          imagesUrl:
            'https://images.unsplash.com/photo-1619191163420-4a7c0798b8a4?q=72&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: '開幕迎賓',
          content: '首購者5折'
        },
        {
          id: 'banner2',
          path: '/products?categoryName=baby',
          imageUrl:
            'https://images.unsplash.com/photo-1586475915213-69971ee3c21a?q=72&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          imagesUrl:
            'https://images.unsplash.com/photo-1596252732610-fce5ac542f8e?q=72&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: '新上市',
          content: '嬰兒商品出現了，快來看看！'
        },
        {
          id: 'banner3',
          path: '/product/-Np6cIc42VUxgUrCux39',
          imageUrl:
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=72&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          imagesUrl:
            'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=72&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: '限時活動',
          content: '羊羔絨外套特價299，快來看看！'
        }
      ],
      swiperCardItems: []
    }
  },
  inject: ['toast'],
  methods: {
    getSwiper () {
      this.isLoading = true
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME
        }/articles
      `
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.swiperCardItems = res.data.articles
          } else {
            this.toast('error', '尚未抓到資料')
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('home-getSwiper error', error)
          this.isLoading = false
        })
    },
    getProducts () {
      this.isLoading = true
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME
        }/products
      `
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            const result = res.data.products.filter((item) =>
              item.category.match('新品')
            )
            this.products = result.slice(0, 4)
          } else {
            this.toast('error', '尚未抓到資料')
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('home-getProducts error', error)
          this.isLoading = false
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
  }
}
</script>
