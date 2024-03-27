<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
    <div class="col overflow-hidden" v-for="item in products" :key="item.id">
      <router-link :to="`/product/${item.id}`" class="link-dark card2">
        <div class="card bg-dark text-white overflow-hidden" data-aos="zoom-in">
          <img :src="item.imageUrl" class="card-img-top" :alt="item.id" />
          <div
            class="card-img-overlay bg-bottom-dark d-flex justify-content-center align-items-end"
          >
            <p class="card-text text-center">{{ item.title }}</p>
          </div>
        </div>
        <p class="text-center mt-12">
          NT$ {{ item.price }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['products']
}
</script>
