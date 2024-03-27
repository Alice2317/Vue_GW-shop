<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    data-bs-scroll="true"
    id="offcanvasCart"
    aria-labelledby="offcanvasCartLabel"
    ref="offcanvas"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasCartLabel">購物車</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body" v-if="tempCart.length >= 1">
      <div class="container p-0 border-0">
        <div class="card mb-3 p-0" v-for="item in tempCart" :key="item.id">
          <div class="row g-0">
            <div class="col-3">
              <img
                :src="item.product.imageUrl"
                class="img-fluid"
                :alt="item.id"
              />
            </div>
            <div class="col-8">
              <div class="card-body">
                <h6 class="card-title">{{ item.product.title }}</h6>
                <p class="card-text">
                  {{ item.qty }} X NT$ {{ item.product.price }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="fs-5">NT$ {{ finalTotal }}</span>
          <button type="button" class="btn btn-secondary" @click="goRoute">
            繼續購物
          </button>
        </div>
      </div>
    </div>
    <div class="offcanvas-body" v-else>
      <p>尚未有商品</p>
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

export default {
  data () {
    return {
      tempCart: [],
      finalTotal: 0,
      offcanvas: null,
      id: ''
    }
  },
  props: ['carts'],
  watch: {
    carts () {
      this.tempCart = this.carts.carts
      this.finalTotal = this.carts.final_total
    }
  },
  methods: {
    goRoute () {
      this.offcanvas.hide()
      this.$router.push({ name: 'cart' })
    }
  },
  mounted () {
    this.offcanvas = new bootstrap.Offcanvas(this.$refs.offcanvas)
  }
}
</script>
