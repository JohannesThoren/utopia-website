// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/. // TODO reverse the list of posts!!

<template>
	<div id="list">
		<Post
			v-for="post in posts"
			:key="post"
			:author="post['author']"
			:title="post['title']"
			:content="post['content']"
			:flag="post['flag']"
			:id="post['id']"
			:board_id="post['board']"
		/>
	</div>
</template>

<script>
import Post from "./Post.vue";

export default {
	name: "PostList",
	data() {
		return {
			posts_to_load: [],
			post_index: 0,
		};
	},
	components: {
		Post,
	},
	props: {
		posts: Array,
	},

};
</script>

<style scoped>
#list {
	width: 50%;
	height: 40%;
	margin: auto;
}

#btn {
	width: 100%;
	margin-bottom: 10px;
}
</style>
