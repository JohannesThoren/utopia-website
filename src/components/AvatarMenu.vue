// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


// TODO add a new avatar with a dropdown.
// it should only be a profilpic and if you click it
// dropdown should appere
<template>
hej
</template>

<script>
export default {
      name: "AvatarMenu",
      components: {},
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
</style>