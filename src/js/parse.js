import Posts from "@/../posts.json"
import { dateToObject } from "@/js/utils";

// Add ID to topics
let parsedPosts = Posts.slice().map((topic, index) => ({ ...topic, id: index+1 }));
console.log(parsedPosts)
// Add IDs to posts, convert dates to Date object and add last updated property
let i = 1;
parsedPosts.map((topic) => {
	for (let post of topic.posts) {
		post.date = post.date === "" ? null : dateToObject(String(post.date));
		post.id = topic.posts.indexOf(post)+1;
		post.globalId = i;
		i++
	}
	topic.lastUpdated = new Date(Math.max(...topic.posts.map(b => new Date(b.date))));
})
export default parsedPosts;