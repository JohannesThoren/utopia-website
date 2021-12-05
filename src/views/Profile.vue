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
				<div class="center-text card-content">
					<img id="img" :src="image" />
					<pre id="description" class="background-accent-2">
            <span class="subtitle">Description</span>
            {{ description }}
            <button  class="btn" v-if="currentUserId ==  $route.params.id && $store.state.authorized">Edit Description</button>
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
			image: "",
			name: "",
			description: "",
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
		this.image = user["profile_picture"];
		this.name = user["username"];
		this.description = user["description"];

		const boards = await api_get_call(
			this.$store.state.api_root,
			`user/get/boards/${this.$route.params.id}`
		);
		for (let board in boards) {
			this.boards.push(boards[board]);
			console.log(boards[board]);
			console.log(this.boards[0].name);
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

#description {
	display: grid;
	text-align: left;
	border-left: 4px solid var(--accent-2);
}

#img {
	width: 200px;
	height: 200px;
	border: 2px solid var(--accent-1);
	border-radius: 100%;
	margin: 10px;
}
#wrapper {
	display: grid;
	grid-template-columns: 0.5fr 1fr 0.5fr;
	gap: 10px;
}
.title {
	margin: 0px;
}

#board {
	display: grid;
	align-items: center;
	grid-template-columns: 1fr 1fr;
	margin-top: 5px;
	margin-bottom: 5px;
}

.board-name {
	font-size: 1em;
}
</style>
