<template>
    <div class="DuplicateTable">
         <!-- 弹出表单审批 -->
    	<!-- <el-dialog :title="backfillName" :visible.sync="backfillVisible" :close-on-click-modal="false" class="backfill" @close="closeDialog" >
            <TableDismantlingBackfill
                ref="backfillEditor" 
                :backfillSubmitFormData = "backfillSubmitForm"
            ></TableDismantlingBackfill>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit('ruleForm');">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog> -->
         <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <!-- 审批 -->
            <div class="bread-contain-right" v-if="backfillVisible">
		      <el-button type="primary" size="mini">提交</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
        </div>
        <!-- 审批 -->
        <div v-if="backfillVisible" class="backfillCon">
            <TableDismantlingBackfill
                ref="backfillEditor" 
                :backfillSubmitFormData = "backfillSubmitForm"
            ></TableDismantlingBackfill>
        </div>
        <section class="DuplicateTableCon" v-if="DuplicateTableVisible">
            <div class="toolbar">
                <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                    <el-form-item class="form-left">
                        <el-form-item label='单据日期：'>
                            <el-date-picker
                                v-model="DateChoosevalue"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                :picker-options="pickerOptions"
                                :clearable="true"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="审批状态：">
                            <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="">
                                <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="模糊查询："  class="searchInput">
                                
                                <el-tooltip class="item" effect="dark" content="用户编号、水表编号" placement="top">
                                    <el-input v-model="formData.inputContent"></el-input>
                                </el-tooltip>
                        <!-- <el-form-item label="模糊查询：" class="searchInput">
                            <el-input v-model="formData.con" placeholder="用户编号/水表编号"></el-input> -->
                        </el-form-item>
                        <el-form-item>
                            <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                
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
                @cell-click="cellClick"
                class="DuplicateTable-table">
                
                <!-- <el-table-column
                    type="selection"
                    width="55"
                    fixed="left">
                </el-table-column> -->

                <el-table-column 
                    type="index"  label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                </el-table-column>

                <el-table-column
                    prop="formNum"
                    min-width="100"
                    label="单据编号">
                </el-table-column>


                <el-table-column
                    prop="areaName"
                    
                    min-width="100"
                    label="审批状态">
                </el-table-column>

                <el-table-column
                    prop="daytime"
                    min-width="100"
                    label="办理日期">
                </el-table-column>

                <el-table-column
                    prop="factoryName"
                    min-width="80"
                    label="用户编号">

                </el-table-column>
                
                <el-table-column
                    prop="isxz"
                    min-width="80"
                    label="用户地址">
                </el-table-column>

                <el-table-column
                    prop="isxz"
                    min-width="80"
                    label="装表地址">
                </el-table-column>

                <el-table-column
                    prop="meter"
                    min-width="80"
                    label="水表编号">
                </el-table-column>

                <el-table-column
                    prop="meter"
                    min-width="80"
                    label="水表口径">
                </el-table-column>
                <el-table-column
                    prop="meter"
                    min-width="100"
                    label="复表日期">

                </el-table-column>

                <el-table-column
                    prop="meter"
                    min-width="80"
                    label="复表起码">
                </el-table-column>

                <el-table-column
                    prop="meter"
                    min-width="80"
                    label="复表员">
                </el-table-column>

                <el-table-column
                    prop="formName"
                    min-width="100"
                    label="制单人">
                </el-table-column>

                <el-table-column
                    prop="formDate"
                    min-width="100"
                    label="制单日期">
                </el-table-column>

                <el-table-column
                    prop="meter"
                    min-width="80"
                    label="备注">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
                        <template slot-scope="scope">
                        <!-- size="mini" type="warning" plain -->
                        <el-button type="text" @click="backfill(scope.$index, scope.row)">审批</el-button>
                        <!-- <span style='color:#f0f0f0;'>|</span>
                        <el-button type="text" class="noclick">审批</el-button> -->
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
        </section>
    </div>
</template>
<script>
import TableDismantlingBackfill from "./TableDismantlingBackfill"
export default {
    name:"DuplicateTable",
    components:{
        TableDismantlingBackfill
    },
    data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'表务中心',path:'/DuplicateTable'},
                    {title:'复表',method:()=>{window.histroy.back()}}
                ],
                
            },
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                    {
                        name:"全部",
                        value:"1"
                    },
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
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[],
                waterMeterType:"",
                waterMeterTypeOptions:[],
                waterMeterCaliber:"",
                waterMeterCaliberOptions:[],
                waterMeterStatus:"",
                waterMeterStatusOptions:[],
                subordinateDepartments:"",
                subordinateDepartmentsOptions:[]

            },
            tableShow:false,
            maxHeight:0,
            histroyData:{
                
            },
            // 日期选择器
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now() ;
                }
            },
            DateChoosevalue: [],
            backfillName:"复表-审批",
            backfillVisible:false,
             backfillSubmitForm:{
                backfillInput:[
                    
                    {
                        label:"水表编号",
                        value:"",
                        tips:""
                    },
                    {
                        label:"水表口径",
                        value:"",
                        tips:""
                    },
                    {
                        label:"复表日期",
                        value:"",
                        tips:""
                    },
                    {
                        label:"复表员",
                        value:"",
                        tips:""
                    },
                    {
                        label:"复表起码",
                        value:"",
                        tips:""
                    },
                   
                ],
                backfillInputRead:[
                    {
                        label:"办理日期",
                        value:"",
                        tips:""
                    },
                    {
                        label:"用户编号",
                        value:"",
                        tips:""
                    },
                    {
                        label:"用户名称",
                        value:"",
                        tips:""
                    },
                    {
                        label:"用户地址",
                        value:"",
                        tips:""
                    },
                    // {
                    //     label:"停用说明",
                    //     value:"",
                    //     tips:""
                    // },
                ],
                desc:"",
                descoptions:[
                     {
                        name:"欠费拆表",
                        value:"1"
                    },
                    {
                        name:"报停拆表",
                        value:"2"
                    },
                ],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[
                   
                ],
            },
            DuplicateTableVisible:true,

        }
    },
     mounted(){
         this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.DuplicateTable',['.DuplicateTable .toolbar','.DuplicateTable .block','.DuplicateTable #crumbs'])
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
                        formDate:'20190711',
                        formName:'张三',
                        formNum:'0101010221',
                        areaId: null,
                        areaName: "未审批",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "20190702",
                        endTime: null,
                        factoryName: "01091012",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "龙天县9号",
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
            this.backfillVisible = false;
            this.DuplicateTableVisible = true;
            this.crumbsData.titleList.splice(2,1);
			this.init()
        },
// 审批
        backfill(){
            this.backfillVisible = true;
            this.DuplicateTableVisible = false;
             this.$set(this.crumbsData.titleList,"2",{title:'审批',method:()=>{window.histroy.back()}})
        },
        backfillSubmit(){

        },
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
 @import "../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.DuplicateTable{
    width: 100%;
    height: 100%;
    .backfillCon,.DuplicateTableCon{
        width: 100%;
        height: 100%;
    }
    .kl-table{
        padding:0px 20px ;
        .block{
            text-align: right;
            padding:10px 0px;
        }
    }
}
</style>
