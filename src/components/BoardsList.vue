// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.

<template>
	<div id="board-list" class="card">
		<div class="title card-header center-text">{{ title }}</div>
		<ul class="card-content">
			<li v-for="board in arr_boards" :key="board.name">
				<BoardLink
					:bool_user_following="fn_is_board_followed(board.id)"
					:str_board_name="board.name"
					:str_board_id="board.id"
					:num_board_followers="board.followers"
					:bool_show_follow_btn="true"
				/>
			</li>
		</ul>
	</div>
</template>

<style scoped>
ul {
	list-style-type: none;
	padding: none;
}

#top-item span:nth-child(2) {
	border-left: 0.5px solid black;
	border-right: 0.5px solid black;
}

#actions {
	margin-left: auto;
}

.title {
	font-size: 1.2em;
}
</style>

<script>
import BoardLink from "./BoardLink.vue";
import { api_get_call } from "../api_calls";
export default {
	name: "BoardsList",
	components: { BoardLink },
	data() {
		return {
			arr_user_following: [],
			x: 0,
		};
	},
	props: {
		arr_boards: Array,
		title: String,
	},
	methods: {
		fn_is_board_followed(id) {
			if (this.arr_user_following.includes(id)) return true;
			else return false;
		},
	},
	async mounted() {
		setTimeout(async () => {
			if (this.$store.state.authorized) {
				const json_user = await api_get_call(
					this.$store.state.api_root,
					"user/get/token/" + this.$cookie.get("token")
				);

				for (var j in json_user["following"]) {
					this.arr_user_following.push(json_user["following"][j]);
				}
			}
		}, 500);
	},
};
</script>
