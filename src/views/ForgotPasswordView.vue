<template>
  <div class="reset-password">
    <modal-popup
      v-if="showModal"
      :message="message"
      @close-modal="closeModal"
    /><template>
  <div class="admin">
    <div class="container">
      <h2>Administration</h2>
      <div class="admin-info">
        <h2>Add Admin</h2>
        <div class="input">
          <input placeholder="Enter user email to make them an admin" type="text" id="addAdmins" v-model="adminEmail" />
        </div>
        <span>{{ this.functionMsg }}</span>
        <button @click="addAdmin" class="button">Submit</button>
      </div>
    </div>
  </div>
</template>
    <loading-effect v-if="showLoading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
        Back to
        <router-link class="router-link" :to="{ name: 'login', params: {} }"
          >Login</router-link
        >
      </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="email" placeholder="Email" v-model="email" />
            <email-icon class="icon" />
          </div>
        </div>
        <div>
          <button @click.prevent="resetPassword">Reset</button>
        </div>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ModalPopup from "../components/ModalPopup.vue";
import LoadingEffect from "../components/LoadingEffect.vue";
import EmailIcon from "../assets/Icons/envelope-regular.svg";
export default {
  components: {
    EmailIcon,
    ModalPopup,
    LoadingEffect,
  },
  setup() {
    const showModal = ref(false);
    const showLoading = ref(false);
    const email = ref("");
    const message = ref("");

    function resetPassword() {
      showModal.value = true;
      message.value = "Password reset link sent to your email";
    }

    function closeModal() {
      showModal.value = !showModal.value;
    }

    return {
      showModal,
      showLoading,
      email,
      message,
      resetPassword,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;

  .form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 100%;
    @media (min-width: 900px) {
      width: 100%;
    }
    .reset {
      h2 {
        margin-bottom: 8px;
      }

      p {
        text-align: center;
        margin-bottom: 32px;
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
}
</style>
