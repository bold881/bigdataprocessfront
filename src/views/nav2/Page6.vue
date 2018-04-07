<template>
  <div>
		<el-breadcrumb separator="/" class="breadcrumb-inner">
			<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
				{{ item.name }}
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="hor-padding-20">
			<section class="panel">
				<div class="common-tips">
					<i class="el-icon-info"></i>
					今日数据有一小时延迟
				</div>
				<div class="date-selection">
					<el-radio-group v-model="radioDateSelection">
						<el-radio-button label="今天"></el-radio-button>
						<el-radio-button label="昨天"></el-radio-button>
						<el-radio-button label="本周"></el-radio-button>
						<el-radio-button label="上周"></el-radio-button>
						<el-radio-button label="本月"></el-radio-button>
						<el-radio-button label="最近30天"></el-radio-button>
					</el-radio-group>
					<el-date-picker v-model="vDuration" type="daterange" range-separator="~" start-placeholder="开始" end-placeholder="结束"></el-date-picker>
				</div>
			</section>
			<div>
				<el-table :data="tableData" style="width: 100%;" :default-sort = "{prop: 'date', order: 'descending'}">
					<el-table-column prop="date" label="汇总"></el-table-column>
					<el-table-column prop="name" label="曝光次数" sortable ></el-table-column>
					<el-table-column prop="name" label="点击次数" sortable ></el-table-column>
					<el-table-column prop="name" label="点击人数" sortable ></el-table-column>
					<el-table-column prop="name" label="点击率" sortable ></el-table-column>
					<el-table-column prop="name" label="到达次数" sortable ></el-table-column>
					<el-table-column prop="name" label="到达人数" sortable ></el-table-column>
					<el-table-column prop="name" label="到达率" sortable ></el-table-column>
					<el-table-column prop="name" label="二跳数" sortable ></el-table-column>
					<el-table-column prop="name" label="二跳率" sortable ></el-table-column>
					<el-table-column prop="name" label="点击转化" sortable ></el-table-column>
					<el-table-column prop="name" label="曝光转化" sortable ></el-table-column>
				</el-table>
			</div>
			<el-select class="chart-data-type" v-model="value" placeholder="请选择">
    		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  		</el-select>
			<div id="chartColumn" style="width:100%; height:400px; padding:20px 0"></div>
				<div>
					<el-table :data="tableData" style="width: 100%;" :default-sort = "{prop: 'date', order: 'descending'}">
						<el-table-column prop="date" label="日期"></el-table-column>
						<el-table-column prop="name" label="曝光次数" sortable ></el-table-column>
						<el-table-column prop="name" label="点击次数" sortable ></el-table-column>
						<el-table-column prop="name" label="点击人数" sortable ></el-table-column>
						<el-table-column prop="name" label="点击率" sortable ></el-table-column>
						<el-table-column prop="name" label="到达次数" sortable ></el-table-column>
						<el-table-column prop="name" label="到达人数" sortable ></el-table-column>
						<el-table-column prop="name" label="到达率" sortable ></el-table-column>
						<el-table-column prop="name" label="二跳数" sortable ></el-table-column>
						<el-table-column prop="name" label="二跳率" sortable ></el-table-column>
						<el-table-column prop="name" label="点击转化" sortable ></el-table-column>
						<el-table-column prop="name" label="曝光转化" sortable ></el-table-column>
					</el-table>
					<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page="currentPage" 
					:page-sizes="[10, 20, 30, 40]"
      		:page-size="10"
      		layout="sizes, total, prev, pager, next"
      		:total="19">
    			</el-pagination>
			</div>
		</div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      vDuration: "",
      radioDateSelection: "",
      currentPage: 1
    };
  },
  methods: {
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.chartColumn.setOption({
        title: { 
          text: '活动分析',
          left: 'center',
         },
        tooltip: {},
        xAxis: {
            data: ["3月22日", "3月23日", "3月24日"]
        },
        yAxis: {},
        grid: {
          left: "4%",
          right: "4%",
          top: "8%",
          bottom: "13%",
          containLabel: true
        },
        legend: {
          data: ["重庆寒武纪信息技术有限公司"],
          bottom: 10
        },
        series: [{
            name: '重庆寒武纪信息技术有限公司',
            type: 'bar',
            barMaxWidth: 80,
            data: [5, 20, 36]
          }]
      });
    },
  },
  mounted: function() {
    this.drawColumnChart();
  },
  updated: function() {
    this.drawColumnChart();
  }
};
</script>

<style lang="scss">
body {
  font-family: "Microsoft Yahei", "Lato", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857;
  color: #767676;
}
.el-breadcrumb {
  padding: 10px 15px;
  background-color: #f3f3f3;
  font-size: 12px;
}
.hor-padding-20 {
  padding-left: 20px;
  padding-right: 20px;
}
.common-tips {
  color: #af7f18;
}
.panel {
  font-size: 12px;
  padding: 15px 0 15px 0;
  box-shadow: none;
}
.el-radio-button__inner {
  border: none;
  font-size: 12px;
  font-weight: bold;
  padding: 6px 10px;
  color: #767676;
}

.el-radio-button:first-child .el-radio-button__inner {
  border: none;
  border-radius: 0;
}
.el-radio-button:last-child .el-radio-button__inner {
  border: none;
  border-radius: 0;
}
.date-selection {
  position: relative;
  float: right;
}
.el-input__inner {
  border-radius: 0;
  height: 34px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 180px;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0;
  padding-right: 0;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
}
.el-table th,
.el-table tr {
  background-color: #f3f3f3;
}
.chart-data-type {
  padding-left: 55px;
  padding-top: 30px;
  padding-bottom: 0;
}
.el-pagination {
  float: right;
  padding-bottom: 10px;
}
.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  display: inline-block;
  font-size: 12px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-pager li {
    padding: 0 4px;
    background: #fff;
    font-size: 12px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
}
.el-pagination__sizes .el-input .el-input__inner {
    font-size: 12px;
    padding-left: 8px;
}
</style>
