// 当前这个模块；API进行统一管理
import requests from "./request";
// 引入二次封装的ajax
import mockRequests from "./mockAjax";

// 三级联动的接口
// URL: /api/product/getBaseCategoryList  method：get
// 发请求；axios请求返回的结果是Promise对象
export const reqCategoryList = () => {
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};

// 获取banner 首页轮播图的接口
export const reqGetBannerList = () => {
  return mockRequests({ url: "/banner", method: "get" });
};

// 获取floor数据
export const reqFloorList = () => {
  return mockRequests({ url: "/floor", method: "get" });
};

// 获取搜索数据
// URL: /api/list  method：post 携带参数
// 当前这个函数需不需要接受外部传递参数
// 当前这个接口(获取搜索模块的数据)，给服务器传递的一个默认参数(至少是一个空对象)
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });

// 获取产品详情的接口 URL: /api/item/{ skuId }  method：get 携带参数skuid
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

// 将产品添加到购物车或者更新某一个产品的个数
// URL: /api/cart/addToCart/{ skuId }/{ skuNum }  method：post
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车列表数据的接口
// URL: /api/cart/cartList  method：get
export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

// 删除购物车产品的接口
// URL：/api/cart/deleteCart/{skuId}  method：delete 携带参数skuid
export const reqDeleteCartId = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 修改产品选中状态的接口
// URL: /api/cart/checkCart/{skuId}/{isChecked}  method：get 携带参数
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 获取验证码的接口
// URL: /api/user/passport/sendCode/{phone}  method: get
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 注册
// URL: /api/user/passport/register  method: post 携带参数
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });

// 登录
// URL: /api/user/passport/login  method: post 携带参数
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });

// 获取用户信息--需要携带token向服务器发请求
// URL: /api/user/passport/auth/getUserInfo  method: get
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录
// URL: /api/user/passport/logout  method: get
export const reqLogOut = () =>
  requests({ url: "/user/passport/logout", method: "get" });

// 获取地址信息
// URL: /api/user/userAddress/auth/findUserAddressList  method: get
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

// 获取商品订单
// URL: /api/order/auth/trade  method: get
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

// 获取支付信息
// URL: /api/order/auth/submitOrder?tradeNo={tradeNo}  method: post
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

// 获取订单支付信息
// URL: /api/payment/weixin/createNative/{orderId}  method: get
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

// 获取支付订单状态
// URL: /api/payment/weixin/createNative/{orderId}  method: get
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId} `,
    method: "get",
  });

// 获取个人中心数据
// URL: /api/order/auth/{page}/{limit}  method: get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
