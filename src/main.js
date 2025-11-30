//Router
import { router } from './Routers/Router'
//Antd
import Antd from 'ant-design-vue';
//Pinia
import {createPinia} from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

//Antd style
import 'ant-design-vue/dist/reset.css';

const pinia = createPinia()

const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(pinia)
app.mount('#app')
