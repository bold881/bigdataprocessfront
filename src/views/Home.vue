<template>
	<div>
		<el-row class="container">
			<el-col :span="24" class="header">
				<el-col :span="1">
					<div class="tools" @click.prevent="collapse">
						<i class="fa fa-align-justify"></i>
					</div>
				</el-col>
				<el-col :span="19" class="logo">
					<router-link to="/dashboard">
						<button class="logo-title-button">{{sysName}}</button>
					</router-link>
				</el-col>
				<el-col :span="4" class="userinfo">
					<el-dropdown trigger="click">
						<span class="el-dropdown-link userinfo-inner">
							{{sysUserName}}
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="dialogVisible = true">我的信息</el-dropdown-item>
							<el-dropdown-item @click.native="passwdDlgVisible = true">修改密码</el-dropdown-item>
							<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>
			<el-col :span="24" class="main">
				<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
					<!--导航菜单-->
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo"
						unique-opened router v-show="!collapsed">
						<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
								<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
						</template>
					</el-menu>
					<!--导航菜单-折叠后-->
					<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
						<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
							<template v-if="!item.leaf">
								<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
								<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
									<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
								</ul>
							</template>
							<template v-else>
								<li class="el-submenu">
									<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
								</li>
							</template>
						</li>
					</ul>
				</aside>
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
			</el-col>
		</el-row>
		<el-dialog title="我的信息" 
			:visible.sync="dialogVisible"
  			width="60%"
  			@open="handleMySettingDialogOpen"
			center>
			<section>
				<div class="home-section-item">
					<label class="home-span">用户编号</label>
					<el-input class="home-input" v-model="ID" :disabled="true"></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">用户名</label>
					<el-input class="home-input" v-model="sysUserName" :disabled="true"></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">登录邮箱</label>
					<el-input class="home-input" v-model="Email" :disabled="true"></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">备注</label>
					<el-input class="home-input" v-model="tmpRemark" ></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">状态</label>
					<el-input class="home-input" v-model="companyStatus" :disabled="true"></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">注册时间</label>
					<el-input class="home-input" v-model="companyRegTime" :disabled="true"></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">登录时间</label>
					<el-input class="home-input" v-model="companyLoginTime" :disabled="true"></el-input>
				</div>
			</section>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="OnMySettingDialogCloseOk">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="重置密码" 
			:visible.sync="passwdDlgVisible"
  			width="60%"
			@open="onPasswdDlgOpen"
			center>
			<section>
				<div class="home-section-item">
					<label class="home-span">用户名</label>
					<el-input class="home-input" v-model="sysUserName" :disabled="true"></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">新密码</label>
					<el-input class="home-input" v-model="tmpUserPassword" type="password"></el-input>
				</div>
				<div class="home-section-item">
					<label class="home-span">确认密码</label>
					<el-input class="home-input" v-model="tmpUserPasswordConfirm" type="password"></el-input>
				</div>
			</section>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="OnPasswdDlgCloseOk">确 定</el-button>
				<el-button @click="passwdDlgVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getUserInfoById } from "../api/api";
import { updateUserInfo } from "../api/api";
export default {
  data() {
    return {
      sysName: "大数据精准营销平台",
      collapsed: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogVisible: false,
      passwdDlgVisible: false,

      ID: "",
      sysUserName: "",
      Email: "",
      remark: "",
      companyStatus: "",
      companyRegTime: "",
      companyLoginTime: "",

      tmpRemark: "",
      tmpUserPassword: "",
      tmpUserPasswordConfirm: ""
    };
  },
  methods: {
    handleMySettingDialogOpen() {
      this.tmpRemark = this.remark;
    },
    OnMySettingDialogCloseOk() {
      this.dialogVisible = false;
      this.remark = this.tmpRemark;
      this.doUpdateUserInfo();
	},
	onPasswdDlgOpen() {
		this.tmpUserPassword = '';
		this.tmpUserPasswordConfirm = '';
	},
    OnPasswdDlgCloseOk() {
      if (this.tmpUserPassword === this.tmpUserPasswordConfirm) {
        if (this.tmpUserPassword !== "") {
          this.passwdDlgVisible = false;
          this.doUpdateUserPasswd();
        } else {
          this.$message.error("密码不能为空！");
        }
      } else {
        this.$message.error("密码不一致！");
      }
    },
    getUserInfo() {
      var params = { id: this.ID };
      getUserInfoById(params).then(data => {
        this.companyInfoContainer = data.data;
        this.sysUserName = data.data.Name;
        this.remark = data.data.Remark;
        this.companyStatus = data.data.Status;
        this.companyRegTime = data.data.Regtime;
        this.companyLoginTime = data.data.Logintime;
      });
    },
    doUpdateUserInfo() {
      this.companyInfoContainer.Remark = this.remark;

      updateUserInfo(this.companyInfoContainer).then(data => {
        if (data.status) {
          this.$message({
            message: "我的信息修改成功！",
            type: "success"
          });
        } else {
          this.$message.error("我的信息修改失败！");
        }
      });
    },
    doUpdateUserPasswd() {
      this.companyInfoContainer.Password = this.tmpUserPassword;

      updateUserInfo(this.companyInfoContainer).then(data => {
        if (data.status) {
          this.$message({
            message: "重置密码成功！",
            type: "success"
          });
        } else {
          this.$message.error("重置密码失败！");
        }
      });
    },
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.Name || "";
      this.ID = user.ID;
      this.Email = user.Email;
      this.getUserInfo();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";
.edit-body {
  align-items: right;
}
.home-span {
  width: 20%;
  text-align: right;
  font-size: 12px;
}
.home-input {
  width: 70%;
}
.home-section-item {
  padding: 5px;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  padding-right: 5px;
  font-weight: bold;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 50px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      padding-top: 5px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      //border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .logo-title-button {
      background-color: transparent;
      cursor: pointer;
      border: none;
      display: inline-block;
      text-decoration: none;
      height: 59px;
      font-size: 22px;
      padding-left: 20px;
      color: white;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
          background-color: aliceblue;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        width: 230px !important;
      }
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 0;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>