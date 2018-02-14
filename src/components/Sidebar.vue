<template>
    <div id='sidebar' class="nav-sources">
      <div class="sidebar-toggle" @click="toggleSidebar" :style="styleTitle">
        <span class="mixesTitle" :class="isMixesTitleActive">Mixes</span>
        <span class="sitesTitle" :class="isSitesTitleActive">Sites</span>
      </div>
      <div class="side-links">
        <div class="side-groups" :class="isActiveGroups">
          <div v-for="listId in listsKeys"
              @click="fetchNewsCollection(listId)"
              :id="listId"
              class="source-item" :class="activeClass(listId)">
            {{ listsInfo[listId].title }}
          </div>
        </div>
        <div class="side-sites" :class="isActiveSites">
          <div v-for="sourceId in sourceKeys" @click="fetchNewsSite(sourceId)"
            :id="sourceId" class="source-item" :class="activeClass(sourceId)">
              {{ apiSources[sourceId].title }}
          </div>
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
  },
  computed: {
    ...mapGetters({
      serverUrl: 'getBaseUrl',
      apiSources: 'getSources',
      sourceKeys: 'getSourceKeys',
      latestNews: 'getLatestFetchedNews',
      listsKeys: 'getCollectionsKeys',
      listsInfo: 'getSourceCollections',
      activeSidebar: 'getActiveSidebar',
    }),
    endpoint() {
      return (src) => {
        const apiSource = this.apiSources[src];
        return `/sources${apiSource.endpoint}`;
      };
    },
    isActiveGroups() {
      if (this.activeSidebar === 'MIXES') {
        return 'active-sidebar';
      }
      return '';
    },
    isActiveSites() {
      if (this.activeSidebar === 'SITES') {
        return 'active-sidebar';
      }
      return '';
    },
    isMixesTitleActive() {
      if (this.activeSidebar === 'MIXES') return 'activeTitle';
      return 'inactiveTitle';
    },
    isSitesTitleActive() {
      if (this.activeSidebar === 'SITES') return 'activeTitle';
      return 'inactiveTitle';
    },

    styleTitle() {
      const activeColor = 'rgba(33, 33, 33, 1)';
      const inactiveColor = 'rgba(97, 97, 97, 1)';

      const activeSitesStyle = `background: linear-gradient(-45deg, ${activeColor}, ${activeColor} 50%, ${inactiveColor} 50%, ${inactiveColor})`;

      const activeMixesStyle = `background: linear-gradient(-45deg, ${inactiveColor}, ${inactiveColor} 50%, ${activeColor} 50%, ${activeColor})`;

      if (this.activeSidebar === 'MIXES') {
        return activeMixesStyle;
      }

      return activeSitesStyle;
    },
  },
  methods: {
    fetchNewsSite(id) {
      this.$store.state.activeNav.activeFeed = this.apiSources[id].title;
      this.$store.state.activeNav.sideActive = id;
      this.$store.dispatch('fetchNewsSite', id);
      this.$store.dispatch('isFeedLoading', true);
    },
    fetchNewsCollection(listKey) {
      this.$store.state.activeNav.activeFeed = this.listsInfo[listKey].title;
      this.$store.state.activeNav.sideActive = listKey;
      this.$store.dispatch('fetchNewsCollection', listKey);
      this.$store.dispatch('isFeedLoading', true);
    },
    activeClass(id) {
      const activeItem = this.$store.state.activeNav.sideActive;
      if (id === activeItem) {
        return 'active';
      }
      return '';
    },
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar');
    },
  },
};

</script>

<style>
  .sidebar-toggle {
    /* border-bottom: 1px solid hsl(120, 5%, 20%); */
    position: relative;
    display: flexbox;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1.75rem;
    height: 4.5rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-right: 1rem;
    border-bottom: 1px rgba(50, 50, 50, 0.3) solid;
  }

  .sidebar-toggle::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(200, 40%, 40%, 0.9);
    mix-blend-mode: overlay;
  }

  .sidebar-toggle:hover {
    cursor: pointer;
    opacity: 0.8;
    transform-origin: right;
    transform: scaleX(1.02) translateY(-2px);
  }

  .side-links {
    position: relative;
  }

  .side-sites,
  .side-groups {
    position: absolute;
    top: 0;
    min-height: 100%;
    min-width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    transform-origin: top;
    animation: nav-shrink 0.8s ease-in forwards;
  }

  .side-sites.active-sidebar,
  .side-groups.active-sidebar {
    position: absolute;
    animation: nav-expand 0.8s ease-in forwards;
    min-height: 100%;
  }


  .activeTitle {
    color: rgba(218, 229, 139, 1);
  }

  .inactiveTitle {
    color: rgba(158, 158, 158, 0.7);
  }

  .mixesTitle {
    position: absolute;
    top: .5rem;
    left: .5rem;
  }

  .sitesTitle {
    position: absolute;
    right: .5rem;
    bottom: .5rem;
  }

  @keyframes nav-shrink {
    0% {
      transform: none;
    }
    10% {
      opacity: 0;
    }
    100% {
      transform: scaleY(0);
    }
  }

  @keyframes nav-expand {
    0%, 10% {
      transform: scaleY(0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: none;
    }
  }
</style>
