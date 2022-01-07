
<template>
	<ul>
		<li v-for="comment in comments" :key="comment.id">
			<Comment
				:user_id="comment.user"
				:comment="comment.comment"
				:date="comment.date"
			/>
		</li>
	</ul>
</template>

<script>
import { api_get_call } from "../api_calls";
import Comment from "./Comment.vue";
export default {
	components: { Comment },
	data() {
		return {
			comments: {},
		};
	},
	props: { post_id: String },

	async created() {
		this.comments = await api_get_call(
			this.$store.state.api_root,
			`/post/${this.post_id}/get/comments`
		);
	},
};
</script>

<style scoped>
ul {
	padding: 0px;
	margin: 0px;
	list-style: none;
}
li {
	margin-top: 20px;
}
</style>