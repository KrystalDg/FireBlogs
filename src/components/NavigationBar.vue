<template>
  <header>
    <nav class="container">
      <div class="branding items-center">
        <div class="header">
          <router-link :to="{ name: 'home', params: {} }"
            >FireBlogs</router-link
          >
        </div>
      </div>
      <div class="nav-links absolute flex items-center mx-auto h-full">
        <ul v-show="!mobile" class="flex text-center justify-end text-sm">
          <li class="link">
            <router-link class="link" :to="{ name: 'home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'blogs' }"
              >Blogs</router-link
            >
            <router-link
              v-if="$store.state.profileAdmin"
              class="link"
              :to="{ name: 'create' }"
              >Create Post</router-link
            >
            <router-link
              v-if="!$store.state.user"
              class="link"
              :to="{ name: 'login' }"
              >Login/Register</router-link
            >
          </li>
        </ul>
        <div
          v-if="$store.state.user"
          class="profile"
          ref="profile"
          @click="toggleProfileMenu"
          :class="{ 'mobile-user-menu': mobile }"
        >
          <span>{{ $store.state.profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ $store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ $store.state.profileFirstName }}
                  {{ $store.state.profileLastName }}
                </p>
                <p>{{ $store.state.profileUserName }}</p>
                <p>{{ $store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link
                  class="option"
                  :to="{ name: 'profile', params: {} }"
                >
                  <user-icon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
              <div v-if="$store.state.profileAdmin" class="option">
                <router-link class="option" :to="{ name: 'admin', params: {} }">
                  <admin-icon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div class="option">
                <router-link
                  class="option"
                  :to="{ name: 'logout', params: {} }"
                >
                  <logout-icon class="icon" />
                  <p>Logout</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <menu-icon
          class="cursor-pointer right-6 h-6 w-auto absolute"
          @click="toggleMobileNav"
          v-show="mobile"
        />
      </div>
    </nav>
    <transition name="mobile-nav">
      <div class="mobile-nav-links" v-show="mobileNav">
        <ul class="flex-col text-sm">
          <li class="link" v-for="item in navItems" :key="item.name">
            <router-link :to="{ name: item.name, params: {} }">{{
              item.text
            }}</router-link>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script>
import { ref } from "vue";

import { HEADER_ITEMS } from "../constants/index";

import MenuIcon from "../assets/Icons/bars-regular.svg";
import UserIcon from "../assets/Icons/user-alt-light.svg";
import AdminIcon from "../assets/Icons/user-crown-light.svg";
import LogoutIcon from "../assets/Icons/sign-out-alt-regular.svg";

export default {
  components: { MenuIcon, UserIcon, AdminIcon, LogoutIcon },

  setup() {
    const navItems = HEADER_ITEMS;
    const mobile = ref(null);
    const mobileNav = ref(null);
    const windowWidth = ref(null);
    const profileMenu = ref(false);

    const resizeScreen = () => {
      window.addEventListener("resize", checkScreen);
      checkScreen();
    };
    resizeScreen();

    function checkScreen() {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value <= 500) {
        mobile.value = true;
        return {};
      }
      mobile.value = false;
      mobileNav.value = false;
      return {};
    }

    function toggleMobileNav() {
      mobileNav.value = !mobileNav.value;
    }

    function toggleProfileMenu() {
      profileMenu.value = !profileMenu.value;
    }

    return {
      navItems,
      mobile,
      mobileNav,
      windowWidth,
      profileMenu,
      checkScreen,
      toggleMobileNav,
      toggleProfileMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding.header {
      font-weight: 600;
      font-size: 24px;
      color: #000;
      text-decoration: none;
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      // ul {
      //   margin-right: 32px;
      // }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;

            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }

    .mobile-user-menu {
      margin-right: 40px;
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav-links {
    padding: 20px;
    // width: 70%;
    // max-width: auto;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
