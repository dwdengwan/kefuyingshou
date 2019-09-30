<template>
  <div class="OpenAccount">
    <!-- 弹出表单选择客户 -->
    	<el-dialog :title="choosectmName" :visible.sync="choosectmVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
            <choosectm
                ref="childWaterEditor" 
                
            ></choosectm>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
		    </div>
    	</el-dialog>
      <!-- 弹出表单选择账户 -->
    	<el-dialog :title="chooseAccountName" :visible.sync="chooseAccountVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
            <chooseAccount
                ref="childWaterEditor" 
                
            ></chooseAccount>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
		    </div>
    	</el-dialog>
    <span v-if="OpenAccountEditVisible">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
        </div>
      </div>
      <OpenAccountEdit ref="childWarehousing" :tableEdit="tableEdit" @chooseCtm="choosectm" @chooseAccount="chooseAccount"></OpenAccountEdit>
    </span>

    <span v-if="!OpenAccountEditVisible">
      <!-- <el-dialog :title="WaterEditorName" :close-on-click-modal="false" :visible.sync="TransferEditVisible" class="addDialog" @close="closeDialog">
      <NewAccountOpening ref="childWaterEditor"></NewAccountOpening>
    </el-dialog> -->

      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="edit('add')">添加</el-button>
          <!-- <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button> -->
        </div>
      </div>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

          <el-form-item class="form-left">
            <el-form-item label='受理日期：'>
              <el-date-picker v-model="DateChoosevalue" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="审批状态：">
              <el-select clearable v-model="formData.watermeterWarehouse" placeholder="未审">
                <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="模糊查询：" class="searchInput">
              <el-tooltip class="item" effect="dark" content="受理单号、用户编号、用户名称、受理人" placement="top">
                <el-input v-model="formData.con" clearable size="mini"></el-input>
              </el-tooltip>
            </el-form-item>

            <el-form-item>

              <el-button style="background:#faa646;color:#fff;" @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <!-- <el-form-item class="form-right">
          <el-button icon="el-icon-plus" size="mini" type="primary">添加</el-button>
          <el-button @click="exportExcel" icon="el-icon-upload2" size="mini" type="primary">导出</el-button>
        </el-form-item> -->
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">
          <!--             
            <el-table-column 
                type="selection" 
                width="50" 
                fixed="left"
             >
            </el-table-column> -->

          <el-table-column type="index" label="NO." width="50" fixed="left">
          </el-table-column>

          <el-table-column prop="connect1" min-width="100" label="审批状态">
          </el-table-column>

          <el-table-column prop="connect2" min-width="100" label="受理日期">
          </el-table-column>

          <el-table-column prop="connect3" min-width="100" label="受理单号">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="册本号">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.code">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="Num" min-width="100" label="排序号">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.Num" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="connect" min-width="100" label="用户编号">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="用户名称">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.areaName" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="factoryName" min-width="200" label="用户地址">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.factoryName" placeholder="" show-overflow-tooltip>
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="联系人">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peo" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="fixValue" min-width="150" label="联系电话">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.fixValue" placeholder="" show-overflow-tooltip>
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="120" label="手机号码">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peo1" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="180" label="邮箱">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peo2" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="160" label="证件类型">
            <!-- <template slot-scope="scope">
                <el-select v-model="scope.row.peo3" clearable size="mini" style="width:100%">
                  <el-option label="居民身份证" value="0"></el-option>
                  <el-option label="护照" value="1"></el-option>
                  <el-option label="户口本" value="2"></el-option>
                  <el-option label="回乡证" value="3"></el-option>
                  <el-option label="台胞证" value="4"></el-option>
                </el-select>
              </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="240" label="证件号码">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peo4" placeholder="">
              <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="180" label="供水合同号">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peo5" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="140" label="行业分类">
            <!-- <template slot-scope="scope">
            <el-select v-model="scope.row.peo6" clearable size="mini" style="width:100%">
            </el-select>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="140" label="用水类型">
            <!-- <template slot-scope="scope">
            <el-select v-model="scope.row.peo7" clearable size="mini" style="width:100%">
            </el-select>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="140" label="缴费方式">
            <!-- <template slot-scope="scope">
            <el-select v-model="scope.row.peo8" clearable size="mini" style="width:100%">
            </el-select>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="140" label="发票类型">
            <!-- <template slot-scope="scope">
                <el-select v-model="scope.row.peo9" clearable size="mini" style="width:100%">
                  <el-option label="收据" value="0"></el-option>
                  <el-option label="普通发票" value="1"></el-option>
                  <el-option label="专用发票" value="2"></el-option>
                </el-select>
              </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="营业网点">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peo0" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="行政区域">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peoa" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="管理区域">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peos" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="装表地址">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peod" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="装表位置">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peof" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="水表编号">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peog" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="出厂编号">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peoh" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="fcode" min-width="80" label="水表口径">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.fcode" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="水表厂家">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peoj" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="水表型号">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peok" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="daytime" min-width="120" label="立户日期">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.daytime" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column prop="peo" min-width="100" label="备注">
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.peol" placeholder="">
            </el-input>
          </template> -->
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="130">
            <template slot-scope="scope">
              <el-button type="text" @click.native="edit(scope.$index, scope.row)">编辑</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text">审批</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
    </span>
  </div>
