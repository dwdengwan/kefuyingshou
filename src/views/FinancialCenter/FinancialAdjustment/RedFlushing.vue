

<template>

    <div class="RedFlushing">
        <!-- 弹出表单编辑 -->
    	<el-dialog :title="RedFlushingName" :close-on-click-modal="false" :visible.sync="RedFlushingVisible1" class="addDialog" @close="closeDialogchooseRedFlushin" >
            <!-- <RedFlushingEdit
                ref="childRedFlushing" 
            ></RedFlushingEdit> -->
            <div class="toolbar">
                <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                    
                    <el-form-item class="form-left">
                        <el-form-item label="账期：">
                            <el-date-picker v-model="beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
                            </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item label="用户编号：">
                            <el-input v-model="formData.subordinateDepartments" placeholder="201804"></el-input>
                        </el-form-item>

                        <el-form-item>
                            
                            <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                        
                    </el-form-item>
                    
                    <!-- <el-form-item class="form-right">
                        <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button>
                        <el-button size="mini" type="primary">审批</el-button>
                    
                    
                    </el-form-item> -->
                </el-form>
            </div>
            <div class="kl-table">
                <el-table
                    v-if="tableShow"
                    :max-height="maxHeight"         
                    stripe
                    border
                    :data="histroyData.list"
                    class="change-tables-table">
                    
                    <el-table-column 
                        type="selection"
                        width="50" 
                        fixed="left"
                        >
                    </el-table-column>

                    <el-table-column 
                        type="index"  label="NO."
                        width="50" 
                        fixed="left"
                        :index="indexMethod">
                    </el-table-column>

                    <el-table-column
                        prop="code"
                        min-width="80"
                        label="用户编号">

                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="200"
                        label="用户名称">
                    </el-table-column>

                    <el-table-column
                        prop="daytime"
                        min-width="100"
                        label="账期">
                    </el-table-column>

                    <el-table-column
                        prop="flux"
                        min-width="80"
                        label="费用项目">
                    </el-table-column>

                    <el-table-column
                        prop="factoryName"
                        min-width="80"
                        label="阶梯1水量">
                    </el-table-column>

                    <el-table-column
                        prop="flux"
                        min-width="80"
                        label="阶梯2水量">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="阶梯3水量">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="水量">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="阶梯1水价">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="阶梯2水价">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="阶梯3水价">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="金额">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="收费日期">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="缴费状态">
                    </el-table-column>

                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div>
            </div>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm')">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialogchooseRedFlushin('ruleForm')">返 回</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单选择冲红数据 -->
    	<el-dialog :title="chooseRedFlushingName" :close-on-click-modal="false" :visible.sync="chooseRedFlushingVisible" class="addDialog" @close="closeDialogchooseRedFlushin" >
            <chooseRedFlushingEdit
                ref="childRedFlushing" 
            ></chooseRedFlushingEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm')">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialogchooseRedFlushin">返 回</el-button>
		    </div>
    	</el-dialog>
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right" v-if="RedFlushingVisible">
                <!-- <el-button size="mini" @click="add1" type="primary">选择冲红记录</el-button> -->
                <el-button size="mini" type="primary">保存</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
            <div class="bread-contain-right" v-else>
                <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button>
                <!-- <el-button size="mini" type="primary">审批</el-button> -->
            </div>
        </div>
        
        <div v-if="RedFlushingVisible" >

             <RedFlushingEdit
                ref="childRedFlushing" 
            ></RedFlushingEdit>
        </div>

        <div v-else>
            <div class="toolbar">
                <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                    
                    <el-form-item class="form-left">
                        <el-form-item label="账期：">
                            <el-date-picker
                                v-model="formData.watermeterWarehouse"
                                type="month"
                                placeholder="选择月">
                            </el-date-picker>
                            <!-- <el-input v-model="formData.watermeterWarehouse" placeholder="201804"></el-input> -->
                        </el-form-item>
                        <el-form-item label="审批状态：">
                            <el-select  clearable v-model="formData.waterMeterCaliber" placeholder="未审">
                                <el-option  v-for="(item,index) in formData.waterMeterCaliberOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item label="模糊查询：" class="searchInput">
                            <el-input v-model="formData.con" placeholder="客户名称/客户编号/册本号"></el-input>
                        </el-form-item>

                        <el-form-item>
                            
                            <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                        
                    </el-form-item>
                    
                    <el-form-item class="form-right">
                        <!-- <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button>
                        <el-button size="mini" type="primary">审批</el-button> -->
                    
                    
                    </el-form-item>
                </el-form>
            </div>
            <div class="kl-table">
            <el-table
                v-if="tableShow"
                :max-height="maxHeight"         
                stripe
                border
                :data="histroyData.list"
                class="change-tables-table">
                
                <!-- <el-table-column 
                    type="selection"
                    width="50" 
                    fixed="left"
                    >
                </el-table-column> -->

                <el-table-column 
                    type="index"  label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                </el-table-column>

                <el-table-column
                    prop="areaName"
                    
                    min-width="100"
                    label="审批状态">
                </el-table-column>

                <el-table-column
                    prop="code"
                    min-width="80"
                    label="用户编号">

                </el-table-column>

                <el-table-column
                    prop="lvalue"
                    min-width="200"
                    label="用户名称">
                </el-table-column>

                <el-table-column
                    prop="daytime"
                    min-width="100"
                    label="应冲账期">
                </el-table-column>

                <el-table-column
                    prop="flux"
                    min-width="80"
                    label="冲红账期">
                </el-table-column>

                <el-table-column
                    prop="factoryName"
                    min-width="80"
                    label="水量">
                </el-table-column>

                <el-table-column
                    prop="flux"
                    min-width="80"
                    label="合计">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="创建时间">
                </el-table-column>

                <el-table-column
                    prop="flux"
                    min-width="80"
                    label="创建人">
                </el-table-column>

                <el-table-column label="操作" fixed="right" width="120">
                    <template slot-scope="scope">
                    <!-- size="mini" type="warning" plain -->
                    <el-button type="text" @click="add(scope.$index, scope.row)">编辑</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick">审批</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
        
                    </template>
                </el-table-column>

                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RedFlushingEdit from './RedFlushingEdit'
