<template>
  <div>
    <div id="header" class="top-bar darker">
          <div id="header-left-bar"></div>
          <input class="input" type="text" placeholder="Search Utopia forums">
          <div id="header-right-bar">
                <Avatar v-if="$store.state.authorized" id="{{$store.state.user_id}}"/>
                <button v-if="!$store.state.authorized" class="button">Sign In</button>
          </div>
    </div>
  </div>
</template>

<style>
#header {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr;
      min-height: 60px;
}

#header-right-bar {
      padding: 5px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
}

.button * {
      color: white;
      text-decoration: none;
}

</style>

<script>
import Avatar from '../components/Avatar.vue'


export default {
      name: 'SiteHeader',
      components: {
            Avatar,
      }
};
</script>