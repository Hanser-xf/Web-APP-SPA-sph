<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的位置(展示地方) -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action获取商品分类的三级列表标题
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
