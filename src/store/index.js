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
    apiHandler: new Api("http://localhost:8081/notes"),
  },
  getters: {},
  mutations: {
    removeItem(state, id) {
      Vue.delete(state.database);
      console.log(id);
      const deletePost = `post${id}`;
      console.log("DeletP " + deletePost);

      let res = state.apiHandler.delete(id);

      Promise.resolve(res)
        .then(() => {
          console.log(
            "The post with id " + id + " was deleted from the database"
          );
          Vue.delete(state.database, deletePost);
        })
        .catch("Couldn't delete the post with id " + id);
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
    async createNewNote(state) {
      console.log(state.database);

      const newNote = new Note("", "", "", state.textcolor, state.bgcolor);

      let res = state.apiHandler.create(newNote);

      Promise.resolve(res)
        .then((data) => {
          console.log("The post was created!");
          // console.log(data);
          const newPost = `post${data.id}`;
          // console.log("DataID: " + data.id);
          newNote.id = data.id;
          Vue.set(state.database, newPost, newNote);
          router.push({ name: "Edit", params: { id: data.id } });
        })
        .catch("Couldn't created the post! ");
    },
    async updateItem_Mutation(state, payload) {
      let response = state.apiHandler.update(payload);

      Promise.resolve(response)
        .then(() => {
          console.log("Successful update!");
        })
        .catch(() => console.log("Failed DATA in MAIN"));
    },
    async getAll_Mutation(state) {
      let response = state.apiHandler.getAll();

      Promise.resolve(response)
        .then((posts) => {
          // console.log("Got data in MAIN");
          // console.log(posts);

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
          // console.log(state.database);
          // console.log("Created");
        })
        .catch(() => console.log("Failed DATA in MAIN"));
    },
  },
  actions: {
    createNewNote(context) {
      context.commit("createNewNote");
    },
    getAll(context) {
      context.commit("getAll_Mutation");
    },
    updateNote({ commit }, payload) {
      commit("updateItem_Mutation", payload);
    },
  },
  modules: {},
});
