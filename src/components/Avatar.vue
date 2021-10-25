<template>
      <div class="avatar dark">
            <img :src="image">
            <span>{{username}}</span>
      </div>
</template>

<script>
import {api_root} from "../globalvars"

export default {
             
      name: "Avatar",
      props: {
            user_id: String,

      },
      data() {
            return {
            username: "",
            image: ""
            }
      },
      async created() {
            const url = api_root+'user/get/id/'+this.user_id
            const response = await fetch(url);
            const data = await response.json();
            this.username = data["username"]
            this.image = data["profile_picture"]
            console.log(this.image)

      },
}
</script>

<style>
.avatar {
      padding: 4px;
      max-width: 180px;
      display: flex;
      align-items: center;
      border-radius: var(--radius);
}

.avatar img {
      width: 36px;
      height: 36px;
      border: 2px solid var(--darkest);
      border-radius: 100%;
      margin-left: 5px;
      margin-right: 5px;
}

.avatar span {
      font-size: 1.2em;
}
</style>