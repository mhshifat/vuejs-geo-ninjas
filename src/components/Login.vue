<template>
  <div class="login container">
    <form @submit.prevent="loginUser" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <p class="red-text center" v-if="feedback">{{ feedback }}</p>
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { fireAuth } from "@/firebase/init";
export default {
  name: "Register",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    async loginUser() {
      if (!this.email && !this.password) {
        this.feedback = "All field is required";
      } else {
        this.feedback = null;
        fireAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            if (cred) {
              this.$router.push("/");
            }
          })
          .catch(err => (this.feedback = err.message));
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.field {
  margin-bottom: 16px;
}
</style>
