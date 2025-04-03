<template>
  <HeaderComponent :isChange="isChange" />
  <LoadingComponent :isLoading="isLoading" />

  <RouterView />
  <main class="has-header-layout">
    <section class="container py-40 py-lg-80">
      <nav aria-label="breadcrumb" class="mb-4">
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
            {{ product[0].title }}
          </li>
        </ol>
      </nav>
      <div class="row" v-for="item in product" :key="item.id">
        <div class="col-12 col-lg-5">
          <img
            :src="item.imageUrl"
            :alt="item.id"
            class="img-fluid"
            width="320"
            height="320"
          />
        </div>
        <div class="col-12 col-lg-7">
          <h2 class="ff-serif fw-bold mb-4 mt-4 mt-lg-0">
            {{ item.title }}
          </h2>
          <div class="mb-4">
            <span class="fs-5 me-3">NT$ {{ item.price }}</span
            ><span class="text-decoration-line-through opacity-50"
              >NT$ {{ item.origin_price }}</span
            >
          </div>
          <hr />
          <p class="m-0" v-html="item.description"></p>
          <br />
          <p class="m-0" v-html="item.content"></p>

          <VForm
            @submit="productSubmit"
            class="d-flex align-item-center mt-5"
          >
            <span class="width-150 align-content-center">
              <div class="d-flex justify-content-between max-width-120">
                <button
                  type="button"
                  class="d-flex bg-transparent d-flex p-0 border-0"
                  :disabled="user.num <= 1 ? true : false"
                  @click="count(false)"
                >
                  <span class="material-symbols-outlined fs-5"> remove </span>
                </button>
                <VField
                  name="number"
                  type="number"
                  class="fs-5"
                  v-model="user.num"
                  rules="required"
                  ref="count"
                >
                  {{ user.num }}
                </VField>
                <button
                  type="button"
                  class="d-flex bg-transparent d-flex p-0 border-0"
                  :disabled="user.num >= 10 ? true : false"
                  @click="count(true)"
                >
                  <span class="material-symbols-outlined fs-5"> add</span>
                </button>
              </div>
            </span>
            <button type="submit" class="btn btn-primary border-0">
              加入購物車
            </button>
          </VForm>
        </div>
      </div>
      <div class="align-items-center mt-40 mt-lg-80">
        <div class="d-flex align-items-center">
          <h3 class="text-nowrap">相關商品</h3>
          <span class="w-100 bg-primary mx-3" style="height: 1px"></span>
        </div>
        <ProductCard :products="products" class="mt-4" />
      </div>
    </section>
  </main>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    HeaderComponent,
    LoadingComponent,
    FooterComponent,
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
    async getProduct (value) {
      this.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/products/all`

      await this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.products.filter(
              (item) => item.id === value
            )
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
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('product-getProduct error', error)
          this.isLoading = false
        })
    },
    productSubmit (val) {
      this.isChange = false
      const id = this.$route.params.productId
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/cart`

      this.axios
        .post(api, { data: { product_id: id, qty: val.number } })
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
