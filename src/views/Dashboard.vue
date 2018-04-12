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
                  <h1 class="vue-binding">{{zaitoujihuashu}}</h1>
                  <p>在投计划数</p>
                </div>
                <div class="panel-right panel-item bg-info">
                  <h1 class="vue-binding">{{zaitouhuodongshu}}</h1>
                  <p>在投活动数</p>
                </div>
              </section>
              <div>
                <ul class="list-justified">
                  <li>
                    <p>{{zongbaoguang}}</p>
                    <p>总曝光</p>
                  </li>
                  <li>
                    <p>{{zongdianji}}</p>
                    <p>总点击</p>
                  </li>
                  <li>
                    <p>{{dianjilv}}%</p>
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
                          <p>{{yue}}</p>
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
                          <p>{{zuoriguanggaohuafei}}</p>
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
                          <p>{{jinriguanggaohuafei}}</p>
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
            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
            <div id="chartLine" style="width:100%; height:300px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
import echarts from "echarts";
import { getDashboardData } from "../api/api";

export default {
  name: "dashboard",
  data() {
    return {
      date: '',
      zaitoujihuashu: "0",
      zaitouhuodongshu: "0",
      zongbaoguang: "",
      zongdianji: "",
      yue: "",
      zuoriguanggaohuafei: '',
      jinriguanggaohuafei: '',
      baoguangcishu: '',
      dianjicishu: '',
      dianjilv: '',
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
          bottom: 0,
        },
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "13%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "曝光次数",
            type: "line",
            smooth: true,
            data: this.baoguangcishu,
          },
          {
            name: "点击次数",
            type: "line",
            smooth: true,
            data: this.dianjicishu,
          }
        ]
      });
    },
    initData() {
      var userstr = sessionStorage.getItem("user");
      if(userstr) {
        var user = JSON.parse(userstr);
        var today = new Date();
        var date =  today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
        var params = {id:user.ID, date:date}
        getDashboardData(params).then(data => {
          var retObj = data.data;
          if(retObj) {
            this.date = retObj.Date;
            this.zaitoujihuashu = retObj.Zaitoujihuashu;
            this.zaitouhuodongshu = retObj.Zaitouhuodongshu;
            this.zongbaoguang = retObj.Zongbaoguang;
            this.zongdianji = retObj.Zongdianji;
            this.yue = retObj.Yue;
            this.zuoriguanggaohuafei = retObj.Zuoriguanggaohuafei;
            this.jinriguanggaohuafei = retObj.Jinriguanggaohuafei;
            this.baoguangcishu = retObj.Baoguangcishu;
            this.dianjicishu = retObj.Dianjicishu;
            this.dianjilv = this.zongdianji/this.zongbaoguang*100;
          }
          
        });
      }
    }
  },
  mounted: function() {
    this.drawLineChart();
    this.initData();
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