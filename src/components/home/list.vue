<template>
<div class="border border-slate-300 bg-slate-500 w-full">
	<table class="table-auto border-collapse w-full">
		<thead class="text-left">
			<tr class="border border-slate-700">
				<th class="px-2 w-8 border border-slate-700">ID</th>
				<th class="px-2 border border-slate-700">Name</th>
				<th class="px-2 border border-slate-700">Topic</th>
				<th class="px-2 border border-slate-700">Link</th>
				<th class="px-2 border border-slate-700">Date</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="post in postsList" :key="post.globalId" class="group">
				<td class="px-2 text-right border border-slate-700">
					{{post.globalId}}
				</td>
				<td class="px-2 border border-slate-700">
					{{post.title}}
				</td>
				<td class="px-2 border border-slate-700">
					<router-link class="transition underline underline-offset-2 hover:text-slate-800" :to="`/topic/${post.topicID}`">
						{{post.topic}}
					</router-link>
				</td>
				<td class="px-2 border border-slate-700">
					<a class="transition underline underline-offset-2 hover:text-slate-800" :href="post.link" target="_blank">
						{{prettifyURL(post.link)}}
					</a>
				</td>
				<td class="px-2 border border-slate-700">
					{{objectToDate(post.date)}}
				</td>
			</tr>
		</tbody>
	</table>
</div>
</template>

<script setup>
import { getPostsList, objectToDate, prettifyURL } from "@/js/utils";
import parsedPosts from "@/js/parse";

const postsList = getPostsList(parsedPosts);

</script>

<style scoped>

</style>