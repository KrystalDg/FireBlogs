<template>
  <div class="blog-card">
    <div v-if="editPost" class="icons">
      <div class="icon">
        <edit-icon class="edit" />
      </div>
      <div class="icon">
        <delete-icon class="delete" />
      </div>
    </div>
    <img :src="`/src/assets/images/blogCards/${post.blogCoverPhoto}.jpg`" alt="blogCoverPhoto" />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on: {{ new Date(post.blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h6>
      <router-link class="link" :to="{name:'home', params:{}}">
        View The Post
        <arrow-icon class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import ArrowIcon from "../assets/Icons/arrow-right-light.svg";
import DeleteIcon from "../assets/Icons/trash-regular.svg";
import EditIcon from "../assets/Icons/edit-regular.svg";

export default {
  components: {
    ArrowIcon,
    DeleteIcon,
    EditIcon
  },
  props: ["post"],
  setup() {
    const store = useStore();
    const editPost = computed(() => store.state.editPost)

    return {editPost};
  }
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  max-height: 320px;
  transition: 0.5s ease all;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;
        color: #fff;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    max-height: 300px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 20px 12px;
    color: #000;

    h4 {
      padding-bottom: 6px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 10px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 12px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>