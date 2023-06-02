<template>
	<div
		class="border border-slate-300 bg-slate-500/60 dark:bg-slate-600/80 w-full text-sm overflow-x-auto inline-block whitespace-nowrap max-sm:text-sm"
	>
		<table class="table-auto border-collapse w-full">
			<thead
				class="text-left bg-gradient-to-r from-theme-primary to-theme-secondary"
			>
				<tr class="border border-slate-700">
					<TableHeader
						v-for="header in tableHeaders"
						:text="header.title"
						:class="header.class"
					></TableHeader>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="post in postsList"
					:key="post.globalId"
					class="group even:bg-slate-500/80 even:dark:bg-slate-500/80"
				>
					<TableCell class="text-right font-mono">
						{{ post.globalId }}
					</TableCell>
					<TableCell>
						<Popper class="w-full" offset-distance="2">
							<button
								class="w-full transition text-left underline decoration-1 underline-offset-2 decoration-dashed hover:text-slate-800 discreet-link"
							>
								{{ post.title }}
							</button>
							<template #content>
								<img
									class="transition w-48 h-60 rounded-sm opacity-80 hover:brightness-105 hover:opacity-100"
									:alt="post?.alt ?? post.title"
									ref="image"
									:src="getImagePath(post.source)"
								/>
							</template>
						</Popper>
					</TableCell>
					<TableCell>
						<router-link class="discreet-link" :to="`/topic/${post.topicID}`">
							{{ post.topic }}
						</router-link>
					</TableCell>
					<TableCell>
						<a class="discreet-link" :href="post.link" target="_blank">
							{{ prettifyURL(post.link) }}
						</a>
					</TableCell>
					<TableCell class="font-mono">
						{{ DateUtils.objectToDate(post.date) }}
					</TableCell>
				</tr>
			</tbody>
		</table>
	</div>
	<div>
		<div class="my-2">
			<h3 class="text-lg text-slate-800 dark:text-slate-200">
				Download the data
			</h3>
			<div class="text-slate-700 dark:text-slate-300 space-y-2">
				<p>
					Here, you can download the raw data (also available in the repository)
					and the parsed data. The provided JSON files are minified, since
					they're obtained directly from the compiled code.
				</p>
				<p>
					The raw data was typed manually and contains the basic data, such as
					dates in simple format and text descriptions. The parsed data also
					contains other information which is generated on the fly for the
					website to work, which includes diferent kinds of IDs, dates as
					JavaScript objects, and other properties.
				</p>
				<p>
					You'll want to get the raw data if you'd just like to browse the
					database or if you want to process the data yourself; otherwise, if
					you want to get all the information you can at once, get the parsed
					data.
				</p>
			</div>
		</div>
		<div class="flex gap-2">
			<button
				v-for="button in downloads"
				@click="downloadFile(button.blob, button.filename)"
				class="btn-slate"
			>
				{{ button.title }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { saveAs } from 'file-saver';
import Posts from '@/../posts.json';
import { prettifyURL, getImagePath, DateUtils } from '@/js/utils';
import TableHeader from '!/home/list/TableHeader.vue';
import TableCell from '!/home/list/TableCell.vue';
import { usePostsStore } from '@/stores/posts.js';

const postsStore = usePostsStore();

const tableHeaders = [
	{ title: 'ID', class: 'w-12' },
	{ title: 'Name' },
	{ title: 'Topic' },
	{ title: 'Link' },
	{ title: 'Date' },
];

const postsList = postsStore.getPostsList;

const downloads = [
	{
		title: 'Raw data',
		blob: new Blob([JSON.stringify(Posts)], { type: 'application/json' }),
		filename: 'posts.json',
	},
	{
		title: 'Parsed data',
		blob: new Blob([JSON.stringify(postsList)], { type: 'application/json' }),
		filename: 'parsedData.json',
	},
];
function downloadFile(blob, filename) {
	saveAs(blob, filename);
}
</script>

<style scoped>
:deep(.popper) {
	@apply bg-slate-800/20 p-3 backdrop-blur-sm hover:bg-slate-800/20 rounded-md border-2 border-slate-200;
}
</style>
