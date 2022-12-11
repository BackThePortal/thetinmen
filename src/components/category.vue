<template>
<router-link :class="[small ? 'w-32 h-40' : 'w-64 h-80']" class="transition duration-500 relative group hover:scale-110 cursor-pointer rounded-lg" :to="`/topic/${id+1}`">
	<div class="z-50 absolute w-full h-full flex items-center justify-center">
		<h3 class="w-full transition duration-500 relative text-center text-slate-200 group-hover:opacity-80 select-none rounded-t-none group-hover:rounded-t-lg group-hover:-translate-y-[9.25rem] group-hover:bg-slate-500/80">{{data.name}}</h3>
	</div>
	<div class="z-50 absolute w-full h-full flex items-center justify-center">
		<span class="w-full transition duration-500 relative text-center text-slate-200 opacity-0 group-hover:opacity-75 select-none rounded-b-none group-hover:rounded-b-lg group-hover:translate-y-[9.25rem] group-hover:bg-slate-500/80">{{`${data.posts.length} post${data.posts.length > 1 ? 's' : ''}`}}</span>
	</div>
	<img :alt="data?.alt ?? ''" @load="setColor" ref="thumbnail" :src="getImagePath(data?.thumbnail ?? data.posts[0].source)" :class="[small ? 'w-32 h-40' : 'w-64 h-80']" class="rounded-lg transition duration-500 z-0 brightness-50 group-hover:brightness-90 blur-md group-hover:blur-none shadow-none group-hover:shadow-2xl shadow">
</router-link>
</template>

<script setup>
import ColorThief from 'colorthief';

import { ref, onMounted } from 'vue';
import {getImagePath} from "@/utils";

const props = defineProps(['data', 'id', 'small']);

const colorThief = new ColorThief();
const thumbnail = ref(null);
let color;

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
	const hex = x.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}).join('')

function setColor() {
	color = colorThief.getColor(thumbnail.value);
	// console.log(rgbToHex(...color));
}


</script>

<style scoped>

</style>