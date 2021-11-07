<template>
      <div id="post" class="card">
            <div id="header" class="card-header">
                  <Avatar  id="avtar" :user_id="author"/>
                  <div class="title center-text">{{title}}</div> 
                  <button class="btn" v-if="currentUserId == author">Edit</button>
            </div>
            <div class="card-content">
                  {{content}}
                  </div>
      
      </div>
</template>       const token = this.$cookie.get("token");
            const url = api_root + "user/get/token/" + token 
            const response = await fetch(url)
            const data = await response.json();
            this.currentuserId = data["id"]

<script>
import Avatar from  "./Avatar.vue";
import {api_root} from "../globalvars"

export default {
      name: "Post",
      data() {
            return {
                  currentUserId: ""
            }
      },
      props: {
            author: String,
            title: String,
            content: String
      },
      components: {
            Avatar,
      },
      async created() {
            const token = this.$cookie.get("token");
            const url = api_root + "user/get/token/" + token 
            const response = await fetch(url)
            const data = await response.json();
            this.currentUserId = data["id"]
      }

}
</script>

<style scoped>
      
#post #header {
      display: grid;
      grid-template-columns: 0.5fr 1.5fr 0.5fr;
      align-items: center;
}


</style>
