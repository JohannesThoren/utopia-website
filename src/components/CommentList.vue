
<template>
	<ul ref="list">
		<li v-for="comment in computed_comments" :key="comment.id">
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
			comments_to_load: [],
			comments: [],
			comment_index: 0,
		};
	},
	props: { post_id: String },

	async created() {
		let response = await api_get_call(
			this.$store.state.api_root,
			`/post/${this.post_id}/get/comments`
		);

		for (let comment in response) {
			this.comments.push(response[comment]);
		}
		this.comments.reverse();

		this.loadInitial();
	},
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	unmounted() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		loadInitial() {
			if (this.comments[0] == null) {
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						this.loadMore();
					}
				}, 200);
			} else {
				for (let i = 0; i < 5; i++) {
					this.loadMore();
				}
			}
		},
		loadMore() {
			if (this.comment_index != this.comments.length) {
				this.comments_to_load.push(this.comments[this.comment_index]);
				if (this.comment_index < this.comments.length) {
					this.comment_index += 1;
				}
			}
		},

		handleScroll() {
			let listElement = this.$refs.list;
			if (listElement.getBoundingClientRect().bottom < window.innerHeight) {
				this.loadMore();
			}
		},
	},
	computed: {
		computed_comments() {
			return this.comments_to_load;
		},
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