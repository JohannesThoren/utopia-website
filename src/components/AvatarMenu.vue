// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
<div>

      <div id="container" @mouseover="b_show_menu = true" @mouseleave="b_show_menu = false">
            <Avatar id="avatar" :user_id="id"/>
            <span  v-if="b_show_menu" id="menu" class="shadow">
                  
            <ul>
                  <li><router-link to="/settings">Settings</router-link></li>

            </ul>      
                  <button class="btn warning-bg" @click="fn_on_sign_out(); this.$router.go()">Sign Out</button>
            </span>
      </div>
</div>
</template>

<script>
import Avatar from "./Avatar.vue"
export default {
      name: "AvatarMenu",
      components: {Avatar},
      data() {
            return {
                  id: this.$store.state.user['id'],
                  b_show_menu: false,
                  avatar_width: 0
            }
      },
      methods: {
            fn_on_sign_out() {
                  this.$store.commit('unauthorize'); 
                  this.$store.commit('set_user', []);
                  this.$cookie.remove('token');
            }
      },
      mounted() {
            this.avatar_width = document.getElementById('avatar').clientWidth;
            console.log(this.avatar_width)
      }
}
</script>

<style scoped>
a {text-decoration: none}
a:hover {text-decoration: underline}

li {
      margin-bottom: 5px;
}

ul {
      margin: 0;
      list-style: none;
      padding: 0;
}

#container {box-shadow: var(--shadow);}

#container:hover > #menu {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: none;

}

#container:hover > #avatar {
      border-bottom: solid 0.5px white;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

}

#menu {
      position: fixed;
      box-shadow: none;
      padding:var(--padding-small);
      z-index: 1;
      width: 200px;
      border: 0.5px solid var(--accent-2);
      transition: 0.5s;
      background-color: white;
      border-bottom-left-radius: var(--radius);
      border-bottom-right-radius: var(--radius);

}

</style>