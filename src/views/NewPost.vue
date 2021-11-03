<template>
  <div id="new" class="card dark">
      <div class="card-header darker">

      <div class="title center-text">Create a New Post</div>
      </div>
    <div class="card-content">
      <input class="input" type="text" />
      <textarea v-model="text" id="text" class="input"></textarea>
      <span>{{text_length}}/1000</span>
    </div>
  </div>
</template>

<style scoped>
#new {
  width: 50%;
}

.input {
  width: 80%;
}

#text {
      font-family: var(--font);
      height: 400px;
      resize: none;
}
</style>

<script>
export default {
      data() {
            return {
                  text: ""
            }
      },
      computed: {
            text_length() {
                  return this.text.length
            }
      }
};
</script>