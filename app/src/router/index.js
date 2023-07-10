// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
import routes from "@/router/routes";
Vue.use(VueRouter);
// 引入store
import store from "@/store";

// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push\replace
// 第一个参数：告诉原来push方法，你往哪里跳转(传递那些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call\apply的区别
    // 相同点：都可以调用函数一次，都可以修改函数的上下文
    // 不同点：call与apply传递参数：call 用逗号隔开，apply 传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
let router = new VueRouter({
  // 配置路由(相关内容放在routes.js)
  routes: routes,
  // 滚动行为，跳转到新页面时滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    // x:0 y:0 为滚动条的位置
    return { y: 0 };
  },
});

// 全局守卫: 前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let useaName = store.state.user.userInfo.name;
  if (token) {
    // 已登录
    if (to.path == "/login") {
      next("/home");
    } else {
      // 不去登录页面，仓库有用户信息才跳转
      if (useaName) {
        next();
      } else {
        // 仓库没有用户信息，就dispatch获取
        try {
          // 获取用户信息成功
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token失效了
          // 清除token，路由跳转到登录页面
          store.dispatch("userLogOut");
          next("/login");
        }
      }
    }
  } else {
    // 未登录
    let toPath = to.path;
    let pathAll = [
      "/trade",
      "/pay",
      "/paysuccess",
      "/center",
      "/shopcart",
      "/center/myorder",
      "/addcartsuccess",
    ];
    // 如果去往路径满足上述其中一个路由跳转到登录/login
    let result = pathAll.some((item) => item == toPath);
    if (result) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
export default router;
