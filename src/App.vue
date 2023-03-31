<script setup></script>

<template>
	<div class="flex items-center justify-center max-sm:mb-4">
		<div
			class="transition px-4 py-1 bg-slate-600/60 dark:bg-gray-800/60 hover:bg-slate-600/20 dark:hover:bg-slate-800/20 rounded-lg"
		>
			<h1
				class="select-none bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary"
			>
				TheTinMen
			</h1>
		</div>
	</div>

	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
	<p
		class="mt-2 text-sm text-center mx-2 text-slate-700 dark:text-slate-300 font-normal"
	>
		The creators of this website are not affiliated with the administrator of
		the Instagram account. This project has been created with their permission.
	</p>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
