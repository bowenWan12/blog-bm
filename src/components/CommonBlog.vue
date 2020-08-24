<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item 
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
      :icon="activity.icon ? activity.icon : 'el-icon-more'"
      :type="activity.type ? activity.type : 'primary'"
      :color="activity.color ? activity.color : '#0bbd87'"
      :size="activity.size ? activity.size : 'large'"
      placement="top"
      >
        <el-card>
          <h4>{{ activity.timestamp }}</h4>
          <p>{{ activity.content }}</p>
        </el-card>
      </el-timeline-item>
      <!-- <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item> -->
    </el-timeline>
  </div>
</template>

<script>
export default {
    props: {
        activities: Array
    },
};
</script>

<style lang="scss" scoped>
</style>