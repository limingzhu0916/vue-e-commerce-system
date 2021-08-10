import Vue from 'vue'
// 导入富文本编辑器 -- 添加商品页使用的
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)