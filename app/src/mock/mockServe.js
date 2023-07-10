// 引入mockjs模块
import Mock from "mockjs";
// 引入json数据格式 (没有暴露json, 但可以直接引入)
// webpack默认对外暴露：图片、JSON数据格式
import banner from "./banner.json";
import floor from "./floor.json";

// mock数据；第一个参数是 请求地址，第二个参数是 请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
