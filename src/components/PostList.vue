<template>
      <div>
            <Post :v-for="post in data" author="{{post[0]}}" title="{{post[1]}}" content="{{post[2]}}"/>
      </div>
      
</template>

<script>
import Post from "./Post.vue"

export default {
      name: "PostList",
      comments:  {
            Post,
      },
      data() {
            return {
                  data: ""
            }
      }
}
</script>

<style>

</style>