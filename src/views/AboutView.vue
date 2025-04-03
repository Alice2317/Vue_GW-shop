<template>
  <HeaderComponent />

  <main class="has-header-layout">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="card mt-80">
            <img
              src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="about"
              width="320"
              height="320"
              class="card-img object-fit-cover max-height-350 opacity-75"
            />
            <div
              class="card-img-overlay d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="text-primary ff-serif text-uppercase">about GW</h2>
              <p class="card-text pb-20 fw-bold">找到最適合服飾，散發您的美</p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-center py-20">
            <div class="d-flex flex-column flex-md-row m-20 align-items-center">
              <span class="material-symbols-outlined me-2"> sell </span>
              <p class="m-0">平價商店</p>
            </div>
            <div class="d-flex flex-column flex-md-row m-20 align-items-center">
              <span class="material-symbols-outlined me-2"> thumb_up </span>
              <p class="m-0">品牌保證</p>
            </div>
            <div class="d-flex flex-column flex-md-row m-20 align-items-center">
              <span class="material-symbols-outlined me-2"> star </span>
              <p class="m-0">服務一流</p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <p class="m-0 pb-20 pb-lg-80 text-start text-md-center">
            我們對自己更高的期許，也是品牌的使命，期望在這裡的每一個你都能輕鬆擁有屬於你的美麗。
            <br /><br />
            讓美好生活觸手可及，堅持不分年齡、性別、身形，讓人人都有追求美麗的自由，進而從容展現自信喜悅的美好！
          </p>
        </div>
      </div>
    </div>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>
