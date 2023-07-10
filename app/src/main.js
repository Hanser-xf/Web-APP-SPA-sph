import Vue from "vue";
import App from "./App.vue";

// 三级联动组件-全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 测试 引入elementui
import { Button, MessageBox } from "element-ui";
// 第一个参数：全局组件的名字， 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 全局注册
Vue.component(Button.name, Button);
// elementUI注册组件的另一种写法，挂在vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from "@/router";
// 引入仓库
import store from "@/store";
// 引入mockServe.js----mock数据
import "@/mock/mockServe";
// 引入swiper样式
import "swiper/css/swiper.css";
// 统一引入api文件夹里的全部请求函数
import * as API from "@/api";
import lty from "@/assets/lty.gif";
// 引入插件(图片懒加载)
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: lty,
});
// 引入检验插件 VeeValidate
import "@/plugins/validate";

new Vue({
  render: (h) => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由：地下的写法kv一致省略(router小写)
  // 注册路由信息：当这里写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库；组件实例的身上会多一个$store属性
  store,
}).$mount("#app");
