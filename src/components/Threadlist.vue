<template>
  <div id="thread-list" class="card dark">
    <div class="card-header darker">
      <div class="title">Latest Threads</div>
    </div>
    <div id="list" class="card-content">
      <div class="thread" v-for="thread in threadArray" :key="thread">
        <router-link class="thread-name" :to="'/t/'+thread['id']" >/t/{{thread["name"]}}</router-link >
        <span class="thred-description">{{ thread["description"] }}</span>
        <button        v-if="$store.state.authorized" class="button"> follow</button>
      </div>
    </div>
  </div>
</template>

<style>

#thread-list {
  width: 50%;
}

.thread {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 5px;
  margin-bottom: 5px;
}

.thread-name {
  font-size: 1.2em;
}
</style>

<script>
import { api_root } from "../globalvars";

export default {
  name: "ThreadList",
  data() {
    return {
      threadArray: [],
    };
  },
  async created() {
    const url = api_root + "threads/get/all";
    const response = await fetch(url);
    const data = await response.json();

    // converting the json data to an array by looping through,
    // all the objects and the pushing them to
    for (var index in data) {
      this.threadArray.push(data[index]);
    }

    // we reverese it to be able to get the latest threads easier
    this.threadArray.reverse();
    console.log(this.threadArray);
  },
};
</script>