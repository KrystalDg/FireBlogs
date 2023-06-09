<template>
  <div class="blog-wrapper" :class="{ 'no-user': !$store.state.user }">
    <div class="blog-content">
      <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
      <h2 v-else>{{ post.title }}</h2>
      <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
      <p v-else class="content-preview">{{ post.blogHTML }}</p>
      <router-link
        v-if="post.welcomeScreen"
        class="link link-light flex"
        :to="{ name: 'home', params: {} }"
      >
        Login/Register
        <arrow-icon class="arrow arrow-light" />
      </router-link>
      <router-link v-else class="link flex" :to="{ name: 'home', params: {} }">
        View The Post
        <arrow-icon class="arrow" />
      </router-link>
    </div>
    <div class="blog-photo">
      <img
        v-if="post.welcomeScreen"
        :src="`/src/assets/images/blogPhotos/${post.photo}.jpg`"
        alt="welcomePhoto"
      />
      <img
        v-else
        :src="`/src/assets/images/blogPhotos/${post.blogCoverPhoto}.jpg`"
        alt="blogCoverPhoto"
      />
    </div>
  </div>
</template>

<script>
import ArrowIcon from "../assets/Icons/arrow-right-light.svg";

export default {
  components: {
    ArrowIcon,
  },
  props: ["post"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;

    @media (min-width: 700px) {
      order: 1;
    }

    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;

      @media (min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;

        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #ffff;
        }
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }

    .blog-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>
