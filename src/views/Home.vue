<template>
  <div class="home">
    <SiteHeader/>
    <ThreadList/>
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue'
import ThreadList from '../components/Threadlist.vue'
export default {
  name: 'Home',
  components: {
    SiteHeader,
    ThreadList
  }
}
</script>
