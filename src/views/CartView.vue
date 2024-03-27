<template>
  <HeaderComponent :isChange="isChange" />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-header-layout" v-if="carts.length >= 1">
    <section class="d-flex justify-content-center pt-80 pb-40">
      <div class="p-2 p-lg-20 text-center border-dark me-2 bg-secondary">
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step1</h3>
        <h5 class="fs-md-6 m-0 pt-4">確認訂單</h5>
      </div>
      <div
        class="p-2 p-lg-20 text-center border-dark me-2 bg-dark text-light opacity-50"
      >
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step2</h3>
        <h5 class="fs-md-6 m-0 pt-4">填寫資料</h5>
      </div>
      <div
        class="p-2 p-lg-20 text-center border-dark bg-dark text-light opacity-50"
      >
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step3</h3>
        <h5 class="fs-md-6 m-0 pt-4">交易結果</h5>
      </div>
    </section>

    <section class="container pb-40 pb-lg-80">
      <div class="row">
        <div class="col-12 col-lg-2"></div>
        <div class="col-12 col-lg-8">
          <div class="table-responsive text-nowrap scrollBar-dark">
            <table class="table align-middle text-center">
              <thead>
                <tr class="table-dark">
                  <th scope="col">商品圖片</th>
                  <th scope="col">品名</th>
                  <th scope="col">價格</th>
                  <th scope="col">數量</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr v-for="item in carts" :key="item.id">
                  <th>
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.id"
                      width="150"
                      class="img-fluid"
                    />
                  </th>
                  <td>{{ item.product.title }}</td>
                  <td>NT$ {{ item.product.price }}</td>
                  <td>
                    <div class="d-inline-block">
                      <div class="d-flex border border-2 border-dark">
                        <button
                          type="button"
                          class="btn btn-outline-dark border-0"
                          @click="count(item.id, item.qty, false)"
                        >
                          <span class="material-symbols-outlined fs-6">
                            remove
                          </span>
                        </button>
                        <div
                          class="px-2 d-flex justify-content-center align-items-center"
                        >
                          <VField
                            name="number"
                            type="number"
                            v-model="item.qty"
                            rules="required"
                            ref="count"
                          >
                            {{ item.qty }}
                          </VField>
                        </div>
                        <button
                          type="button"
                          class="btn btn-outline-dark border-0"
                          @click="count(item.id, item.qty, true)"
                        >
                          <span class="material-symbols-outlined fs-6">
                            add</span
                          >
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn-close"
                      @click="removeCart(item.id)"
                    ></button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5" class="text-end" v-if="finalTotal !== total">
                    折扣後金額：{{ Math.round(finalTotal) }}
                  </td>
                  <td colspan="5" class="text-end" v-else>
                    總金額：{{ total }}
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="border-0 text-start px-0">
                    <VForm @submit="couponSubmit">
                      <div class="d-inline-block">
                        <div class="d-flex align-items-center bg-white">
                          <VField
                            type="text"
                            name="coupon"
                            class="form-control w-auto border-0 bg-transparent"
                            placeholder="請輸入折價卷碼"
                            aria-label="請輸入折價卷碼"
                            v-model="code"
                          />
                          <button
                            type="submit"
                            class="d-flex bg-transparent border-0"
                          >
                            <span class="material-symbols-outlined fs-6"
                              >add</span
                            >
                          </button>
                        </div>
                      </div>
                    </VForm>
                  </td>
                  <td colspan="1" class="border-0 text-end px-0">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="$router.push({ name: 'pay' })"
                    >
                      下一步
                    </button>
                  </td>
                </tr>
                <tr class="px-0 text-start">
                  <span class="p-0">首購族優惠碼：first5off</span>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="col-12 col-lg-2"></div>
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
  inject: ['toast'],
  methods: {
    getCarts () {
      this.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/cart`
      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.finalTotal = res.data.data.final_total
            this.total = res.data.data.total
            this.carts = res.data.data.carts
          } else {
            this.toast('error', '尚未抓到資料')
          }
        })
        .catch((error) => {
          this.isLoading = false
          this.toast('error', '尚未抓到資料')
          console.error('cart-getCarts error', error)
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
    },
    count (id, qty, state) {
      let num = qty
      if (state === true) {
        num++
      } else {
        num--
      }
      if (num >= 10 || num <= 0) {
        return
      }
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/cart/${id}`
      this.axios
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
    }
  },
  created () {
    this.getCarts()
  }
}
</script>
