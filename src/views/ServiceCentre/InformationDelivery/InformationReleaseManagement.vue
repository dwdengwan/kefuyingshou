
<template>
    <div class="InformationReleaseManagement">
    
 
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add" type="primary">添加</el-button>
        </div>
      </div>
      
      <div v-if="EditVisible">
        <InformationReleaseManagementEdit ref="childWarehousing"></InformationReleaseManagementEdit>
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
                        <el-form-item label="标题：">
                            <el-input v-model="formData.con" placeholder=""></el-input>
                        </el-form-item>

                        <el-form-item>
                        
                            <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                        
                    </el-form-item>
                    <el-form-item class="form-right">
                        <!-- <el-button size="mini" icon="el-icon-plus" @click="add" type="primary">添加</el-button> -->

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
                    type="index"  label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                </el-table-column>

                <el-table-column
                    prop="areaName"
                    min-width="80"
                    label="审批状态">

                </el-table-column>

                <el-table-column
                    prop="concentrator"
                    min-width="180"
                    label="信息类型">
                </el-table-column>

                <el-table-column
                    prop="factoryName"
                    min-width="300"
                    label="标题">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="发布人">
                </el-table-column>

                <el-table-column
                    prop="flux"
                    min-width="180"
                    label="描述">
                </el-table-column>

                <el-table-column
                    prop="isxz"
                    min-width="150"
                    label="发布时间">
                </el-table-column>

                <!-- <el-table-column
                    prop="meter"
                    min-width="100"
                    label="留言">
                </el-table-column> -->

                <el-table-column label="操作" fixed="right" width="220">
                    <template slot-scope="scope">
                    <!-- size="mini" type="warning" plain -->
                    <el-button type="text" @click="split(scope.$index, scope.row)">编辑</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text">审批</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick" @click="record(scope.$index, scope.row)">撤回</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick" @click="record(scope.$index, scope.row)">复制链接</el-button>
        
        
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

import InformationReleaseManagementEdit from "./InformationReleaseManagementEditFrom"
export default {
    name:"InformationReleaseManagement",
    components:{
        InformationReleaseManagementEdit
    },
    data() {
      return {
        EditVisible:false,//弹出表单
        crumbsData :{  //面包屑
            titleList:[
                {title:'服务中心',path:'/ServiceCentre'},
                {title:'信息发布',method:()=>{window.histroy.back()}},
                {title:'信息发布管理',method:()=>{window.histroy.back()}},

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
        rules:{
            watermeterWarehouse:[
                { required: true, message: '请选择短语', trigger: 'blur' },
            ],
            desc:[
                { required: true, message: '请输入用户编号', trigger: 'blur' },
            ]
        },
        InformationReleaseManagementVisible:false, 
        InformationReleaseManagementName:'信息发布管理-添加',

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
                        areaId: null,
                        areaName: "未审批",
                        code: "C7551990000003",
                        concentrator: "服务指南 - 用户指南",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "用水申请办事指南 （DN50及以下口径用水）",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "2019-05-21 17:14:42",
                        lvalue: "-",
                        meter: "关闭留言",
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
                        areaName: "未审批",
                        code: "C7551990000003",
                        concentrator: "通知公告 - 其它通知",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "关于推行增值税电子普通发票的通告",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "2019-05-21 17:14:42",
                        lvalue: "-",
                        meter: "关闭留言",
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
                        areaName: "未审批",
                        code: "C7551990000003",
                        concentrator: "服务指南 - 用户指南",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "非居民用水报装指南-永久用水",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "2019-05-21 17:14:42",
                        lvalue: "-",
                        meter: "关闭留言",
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
            };
             this.ArrearsDetails = {
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
                        sub:"",
                        Total:""
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
                        sub:"",
                        Total:""
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
                        areaName: "",
                        code: "",
                        concentrator: "",
                        connect: null,
                        daytime: "",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "合计：",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "笔数：",
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
                        sub:"3",
                        Total:"17.7"
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
      handleClick(tab, event) {
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
            };
      },
       demand() {  //查询
        // this.tableQuery.page = 1
        // this.tableQuery.pageCount = 20
        this.init()
      },
    
        
        add(){//添加
            this.EditVisible = true;
            this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })

        },
        edit(){
            this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
            this.EditVisible = true;
        },
        closeDialog(){ //关闭会话
            this.crumbsData.titleList.splice(3, 1);
            this.EditVisible = false;
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
  };
</script>
<style lang="scss">
.InformationReleaseManagement{
    // padding:20px;
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
    .demo-form{
        width:25%;
        margin: 20px auto;
        .el-input,.el-textarea{
            width: 100% !important;
        }
    }
    .el-dialog__body{
        padding:0px;
    }
    
}
#app .InformationReleaseManagement .el-dialog .el-dialog__body {
    height: calc(100% - 116px);
}
</style>