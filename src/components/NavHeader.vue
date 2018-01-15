<template>
    <div id='nav' class="nav-header">
      <h1>News Dash</h1>
      <div id="nav-bar">
        <router-link to='/' tag="span" class="nav-bar-link">Home</router-link>
        <router-link to='/favorites' tag="span" class="nav-bar-link">Favorites</router-link>
        <router-link to='/genres/sports' tag="span" class="nav-bar-link">Genres</router-link>
        <router-link to='/sources/tech/fefront' tag="span" class="nav-bar-link">Sources</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'nav-header',
};
</script>

<style>
</style>
