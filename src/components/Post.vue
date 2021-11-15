// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div id="post" class="card">
    <div id="header" class="card-header">
      <Avatar id="avtar" :user_id="author" />
      <button
        class="btn"
        v-if="currentUserId == author && $store.state.authorized"
      >
        Edit
      </button>
      <router-link :to="'/post/'+id" class="title center-text">{{ title }}</router-link>
    </div>
    <div id="content" class="card-content">
      <pre v-if="flag == 'TEXT'">{{ content }}</pre>
      <img id="img" v-if="flag == 'IMAGE'" :src="content" alt="" />
    </div>
  </div>
</template>      

<script>
import Avatar from "./Avatar.vue";
import { api_get_call } from "../api_calls";

export default {
  name: "Post",
  data() {
    return {
      currentUserId: "",
      b_blur: true,
    };
  },
  props: {
    author: String,
    title: String,
    content: String,
    flag: String,
    id: String
  },
  components: {
    Avatar,
  },
  async created() {
    const token = this.$cookie.get("token");
    const data = await api_get_call(
      this.$store.state.api_root,
      `user/get/token/${token}`
    );
    this.currentUserId = data["id"];
  },
};
</script>

<style scoped>

#img {
  max-height: 35vh;
  margin: auto;
}

#post {
  margin-bottom: 10px;
  min-height: 25vh;
  max-height: 50vh;
  overflow-y: hidden;
}

#content {
  display: grid;

}

#post #content pre {
  padding: var(--padding-large);
  white-space: pre-line;
  font-family: var(--font);
}
#post #header {
  padding: var(--padding-medium);
  display: flex;
  grid-template-columns: 0.5fr 1.5fr 0.5fr;
  align-items: center;
  box-shadow: var(--shadow);
}

#header * {
  margin: 5px
}
</style>
