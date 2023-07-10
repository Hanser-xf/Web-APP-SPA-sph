// 引入一级路由组件
// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// 引入二级路由
// import
// import MyOrder from "@/pages/Center/MyOrder";
// import GroupOrder from "@/pages/Center/GroupOrder";

// 路由懒加载, 把不同的路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
// 路由配置信息
// const FOO = () => {
//   return import("@/pages/Home");
// };
// const FOO = () => import("@/pages/Home");
export default [
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    name: "search",
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    // :skuid 是参数 ?占位符
    path: "/detail/:skuid?",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
    name: "detail",
  },
  {
    path: "/addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
    name: "addcartsuccess",
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面必须从-购物车来
      if (from.path == "/shopcart") {
        next();
      } else {
        // 中断导航，如果浏览器的URL改变了，那么URL地址重置到from对应的路由
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/GroupOrder"),
      },
      // 重定向
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },

  // 重定向，项目在跑起来的时候，访问/，立马定向到首页
  {
    path: "*",
    redirect: "/home",
  },
];
