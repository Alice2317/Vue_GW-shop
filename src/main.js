import './assets/scss/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules/dist/vee-validate-rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zh from '@vee-validate/i18n/dist/locale/zh_TW.json'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(router)

// axios
app.use(VueAxios, axios)

// Sweetalert2
app.use(VueSweetalert2)

// loading
app.component('VLoading', Loading)

// vee-validate
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zh })
})
setLocale('zh_TW')

const aos = function () {
  AOS.init()
  AOS.refresh()
}
app.use(aos)

app.mount('#app')
