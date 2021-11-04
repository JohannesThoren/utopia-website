// TODO reverse the list of posts!!

<template>
  <div id="list">
    <button id="btn" @click="redirect_add" v-if="$store.state.authorized" class="btn center-text">
      New Post
    </button>
    <Post
      v-for="post in posts"
      :key="post"
      :author="post['author']"
      :title="post['title']"
      :content="post['content']"
    />
  </div>
</template>

<script>
import Post from "./Post.vue";
import { api_root } from "../globalvars";

export default {
  name: "PostList",
  components: {
    Post,
  },
  props: {
    threadId: String,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
        redirect_add() {
            this.$router.push(`/t/${this.$route.params.threadId}/new`);

        }
  },
  async created() {
    const url = `${api_root}thread/${this.$route.params.threadId}/posts/get/all`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    for (var index in data) {
      this.posts.push(data[index]);
    }
  },
};
</script>

<style scoped>
#list {
  width: 50%;
  height: 40%;
  margin: auto;
}

#list * {
  margin-top: 10px;
}

#btn {
  width: 100%;
}
</style>