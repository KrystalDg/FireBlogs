<template>
  <div class="create-post">
    <blog-cover-preview v-show="$store.state.blogPhotoPreview" />
    <loading-effect v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ $store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <quill-editor
          :modules="modules"
          :toolbar="toolbar"
          v-model:content="blogHTML"
          contentType="html"
          placeholder="Write your blog title here..."
          ref="myQuillEditor"
        />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'blog-preview' }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import useStorage from "../composables/useStorage";
import useCollection from "../composables/useCollection";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import LoadingEffect from "../components/LoadingEffect.vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";

export default {
  components: {
    QuillEditor,
    BlogCoverPreview,
    LoadingEffect,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const { errorUpload, url, uploadFile } = useStorage("documents/blogPhotos");
    // const { errorStore, addRecord } = useCollection("userInformation");
    const { errorStore, addRecord } = useCollection("blogPosts");
    // const { getUser } = useUser();
    // const { user } = getUser();

    const toolbar = [
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline"],
      ["link", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ image: "imageUploader" }],
    ];
    const modules = [
      {
        name: "blotFormatter",
        module: BlotFormatter,
        options: {},
      },
      {
        name: "imageUploader",
        module: ImageUploader,
        options: {
          upload: uploadImage,
        },
      },
    ];

    const myQuillEditor = ref(null);
    const blogPhoto = ref(null);

    const file = ref(null);
    const error = ref(null);
    const errorMsg = ref(null);
    const loading = ref(null);
    const profileId = computed(() => store.state.profileId);
    const blogCoverPhotoName = computed(() => store.state.blogPhotoName);

    const blogTitle = computed({
      get() {
        return store.state.blogTitle;
      },
      set(payload) {
        store.commit("updateBlogTitle", payload);
      },
    });
    const blogHTML = computed({
      get() {
        return store.state.blogHTML;
      },
      set(payload) {
        store.commit("newBlogPost", payload);
      },
    });

    async function fileChange() {
      file.value = blogPhoto.value.files[0];
      const fileName = file.value.name;
      store.commit("changeFileName", fileName);
      await uploadFile(file.value);
      store.commit("createFileURL", url.value);
    }

    function openPreview() {
      store.commit("openPhotoPreview");
    }

    async function uploadImage(file, resetUploader) {
      await uploadFile(file);
      console.log(URL.createObjectURL(file));
      myQuillEditor.value
        .getQuill()
        .insertEmbed(
          myQuillEditor.value.getQuill().getSelection(),
          "image",
          url.value
        );
      resetUploader();
    }
    // function uploadImage(file) {
    //   const fileURL = URL.createObjectURL(file);
    //   console.log(URL.createObjectURL(file););
    // }

    async function uploadBlog() {
      if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
        if (file.value) {
          loading.value = true;
          await uploadFile(file.value);
          if (errorUpload) {
            console.log(errorUpload);
            loading.value = false;
          }
          const timestamp = Date.now();
          const blogRecord = {
            blogHTML: store.state.blogHTML,
            blogCoverPhoto: url.value,
            blogCoverPhotoName: store.state.blogPhotoName,
            blogTitle: store.state.blogTitle,
            profileId: store.state.profileId,
            date: timestamp,
          };
          await addRecord(null, blogRecord);
          await store.dispatch("getBlogPosts", "blogPosts");
          loading.value = false;
          router.push({
            name: "view-blog",
            params: { blogid: store.state.blogPosts[0].blogID },
          });
        } else {
          error.value = true;
          errorMsg.value = "Please ensure you uploaded a cover photo!";
          setTimeout(() => {
            error.value = false;
          }, 5000);
          return;
        }
      } else {
        error.value = true;
        errorMsg.value =
          "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          error.value = false;
        }, 5000);
        return;
      }
    }

    return {
      myQuillEditor,
      blogPhoto,
      file,
      error,
      errorMsg,
      loading,
      profileId,
      blogCoverPhotoName,
      blogTitle,
      blogHTML,
      toolbar,
      modules,
      errorStore,
      fileChange,
      openPreview,
      uploadBlog,
    };
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
