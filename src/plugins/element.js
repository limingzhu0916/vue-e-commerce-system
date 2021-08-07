import Vue from 'vue'
// elementui样式
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
} from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$message = Message