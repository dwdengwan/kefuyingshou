<template>
    <div class="DimensionalInspection">
        <!-- 弹出表单含添加和修改 -->
    	<!-- <el-dialog :title="WaterEditorName" :visible.sync="waterAddVisible" :close-on-click-modal="false"  @close="closeDialog" >
            <DimensionalInspectionEdit
                ref="childWaterEditor" 
                
            ></DimensionalInspectionEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm');">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog> -->
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right" v-if="waterAddVisible">
                <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
            <div class="bread-contain-right" v-if="InspectionExamineVisible">
                <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
            <div class="bread-contain-right" v-show="DimensionalInspectionShow">
                <el-button icon="el-icon-plus" @click="add('add')" size="mini" type="primary">添加</el-button>
            </div>
        </div>
        <div v-if="waterAddVisible" class="DimensionalInspectionEditCon">
            <!-- <div  class="toolbar">  
            </div> -->
            <DimensionalInspectionEdit
                ref="DimensionalInspectionEdit" 
                :tableEdit="tableEdit"
            ></DimensionalInspectionEdit>
        </div>
        <div v-if="InspectionExamineVisible" class="DimensionalInspectionExamineCon">
            <!-- <div  class="toolbar">
                
            </div> -->
            <DimensionalInspectionExamine
                ref="DimensionalInspectionExamine" 
            ></DimensionalInspectionExamine>
        </div>
        <section v-show="DimensionalInspectionShow" class="DimensionalInspectionCon">
            <div class="toolbar">
                <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                    <el-form-item class="form-left">
                        
                        <el-form-item label="水表口径：">
                            <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="300">
                                <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="水表厂家：">
                            <el-select  clearable v-model="formData.waterMeterManufacturer" placeholder="宁波">
                                <el-option  v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="水表类型：">
                            <el-select  clearable v-model="formData.waterMeterType" placeholder="人工表">
                                <el-option  v-for="(item,index) in formData.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="审批状态：" class="">
                            <el-select  clearable v-model="formData.waterMeterCaliber" placeholder="未审">
                                <el-option  v-for="(item,index) in formData.waterMeterCaliberOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="模糊查询："  class="searchInput">
                            <el-tooltip class="item" effect="dark" content="水表编号、合格证号、户号" placement="top">
                                <el-input v-model="formData.inputContent"></el-input>
                            </el-tooltip>

                        <!-- <el-form-item label="模糊查询：" class="searchInput">
                            <el-input v-model="formData.con"  clearable placeholder="水表编号/合格证号/户号"></el-input> -->
                        </el-form-item>
                        <el-form-item>
                            <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                
                    </el-form-item>
                    
                        
                        

                    <el-form-item class="form-right">
                    
                        <!-- <el-button icon="el-icon-plus" @click="add" size="mini" type="primary">添加</el-button> -->
                        <!-- <el-button size="mini" type="primary" @click="backfill">审批</el-button> -->

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
                class="DimensionalInspection-table">
                
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
                    prop="connect"
                    min-width="100"
                    label="水表编号">
                </el-table-column>

                <!-- <el-table-column
                    prop="connect"
                    min-width="80"
                    label="合格证号">

                </el-table-column> -->

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="出厂编号">
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="水表口径">
                </el-table-column>

                <!-- <el-table-column
                    prop="connect"
                    min-width="80"
                    label="水表类型">
                </el-table-column> -->

                <el-table-column
                    prop="connect"
                    
                    min-width="150"
                    label="水表厂家">
                </el-table-column>

                <el-table-column
                    prop="connect"
                    
                    min-width="120"
                    label="水表类型">
                </el-table-column>


                <el-table-column
                    prop="connect"
                    
                    min-width="120"
                    label="水表型号">
                </el-table-column>

                <el-table-column
                    prop="factoryName"
                    
                    min-width="100"
                    label="维检类型">
                </el-table-column>

                <!-- <el-table-column
                    prop="connect"
                    min-width="100"
                    label="维修人">
                </el-table-column> -->

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="维修日期">

                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="维修结果">
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="维修说明">
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="检定日期">
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="检定结果">
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="80"
                    label="检定说明">
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

                <el-table-column label="操作" fixed="right" width="130">
                    <template slot-scope="scope">                        
                        <el-button v-show="scope.row.areaName=='已审批'" type="text" @click="add('详情')">详情</el-button>
                        <el-button v-show="scope.row.areaName=='未审批'" type="text" @click="add('编辑')">编辑</el-button>
                        <span v-show="scope.row.areaName=='未审批'" style='color:#f0f0f0;'>|</span>
                        <el-button v-show="scope.row.areaName=='未审批'" type="text"  @click="backfill" class="noclick">审批</el-button>
                        <span v-show="scope.row.areaName=='未审批'" style='color:#f0f0f0;'>|</span>
                        <el-button v-show="scope.row.areaName=='未审批'" type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
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
import DimensionalInspectionEdit from './DimensionalInspectionEdit'
import DimensionalInspectionExamine from "./DimensionalInspectionExamine"
export default {
    name:"DimensionalInspection",
    components:{
        DimensionalInspectionEdit,
        DimensionalInspectionExamine
    },
     data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'表务中心',path:'/DimensionalInspection'},
                    {title:'维检',method:()=>{window.histroy.back()}}
                ],
                
            },
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                    {
                        name:"15",
                        value:"1"
                    },
                    {
                        name:"20",
                        value:"1"
                    },
                    {
                        name:"25",
                        value:"1"
                    },
                    {
                        name:"40",
                        value:"1"
                    },
                    {
                        name:"200",
                        value:"1"
                    },
                ],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[
                    {
                        name:"宁波",
                        value:"1"
                    },
                    {
                        name:"上海",
                        value:"1"
                    },
                    {
                        name:"梅花",
                        value:"1"
                    },
                    {
                        name:"常德",
                        value:"1"
                    },
                    {
                        name:"开封",
                        value:"1"
                    },
                ],
                waterMeterType:"",
                waterMeterTypeOptions:[
                    {
                        name:"人工表",
                        value:"1"
                    },
                    {
                        name:"远传表",
                        value:"2"
                    },
                ],
                waterMeterCaliber:"",
                waterMeterCaliberOptions:[
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
                        value:"4o"
                    },
                ],
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
            WaterEditorName:'维检-添加',
            DimensionalInspectionShow:true,
            InspectionExamineVisible:false,
            tableEdit:true,
        }
    },
    mounted(){
         this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.DimensionalInspection',['.DimensionalInspection .toolbar','.DimensionalInspection .block','.DimensionalInspection #crumbs'])
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
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "维修",
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
                    {
                        formDate:'20190711',
                        formName:'张三',
                        formNum:'0101010221',
                        areaId: null,
                        areaName: "已审批",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "检测",
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
        // 添加
        add(val){
            this.waterAddVisible = true;
            this.DimensionalInspectionShow = false;
            if (val === "add") {
                this.tableEdit = false;
                this.$set(this.crumbsData.titleList,"2",{title:'添加',method:()=>{window.histroy.back()}});
            } else {
                
                if (val === "详情") {
                    this.tableEdit = true;
                    this.$set(this.crumbsData.titleList, "2", { title: '详情', method: () => { window.histroy.back() } })
                } else {
                    this.tableEdit = false;
                    this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } })
                }

            }
            
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
            this.InspectionExamineVisible = false;
            this.DetailsOfTableChangeVisible = false;
            this.DimensionalInspectionShow = true;
            this.crumbsData.titleList.splice(2,1);
			this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childWaterEditor.submit()
            // this.waterAddVisible = false;
        },
        // 审批
        backfill(){
            this.InspectionExamineVisible = true;
            this.$set(this.crumbsData.titleList,"2",{title:'审批',method:()=>{window.histroy.back()}});
            this.DimensionalInspectionShow = false;
        },
        backfillSubmit(){

        },

        // 删除行
        deleteRow(index, row) {
            this.$confirm('是否确认删除该行?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.histroyData.list.splice(index, 1)
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
.DimensionalInspection{
    width: 100%;
    height: 100%;
    .el-form-item {
        margin-right: 0px;
    }
    .kl-table{
        width:calc(100% - 40px);
        height: calc(100% - 67px);
        padding:0px 20px ;
        .block{
            text-align: right;
            padding:10px 0px;
        }
    }
    .el-dialog__body{
        padding:0px;
    }
    .DimensionalInspectionEditCon,
    .DimensionalInspectionExamineCon,
    .DimensionalInspectionCon{
        width:100%;
        height: calc(100% - 42px);
    }
}
</style>
