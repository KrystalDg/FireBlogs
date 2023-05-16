import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "Home",
        navigation: true,
      },
      component: HomeView,
    },
    {
      path: "/blogs",
      name: "blogs",
      meta: {
        title: "Blogs",
        navigation: true,
      },
      component: () => import("../views/BlogsView.vue"),
    },
    {
      path: "/create",
      name: "create",
      meta: {
        title: "Create Post",
        navigation: true,
      },
      component: () => import("../views/CreatePostView.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "Login",
        navigation: false,
      },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      meta: {
        title: "Logout",
        navigation: false,
      },
      component: () => import("../views/LogoutView.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "Register",
        navigation: false,
      },
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      meta: {
        title: "Forgot Password",
        navigation: false,
      },
      component: () => import("../views/ForgotPasswordView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        title: "Profile",
        navigation: true,
      },
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        title: "Admin",
        navigation: true,
      },
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/view-blog/:blogid",
      name: "view-blog",
      meta: {
        title: "View Blog",
        navigation: true,
      },
      component: () => import("../views/ViewBlogView.vue"),
    },
    {
      path: "/blog-preview",
      name: "blog-preview",
      meta: {
        title: "Blog Preview",
        navigation: true,
      },
      component: () => import("../views/BlogPreviewView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Vue Blog`;
  next();
});

export default router;
