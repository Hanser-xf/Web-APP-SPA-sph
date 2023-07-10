import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    // reqGetSearchInfo函数调用获取服务器数据，至少传一个参数(空对象)
    // params形参: 是用户派发action的时候，第二个参数传递过来，至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// 计算属性
// getters主要的作用是：简化仓库中的数据
const getters = {
  // 形参state，是当前仓库的state，不是大仓库的state
  goodsList(state) {
    // state.searchList.goodsList,如果服务器数据回来了，是一个数组，但如果没有网络，返回的是undefined
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
