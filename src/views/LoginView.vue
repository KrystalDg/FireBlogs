<template>
  <div class="form-wrap">
    <form class="login" @submit.prevent="onSubmit">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'register', params: {} }"
          >Register</router-link
        >
      </p>
      <h2>Login to FireBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <email-icon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password-icon class="icon" />
        </div>
      </div>
      <div>
        <router-link
          class="forgot-password"
          :to="{ name: 'forgot-password', params: {} }"
          >Forgot your passworld?</router-link
        >
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useLogin } from "../composables/useLogin";

import EmailIcon from "../assets/Icons/envelope-regular.svg";
import PasswordIcon from "../assets/Icons/lock-alt-solid.svg";

export default {
  components: {
    EmailIcon,
    PasswordIcon,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { error, isPending, login } = useLogin();

    const email = ref("");
    const password = ref("");

    async function onSubmit() {
      const result = await login(email.value, password.value);
      if (result) {
        // store.commit("updateUser", result.user);
        store.dispatch("getCurrentUser", "userInformation");
      }
      if (!error.value) {
        router.push({ name: "profile", params: {} });
      }
    }

    return {
      email,
      password,
      isPending,
      onSubmit,
    };
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;

      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

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

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/images/background.png");
    width: 100%;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
