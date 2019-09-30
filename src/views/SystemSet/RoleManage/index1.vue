<template>
  <div class="user-role">
    <div class="main-content">
			<!-- <div class="bread-contain bread-bottom">
				<bread v-if="treeBread"></bread>
			</div> -->
			<!-- 面包屑 -->
      <div class="bread-contain bread-bottom">
        <bread-nav :breaddata="navData"></bread-nav>
      </div>
    	<h2 class="tab-title">
				<i></i>
				角色管理</h2>
    	<!-- 弹出表单 修改表单-->
      <el-dialog 
								:title="dialogTitle" 
								:close-on-click-modal='false' 
								fullscreen 
								:visible.sync="dialogFormVisible" 
								@close="handleClose('ruleForm')"
								:before-close="closeDialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form" label-position="left">
          
			  	<el-form-item label="角色名称:" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
			  	<el-form-item label="角色描述:" prop="remark">
            <el-input type="text" v-model="ruleForm.remark"></el-input>
         </el-form-item>
         
         <el-form-item label="所属用户" prop="ownNames" ref="member">
            <div class="input" contenteditable="false"  :class="{'active':activeShow}" @click="treeToggle">
              <div class="select-member"
                v-if="RepastMember.length!==0"
                v-for="(item , index) in RepastMember">
                <span>{{ item.name }}</span>
                <i class="el-icon-error" @click.stop="delMember(item,index)"></i>
              </div>
              <span style="position:absolute;right:5px;">
                  <!--<i class="el-select__caret el-input__icon el-icon-arrow-down"></i>-->
              </span>
            </div>
         </el-form-item>
					<el-form-item label="权限全选:">
           <el-checkbox v-model='all'></el-checkbox>
         </el-form-item>
         <tree-table v-if="treeShow" :data="treeData" :columns="columns" border @treeTableData="treeTableData"></tree-table>
        </el-form>
			  		
        <div slot="footer" class="dialog-footer" ref="ruleForm">
          <el-button size="mini" style="background:#297acc;color:#fff;" plain @click="submit('ruleForm');">确 定</el-button>
          <el-button size="mini" style="background:#fff;color:#000;" plain @click="closeDialog('ruleForm')">取 消</el-button>
        </div>
      </el-dialog>
      <!--查看表单-->
      <el-dialog title="用户角色-查看" :close-on-click-modal='false' fullscreen :visible.sync="dialogCheck" @close="quxiao">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form" label-position="left">
          
			  	<el-form-item label="角色名称:" prop="name">
            <el-input v-model="ruleForm.name" :disabled="true"></el-input>
          </el-form-item>
			  	<el-form-item label="角色描述:" prop="remark">
            <el-input type="text" v-model="ruleForm.remark" :disabled="true"></el-input>
         	</el-form-item>
         
         <el-form-item label="所属用户" prop="ownNames" ref="member">
            <div class="input el-input is-disabled el-input__inner" contenteditable="false"  :class="{'active':activeShow}" @click="treeToggle">
              <div class="select-member"
                v-if="RepastMember.length!==0"
                v-for="(item , index) in RepastMember">
                <span>{{ item.name }}</span>
                <i class="el-icon-error" @click.stop="delMember(item,index)"></i>
              </div>
              <span style="position:absolute;right:5px;">
              </span>
            </div>
         </el-form-item>
         <tree-table v-if="treeShow" :data="treeData" :columns="columns" border @treeTableData="treeTableData"></tree-table>
        </el-form>
			  		
        <div slot="footer" class="dialog-footer" ref="ruleForm">
          <el-button size="mini" style="background:#fff;color:#000;" @click='quxiao'>取 消</el-button>
        </div>
      </el-dialog>
      <div :class="{'select-tree':true,'hide-tree':!authTreeShow,'show-tree':authTreeShow}">
        <authTree @treeClick="getAddData" ref='treePeople'></authTree>
      </div>
    	<div class="kl-table">
        <!-- 工具栏 -->
        <div class="toolbar">
          <el-form :inline="true" class="demo-form-inline" size="mini">
            <el-form-item>
              <el-button style="background:#47b5e8;color:#fff;" icon='el-icon-plus' @click="add">新建</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
				<!-- :max-height="maxHeight" -->
        <el-table
          v-if="tableShow"
          :max-height="maxHeight"
					style="width:100%;height:88%;"
          :data="historyData.list"
					stripe border
          @cell-click="cellClick">
        	<el-table-column fixed type="index" width="80" label="NO." :index="indexMethod"></el-table-column>

          <el-table-column  prop="name" fixed label="角色名称"></el-table-column>

          <el-table-column prop="remark" label="描述"> </el-table-column>

          <!--<el-table-column prop="order"label="序号"></el-table-column>-->

          <el-table-column prop="modifyBy" label="最后修改人"></el-table-column>

          <el-table-column prop='modifyTime' width="200" label='最后修改时间' show-overflow-tooltip></el-table-column>

          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
            	<!-- <el-button v-if='scope.row.adminRemark === "新建水司添加管理员用户"' size="mini" type="warning" plain  @click.native="check(scope.$index, scope.row)">查看</el-button>
              <el-button v-else size="mini" type="warning" plain  @click.native="handleEdit(scope.$index, scope.row)">修改</el-button> -->
              
							<el-button type="text" @click.native="check(scope.$index, scope.row)">查看</el-button>
							<span v-if='scope.row.name !== "admin"' style="color:#f0f0f0">|</span>
              <el-button type="text" v-if='scope.row.name !== "admin"'  @click.native="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableQuery.page"
            :page-sizes="[20, 100, 500, 1000]"
            :page-size="tableQuery.pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="historyData.rowCount">
          </el-pagination>
        </div>
    	</div>
    </div>
  </div>
