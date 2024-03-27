<template>
  <HeaderComponent />
  <LoadingComponent :isLoading="isLoading" />

  <main class="has-header-layout">
    <section class="d-flex justify-content-center pt-80 pb-40 position-relative ">

      <div class="p-2 p-lg-20 text-center border-dark me-2 bg-dark text-light opacity-50">
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step1</h3>
        <h5 class="fs-md-6 m-0 pt-4">確認訂單</h5>
      </div>
      <div
        class="p-2 p-lg-20 text-center border-dark me-2 bg-secondary"
      >
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step2</h3>
        <h5 class="fs-md-6 m-0 pt-4">填寫資料</h5>
      </div>
      <div class="p-2 p-lg-20 text-center border-dark bg-dark text-light opacity-50">
        <h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step3</h3>
        <h5 class="fs-md-6 m-0 pt-4">交易結果</h5>
      </div>
    </section>

    <section class="container pb-40 pb-lg-80">
      <div class="row">
        <div class="col-12 col-lg-3"></div>
        <div class="col-12 col-lg-6">
          <VForm @submit="paySubmit" v-slot="{ errors }">
            <div class="mb-4">
              <label for="name" class="form-label">姓名</label>
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
              <label for="email" class="form-label">Email</label>
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
              <ErrorMessage
                class="invalid-feedback"
                name="email"
              />
            </div>

            <div class="mb-4">
              <label for="tel" class="form-label">電話</label>
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
              <label for="address" class="form-label">地址</label>

              <VField
                id="address"
                name="地區"
                class="form-control"
                :class="{ 'is-invalid': errors['地區'] }"
                placeholder="請輸入地區"
                rules="required"
                v-model="user.address"
                as="select"
              >
                <option selected disabled value="">請選擇地區</option>
                <option v-for="item in city" :key="item" :value="item">
                  {{ item }}
                </option>
              </VField>
              <ErrorMessage
                class="invalid-feedback"
                name="地區"
              />
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

            <div class="text-center">
              <button
                type="button"
                class="btn btn-dark me-4"
                @click="$router.push({ name: 'cart' })"
              >
                上一步
              </button>
              <button type="submit" class="btn btn-secondary">付款</button>
            </div>
          </VForm>
        </div>
        <div class="col-12 col-lg-3"></div>
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
      city,
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
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/order`
      this.axios.post(api, {
        data: {
          user: this.user,
          message: this.message
        }
      })
        .then((res) => {
          if (res.data.success) {
            this.pay(res.data.orderId)
          } else {
            this.toast('error', '失敗，請重新操作')
          }
        }).catch((error) => {
          this.toast('error', '失敗，請重新操作')
          console.error('pay-paySubmit error', error)
        })
    },
    pay (id) {
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/pay/${id}`
      this.axios.post(api)
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
        })
        .catch((error) => {
          this.toast('error', '失敗，交易失敗')
          console.error('pay-pay error', error)
        })
    }
  }
}
</script>
