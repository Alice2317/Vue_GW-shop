<template>
  <div class="position-fixed bottom-0 end-0 m-3">
    <div class="mt-2">
      <button type="button" class="d-flex border-0 bg-dark p-2 fixedBtn-radius" @click="scrollTop">
        <span class="material-symbols-outlined text-secondary fs-5">arrow_upward</span>
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
    scrollTop () {
      window.scroll({
        top: 0
      })
    }
  }
}
</script>
