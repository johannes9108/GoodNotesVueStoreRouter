<template>
  <section>
    <article
      class="editView"
      :style="{backgroundColor: this.$store.state.bgcolor,color:this.$store.state.textcolor}"
    >
      <div class="header">
        <h1>Title</h1>
        <button v-on:click.stop="saveItem">&#128394;</button>
      </div>
      <input name="title" type="text" v-model="data.title" />
      <h1>Content</h1>
      <textarea name="content" type="text" v-model="data.content" />
    </article>
  </section>
</template>
<script>
export default {
  data() {
    return {
      data: {
        title: "",
        content: "",
        textcolor: "",
        bgcolor: "",
        id: -1
      }
    };
  },
  methods: {
    saveItem() {
      this.data.textcolor = this.$store.state.textcolor;
      this.data.bgcolor = this.$store.state.bgcolor;
      this.$store.dispatch("updateNote", this.data);
    }
  },
  beforeMount() {
    const editPost = `post${this.$route.params.id}`;
    let tmp = this.$store.state.database[editPost];
    this.data.title = tmp.title;
    this.data.content = tmp.content;
    this.data.textcolor = tmp.textcolor;
    this.data.bgcolor = tmp.bgcolor;
    this.data.id = tmp.id;
    this.$store.commit("updateTextColor", this.data.textcolor);
    this.$store.commit("updateBgColor", this.data.bgcolor);
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
.editView {
  height: 100%;
  display: grid;
  grid-template-rows: 5vh 5vh 5vh auto;
}
.header {
  display: flex;
  justify-content: space-between;
}
.header button {
  font-size: 2rem;
}
</style>