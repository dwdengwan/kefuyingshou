


<template>

    <div class="WaterUseOverTheYears">

        <div class="toolbar">
            <el-form :inline="true" :model="formData" class="demo-form-inline">
                
                <el-form-item class="form-left">
                    <el-form-item label='收费日期：'>
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
                    <el-form-item label="模糊查询：">
                        <el-input v-model="formData.con" placeholder="票据类型/发票代码/领用人"></el-input>
                    </el-form-item>
   

                    <el-form-item>
                        
                        <el-button size="mini" style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                    </el-form-item>
                    
                </el-form-item>
                
                <el-form-item class="form-right">
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
                label="账期">
            </el-table-column>
            
            <el-table-column
                prop="code"
                
                min-width="80"
                label="抄表日期">
            </el-table-column>

            <el-table-column
                prop="daytime"
                min-width="100"
                label="上期抄码">
            </el-table-column>

            <el-table-column
                prop="endTime"
                min-width="80"
                label="本期抄码">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="80"
                label="计费水量">
            </el-table-column>

            <el-table-column
                prop="factoryName"
                min-width="80"
                label="综合单价">
            </el-table-column>

            <el-table-column
                prop="factoryName"
                min-width="80"
                label="应收金额">
            </el-table-column>

            <el-table-column
                prop="flux"
                min-width="100"
                label="应收违约金">
            </el-table-column>

            <el-table-column
                prop="factoryName"
                min-width="80"
                label="应收合计">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="80"
                label="是否核销">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                
                min-width="100"
                label="收费时间">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="100"
                label="收费员">
            </el-table-column>

            <el-table-column
                prop="lvalue"
                min-width="100"
                label="备注">
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
export default {
    name:"WaterUseOverTheYears",
     data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'财务中心',path:'/WaterUseOverTheYears'},
                    {title:'票据管理',method:()=>{window.histroy.back()}}
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
            WaterUseOverTheYearsVisible:false,  //综合查询的显示和隐藏
            WaterUseOverTheYearsName:'发票领用-领用',
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
                        code: "201708",
                        concentrator: "",
                        connect: null,
                        daytime: "14",
                        endTime: 17,
                        factoryName: "0",
                        fcode: 61,
                        fix: 0.05,
                        fixValue: "-",
                        flux: "3",
                        getMeter: 1,
                        id: null,
                        isxz: "正常",
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
                        code: "201708",
                        concentrator: "",
                        connect: null,
                        daytime: "14",
                        endTime: 17,
                        factoryName: "0",
                        fcode: 61,
                        fix: 0.05,
                        fixValue: "-",
                        flux: "3",
                        getMeter: 1,
                        id: null,
                        isxz: "正常",
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
            this.WaterUseOverTheYearsVisible = false;
            this.backfillVisible = false;
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childWaterUseOverTheYears.submit()
            // this.WaterUseOverTheYearsVisible = false;
        },
        add(){
            this.WaterUseOverTheYearsVisible = true;
        },
        edit(){

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
.WaterUseOverTheYears{
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
    .el-form--inline .el-form-item:first-of-type{
        margin-right: 0px;
    }
    .el-date-editor .el-range__icon,.el-date-editor .el-range-separator{
        line-height: 22px;
    }
}
</style>

 