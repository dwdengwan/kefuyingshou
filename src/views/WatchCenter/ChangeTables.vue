<template>
<!-- TableDismantling -->
    <div class="change-tables">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right" v-if="backfillVisible">
                <el-button icon="el-icon-bottom" @click="downFile" size="mini" type="primary">下载模板</el-button>
                <el-button icon="el-icon-download" @click="uploading" size="mini" type="primary">导入</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
            <div class="bread-contain-right" v-if="DetailedEnquiriesVisible">
                <el-button  type="primary" size="mini" icon="el-icon-upload2" @click="exportExcel">导出</el-button>

                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
            <div class="bread-contain-right" v-if="waterAddVisible">
                <el-button size="mini" type="primary"  @click="chooseWaterMeter">选择水表</el-button>
                <el-button size="mini" type="primary">保存</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
            <div class="bread-contain-right" v-if="ChangeTablesShow">
                <el-button  @click="add" size="mini" icon="el-icon-plus" type="primary">添加</el-button>                    
                <el-button size="mini" type="primary" @click="DetailedEnquiries">历史查询</el-button>
            </div>
        </div>
        <!-- 弹出表单选择水表 -->
    	<el-dialog :title="WaterEditorName" :visible.sync="waterChooseVisible" :close-on-click-modal="false" class="addDialog" @close="closeDialog" append-to-body>
            <chooseWaterMeter
                ref="childWaterEditor" 
                
            ></chooseWaterMeter>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单含添加和修改 -->
    	<!-- <el-dialog :title="WaterEditorName" :visible.sync="waterAddVisible" :close-on-click-modal="false" class="addDialog" @close="closeDialog" >
            <ChangeTablesEditor
                ref="childWaterEditor" 
            ></ChangeTablesEditor>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm');">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog> -->
        <!-- 弹出表单回填 -->
    	<!-- <el-dialog :title="backfillName" :visible.sync="backfillVisible" :close-on-click-modal="false" class="backfill" @close="closeDialog" >
            <backfillSubmitEdit
                ref="backfillEditor" 
            ></backfillSubmitEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit('ruleForm');">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog> -->
        <div v-if="backfillVisible" class="backfillCon">
            <!-- <div  class="toolbar">
                
            </div> -->
            <backfillSubmitEdit
                ref="childWarehousing" 
            ></backfillSubmitEdit>
        </div>
        <!-- 弹出表单明细查询 -->
    	<!-- <el-dialog :title="DetailedEnquiriesName" :visible.sync="DetailedEnquiriesVisible" :close-on-click-modal="false" class="DetailedEnquiries" @close="closeDialog" >
            <DetailedEnquiries
                ref="DetailedEnquiries" 
            ></DetailedEnquiries>

    	</el-dialog> -->
        <div v-if="DetailedEnquiriesVisible" class="DetailedEnquiriesCon">
            <!-- <div  class="toolbar">
               
            </div> -->
            <DetailedEnquiries
                ref="childWarehousing" 
            ></DetailedEnquiries>
        </div>
        <!-- 弹出表单换表详情 -->
    	<el-dialog :title="DetailsOfTableChangeName" :visible.sync="DetailsOfTableChangeVisible" :close-on-click-modal="false" class="DetailsOfTableChange" @close="closeDialog" >
            <DetailsOfTableChange
                ref="DetailsOfTableChange" 
            ></DetailsOfTableChange>
    	</el-dialog>
        
        <!-- 计划 -->
        <div v-if="waterAddVisible" class="waterAddCon">
            <!-- <div  class="toolbar">
                
            </div> -->
            <ChangeTablesEditor
            ref="childWarehousing" 

            
        ></ChangeTablesEditor>
        </div>
        <div v-if="ChangeTablesShow">
       
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
                        <el-form-item label="换表类型：">
                            <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="换表类型">
                                <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="审批状态：">
                            <el-select  clearable v-model="formData.waterMeterManufacturer" placeholder="单据状态">
                                <el-option  v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="单据编号：">
                            <el-input v-model="formData.waterMeterCaliber" placeholder="请输入单据编号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item
                        >
               
                    </el-form-item>
                    
                       
                        

                    <el-form-item class="form-right">
                    
                        <!-- <el-button  @click="add" size="mini" icon="el-icon-plus" type="primary">添加</el-button> -->
                        <!-- <el-button size="mini" type="primary" @click="backfill">回填</el-button> -->
                        <!-- <el-button size="mini" type="primary" @click="DetailedEnquiries">历史查询</el-button> -->
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
                    
                    min-width="100"
                    label="审批状态">
                </el-table-column>
                
                <el-table-column
                    prop="meter"
                    min-width="80"
                    label="单据编号">

                </el-table-column>

                <el-table-column
                    prop="daytime"
                    min-width="100"
                    label="换表类型">
                </el-table-column>

                <el-table-column
                    prop="meterTime"
                    min-width="100"
                    label="换表日期">
                </el-table-column>

                <el-table-column
                    prop="peo"
                    min-width="100"
                    label="换表员">
                </el-table-column>

                <el-table-column
                    prop="getMeter"
                    min-width="80"
                    label="水表数量">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="已回填数量">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="制单日期">

                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="制单人">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <!-- size="mini" type="warning" plain -->
                        <el-button type="text" @click="backfill(scope.$index, scope.row)">回填</el-button>
                        <span style='color:#f0f0f0;'>|</span>
                        <el-button type="text" class="noclick">审批</el-button>
                        <span style='color:#f0f0f0;'>|</span>
                        <el-button type="text">打印</el-button>
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
import ChangeTablesEditor from './ChangeTablesEditor'
import backfillSubmitEdit from './backfillSubmitEdit'
import DetailedEnquiries from './DetailedEnquiries'
import DetailsOfTableChange from './DetailsOfTableChange'
import chooseWaterMeter from './chooseWaterMeter'
export default {
    name:"change-tables",
    components:{
        ChangeTablesEditor,
        backfillSubmitEdit,
        DetailedEnquiries,
        DetailsOfTableChange,
        chooseWaterMeter
    },
    data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'表务中心',path:'/ChangeTables'},
                    {title:'换表',method:()=>{window.histroy.back()}}
                ],
                
            },
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                    {
                        name:"临时换表",
                        value:"1"
                    },
                    {
                        name:"正常换表",
                        value:"2"
                    },
                    {
                        name:"异常换表",
                        value:"3"
                    },
                    

                ],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[
                    // {
                    //     name:"全部",
                    //     value:"1"
                    // },
                    {
                        name:"已审",
                        value:"1"
                    },
                    {
                        name:"未审",
                        value:"1"
                    },
                    {
                        name:"已删除",
                        value:"1"
                    },
                ],
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
            waterAddVisible:false,  //添加弹窗的显示和隐藏
            ruleFormData:{},
            backfillName:"换表-回填",
            backfillVisible:false,
            DetailedEnquiriesName:"换表-历史查询",
            DetailedEnquiriesVisible:false,
            DetailsOfTableChangeName:"换表-详情",
            DetailsOfTableChangeVisible:false,
            ChangeTablesShow:true,
            waterChooseVisible:false,  
            WaterEditorName:'水表选择',
        }
    },
    mounted(){
         this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.change-tables',['.change-tables .toolbar','.change-tables .block','.change-tables #crumbs'])
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
                        areaName: "东深小区",
                        code: "未审批",
                        concentrator: "",
                        connect: null,
                        daytime: "正常换表",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        meterTime: '2019-7-30',
                        peo: '詹 杰',
                        flux: "-",
                        getMeter: 100,
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
        // 添加
        add(){
            this.waterAddVisible = true;
            this.ChangeTablesShow = false;
             this.$set(this.crumbsData.titleList,"2",{title:'添加',method:()=>{window.histroy.back()}})
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
            this.waterAddVisible = false;
            this.backfillVisible = false;
            this.DetailedEnquiriesVisible = false;
            this.DetailsOfTableChangeVisible = false;
            this.ChangeTablesShow = true;
             this.waterChooseVisible = false;
            this.crumbsData.titleList.splice(2,1);
			this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childWaterEditor.submit()
            // this.waterAddVisible = false;
        },
        // 回填
        backfill(){
            this.backfillVisible = true;
            this.ChangeTablesShow = false;
             this.$set(this.crumbsData.titleList,"2",{title:'回填',method:()=>{window.histroy.back()}})
        },
        backfillSubmit(){

        },
        // 明细查询
        DetailedEnquiries(){
            this.DetailedEnquiriesVisible = true;
            this.ChangeTablesShow = false;
             this.$set(this.crumbsData.titleList,"2",{title:'历史查询',method:()=>{window.histroy.back()}})
        },
        edit(){
            this.DetailsOfTableChangeVisible = true;
            this.ChangeTablesShow = false;
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
        },
        chooseWaterMeter(){
            this.waterChooseVisible = true;
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
.change-tables{
    width: 100%;
    height: 100%;
    .backfillCon,.DetailedEnquiriesCon,.waterAddCon{
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
    .el-dialog__body{
         padding:20px; 
        height: calc(100% - 196px);

    }
    .backfill .el-dialog__body ,.DetailedEnquiries .el-dialog__body {
        height: calc(100% - 136px);
        padding:0px;
    }
    .DetailsOfTableChange .el-dialog__body {
        height: calc(100% - 136px);
        padding:0px 20px;
    }

}
</style>
