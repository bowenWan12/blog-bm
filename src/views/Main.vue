<template>
  <el-container style="height: 100%">
    <el-aside width="200px"><common-aside></common-aside></el-aside>
    <el-container>
      <el-header><common-header></common-header></el-header>
      <common-tab></common-tab>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonAside from "../components/CommonAside";
import CommonTab from "../components/CommonTab";
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  }
};
</script>

<style lang="postcss" scoped>
.el-header {
  background-color: #333;
}
</style>
