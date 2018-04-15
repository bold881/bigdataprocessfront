<template>
  <div>
		<el-breadcrumb separator="/" class="breadcrumb-inner">
			<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
				{{ item.name }}
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="hor-padding-20">
			<div>
				<p class="top-tips-p">账户余额：{{this.zhanghuyue}}</p>
				<p class="top-tips-p">今日广告花费：{{this.jinriguanggaohuafei}}</p>
			</div>
			<section class="panel">
				<div class="common-tips">
					<i class="el-icon-info"></i>
					以下投放数据位实时数据
				</div>
				<div class="date-selection">
					<el-radio-group v-model="radioDateSelection" @change="changeRadioDateSelection">
						<el-radio-button label="今天"></el-radio-button>
						<el-radio-button label="昨天"></el-radio-button>
						<el-radio-button label="本周"></el-radio-button>
						<el-radio-button label="上周"></el-radio-button>
						<el-radio-button label="本月"></el-radio-button>
						<el-radio-button label="最近30天"></el-radio-button>
					</el-radio-group>
					<el-date-picker class="range-date-picker" v-model="vDuration" @change="changeDateSelection" type="daterange" range-separator="~" start-placeholder="开始" end-placeholder="结束"></el-date-picker>
				</div>
			</section>
			<div class="input-class-group">
				<div class="input-class-size">
					<el-select v-model="toufangStatusSelectionValue" placeholder="请选择" @change="onToufangOptionChange">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="input-class-size">
					<el-input placeholder="日期" v-model="dateSearchValue">
						<el-button slot="append" icon="el-icon-search" @click="refreshTableData"></el-button>
					</el-input>
				</div>
			</div>
      <div>
        <el-table :data="tableData" style="width: 100%;" :default-sort = "{prop: 'Date', order: 'descending'}">
          <el-table-column prop="date" label="日期"></el-table-column>
		  <el-table-column prop="Toufangstatus" label="状态" ></el-table-column>
          <el-table-column prop="baoguangcishu" label="曝光次数" ></el-table-column>
          <el-table-column prop="dianjicishu" label="点击次数" ></el-table-column>
          <el-table-column prop="Dianjilv" label="点击率" ></el-table-column>
        </el-table>
        <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentPageChange" 
        :current-page="currentPage" 
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="sizes, total, prev, pager, next"
        :total="tableItemTotalSize">
        </el-pagination>
    </div>
		</div>
  </div>
</template>
<script>
import { getDataPeriod } from "../../api/api";

