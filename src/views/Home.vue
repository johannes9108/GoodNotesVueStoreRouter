<template>
  <Container ref="container" />
</template>
<script>
// import n from "./Nav";
// import c from "./Container";
import Container from "../components/Container";

export default {
  name: "app",
  data() {
    return {};
  },

  created() {},

  computed: {
    size() {
      return "HEJ";
    }
  },
  components: {
    Container
  },
  watch: {
    textcolor() {
      // console.log("TC CHANGED!");
    }
  },
  methods: {},
  props: {}
};
</script>
<style>
</style>

