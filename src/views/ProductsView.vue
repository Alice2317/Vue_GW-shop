<template>
  <HeaderComponent />
  <LoadingComponent :isLoading="isLoading" />

  <input type="checkbox" id="menu" class="d-none" />
  <aside class="d-flex aside" data-custom="menu">
    <div class="aside-body p-4 bg-body overflow-auto scroll-primary">
      <h6 class="aside-title ff-serif mb-0 mb-lg-2 text-uppercase">TAGS</h6>
      <ul class="nav pt-12 overflow-auto scrollBar-transparent flex-column">
        <li class="nav-item">
          <button type="button" class="nav-link ls px-0 fw-bold text-uppercase" @click="getProducts">
            全部
          </button>
        </li>
        <li class="nav-item">
          <router-link class="nav-link ls px-0 fw-bold text-uppercase" :to="{ query: { categoryName: '新品' } }"
            @click="getCategoriesProducts">
            新品
          </router-link>
        </li>
        <li class="nav-item" v-for="item in categories" :key="item.name">
          <button type="button" class="nav-link ls px-0 fw-bold text-uppercase d-flex align-items-center"
            data-bs-toggle="collapse" :data-bs-target="`#${item.name}`">
            {{ item.name
            }}<span class="material-symbols-outlined fs-6">
              arrow_drop_down</span>
          </button>
          <div class="collapse" :id="item.name">
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 px-0">
                <router-link class="border-0 ls bg-transparent p-0 text-uppercase"
                  :to="{ query: { categoryName: item.name } }" @click="getCategoriesProducts">
                  -全部
                </router-link>
              </li>
              <li class="list-group-item border-0 px-0" v-for="tab in item.childNodes" :key="tab">
                <router-link class="border-0 ls bg-transparent p-0 text-uppercase"
                  :to="{ query: { categoryName: item.name, tabName: tab } }" @click="getCategoriesProducts">
                  -{{ tab }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <div class="aside-body p-2 d-flex">
      <label for="menu" class="writing-mode-vertical text-center menu">
        <span class="material-symbols-outlined text-primary active">
          keyboard_double_arrow_up
        </span>
        <span class="material-symbols-outlined text-primary"> close </span>
      </label>
    </div>
  </aside>

  <main class="has-header-layout">
    <section class="container text-center">
      <div class="py-40 py-lg-80">
        <h2 class="text-primary lh-lg m-0 pb-4 ff-serif text-uppercase">
          products
        </h2>

        <div class="input-group m-auto mb-5 max-width-450">
          <input type="text" class="form-control" placeholder="請輸入關鍵字" ref="search" />
          <button class="btn btn-primary d-flex" type="button" @click="searchSubmit">
            <span class="material-symbols-outlined fs-5">search</span>
          </button>
        </div>

        <ProductCard :products="products" />
        <PageComponent :pagination="pagination" @page="getProducts" v-if="isPageState" />
      </div>
    </section>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ProductCard from '@/components/ProductCard.vue'
import PageComponent from '@/components/PageComponent.vue'

export default {
  components: {
    HeaderComponent,
    ProductCard,
    LoadingComponent,
    FooterComponent,
    PageComponent
  },
  data () {
    return {
      isLoading: false,
      products: [],
      categories: [
        {
          name: 'men',
          childNodes: []
        },
        {
          name: 'female',
          childNodes: []
        },
        {
          name: 'baby',
          childNodes: []
        }
      ],
      pagination: [],
      isPageState: false,
      AllProducts: []
    }
  },
  inject: ['toast'],
  methods: {
    // 初始化產品分類列表
    async getCategories () {
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME
        }/products/all
      `
      await this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.AllProducts = res.data.products
            res.data.products.forEach((item) => {
              const array = item.category.split(',')

              const English = array.filter((item) => item.match(/[a-zA-Z]/))

              this.categories.forEach((item, index) => {
                if (item.name === English[0]) {
                  const Chinese = array.filter((item) =>
                    item.match(/[\u4e00-\u9fa5]/)
                  )

                  const filter = this.categories[index].childNodes.findIndex(
                    (item) => item === Chinese[0]
                  )

                  if (filter === -1) {
                    this.categories[index].childNodes.push(Chinese[0])
                  }
                }
              })
            })
          } else {
            this.toast('error', '尚未抓到資料')
          }
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('getCategories error', error)
        })
    },
    // 全部(有分頁)產品
    async getProducts (page = 1) {
      this.isPageState = true
      this.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME
        }/products/?page=${page}`

      await this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
          } else {
            this.toast('error', '尚未抓到資料')
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('products-getProducts error', error)
          this.isLoading = false
        })
    },
    // 篩選分類產品(沒分頁)
    async getCategoriesProducts () {
      this.isPageState = false
      this.isLoading = true
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME
        }/products/all
      `
      await this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
              .filter((item) =>
                item.category.match(this.$route.query.categoryName)
              )
              .filter((item) => item.category.match(this.$route.query.tabName))
          } else {
            this.toast('error', '尚未抓到資料')
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('getgetCategoriesProducts error', error)
          this.isLoading = false
        })
    },
    searchSubmit () {
      const searchVal = this.$refs.search.value
      if (searchVal === '') {
        this.toast('error', '未輸入關鍵字')
      } else {
        this.isPageState = false
        let item = null
        item = this.AllProducts.filter((item) => item.title.match(searchVal))
        if (item.length === 0) {
          item = this.AllProducts.filter((item) => item.category.match(searchVal))
        }

        if (item.length >= 1) {
          this.products = item
        } else {
          this.toast('error', '未找到商品')
        }
      }
    }
  },
  created () {
    this.getCategories()
    if (this.$route.query.categoryName) {
      this.getCategoriesProducts()
    } else {
      this.getProducts()
    }
  }
}
</script>
