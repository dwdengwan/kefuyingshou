


<template>

    <div class="EngineeringFees">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <!-- <div class="bread-contain-right" v-show="EngineeringFeesShow">
                <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button>
            </div> -->
        </div>
        <!-- <div v-if="EngineeringFeesVisible">
            <EngineeringFeesEdit ref="childWarehousing"></EngineeringFeesEdit>
        </div> -->
        <section v-show="EngineeringFeesShow" class="EngineeringFeesCon">
            <div class="toolbar">
                <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                    
                    <el-form-item class="form-left">
                        <el-form-item label='收费日期：'>
                            <el-date-picker
                            v-model="DateChoosevalue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="单据类型：">
                            <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="">
                                <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="单据编号：" class="searchInput">
                            <el-input v-model="formData.con" placeholder="单据编号"></el-input>
                        </el-form-item>

                        <el-form-item>
                            
                            <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                        
                    </el-form-item>
                    <el-form-item class="form-right">
                        <!-- <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button> -->
                        <!-- <el-button @click="exportExcel" size="mini" type="primary">审批</el-button> -->
                        <!-- <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button> -->

        
                    
                    
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
                        fixed="left"
                        :index="indexMethod">
                    </el-table-column>


                    <el-table-column
                        prop="code"
                        
                        min-width="100"
                        label="单据编号">
                    </el-table-column>
                    
                    <el-table-column
                        prop="lvalue"
                        min-width="100"
                        label="单据类型">
                    </el-table-column>

                    
                    <el-table-column
                        prop="areaName"
                        min-width="100"
                        label="应收金额">

                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="100"
                        label="押金">
                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="100"
                        label="合计金额">
                    </el-table-column>
                    
                    <el-table-column
                        prop="areaName"
                        min-width="100"
                        label="缴费渠道">

                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="缴费方式">
                    </el-table-column>

                    <el-table-column
                        prop="flux"
                        min-width="80"
                        label="收费时间">
                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="100"
                        label="收费员">
                    </el-table-column>


                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="发票代码">
                    </el-table-column>

                    <el-table-column
                        prop="flux"
                        min-width="80"
                        label="发票号码">
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="160">
                        <template slot-scope="scope">
                        <el-button type="text">收费</el-button>
                        <span style='color:#f0f0f0;'>|</span>
                        <el-button type="text">发票</el-button>
                        <span style='color:#f0f0f0;'>|</span>
                        <el-button type="text">收据</el-button>
                        <span style='color:#f0f0f0;'>|</span>
                        <el-button type="text" >详情</el-button>

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
// import EngineeringFeesEdit from "./EngineeringFeesEdit"
export default {
    name:"EngineeringFees",
    components:{
        // EngineeringFeesEdit
    },
     data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'账务中心',path:'/FinancialCenter'},
                    {title:'柜台收费',method:()=>{window.histroy.back()}},
                     {title:'工程类收费',method:()=>{window.histroy.back()}}
                ],
                
            },
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                    // {
                    //     name:"全部",
                    //     value:"1"
                    // },
                    // {
                    //     name:"已审",
                    //     value:"2"
                    // },
                    // {
                    //     name:"未审",
                    //     value:"3"
                    // },
                    // {
                    //     name:"删除",
                    //     value:"4"
                    // },
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
            EngineeringFeesVisible:false, 
            EngineeringFeesName:'柜台收费-余额取出',
            ruleFormData:{},
            EngineeringFeesShow:true,
 
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.EngineeringFees',['.EngineeringFees .toolbar','.EngineeringFees .block','.EngineeringFees #crumbs'])
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
                        areaName: "",
                        code: "",
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
                        areaName: "",
                        code: "",
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
                        areaName: "",
                        code: "",
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
            this.EngineeringFeesVisible = false;
            this.backfillVisible = false
            this.EngineeringFeesShow = true;
            this.crumbsData.titleList.splice(3, 1);
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childEngineeringFees.submit()
            // this.EngineeringFeesVisible = false;
        },
        edit(){
            this.EngineeringFeesVisible = true;
            this.EngineeringFeesShow = false;
            this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
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
.EngineeringFees{
    width: 100%;
    height: 100%;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom:8px;
    }
    .EngineeringFeesCon{
        width: 100%;
        height: calc(100% - 41px);
    }
    .kl-table{
        padding: 0px 20px;
        width: calc(100% - 41px);
        height: calc(100% - 81px);
        .block{
            text-align: right;
            padding:10px 0px;
        }
    }
}
</style>
