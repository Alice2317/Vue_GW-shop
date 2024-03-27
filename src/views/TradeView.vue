<template>
  <HeaderComponent />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-header-layout">
    <section
      class="d-flex justify-content-center pt-80 pb-40 position-relative"
    >
      <div
        class="p-2 p-lg-20 text-center border-dark me-2 bg-dark text-light opacity-50"
      >
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step1</h3>
        <h5 class="fs-md-6 m-0 pt-4">確認訂單</h5>
      </div>
      <div
        class="p-2 p-lg-20 text-center border-dark me-2 bg-dark text-light opacity-50"
      >
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step2</h3>
        <h5 class="fs-md-6 m-0 pt-4">填寫資料</h5>
      </div>
      <div class="p-2 p-lg-20 text-center border-dark bg-secondary">
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step3</h3>
        <h5 class="fs-md-6 m-0 pt-4">交易結果</h5>
      </div>
    </section>

    <section class="container pb-40 pb-lg-80">
      <div class="row">
        <div class="col-12 col-lg-3"></div>
        <div class="col-12 col-lg-6">
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-center">
              <span class="material-symbols-outlined fs-1"> check_circle </span>
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
              <button type="submit" class="btn btn-secondary" @click.prevent="$router.push('/')">回首頁</button>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-3"></div>
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
      this.axios.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.order = res.data.order
          this.user = res.data.order.user
          this.products = res.data.order.products
          this.date = this.dateString(this.order.create_at)
        } else {
          this.toast('error', '尚未抓到資料')
        }
      }).catch((error) => {
        this.isLoading = false
        this.toast('error', '尚未抓到資料')
        console.error('trade-getOrder error', error)
      })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
