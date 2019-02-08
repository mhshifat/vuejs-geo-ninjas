<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link to="/" class="brand-logo left">GeoNinjas!</router-link>
        <ul class="right">
          <li>
            <router-link v-if="!user" to="/register">Signup</router-link>
          </li>
          <li>
            <router-link v-if="!user" to="/login">Login</router-link>
          </li>
          <li>
            <a v-if="user">{{user.email}}</a>
          </li>
          <li>
            <a v-if="user" @click="logoutTheUser">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { fireAuth } from "@/firebase/init";
export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logoutTheUser() {
      fireAuth.signOut().then(() => {
        this.$router.push("/login");
      });
    }
  },
  created() {
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
