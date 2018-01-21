<template>
    <div id='sidebar' class="nav-sources">
      <h2>Categories</h2>
      <div v-for="listname in sourceLists"
          @click="fetchNewsCollection(listname)"
          id="listname"
          class="source-item" :class="activeClass(listname)">
        {{ listname.toUpperCase() }}
      </div>
      <h2>Sources</h2>
      <div v-for="sourceId in sourceKeys" @click="fetchNewsSite(sourceId)"
        :id="sourceId" class="source-item" :class="activeClass(sourceId)">
          {{ apiSources[sourceId].title }}
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
      sourceLists: 'getSourceCollections',
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
    fetchNewsSite(id) {
      this.$store.state.activeNav.sideActive = id;
      this.$store.dispatch('fetchNewsSite', id);
    },
    fetchNewsCollection(listname) {
      this.$store.state.activeNav.sideActive = listname;
      this.$store.dispatch('fetchNewsCollection', listname);
    },
    activeClass(id) {
      const activeItem = this.$store.state.activeNav.sideActive;
      if (id === activeItem) {
        return 'active';
      }
      return '';
    },
  },
};

</script>

<style>
</style>
