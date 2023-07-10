import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 封装的临时游客身份的模块uuid 生成一个随机字符串
import { getUUID } from "@/utils/uuid_token";
// detail模块的小仓库
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  // 获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  // 将产品添加到购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车后发请求，前台把参数带给服务器
    // 服务器存储数据成功后，并没有返回数据，只返回成功或失败(不需要在提交mutation，不需要在存储数据)
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // 带了async 返回的是一个promise对象 有成功 失败两种形式
    if (result.code == 200) {
      // 成功
      return "加入购物车成功";
    } else {
      // 失败
      return Promise.reject(new Error("faile"));
    }
  },
};
// 简化数据
const getters = {
  // 路径导航
  categoryView(state) {
    // 当服务器的数据还没返回时，state.goodInfo 返回undefined(在state里初始状态是一个空对象) 不然会报错(但不影响)
    return state.goodInfo.categoryView || {};
  },
  // 产品信息
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 售卖属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
