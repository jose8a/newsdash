<template>
    <div id='home'>
      <h2>I am HOME!</h2>
      <div v-for="source in sourceKeys">
        <a :href="endpoint(source)"> {{ apiSources[source].title }} </a>
      </div>
    </div>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      serverUrl: 'getBaseUrl',
      apiSources: 'getSources',
      sourceKeys: 'getSourceKeys',
    }),
    endpoint() {
      return (src) => {
        const apiSource = this.apiSources[src];
        return `/sources${apiSource.endpoint}`;
      };
    },
  },
  methods: {
  },
};

</script>

<style>
</style>
