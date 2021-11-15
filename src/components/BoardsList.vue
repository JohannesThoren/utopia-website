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
        <span class="board-descriptiom">{{ board["description"] }}</span>
        <div class="btn-group">
          <button class="btn"><span class="material-icons-outlined">bookmark</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#board-list {
  width: 50%;
  margin: auto;
}

#board-list{
  margin-top: 10px;
}

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
import { api_get_call } from "../api_calls.js";

export default {
  name: "Boards",
  data() {
    return {
      boardArray: [],
    };
  },
  async created() {
    const data = await api_get_call(this.$store.state.api_root, "boards/get/all");

    // converting the json data to an array by looping through,
    // all the objects and the pushing them to
    for (var index in data) {
      this.boardArray.push(data[index]);
    }

    // we reverese it to be able to get the latest boards easier
    this.boardArray.reverse();
    console.log(this.boardArray);
  },
};
</script>