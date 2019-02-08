<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Arimo:400,700");
body {
  background: #ddd;
  font-family: "Arimo";
  font-weight: 400;
}
</style>
