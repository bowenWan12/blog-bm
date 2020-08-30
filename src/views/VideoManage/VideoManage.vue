<template>
  <div class="blog-tm-line">
    VideoManage
    <common-blog :activities="activities"></common-blog>
  </div>
</template>

<script>
import CommonBlog from "../../components/CommonBlog";
export default {
  components: {
    CommonBlog
  },
  data() {
    return {
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
