<template>
  <div class="home">
    <SiteHeader/>
    <Avatar user_id="57144bc9-8ef7-445f-9ef2-def04d95ba53"/>
  </div>
</template>

<script>
import Avatar from '../components/Avatar.vue'
import SiteHeader from '../components/SiteHeader.vue'
export default {
  name: 'Home',
  components: {
    Avatar,
    SiteHeader,
  }
}
</script>
