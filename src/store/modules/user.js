/**
 Created by  lanjian   on 2021/3/4  10:06
 Copyright 奥尔特云（深圳）智慧科技有限公司. All rights reserved.
 */
const state = {
  userInfo: ''
}
const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}
const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
