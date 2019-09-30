

<template>
    <div class="InformationReleaseManagement">
    	<el-dialog :title="PreviewQuestionnaireName" :close-on-click-modal="false" :visible.sync="PreviewQuestionnaireVisible">
            <PreviewQuestionnaire ref="PreviewQuestionnaire" ></PreviewQuestionnaire>
    	</el-dialog>

      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <div v-if="divType=='1'">
            <el-button size="mini"  type="primary" @click="PreviewQuestionnaire()">预览问卷</el-button>
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            
            </div>
            <div v-else>
            <!-- <el-button size="mini" type="primary">保存</el-button> -->
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>

        </div>
        
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('1')" type="primary">添加</el-button>
        </div>
      </div>
        
      <div v-if="EditVisible">
        <div v-if="divType=='1'">
            <div >
                <InformationReleaseManagementEdit ref="childWarehousing"></InformationReleaseManagementEdit>
            </div>
         </div>   
        <div v-else>
            <div >
                <Findings ref="childWarehousing"></Findings>
            </div>
            
        </div>

      </div>
       
        <div v-else>
            <div class="toolbar">
                <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                    
                    <el-form-item class="form-left">

                    <el-form-item label="审批状态：">
                        <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="全部">
                            <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                    </el-form-item>
                        <el-form-item label='日期：'>
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

                        <el-form-item>
                        
                            <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                        
                    </el-form-item>
                    <el-form-item class="form-right">
                        <!-- <el-button size="mini" icon="el-icon-plus" @click="add('1')" type="primary">添加</el-button> -->

                        <!-- <el-button size="mini" @click="add" type="primary">审批</el-button> -->
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

                <el-table-column 
                    type="index"  
                    label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                </el-table-column>
                
                <el-table-column
                    prop="lvalue"
                    min-width="70"
                    label="审批状态">

                </el-table-column>

                <el-table-column
                    prop="qusName"
                    min-width="200"
                    label="问卷主题">

                </el-table-column>

                <el-table-column
                    prop="qusNum"
                    min-width="80"
                    label="选题数量">
                </el-table-column>

                <el-table-column
                    prop="pubChannels"
                    min-width="100"
                    label="发布渠道">
                </el-table-column>

                <el-table-column
                    prop="sDate"
                    min-width="100"
                    label="开始时间">
                </el-table-column>

                <el-table-column
                    prop="eDate"
                    min-width="100"
                    label="结束时间">
                </el-table-column>

                <el-table-column
                    prop="writer"
                    min-width="80"
                    label="制作人">
                </el-table-column>
                
                <el-table-column
                    prop="writeDate"
                    min-width="80"
                    label="制作日期">
                </el-table-column>

                <el-table-column label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                    <!-- size="mini" type="warning" plain -->
                    <el-button type="text" class="noclick" @click="add('2')">查看结果</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick" @click="PreviewQuestionnaire">预览</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" @click="split(scope.$index, scope.row)">编辑</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text">审批</el-button>
                    <!-- <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button> -->

        
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

import Findings from "./Findings"
import InformationReleaseManagementEdit from "./InformationReleaseManagementEdit"
import PreviewQuestionnaire from "./PreviewQuestionnaire"
export default {
    name:"InformationReleaseManagement",
    components:{
        Findings,
        InformationReleaseManagementEdit,
        PreviewQuestionnaire
    },
    data() {
      return {
        EditVisible:false,//弹出表单
        crumbsData :{  //面包屑
            titleList:[
                {title:'服务中心',path:'/ServiceCentre'},
                {title:'满意度调查',method:()=>{window.histroy.back()}},
                {title:'问卷管理',method:()=>{window.histroy.back()}},

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
                    name:"已审批",
                    value:"2"
                },
                {
                    name:"未审批",
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
        rules:{
            watermeterWarehouse:[
                { required: true, message: '请选择短语', trigger: 'blur' },
            ],
            desc:[
                { required: true, message: '请输入用户编号', trigger: 'blur' },
            ]
        },
        InformationReleaseManagementVisible:false, 
        InformationReleaseManagementName:'问卷管理-添加',
        PreviewQuestionnaireName:"预览问卷",
        PreviewQuestionnaireVisible:false,
        divType:'1'

      };
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.ShortMessageNotification .kl-table',['.ShortMessageNotification .toolbar','.ShortMessageNotification .block','.ShortMessageNotification #crumbs'])
    },
    methods: {
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
                        lvalue: "已审批",
                        qusName: "网上营业厅的便利程度",
                        qusNum: "10",
                        pubChannels: "网上营业厅",
                        sDate: "2019-07-30",
                        eDate: "2019-09-30",
                        writer: "李四",
                        writeDate: "2019-07-30",
                    },
                    {
                        lvalue: "未审批",
                        qusName: "微信营业厅的便利程度",
                        qusNum: "10",
                        pubChannels: "微信营业厅",
                        sDate: "2019-07-30",
                        eDate: "2019-09-30",
                        writer: "张三",
                        writeDate: "2019-07-30",
                    }
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
            };

        },
      handleClick(tab, event) {
 
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
        //弹出框
        submit(formName){	//提交
            this.$refs.childInformationReleaseManagement.submit()
            // this.InformationReleaseManagementVisible = false;
        },
        
        add(val){//添加
            this.divType = val
            this.EditVisible = true;
            if(val==1){
            this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })
            }else{
            this.$set(this.crumbsData.titleList, "3", { title: '查看结果', method: () => { window.histroy.back() } })

            }

        },
        edit(){
            this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
            this.EditVisible = true;
        },
        closeDialog(){ //关闭会话
            this.crumbsData.titleList.splice(3, 1);
            this.EditVisible = false;
        },
        // resultCheck(){

        // },
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
        },
        // 预览问卷
        PreviewQuestionnaire(){
            this.PreviewQuestionnaireVisible = true;
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
  };
</script>
<style lang="scss">
.InformationReleaseManagement{
    width: 100%;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        // margin-bottom:8px;
    }
    .kl-table{
        padding: 0px 20px;
        .block{
            text-align: right;
            padding:10px 0px;
        }
    }
    .demo-form{
        width:25%;
        margin: 20px auto;
        .el-input,.el-textarea{
            width: 100% !important;
        }
    }
}
</style>