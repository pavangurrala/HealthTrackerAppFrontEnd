import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './Router'
import 'bootstrap-icons/font/bootstrap-icons.css';
createApp(App).use(router).mount('#app')

