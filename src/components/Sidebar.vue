<template>
    <div id='sidebar' class="nav-sources">
      <h3>Sidebar</h3>
      <div v-for="sourceId in sourceKeys">
        <div @click="fetchNews(sourceId)" id="sourceId">
          {{ apiSources[sourceId].title }}
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable quotes */

import { mapGetters } from 'vuex';

export default {
  name: 'sidebar',
  data() {
    return {
    };
  },
  mounted() {
    console.log(`${this.sourceKeys}`);
  },
  computed: {
    ...mapGetters({
      serverUrl: 'getBaseUrl',
      apiSources: 'getSources',
      sourceKeys: 'getSourceKeys',
      latestNews: 'getLatestFetchedNews',
    }),
    endpoint() {
      return (src) => {
        const apiSource = this.apiSources[src];
        return `/sources${apiSource.endpoint}`;
      };
    },
  },
  methods: {
    fetchNews(id) {
      this.$store.dispatch('fetchNews', id);
    },
  },
};

</script>

<style>
</style>
