// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div>
    <div id="background" @click="$emit('close-new-post')"></div>
    <div id="new" class="card center-item">
      <div class="card-header">
        <div class="title center-text">Create a New Post</div>
      </div>
      <div class="card-content">
        <div>Post type: <span class="ok-fg">{{str_post_flag}}</span></div>
        <div class="btn-group">
          <button @click="fn_change_flag('TEXT')" class="btn">Text</button>
          <button @click="fn_change_flag('IMAGE')" class="btn">Image</button>
        </div>
        <input v-model="title" class="input" type="text" placeholder="Title" />
        <input v-if="str_post_flag == 'IMAGE'" type="text" class="input" v-model="content" placeholder="Image Url">
        <textarea
          v-if="str_post_flag == 'TEXT'"
          wrap="hard"
          v-model="content"
          id="text"
          class="text-area"
          rows="10"
          placeholder="What is on you'r mind?"
        ></textarea>
        <div class="center-text">
          <span v-if="text_length <= $store.state.postMaxChars"
            >{{ text_length }}/{{ $store.state.postMaxChars }} Characters</span
          >
          <span
            class="warning-fg"
            v-if="text_length > $store.state.postMaxChars"
            >{{ text_length }}/{{ $store.state.postMaxChars }} to many
            characters!
          </span>
        </div>
        <button class="btn" @click="post">Post</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#background {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.8);
  height: 100vh;
  width: 100%;
}
#new {
  width: 50%;
  position: fixed;
  top: 5%;
  left: 25%;
  right: 25%;
  z-index: 101;
}
.card-content {
  display: grid;
  align-items: center;
}

.card-content * {
  margin-top: 10px;
}
</style>

<script>
import { api_post_call } from "../api_calls.js";

export default {
  data() {
    return {
      token: this.$cookie.get("token"),
      thread: this.$route.params.id,
      content: "",
      title: "",
      str_post_flag: "TEXT",

    };
  },
  computed: {
    text_length() {
      return this.content.length;
    },
  },
  methods: {
    async post() {
      const body = { token: this.token, title: this.title, content: this.content, flag: this.str_post_flag};
      const data = await api_post_call(
        body,
        this.$store.state.api_root,
        `board/${this.$route.params.id}/post/new`
      );
      console.log(data);
      this.$emit('close-new-post')
      this.$router.go()
    },

    fn_change_flag(flag) {
      console.log(flag)
      this.str_post_flag = flag
    }
  },
};
</script>