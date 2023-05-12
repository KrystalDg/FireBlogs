<template>
  <div class="blog-card-wrap">
    <div class="blog-cards-container">
      <div class="toggle-edit">
        <span class="font-bold">Toggle Edit Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <div class="blog-cards">
        <blog-card :post="post" v-for="(post, index) in sampleBlogCard" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import BlogCard from "../components/BlogCard.vue";

export default {
  components: {
    BlogCard
  },
  
  setup() {
    const store = useStore();
    const sampleBlogCard = computed(() => store.state.sampleBlogCard);
    const editPost = computed({
      get() {
        return store.state.editPost;
      },
      set(payload) {
        store.commit("toggleEditPost", payload);
      }
    });
    onBeforeUnmount(() => store.commit("toggleEditPost", false));


    return {
      sampleBlogCard,
      editPost
    };
  }
};
</script>

<style lang="scss" scoped>
.blog-cards-container {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      appearance: none;
      background: #fff;
      outline: none;
      width: 50px;
      height: 20px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #555555;
      transform: scale(1.01);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: #465ffc;
      left: 30px;
    }
  }
}
</style>
