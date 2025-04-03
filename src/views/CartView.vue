<template>
  <HeaderComponent :isChange="isChange" />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-header-layout" v-if="carts.length >= 1">
    <section class="container py-40 py-lg-80">
      <h2 class="pb-3 fw-bold">購物車</h2>
      <div class="row">
        <div class="col-12 col-lg-8">
          <div
            class="card align-items-center mb-3 p-0"
            v-for="item in carts"
            :key="item.id"
          >
            <div class="row g-0 bg-info">
              <div class="col-2">
                <img
                  :src="item.product.imageUrl"
                  width="320"
                  height="320"
                  class="img-fluid object-fit-cover h-100"
                  :alt="item.id"
                />
              </div>
              <div class="col-5 align-content-center">
                <div class="card-body">
                  <h6 class="card-title">{{ item.product.title }}</h6>
                  <p class="fs-7">尺寸：F</p>

                  <span>NT$ {{ item.product.price }}</span>
                </div>
              </div>
              <div class="col-3 align-content-center">
                <div class="d-flex justify-content-between max-width-120">
                  <button
                    type="button"
                    class="d-flex bg-transparent d-flex p-0 border-0"
                    :disabled="item.qty <= 1 ? true : false"
                    @click="count(item.id, item.qty, false)"
                  >
                    <span class="material-symbols-outlined fs-5"> remove </span>
                  </button>
                  <VField
                    name="number"
                    type="number"
                    class="fs-5"
                    v-model="item.qty"
                    rules="required"
                    ref="count"
                  >
                    {{ item.qty }}
                  </VField>
                  <button
                    type="button"
                    class="d-flex bg-transparent d-flex p-0 border-0"
                    :disabled="item.qty >= 10 ? true : false"
                    @click="count(item.id, item.qty, true)"
                  >
                    <span class="material-symbols-outlined fs-5"> add</span>
                  </button>
                </div>
              </div>
              <div class="col-2 align-content-center text-end">
                <button
                  type="button"
                  class="btn-close mx-20"
                  aria-label="Close"
                  @click="removeCart(item.id)"
                ></button>
              </div>
            </div>
          </div>

          <VForm @submit="couponSubmit">
            <div class="d-inline-block">
              <div class="d-flex align-items-center bg-info">
                <VField
                  type="text"
                  name="coupon"
                  class="form-control w-auto border-0 bg-transparent"
                  placeholder="請輸入折價卷碼"
                  aria-label="請輸入折價卷碼"
                  v-model="code"
                />
                <button type="submit" class="btn btn-primary">套用</button>
              </div>
            </div>
          </VForm>
          <p class="p-0 pt-2">首購族五折：first5off</p>
        </div>
        <div class="col-12 col-lg-4">
          <div class="pt-5 pt-lg-0 text-end">
            <p class="d-flex justify-content-between">
              <span>商品小計</span><span>{{ total }}</span>
            </p>
            <p class="d-flex justify-content-between">
              <span>折扣小計</span>
              <span>{{
                finalTotal === total ? "-0" : Math.round(finalTotal - total)
              }}</span>
            </p>
            <hr />
            <div class="d-flex justify-content-between">
              <span>訂單金額</span>
              <h5 class="text-dark">
                NT$
                {{ finalTotal === total ? total : Math.round(finalTotal) }}
              </h5>
            </div>

            <button type="button" class="btn btn-primary mt-3" @click="goPay">
              下一步
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <main
    class="has-header-layout d-flex justify-content-center align-items-center text-center"
    v-else
  >
    <p>
      您尚未選購商品<br />
      現在首購可有5折優惠<br />趕快去購買吧~~~ <br /><br />
      首購族優惠碼：first5off
    </p>
  </main>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'

export default {
  components: {
    HeaderComponent,
    LoadingComponent
  },
  data () {
    return {
      isLoading: false,
      carts: [],
      total: 0,
      finalTotal: 0,
      code: '',
      isChange: false
    }
  },
  inject: ['toast', 'removeAlert'],
  methods: {
    async getCarts () {
      this.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/cart`
      await this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.finalTotal = res.data.data.final_total
            this.total = res.data.data.total
            this.carts = res.data.data.carts
          } else {
            this.toast('error', '尚未抓到資料')
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('cart-getCarts error', error)
          this.isLoading = false
        })
    },
    couponSubmit () {
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/coupon`

      this.axios
        .post(api, { data: { code: this.code } })
        .then((res) => {
          if (res.data.success) {
            this.toast('success', '已更新商品價格')
            this.getCarts()
          } else {
            this.toast('error', '輸入錯誤')
          }
        })
        .catch((error) => {
          this.toast('error', '輸入錯誤')
          console.error('cart-couponSubmit error', error)
        })
    },
    removeCart (id) {
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/cart/${id}`
      this.removeAlert().then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete(api)
            .then((res) => {
              if (res.data.success) {
                this.getCarts()
                this.isChangeCarts()
              } else {
                this.toast('error', '失敗，請重新操作')
              }
            })
            .catch((error) => {
              this.toast('error', '失敗，請重新操作')
              console.error('cart-removeCart error', error)
            })
        }
      })
    },
    async count (id, qty, state) {
      let num = qty
      if (state === true) {
        num++
      } else {
        num--
      }
      if (num > 10 || num <= 0) {
        return
      }
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/cart/${id}`
      await this.axios
        .put(api, { data: { product_id: id, qty: num } })
        .then((res) => {
          if (res.data.success) {
            this.getCarts()
            this.isChangeCarts()
          } else {
            this.toast('error', '失敗，請重新操作')
          }
        })
        .catch((error) => {
          this.toast('error', '失敗，請重新操作')
          console.error('cart-removeCart error', error)
        })
    },
    isChangeCarts () {
      if (this.isChange === false) {
        this.isChange = true
      } else {
        this.isChange = false
      }
    },
    goPay () {
      localStorage.setItem('carts', this.carts)
      localStorage.setItem('finalTotal', this.finalTotal)
      localStorage.setItem('total', this.total)
      this.$router.push({ name: 'pay' })
    }
  },
  created () {
    this.getCarts()
  }
}
</script>
