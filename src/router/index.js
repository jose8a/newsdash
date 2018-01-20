import Vue from 'vue';
import Router from 'vue-router';
import NewsRack from '@/components/NewsRack';
import Shelf from '@/components/Shelf';
import Archives from '@/components/Archives';
import MyPaper from '@/components/MyPaper';
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
      path: '/paper',
      name: 'paper',
      component: MyPaper,
    },
    {
      path: '/shelf',
      name: 'shelf',
      component: Shelf,
    },
    {
      path: '/archives',
      name: 'archives',
      component: Archives,
    },
    { path: '*',
      component: NotFoundComponent,
    },
  ],
});
