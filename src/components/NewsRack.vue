<template>
    <div id='latest'>
      <sidebar></sidebar>
      <news-feed></news-feed>
    </div>
</template>

<script>
/* eslint-disable no-console */

import Sidebar from '@/components/Sidebar';
import NewsFeed from '@/components/NewsFeed';

export default {
  name: 'latest',
  data() {
    return {
    };
  },
  components: {
    Sidebar,
    NewsFeed,
  },
};

</script>

<style>
</style>
