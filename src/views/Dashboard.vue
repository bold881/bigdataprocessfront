<template>
    <el-row :gutter="20" class="padding-20">
      <el-col :span="12">
        <el-row>
          <el-card class="box-card card-left-top">
            <div slot="header">
              <span class="jrtfgl"><i class="el-icon-menu"></i>今日投放概览</span>
            </div>
            <div class="card-body">
              <section class="panel panel-box">
                <div class="panel-left panel-item bg-info">
                  <h1 class="vue-binding">{{ztjhs}}</h1>
                  <p>在投计划数</p>
                </div>
                <div class="panel-right panel-item bg-info">
                  <h1 class="vue-binding">{{zthds}}</h1>
                  <p>在投活动数</p>
                </div>
              </section>
              <div>
                <ul class="list-justified">
                  <li>
                    <p>0</p>
                    <p>总曝光</p>
                  </li>
                  <li>
                    <p>0</p>
                    <p>总点击</p>
                  </li>
                  <li>
                    <p>0.00%</p>
                    <p>点击率</p>
                  </li>
                </ul>
              </div>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="jrtfgl"><i class="el-icon-menu"></i>今日结算概览</span>
            </div>
            <div class="card-body">
              <el-row :gutter="10">
                <el-col :span="8">
                  <section class="panel panel-box">
                    <div class="panel-top bg-success">
                      
                      <h1>账户</h1>
                      
                    </div>
                    <div>
                      <ul class="list-justified text-center">
                        <li>
                          <p>-￥18.00</p>
                          <p class="text-muted">账户余额</p>
                        </li>
                      </ul>
                    </div>
                  </section>
                </el-col>
                <el-col :span="8">
                  <section class="panel panel-box">
                    <div class="panel-top bg-warning">
                      <div class="divider"></div>
                      <h1>昨日</h1>
                      <div class="divider"></div>
                    </div>
                    <div>
                      <ul class="list-justified text-center">
                        <li>
                          <p>￥0.00</p>
                          <p class="text-muted">昨日广告花费</p>
                        </li>
                      </ul>
                    </div>
                  </section>
                </el-col>
                <el-col :span="8">
                  <section class="panel panel-box">
                    <div class="panel-top bg-info">
                      <div class="divider"></div>
                      <h1>今日</h1>
                      <div class="divider"></div>
                    </div>
                    <div>
                      <ul class="list-justified text-center">
                        <li>
                          <p>￥0.00</p>
                          <p class="text-muted">今日广告花费</p>
                        </li>
                      </ul>
                    </div>
                  </section>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="jrtfgl"><i class="el-icon-menu"></i>今日投放状况</span>
          </div>
          <div>
            <el-date-picker v-model="vDate" type="date" placeholder="选择日期"></el-date-picker>
            <div id="chartLine" style="width:100%; height:300px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
import echarts from "echarts";
export default {
  name: "dashboard",
  data() {
    return {
      ztjhs: "0",
      zthds: "0",
      vDate: ''
    };
  },
  methods: {
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["曝光次数", "点击次数"],
          top: 10,
          right: 0
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "曝光次数",
            type: "line",
            stack: "总量",
            data: [0.1, 0.3, 0.21, 0.12, 0.64, 0.63, 0.99]
          },
          {
            name: "点击次数",
            type: "line",
            stack: "总量",
            data: [0.73, 0.64, 0.90, 0.31, 0.76, 0.16, 0.84]
          }
        ]
      });
    }
  },
  mounted: function() {
    this.drawLineChart();
  },
  updated: function() {
    this.drawLineChart();
  }
};
</script>

<style lang="scss">
.jrtfgl {
  font-weight: bold;
  color: #767676;
  font-size: 12px;
}
.card-left-top {
  height: 286px;
}
.el-card__header {
  background-color: #f6f6f6;
  height: 38px;
  padding: 10px 15px;
}
.el-card__body {
  padding: 15px;
}
.panel {
  height: 56px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-box {
  display: table;
  table-layout: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px;
  .panel-left {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  .panel-right {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  .panel-item {
    display: table-cell;
    width: 1%;
    vertical-align: top;
    border-radius: 0;
  }
}
.bg-info {
  background-color: #2ec1cc;
  color: #fff;
}
.bg-success {
  background-color: #23AE89;
  color: #fff;
}
.bg-warning {
  background-color: #ffb61c;
  color: #fff;
}
.text-center{
  text-align: center;
}
.text-muted{
  color:#000;
}
.card-body {
  width: 100%;
}
.list-justified {
  display: table;
  width: 100%;
  list-style: none;
  padding: 0;
  text-align: center;
  color: #777777;
  margin-top: 0;
  margin-bottom: 10px;
  li {
    float: none;
    display: table-cell;
    padding: 10px;
    width: 1%;
    border-right: 1px solid #eee;
  }
}
li:last-child {
  border-right: 0px;
}
ul, ol {
  margin-top: 0;
  margin-bottom: 10px;
}
h1, .h1 {
  font-size: 36px;
}
h1, .h1, h2, .h2, h3, .h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
}
.el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

.padding-20 {
  padding: 20px;
  margin-left: 0px !important;
  margin-right: 0px !important;
}
</style>