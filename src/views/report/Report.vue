<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <div id="main" style="width: 750px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {getReportsDate} from 'network/report'
import _ from 'lodash'
export default {
  data() {
    return {
      // 需要与网络请求的报表数据合并
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  // mounted中存在页面元素dom
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 获取配置项和数据的网络请求
    const {data: res} = await getReportsDate()
    if(res.meta.status !== 200){
      return this.$message.error("获取数据报表失败")
    }
    // 合并数据和配置项
    _.merge(res.data, this.options)
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(res.data);
  },
};
</script>

<style lang="less" scoped>
</style>