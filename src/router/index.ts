import {createRouter, createWebHashHistory} from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: `not-found`,
    component: NotFoundView,
  },
  {
    path: `/`,
    name: `home`,
    component: HomeView
  },
  {
    path: `/books`,
    name: `books`,
    component: () => import(/* webpackChunkName: "books" */ '@/views/BookListView.vue')
  },
  {
    path: `/books/add`,
    name: `books-add`,
    component: () => import(/* webpackChunkName: "books-add" */ '@/views/AddBookView.vue')
  },
  {
    path: `/books/:bookId/edit`,
    name: `books-edit`,
    component: () => import(/* webpackChunkName: "books-edit" */ '@/views/EditBookView.vue'),
    props: true,
  },
  {
    path: `/authors`,
    name: `authors`,
    component: () => import(/* webpackChunkName: "authors" */ '@/views/AuthorListView.vue')
  },
  {
    path: `/authors/add`,
    name: `authors-add`,
    component: () => import(/* webpackChunkName: "authors-add" */ '@/views/AddAuthorView.vue')
  },
  {
    path: `/authors/:authorId/edit`,
    name: `authors-edit`,
    component: () => import(/* webpackChunkName: "authors-edit" */ '@/views/EditAuthorView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {left: 0, top: 0, behavior: `smooth`}
  },
})

Object.assign(window, {router})

export default router
