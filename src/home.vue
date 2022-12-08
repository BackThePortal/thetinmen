<template>
<div>
	<div class="mt-12 flex justify-center w-full gap-5 flex-wrap">
		<Category v-for="post in Posts" :data="post" />
	</div>
</div>
</template>

<script setup>
import Posts from "./../posts.json"
import Category from "@/components/category.vue";


</script>

<style scoped>

</style>