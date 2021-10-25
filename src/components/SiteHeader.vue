<template>
  <div>
    <div id="header" class="top-bar darker">
          <div id="header-left-bar"></div>
          <input class="input" type="text" placeholder="Search Utopia forums">
          <div id="header-right-bar">
                <Avatar/>
          </div>
    </div>
  </div>
</template>

<style>
#header {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr;
      min-height: 50px;
}

#header-right-bar {
      padding: 5px;
      display: flex;
      flex-direction: row-reverse;
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