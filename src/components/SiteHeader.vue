<template>
  <div>
    <div id="header" class="top-bar darker">
      <div id="header-left-bar">
            <div class="title">Utopia</div>
      </div>
      <input id="search" class="input" type="text" placeholder="Search Utopia forums" />
      <div id="header-right-bar">
        <Avatar
          v-if="$store.state.authorized"
          :user_id="$store.state.user['id']"
        />
        <button
          v-if="!$store.state.authorized"
          class="button"
          @click="this.$router.push('signin')"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.input {
  height: 60%;
}

/* #search {text-align: center;} */

#header {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  height: 60px;
  padding: 5px;
  
}

#header-right-bar {
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}

#header-left-bar {

      display: flex;
      align-items: center;
}

.button * {
  color: white;
  text-decoration: none;
}
</style>

<script>
import Avatar from "../components/Avatar.vue";

export default {
  name: "SiteHeader",
  components: {
    Avatar,
  },
};
</script>