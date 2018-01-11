<template>
    <div id='nav'>
      <router-link to='/' tag="button">Home</router-link>
      <router-link to='/favorites' tag="button">Favorites</router-link>
      <router-link to='/genres/sports' tag="button">Genres</router-link>
      <router-link to='/sources/tech/fefront' tag="button">Sources</router-link>
    </div>
</template>

<script>
export default {
  name: 'nav-header',
};
</script>

<style>
</style>
