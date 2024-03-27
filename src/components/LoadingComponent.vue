<template>
  <VLoading :active="isLoading" :is-full-page="true">
    <div class="loading-box">
      <h1 class="ff-serif loading-text m-0">GW</h1>
    </div>
  </VLoading>
</template>

<script>
export default {
  props: ['isLoading']
}
</script>
