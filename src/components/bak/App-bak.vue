<template>
  <div id="app">
    <nav-header></nav-header>
    <h3>{{ `${getPath} -- ${activeList}` }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader';

export default {
  name: 'app',
  components: {
    NavHeader,
  },
  computed: {
    activeList() {
      return this.$route.path.split('/').pop();
    },
    getPath() {
      // --- return this.$route.path;
      if (this.$route.path === '/') {
        return 'Home';
      } else if (this.$route.path === '/lists') {
        return 'Lists';
      }

      return 'Timeline';
    },
  },
};
</script>

<style>
</style>
