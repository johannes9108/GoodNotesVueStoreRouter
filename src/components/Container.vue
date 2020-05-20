<template>
  <section>
    <article class="displayView" v-bind:class="{listView: this.$store.state.listView}">
      <NoteVue
        v-on:removeThisNote="removeNote"
        v-bind:post="post"
        v-bind:key="post.id"
        v-for="post in this.$store.state.database"
      />
    </article>
  </section>
</template>
<script>
import NoteVue from "./Note.vue";
import Note from "../javascript/Note";

export default {
  data() {
    return {
      //Flytta till APP istället database
      editMode: false,
      item: {
        title: "",
        content: "",
        textcolor: "",
        bgcolor: ""
      }
    };
  },
  beforeMount() {
    this.$store.dispatch("getAll");
  },
  components: {
    NoteVue: NoteVue
  },
  // computed:{
  //   getItemForEdit(noteId){

  //     return
  //   }
  // },

  watch: {
    bgColor(bgcolor) {
      console.log("bg changed");
      console.log(bgcolor);
      this.item.bgcolor = bgcolor;
    },
    textColor(textcolor) {
      console.log("textcolor changed");
      console.log(textcolor);
      this.item.textcolor = textcolor;
    }
  },

  methods: {
    removeNote(id) {
      this.$emit("removeNote", id);
    },
    toggleEditMode(noteId) {
      console.log(noteId);

      this.editMode = !this.editMode; // Turns on edit mode(selecting different view)
      let editProperty = `post${noteId}`;
      let editNote = this.database[editProperty];
      this.item.id = noteId;
      this.item.title = editNote.title;
      this.item.content = editNote.content;
      this.item.textcolor = editNote.textcolor;
      this.item.bgcolor = editNote.bgcolor;
      this.$emit("updateColorsEvent", {
        textcolor: this.item.textcolor,
        bgcolor: this.item.bgcolor
      });
      console.log(editNote);
      console.log(this.item);
    },
    updateNote(note) {
      let editProperty = `post${note.id}`;
      let editNote = this.localDatabase[editProperty];
      console.log(editNote);
      editNote.title = note.title;
      editNote.content = note.content;
    },
    saveItem() {
      console.log("saveitem");

      let note = new Note(
        this.item.id,
        this.item.title,
        this.item.content,
        this.item.textcolor,
        this.item.bgcolor
      );
      this.$emit("updateNoteEvent", note);
      this.editMode = !this.editMode;
      console.log("Database after saveItem: ");
      console.log(this.database);
    }
  },
  props: {
    database: {},
    textColor: String,
    bgColor: String
  }
};
</script>
<style>
.displayView {
  background-color: white;
  padding: 0 1rem;
  display: grid;
}

.editView > :nth-child(odd) {
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

@media screen and (min-width: 1px) {
  .displayView {
    grid-template-columns: 1fr;
  }
  .regularMenu {
    display: none;
  }
}
@media screen and (min-width: 768px) {
  .displayView {
    grid-template-columns: repeat(2, 1fr);
  }
  .regularMenu {
    display: grid;
  }
  .mobileMenuButton {
    display: none;
  }
}
@media screen and (min-width: 1024px) {
  .displayView {
    grid-template-columns: repeat(3, 1fr);
  }
}

input,
textarea,
h1,
label,
button,
div,
p {
  color: inherit;
  background-color: inherit;
}
.header {
  display: flex;
  justify-content: space-between;
}
.header button {
  font-size: 2rem;
}

textarea {
  width: 100%;
  resize: false;
}
.listView {
  grid-template-columns: auto;
}
</style>
