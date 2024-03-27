<template>
  <HeaderComponent />
  <AsideComponent />

  <main class="has-aside-layout has-header-layout">
    <section class="section-layout container text-center">
      <div class="py-40 py-lg-80">
        <h2 class=" text-primary lh-lg m-0 pb-4 ff-serif text-uppercase">Q&A</h2>

        <div class="accordion accordion-flush max-w-50 m-auto bg-primary" id="accordionFlushExample">
          <div class="accordion-item" v-for="item in tabsItem"
            :key="item.id">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#${item.id}`"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                {{ item.title }}
              </button>
            </h2>
            <div
              :id="item.id"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body"  v-html="item.content"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    AsideComponent,
    FooterComponent
  },
  data () {
    return {
      tabsItem: [
        {
          id: 'shopping',
          title: '購物流程',
          state: true,
          content:
            '1.選擇【商品】。<br>2.按【加入購物車】。<br>3.在購物車按【結帳】。<br>4.填寫相關資料，完成後按【確定】。<br>5.確認訂單資訊，完成後按【結帳】。<br>6.確認金額資訊，完成後按【確定】。'
        },
        {
          id: 'pay',
          title: '付款流程',
          state: false,
          content:
            '1.7-11超商取貨付款。<br>2.全家超商取貨付款。<br>3.線上刷卡。<br>4.ATM轉帳。'
        },
        {
          id: 'transport',
          title: '運送方式',
          state: false,
          content:
            '【7-11、全家、萊爾富超商、OB門市取貨】<br>1.單筆購物滿$1,000元即享免運費優惠，購物未滿$1,000元酌收物流服務費$60元。<br>2.請於出貨後5日內完成取件，逾期退回無法重新出貨。<br>3.台灣外島地區目前僅開放『全家便利商店』取貨服務。<br>4.OB門市取貨、超商取貨不付款(或是$0元)訂單，須出示與包裹姓名相同的身分證明文件檢核方可領取。<br><br>【黑貓宅配】<br>1.物流服務費$120元。 <br>2.黑貓宅配出貨後1-2天送達指定地點，宅配範圍限於台灣本島地區。<br>3.請保持電話暢通避免錯過貨物送達，並於7日內完成簽收，逾期退回無法重新出貨。<br><br>※ 注意事項：<br>1.免運資格以單筆訂單實際金額計算(不含物流費、折價券、優惠碼、熊幣抵用金額)。'
        },
        {
          id: 'commodity',
          title: '退換貨方式',
          state: false,
          content:
            '【七天鑑賞期】<br>由消費者完成簽收取件的隔日開始算起至第7天止，為七日鑑賞期限。<br>退貨時商品必須是全新且完整包裝狀態。<br><br>【瑕疵商品】<br>瑕疵的定義︰布料破損、嚴重脫線、大片髒污、拉鍊壞掉等明顯瑕疵。<br>須於七天鑑賞期內告知，超過期限無法受理<br><br>【退貨說明】<br>如欲取消訂單，於請訂單資訊中查詢訂單狀態為「未處理」可於線上自行取消。<br>若您有換貨需求，請辦理退貨後再重新訂購。<br>※提醒您：內衣、內褲、襪子等貼身衣物，基於衛生考量，恕不接受退換貨服務。<br>若退貨後不符合滿額送贈品活動，請將贈品一併退回才可受理退貨服務(如未一同退回則視同願意以原價購買)。<br>※提醒您：如因個人因素退貨次數過多，50%將會暫停或終止您在網站購物的權益與資格，敬請見諒。'
        }
      ],
      tabItem: null
    }
  },
  created () {
    this.tabItem = this.tabsItem.filter((item) => item.state === true)
  }
}
</script>
