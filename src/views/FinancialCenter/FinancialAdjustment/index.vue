
<template>

  <div class="FinancialAdjustment">
    <!-- 弹出表单编辑 -->
    <!-- <el-dialog :title="FinancialAdjustmentName" :close-on-click-modal="false" :visible.sync="FinancialAdjustmentVisible" class="addDialog" @close="closeDialog" >
            <FinancialAdjustmentEdit
                ref="childFinancialAdjustment" 
            ></FinancialAdjustmentEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm');">开 账</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">返 回</el-button>
		    </div>
    	</el-dialog> -->
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="FinancialAdjustmentVisible">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button icon="el-icon-plus" size="mini" @click="add" type="primary">添加</el-button>
      </div>
    </div>
    <div v-if="FinancialAdjustmentVisible">

      <FinancialAdjustmentEdit ref="childFinancialAdjustment"></FinancialAdjustmentEdit>
    </div>
    <div v-else>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">
            <!-- <el-form-item label="是否罚款：">
              <el-select clearable v-model="formData.watermeterWarehouse" placeholder="是">
                <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item> -->
            <el-form-item label="审批状态：">
              <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="未审">
                <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="账期：">
              <el-date-picker v-model="beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="模糊查询：" class="searchInput">
              <el-input v-model="formData.con" placeholder="用户编号/用户名称"></el-input>
            </el-form-item>

            <el-form-item>

              <el-button style="background:#faa646;color:#fff;" @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <el-form-item class="form-right">

          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="审批状态">
          </el-table-column>

          <el-table-column prop="concentrator" min-width="100" label="用户编号">

          </el-table-column>


          <el-table-column prop="factoryName" min-width="150" label="用户名称">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="150" label="用户地址">
          </el-table-column>

          <el-table-column prop="daytime" min-width="80" label="账期">
          </el-table-column>

          <el-table-column prop="flux" min-width="80" label="计费水量">
          </el-table-column>

          <el-table-column prop="model" min-width="80" label="追缴合计">
          </el-table-column>

          <el-table-column prop="position" min-width="130" label="收费日期">
          </el-table-column>

          <el-table-column prop="woker" min-width="150" label="收费员">
          </el-table-column>

          <el-table-column prop="flux" min-width="80" label="描述">
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="add(scope.$index, scope.row)">编辑</el-button>
              <span style='color:#f0f0f0;'>|</span>
              <el-button type="text" class="noclick">详情</el-button>
              <span style='color:#f0f0f0;'>|</span>
              <el-button size="mini" type="text">审批</el-button>
              <span style='color:#f0f0f0;'>|</span>
              <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>

            </template>
          </el-table-column>

        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import FinancialAdjustmentEdit from './FinancialAdjustmentEdit'
export default {
  name: "FinancialAdjustment",
  components: {
    FinancialAdjustmentEdit
  },
  data() {
    return {
        beginYearM: '',
      crumbsData: {  //面包屑
        titleList: [
          { title: '账务中心', path: '/FinancialAdjustment' },
          { title: '账务调整', method: () => { window.histroy.back() } },
          { title: '追加费用', method: () => { window.histroy.back() } }

        ],

      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          // {
          //     name:"全部",
          //     value:"1"
          // },
          {
            name: "是",
            value: "2"
          },
          {
            name: "否",
            value: "3"
          },
        ],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          // {
          //     name:"全部",
          //     value:"1"
          // },
          {
            name: "未审",
            value: "2"
          },
          {
            name: "已审",
            value: "3"
          },
        ],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []

      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      tableShow: false,
      maxHeight: 0,
      histroyData: {

      },
      FinancialAdjustmentVisible: false,  //综合查询的显示和隐藏
      FinancialAdjustmentName: '追加费用-增加',
      ruleFormData: {},

    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.$changeTable(this, '.FinancialAdjustment', ['.FinancialAdjustment .toolbar', '.FinancialAdjustment .block', '.FinancialAdjustment #crumbs'])
  },
  methods: {
    init() {

      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            areaId: null,
            areaName: "未审批",
            code: "NN903",
            concentrator: "NN191-126-00",
            connect: null,
            daytime: "201807",
            endTime: null,
            factoryName: "梅州市园林管理处",
            fcode: null,
            fix: false,
            fixValue: "东山桥侧珍珠花园",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "189.42",
            lvalue: "107.80",
            meter: "10.05",
            model: "457.72",
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "2018-07-09 12:48",
            woker: '张三',
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
    exportExcel() {
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
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.FinancialAdjustmentVisible = false;
      this.backfillVisible = false;
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childFinancialAdjustment.submit()
      // this.FinancialAdjustmentVisible = false;
    },
    add() {
      this.FinancialAdjustmentVisible = true;
    },
    edit() {

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
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
    FinancialAdjustmentVisible(newval) {
      if (newval) {
        this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })

      } else {
        this.crumbsData.titleList.splice(3, 1)
      }
    }
  }
}
</script>
<style lang="scss">
.FinancialAdjustment {
  width: 100%;
  height: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .kl-table {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
}
</style>
