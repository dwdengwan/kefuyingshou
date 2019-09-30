<template>

  <div v-if="backfillVisible" class="userInformation">
    <!-- 弹出表单编辑 -->
    <el-dialog :title="userInfoName" :close-on-click-modal="false" :visible.sync="userInfoVisible" @close="closeDialog">
      <userInformationEdit ref="backfillEditor"></userInformationEdit>
      <div slot="footer" class="dialog-footer" ref="ruleForm">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="info" size="mini" @click="closeDialog('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 弹出表单客户变动情况 -->
    	<el-dialog :title="ctmChangeName" :close-on-click-modal="false" :visible.sync="CustomerChangesVisible" @close="closeDialog1" >
            <CustomerChangesEdit
                ref="ctmChangeEditor" 
            ></CustomerChangesEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm')">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog1('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog>
      <!-- 弹出表单费用信息 -->
    	<el-dialog :title="payInfoName" :close-on-click-modal="false" :visible.sync="payInfoVisible" class="backfill" @close="closeDialog1" >
            <WaterUseOverTheYears
                ref="payInfoEditor" 
            ></WaterUseOverTheYears>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit('ruleForm')">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog1('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单抄表信息 -->
    	<el-dialog :title="MeterReadingName" :close-on-click-modal="false" :visible.sync="MeterReadingVisible" class="backfill" @close="closeDialog1" >
            <MeterReadingInfo
                ref="MeterReading" 
            ></MeterReadingInfo>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog1">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单账户流水 -->
    	<el-dialog :title="PredepositDdetailsName" :close-on-click-modal="false" :visible.sync="PredepositDdetailsVisible" class="backfill" @close="closeDialog1" >
            <PredepositDdetailsInfo
                ref="PredepositDdetails" 
            ></PredepositDdetailsInfo>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog1">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单附件查看 -->
    	<el-dialog :title="AttachmentViewName" :close-on-click-modal="false" :visible.sync="AttachmentViewVisible" class="AttachmentView" @close="closeDialog1" >
            <AttachmentViewInfo
                ref="AttachmentView" 
            ></AttachmentViewInfo>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog1">取 消</el-button>
		    </div>
    	</el-dialog>
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" type="primary" @click="edit">编辑</el-button>
        <el-button size="mini" type="primary" @click="ctmChange">变动情况</el-button>
        <el-button size="mini" type="primary" @click="payInfo">费用信息</el-button>
        <el-button size="mini" type="primary" @click="meterInfo">抄表信息</el-button>
        <el-button size="mini" type="primary" @click="Predeposit">账户流水</el-button>
        <el-button size="mini" type="primary">打印合同</el-button>
        <el-button size="mini" type="primary" @click="AttachmentView">查看附件</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
    </div>
    <userInfoEdit ref="childWarehousing" ></userInfoEdit>
    
  </div>

  <div class="userInfo" v-else>
    <!-- 弹出表单综合查询 -->
    <el-dialog :title="WaterEditorName" :close-on-click-modal="false" :visible.sync="waterAddVisible" class="addDialog" @close="closeDialog">
      <ComprehensiveQuery ref="childWaterEditor"></ComprehensiveQuery>
      <div slot="footer" class="dialog-footer" ref="ruleForm">
        <el-button type="primary" size="mini" plain @click="submit('ruleForm');">查询</el-button>
        <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
    
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- <h2 class="tab-title">
            <i></i>
            用户资料</h2> -->
      <div class="bread-contain-right">
        <el-button @click="ComprehensiveQuery" icon="el-icon-search" size="mini" type="primary">综合查询</el-button>
        <el-button size="mini" type="primary" icon="el-icon-upload2" @click="DataDerivation">资料导出</el-button>
      </div>
    </div>

    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
        <el-form-item class="form-left">
          <el-form-item label="营业网点：">
            <el-select clearable v-model="formData.waterMeterType" placeholder="">
              <el-option v-for="(item,index) in formData.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="模糊查询：">
            <!-- <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="用户编号">
              <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select> -->
            <el-tooltip class="item" effect="dark" content="用户编号、用户名称、用户地址、册本号、手机号码" placement="top">
              <el-input v-model="formData.waterMeterStatus" clearable size="mini"></el-input>
            </el-tooltip>
          </el-form-item>
          <!-- <el-form-item label="状态：">
                            <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="正常">
                                <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item> -->
          <el-form-item>
            <el-button style="background:#faa646;color:#fff;" @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>

      </el-form>
    </div>
    <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" @cell-click="cellClick" class="wuserInfo-table">

        <el-table-column type="index" label="NO." width="50" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="code" min-width="100" label="客户编号">
        </el-table-column>

        <el-table-column prop="areaName" min-width="100" label="账户编号">
        </el-table-column>

        <el-table-column prop="areaName" min-width="100" label="册本号">
        </el-table-column>

        <el-table-column prop="code" min-width="100" label="用户编号">
        </el-table-column>

        <el-table-column prop="concentrator" min-width="120" label="用户名称">

        </el-table-column>

        <el-table-column prop="daytime" min-width="120" label="用户地址">
        </el-table-column>

        <el-table-column prop="factoryName" min-width="80" label="营业区域">
        </el-table-column>

        <el-table-column prop="factoryName" min-width="80" label="行政区域">
        </el-table-column>

        <el-table-column prop="factoryName" min-width="80" label="管理区域">
        </el-table-column>

        <!-- <el-table-column prop="fcode" min-width="120" label="街区名称">
        </el-table-column> -->

        <el-table-column prop="fcode" min-width="150" label="联系人" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="fix" min-width="100" label="联系电话" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="fix" min-width="100" label="手机号码" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="fcode" min-width="100" label="停水联系人">
        </el-table-column>

        <el-table-column prop="fcode" min-width="180" label="停水联系电话">
        </el-table-column>

        <el-table-column prop="flux" min-width="80" label="传真号码">
        </el-table-column>

        <el-table-column prop="isxz" min-width="80" label="邮箱地址">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="80" label="证件类型">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="120" label="证件号码">
        </el-table-column>

        <el-table-column prop="fcode" min-width="120" label="立户日期" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="meter" min-width="150" label="供水合同号" show-overflow-tooltip>
        </el-table-column>

        <!-- <el-table-column prop="model" min-width="100" label="签订日期" show-overflow-tooltip>
        </el-table-column> -->

        <el-table-column prop="modifyBy" min-width="180" label="抄表周期">
        </el-table-column>

        <el-table-column prop="offset" min-width="80" label="缴费方式">
        </el-table-column>

        <el-table-column prop="offset" min-width="80" label="发票类型">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="120" label="行业分类" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="fixValue" min-width="150" label="用水类型" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="fixValue" min-width="100" label="阶梯人口" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="protocolName" min-width="100" label="容量水价">
        </el-table-column>

        <el-table-column prop="sensorModel" min-width="100" label="增值税标记">
        </el-table-column>

        <el-table-column prop="sn" min-width="120" label="加压标记">
        </el-table-column> -->

        <el-table-column prop="offset" min-width="80" label="装表地址">
        </el-table-column>

        <el-table-column prop="page" min-width="80" label="装表位置">
        </el-table-column>

        <el-table-column prop="modifyTime" min-width="100" label="水表编号">
        </el-table-column>

        <el-table-column prop="modifyTime" min-width="100" label="水表口径">
        </el-table-column>

        <el-table-column prop="modifyTime" min-width="100" label="水表厂家">
        </el-table-column>

        <el-table-column prop="modifyTime" min-width="100" label="水表型号">
        </el-table-column>

        <el-table-column prop="rowNumber" min-width="80" label="水表类型">
        </el-table-column>

        <el-table-column prop="sensorModel" min-width="80" label="用水对象">
        </el-table-column>

        <el-table-column prop="sensorModel" min-width="80" label="水表用途">
        </el-table-column>

        <el-table-column prop="sensorModel" min-width="80" label="计量方式">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="投递标记">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="投递人">
        </el-table-column>

        <el-table-column prop="fcode" min-width="100" label="投递人地址">
        </el-table-column>

        <el-table-column prop="position" min-width="100" label="投递邮政编码">
        </el-table-column>

        <el-table-column prop="sensorModel" min-width="120" label="装表日期" show-overflow-tooltip>
        </el-table-column>

        <!-- <el-table-column prop="status" min-width="150" label="换表日期" show-overflow-tooltip>
        </el-table-column> -->

        <el-table-column prop="totalPage" min-width="100" label="拆表日期" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="type" min-width="180" label="停用日期">
        </el-table-column>

        <el-table-column prop="unusual" min-width="100" label="注销日期">
        </el-table-column>

        <el-table-column prop="unusual" min-width="80" label="用户状态">

        </el-table-column>

        <el-table-column prop="unusual" min-width="80" label="最后抄码">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="150" label="备注" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="85">
          <template slot-scope="scope">

            <el-button type="text" @click.native="details(scope.$index, scope.row)">详情</el-button>
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
         :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ComprehensiveQuery from "./ComprehensiveQuery"
