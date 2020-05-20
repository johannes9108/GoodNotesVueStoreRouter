<template>
  <div id="app">
    <header>
      <h1>GoodNotes</h1>
      <button @click="showMenu = !showMenu" class="mobileMenuButton">Menu</button>
      <Nav v-if="showMenu" />
    </header>
    <Nav class="regularMenu" />
    <router-view class="wrapper" />
  </div>
</template>
<script>
import Nav from "./components/Nav";
export default {
  data() {
    return {
      showMenu: false
    };
  },
  components: {
    Nav
  }
};
</script>

<style lang="scss">
* {
  color: white;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  box-sizing: border-box;
}

body {
  background-color: black;
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 1200px;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  border-bottom: 1px solid white;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-size: 2rem;
}
button {
  background: transparent;
  border: none;
}

.wrapper {
  // background-color: red;
  height: 100%;
}
</style>
