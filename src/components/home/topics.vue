<template>
<div class="flex flex-wrap gap-5 justify-center w-full">
	<Topic v-for="(topic, index) in Posts" :data="topic" :id="index" />
</div>
</template>

<script setup>
import Topic from './topics/topic.vue';
import Posts from '@/../posts.json';
</script>

<style scoped>

</style>