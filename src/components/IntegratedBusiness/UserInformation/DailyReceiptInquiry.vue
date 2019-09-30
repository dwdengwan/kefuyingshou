

<template>

    <div class="DailyReceiptInquiry">
        <!-- 收费方式变更 -->
    	<el-dialog :title="payWayName" append-to-body :close-on-click-modal="false" :visible.sync="payWayVisible" @close="closeDialog" class="payWayDialog">
            <payWay
                ref="childpayWay" 
            ></payWay>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm')">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog>
        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                
                <el-form-item class="form-left">
                   
                    <el-form-item label="收费日期：">
                        <el-date-picker
                        v-model="formData.con"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="时间段：">
                        <el-select  clearable v-model="formData.waterMeterManufacturer" placeholder="全部">
                            <el-option  v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="收费方式：">
                        <el-select  clearable v-model="formData.waterMeterManufacturer" placeholder="全部">
                            <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="模糊查询：">
                        <!-- <el-input v-model="formData.waterMeterStatus" class="searchInput" placeholder="客户编号/客户名称/账户编号"></el-input> -->
                        <el-tooltip class="item" effect="dark" content="客户编号、客户名称、账户编号" placement="top">
                            <el-input v-model="formData.waterMeterStatus" clearable size="mini"></el-input>
                        </el-tooltip>
                    </el-form-item>

                 <el-form-item>
                        
                        <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                    </el-form-item>
                    
                </el-form-item>
                
                <el-form-item class="form-right">
                    <!-- <el-button @click="exportExcel" size="mini" type="primary">打印</el-button>
                    <el-button @click="exportExcel" size="mini" type="primary">多户</el-button> -->

                    <el-button size="mini" type="primary" @click="changePay">收费方式变更</el-button>


    
                
                
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
                
                min-width="120"
                label="客户编号">
            </el-table-column>

            <el-table-column
                prop="daytime"
                min-width="100"
                label="客户名称">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="100"
                label="账户编号">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="100"
                label="违约金">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="100"
                label="实收金额">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="120"
                label="上期余额">
            </el-table-column>

            <el-table-column
                prop="isxz"
                min-width="80"
                label="收费方式">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="120"
                label="收费时间">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="80"
                label="收费员">
            </el-table-column>

           

            </el-table>
            <!-- 分页 -->
            <!-- <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[20, 100, 500, 1000]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="histroyData.total">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import payWay from "./payWay"
export default {
    name:"DailyReceiptInquiry",
    components:{
        payWay
    },
     data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'财务中心',path:'/DailyReceiptInquiry'},
                    {title:'票据管理',method:()=>{window.histroy.back()}}
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
                        name:"现金",
                        value:"2"
                    },
                    {
                        name:"支票",
                        value:"3"
                    },
                    {
                        name:"刷卡",
                        value:"4"
                    },
                    {
                        name:"转账",
                        value:"5"
                    },
                    {
                        name:"预存",
                        value:"6"
                    },
                ],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[
                    {
                        name:"上午",
                        value:"1"
                    },
                    {
                        name:"下午",
                        value:"2"
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
            DailyReceiptInquiryVisible:false,  //综合查询的显示和隐藏
            DailyReceiptInquiryName:'发票领用-领用',
            ruleFormData:{},
            PrintPayer:"",
            CombinedStrike:"",
            payWayName:"收费方式变更",
            payWayVisible:false,
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
                        daytime: "林碧霞",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "现金",
                        lvalue: "程丹丹",
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
            this.DailyReceiptInquiryVisible = false;
            this.payWayVisible = false;
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childDailyReceiptInquiry.submit()
            // this.DailyReceiptInquiryVisible = false;
        },
        add(){
            this.DailyReceiptInquiryVisible = true;
        },
        edit(){

        },
        changePay(){
            this.payWayVisible = true;
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
.DailyReceiptInquiry{
    width: 100%;
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom:8px;
    }
    .kl-table{
        padding: 0px 10px;
        width: calc(100% - 20px);
        .block{
            text-align: right;
            padding:10px 0px;
        }
    }
    .el-form--inline .el-form-item{
        margin-right: 0px;
    }
    
}
.payWayDialog .el-dialog{
    width:50%;
    height: 40%;
    margin-top: 20% !important;
}
</style>
