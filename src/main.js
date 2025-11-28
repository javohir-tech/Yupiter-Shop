//Router
import { router } from './Routers/Router'
//Antd
import Antd from 'ant-design-vue';

import { createApp } from 'vue'
import App from './App.vue'

//Antd style
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.use(Antd)
app.use(router)

app.mount('#app')
