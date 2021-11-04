// TODO add a description card for the thread, containing the thread title and description.

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

<style scoped>
.card {
  margin-top: 20px;
  width: 50%;
}
</style>