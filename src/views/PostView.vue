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
					Author:
					<router-link :to="'/p/' + post.author">{{ authorName }}</router-link>
				</p>
				<p>
					Board:
					<router-link :to="'/b/' + post.board">{{ boardName }}</router-link>
				</p>
				<p>Posted: {{ post["created"] }}</p>
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

			<div v-if="$store.state.authorized" class="card" id="new-comment">
				<div class="card-content">
					<textarea id="comment-field" class="text-area" placeholder="comment..."></textarea>
					<button class="btn" id="publish-btn">Publish Comment</button>
				</div>
			</div>
		</span>
	</div>
</template>

<script>
import { api_get_call } from "../api_calls";
export default {
	name: "PostView",
	components: {},
	data() {
		return {
			post: "",

			authorName: "",
			boardName: "",
		};
	},
	async created() {
		this.post = await api_get_call(
			this.$store.state.api_root,
			"post/" + this.$route.params.id
		);
		console.log(this.post);

		console.log(this.post.author);
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
};
</script>

<style scoped>
#publish-btn {
	width: 100%;
}

#comment-field {
	width: 100%;
	height: 100px;
	box-sizing: border-box;
}

#new-comment {
	margin-top: 10px;

}

#wrapper {
	display: grid;
	grid-template-columns: 0.25fr 1fr 0.25fr;
	gap: 10px;
}

.card-header {
	padding: var(--padding-medium);
	gap: 10px;
}

#post-image {
	margin: auto;
	width: auto;
	max-width: 100%;
	max-height: 700px;
	border: inherit;

	box-sizing: border-box;
}

#image-card-content {
	margin: auto;
	display: flex;
	justify-content: center;
}

#info {max-height: 250px;}
.card-content {padding: var(--padding-large)}
</style>
