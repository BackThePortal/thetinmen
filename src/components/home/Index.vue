<template>
	<div>
		<div
			class="w-full py-4 sm:py-8 border-b border-gray-700 dark:border-slate-300 space-y-4 xl:space-y-8 z-40"
		>
			<div
				class="w-full flex max-sm:flex-col-reverse max-sm:gap-4 justify-center xl:px-8"
			>
				<div class="basis-full max-sm:hidden"></div>
				<div class="flex justify-center">
					<MenuButton
						v-for="menu in menus"
						:key="menu.name"
						:name="menu.name"
						:path="menu.path"
					/>
				</div>
				<div class="basis-full flex sm:max-xl:justify-end justify-center">
					<SearchBar />
				</div>
			</div>
			<div>
				<router-view></router-view>
			</div>
		</div>
		<div class="p-4 text-center">
			<a
				href="https://github.com/BackThePortal/thetinmen"
				class="btn-slate after:font-[sans-serif] after:content-['_↗']"
				target="_blank"
				>GitHub</a
			>
		</div>
	</div>
</template>

<script setup>
import MenuButton from './MenuButton.vue';
import SearchBar from '!/home/SearchBar.vue';

const menus = [
	{
		name: 'Topics',
		path: '/home/topics',
	},
	{
		name: 'List',
		path: '/home/list',
	},
	{
		name: 'Timeline',
		path: '/home/timeline',
	},
];
</script>

<style scoped></style>
