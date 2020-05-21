<template>
  <nav class="navButtonContainer">
    <a class="navItem" v-on:click="toggleListView">View</a>
    <a class="navItem" v-on:click="createNewNote">New Note</a>

    <a class="navItem">
      <input type="color" v-model="textColor" />
    </a>
    <a class="navItem">
      <input type="color" v-model="bgColor" />
    </a>
  </nav>
</template>
<script>
export default {
  computed: {
    textColor: {
      get: function() {
        return this.$store.state.textcolor;
      },
      set: function(color) {
        this.$store.commit("updateTextColor", color);
      }
    },
    bgColor: {
      get: function() {
        return this.$store.state.bgcolor;
      },
      set: function(color) {
        this.$store.commit("updateBgColor", color);
      }
    }
  },
  methods: {
    toggleListView() {
      this.$store.commit("toggleListView");
    },
    createNewNote() {
      this.$store.dispatch("createNewNote");
    },
    updateTextColor(color) {
      this.$store.commit("updateTextColor", color);
    },
    updateBgColor(color) {
      this.$store.commit("updateBgColor", color);
    }
  }
};
</script>
<style>
.navButtonContainer {
  background-color: rgb(72, 71, 71);
}
input {
  border: transparent;
  background: transparent;
  height: 100%;
  width: 100%;
}
.navItem {
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navItem:hover {
  background-color: rgb(120, 119, 119);
  border-bottom: 1px solid white;
}

@media screen and (min-width: 1px) {
  .navButtonContainer {
    position: absolute;
    /* display: flex;
    flex-flow: column; */
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    height: 200px;
    width: 200px;
    top: 100%;
    right: 0;
  }
}
@media screen and (min-width: 768px) {
  .navButtonContainer {
    position: unset;
    height: unset;
    width: 100%;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
  }
}
</style>