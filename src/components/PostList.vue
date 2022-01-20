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
		// creates an event listener on mount
    window.addEventListener("scroll", this.handleScroll);
	},
	unmounted() {
    // removes the event listener created in mounted()
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
    // loads the initial
		loadInitial() {
      // check if post_list[0] == null (not the best approach but an approach)
      // that means that if the 0'th index is null the list is empty or not initialized
      // and we need to wait for it to get initialized or created.
      // which happens in the component calling this component.
			if (this.post_list[0] == null) {
				setTimeout(() => {

          // wait 200 ms and then call the loadMore function 5 times, to load 5 posts.
					for (let i = 0; i < 5; i++) {
						this.loadMore();
					}
				}, 200);
			}
      // if the post_list is initialized we just loads 5 posts by calling loadMore() 5 times
      else {
        for (let i = 0; i < 5; i++) {
					this.loadMore();
				}
			}
		},
		loadMore() {
      // this function loads one more post, so it can be displayed on the screen,
      // it checks if the post_index is not the length of the array,
      // and pushes a post to the post_to_load array.
      // else it will do nothing
			if (this.post_index !== this.post_list.length) {
				this.posts_to_load.push(this.post_list[this.post_index]);
				if (this.post_index < this.post_list.length) {
					this.post_index += 1;
				}
			}
		},

		handleScroll() {
      // gets the listElement reference
			let listElement = this.$refs.list;

      // if the window innerHeight  is the same as the bounding client rect
      // we load more posts. the window inner height changes when we scroll
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
