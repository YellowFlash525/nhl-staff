import Vue from 'vue';
import Router from 'vue-router';
import TeamInfo from './views/TeamInfo.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/players',
      name: 'players',
      component: () => import(/* webpackChunkName: "players" */ './views/Players.vue'),
    },
    {
      path: '/players/:id',
      name: 'playersinfo',
      component: () => import(/* webpackChunkName: "players" */ './views/PlayerInfo.vue'),
    },
    {
      path: '/teams',
      name: 'teams',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Teams.vue'),
    },
    {
      path: '/teams/players/:id',
      name: 'playersinfo',
      component: () => import(/* webpackChunkName: "about" */ './views/PlayerInfo.vue'),
    },
    {
      path: '/teams/:id',
      name: 'teamsinfo',
      component: TeamInfo,
    },
  ],
});
