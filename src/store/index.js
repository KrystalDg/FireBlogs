import { createStore } from "vuex";
import { useUser } from "../composables/useUser";

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
    const editPost = null;
    const user = null;
    const profileAdmin = null;
    const profileEmail = null;
    const profileFirstName = null;
    const profileLastName = null;
    const profileUsername = null;
    const profileId = null;
    const profileInitials = null;

    return {
      sampleBlogCard,
      editPost,
      user,
      profileAdmin,
      profileEmail,
      profileFirstName,
      profileLastName,
      profileUsername,
      profileId,
      profileInitials,
    };
  },
  mutations: {
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
      state.profileUsername = doc.userName;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },
  actions: {
    async getCurrentUser({ commit }, name) {
      const { getUserInfo } = useUser();
      const userInfo = await getUserInfo(name);
      commit("setProfileInfo", userInfo);
      commit("setProfileInitials");
      console.log(userInfo);
    },
  },
});

export default store;
