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
                class="bg-primary width-32 height-32 rounded-circle text-light d-flex justify-content-center align-items-center"
              >
                2
              </p>
              <p class="text-nowrap">填寫資料</p>
            </div>
            <div
              class="d-flex flex-column align-items-center position-absolute top-0 start-100 translate-middle mt-28"
            >
              <p class="bg-gray width-32 height-32 rounded-circle text-light d-flex justify-content-center align-items-center">3</p>
              <p class="text-nowrap opacity-75">交易結果</p>
            </div>
          </div>
        </div>

        <VForm @submit="paySubmit" v-slot="{ errors }">
          <div class="mb-4">
            <label for="name" class="form-label"
              >姓名<span class="text-danger">*</span></label
            >
            <VField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="user.name"
            />
            <ErrorMessage class="invalid-feedback" name="姓名" />
          </div>

          <div class="mb-4">
            <label for="email" class="form-label"
              >Email<span class="text-danger">*</span></label
            >
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入EMAIL"
              rules="email|required"
              v-model="user.email"
            />
            <ErrorMessage class="invalid-feedback" name="email" />
          </div>

          <div class="mb-4">
            <label for="tel" class="form-label"
              >電話<span class="text-danger">*</span></label
            >
            <VField
              id="tel"
              name="電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              :rules="isPhone"
              v-model="user.tel"
            />
            <ErrorMessage class="invalid-feedback" name="電話" />
          </div>

          <div class="mb-4">
            <label for="county" class="form-label"
              >地址<span class="text-danger">*</span></label
            >
            <div class="address-inputGroup">
              <VField
                id="county"
                name="縣市"
                class="form-control input-address"
                :class="{ 'is-invalid': errors['縣市'] }"
                placeholder="請選擇縣市"
                rules="required"
                v-model="county"
                as="select"
              >
                <option selected disabled value="">請選擇縣市</option>
                <option v-for="item in city" :key="item" :value="item">
                  {{ item }}
                </option>
              </VField>
              <VField
                name="地址"
                class="form-control input-address border-start-0"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                v-model="cityAddress"
                rules="required"
              />

              <ErrorMessage
                class="invalid-feedback error-address"
                name="縣市"
              />
              <ErrorMessage
                class="invalid-feedback error-address"
                name="地址"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="message" class="form-label">留言</label>
            <textarea
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="message"
            ></textarea>
          </div>

          <div
            class="d-flex flex-column-reverse flex-md-row align-items-center justify-content-between"
          >
            <router-link class="pt-3 pt-md-0" :to="{ name: 'cart' }">
              上一步
            </router-link>
            <button type="submit" class="btn btn-dark">付款</button>
          </div>
        </VForm>
      </div>
    </section>
  </main>
</template>

<script>
import { city } from '@/assets/js/city_TW'
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
      user: {},
      carts: [],
      total: 0,
      finalTotal: 0,
      city,
      county: '',
      cityAddress: '',
      message: ''
    }
  },
  inject: ['toast'],
  methods: {
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    paySubmit (val) {
      this.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/order`
      const user = this.user
      const address = this.address
      this.axios
        .post(api, {
          data: {
            user: { ...user, address },
            message: this.message
          }
        })
        .then((res) => {
          if (res.data.success) {
            this.pay(res.data.orderId)
          } else {
            this.toast('error', '失敗，請重新操作')
          }
        })
        .catch((error) => {
          this.toast('error', '失敗，請重新操作')
          console.error('pay-paySubmit error', error)
        })
    },
    pay (id) {
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/pay/${id}`
      this.axios
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.toast('success', '交易成功，正在跳轉至交易明細頁面')
            this.$router.push({ name: 'trade', params: { orderId: id } })

            this.user = {
              name: '',
              email: '',
              tel: '',
              address: ''
            }
            this.message = ''
          } else {
            this.toast('error', '失敗，交易失敗')
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.toast('error', '失敗，交易失敗')
          console.error('pay-pay error', error)
          this.isLoading = false
        })
    }
  },
  computed: {
    address () {
      return `${this.county}${this.cityAddress}`
    }
  },
  mounted () {
    this.carts = localStorage.getItem('carts')
    this.finalTotal = localStorage.getItem('finalTotal')
    this.total = localStorage.getItem('total')
  }
}
</script>
