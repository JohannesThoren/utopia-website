<template>
      <div class="card dark">
            <div class="card-header darker">
                  <Avatar :img="img" :name="author"/>
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
      data() {
            return {
                  img: "https://cdn.discordapp.com/attachments/828216229754830849/900730122271858698/index.jpg"
            }
      }
}
</script>

<style scoped>
      .card {
            margin-top: 10px;
      }
      .card-header {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
      }
</style>