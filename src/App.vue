<template>
  <div class="app-wrapper">
    <div class="app">
      <navigation-bar v-if="$route.meta.navigation" />
      <router-view />
      <footer-layout />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useUser } from "./composables/useUser";

import NavigationBar from "./components/NavigationBar.vue";
import FooterLayout from "./components/FooterLayout.vue";

export default {
  components: {
    NavigationBar,
    FooterLayout,
  },
  setup() {
    const store = useStore();
    const { getUser } = useUser();
    const { user } = getUser();
    store.commit("updateUser", user);
    if (user.value) {
      console.log("user", user);
      store.dispatch("getCurrentUser", "userInformation");
    }

    return {};
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}

.router-button,
button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (max-width: 450px) {
      grid-template-columns: repeat(1, 1fr);
    }
    @media (min-width: 450px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 700px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
