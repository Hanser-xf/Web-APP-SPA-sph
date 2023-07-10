import { reqCartList, reqDeleteCartId, reqUpdateCheckedById } from "@/api";
const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartId(skuId);
    if (result.code) {
      return "删除购物车产品成功";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 修改购物车某一产品的选中状态
  async updateCheckedById({ coomit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "修改选中状态成功";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({ getters, dispatch }) {
    // context: 小仓库，里有commit-提交mutations修改state, getters-计算属性, dispatch-派发action, state-当前仓库的数据
    // 获取购物车的全部商品
    let cartAll = getters.cartList.cartInfoList;
    let PromiseAll = [];
    cartAll.forEach((item) => {
      let Promise =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      // 把每一次返回的Promise添加到数组里
      PromiseAll.push(Promise);
    });
    // 如果有一个Promise失败，返回失败，如果都成功，返回成功
    return Promise.all(PromiseAll);
  },
  // 修改全选的状态
  updateAllCartIsChecked({ state, dispatch }, isChecked) {
    let cartAll = state.cartList[0].cartInfoList;
    let PromiseAll = [];
    cartAll.forEach((item) => {
      let Promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked: isChecked,
      });
      PromiseAll.push(Promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
