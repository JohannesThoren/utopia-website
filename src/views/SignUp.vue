<template>
  <div id="signup" class="card dark">
    <div class="card-header darker">
      <div class="title center-text">Sign Up</div>
    </div>
    <div class="card-content">
      <input
        class="input"
        type="text"
        name="name"
        id="username"
        placeholder="Username"
      />
      <input
        class="input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      />
      <input
        v-model="pass1"
        class="input"
        type="password"
        name="password1"
        id="password1"
        placeholder="Password"
      />
      <input
        v-model="pass2"
        class="input"
        type="password"
        name="password2"
        id="password2"
        placeholder="Confirm Password"
      />
      <p class="txt-warning center-text" v-if="checkPassword == false">
        Password is not matching
      </p>

      <button class="button button-ok">Sign Up</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pass1: "",
      pass2: "",
      username: "",
      email: "",
    };
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