<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ props.message }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close-modal"],
  props: ["message"],

  setup(props, { emit }) {
    function closeModal() {
      emit("close-modal");
    }

    return { props, closeModal };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;

    p {
      text-align: center;
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
</style>
