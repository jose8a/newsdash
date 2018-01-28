<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/Footer';

export default {
  name: 'app',
  components: {
    NavHeader,
    NavFooter,
  },
  computed: {
  },
  created() {
    const userId = 'admin';
    this.$store.dispatch('fetchFirebase', userId);
  },
};
</script>

<style>
</style>
