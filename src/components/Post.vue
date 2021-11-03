<template>
      <div id="post" class="card">
            <div id="header" class="card-header">
                  <Avatar  id="avtar" :user_id="author"/>
                  <div class="title center-text">{{title}}</div> 
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

<style scoped>
      
#post #header {
      display: grid;
      grid-template-columns: 0.5fr 1.5fr;
      align-items: center;
}


</style>
