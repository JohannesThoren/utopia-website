<template>
  <div>
    <SiteHeader />
    <PostList :threadId="$route.params.threadId" />
  </div>
</template>

<script>
import SiteHeader from "../components/SiteHeader.vue";
import PostList from "../components/PostList.vue";

export default {
  name: "Thread",
  components: {
    SiteHeader,
    PostList,
  },


};
</script>