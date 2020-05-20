<template>
  <div
    v-if="isVisible"
    class="note"
    v-bind:style="{color: this.post.textcolor, backgroundColor: this.post.bgcolor}"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{ highlight: hover }"
  >
    <!-- <h3 contenteditable>{{title}}</h3> -->
    <div class="header">
      <!-- <input v-model="noteTitle" type="text" placeholder="New Title" @blur="updateNote" /> -->
      <span v-bind:key="noteId">{{this.post.title}}</span>
      <router-link :to="{name: 'Edit', params:{id: noteId}}">
        <button>&#128394;</button>
      </router-link>
      <button v-on:click="removeItem">&#10005;</button>
    </div>
    <p v-bind:key="noteId">{{this.post.content}}</p>
    <!-- <textarea v-model="noteContent" placeholder="New Content" @blur="updateNote"></textarea> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      isVisible: true,
      isExpanded: false,
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
      console.log("Remove this note");
      this.$store.commit("removeItem", this.noteId);
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
