<template>
  <nav class="navbar fixed-top bg-body border-bottom">
    <div class="container">
      <!-- logo -->
      <router-link to="/" class="navbar-brand text-primary ff-serif m-0 p-0">GW</router-link>

      <!-- menu -->
      <ul class="nav c-nav1">
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link text-uppercase" to="/about">ABOUT</router-link>
        </li>
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link text-uppercase" to="/qa">Q&A</router-link>
        </li>
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link text-uppercase" to="/products">products</router-link>
        </li>
        <li class="nav-item d-flex align-items-center d-lg-none">
          <button class="nav-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu">
            <span class="material-symbols-outlined"> widgets </span>
          </button>
        </li>
        <li class="nav-item">
          <router-link class="nav-link h-100 d-flex align-items-center" :to="{ name: 'cart' }">
            <span class="material-symbols-outlined position-relative">
              shopping_cart

              <span
                class="position-absolute top-0 start-100 translate-middle badge fs-7 bg-danger text-light ff-sans rounded-circle px-2 py-1"
                v-if="cartsLength">
                {{ cartsLength }}
              </span>
            </span>
          </router-link>
        </li>
        <li class="nav-item d-flex align-items-center">
          <button type="button" class="theme-toggle" @click="toggleTheme">
            <span class="material-symbols-outlined">{{ isTheme ? 'dark_mode' : 'light_mode' }}</span>
          </button>
        </li>
      </ul>

      <!-- menu offcanvas -->
      <div class="offcanvas offcanvas-end" tabindex="-1" data-bs-scroll="true" id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel">
        <div class="offcanvas-header justify-content-end">
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/about">ABOUT</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/qa">Q&A</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-uppercase" to="/products">products</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import 'bootstrap/js/src/offcanvas'

export default {
  data () {
    return {
      cartsLength: 0,
      isTheme: true
    }
  },
  props: ['isChange'],
  methods: {
    getCarts () {
      this.cartsLength = 0
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME
        }/cart`
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            const carts = res.data.data.carts
            carts.forEach((item) => {
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
      if (val !== '') {
        this.$router.push(`/products?categoryName=${val}`)
      }
    },
    toggleTheme () {
      if (this.isTheme) {
        this.isTheme = false
      } else {
        this.isTheme = true
      }
      document.documentElement.setAttribute('data-theme', this.isTheme ? 'dark' : 'light')
      localStorage.setItem('theme', this.isTheme ? 'dark' : 'light')
    }
  },
  watch: {
    isChange () {
      this.getCarts()
    }
  },
  created () {
    this.isTheme = localStorage.getItem('theme') === 'light' ? false : true || true
    document.documentElement.setAttribute('data-theme', this.isTheme ? 'dark' : 'light')
    this.getCarts()
  }
}
</script>