import userInfoEdit from "./userInfoEdit"
import userInformationEdit from "@/components/userInfo/ctmInfo.vue"
import CustomerChangesEdit from "@/components/IntegratedBusiness/UserInformation/CustomerChanges"
import WaterUseOverTheYears from "@/components/IntegratedBusiness/UserInformation/WaterUseOverTheYears"
import MeterReadingInfo from "@/components/IntegratedBusiness/UserInformation/MeterReadingInfo"
import PredepositDdetailsInfo from "@/components/IntegratedBusiness/UserInformation/PredepositDdetailsInfo"
import AttachmentViewInfo from "@/components/IntegratedBusiness/UserInformation/AttachmentViewInfo"
export default {
  name: "userInfo",
  components: {
    ComprehensiveQuery,
    userInfoEdit,
    userInformationEdit,
    CustomerChangesEdit,
    WaterUseOverTheYears,
    MeterReadingInfo,
    PredepositDdetailsInfo,
    AttachmentViewInfo,
  },
  data() {
    return {
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户中心', path: '/CustomerCenter' },
          { title: '用户资料', method: () => { window.histroy.back() } }
        ],

      },
      crumbsData1: {  //面包屑
        titleList: [
          { title: '客户中心', path: '/CustomerCenter' },
          { title: '用户资料', method: () => { window.histroy.back() } },
          { title: '编辑', method: () => { window.histroy.back() } },
        ],

      },
      isActive: false,  //控制高级查询内容的显示
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "全部",
            value: ""
          },
          {
            name: "正常",
            value: "1"
          },
          {
            name: "停用",
            value: "2"
          },
          {
            name: "销户",
            value: "0"
          },
        ],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "用户编号",
            value: "1"
          },
          {
            name: "用户名称",
            value: "2"
          },
          {
            name: "用户地址",
            value: "3"
          },
          {
            name: "册本号",
            value: "4"
          },
        ],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: [],

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
      waterAddVisible: false,  //综合查询的显示和隐藏
      WaterEditorName: '综合查询',
      ruleFormData: {},
      backfillVisible: false,
      userInfoName:"用户资料-编辑",
      userInfoVisible: false,
      CustomerChangesVisible:false,  
      ctmChangeName:'变动情况',
      ruleFormData:{},
      payInfoName:"费用信息",
      payInfoVisible:false,
      MeterReadingName:"抄表信息",
      MeterReadingVisible:false,
      PredepositDdetailsName:"账户流水",
      PredepositDdetailsVisible:false,
      AttachmentViewName:"查看附件",
      AttachmentViewVisible:false,
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.$changeTable(this, '.userInfo .kl-table', ['.userInfo .toolbar', '.userInfo .block', '.userInfo bread-contain'])
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
            areaName: "000-000012",
            code: "01026838",
            concentrator: "卢泽林",
            connect: null,
            daytime: "刘岗村",
            endTime: null,
            factoryName: "农村",
            fixValue: null,
            fix: "13852240909",
            fixValue: "否",
            flux: "20190408",
            getMeter: 1,
            id: null,
            isxz: "20190708",
            lvalue: "启用",
            meter: "非居民生活用水",
            model: "工业用水",
            modifyBy: "工业用水3.54",
            modifyTime: "个人",
            offset: "单户",
            page: "居民",
            pageCount: 20,
            position: "正常表",
            protocolName: "户表改造",
            rowNumber: 0,
            sensorModel: null,
            sn: "现金",
            status: "-0.31",
            totalPage: 0,
            type: "A",
            unusual: 20,
            usn: "偶月抄",
            waterGroup: 14,
          },
          {
            areaId: null,
            areaName: "000-000013",
            code: "01025838",
            concentrator: "刘晓娜",
            connect: null,
            daytime: "刘岗村",
            endTime: null,
            factoryName: "农村",
            fixValue: null,
            fix: "13852240909",
            fixValue: "否",
            flux: "20190408",
            getMeter: 1,
            id: null,
            isxz: "20190708",
            lvalue: "启用",
            meter: "非居民生活用水",
            model: "工业用水",
            modifyBy: "工业用水3.54",
            modifyTime: "个人",
            offset: "单户",
            page: "居民",
            pageCount: 20,
            position: "正常表",
            protocolName: "户表改造",
            rowNumber: 0,
            sensorModel: null,
            sn: "现金",
            status: "-0.31",
            totalPage: 0,
            type: "A",
            unusual: 20,
            usn: "偶月抄",
            waterGroup: 14,
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
    viewHistory(index, row) {

    },
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.userInfoVisible = false;
      
      this.crumbsData.titleList.pop();
      this.init()
    },
    closeDialog1(){
      this.CustomerChangesVisible = false;
      this.payInfoVisible = false;
      this.MeterReadingVisible = false;
      this.PredepositDdetailsVisible = false;
      this.AttachmentViewVisible = false;
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.waterAddVisible = false;
    },
    // 添加
    add() {

    },
    // 批量编辑
    BatchEditing() {

    },
    // 资料导出
    DataDerivation() {

    },
    // 导出本页
    exportPage() {

    },
    // 综合查询
    ComprehensiveQuery() {
      this.waterAddVisible = true;
    },
    // 详情
    details() {
      this.backfillVisible = true;
      // crumbsData: {
      //   titleList: [
      //     { title: '客户中心', path: '/CustomerCenter' },
      //     { title: '用户资料', method: () => { window.histroy.back() } }
      //   ],

      // },
      this.crumbsData.titleList.push({ title: '详情', method: () => { window.histroy.back() } })
    },
    edit(){
      // this.userInfoVisible = true;
      this.$router.push({
        path:"/CustomerCenter/DataChange",
        query:{
          source:"userInfo"
        }
      })
    },
    ctmChange(){
      this.CustomerChangesVisible = true;
    },
    payInfo(){
      this.payInfoVisible = true;
    },
    meterInfo(){
      this.MeterReadingVisible = true;
    },
    Predeposit(){
      this.PredepositDdetailsVisible = true;
    },
    AttachmentView(){
      this.AttachmentViewVisible = true;
    },
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
.userInfo {
  width: 100%;
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
  .el-form-item__content .el-input {
    width: auto;
  }
  
}
#app .userInformation{
  .bread-contain #crumbs{
    width: 35%;
  }
  .bread-contain .bread-contain-right{
    width: 60%;
  }
  .el-form-item.selectCheck{
    margin-right: 0px;
    margin-bottom: 5px;
  }
}
</style>
