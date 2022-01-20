// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
	<div id="wrapper">
		<div class="card" id="info">
			<div class="card-header center-text title">Info</div>
			<div class="card-content">
				<p>
					Board:
					<router-link :to="'/b/' + post.board">{{ boardName }}</router-link>
				</p>
				<p>
					<i class="fas fa-user"></i> Author:
					<router-link :to="'/p/' + post.author">{{ authorName }}</router-link>
				</p>
				<p><i class="far fa-clock"></i> Posted: {{ post["created"] }}</p>
			</div>
		</div>
		<span>
			<div class="card">
				<div id="post-header" class="card-header shadow title center-text">
					{{ post.title }}
				</div>
				<div v-if="post.flag != 'IMAGE'" class="card-content">
					{{ post.content }}
				</div>
				<div id="image-card-content" v-else class="card-content">
					<img id="post-image" :src="post.content" alt="" />
				</div>
			</div>

			<details class="card" id="comments">
				<summary class="card-header">Show Comments</summary>

				<div v-if="$store.state.authorized" class="card" id="new-comment">
					<div class="card-content">
						<p class="center-text">{{ comment_msg }}</p>
						<p class="center-text warning-fg">{{ comment_err }}</p>
						<textarea
							id="comment-field"
							class="text-area"
							placeholder="comment..."
							v-model="comment"
						></textarea>
						<p v-if="comment_len <= 500">{{ comment_len }}/500</p>
						<p v-if="comment_len > 500" class="warning-fg">
							{{ comment_len }}/500
						</p>

						<button class="btn" id="publish-btn" @click="publish_comment">
							Publish Comment
						</button>
					</div>
				</div>
				<CommentList :post_id="$route.params.id" />
			</details>
		</span>
	</div>
</template>

<script>
import { api_get_call, api_post_call } from "../api_calls";
import CommentList from "../components/CommentList.vue";
export default {
	name: "PostView",
	components: { CommentList },
	data() {
		return {
			post: "",
			authorName: "",
			boardName: "",
			comment: "",

			comment_err: "",
			comment_msg: "",
		};
	},
	computed: {
		comment_len() {
			return this.comment.length;
		},
	},
	async created() {
		this.post = await api_get_call(
			this.$store.state.api_root,
			"post/" + this.$route.params.id
		);
		let author = await api_get_call(
			this.$store.state.api_root,
			`/user/get/id/${this.post.author}`
		);

		let board = await api_get_call(
			this.$store.state.api_root,
			`/board/get/id/${this.post.board}`
		);

		this.authorName = author.username;
		this.boardName = board.name;
	},
	methods: {
		async publish_comment() {
			let token = this.$cookie.get("token");
			let body = { comment: this.comment, token: token };
			if (this.comment != "") {
				let response = await api_post_call(
					body,
					this.$store.state.api_root,
					`/post/${this.$route.params.id}/comment`
				);

				if (response["response code"] != 200) {
					this.comment_err = response.err;
					this.comment_msg = response.msg;
				} else {
					this.$router.go();
				}
			}
		},
	},
};
</script>

<style scoped>
.card {
	min-height: 0px;
}

#comments {
	margin-top: 10px;
}

#comments:hover {
	cursor: pointer;
}

#publish-btn {
	width: 100%;
}

#comment-field {
	width: 100%;
	height: 6.25rem;
	box-sizing: border-box;
}

#new-comment {
	margin-top: 0.625rem;
}

#wrapper {
	display: grid;
	grid-template-columns: 25vw 40vw 25vw;
	gap: 0.625rem;
}

.card-header {
	padding: var(--padding-medium);
	gap: 0.625rem;
}

#post-image {
	margin: auto;
	width: auto;
	max-width: 100%;
	max-height: 43.75rem;
	border: inherit;

	box-sizing: border-box;
}

#image-card-content {
	margin: auto;
	display: flex;
	justify-content: center;
}

#info {
	max-height: max(18.75rem, 40vh);;
}
.card-content {
	padding: var(--padding-large);
}
</style>
