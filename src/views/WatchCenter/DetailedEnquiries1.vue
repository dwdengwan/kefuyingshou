<template>
    <div class="DetailedEnquiries">
        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                <el-form-item class="form-left">
                    <el-form-item label='拆表日期：'>
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
                    <el-form-item label="模糊查询：" class="searchInput">
                        <el-input clearable v-model="formData.con" placeholder="用户编号/水表编号"></el-input>
                    </el-form-item>
                    <el-form-item label="拆表员：">
                        <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="拆表员">
                            <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item>

                        <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                    </el-form-item>
                    
                </el-form-item>
                
                <el-form-item class="form-right">
                    <!-- <el-button  type="primary" size="mini" icon="el-icon-upload2" @click="exportExcel">导出</el-button> -->
                    <!-- <i class="el-icon-upload2 el-button el-button--mini" style="background:#47b5e8;color:#fff;" @click="exportExcel"> 导出</i> -->
                
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
            
                class="DetailedEnquiries-table">

                <el-table-column 
                    type="index"  label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                </el-table-column>

                <el-table-column
                    prop="code"
                    
                    min-width="120"
                    label="拆表单号">
                </el-table-column>

                <el-table-column
                    prop="daytime"
                    min-width="100"
                    label="拆表日期">
                </el-table-column>

                <el-table-column
                    prop="areaName"
                    min-width="80"
                    label="册本">

                </el-table-column>

                <el-table-column
                    prop="lvalue"
                    min-width="80"
                    label="用户编号">
                </el-table-column>

                <el-table-column
                    prop="lvalue"
                    min-width="80"
                    label="用户名称">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="用户地址">
                </el-table-column>

                <el-table-column
                    prop="flux"
                    min-width="80"
                    label="拆表员">
                </el-table-column>

                <el-table-column
                    prop="status"
                    min-width="80"
                    label="上期抄码"
                    >
                </el-table-column>

                <el-table-column
                    prop="concentrator"
                    min-width="120"
                    label="旧表底码">
                </el-table-column>
                                        
                <el-table-column
                    prop="usn"
                    min-width="120"
                    label="新表起码"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column 
                    prop="lvalue" 
                    min-width="100" 
                    label="余量" 
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column 
                    prop="lvalue" 
                    min-width="100" 
                    label="旧水表口径" 
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="lvalue"
                    min-width="120"
                    label="新水表口径">

                </el-table-column>

                <el-table-column 
                    prop="lvalue" 
                    min-width="100" 
                    label="旧水表编号" 
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="lvalue"
                    min-width="120"
                    label="新水表编号">

                </el-table-column>

                <el-table-column
                    prop="lvalue"
                    min-width="150"
                    label="旧水表出厂编号">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="150"
                    label="新水表出厂编号">
                </el-table-column>

                <el-table-column
                    prop="lvalue"
                    min-width="150"
                    label="旧合格证号">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="150"
                    label="新合格证号">
                </el-table-column>

                <el-table-column 
                    prop="lvalue" 
                    min-width="150" 
                    label="旧表处理方式" 
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column 
                    prop="lvalue" 
                    min-width="100" 
                    label="备注" 
                    show-overflow-tooltip>
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
    name:"DetailedEnquiries",
    data(){
        return{
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                    {
                        name:"张其兵",
                        value:"1"
                    },
                    {
                        name:"徐文朝",
                        value:"2"
                    },
                    {
                        name:"陆叶青",
                        value:"3"
                    },
                ],

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
      
      this.$changeTable(this,'.DetailedEnquiries .kl-table',['.DetailedEnquiries .toolbar','.DetailedEnquiries .block'])
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
                        areaName: "90765",
                        code: "7551003",
                        concentrator: "703",
                        connect: null,
                        daytime: "20190702",
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
                        status: "567",
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
      indexMethod(index) {//获取表格序号
        //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
        return  (this.histroyData.pageSize-20)*this.histroyData.pages + (index+1) ;
        
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
