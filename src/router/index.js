import Vue from "vue";
import Router from "vue-router";
import GMap from "@/components/GMap";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Profile from "@/components/Profile";
import { fireAuth } from "@/firebase/init";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "GMap",
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (!fireAuth.currentUser) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
