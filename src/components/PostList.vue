// Copyright (c) 2021 Johannes Thorén // // This Source Code Form is subject to
the terms of the Mozilla Public // License, v. 2.0. If a copy of the MPL was not
distributed with this // file, You can obtain one at
http://mozilla.org/MPL/2.0/. // TODO reverse the list of posts!!

<template>
	<div id="list" ref="list" v-if="posts[0] != null">
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

	<div v-else>
		<p class="center-text">Sorry there are no posts yet!</p>
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
		post_list: Array,
	},
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	unmounted() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		loadInitial() {
			if (this.post_list[0] == null) {
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						this.loadMore()
					}
				}, 200);
			} else {
				for (let i = 0; i < 5; i++) {
					this.loadMore();
				}
			}
		},
		loadMore() {
			if (this.post_index != this.post_list.length) {
				this.posts_to_load.push(this.post_list[this.post_index]);
				if (this.post_index < this.post_list.length) {
					this.post_index += 1;
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
	created() {
		this.loadInitial();
	},
	computed: {
		posts() {
			return this.posts_to_load;
		},
	},
};
</script>

<style scoped>
#btn {
	width: 100%;
	margin-bottom: 10px;
}

#list {
	display: grid;
	gap: 15px;
	margin-bottom: 10px;
}
</style>
