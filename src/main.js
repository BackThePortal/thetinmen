import { createApp } from 'vue';
import App from './App.vue';
import './js/theme.js'

import Popper from "vue3-popper";

import router from "@/router";

import './css/main.css';

createApp(App).use(router)
	.component('Popper', Popper)
	.mount('#app');
