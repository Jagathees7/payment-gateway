import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' 
import BootstrapVue3 from 'bootstrap-vue-3'
import '@/assets/css/style.css'
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App)
  .use(createPinia())
  .use(Toast)
  .use(BootstrapVue3)
  .use(router)
  .mount('#app')
