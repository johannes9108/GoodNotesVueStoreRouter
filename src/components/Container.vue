<template>
  <section>
    <article
      v-if="!this.$store.state.loading"
      class="displayView"
      v-bind:class="{listView: this.$store.state.listView}"
    >
      <NoteVue v-bind:post="post" v-bind:key="post.id" v-for="post in this.$store.state.database" />
    </article>
    <p v-else>Loading....</p>
  </section>
</template>
<script>
import NoteVue from "./Note.vue";

export default {
  beforeMount() {
    this.$store.dispatch("getAll");
  },
  components: {
    NoteVue: NoteVue
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

.listView {
  grid-template-columns: auto;
}
</style>
