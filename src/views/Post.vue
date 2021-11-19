// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div>
    <div id="post" class="card center-item">
      <div id="header" class="card-header">
        <Avatar :user_id="str_author_id"/>
        <div class="btn-group">
        <button class="btn" v-if="str_current_user_id == str_author_id && $store.state.authorized">Edit</button>
        <router-link :to="'/b/'+str_board_id" class="btn btn-hollow">To Board</router-link>
        </div>
        <span class="title">Test</span>
      </div>

      <div id="content" class="card-content">
            <pre id="text" v-if="str_flag == 'TEXT'">{{str_content}}</pre>
            <img id="image" v-if="str_flag == 'IMAGE'" :src="str_content" alt="x">
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "../components/Avatar.vue";

import {api_get_call} from "../api_calls"
export default {
  name: "Post",
  components: { Avatar },
  data() {
        return {
              str_author_id: "",
              str_flag: "",
              str_post_id: this.$route.params.id,
              str_content: "",
              str_board_id: "",
              str_current_user_id: this.$store.state.user["id"]
        }
  },
  async created() {
        const data = await api_get_call(this.$store.state.api_root, "post/"+this.str_post_id)
        
        this.str_author_id = data["author"]
        this.str_flag = data["flag"]
        this.str_content = data["content"]
        this.str_board_id = data["board"]
  }
};
</script>

<style scoped>
#image {
  max-height: 50vh;
  margin: auto;
}

#post {
  margin-top: 5px;
  width: 50%;
}
#header {
  display: flex;
  box-shadow: var(--shadow);
  padding: var(--padding-large);
  align-items: center;
}

#header * {
  margin-left: 10px;
  margin-right: 10px;
}

#header .btn {margin: 0}

#content {
  display: grid;

}

#content pre {
  padding: var(--padding-large);
  white-space: pre-line;
  font-family: var(--font);
}

</style>
