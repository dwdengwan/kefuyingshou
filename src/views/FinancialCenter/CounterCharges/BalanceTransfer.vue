

<template>

    <div class="BalanceTransfer">
        <!-- 弹出表单编辑 -->
    	<el-dialog :title="BalanceTransferName" :visible.sync="BalanceTransferVisible" class="addDialog" @close="closeDialog" >
            <BalanceTransferEdit
                ref="childBalanceTransfer" 
            ></BalanceTransferEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit">保 存</el-button>
             
		      <el-button type="info" size="mini" plain @click="closeDialog">返 回</el-button>

		    </div>
    	</el-dialog>
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <h2 class="tab-title">
            <i></i>
            余额过户</h2>
        </div>
        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                
                <el-form-item class="form-left">
                    <el-form-item label='办理日期：'>
                        <el-date-picker
                            v-model="DateChoosevalue"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            :picker-options="pickerOptions"
                            :clearable=false
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="未审">
                            <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="模糊查询：">
                        <el-input v-model="formData.con" placeholder="用户编号/流水号"></el-input>
                    </el-form-item>

                    <el-form-item>
                        
                        <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                    </el-form-item>
                    
                </el-form-item>
                <el-form-item class="form-right">
                    <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button>
                    <el-button @click="exportExcel" size="mini" type="primary">审核</el-button>
                    <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button>

    
                
                
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
                type="index"  label="NO."
                width="50" 
                :index="indexMethod">
            </el-table-column>

            <el-table-column 
                type="selection" 
                width="50" 
                >
            </el-table-column>

            <el-table-column
                prop="code"
                
                min-width="150"
                label="状态">
            </el-table-column>

            <el-table-column
                prop="areaName"
                min-width="80"
                label="转出账户">

            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="200"
                label="客户名称">
            </el-table-column>


            <el-table-column
                prop="fixValue"
                min-width="80"
                label="账户余额">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="80"
                label="转出金额">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="80"
                label="转出后余额">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="80"
                label="转入账户">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="200"
                label="客户名称">
            </el-table-column>


            <el-table-column
                prop="fixValue"
                min-width="80"
                label="账户余额">
            </el-table-column>

            <el-table-column
                prop="fixValue"
                min-width="80"
                label="转入金额">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="200"
                label="转入后余额">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="200"
                label="办理日期">
            </el-table-column>

            <el-table-column
                prop="fixValue"
                min-width="80"
                label="办理人">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="80"
                label="审核日期">
            </el-table-column>

            <el-table-column
                prop="fixValue"
                min-width="80"
                label="审核人">
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="120">
                <template slot-scope="scope">
                <el-button type="text" @click.native="edit(scope.$index, scope.row)">编辑</el-button>
                <span style='color:#f0f0f0;'>|</span>
                <el-button type="text" @click.native="deleteRow(scope.$index, scope.row)">删除</el-button>
                <span style='color:#f0f0f0;'>|</span>
                <el-button type="text" >明细</el-button>

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
</template>
<script>
import BalanceTransferEdit from "./BalanceTransferEdit"
export default {
    name:"BalanceTransfer",
    components:{
        BalanceTransferEdit
    },
     data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'表务中心',path:'/FinancialCenter'},
                    {title:'柜台收费',method:()=>{window.histroy.back()}}
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
            BalanceTransferVisible:false, 
            BalanceTransferName:'柜台收费-余额过户',
            ruleFormData:{},
 
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.water-meter-inquiry .kl-table',['.water-meter-inquiry .toolbar','.water-meter-inquiry .block','.water-meter-inquiry #crumbs'])
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
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
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
                        areaId: null,
                        areaName: "东深小区",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
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
                        areaId: null,
                        areaName: "东深小区",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
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
                        areaId: null,
                        areaName: "东深小区",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
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
            this.BalanceTransferVisible = false;
            this.backfillVisible = false;
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childBalanceTransfer.submit()
            // this.BalanceTransferVisible = false;
        },
        edit(){
            this.BalanceTransferVisible = true;
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
.BalanceTransfer{
    width: 100%;
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