import chooseRedFlushingEdit from './chooseRedFlushingEdit'
export default {
    name:"RedFlushing",
    components:{
        RedFlushingEdit,
        chooseRedFlushingEdit
    },
     data(){
        return{
            beginYearM: '',
            crumbsData :{  //面包屑
                titleList:[
                    {title:'账务中心',path:'/RedFlushing'},
                    {title:'账务调整',method:()=>{window.histroy.back()}},
                    {title:'冲红',method:()=>{window.histroy.back()}},

                ],
                
            },
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[],
                waterMeterType:"",
                waterMeterTypeOptions:[],
                waterMeterCaliber:"",
                waterMeterCaliberOptions:[
                    {
                        name:"已审",
                        value:"2"
                    },
                    {
                        name:"未审",
                        value:"3"
                    },
                    {
                        name:"删除",
                        value:"4"
                    },
                ],
                waterMeterStatus:"",
                waterMeterStatusOptions:[],
                subordinateDepartments:"",
                subordinateDepartmentsOptions:[]

            },
            // 日期选择器
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now() ;
                }
            },
            DateChoosevalue: [],
            tableShow:false,
            maxHeight:0,
            histroyData:{
                
            },
            RedFlushingVisible:false,  //综合查询的显示和隐藏
            RedFlushingVisible1: false, // 选择冲红记录
            RedFlushingName:'冲红-添加-选择冲红记录',
            ruleFormData:{},
            chooseRedFlushingVisible:false,
            chooseRedFlushingName:"选择冲红数据"
 
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.RedFlushing',['.RedFlushing .toolbar','.RedFlushing .block','.RedFlushing #crumbs'])
    },
    methods:{
        init(){
            
            this.histroyData = {
                areaId:"",
                endRow: 5,
                hasNextPage: false,
                hasPreviousPage: false,
                isFirstPage: true,
                isLastPage: true,
                list: [
                    {
                        areaId: null,
                        areaName: "未审批",
                        code: "C7551990",
                        concentrator: "",
                        connect: null,
                        daytime: "201907",
                        endTime: null,
                        factoryName: "15",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "-",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1栋3单元",
                        protocolName: null,
                        rowNumber: 0,
                        sensorModel: null,
                        sn: null,
                        status: "未上传",
                        totalPage: 0,
                        type: 5,
                        unusual: null,
                        usn: "00",
                        waterGroup: null,
                    },
               
                ],
                navigateFirstPage: 1,
                navigateLastPage: 1,
                navigatePages: 8,
                navigatepageNums: Array(1),
                nextPage: 0,
                pageNum: 1,
                pageSize: 20,
                pages: 1,
                prePage: 0,
                size: 5,
                startRow: 1,
                total: 5,
            }
        },

      demand() {  //查询
        // this.tableQuery.page = 1
        // this.tableQuery.pageCount = 20
        this.init()
      },
    //   导出
      exportExcel(){
    //   	let listData = {}
    //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
    //     let params ={
    //       "busicode":"MeterReadingList",
    //       "data": this.tableQuery
    //     }
    //     this.$api.fetch({
    //       apiUrl: 'interface.api',//路径
    //       method: 'post',//请求方法
    //       params:params,//参数
    //       needErrorCallback:true
    //     }).then(res =>{
    //     	if(res.code===0){
    //         listData = res.data
    //         if (!listData.list[0]) {
	//         		this.$notify({
	//               title: '警告',
	//               message:'表格没有相关数据',
	//               type: 'error'
	//             })
	//         	} else {
	//         		import('@/vendor/Export2Excel').then(excel => {
	// 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
	// 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
	// 			        const list = listData.list
	// 			        const data = this.formatJson(filterVal, list)
	// 			        excel.export_json_to_excel({
	// 			          header: tHeader,
	// 			          data,
	// 			          filename: this.tableQuery.daytime + '抄表数据',
	// 			          autoWidth: '100'
	// 			        })
	// 			      })
	//         		this.tableQuery.pageCount = 20
	//         	}
    //       }
    //     })
      },
      //分页
      handleSizeChange(val) { //显示多少数据一页
        // this.tableQuery.pageCount = val
        // this.tableQuery.page = 1
        this.init()
      },
      handleCurrentChange(val) {  //显示多少页码
        // this.tableQuery.page = val
        this.init()
      },

      cellClick(row, column, cell, event) { //点击文件名
        let that = this;
        
      },
      indexMethod(index) {//获取表格序号
         //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
        return  (this.histroyData.pageSize-20)*this.histroyData.pages + (index+1) ;
    
      },
        closeDialog(){ //关闭会话
            this.RedFlushingVisible = false;
            this.crumbsData.titleList.splice(3,1);
            this.init()
        },
        closeDialogchooseRedFlushin(){
            this.chooseRedFlushingVisible = false;
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childRedFlushing.submit()
            // this.RedFlushingVisible = false;
        },
        add(){
            this.RedFlushingVisible = true;
            this.$set(this.crumbsData.titleList,"3",{title:'添加',method:()=>{window.histroy.back()}})

        },
        add1(){
            this.RedFlushingVisible1 = true;
        },
        edit(){

        },
        chooseRedFlushing(){
            this.chooseRedFlushingVisible = true;
        },
        // 删除行
        deleteRow(index, row){
            this.$confirm('是否确认删除该行?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.histroyData.list.splice(index,1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    watch:{
        maxHeight(){
        this.tableShow = false
        this.$nextTick(()=>{
          this.tableShow = true
        })
      },
    }
}
</script>
<style lang="scss">
.RedFlushing{
    width: 100%;
    height: 100%;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom:8px;
    }
    .kl-table{
        padding: 0px 20px;
        .block{
            text-align: right;
            padding:10px 0px;
        }
    }
}
</style>
