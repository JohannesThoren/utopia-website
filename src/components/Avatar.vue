<template>
      <div class="avatar">
            <img :src="img" alt="avatar picture">
            <span>{{name}}</span>
      </div>
</template>

<script>
export default {
      name: "Avatar",
      props: {
            img: String,
            name: String
      }
}
</script>

<style>
.avatar {
      display: flex;
      align-items: center;
}

.avatar img {
      width: 36px;
      border: 2px solid var(--darkest);
      border-radius: 100%;
      margin-left: 5px;
      margin-right: 5px;
}

.avatar span {
      font-size: 1.2em;
}
</style>