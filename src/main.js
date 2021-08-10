import Vue from 'vue'
import App from './App.vue'
import router from './router'

// element-ui
import './plugins/element'
// vue-quill-editor
import './plugins/editor'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
