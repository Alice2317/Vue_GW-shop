import{H as y}from"./HeaderComponent-My428EEv.js";import{L as x}from"./LoadingComponent-JFYFOA71.js";import{_ as V,r,o as p,a as u,g as a,e,w as _,F as b,x as k,y as m,b as L,t as C,z as S,A as w}from"./index-rs7BpDvm.js";const F=["臺北市","基隆市","新北市","新竹市","新竹縣","桃園市","宜蘭縣","連江縣","釣魚臺","苗栗縣","臺中市","彰化縣","南投縣","嘉義市","嘉義縣","雲林縣","臺南市","高雄市","南海島","澎湖縣","金門縣","屏東縣","臺東縣","花蓮縣"],E={components:{HeaderComponent:y,LoadingComponent:x},data(){return{isLoading:!1,user:{},city:F,message:""}},inject:["toast"],methods:{isPhone(n){return/^(09)[0-9]{8}$/.test(n)?!0:"需要正確的電話號碼"},paySubmit(n){this.isLoading=!0,this.axios.post("https://vue3-course-api.hexschool.io//v2/api/rongapi/order",{data:{user:this.user,message:this.message}}).then(l=>{l.data.success?this.pay(l.data.orderId):this.toast("error","失敗，請重新操作")}).catch(l=>{this.toast("error","失敗，請重新操作"),console.error("pay-paySubmit error",l)})},pay(n){const s=`https://vue3-course-api.hexschool.io//v2/api/rongapi/pay/${n}`;this.axios.post(s).then(l=>{l.data.success?(this.toast("success","交易成功，正在跳轉至交易明細頁面"),this.$router.push({name:"trade",params:{orderId:n}}),this.user={name:"",email:"",tel:"",address:""},this.message=""):this.toast("error","失敗，交易失敗")}).catch(l=>{this.toast("error","失敗，交易失敗"),console.error("pay-pay error",l)})}}},N={class:"has-header-layout"},U=k('<section class="d-flex justify-content-center pt-80 pb-40 position-relative"><div class="p-2 p-lg-20 text-center border-dark me-2 bg-dark text-light opacity-50"><h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step1</h3><h5 class="fs-md-6 m-0 pt-4">確認訂單</h5></div><div class="p-2 p-lg-20 text-center border-dark me-2 bg-secondary"><h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step2</h3><h5 class="fs-md-6 m-0 pt-4">填寫資料</h5></div><div class="p-2 p-lg-20 text-center border-dark bg-dark text-light opacity-50"><h3 class="fs-md-6 m-0 text-uppercase fw-bold">Step3</h3><h5 class="fs-md-6 m-0 pt-4">交易結果</h5></div></section>',1),H={class:"container pb-40 pb-lg-80"},M={class:"row"},q=e("div",{class:"col-12 col-lg-3"},null,-1),B={class:"col-12 col-lg-6"},I={class:"mb-4"},P=e("label",{for:"name",class:"form-label"},"姓名",-1),j={class:"mb-4"},z=e("label",{for:"email",class:"form-label"},"Email",-1),A={class:"mb-4"},D=e("label",{for:"tel",class:"form-label"},"電話",-1),T={class:"mb-4"},G=e("label",{for:"address",class:"form-label"},"地址",-1),J=e("option",{selected:"",disabled:"",value:""},"請選擇地區",-1),K=["value"],O={class:"mb-4"},Q=e("label",{for:"message",class:"form-label"},"留言",-1),R={class:"text-center"},W=e("button",{type:"submit",class:"btn btn-secondary"},"付款",-1),X=e("div",{class:"col-12 col-lg-3"},null,-1);function Y(n,s,l,Z,t,h){const f=r("HeaderComponent"),v=r("LoadingComponent"),i=r("VField"),d=r("ErrorMessage"),g=r("VForm");return p(),u(b,null,[a(f),a(v,{isLoading:t.isLoading},null,8,["isLoading"]),e("main",N,[U,e("section",H,[e("div",M,[q,e("div",B,[a(g,{onSubmit:h.paySubmit},{default:_(({errors:c})=>[e("div",I,[P,a(i,{id:"name",name:"姓名",type:"text",class:m(["form-control",{"is-invalid":c.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:t.user.name,"onUpdate:modelValue":s[0]||(s[0]=o=>t.user.name=o)},null,8,["class","modelValue"]),a(d,{class:"invalid-feedback",name:"姓名"})]),e("div",j,[z,a(i,{id:"email",name:"email",type:"email",class:m(["form-control",{"is-invalid":c.email}]),placeholder:"請輸入EMAIL",rules:"email|required",modelValue:t.user.email,"onUpdate:modelValue":s[1]||(s[1]=o=>t.user.email=o)},null,8,["class","modelValue"]),a(d,{class:"invalid-feedback",name:"email"})]),e("div",A,[D,a(i,{id:"tel",name:"電話",type:"tel",class:m(["form-control",{"is-invalid":c.電話}]),placeholder:"請輸入電話",rules:h.isPhone,modelValue:t.user.tel,"onUpdate:modelValue":s[2]||(s[2]=o=>t.user.tel=o)},null,8,["class","rules","modelValue"]),a(d,{class:"invalid-feedback",name:"電話"})]),e("div",T,[G,a(i,{id:"address",name:"地區",class:m(["form-control",{"is-invalid":c.地區}]),placeholder:"請輸入地區",rules:"required",modelValue:t.user.address,"onUpdate:modelValue":s[3]||(s[3]=o=>t.user.address=o),as:"select"},{default:_(()=>[J,(p(!0),u(b,null,L(t.city,o=>(p(),u("option",{key:o,value:o},C(o),9,K))),128))]),_:2},1032,["class","modelValue"]),a(d,{class:"invalid-feedback",name:"地區"})]),e("div",O,[Q,S(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":s[4]||(s[4]=o=>t.message=o)},null,512),[[w,t.message]])]),e("div",R,[e("button",{type:"button",class:"btn btn-dark me-4",onClick:s[5]||(s[5]=o=>n.$router.push({name:"cart"}))}," 上一步 "),W])]),_:1},8,["onSubmit"])]),X])])])],64)}const oe=V(E,[["render",Y]]);export{oe as default};