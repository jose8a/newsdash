<template>
    <div id='nav'>
      <router-link to='/' tag="button">Home</router-link>
      <router-link to='/favorites' tag="button">Favorites</router-link>
      <router-link to='/genres/tbd' tag="button">Genres</router-link>
      <router-link to='/sources/tbd' tag="button">Sources</router-link>
    </div>
</template>

<script>
export default {
  name: 'nav-header',
};
</script>

<style>
</style>