</template>
<script>
import NewAccountOpening from "./NewAccountOpening"
import OpenAccountEdit from './OpenAccountEdit'
import choosectm from "@/components/ctmInfor"
import chooseAccount from "@/components/accountInfo"
export default {
  name: "OpenAccount",
  components: {
    NewAccountOpening,
    OpenAccountEdit,
    choosectm,
    chooseAccount
  },
  data() {
    return {
      chooseAccountName:"选择账户",
      chooseAccountVisible:false,
      choosectmName:"选择客户",
      choosectmVisible:false,
      tableEdit:false,
      activeName: 'EngineeringAccountOpening',
      OpenAccountEditVisible: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户中心', path: '/OpenAccount' },
          { title: '开户', method: () => { window.histroy.back() } },
        ],

      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []

      },
      tableShow: false,
      maxHeight: 0,
      histroyData: {

      },
      TransferEditVisible: false,  //编辑的显示和隐藏
      WaterEditorName: '新开户',
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.$changeTable(this, '.OpenAccount .kl-table', ['.OpenAccount .toolbar', '.OpenAccount .block', '.OpenAccount .bread-contain'])
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
            areaName: "陈银新",
            code: "18010003",
            concentrator: "",
            connect: 1110,
            daytime: "20190702",
            endTime: null,
            factoryName: "西郊寨中第五村陈屋",
            fcode: 15,
            fix: false,
            fixValue: "18948800086",
            flux: "20190708",
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
            options: []
          },
          {
            areaId: null,
            areaName: "张银新",
            code: "18010005",
            concentrator: "",
            connect: 1111,
            daytime: "20190702",
            endTime: null,
            factoryName: "江南黄金花园12栋106房",
            fcode: 15,
            fix: false,
            fixValue: "18948800087",
            flux: "20190708",
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
            options: []
          },
          {
            areaId: null,
            areaName: "李银新",
            code: "18010004",
            concentrator: "",
            connect: 1112,
            daytime: "20190702",
            endTime: null,
            factoryName: "教师新村重教路侯屋",
            fcode: 15,
            fix: false,
            fixValue: "18948800046",
            flux: "20190708",
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
            options: []
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
    //   开户
    add() {
      this.init()
    },

    // 插入行
    InsertRows() {
      this.histroyData.list.push({})
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
    closeDialog() { //关闭会话
      this.TransferEditVisible = false;
      this.TransferDetailsVisible = false;
      this.OpenAccountEditVisible = false;
      this.crumbsData.titleList.pop();
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.TransferEditVisible = false;
    },
    // 编辑
    edit(val) {
      if(val==="add"){
        this.tableEdit = false;
        this.crumbsData.titleList.push({ title: '添加', method: () => { window.histroy.back() } })
      }else{
        this.tableEdit = true;
        this.crumbsData.titleList.push({ title: '编辑', method: () => { window.histroy.back() } })
      }
      this.OpenAccountEditVisible = true;
    },
    closechoosectm(){
      this.choosectmVisible = false;
      this.chooseAccountVisible = false;
    },
    choosectm(){
      this.choosectmVisible = true;
    },
    chooseAccount(){
      this.chooseAccountVisible = true;
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
<style lang="scss">
.OpenAccount {
  width: 100%;
  .el-table .el-input__inner:hover {
    border: 1px solid #b8bdca;
  }
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
    .el-input__inner {
      border: none;
      background: transparent;
    }
  }
}
</style>
