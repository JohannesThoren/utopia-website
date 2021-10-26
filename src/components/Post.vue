<template>
      <div class="card dark">
            <div class="card-header darker">
                  <Avatar  :user_id/>
                  <span class="title center-text">{{title}}</span> 
            </div>
            <div class="card-content">
                  {{content}}
                  </div>
      </div>
</template>

<script>
import Avatar from  "./Avatar.vue";

export default {
      name: "Post",
      props: {
            author: String,
            title: String,
            content: String
      },
      components: {
            Avatar,
      },

}
</script>

<style>

</style>