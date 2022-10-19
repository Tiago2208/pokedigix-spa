import { createRouter, createWebHistory } from 'vue-router';
const PokemonListaView = () => import('@/views/PokemonListaView.vue');
const TipoNovoView = () => import ('@/views/TipoNovoView.vue');
const TipoListaView = () => import ('@/views/TipoListaView.vue');
const AtaqueNovoView = () => import ('@/views/AtaqueNovoView.vue');
const AtaqueListaView = () => import ('@/views/AtaqueListaView.vue');
const AtaqueEditView = () => import ('@/views/AtaqueEditView.vue');
const TipoEditView = () => import ('@/views/TipoEditView.vue');
const PokemonNovoView = () => import ('@/views/PokemonNovoView.vue');
const TreinadorNovoView = () => import ('@/views/TreinadorNovoView.vue');
const TreinadorListaView = () => import ('@/views/TreinadorListaView.vue');
const PageNotFound = () => import('@/views/PageNotFound.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonListaView
    },
    {
      path: '/:catchAll(.*)*',
      name:"not-found",
      component: PageNotFound,
    },
    {
      path: '/pokemons/lista',
      name: 'pokemons-lista',
      component: PokemonListaView
    },
    {
      path: '/tipos/novo',
      name: 'tipos-novo',
      component: TipoNovoView
    },
    {
      path: '/tipos/edit/:id',
      name: 'tipos-edit',
      component: TipoEditView
    },
    {
      path: '/tipos/lista',
      name: 'tipos-lista',
      component: TipoListaView
    },
    {
      path: '/ataques/novo',
      name: 'ataques-novo',
      component: AtaqueNovoView
    },
    {
      path: '/ataques/edit/:id',
      name: 'ataques-edit',
      component: AtaqueEditView
    },
    {
      path: '/ataques/lista',
      name: 'ataques-lista',
      component: AtaqueListaView
    },
    {
      path: '/pokemons/novo',
      name: 'pokemons-novo',
      component: PokemonNovoView
    },
    {
      path: '/treinadores/novo',
      name: 'treinadores-novo',
      component: TreinadorNovoView
    },
    {
      path: '/treinadores/lista',
      name: 'treinadores-lista',
      component: TreinadorListaView
    },
  ]
})

export default router