</template>

<script>
//	indeterminate属性是控制多选半选中状态，
//checkAll是控制全选中状态
//selectchecked是放置sonData选中项
	import treeTable from './userRoleTreeTable/index'
	import authTree from './userRoleTreeTable/authTree'
	import bread from './userRoleTreeTable/breadComponent'
	import breadNav from './userRoleTreeTable/breadNav'
  import { mapState, mapMutations } from 'vuex'
  export default {
			name: "user-role",
      components: { treeTable, authTree, bread,breadNav },
      data(){
      	return {
					navData:[
						{
							name:"系统管理",
						},
						{
							name:"角色管理",
						},
        	],
          dialogTitle:'用户角色-添加',
      		tableShow: false,
      		maxHeight: 0,
      		dialogFormVisible : false, //表单是否显示
      		ruleForm: { //表单数据
      			ownNames: [],
      			ownName: [],
            name:'',
            remark: '',
            rModuleBeans:[],
          },
          rules: {  //表单验证规则
          	ownNames: [
              {  message: '请选择至少一位角色用户', trigger: 'blur', required: true },
            ],
            name: [
              {  message: '请输入', trigger: 'blur', required: true },
            ],
            remark: [
              {  message: '请输入', trigger: 'blur', required: true },
            ],
          },
      		tableQuery: { //查询表单数据
            page: 1,
           pageCount: 20,
          },
          historyData: {},
          columns: [
		        {
		          text: '菜单列表',
		          value: 'name',
							//width: 200,
		          option: 'sonData',
		          act: 'act'
		        },
		        {
		          text: '权限列表',
		          value: 'sonData',
		          option: 'sonData',
							//width: 400,
							//act: 'act'
		        }
		      ],
		      //先不加载树形组件，有数据再加载，防止数据的不断变化
		      treeShow: false,
		      treeData: [],
		      ownName: [],
		      all: false,
		      authTreeShow: false, // 组织树展示状态
        	activeShow: false, // 输入框激活展示状态
        	RepastMember: [],
        	//查看表单
        	dialogCheck: false,
      	}
      },
      mounted() {
				// this.init()
				// this.treeBread.push({name:'系统管理'},{name:'角色管理'})
      	//data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      	this.$changeTable(this,'.user-role .kl-table',['.user-role .toolbar','.user-role .block']);
      },
      methods: {
				clear(){
					this.ruleForm = { //表单数据
      			ownNames: [],
      			ownName: [],
            name:'',
            remark: '',
            rModuleBeans:[],
          }
				},
        add(){
          let id = ''
					// this.getTreeData(id)
					this.dialogTitle = '用户角色-添加'
					this.clear()
					sessionStorage.setItem('formData',JSON.stringify(this.ruleForm))
          this.dialogFormVisible = true
        },
      	//获取数据
        init() {
          let params ={
            "busicode":"RoleList",
            "data":  this.tableQuery
          }
          // this.$http.fetch({
	        //   apiUrl: 'interface.api',//路径
	        //   method: 'post',//请求方法
	        //   params:params,//参数
	        //   needErrorCallback:true
	        // }).then(res =>{
	        //   if(res.code===0){
					// 		this.historyData = res.data;
					// 		this.historyData.rowCount = res.data.total;
          //   }
	        // })
        },
        getTreeData(id){
        	let params = {}
        	if (id) {
        		params ={
	            "busicode":"FindRole",
	            "data":  {}
	          }
	        	params.data.id = id
        	} else {
        	  params ={
	            "busicode":"FindRoleModuleTree",
	            "data":  {}
	         }
        	}
          // this.$http.fetch({
	        //   apiUrl: 'interface.api',//路径
	        //   method: 'post',//请求方法
	        //   params:params,//参数
	        //   needErrorCallback:true
	        // }).then(res =>{
	        //   if(res.code===0){
	        //   	let data = res.data.roleTreeBean
	        //   	if (res.data.ownName) {
					// 			this.RepastMember = res.data.ownName
	        //   	}
	        //   	this.treeData = data.children
          //   }
	        // })
        },
      	cellClick(row,column,cell,event){
        },
        indexMethod(index) {//获取表格序号
         	return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1)
      	},
				handleEdit(key,row){ //表格编辑
          this.dialogTitle = '用户角色-修改'
        	this.ruleForm.name = row.name
        	this.ruleForm.remark = row.remark
        	this.ruleForm.id = row.id
					// this.getTreeData(row.id)
					sessionStorage.setItem('formData',JSON.stringify(this.ruleForm))
        	this.dialogFormVisible = true
        },
        check(key,row){//查看
        	this.ruleForm.name = row.name
        	this.ruleForm.remark = row.remark
					// this.getTreeData(row.id)
					sessionStorage.setItem('formData',JSON.stringify(this.ruleForm))
        	this.dialogCheck = true
        },
        //分页
        handleSizeChange(val) { //显示多少数据一页
          this.tableQuery.pageCount = val
          this.tableQuery.page = 1
          this.init()
        },
        handleCurrentChange(val) {  //显示多少页码
          this.tableQuery.page = val
          this.init()
        },
        //弹出框
				submit(formName){	//提交
					let that = this
					let params
					// if(this.ruleForm.rModuleBeans.length === 0){
					// 	this.treeTableData(this.treeData)
					// }
					
          // for (let i in this.RepastMember) {
					// 	this.ruleForm.ownNames.push(this.RepastMember[i].loginid)
					// }
          if (this.dialogTitle === '用户角色-添加') {
          	params ={
							"busicode":"RoleAdd",
							"data":  this.ruleForm
						}
          } else {
          	params ={
							"busicode":"RoleUpdate",
							"data":  this.ruleForm
						}
          }
          this.$refs[formName].validate((valid) => {//表单验证
            // if (valid) {
            // 	this.$http.fetch({
			      //     apiUrl: 'interface.api',//路径
			      //     method: 'post',//请求方法
			      //     params:params,//参数
			      //     needErrorCallback:true
			      //   }).then(res =>{
			      //     if(res.code === 0){
            //       that.init()
            //       that.closeDialog('ruleForm')
            //       that.activeBlur()
            //   }else{}
			      //   })
            // } else {
            //   return false
            // }
          })
        },
				closeDialog(formName){ //关闭会话
					let olderForm = sessionStorage.getItem('formData')
          let newForm = JSON.stringify(this.ruleForm)
          if(olderForm !== newForm){
            this.$confirm('数据暂未保存，是否退出编辑?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
							this.clear()
							this.dialogFormVisible = false //关闭会话
            }).catch(() => {
            })
          }else{
						this.dialogFormVisible = false //关闭会话
					}
				},
				handleClose(formName){
					this.ruleForm.name = ''
        	this.ruleForm.remark = ''
        	this.ruleForm.ownName = []
        	this.ruleForm.ownNames = []
        	this.RepastMember = []
        	this.dialogTitle = '用户角色-添加'
					this.all = false
					this.$refs.treePeople.data2 = [];
					this.$refs.treePeople.department = '组织人员';
					// this.$refs.treePeople.randerTree();
					// this.activeBlur()
					// this.$refs[formName].resetFields() //重置表单
          this.dialogFormVisible = false //关闭会话
				},
				quxiao(){
					this.dialogCheck = false ;
					// this.dialogFormVisible = false;
					this.authTreeShow = false;
					
					this.$refs.treePeople.data2 = [];
					this.$refs.treePeople.department = '组织人员';
					// this.$refs.treePeople.randerTree();	
				},
        treeTableData (data) {
		      // if (!Array.isArray(data)) {
		      //   data = [data]
		      // }
		      // let arr = []
		      
		      // data.forEach(val => {
		      // 	let id = val.id
		      // 	let flag = false
		      // 	let flag1 = false
		      // 	let obj1 = {}
		      // 	let obj2 = {}
		      //   if (val.children) {
		      //     val.children.forEach(el => {
		      //     	//是否有三级的处理
		      //     	if(el.children.length === 0){
		      //     		let obj = {}
			    //       	obj.moduleId = el.id
			    //         if (el.selectchecked.length) {
			    //         	obj.operation = el.selectchecked.reduce(function(total,i) {
					// 					      return total + '' +　i
					// 					})
			    //         	flag = true
			    //           arr.push(obj)
			    //         }
		      //     	}else {
		      //     		el.children.forEach(val => {
		      //     			let obj = {}
		      //     			obj.moduleId = val.id
		      //     			if (val.selectchecked.length) {
				  //           	obj.operation = val.selectchecked.reduce(function(total,i) {
					// 						      return total + '' +　i
					// 						})
				  //           	flag1 = true
				  //             arr.push(obj)
				              
				  //           }
		      //     		})
		      //     		if (flag1) {
					//         	obj2.moduleId = el.id
					//         	obj2.operation = ''
					//         	arr.push(obj2)
					//         }
		      //     	}
		      //     })
		      //   }
		      //   //父级的id
		      //   if (flag) {
		      //   	obj1.moduleId = id
		      //   	obj1.operation = ''
		      //   	arr.push(obj1)
		      //   }
		      // })
					// //arr = arr.join().split(',').filter(n => { return n })
					// this.ruleForm.rModuleBeans = arr
		    },
		    activeBlur() {
	        this.activeShow = false
	        this.authTreeShow = false
	      },
	      // 输入框点击控制组织树展示
	      treeToggle() {
	        this.activeShow = true;
					this.authTreeShow = true
					
	      },
	      delMember(row,index) {
	        this.RepastMember.splice(index,1)
	      },
				// 获取子组件添加人员信息数据
	      getAddData(data) {
	        // let canteenManages = this.RepastMember
	        // let addManages = data
	        // let added =''
	        // let adding = ''
	        // for(let i in addManages){
	        //   let item = {};
	        //   let count =0;
	        //   item = JSON.stringify(addManages[i]);
	        //   item = JSON.parse(item)
	        //   for(let j in canteenManages){
	        //     if(addManages[i].id ===canteenManages[j].id){
	        //       added+=item.name+','
	        //       count++
	        //     }
	        //   }
	        //   if(count === 0){
	        //     canteenManages.push(item);
	        //     adding+=item.name+',';
	        //   }
	        // }
	        // if(adding==='' && added===''){
	        //   this.$message({
	        //     showClose: true,
	        //     message: `请选择添加人员`
	        //   });
	        // }else if(adding===''&& added !==''){
	        //   this.$message({
	        //     showClose: true,
	        //     message: `${added} 重复添加！`,
	        //     type: 'error'
	        //   });
	        // }else if(adding!==''&& added ==='') {
	        //   this.$message({
	        //     showClose: true,
	        //     message: `${adding} 已经添加！`,
	        //     type: 'success'
	        //   });
	        // }else {
	        //   this.$message({
	        //     showClose: true,
	        //     message: `${adding} 已经添加！，${added} 重复添加！`,
	        //     type: 'warning'
	        //   });
	        // }
					// this.$refs.member.validate();
					
				},
				// ...mapMutations(['setTreeBread'])
			},
			created(){
      // this.setTreeBread([])
    },
    destroyed(){
      // this.setTreeBread([])
    },
			computed: {
			// 	ownNames() {
			// 　　	return this.ruleForm.ownNames
			// 　},
			// 	...mapState(['treeNode','treeBread'])
			},
      watch: {
      	maxHeight(){
          this.tableShow = false
          this.$nextTick(()=>{
            this.tableShow = true
          })
        },
        treeData(){
          this.treeShow = false
          this.$nextTick(()=>{
            this.treeShow = true
          })
        },
        // RepastMember(val){
        // },
        // all(val) {
		    // 	let data = this.treeData
		    // 	if(val){
			  //   	for(let i = 0; i< data.length; i++) {
			  //   		//判断isLeaf 是否为3
			  //   		if(data[i].isLeaf === 3) {
			  //   			data[i].checkAll = true
			  //   			data[i].indeterminate = false
			  //   			let d = data[i].children
			  //   			d.forEach(el => {
			  //   				if (el.children.length === 0) {
			  //   					let d = el.sonData
			  //   					el.checkAll = true
				//     				el.indeterminate = false
				//     				for(let j = 0; j< d.length; j++) {
				// 	    				el.selectchecked.push(d[j].id)
				// 	    			}
			  //   				} else {
			  //   					el.checkAll = true
				//     				el.indeterminate = false
				//     				el.children.forEach(val => {
				//     					let d = val.sonData
				//     					val.checkAll = true
				// 	    				val.indeterminate = false
				// 	    				for(let j = 0; j< d.length; j++) {
				// 		    				val.selectchecked.push(d[j].id)
				// 		    			}
				//     				})
			  //   				}
			  //   			})
			  //   		} else {
			  //   			let arr = data[i].children
				//     		data[i].checkAll = true
				//     		for(let k in arr){
				//     			let arr1 = arr[k].sonData
				//     			arr[k].checkAll = true
				//     			arr[k].indeterminate = false
				//     			for(let j = 0; j< arr1.length; j++) {
				//     				arr[k].selectchecked.push(arr1[j].id)
				//     			}
				//     		}
			  //   		}
			  //   	}
		    // 	} else {
		    // 		//全不选状态
			  //   	for(let i = 0; i< data.length; i++) {
			  //   		let arr = data[i].children
			  //   		data[i].checkAll = false
			  //   		for(let k in arr){
			  //   			arr[k].selectchecked = []
			  //   			arr[k].checkAll = false
			  //   			arr[k].indeterminate = false
			  //   			if(arr[k].children.length > 0) {
			  //   				let d = arr[k].children
			  //   				for(let i in d){
			  //   					d[i].selectchecked = []
			  //   					d[i].checkAll = false
			  //   					d[i].indeterminate = false
			  //   				}
			  //   			}
			  //   		}
			  //   	}
		    // 	}
				// },
				// ownNames(curVal,oldVal){
				// },
				// RepastMember(curVal,oldVal){
				// }
      },
  }
