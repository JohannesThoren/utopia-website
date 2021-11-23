// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div>
    <div id="header" class="top-bar shadow">
      <div id="header-left-bar">
        <router-link to="/" class="title">Utopia</router-link>
      </div>
      <input id="search" class="input" type="text" placeholder="Search Utopia forums" />

      <div class="btn-group" v-if="!$store.state.authorized">

        <button
          id="signin"  class="btn" @click="$emit('show-signin')">  Sign In
        </button>

        <button id="signup" class="btn btn-hollow" @click="$emit('show-signup')">
          Sign Up
        </button>

        </div>
      <div id="header-right-bar" v-if="$store.state.authorized">

          <AvatarMenu/>


        <button class="btn " @click="$emit('show-new-board')">New Board</button>


      </div>
    </div>
  </div>
</template>

<style scoped>

.btn-group {margin: auto; width: 80%}
.btn-group * { width: 50%; text-align: center}

#search {max-height: 50px;}



#header {
  top: 0;
  position: fixed;
  background-color: white;
  z-index: 50;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  height: 60px;
  padding: 5px;
  align-items: center;
  width: 100vw;
}

#header-right-bar {
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}

#header-right-bar * {
  margin: auto
}

#header-left-bar {

      display: flex;
      align-items: center;
}

</style>

<script>
import AvatarMenu from "../components/AvatarMenu.vue";

export default {
  name: "SiteHeader",
  components: {
    AvatarMenu,
  },
};
</script>