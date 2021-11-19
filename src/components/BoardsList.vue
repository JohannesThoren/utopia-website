// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div id="board-list" class="card">
    <div class="card-header">
      <div class="title center-text">New Boards</div>
    </div>
    <div id="list" class="card-content">
      <div class="board" v-for="board in boardArray" :key="board">
        <router-link class="board-name" :to="'/b/'+board['id']" >{{board["name"]}}</router-link >
        <div><i class="fas fa-user-friends"></i> Followers {{board['followers']}}</div>
          <button v-if="!fn_is_board_followed(board['id'])" @click="fn_follow(board['id'])" class="btn">Follow</button>
          <button v-if="fn_is_board_followed(board['id'])"  @click="fn_unfollow(board['id'])" class="btn warning-bg">Unfollow</button> 
      </div>
    </div>
  </div>
</template>

<style scoped>

#actions {margin-left: auto}

.title {margin: 0px}

.board {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 5px;
  margin-bottom: 5px;
}

.board-name {
  font-size: 1.2em;
}
</style>

<script>
import { api_get_call, api_post_call } from "../api_calls.js";

export default {
  name: "BoardsList",
  data() {
    return {
      boardArray: [],
      arr_user_following: []
    };
  },
  methods: {
    fn_is_board_followed(id) {
      if (this.arr_user_following.includes(id)) return true
      else return false;
    },

    async fn_follow(id) {
      const body = {"token": this.$cookie.get("token")}
      const resp = await api_post_call(body, this.$store.state.api_root, `board/${id}/follow`)
      this.$router.go()
      return resp
    },

    async fn_unfollow(id) {
      const body = {"token": this.$cookie.get("token")}
      const resp = await api_post_call(body, this.$store.state.api_root, `board/${id}/unfollow`)
      this.$router.go()
      return resp
    }
  },
  async created() {
    const arr_boards = await api_get_call(this.$store.state.api_root, "boards/get/all");

    // converting the json data to an array by looping through,
    // all the objects and the pushing them to
    console.log(arr_boards)
    for (var i in arr_boards) {
      this.boardArray.push(arr_boards[i]);
    }

    // we reverese it to be able to get the latest boards easier
    this.boardArray.reverse();
    console.log(this.boardArray);

    if (this.$store.state.authorized) {
      const json_user = await api_get_call(this.$store.state.api_root, "user/get/token/"+this.$cookie.get("token"))
      console.log(json_user)
      for(var j in json_user["following"]) {
        this.arr_user_following.push(json_user["following"][j])
      }
    }
  },
};
</script>