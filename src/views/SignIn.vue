<template>
  <div id="signin" class="card dark">
    <div class="card-header darker">
      <div class="title center-text">Sign In</div>
    </div>
    <div class="card-content">
      <input class="input" v-model="username" type="text" name="username" placeholder="Username"/>
      <br />
      <input class="input" v-model="password" type="password" name="password" placeholder="Password"/>
      <br />
      <button class="button" @click="login([username, password])">
        Sign In
      </button>
      <p class="center-text">If you dont have an account you can <router-link to="signup">Sign Up</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["loginAction"]),
    async login(credentials) {
      await this.loginAction(credentials);
      this.$router.push("/");
    },
  },
};
</script>

<style>
#signin {
  width: 40%;
}

.card-content {
  display: grid;
  align-items: center;
}

.input {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
.button {
  max-width: 100px;
  margin: auto;
  margin-top: 20px;
}
</style>