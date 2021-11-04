<template>
  <div id="new" class="card center-item">
    <div class="card-header">
      <div class="title center-text">Create a New Post</div>
    </div>
    <div class="card-content">
      <input v-model="title" class="input" type="text" placeholder="Title"/>
      <textarea v-model="text" id="text" class="text-area" rows="10" placeholder="What is on you'r mind?"></textarea>
      <div class="center-text">
        <span v-if="text_length < $store.state.postMaxChars"
          >{{ text_length }}/{{ $store.state.postMaxChars }} Characters</span
        >
        <span class="warning-fg" v-if="text_length > $store.state.postMaxChars"
          >{{ text_length }}/{{ $store.state.postMaxChars }} to many characters!
        </span>
      </div>
      <button class="btn" @click="post">Post</button>
    </div>
  </div>
</template>

<style scoped>
#new {
  width: 50%;
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
import {api_root} from '../globalvars.js'

export default {
  data() {
    return {
      token: this.$cookie.get("token"),
      thread: this.$route.params.threadId,
      text: "",
      title: ""
    };
  },
  computed: {
    text_length() {
      return this.text.length;
    },
  },
  methods: {
      async post() {
            const url = `${api_root}thread/${this.$route.params.threadId}/post/new`;
            const body = {"token": this.token, "title": this.title, "content": this.text}
            const response = await fetch(url, {method:"POST", body:JSON.stringify(body)});
            const data = await response.json();
            console.log(data)
      }     
  }
};
</script>