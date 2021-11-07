<template>
  <SiteHeader />
  <div id="left-bar" class="card">
    <div class="card-header">
      <div class="title center-text">{{ name }}'s Info</div>
    </div>
    <div id="left-bar-content " class="center-text card-content">
      <img id="img" src="{{image}}" />
      <p id="description" class="background-accent-2">
        <span class="subtitle">Description</span>
        <br />
        {{ description }}
        <br />
        <button class="btn">Edit</button>
      </p>
    </div>
  </div>

  <div id="user-feed" class="card center-item">
    <div class="card-header">
      <div class="title center-text">Posts From {{ name }}</div>
    </div>
  </div>
</template>

<script>
import SiteHeader from "../components/SiteHeader.vue";
import {api_root} from "../globalvars"
export default {
  name: "Profile",
  components: {
    SiteHeader,
  },
  data() {
    return {
      image: "",
      name: "",
      description: "",
      posts: [],
      currentUserId: "",
    };
  },
  async created() {
    const token = this.$cookie.get("token");
    const url = api_root + "user/get/token/" + token;
    const response = await fetch(url);
    const data = await response.json();
    this.currentUserId = data["id"];
  },
};
</script>


<style scoped>
.card {
  margin-top: 20px;
}

.subtitle {
  color: var(--text-color);
  text-decoration: underline 2px;
}

#left-bar {
  position: absolute;
  width: 20%;
  left: 50px;
  min-height: 500px;
  align-items: center;
}

#user-feed {
  width: 50%;
}

#left-bar-content {
  margin: auto;
}

#description {
  display: grid;
  text-align: left;
  border-left: 4px solid var(--accent-1);
  padding: 5px;
}

#img {
  width: 300px;
  height: 300px;
  border: 2px solid var(--accent-1);
  border-radius: 100%;
  margin: 10px;
}
</style>