<template>
  <HeaderComponent />
  <AsideComponent />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-aside-layout has-header-layout">
    <section class="section-layout container text-center">
      <div class="py-40 py-lg-80">
        <h2 class="lh-lg m-0 text-primary ff-serif pb-4 text-uppercase">
          {{ $route.params.categoryName }}
        </h2>

        <ul
          class="nav nav-pills flex-nowrap overflow-auto scrollBar-primary pb-2 pb-lg-40 justify-content-start justify-content-lg-center align-items-center"
          id="pills-tab"
          role="tablist"
          v-if="!isAllProducts"
        >
          <li
            class="nav-item"
            role="presentation"
            v-for="item in tabs"
            :key="item"
          >
            <button
              class="nav-link text-nowrap px-3"
              :class="item === '全部' ? 'active' : ''"
              :id="item"
              data-bs-toggle="pill"
              :data-bs-target="item"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              @click="changeItem(item)"
            >
              {{ item }}
            </button>
          </li>
        </ul>

        <div class="container mt-4">
          <ProductCard :products="products" v-if="categoryItem.length < 1" />
          <ProductCard :products="categoryItem" v-else />
          <PageComponent
            :pagination="pagination"
            @page="getProducts"
            v-if="isAllProducts"
          />
        </div>
      </div>
    </section>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ProductCard from '@/components/ProductCard.vue'
import PageComponent from '@/components/PageComponent.vue'

export default {
  components: {
    HeaderComponent,
    AsideComponent,
    ProductCard,
    LoadingComponent,
    FooterComponent,
    PageComponent
  },
  data () {
    return {
      isLoading: false,
      products: [],
      tabs: ['全部'],
      categoryItem: [],
      pagination: [],
      isAllProducts: false
    }
  },
  inject: ['changeTabs'],
  watch: {
    '$route.query': {
      handler () {
        this.getProducts()
      },
      deep: true
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.tabs = ['全部']

      const categoryName = this.$route.params.categoryName
      let api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/products/all`

      if (categoryName === 'all') {
        api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
          import.meta.env.VITE_MAIN_NAME
        }/products/?page=${page}`
      }

      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            if (categoryName === 'all') {
              this.products = res.data.products
              this.pagination = res.data.pagination
              this.isAllProducts = true
            } else {
              this.products = res.data.products.filter((item) =>
                item.title.match(categoryName)
              )
              if (this.products.length === 0) {
                this.products = res.data.products.filter((item) =>
                  item.category.match(categoryName)
                )
                if (this.products.length === 0) {
                  this.$swal.fire({
                    icon: 'error',
                    text: '找不到此商品',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              }
            }
            this.changeTabs(this.products, /[\u4e00-\u9fa5]/, this.tabs)
          } else {
            this.toast('error', '尚未抓到資料')
          }
        })
        .catch((error) => {
          this.isLoading = false
          this.toast('error', '尚未抓到資料')
          console.error('products-getProducts error', error)
        })
    },
    changeItem (value) {
      this.categoryItem = this.products.filter((item) =>
        item.category.match(value)
      )
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
