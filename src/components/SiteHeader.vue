<template>
  <div>
    <div id="header" class="top-bar background-accent-1">
      <div id="header-left-bar">
            <div class="title">Utopia</div>
      </div>
      <input id="search" class="input" type="text" placeholder="Search Utopia forums" />
      <div id="header-right-bar">
        <Avatar v-if="$store.state.authorized" :user_id="$store.state.user['id']"/>
        <button
          v-if="!$store.state.authorized" class="btn" @click="this.$router.push('/signin')">  Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

#search {max-height: 50px;}

#header {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  height: 60px;
  padding: 5px;
  align-items: center;
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