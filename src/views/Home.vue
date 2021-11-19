// Copyright (c) 2021 Johannes Thorén
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

<template>
  <div id="home">
    <div id="side" class="card"></div>
    <BoardsList/>
    <div  id="side" class="card"></div>
  </div>
</template>

<script>
import BoardsList from '../components/BoardsList.vue'
export default {
  name: 'Home',
  components: {
    BoardsList
  }
}
</script>

<style scoped>
  #side {
    margin: auto;
    width: 80%;
    margin-top: 0;
  }
  #home {
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    margin-top: 10px;
    justify-content:baseline;
  }
</style>