export default {
  data() {
    return {
      vDuration: "", // 时间选择范围，数组
      userid: "", // 当前用户在数据库中的id
      radioDateSelection: "今天", // 时间选择快捷键的值
      companyName: "", // 图表中的公司名称
      tableData: "", // 每日表的数据
      currentPage: 1, // 当前选择的第几页
      tableItemTotalSize: 0, // 当前条件下查询到的条目数
      pageSize: 5, // 当前选择的每页大小
      tableItemContainer: "", // 存放所有数据库中查询到的数据
      toufangStatusSelectionValue: "全部投放状态",
      options: [
        { label: "全部投放状态", value: "全部投放状态" },
        { label: "暂停", value: "暂停" },
        { label: "投放中", value: "投放中" },
        { label: "已结束", value: "已结束" }
      ],
      zhanghuyue: 0.0,
      jinriguanggaohuafei: 0.0,
      toufanstatus: "",
      dateSearchValue: ""
    };
  },
  methods: {
    changeRadioDateSelection(curDate) {
      if (curDate === "今天") {
        const end = new Date();
        this.vDuration = [end, end];
      } else if (curDate === "昨天") {
        const day = new Date();
        day.setTime(day.getTime() - 3600 * 1000 * 24);
        this.vDuration = [day, day];
      } else if (curDate === "本周") {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * (end.getDay() - 1));
        this.vDuration = [start, end];
      } else if (curDate === "上周") {
        const now = new Date();
        const end = new Date();
        end.setTime(end.getTime() - now.getDay() * 3600 * 1000 * 24);
        const start = new Date();
        start.setTime(end.getTime() - 6 * 3600 * 1000 * 24);
        this.vDuration = [start, end];
      } else if (curDate === "本月") {
        const day = new Date();
        const start = new Date();
        start.setTime(day.getTime() - (day.getDate() - 1) * 3600 * 1000 * 24);
        this.vDuration = [start, day];
      } else if (curDate === "最近30天") {
        const day = new Date();
        const start = new Date();
        start.setTime(day.getTime() - 29 * 3600 * 1000 * 24);
        this.vDuration = [start, day];
      }

      this.getRundataByperiod();
    },
    changeDateSelection(curDate) {
      this.vDuration = curDate;
      this.radioDateSelection = "";
      this.getRundataByperiod();
    },
    getRundataByperiod() {
      if (this.vDuration) {
        var params = {
          Datestart: this.vDuration[0],
          Dateend: this.vDuration[1],
          Id: this.userid
        };
        getDataPeriod(params).then(data => {
          if (data.data === null) {
            this.tableData = "";
            this.tableItemTotalSize = 0;
            this.tableItemContainer = "";
            return;
          }
          var tmpData = data.data;
          var today = new Date();
          today = today.toISOString();
          today = today.split("T")[0];
          var tmpYue, tmpJinriGuanggaohuafei;

          tmpData.forEach(function(element) {
            element.date = element.Date.split("T")[0];
            if (element.date === today) {
              tmpYue = element.Yue;
              tmpJinriGuanggaohuafei = element.Jinriguanggaohuafei;
            }
            element.dianjicishu = element.Dianjicishu.reduce(
              (a, b) => a + b,
              0
            );
            element.baoguangcishu = element.Baoguangcishu.reduce(
              (a, b) => a + b,
              0
            );
            element.Dianjilv += "%";
            element.Daodalv += "%";
            element.Ertiaolv += "%";
          });

          this.zhanghuyue = tmpYue;
          this.jinriguanggaohuafei = tmpJinriGuanggaohuafei;
          this.tableItemContainer = tmpData;
          // 根据分页设置每日表格数据
          this.refreshTableData();
        });
      }
    },
    initData() {
      // 初始化日期
      const end = new Date();
      this.vDuration = [end, end];

      // 初始化名称
      var user = sessionStorage.getItem("user");
      user = JSON.parse(user);
      this.companyName = user.Name;
      this.userid = user.ID;

      // 根据日期获取当前的运营数据
      this.getRundataByperiod();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.refreshTableData();
    },
    handleCurrentPageChange(data) {
      this.currentPage = data;
      this.refreshTableData();
    },
    refreshTableData() {
      var tmpTotalItemData1 = new Array();
      var tmpTotalItemData2 = new Array();
      var tmpToufangSelectValue = this.toufangStatusSelectionValue;
      var tmpSearchValue = this.dateSearchValue;
      // 过滤状态选择
      if( this.toufangStatusSelectionValue  !== '全部投放状态') {
        this.tableItemContainer.forEach(function(element) {
          if(element.Toufangstatus === tmpToufangSelectValue) {
            tmpTotalItemData1.push(element);
          }
        });
      } else {
        tmpTotalItemData1 = this.tableItemContainer;
      }
      // 过滤日期筛选
      if(this.dateSearchValue !== "") {
          tmpTotalItemData1.forEach(function(element) {
          if(element.date === tmpSearchValue) {
            tmpTotalItemData2.push(element);
          }
        });
      } else {
        tmpTotalItemData2 = tmpTotalItemData1;
      }

      var min = (this.currentPage - 1) * this.pageSize;
      var max = this.currentPage * this.pageSize;
      this.tableData = tmpTotalItemData2.slice(min, max);
      this.tableItemTotalSize = tmpTotalItemData2.length;
    },
    onToufangOptionChange(data) {
      // 图标显示的种类变化
      this.toufangStatusSelectionValue = data;
      this.refreshTableData();
    }
  },
  mounted: function() {
    this.initData();
  },
  updated: function() {}
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
  padding-bottom: 10px;
}

.el-input__inner {
  border-radius: 0;
  height: 34px;
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
.el-table th {
  background-color: #f3f3f3;
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
.el-range-editor.el-input__inner {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 3px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 220px;
}
.input-class-group {
  padding-top: 20px;
  padding-bottom: 20px;
}
.input-class-size {
  display: inline-block;
}
.top-tips-p {
  font-size: 16px;
  display: inline-block;
  padding-right: 50px;
}
</style>
