// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/.

<template>
	<div id="home">
		<BoardsList id="side" :arr_boards="top_boards" title="Top Followed Boards"/>
		<PostList :post_list="posts"/>
		<BoardsList id="side" :arr_boards="new_boards" title="New Boards"/>
	</div>
</template>

<script>
import BoardsList from "../components/BoardsList.vue";
import PostList from "../components/PostList.vue"
import { api_get_call } from "../api_calls";

export default {
	name: "Home",
	components: {
		BoardsList,
		PostList,
	},
	data() {
		return {
			posts: [],
			new_boards: [],
			top_boards: [],
			followed_boards: [],
		};
	},
	async created() {
		const data = await api_get_call(
			this.$store.state.api_root,
			`/get/100/global/posts`
		);

		for (var index in data) {
			this.posts.push(data[index]);
		}

		const boards_new = await api_get_call(
			this.$store.state.api_root,
			"boards/get/all"
		);
		for (let board in boards_new) {
			this.new_boards.push(boards_new[board]);
		}

		const boards_top = await api_get_call(this.$store.state.api_root, `/boards/10/top`)

		for (let board in boards_top) {
			this.top_boards.push(boards_top[board])
		}
	},
};
</script>

<style scoped>

#side {height: fit-content;}

#home {
	display: grid;
	grid-template-columns: 25vw 40vw 25vw;
	gap: 0.625rem;
}
</style>
