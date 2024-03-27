<template>
  <HeaderComponent :isChange="isChange"/>
  <LoadingComponent :isLoading="isLoading" />
  <AsideComponent />

  <router-view></router-view>
  <main class="has-aside-layout has-header-layout">
    <section class="section-layout container py-40 py-lg-80">
      <div class="row" v-for="item in product" :key="item.id">
        <div class="col-12 col-lg-5">
          <img :src="item.imageUrl" :alt="item.id" class="img-fluid" />
        </div>
        <div class="col-12 col-lg-7">
          <nav aria-label="breadcrumb" class="mb-4 mt-4 mt-lg-0">
            <ol class="breadcrumb">
              <li class="breadcrumb-item text-uppercase">
                <router-link to="/">HOME</router-link>
              </li>
              <li class="breadcrumb-item text-uppercase">
                <router-link :to="`/products/${englishTab}`">{{
                  englishTab
                }}</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="`/products/${chineseTab}`"
                  >{{ chineseTab }}類</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ item.title }}
              </li>
            </ol>
          </nav>

          <h2 class="ff-serif fw-bold mb-4">
            {{ item.title }}
          </h2>
          <div class="mb-4">
            <span class="fs-5 me-3">NT$ {{ item.price }}</span
            ><span class="text-decoration-line-through"
              >NT$ {{ item.origin_price }}</span
            >
          </div>
          <hr />
          <p class="m-0" v-html="item.description"></p>
          <br />
          <p class="m-0" v-html="item.content"></p>

          <VForm
            @submit="productSubmit"
            class="mt-4 d-flex"
          >
              <div class="d-flex border border-2 border-dark me-4">
                <button
                  type="button"
                  class="btn btn-outline-dark border-0"
                  @click="count(false)"
                >
                  <span class="material-symbols-outlined fs-6"> remove </span>
                </button>
                <div class="px-2 d-flex justify-content-center align-items-center">
                  <VField
                    name="number"
                    type="number"
                    v-model="user.num"
                    rules="required"
                    ref="count"
                  >
                    {{ user.num }}
                  </VField>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-dark border-0"
                  @click="count(true)"
                >
                  <span class="material-symbols-outlined fs-6"> add</span>
                </button>
              </div>
            <button type="submit" class="btn btn-primary border-0">
              加入購物車
            </button>
          </VForm>
        </div>
      </div>
      <div class="row align-items-center mt-40 mt-lg-80">
        <div class="col-5 col-md-3">
          <h3 class="p-0">相關商品</h3>
        </div>
        <div class="col-7 col-md-9">
          <hr />
        </div>
        <div class="col-12">
          <ProductCard :products="products" class="mt-4" />
        </div>
      </div>
    </section>
  </main>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    HeaderComponent,
    LoadingComponent,
    FooterComponent,
    AsideComponent,
    ProductCard
  },
  data () {
    return {
      isLoading: false,
      product: [],
      chineseTab: [],
      englishTab: [],
      user: {
        num: 1
      },
      products: [],
      isChange: false
    }
  },
  inject: ['toast', 'changeTabs'],
  methods: {
    getProduct (value) {
      this.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/products/all`

      this.axios.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.product = res.data.products.filter((item) => item.id === value)
          const result = res.data.products.filter((item) =>
            item.category.match(this.chineseTab)
          )
          this.products = result.slice(0, 4)
          this.changeTabs(this.product, /[\u4e00-\u9fa5]/, this.chineseTab)
          this.changeTabs(this.product, /[a-zA-Z]/, this.englishTab)
          this.englishTab = String(this.englishTab)
          this.chineseTab = String(this.chineseTab)
        } else {
          this.toast('error', '尚未抓到資料')
        }
      }).catch((error) => {
        this.isLoading = false
        this.toast('error', '尚未抓到資料')
        console.error('product-getProduct error', error)
      })
    },
    productSubmit (val) {
      this.isChange = false
      const id = this.$route.params.productId
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/cart`

      this.axios.post(api, { data: { product_id: id, qty: val.number } })
        .then((res) => {
          if (res.data.success) {
            this.toast('success', '成功加入購物車')
            this.isChange = true
          } else {
            this.toast('error', '失敗，請重新操作')
          }
        })
        .catch((error) => {
          this.toast('error', '失敗，請重新操作')
          console.error('product-productSubmit error', error)
        })
    },
    count (status) {
      if (status === true) {
        if (!(this.$refs.count[0].value >= 10)) {
          this.$refs.count[0].value++
        }
      } else {
        if (!(this.$refs.count[0].value <= 1)) {
          this.$refs.count[0].value--
        }
      }
    }
  },
  created () {
    this.getProduct(this.$route.params.productId)
  }
}
</script>
