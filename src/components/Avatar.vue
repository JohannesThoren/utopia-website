<template>
      <div class="avatar dark">
            <img src="">
            <span>{{user}}</span>
      </div>
</template>

<script>
import {api_root} from "../globalvars"

export default {
             
      name: "Avatar",
      props: {
            user_id: String,
      },
      created() {
            const headers = {"Access-Control-Allow-Origin": api_root}
            var request = new Request(api_root+"user/get/id/"+this.user_id)
            fetch(request, {"method": "GET", "headers": headers}).then(response => response.json).then(data => console.log(data))
      },
      computed: {
            user() {
         
                  return "x"
            }
      },
}
</script>

<style>
.avatar {
      padding: 4px;
      max-width: 180px;
      display: flex;
      align-items: center;
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