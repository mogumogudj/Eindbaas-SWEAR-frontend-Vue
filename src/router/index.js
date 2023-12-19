import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Orders from "../views/Orders.vue";
import OrderDetails from "../views/OrderDetails.vue";

const isAuthenticated = () => {
  //check if user has a token
  const token = localStorage.getItem("token");
  return !!token;
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/orders/:id",
    name: "OrderDetails",
    component: OrderDetails,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
