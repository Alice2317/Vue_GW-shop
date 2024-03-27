<template>
  <aside class="aside bg-body">
    <h3 class="aside-title ff-serif mb-0 mb-lg-4 text-uppercase">TAGS</h3>
    <ul
      class="nav pt-0 pt-lg-12 flex-row flex-nowrap overflow-auto flex-lg-column scrollBar-transparent"
    >
      <li
        class="nav-item"
        v-for="(item, index) in category"
        :key="`${item}${index}`"
      >
        <router-link
          class="nav-link px-12 px-lg-0 fw-bold  text-uppercase"
          :to="`/products/${item}`"
          >{{ item }}</router-link
        >
      </li>
    </ul>
    <h2
      class="position-absolute bottom-0 start-0 writing-mode-vertical ls-sm text-uppercase ff-serif fw-bolder text-primary d-none d-lg-block"
    >
      Fashion
    </h2>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      category: ['all']
    }
  },
  inject: ['changeTabs'],
  methods: {
    getCategory () {
      this.category = ['all']
      const api = `
      ${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/products
      `
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.changeTabs(res.data.products, /[a-zA-Z]/, this.category)
        } else {
          this.toast('error', '尚未抓到資料')
        }
      }).catch((error) => {
        this.toast('error', '尚未抓到資料')
        console.error('getCategory error', error)
      })
    }
  },
  created () {
    this.getCategory()
  }
}
</script>
