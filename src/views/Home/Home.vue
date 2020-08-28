<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="user-info">
            <p class="name">Winds</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间： <span>2020-02-02</span></p>
          <p>上次登录地点： <span>上海</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 520px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">RMB {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height: 280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height: 260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart
            style="height: 260px"
            :chartData="echartData.video"
            :isAxisChart="false"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "../../components/Echart";
import { getStatisticalData } from '@/api/home'
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require("../../assets/image/user.png"),
      countData: [
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: "1234",
          icon: "success",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: "1234",
          icon: "success",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: "1234",
          icon: "success",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: "1234",
          icon: "success",
          color: "#5ab1ef"
        }
      ],
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  methods: {
    getTableData() {
      let that = this
      getStatisticalData().then(res => {
        console.log(res)
        // res = res.data
        that.tableData = res.data.tableData;
        console.log(res.data);
        //订单折线图
        const orderDates = res.data.orderData;
        that.echartData.order.xData = orderDates.date;
        // 第一步，取出series中的键名
        console.log(orderDates.data)
        let keyArray = Object.keys(orderDates.data[0]);
        console.log(keyArray);
        keyArray.forEach(key => {
          that.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: orderDates.data.map(item => item[key]),
            type: "line"
          });
        });
        // 用户柱状图
        that.echartData.user.xData = res.data.userData.map(item => item.date);
        that.echartData.user.series.push({
          name: "新增用户",
          data: res.data.userData.map(item => item.newly),
          type: "bar"
        });
        that.echartData.user.series.push({
          name: "活跃用户",
          data: res.data.userData.map(item => item.active),
          type: "bar",
          barGap: 0
        });
        // 视频饼图
        that.echartData.video.series.push({
          data: res.data.videoData,
          type: "pie"
        });
      });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home";
</style>
