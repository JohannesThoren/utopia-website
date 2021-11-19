// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div id="home">
    <div id="side" class="card"></div>
    <div>
      <Post
      v-for="post in posts"
      :key="post"
      :author="post['author']"
      :title="post['title']"
      :content="post['content']"
      :flag="post['flag']"
      :id="post['id']"
      :board_id="post['board']"/>
    </div>
    <BoardsList id="side"/>
  </div>
</template>

<script>
import BoardsList from '../components/BoardsList.vue'
import Post from '../components/Post.vue'
import { api_get_call } from "../api_calls";

export default {
  name: 'Home',
  components: {
    BoardsList,
    Post,
  },
  data() {
    return {
      posts: []
    }
  },
  async created() {
    const data = await api_get_call(
      this.$store.state.api_root,
      `/get/10/global/posts`
    );

      for (var index in data) {
        this.posts.push(data[index]);
      }

  }

}
</script>

<style scoped>
  #side {
    margin: auto;
    width: 95%;
    margin-top: 0;
  }
  #home {
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    margin-top: 10px;
    justify-content:baseline;
  }
</style>
