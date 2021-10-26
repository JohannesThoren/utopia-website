<template>
  <div class="card dark">
    <div class="card-header">
      <div class="title">Latest Threads</div>
    </div>
    <!-- <div id="list" v-for=""></div> -->
  </div>
</template>

<script>
import { api_root } from "../globalvars";

export default {
  name: "ThreadList",
  data() {
    return {};
  },
  async created() {
    const url = api_root + "threads/get/all";
    const response = await fetch(url);
    const data = await response.json();
    var len = Object.keys(data).length;

    console.log(len);
//     if (len > 20) {
//     }
  },
};
</script>