</script>

<style lang="scss">
	.user-role{
		.el-table__body{
      tr{
          td:nth-child(3) {
            div {
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
      }
    }
		.demo-form-inline{
			float: right;
      &::after{
           content: "\0020";
          display: block;
          height: 0;
          clear: both;
      }
      position: relative;
      .el-form-item{
        margin: 10px 0 10px 0;
        &+.el-form-item{
          margin-left: 10px;
        }
      }
    }
    .demo-form{
	    height: 377px;
	    .input{
	      overflow: scroll;
	      vertical-align: middle;
	      display: inline-block;
	      border: 1px solid #ccc;
	      width: 100%;
	      min-height: 40px;
	      overflow: hidden;
	      -webkit-border-radius: 4px;
	      -moz-border-radius: 4px;
	      border-radius: 4px;
	      position: relative;
	      .select-member{
	        box-sizing: border-box;
	        border-color: transparent;
	        margin: 2px 0 2px 6px;
	        background-color: #f0f2f5;
	        display: inline-block;
	        height: 24px;
	        padding: 0 8px;
	        line-height: 22px;
	        color: #909399;
	        border-radius: 4px;
	        i{
	          color:  #c0c4cc;
	          cursor: pointer;
	        }
	      }
	      &.active{
	        border:1px solid #409EFF;
	      }
	    }
	    .upload-demo{
	      input{
	        display: none;
	      }
	    }
	  }
		.dialog-footer{
			text-align: center;
		}
		.el-dialog.is-fullscreen{
			margin-top:-0.18rem !important;
		}
		.el-dialog__body .el-form{
			.user-role-index{
				height: 100%;
				.el-table{
					height: 100%;
				}
			}
		}
		.show-tree{
			width: 19.5% !important;
			top:.6rem !important;
		}
		.el-dialog__wrapper{
			padding-top:.8rem !important;
		}
		.el-dialog .el-dialog__body {
			height: calc(100% - 195px) !important;
		}
		.el-dialog .el-dialog__footer {
			margin-top:.28rem;
		}
		.el-dialog .el-dialog__body .el-form-item {
			margin-bottom: 16px !important;
		}
	}
</style>
