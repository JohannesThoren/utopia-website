<template>
  <div id="signup" class="card dark">
    <div class="card-header darker">
      <div class="title center-text">Sign Up</div>
    </div>
    <div class="card-content center-text">
      <input
        v-model="username"
        class="input"
        type="text"
        name="name"
        id="username"
        placeholder="Username"
      /><br>
      <input
        v-model="email"
        class="input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      /><br>
      <input
        v-model="pass1"
        class="input"
        type="password"
        name="password1"
        id="password1"
        placeholder="Password"
      /><br>
      <input
        v-model="pass2"
        class="input"
        type="password"
        name="password2"
        id="password2"
        placeholder="Confirm Password"
      /> <br> 
      <p class="txt-warning center-text" v-if="checkPassword == false">
        Password is not matching
      </p>

      <p class="text-warning center-text" v-if="error">
        A user with that name already exists
      </p>

      <button
        class="button button-ok"
        @click="signup()"
        v-if="checkPassword == true"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>

<script>
import { api_root } from "../globalvars";

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
      console.log(this.name);

      const url = api_root + "user/new";
      const body = {
        username: this.username,
        password: this.pass1,
        email: this.email,
      };
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await response.json();

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
}

</style>