import { createApp } from 'vue';
import App from './App.vue';

import Popper from 'vue3-popper';

import router from '@/router';

import './css/main.css';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App).use(pinia).use(router).component('Popper', Popper).mount('#app');
