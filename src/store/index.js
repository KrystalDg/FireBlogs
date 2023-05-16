import { createStore } from "vuex";

import { useUser } from "../composables/useUser";
import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase";

// Create a new store instance.
const store = createStore({
  state() {
    const sampleBlogCard = [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2023",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2023",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2023",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2023",
      },
    ];

    const blogPosts = [];
    const blogHTML = "";
    const blogTitle = "";
    const blogPhotoName = "";
    const blogPhotoFileURL = null;
    const blogPhotoPreview = null;

    const editPost = null;
    const user = null;
    const profileAdmin = null;
    const profileEmail = null;
    const profileFirstName = null;
    const profileLastName = null;
    const profileUserName = null;
    const profileId = null;
    const profileInitials = null;
    const collection = "userInformation";

    return {
      sampleBlogCard,
      blogPosts,
      blogHTML,
      blogTitle,
      blogPhotoName,
      blogPhotoFileURL,
      blogPhotoPreview,
      editPost,
      user,
      profileAdmin,
      profileEmail,
      profileFirstName,
      profileLastName,
      profileUserName,
      profileId,
      profileInitials,
      collection,
    };
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    changeFileName(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },

    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload;
    },

    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.email;
      state.profileFirstName = doc.firstName;
      state.profileLastName = doc.lastName;
      state.profileUserName = doc.userName;
      state.profileAdmin = doc.isAdmin;
      console.log("Profile Info", state.profileId);
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
    setBlogPosts(state, payload) {
      payload.forEach((doc) => {
        const data = {
          blogID: doc.id,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
        };
        state.blogPosts.push(data);
      });
      console.log("Blog Info", state.blogPosts);
    },
  },
  actions: {
    async getCurrentUser({ commit }, name) {
      const { getUserInfo } = useUser();
      const userInfo = await getUserInfo(name);
      commit("setProfileInfo", userInfo);
      commit("setProfileInitials");
      console.log("UserInfo", userInfo);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = doc(projectFirestore, state.collection, state.profileId);
      await updateDoc(dataBase, {
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUserName,
      });
      commit("setProfileInitials");
    },
    async getBlogPosts({ commit }, name) {
      const { getBlogInfo } = useUser();
      const blogInfo = await getBlogInfo(name);
      commit("setBlogPosts", blogInfo);
    },
  },
});

export default store;
