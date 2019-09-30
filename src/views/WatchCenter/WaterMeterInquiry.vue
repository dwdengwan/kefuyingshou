<template>
    <div class="water-meter-inquiry">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right" v-show="wmeterInquiryConShow">
                <el-button  type="primary" size="mini" icon="el-icon-upload2" @click="exportExcel">导出</el-button>
            </div>
            <div class="bread-contain-right" v-show="historyShow">
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div >
        </div>
        <section class="historyCon" v-show="historyShow">
            <div class="kl-table">
                <el-table
                    v-if="tableShow"
                    :max-height="maxHeight"         
                    stripe
                    border
                    :data="tableData.list"
                    class="water-meter-inquiry-table">

                    <el-table-column 
                        type="index"  label="NO."
                        width="50" 
                        fixed="left"
                        :index="indexMethod">
                    </el-table-column>


                    <el-table-column
                        prop="code"
                        
                        min-width="150"
                        label="水表编号">
                    </el-table-column>

                    <el-table-column
                        prop="fcode"
                        min-width="100"
                        label="操作类型">
                    </el-table-column>

                    <el-table-column
                        prop="wCaliber"
                        min-width="100"
                        label="操作日期">
                    </el-table-column>

                    <el-table-column
                        prop="wfactory"
                        min-width="100"
                        label="操作人">
                    </el-table-column>

                    <el-table-column
                        prop="wmorphology"
                        min-width="120"
                        label="建立时间">
                    </el-table-column>

                    <el-table-column
                        prop="wtype"
                        min-width="120"
                        label="建立人">
                    </el-table-column>

                    <!-- <el-table-column
                        prop="wmodoel"
                        min-width="150"
                        label="最后修改时间">
                    </el-table-column>

                    <el-table-column
                        prop="qualification"
                        min-width="120"
                        label="最后修改人">

                    </el-table-column> -->

                </el-table>
            </div>
        </section>
        <section class="wmeterInquiryCon" v-show="wmeterInquiryConShow">
            <div class="toolbar">
                <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                    <el-form-item class="form-left">
                        <el-form-item label='入库日期：'>
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
      
                            <el-form-item label="模糊查询："  class="searchInput">
                                
                                <el-tooltip class="item" effect="dark" content="水表编号、出厂编号、用户编号" placement="top">
                                    <el-input v-model="formData.inputContent"></el-input>
                                </el-tooltip>
                            <!-- <el-input v-model="formData.con" clearable placeholder="水表编号/出厂编号/用户编号"></el-input> -->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" style="background:white;color:#3193F6;font-size:.12rem">高级查询</el-button>
                            <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                        
                    </el-form-item>
                    
                    <el-form-item class="form-right">
                        <!-- <el-button  type="primary" size="mini" icon="el-icon-upload2" @click="exportExcel">导出</el-button> -->
                        <!-- <i class="el-icon-upload2 el-button el-button--mini" style="background:#47b5e8;color:#fff;" @click="exportExcel"> 导出</i> -->
                    
                    </el-form-item>
                     <!-- 高级查询内容 -->
                        <el-form-item v-show="isActive" class="advancedQuery">
                            <!-- <el-form-item label="水表仓库：">
                                <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="水表仓库">
                                    <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="水表厂家：">
                                <el-select  clearable v-model="formData.waterMeterManufacturer" placeholder="水表厂家">
                                <el-option  v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="水表类型：">
                                <el-select  clearable v-model="formData.waterMeterType" placeholder="水表类型">
                                    <el-option v-for="(item,index) in formData.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="水表型号：">
                                <el-select  clearable v-model="formData.waterMeterModel" placeholder="水表型号">
                                    <el-option  v-for="(item,index) in formData.waterMeterModelOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                                </el-select>
                            </el-form-item>
                            <el-form-item label="水表口径：">
                                <el-select  clearable v-model="formData.waterMeterCaliber" placeholder="水表口径">
                                    <el-option  v-for="(item,index) in formData.waterMeterCaliberOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                                </el-select>
                            </el-form-item>
                            <el-form-item label="水表状态：">
                                <el-select  clearable v-model="formData.waterMeterStatus" placeholder="水表状态">
                                    <el-option  v-for="(item,index) in formData.waterMeterStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属部门：">
                                <el-select  clearable v-model="formData.subordinateDepartments" placeholder="所属部门">
                                    <el-option  v-for="(item,index) in formData.subordinateDepartmentsOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                                </el-select>
                                
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
                    class="water-meter-inquiry-table">

                    <el-table-column 
                        type="index"  label="NO."
                        width="50" 
                        fixed="left"
                        :index="indexMethod">
                    </el-table-column>
                    
                    <el-table-column
                        prop="userNo"
                        
                        min-width="80"
                        label="用户编号">
                    </el-table-column>

                    <el-table-column
                        prop="userName"
                        min-width="80"
                        label="用户名称">
                    </el-table-column>

                    <el-table-column
                        prop="code"
                        
                        min-width="150"
                        label="水表编号">
                    </el-table-column>

                    <el-table-column
                        prop="fcode"
                        min-width="100"
                        label="出厂编号">
                    </el-table-column>

                    <el-table-column
                        prop="wCaliber"
                        min-width="100"
                        label="水表口径">
                    </el-table-column>

                    <el-table-column
                        prop="wfactory"
                        min-width="100"
                        label="水表厂家">
                    </el-table-column>

                    <el-table-column
                        prop="wmorphology"
                        min-width="120"
                        label="水表形态">
                    </el-table-column>

                    <el-table-column
                        prop="wtype"
                        min-width="120"
                        label="水表类型">
                    </el-table-column>

                    <el-table-column
                        prop="wmodoel"
                        min-width="120"
                        label="水表型号">
                    </el-table-column>

                    <el-table-column
                        prop="qualification"
                        min-width="100"
                        label="合格证号">

                    </el-table-column>
                                            
                    <el-table-column
                        prop="wState"
                        min-width="120"
                        label="水表状态"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column 
                        prop="storage" 
                        min-width="150" 
                        label="入库日期" 
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column 
                        prop="demp" 
                        min-width="100" 
                        label="所属部门" 
                        show-overflow-tooltip>
                    </el-table-column>

                    <!-- <el-table-column
                        prop="status"
                        min-width="80"
                        label="位置及编号"
                     >
                    </el-table-column> -->

                    <el-table-column label="操作" fixed="right" width="85">
                        <template slot-scope="scope">
                        <!-- size="mini" type="warning" plain -->
                        <el-button type="text" @click="viewHistory(scope.$index, scope.row)">查看历史</el-button>
                        <!-- <span style='color:#f0f0f0;' v-if="scope.row.getMeter === 1">|</span>
                        <el-button type="text" v-if="scope.row.status ==='未上传'" class="noclick" @click="record(scope.$index, scope.row)">补录</el-button>
                        <el-button type="text" v-else @click.native="edit(scope.$index, scope.row)">修正</el-button> -->
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
export default {
    name:"water-meter-inquiry",
    data(){
        return{
            tableShow:false,
            maxHeight:0,
            historyShow:false,
            wmeterInquiryConShow:true,
            tableData:{},
            crumbsData :{  //面包屑
                titleList:[
                    {title:'表务中心',path:'/WatchCenter'},
                    {title:'水表查询',method:()=>{window.histroy.back()}},
                

                ],
                
            },
            isActive:false,  //控制高级查询内容的显示
            formData:{
                con:"",
                watermeterWarehouse:"",
                waterMeterModel:'',
                waterMeterModelOptions:[
                    {
                        name:"LXSWN",
                        value:"0"
                    },
                    {
                        name:"LXSGY-15G",
                        value:"1"
                    },
                    {
                        name:"LXSGY",
                        value:"2"
                    },
                    {
                        name:"LXSFW",
                        value:"3"
                    },
                    {
                        name:"DG-FW001",
                        value:"4"
                    },
                    ],
                watermeterWarehouseOptions:[
                    // {
                    //     name:"全部",
                    //     value:"1"
                    // },
                    {
                        name:"停用",
                        value:"2"
                    },
                    {
                        name:"启用",
                        value:"3"
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
                        value:"2"
                    },
                    {
                        name:"梅花",
                        value:"3"
                    },
                    {
                        name:"常德",
                        value:"4"
                    },
                    {
                        name:"开封",
                        value:"5"
                    },
                ],
                waterMeterType:"",
                waterMeterTypeOptions:[
                    {
                        name:"人工表",
                        value:"1"
                    },
                    {
                        name:"远程表",
                        value:"2"
                    },
                ],
                waterMeterCaliber:"",
                waterMeterCaliberOptions:[
                    {
                        name:"15",
                        value:"2"
                    },
                    {
                        name:"20",
                        value:"1"
                    },
                    {
                        name:"25",
                        value:"3"
                    },
                    {
                        name:"40",
                        value:"4"
                    },
                    {
                        name:"200",
                        value:"5"
                    },
                ],
                waterMeterStatus:"",
                waterMeterStatusOptions:[
                    {
                        name:"在库",
                        value:"1"
                    },
                    {
                        name:"在用",
                        value:"2"
                    },
                    {
                        name:"在途",
                        value:"3"
                    },
                    {
                        name:"报废",
                        value:"4"
                    },

                ],
                subordinateDepartments:"",
                subordinateDepartmentsOptions:[
                    //  {
                    //     name:"全部",
                    //     value:"1"
                    // },
                    {
                        name:"营业部",
                        value:"2"
                    },
                    {
                        name:"法务部",
                        value:"3"
                    },
                ]

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
                
            }
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
      this.$changeTable(this,'.water-meter-inquiry',['.water-meter-inquiry .toolbar','.water-meter-inquiry .block','.water-meter-inquiry #crumbs'])
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
                        code:'0999212932131',
                        fcode:'00010',
                        wCaliber:'15',
                        wfactory:'宁波水厂',
                        wmorphology:'新表',
                        wtype:'远程表',
                        wmodoel:'LXSWN',
                        qualification:'1111111',
                        wState:'在用',
                        storage:'2017-12-12',
                        demp:'工程部',
                        userNo:"013456",
                        userName:"张三"
                    },
                    {
                        code:'0999212932151',
                        fcode:'00010',
                        wCaliber:'20',
                        wfactory:'新天科技',
                        wmorphology:'新表',
                        wtype:'人工表',
                        wmodoel:'LXSWN',
                        qualification:'1111111',
                        wState:'在库',
                        storage:'2017-10-12',
                        demp:'营业部',
                        userNo:"013456",
                        userName:"李四"
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
        hidden() {
        if (this.isActive == true) {
          $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
          this.isActive = false;
          $('.el-table--fit').css('height', '66%');
          
        } else {
          $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')
          
          this.isActive = true;
          $('.el-table--fit').css('height', '50%');
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
    //   查看历史
      viewHistory(index, row){
          this.historyShow = true;
          this.wmeterInquiryConShow = false;
        this.$set(this.crumbsData.titleList,"2",{title:'查看历史',method:()=>{window.histroy.back()}})

      },
      cellClick(row, column, cell, event) { //点击文件名
        let that = this;
        
      },
      indexMethod(index) {//获取表格序号
        //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
        return  (this.histroyData.pageSize-20)*this.histroyData.pages + (index+1) ;
    
      },
      closeDialog(){
          this.historyShow = false;
          this.wmeterInquiryConShow = true;
          this.crumbsData.titleList.splice(2,1);
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
@import "../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
    .water-meter-inquiry{
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
        .wmeterInquiryCon{
            width: 100%;
            height: calc(100% - 40px);
        }
        .historyCon{
            width: 100%;
            height: calc(100% - 50px);
            padding-top: 10px;
        }
    }
</style>
