import api from '@/api'
import Vue from 'vue'
import { flash } from '@/utils'

export default {
  namespaced: true,
  state: {
    codeList: [],
    dynamicLink: ''
  },
  getters: {
    dyanmicCodeList (state) {
      return state.codeList
    }
  },
  mutations: {
    loadCodes (state, codes) {
      state.codeList = codes
    },
    setDynamicLink (state, link) {
      state.dynamicLink = link
    },
    new (state, code) {
      state.codeList.unshift(code)
      flash('QR code registered')
    },
    update (state, code) {
      let targetIndex = state.codeList.findIndex(element => element.id === code.id)
      Vue.set(state.codeList, targetIndex, code)
      flash('QR code updated')
    },
    delete (state, code) {
      let targetIndex = state.codeList.findIndex(element => element.id === code.id)
      state.codeList.splice(targetIndex, 1)
      flash('QR code deleted')
    }
  },
  actions: {
    async fetchCodeList (context) {
      await context.dispatch('auth/fetchUser', {}, { root: true })
      if (context.rootGetters['auth/user'] === false) {
        return
      }
      context.commit('loading', true, { root: true })

      let route = '/codes'
      let response = await api.get(route, {
        params: {
          api_token: context.rootGetters['auth/apiToken']
        }
      })
      context.commit('loadCodes', response.data.reverse())

      context.commit('loading', false, { root: true })
    },

    async new (context, code) {
      context.commit('loading', true, { root: true })

      let route = '/codes'
      let response = await api.post(route, { ...code, api_token: context.rootGetters['auth/apiToken'] })
      context.commit('new', response.data)

      context.commit('loading', false, { root: true })
    },

    async update (context, code) {
      context.commit('loading', true, { root: true })

      let route = `/codes/${code.id}`
      let response = await api.patch(route, { ...code, api_token: context.rootGetters['auth/apiToken'] })
      context.commit('update', response.data)

      context.commit('loading', false, { root: true })
    },

    async delete (context, code) {
      context.commit('loading', true, { root: true })

      let route = `/codes/${code.id}`
      let response = await api.delete(route, { params: { api_token: context.rootGetters['auth/apiToken'] } })
      context.commit('delete', response.data)

      context.commit('loading', false, { root: true })
    }
  }
}
