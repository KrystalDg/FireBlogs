<template>
  <div class="profile">
    <Modal
      v-if="modalActive"
      :message="modalMessage"
      @close-modal="closeModal"
    />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div v-if="$store.state.isAdmin" class="admin-badge">
          <admin-icon class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import Modal from "../components/ModalPopup.vue";
import AdminIcon from "../assets/Icons/user-crown-light.svg";
export default {
  components: {
    Modal,
    AdminIcon,
  },
  setup() {
    const store = useStore();
    const modalActive = ref(null);
    const modalMessage = ref("");

    const firstName = computed({
      get() {
        return store.state.profileFirstName;
      },
      set(payload) {
        store.commit("changeFirstName", payload);
      },
    });
    const lastName = computed({
      get() {
        return store.state.profileLastName;
      },
      set(payload) {
        store.commit("changeLastName", payload);
      },
    });
    const username = computed({
      get() {
        return store.state.profileUserName;
      },
      set(payload) {
        store.commit("changeUserName", payload);
      },
    });
    const email = computed(() => store.state.profileEmail);
    console.log(store.state.profileId);

    function updateProfile() {
      store.dispatch("updateUserSettings");
      modalActive.value = true;
      modalMessage.value = "Profile Updated";
    }
    function closeModal() {
      modalActive.value = !modalActive.value;
    }

    return {
      modalActive,
      modalMessage,
      firstName,
      lastName,
      username,
      email,
      updateProfile,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 30px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 450px;
      margin: 24px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 10px;
        padding: 5px 10px;
        border-radius: 8px;
        background-color: #303030;
        // margin: 14px 0;
        margin-top: 14px;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 10px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 12px 0;

        label {
          font-size: 14px;
          display: block;
          // padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          // height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
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
    }
  }
}
</style>
