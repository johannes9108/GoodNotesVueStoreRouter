<template>
  <div
    class="note"
    v-bind:style="styleObject"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{ highlight: hover }"
  >
    <div class="header">
      <span v-bind:key="noteId">{{this.post.title}}</span>
      <router-link :to="{name: 'Edit', params:{id: noteId}}">
        <button>&#128394;</button>
      </router-link>
      <button v-on:click="removeItem">&#10005;</button>
    </div>
    <p v-bind:key="noteId">{{this.post.content}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hover: false,
      noteTitle: this.post.title,
      noteContent: this.post.content,
      noteId: this.post.id,
      styleObject: {
        color: this.post.textcolor,
        backgroundColor: this.post.bgcolor
      }
    };
  },
  components: {},
  methods: {
    removeItem() {
      this.$store.dispatch("deleteItem", this.noteId);
    }
  },
  props: {
    post: Object
  }
};
</script>
<style>
.note {
  border-radius: 2%;
  box-shadow: 5px 5px 15px grey;
  border: 1px dashed white;
  padding: 1rem;
  margin: 1rem;
  overflow: auto;
  max-height: 150px;
}
::placeholder {
  font-size: 1.5rem;
}

.note span,
.note p,
.note button,
a {
  word-break: break-all;
  width: 100%;
  background: transparent;
  border: none;
  resize: none;
  color: inherit;
}
.header {
  word-break: break-all;
  color: inherit;
}
.note .header {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  justify-content: flex-start;
  border-bottom: 1px solid black;
}
.note button {
  font-size: 1.5rem;
}

.note.highlight {
  transform: scale(1.05);
  box-shadow: 5px 5px 5px grey;
}
</style>
