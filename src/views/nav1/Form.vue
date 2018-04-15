<template>
  <div>
	  <el-breadcrumb separator="/" class="breadcrumb-inner">
	  	<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
			{{ item.name }}
		</el-breadcrumb-item>
	  </el-breadcrumb>
	  <div class="hor-padding-20">
		<section class="form-panel">
			<div  class="form-panel-body">
				<dl class="dl-horizontal">
					<dt>网站名称</dt>
					<dd>
						<label>{{companyName}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>公司网址</dt>
					<dd>
						<label>{{companyWebsite}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>网站描述</dt>
					<dd>
						<label>{{companyRemark}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt></dt>
					<dd>
						<label>
							<el-button type="primary" @click="dialogVisible=true">编辑</el-button>
						</label>
					</dd>
				</dl>
			</div>
		</section>
		<el-dialog title="编辑网站信息" 
			:visible.sync="dialogVisible"
  			width="60%"
  			@open="handleDialogOpen"
			center>
			<section>
				<div class="form-section-item">
					<label class="form-span">网站名称</label>
					<el-input class="form-input" v-model="tmpCompanyName" placeholder="必填"></el-input>
				</div>
				<div class="form-section-item">
					<label class="form-span">网站地址</label>
					<el-input class="form-input" v-model="tmpCompanySite" placeholder="必填"></el-input>
				</div>
				<div class="form-section-item">
					<label class="form-span">网站描述</label>
					<el-input class="form-input" v-model="tmpCompanyRemark" ></el-input>
				</div>
			</section>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="OnSettingDialogCloseOk">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
  </div>
</template>

<script>
import { getUserInfoById } from "../../api/api";
import { updateUserInfo } from "../../api/api";

export default {
  data() {
    return {
      companyName: "",
      companyWebsite: "",
      companyRemark: "",

      tmpCompanyName: "",
      tmpCompanySite: "",
      tmpCompanyRemark: "",

      companyInfoContainer: "",
      dialogVisible: false
    };
  },
  methods: {
    handleDialogOpen() {
      this.tmpCompanyName = this.companyName;
      this.tmpCompanySite = this.companyWebsite;
      this.tmpCompanyRemark = this.companyRemark;
    },
    OnSettingDialogCloseOk() {
      this.dialogVisible = false;
      this.companyName = this.tmpCompanyName;
      this.companyWebsite = this.tmpCompanySite;
      this.companyRemark = this.tmpCompanyRemark;
      this.updateUserInfo();
    },
    getUserInfo() {
      var user = sessionStorage.getItem("user");
      user = JSON.parse(user);
      var params = { id: user.ID };
      getUserInfoById(params).then(data => {
        this.companyInfoContainer = data.data;
        this.companyName = data.data.Name;
        this.companyWebsite = data.data.Companyweblink;
        this.companyRemark = data.data.Companyremark;
      });
    },
    updateUserInfo() {
      this.companyInfoContainer.Name = this.companyName;
      this.companyInfoContainer.Companyweblink = this.companyWebsite;
      this.companyInfoContainer.Companyremark = this.companyRemark;

      updateUserInfo(this.companyInfoContainer).then(data => {
        console.log(data);
        if (data.status) {
          this.$message({
            message: "网站信息修改成功！",
            type: "success"
          });
        } else {
			this.$message.error('网站信息修改失败！');
        }
      });
    }
  },
  mounted: function() {
    this.getUserInfo();
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
.form-panel {
  font-size: 12px;
  margin-bottom: 10px;
  border-radius: 2px;
  box-shadow: 0 1px rgba(0, 0, 0, 0.05);
  height: auto;
}
.form-panel-body {
  padding: 15px;
  display: table;
}
dl {
  margin-top: 0;
  margin-bottom: 20px;
  width: 100%;
}
dt {
  font-weight: bold;
  text-align: right;
}
.dl-horizontal dt {
  float: left;
  width: 160px;
  clear: left;
  text-align: align;
}
.dl-horizontal dd {
  margin-left: 180px;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  padding-right: 5px;
  font-weight: bold;
}
.form-group {
  display: block;
  float: left;
  width: 100%;
  height: 34px;
  padding: 15px;
}
.el-message-box {
  display: inline-block;
  min-width: 600px;
  padding-bottom: 30px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 12px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: right;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.form-span{
	width: 20%;
	text-align: right;
	font-size: 12px;
}
.form-input {
  width: 70%;
}
.form-section-item {
  padding: 15px;
}
</style>
