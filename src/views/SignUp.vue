<template>
  <div id="signup" class="card">
    <div class="card-header center-text">
      <div class="title">Sign Up</div>
    </div>
    <div id="input" class="card-content center-text">
      <input
        v-model="username"
        class="input"
        type="text"
        name="name"
        id="username"
        placeholder="Username"
      /><br />
      <input
        v-model="email"
        class="input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      /><br />
      <input
        v-model="pass1"
        class="input"
        type="password"
        name="password1"
        id="password1"
        placeholder="Password"
      /><br />
      <input
        v-model="pass2"
        class="input"
        type="password"
        name="password2"
        id="password2"
        placeholder="Confirm Password"
      />
      <br />
      <p class="warning-fg center-text" v-if="checkPassword == false">
        Password is not matching
      </p>

      <p class="warning-fg center-item" v-if="error">
        A user with that name already exists
      </p>

      <button
        class="btn ok-bg center-item"
        @click="signup()"
        v-if="checkPassword == true"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>

<script>
import { api_post_call } from "../api_calls.js";
export default {
  data() {
    return {
      pass1: "",
      pass2: "",
      username: "",
      email: "",
      error: false,
    };
  },
  methods: {
    async signup() {
      const body = {
        username: this.username,
        password: this.pass1,
        email: this.email,
      };
      const data = await api_post_call(body, $store.state.api_root, "user/new");

      if (data["response code"] == 200) {
        this.$router.push("/signin");
      } else {
        this.error = true;
      }
    },
  },
  computed: {
    checkPassword() {
      if (this.pass1 != "" && this.pass2 != "") {
        if (this.pass1 == this.pass2) return true;
        else return false;
      }
      return null;
    },
  },
};
</script>

<style>
#signup {
  width: 40%;
  margin: auto;
}

#input * {
  margin-top: 10px;
}
</style>