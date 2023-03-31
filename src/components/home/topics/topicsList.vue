<template>
	<div
		class="flex flex-wrap gap-5 w-full my-8"
		:class="[props.topics.length > 0 ? 'justify-center' : 'justify-start']"
	>
		<Topic
			v-for="topic in props.topics"
			:data="topic"
			:id="topic.id"
			:key="topic.id"
		/>
	</div>
</template>
<script setup>
import Topic from './topic.vue';

const props = defineProps(['topics']);
</script>
