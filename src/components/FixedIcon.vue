<template>
  <div class="d-block d-lg-none position-fixed bottom-0 end-0 m-4  btn-search">
    <div class="input-group">
      <input
        type="text"
        name="text"
        class="form-control me-3"
        :class="showInput === true ? 'd-block' : 'd-none'"
        placeholder="請輸入關鍵字"
        aria-label="請輸入關鍵字"
        aria-describedby="button-addon2"
        ref="searchFixed"
      />
      <button
        type="button"
        id="button-addon2"
        class="d-flex bg-dark p-2 border-0"
        @click="searchSubmit($refs.searchFixed.value)"
      >
        <span class="material-symbols-outlined text-secondary fs-5">search</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showInput: false
    }
  },
  methods: {
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
  }
}
</script>
