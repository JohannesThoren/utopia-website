// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/. // TODO add a description card for the board,
containing the board title and description.

<template>
	<div id="board" v-if="b_board_exists">
		<div id="info" class="card">
			<div class="card-header">
				<div class="title center-text">{{ str_board_name }}</div>
			</div>

			<div class="card-content">
				<pre id="description">
          <span class="subtitle">Board Description</span>
          {{str_board_description}}
        </pre>

				<p>
					<i class="fas fa-at"></i> Owner:
					<router-link :to="'/p/' + str_board_owner_id">{{
						str_board_owner
					}}</router-link>
				</p>
				<p>
					<i class="far fa-clock"></i> Board created:
					{{ str_board_created }}
				</p>
				<p>
					<i class="fas fa-user-friends"></i> Followers:
					{{ int_board_followers }}
				</p>

				<router-link
					to="/"
					id="delete"
					class="btn warning-bg"
					@click="delete_board()"
					v-if="
						str_board_owner_id == str_current_user_id &&
						$store.state.authorized
					"
					><i class="fas fa-trash-alt"></i>Delete Board</router-link
				>
			</div>
		</div>

		<div>
			<PostList id="posts" @new-post="b_show_new_post = true" :posts="arr_posts"/>
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
			str_board_name: "",
			str_board_owner: "",
			str_board_owner_id: "",
			str_board_created: "",
			str_board_description: "",
			int_board_followers: 0,
			str_current_user_id: "",
			arr_posts: [],
		};
	},
	methods: {
		async delete_board() {
			const data = await api_post_call(
				{ token: this.$cookie.get("token") },
				this.$store.state.api_root,
				`board/${this.str_board_id}/delete/`
			);
			console.log(data);
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
	// TODO comment this code
	async mounted() {
		setTimeout(async () => {
			if (this.b_board_exists) {
				let data = await api_get_call(
					this.$store.state.api_root,
					`board/get/id/${this.str_board_id}`
				);

				this.str_board_name = data["name"];
				this.str_board_created = data["created"];
				this.str_board_owner_id = data["owner"];
				this.str_board_description = data["description"];
				this.int_board_followers = data["followers"];

				let owner = await api_get_call(
					this.$store.state.api_root,
					`user/get/id/${this.str_board_owner_id}`
				);
				this.str_board_owner = owner["username"];

				if (this.$cookie.get("token")) {
					const token = this.$cookie.get("token");
					const data = await api_get_call(
						this.$store.state.api_root,
						`user/get/token/${token}`
					);
					this.str_current_user_id = data["id"];
				}

				// get posts
				let posts = await api_get_call(this.$store.state.api_root, `board/${this.str_board_id}/posts/get/all`);
				for(let post in posts) {this.arr_posts.push(posts[post]);}
				this.arr_posts.reverse();

			}
		}, 500);
	},
};
</script>

<style scoped>
#board {
	display: grid;
	grid-template-columns: 0.5fr 1fr 0.5fr;
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

#info {max-height: 60vh;}
</style>
