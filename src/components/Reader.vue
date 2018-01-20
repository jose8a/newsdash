<template>
    <div id='reader'>
      <h2>News Sources</h2>
      <ul>
        <li v-for="item in newsItems" :id="item.sourceId" class="postItem" :class="item.source">
          <p><a :href="item.url">{{ item.title }}</a></p>
          <p class=""> {{ postHost(item.url) }}</p>
        </li>
      </ul>
    </div><!-- end:#news-sources -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'reader',
  data() {
    return {
      server: null,
      newsItems: [],
    };
  },
  mounted() {
    const source = this.$route.params.source;
    const sourceType = this.$route.params.type;
    const newsUrl = `/${sourceType}/${source}`;

    this.server = this.http();
    this.server.get(newsUrl)
      .then((resp) => {
        console.log(`AXIOS RESP: ${resp.data}`);
        this.newsItems = resp.data;
      })
      .catch((err) => {
        // TODO: error ACTION to display error banner
        console.log(`AXIOS ERR: ${err}`);
      });
  },
  computed: mapGetters({
    serverUrl: 'getBaseUrl',
  }),
  methods: {
    http() {
      console.log(`http creation -- baseUrl: ${this.serverUrl}`);
      return axios.create({
        baseURL: this.serverUrl,
        responseType: 'json',
      });
    },
    postHost(url) {
      return url.split('/')[2];
    },
    news() {
      return this.newsItems;
    },
  },
};
</script>

<style>
</style>
