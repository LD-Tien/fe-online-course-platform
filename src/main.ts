import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import store from '@/store'
import VueVideoPlayer from '@videojs-player/vue'

import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import '@/assets/main.css'
import 'video.js/dist/video-js.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store)
app.use(router)
app.use(CKEditor)
app.use(VueVideoPlayer)

app.mount('#app')
