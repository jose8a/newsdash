<template>
    <div id='lists'>
      <div class="data-actions">
        <button v-on:click="saveLists">Save Lists</button>
        <button v-on:click="getLists">Latest Lists</button>
      </div>
      <div class="cardlist lists">
        <div v-for="list in lists" class="card list-el">
          <router-link v-bind:to="listPath(list)" class="twit-el">
            <p class="content">{{list.name}}</p>
            <p class="content-sub">members - {{list.memberCount}}</p>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5566/',
});

export default {
  name: 'list-index',
  data() {
    return {
      storageKey: 'savedLists',
      lists: [],
    };
  },
  mounted() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }

    if (localStorage.getItem(this.storageKey).length > 0) {
      const savedLists = localStorage.getItem(this.storageKey);
      this.lists = JSON.parse(savedLists);
    }
  },
  methods: {
    listPath(listItem) {
      return `lists/${listItem.name}`;
    },
    getLists() {
      console.log('SUCCESS: getting Lists ...');
      http.get('lists/')
        .then((response) => {
          this.lists = response.data.data;
        })
        .catch((error) => {
          console.log('Error: getting lists ...');
          console.log(error);
        });
    },
    saveLists() {
      const lists = JSON.stringify(this.lists);
      console.log('Saving Lists ...');
      localStorage.setItem(this.storageKey, lists);
    },
  },
};

</script>

<style>
</style>
