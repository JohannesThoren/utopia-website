// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/. // TODO add a description card for the board,
containing the board title and description.

<template>
	<div id="board" v-if="b_board_exists">
		<div id="info" class="card">
			<div class="card-header">
				<div class="title center-text">{{ json_board_data.name }}</div>
			</div>

			<div class="card-content">
				<pre id="description">
          <span class="subtitle">Board Description</span>
          {{json_board_data.description}}
        </pre>

				<p>
					<i class="fas fa-crown"></i> Owner:
					<router-link :to="'/p/' + json_board_data.owner">{{
						json_board_owner_name
					}}</router-link>
				</p>
				<p>
					<i class="fas fa-user-friends"></i> Followers:
					{{ json_board_data.followers }}
				</p>
				<p>
					<i class="far fa-clock"></i> Board created:
					{{ json_board_data.created }}
				</p>

				<div
					class="btn-group"
					v-if="
						json_board_owner.id == json_current_user.id &&
						$store.state.authorized
					"
				>
					<router-link class="btn" :to="'/b/'+str_board_id+'/edit'">Edit Board</router-link>

					<router-link
						to="/"
						id="delete"
						class="btn warning-bg"
						@click="delete_board()"
						><i class="fas fa-trash-alt"></i>Delete Board</router-link
					>
				</div>
			</div>
		</div>

		<div>
			<button
				id="add-btn"
				@click="b_show_new_post = true"
				v-if="$store.state.authorized"
				class="btn center-text"
			>
				<i class="fas fa-pencil-alt"></i> New Post
			</button>
			<PostList id="list" @new-post="b_show_new_post = true" :post_list="arr_posts" />
			<NewPost
				v-if="b_show_new_post"
				@close-new-post="b_show_new_post = false"
			/>
		</div>

		<div></div>
	</div>

	<div v-else>
		<h1 class="title center-text">Board Does Not Exist</h1>
		<div class="center-text">
			<router-link to="/">Go To Home Page</router-link>
		</div>
	</div>
</template>

<script>
import PostList from "../components/PostList.vue";
import NewPost from "../components/NewPost.vue";
import { api_get_call, api_post_call } from "../api_calls.js";

export default {
	name: "board",
	components: {
		PostList,
		NewPost,
	},
	data() {
		return {
			b_board_exists: false,
			b_show_new_post: false,
			str_board_id: this.$route.params.id,
			json_board_owner: "",
			json_current_user: "",
			json_board_data: JSON,
			arr_posts: [],
		};
	},
	methods: {
		// delete the current board if the token of the current user is the same as the owners token.
		async delete_board() {
			const data = await api_post_call(
				{ token: this.$cookie.get("token") },
				this.$store.state.api_root,
				`board/${this.str_board_id}/delete/`
			);
			return data;
		},
	},
	async beforeCreate() {
		let data = await api_get_call(
			this.$store.state.api_root,
			`board/get/id/${this.$route.params.id}`
		);

		if (data["response code"] == 200) {
			this.b_board_exists = true;
		}
	},
	async created() {
		// get the board data
		this.json_board_data = await api_get_call(
			this.$store.state.api_root,
			`board/get/id/${this.str_board_id}`
		);

		// get the board owners name
		this.json_board_owner = await api_get_call(
			this.$store.state.api_root,
			`user/get/id/${this.json_board_data.owner}`
		);

		// if there is a token cookie the get the id of the current user
		if (this.$cookie.get("token")) {
			this.json_current_user = await api_get_call(
				this.$store.state.api_root,
				`user/get/token/${this.$cookie.get("token")}`
			);
		}

		// get the posts for the board
		let posts = await api_get_call(
			this.$store.state.api_root,
			`board/${this.str_board_id}/posts/get/all`
		);

		// push each post into an array then revers the array
		for (let post in posts) {
			this.arr_posts.push(posts[post]);
		}
		this.arr_posts.reverse();
	},

	computed: {
		json_board_owner_name() {
			return this.json_board_owner.username;
		},
	},
};
</script>

<style scoped>
#board {
	display: grid;
	grid-template-columns: 25vw 40vw 25vw;
	gap: 10px;
}

#description {
	padding: var(--padding-small);
	white-space: pre-line;
	font: var(--font);
	border-left: 4px solid var(--accent-2);
	margin: 0px;
	max-height: 200px;
	overflow-y: scroll;
	overflow-x: wrap;
}

#info {
	height: fit-content;
	max-height: 50vh;
}

#add-btn {
	width: 100%;
	margin-bottom: 10px;
}

@media screen {
}
</style>
