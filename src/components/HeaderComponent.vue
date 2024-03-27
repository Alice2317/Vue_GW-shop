<template>
  <nav class="navbar fixed-top header bg-body">
    <div class="container px-12 px-lg-0">
      <!-- logo -->
      <router-link to="/" class="navbar-brand text-primary ff-serif m-0 p-0"
        >GW</router-link
      >

      <!-- menu -->
      <ul class="nav c-nav1">
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link text-uppercase" to="/about"
            >ABOUT</router-link
          >
        </li>
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link text-uppercase" to="/qa"
            >Q&A</router-link
          >
        </li>
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link text-uppercase" to="/products/all"
            >products</router-link
          >
        </li>
        <li class="nav-item d-none d-lg-block">
          <div class="input-group">
            <input
              type="text"
              name="text"
              class="form-control border-0"
              :class="showInput === true ? 'd-block' : 'd-none'"
              placeholder="請輸入關鍵字"
              aria-label="請輸入關鍵字"
              aria-describedby="button-addon1"
              ref="search"
            />
            <button
              type="button"
              id="button-addon1"
              class="bg-transparent border-0 nav-link"
              @click="searchSubmit($refs.search.value)"
            >
              <span class="material-symbols-outlined">search</span>
            </button>
          </div>
        </li>
        <li class="nav-item d-block d-lg-none">
          <button
            class="nav-link"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <span class="material-symbols-outlined"> widgets </span>
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link h-100 d-flex"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasCart"
            aria-controls="offcanvasCart"
            @click="getCarts"
          >
            <span class="material-symbols-outlined position-relative">
              shopping_cart

              <span
                class="position-absolute top-100 start-100 translate-middle badge fs-7 bg-danger text-light ff-sans rounded-circle px-2 py-1"
                v-if="cartsLength"
              >
                {{ cartsLength }}
              </span>
            </span>
          </button>
        </li>
      </ul>

      <!-- cart offcanvas -->
      <OffcanvasComponent :carts="carts" :check="isCheck" />

      <!-- menu offcanvas -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        data-bs-scroll="true"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div class="offcanvas-header justify-content-end">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/about"
                >ABOUT</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/qa">Q&A</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-uppercase" to="/products/all"
            >products</router-link
          >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import OffcanvasComponent from '@/components/OffcanvasComponent.vue'

export default {
  components: {
    OffcanvasComponent
  },
  data () {
    return {
      showInput: false,
      isCheck: false,
      carts: [],
      cartsLength: 0
    }
  },
  props: ['isChange'],
  methods: {
    getCarts () {
      this.cartsLength = 0
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/cart`
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data
            this.carts.carts.forEach((item) => {
              this.cartsLength += item.qty
            })
          } else {
            this.toast('error', '尚未抓到資料')
          }
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('getCarts error', error)
        })
    },
    searchSubmit (val) {
      if (this.showInput === true) {
        if (val !== '') {
          this.$router.push(`/products/${val}`)
          this.showInput = false
        }
        this.showInput = false
      } else {
        this.showInput = true
        setTimeout(() => {
          this.showInput = false
        }, 20000)
      }
    }
  },
  watch: {
    isChange () {
      this.getCarts()
    }
  },
  created () {
    this.getCarts()
  }
}
</script>
