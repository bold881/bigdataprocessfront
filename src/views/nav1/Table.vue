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
					<dt>公司名称</dt>
					<dd>
						<label>{{companyName}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>联系人</dt>
					<dd>
						<label>{{contactPerson}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>联系电话</dt>
					<dd>
						<label>{{contactPhone}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>其他联系方式</dt>
					<dd>
						<label>{{otherContactMethod}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>备注信息</dt>
					<dd>
						<label>{{remark}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>创建时间</dt>
					<dd>
						<label>{{createTime}}</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>更新时间</dt>
					<dd>
						<label>{{updateTime}}</label>
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
		<el-dialog title="编辑公司信息" 
			:visible.sync="dialogVisible"
  			width="60%"
  			@open="handleDialogOpen"
			center>
			<section>
				<div class="form-section-item">
					<label class="form-span">公司名称</label>
					<el-input class="form-input" v-model="tmpCompanyName" ></el-input>
				</div>
				<div class="form-section-item">
					<label class="form-span">联系人</label>
					<el-input class="form-input" v-model="tmpContactPerson"></el-input>
				</div>
				<div class="form-section-item">
					<label class="form-span">联系电话</label>
					<el-input class="form-input" v-model="tmpContactPhone" ></el-input>
				</div>
				<div class="form-section-item">
					<label class="form-span">其他联系方式</label>
					<el-input class="form-input" v-model="tmpOtherContactMethod" ></el-input>
				</div>
				<div class="form-section-item">
					<label class="form-span">备注信息</label>
					<el-input class="form-input" v-model="tmpRemark" ></el-input>
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
      contactPerson: "",
      contactPhone: "",
      otherContactMethod: "",
      remark: "",
      createTime: "",
      updateTime: "",

      tmpCompanyName: "",
      tmpContactPerson: "",
      tmpContactPhone: "",
      tmpOtherContactMethod: "",
      tmpRemark: "",
      tmpCreateTime: "",
      tmpUpdateTime: "",

      companyInfoContainer: "",
      dialogVisible: false
    };
  },
  methods: {
    handleDialogOpen() {
      this.tmpCompanyName = this.companyName;
      this.tmpContactPerson = this.contactPerson;
      this.tmpContactPhone = this.contactPhone;
      this.tmpOtherContactMethod = this.otherContactMethod;
      this.tmpRemark = this.remark;
      this.tmpCreateTime = this.createTime;
      this.tmpUpdateTime = this.updateTime;
    },
    OnSettingDialogCloseOk() {
      this.dialogVisible = false;
      this.companyName = this.tmpCompanyName;
      this.contactPerson = this.tmpContactPerson;
      this.contactPhone = this.tmpContactPhone;
      this.otherContactMethod = this.tmpOtherContactMethod;
      this.remark = this.tmpRemark;
      this.createTime = this.tmpCreateTime;
      this.updateTime = this.tmpUpdateTime;
      this.updateUserInfo();
    },
    getUserInfo() {
      var user = sessionStorage.getItem("user");
      user = JSON.parse(user);
      var params = { id: user.ID };
      getUserInfoById(params).then(data => {
        this.companyInfoContainer = data.data;
        this.companyName = data.data.Name;
        this.contactPerson = data.data.Contactperson;
        this.contactPhone = data.data.Contactphone;
        this.otherContactMethod = data.data.Othercontactmethod;
        this.remark = data.data.Remark;
        this.createTime = data.data.Createtime;
        this.updateTime = data.data.Updatetime;
      });
    },
    updateUserInfo() {
      this.companyInfoContainer.Name = this.companyName;
      this.companyInfoContainer.Contactperson = this.contactPerson;
      this.companyInfoContainer.Contactphone = this.contactPhone;
      this.companyInfoContainer.Othercontactmethod = this.otherContactMethod;
      this.companyInfoContainer.Remark = this.remark;
      this.companyInfoContainer.Createtime = this.createTime;
      this.companyInfoContainer.Updatetime = this.updateTime;

      updateUserInfo(this.companyInfoContainer).then(data => {
        console.log(data);
        if (data.status) {
          this.$message({
            message: "公司信息修改成功！",
            type: "success"
          });
        } else {
          this.$message.error("公司信息修改失败！");
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
.edit-body {
  align-items: right;
}
.form-span {
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
