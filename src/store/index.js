import Vue from "vue";
import Vuex from "vuex";
import Note from "../javascript/Note";
import Api from "../javascript/api";
import router from "../router/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listView: false,
    textcolor: "#000000",
    bgcolor: "#FFFFFF",
    database: {},
    loading: false,
    apiHandler: new Api("http://localhost:8081/notes"),
  },
  getters: {},
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    removeItem(state, id) {
      const deletePost = `post${id}`;
      Vue.delete(state.database, deletePost);
    },
    toggleListView(state) {
      state.listView = !state.listView;
    },
    updateTextColor(state, color) {
      state.textcolor = color;
    },
    updateBgColor(state, color) {
      state.bgcolor = color;
    },
    createNewNote(state, data) {
      const newPost = `post${data.id}`;
      console.log("in final: ");
      console.log(data);
      Vue.set(
        state.database,
        newPost,
        new Note(data.id, "", "", this.state.textcolor, this.state.bgcolor)
      );
      router.push({ name: "Edit", params: { id: data.id } });
    },
    // updateItem_Mutation(state, payload) {},
    setItemInDatabase(state, posts) {
      for (let item of posts) {
        const newPost = `post${item.id}`;
        const newNote = new Note(
          item.id,
          item.title,
          item.content,
          item.textcolor,
          item.bgcolor
        );
        Vue.set(state.database, newPost, newNote);
      }
    },
  },
  actions: {
    async createNewNote(context) {
      context.commit("setLoading", true);
      const newNote = new Note();
      let res = this.state.apiHandler.create(newNote);

      Promise.resolve(res)
        .then((data) => {
          context.commit("createNewNote", data);
          context.commit("setLoading", false);
        })
        .catch("Couldn't created the post! ");
    },
    async getAll(context) {
      context.commit("setLoading", true);
      let response = this.state.apiHandler.getAll();

      Promise.resolve(response)
        .then((posts) => {
          context.commit("setItemInDatabase", posts);
          context.commit("setLoading", false);
        })
        .catch(() => console.log("Failed DATA in MAIN"));
    },
    async updateNote({ commit }, payload) {
      commit("setLoading", true);
      console.log(payload);
      let response = this.state.apiHandler.update(payload);

      Promise.resolve(response)
        .then(() => {
          console.log("Successful update!");
          router.push("/");
        })
        .catch(() => console.log("Failed to update the data"));
    },

    async deleteItem({ commit }, id) {
      let res = this.state.apiHandler.delete(id);
      Promise.resolve(res)
        .then(() => {
          console.log(
            "The post with id " + id + " was deleted from the database"
          );
          commit("removeItem", id);
        })
        .catch("Couldn't delete the post with id " + id);
    },
  },
  modules: {},
});
