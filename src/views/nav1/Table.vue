<template>
  <div>
	  <el-breadcrumb separator="/" class="breadcrumb-inner">
	  	<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
			{{ item.name }}
		</el-breadcrumb-item>
	  </el-breadcrumb>
	  <div class="hor-padding-20">
		<section class="panel">
			<div  class="panel-body">
				<dl class="dl-horizontal">
					<dt>公司名称</dt>
					<dd>
						<label>重庆寒武纪信息技术有限公司</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>联系人</dt>
					<dd>
						<label>张某某</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>联系电话</dt>
					<dd>
						<label>13983208322</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>其他联系方式</dt>
					<dd>
						<label>N/A</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>备注信息</dt>
					<dd>
						<label>N/A</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>创建时间</dt>
					<dd>
						<label>2018-03-22 17:15:30</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt>更新时间</dt>
					<dd>
						<label>2018-04-07 22:14:15</label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt></dt>
					<dd>
						<label>
							<el-button type="primary" @click="openEdit">编辑</el-button>
						</label>
					</dd>
				</dl>
			</div>
		</section>
	</div>
  </div>
</template>

<script>
export default {
	methods: {
		openEdit() {
				this.$alert(
					'<div class="form-group">' +
						'<label class="form-label">公司名称：</label>' +
						'<div>' +
							'<input class="form-input" placeholder="必填"></input>' +
						'</div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label class="form-label">联系人：</label>' +
						'<div>' +
							'<input class="form-input" placeholder="必填"></input>' +
						'</div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label class="form-label">联系电话：</label>' +
						'<div>' +
							'<input class="form-input" placeholder="必填"></input>' +
						'</div>' +
					'</div>' + 
					'<div class="form-group">' +
						'<label class="form-label">其他联系方式：</label>' +
						'<div>' +
							'<input class="form-input" placeholder=""></input>' +
						'</div>' +
					'</div>' + 
					'<div class="form-group">' +
						'<label class="form-label">备注信息：</label>' +
						'<div>' +
							'<input class="form-input" placeholder=""></input>' +
						'</div>' +
					'</div>',
				 '编辑网站信息', {
			dangerouslyUseHTMLString: true,
			center: true,
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: '确定',
			cancelButtonText: '取消'
			});
		}
	}
}
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
	.panel {
		font-size: 12px;
		margin-bottom: 10px;
		border-radius: 2px;
		box-shadow: 0 1px rgba(0, 0, 0, 0.05);
	}
	.panel-body {
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
		-webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		text-align: right;
		overflow: hidden;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}
	.form-label {
		width: 25%;
		float: left;
		text-align: right;
		font-size: 12px;
	}
	.form-input {
		padding: 1px 12px;
		float: left;
		width: 50%;
		height: 34px;
		color: #555555;
		border: 1px solid #CBD5DD;
		border-radius: 2px;
	}
</style>
