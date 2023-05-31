<template>
	<NavBar />

	<div class="max-w-7xl mx-auto p-5 pt-0">
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
		<p>
			The creators of this website are not affiliated with the administrator of
			the Instagram account. This project has been created with their
			permission.
		</p>
		<p>Posts: All rights reserved. &copy;2023 TheTinMen</p>
		<p>Code: Some rights reserved. MIT License &copy;2023 BackThePortal</p>
	</div>
</template>

<script setup>
import NavBar from '!/home/NavBar.vue';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

p {
	@apply mt-2 text-sm text-center mx-2 text-slate-700 dark:text-slate-300 font-normal;
}
</style>
