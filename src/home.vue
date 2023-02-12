<template>
<div>
	<span class="text-center mt-8" v-html="`<b>${count.posts}</b> post${count.posts > 1 ? 's' : ''} in <b>${count.topics}</b> topic${count.topics > 1 ? 's' : ''}`"></span>
	<div class="mt-4 w-full py-8 border-y border-slate-300 space-y-8">
		<div class="w-full flex justify-center">
			<MenuButton v-for="menu in menus" :key="menu.name" :name="menu.name" :path="menu.path"/>
		</div>
		<router-view></router-view>
	</div>
	<div class="p-4 text-center">
		<a href="https://github.com/BackThePortal/thetinmen" class="btn-slate" target=_blank>GitHub</a>
	</div>

</div>
</template>

<script setup>
import MenuButton from "@/components/home/menuButton.vue";
import {getPostsList} from "@/js/utils";
import parsedPosts from "@/js/parse";

const count = {
	topics: parsedPosts.flat().length,
	posts: getPostsList(parsedPosts).length
}

const menus = [
	{
		name: 'Topics',
		path: '/home/topics'
	},
	{
		name: 'Posts',
		path: '/home/list'
	},
	{
		name: 'Timeline',
		path: '/home/timeline'
	}
]

</script>
