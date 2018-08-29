import Vue from 'vue';
import Router from 'vue-router';
import NewsRack from '@/components/NewsRack';
import Shelf from '@/components/Shelf';
import Reader from '@/components/Reader';
import NotFoundComponent from '@/components/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'latest',
      component: NewsRack,
    },
    {
      path: '/reader',
      name: 'reader',
      component: Reader,
    },
    {
      path: '/shelf',
      name: 'shelf',
      component: Shelf,
    },
    { path: '*',
      component: NotFoundComponent,
    },
  ],
});
