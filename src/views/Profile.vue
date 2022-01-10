// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.

<template>
	<div>
		<SiteHeader />
		<div id="wrapper">
			<div id="side" class="card center-item">
				<div class="card-header">
					<div class="title center-text">{{ name }}'s Info</div>
				</div>
				<div class="card-content">
					<div class="center-text">
						<img id="img" alt="profile picture" :src="profile_picture"/>
					</div>
					<pre id="info" class="background-accent-2">
					<span class="subtitle">Info</span>
					{{ info }}
				</pre>
				</div>
			</div>
			<PostList :post_list="posts" />
			<BoardsList
				class="center-item"
				:title="'Boards Owned By ' + name"
				id="side"
				:arr_boards="arr_boards"
			/>
		</div>
	</div>
</template>

<script>
import PostList from "../components/PostList.vue";
import BoardsList from "../components/BoardsList.vue";
import { api_get_call } from "../api_calls.js";

export default {
	name: "Profile",
	components: {
		PostList,
		BoardsList,
	},
	data() {
		return {
			profile_picture: "",
			name: "",
			info: "",
			currentUserId: "",
			arr_boards: [],
			arr_posts: [],
		};
	},
	computed: {
		boards() {
			return this.arr_boards;
		},

		posts() {
			return this.arr_posts;
		},
	},
	async created() {
		if (this.$cookie.get("token")) {
			const token = this.$cookie.get("token");
			const data = await api_get_call(
				this.$store.state.api_root,
				`user/get/token/${token}`
			);
			this.currentUserId = data["id"];
		}

		const user = await api_get_call(
			this.$store.state.api_root,
			`user/get/id/${this.$route.params.id}`
		);
		this.profile_picture = user["profile_picture"];
		this.name = user["username"];
		this.info = user["info"];

		const boards = await api_get_call(
			this.$store.state.api_root,
			`user/get/boards/${this.$route.params.id}`
		);
		for (let board in boards) {
			this.boards.push(boards[board]);
		}

		let posts = await api_get_call(
			this.$store.state.api_root,
			`user/${this.$route.params.id}/get/posts`
		);

		// push each post into an array then revers the array
		for (let post in posts) {
			this.arr_posts.push(posts[post]);
		}
		this.arr_posts.reverse();
	},
};
</script>

<style scoped>
.card {
	margin-top: 0;
	width: 100%;
}

#followers {
	text-align: center;
}

#info {
	padding: var(--padding-small);
	white-space: pre-line;
	font: var(--font);
	border-left: 0.25rem solid var(--accent-2);
	margin: 0rem;
	max-height: 12.5rem;
	overflow-y: scroll;
	overflow-x: wrap;
}

#img {
	width: 12.5rem;
	height: 12.5rem;
	border: 0.125rem solid var(--accent-1);
	border-radius: 100%;
	margin: 0.625rem;
}
#wrapper {
	display: grid;
	grid-template-columns: 25vw 40vw 25vw;
	gap: 0.625rem;
}
.title {
	margin: 0rem;
}

#board {
	display: grid;
	align-items: center;
	grid-template-columns: 1fr 1fr;
	margin-top: 0.3125rem;
	margin-bottom: 0.3125rem;
}

.board-name {
	font-size: 1em;
}
</style>
