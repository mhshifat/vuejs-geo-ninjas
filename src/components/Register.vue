<template>
  <div class="register container">
    <form @submit.prevent="registerUser" class="card-panel">
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
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias">
      </div>
      <div class="field center">
        <p class="red-text center" v-if="feedback">{{ feedback }}</p>
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import { db, fireAuth } from "@/firebase/init";
export default {
  name: "Register",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null
    };
  },
  methods: {
    async registerUser() {
      if (!this.alias && !this.email && !this.password) {
        this.feedback = "All field is required";
      } else {
        this.feedback = null;
        const isAliasExist = await db
          .collection("users")
          .doc(
            this.alias
              .split(" ")
              .join("-")
              .toLowerCase()
          )
          .get();
        if (isAliasExist.exists) {
          this.feedback = "Alias field is required";
        } else {
          fireAuth
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              db.collection("users")
                .doc(
                  this.alias
                    .split(" ")
                    .join("-")
                    .toLowerCase()
                )
                .set({
                  alias: this.alias,
                  geoLocation: null,
                  userId: cred.user.uid
                });
            })
            .then(() => {
              this.$router.push("/");
            })
            .catch(err => (this.feedback = err.message));
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.register {
  max-width: 400px;
  margin-top: 60px;
}
.register h2 {
  font-size: 2.4em;
}
.field {
  margin-bottom: 16px;
}
</style>
