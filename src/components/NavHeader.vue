<template>
    <div id='nav' class="nav-header">
      <div id="branding">
        <span href=""><i class="fa fa-newspaper-o fa-5x"></i></span>
        <h1>News Dash</h1>
      </div>
      <div id="nav-bar">
        <router-link to='/' tag="span" class="nav-bar-link">NewsRack</router-link>
        <router-link to='/reader' tag="span" class="nav-bar-link">Reader</router-link>
        <router-link to='/shelf' tag="span" class="nav-bar-link">Shelf</router-link>
        <router-link to='/archives' tag="span" class="nav-bar-link">Archives</router-link>
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
