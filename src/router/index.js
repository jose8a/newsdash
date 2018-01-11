import Vue from 'vue';
import Router from 'vue-router';
import HomeBase from '@/components/HomeBase';
import Favorites from '@/components/Favorites';
import NewsGenres from '@/components/NewsGenres';
import NewsSources from '@/components/NewsSources';
import NotFoundComponent from '@/components/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeBase,
    },
    {
      path: '/genres/:genre',
      name: 'genres',
      component: NewsGenres,
    },
    {
      path: '/sources/:type/:source',
      name: 'sources',
      component: NewsSources,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    },
    { path: '*',
      component: NotFoundComponent,
    },
  ],
});
