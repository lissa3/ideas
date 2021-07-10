import Vue from 'vue'
import VueRouter from 'vue-router'

import Activate from '@/views/auth/Activate'
import ConfirmEmail from '@/views/auth/ConfirmEmail'
import Google from '@/views/auth/Google'
import GoogleForm from '@/views/auth/GoogleForm'
import Home from "@/views/Home";
import IdeaGeneral from '@/views/IdeaGeneral'
import IdeaSearch from '@/views/IdeaSearch'
import IdeaFilter from '@/views/IdeaFilter'
import CategIdeas from '@/views/CategIdeas'
import Login from '@/views/auth/Login'
import SignUp from "@/views/auth/SignUp";
import PswForgotStart from "@/views/auth/PswForgotStart";
import SetPswReset from '@/views/auth/PswReset'
import SetPswChange from '@/views/auth/ChangePsw'
import PswForgotFailure from "@/views/auth/MsgPswResetFailure";
import TagIdeas from '@/views/TagIdeas'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/google-login",
    name: "google",
    component: Google,
  },
  {
    path: "/google",
    name: "google-form",
    component: GoogleForm,
  },
  {
    path: "/confirm-email-link/",
    name: "confirmEmail",
    component: ConfirmEmail,
  },
  {
    path: "/activate/:uid/:token",
    name: "activate",
    component: Activate,
    props:true
  },
  {
    path: "/reset-password/",
    name: "resetForgotPsw",
    component: PswForgotStart,
  },
  {
    path: "/password/reset/confirm/:uid/:token",
    name: "setPswReset",
    component: SetPswReset,
    props:true
  },
  {
    path: "/change-password/",
    name: "passwordChange",
    component: SetPswChange,
  },
  {
    path: "/reset-password-failure/",
    name: "resetForgotPswFailure",
    component: PswForgotFailure,
  },
  {
    path: '/general-ideas',
    name: 'ideaGeneral',
    component: IdeaGeneral
  },
  // {
  //   // render all favorite ideas//????
  //   path: '/idea',
  //   name: 'idea',
  //   component: IdeaGeneral
  // },
  {
    // to render all ideas for a given tag
    path: '/tags/:slug',
    name: 'tag',
    component: TagIdeas
  },
  {
    // to render all ideas for a given category
    path: '/category-idea/:slug',
    name: 'categ',
    component: CategIdeas
  },
  {
    path: '/idea/search/:term',
    name: 'search',
    component: IdeaSearch
  },
  {
    path: '/idea/filter/:sort/:featured',
    name: 'filter',
    component: IdeaFilter
  },
  {
    path: '/settings',
    name: 'settings',
    component: IdeaGeneral
  },
  {
    path: '/profiles?:slug',
    name: 'userProfile',
    component: IdeaGeneral
  },
  {
    path: '/profiles?:slug/favories',
    name: 'userProfileFavoriets',
    component: IdeaGeneral
  },
  {
   path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
