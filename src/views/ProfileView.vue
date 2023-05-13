<template>
  <div>
    <h1>Profile Page</h1>
    <h2>{{ store.state.profileFirstName }}</h2>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    console.log(store.state.profileUserName);

    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
