import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import categs from '@/store/modules/categs'
import ideas from '@/store/modules/ideas'
import idea from '@/store/modules/singleIdea'
import tags from '@/store/modules/tags'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {   

    auth,
    ideas,
    tags,
    categs,
    idea

  }
})
