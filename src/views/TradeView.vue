<template>
  <HeaderComponent />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-header-layout">
    <section class="container">
      <div class="py-80 py-40 max-width-600 m-auto">
        <div class="min-height-120">
          <div class="mx-40 position-relative">
            <div class="progress" style="height: 1px">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            <div
              class="d-flex flex-column align-items-center position-absolute top-0 start-0 translate-middle mt-28"
            >
              <p
                class="bg-gray width-32 height-32 rounded-circle text-light d-flex justify-content-center align-items-center"
              >
                <span class="material-symbols-outlined fs-6"> done </span>
              </p>
              <p class="text-nowrap opacity-75">確認訂單</p>
            </div>
            <div
              class="d-flex flex-column align-items-center position-absolute top-0 start-50 translate-middle mt-28"
            >
              <p
                class="bg-gray width-32 height-32 rounded-circle text-light d-flex justify-content-center align-items-center"
              >
                <span class="material-symbols-outlined fs-6"> done </span>
              </p>
              <p class="text-nowrap opacity-75">填寫資料</p>
            </div>
            <div
              class="d-flex flex-column align-items-center position-absolute top-0 start-100 translate-middle mt-28"
            >
              <p class="bg-primary width-32 height-32 rounded-circle text-light d-flex justify-content-center align-items-center">3</p>
              <p class="text-nowrap">交易結果</p>
            </div>
          </div>
        </div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item text-center">
            <span class="material-symbols-outlined fs-1 text-primary">
              check_circle
            </span>
            <h5 class="my-4 fw-bold">交易成功</h5>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>訂單編號</span>
            <span>{{ order.id }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>訂單總金額</span>
            <span>{{ Math.round(order.total) }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>交易時間</span>
            <span>{{ date }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>會員姓名</span>
            <span>{{ user.name }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>送貨地址</span>
            <span>{{ user.address }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-center align-items-center pt-4"
          >
            <router-link class="btn btn-dark" to="/">回首頁</router-link>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'

export default {
  inject: ['toast', 'dateString'],
  components: {
    HeaderComponent,
    LoadingComponent
  },
  data () {
    return {
      isLoading: false,
      order: [],
      user: {},
      products: [],
      date: ''
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/order/${this.$route.params.orderId}`
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order
            this.user = res.data.order.user
            this.products = res.data.order.products
            this.date = this.dateString(this.order.create_at)
          } else {
            this.toast('error', '尚未抓到資料')
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '尚未抓到資料')
          console.error('trade-getOrder error', error)
          this.isLoading = false
        })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
