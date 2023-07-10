import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogOut,
} from "@/api";
import { getToken, setToken, removeToken } from "@/utils/token";
// 登录与注册模块
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 清除本地数据和仓库中的用户信息
  CLEARUSER(state) {
    state.token = "";
    state.userInfo = "";
    removeToken();
  },
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的接口把验证码返回，实际是后台把验证码发给用户手机来使用
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "成功";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    console.log(result);
    if (result.code == 200) {
      return "注册成功";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 登录业务
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      // 登录成功获取到token
      commit("USERLOGIN", result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "成功";
    } else {
      Promise.reject(new Error("faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "成功";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 退出登录
  async userLogOut({ commit }) {
    // 向服务器发请求，只清除了服务器的数据
    let result = await reqLogOut();
    if (result.code == 200) {
      commit("CLEARUSER");
      return "成功";
    } else {
      Promise.reject(new Error("faile"));
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
