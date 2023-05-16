<template>
  <div class="home">
    <blog-post v-if="!$store.state.user" :post="welcomeScreen" />
    <blog-post :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <blog-card :post="post" v-for="(post, index) in sampleBlogCard" :key="index" />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>NEVER MISS A POST. REGISTER FOR YOUR FREE ACCOUNT TODAY!</h2>
        <router-link :to="{name:'home', params:{}}" class="router-button">
          REGISTER FOR FIREBLOG
          <arrow-icon class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
import ArrowIcon from "../assets/Icons/arrow-right-light.svg";

export default {
  components: {
    BlogPost,
    BlogCard,
    ArrowIcon
  },
  setup() {
    const store = useStore();

    const welcomeScreen = reactive({
      title: "Welcome to my blog!",
      blogPost:
        "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
      welcomeScreen: true,
      photo: "coding"
    });
    const sampleBlogPost = reactive([
      {
        title: "This is a Filler Title",
        blogHTML: "This is filler blog post title",
        blogCoverPhoto: "beautiful-stories"
      },
      {
        title: "This is a Filler Title",
        blogHTML: "This is filler blog post title",
        blogCoverPhoto: "designed-for-everyone"
      }
    ]);
    
    return { welcomeScreen, sampleBlogPost, sampleBlogCard : computed(() => store.state.sampleBlogCard)  };
  }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>