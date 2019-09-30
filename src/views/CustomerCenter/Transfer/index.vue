<template>
  <!-- <div class="Transfer" v-if="TransferEditVisible">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button type="primary" size="mini" @click="TransferDetailsGH = true">欠费明细</el-button>
        <el-button type="primary" size="mini" @click="submit('ruleForm');">上传附件</el-button>
        <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
      </div>
    </div>
    <TransferEdit ref="childWaterEditor" :TransferDetailsGH='TransferDetailsGH'></TransferEdit>
    <span class="qianfei" v-if="TransferDetailsGH">
      <el-dialog class="qianfei" title="欠费明细" :close-on-click-modal="false" :visible.sync="TransferDetailsGH" append-to-body>
        <TransferDetailsGHS ref="TransferDetailsEditor" :detailsData="ArrearsDetails"></TransferDetailsGHS>
      </el-dialog>
    </span>
  </div> -->

  <div class="Transfer">
    <span v-if="TransferEditVisible">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button type="primary" size="mini" @click="TransferDetailsGH = true">欠费明细</el-button>
          <el-button type="primary" size="mini" @click="submit('ruleForm');">上传附件</el-button>
          <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
        </div>
      </div>
      <TransferEdit ref="childWaterEditor" :TransferDetailsGH='TransferDetailsGH'></TransferEdit>
      <span class="qianfei" v-if="TransferDetailsGH">
        <el-dialog class="qianfei" title="欠费明细" :close-on-click-modal="false" :visible.sync="TransferDetailsGH" append-to-body>
          <TransferDetailsGHS ref="TransferDetailsEditor" :detailsData="ArrearsDetails"></TransferDetailsGHS>
          <!-- <div slot="footer" class="dialog-footer" ref="ruleForm"> -->
          <!-- <el-button type="primary" size="mini" plain @click="submit('ruleForm');">保 存</el-button> -->
          <!-- <el-button type="info" size="mini" @click="TransferDetailsGH = false">返回</el-button> -->
          <!-- </div> -->
        </el-dialog>
      </span>
    </span>
  <!-- 添加 -->
    <span v-if="TransferAddVisible">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button type="primary" size="mini" @click="TransferDetailsGH = true">欠费明细</el-button>
          <el-button type="primary" size="mini" @click="submit('ruleForm');">上传附件</el-button>
          <el-button type="primary" size="mini" @click="submit('ruleForm');">保 存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog('ruleForm')">返回</el-button>
        </div>
      </div>
      <TransferAdd ref="childWaterEditor" :TransferDetailsGH='TransferDetailsGH'></TransferAdd>
      <span class="qianfei" v-if="TransferDetailsGH">
        <el-dialog class="qianfei" title="欠费明细" :close-on-click-modal="false" :visible.sync="TransferDetailsGH">
          <TransferDetailsGHS ref="TransferDetailsEditor" :detailsData="ArrearsDetails"></TransferDetailsGHS>
          <!-- <div slot="footer" class="dialog-footer" ref="ruleForm"> -->
          <!-- <el-button type="primary" size="mini" plain @click="submit('ruleForm');">保 存</el-button> -->
          <!-- <el-button type="info" size="mini" @click="TransferDetailsGH = false">返回</el-button> -->
          <!-- </div> -->
        </el-dialog>
      </span>
      <!-- 弹出表单选择用户 -->
    	<el-dialog :title="chooseuserName" :visible.sync="chooseuserVisible" :close-on-click-modal="false" class="addDialog" @close="closeChooseuser">
            <chooseuser
                ref="childWaterEditor" 
                
            ></chooseuser>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closeChooseuser">取 消</el-button>
		    </div>
    	</el-dialog>
    </span>

    <span v-if="!TransferEditVisible && !TransferAddVisible">
      <!-- 弹出表单明细 -->
      <el-dialog :title="TransferDetailsName" :close-on-click-modal="false" :visible.sync="TransferDetailsVisible" class="TransferDetails" @close="closeDialog">
        <TransferDetails ref="TransferDetailsEditor" :detailsData="ArrearsDetails"></TransferDetails>
      </el-dialog>
      
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
            <i></i>
            过户记录</h2> -->
        <div class="bread-contain-right">
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="addUser">添加</el-button>
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

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="审批状态">
          </el-table-column>

          <el-table-column prop="connect" min-width="100" label="受理日期">
          </el-table-column>

          <el-table-column prop="connect" min-width="100" label="受理单号">
          </el-table-column>

          <el-table-column prop="connect" min-width="100" label="用户编号">

          </el-table-column>

          <el-table-column prop="connect" min-width="100" label="用户名称">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="100" label="用户地址">
          </el-table-column>

          <el-table-column prop="flux" min-width="100" label="用水类型">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="100" label="联系人">
          </el-table-column>

          <el-table-column prop="flux" min-width="100" label="联系电话">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="100" label="受理人">
          </el-table-column>

          <el-table-column prop="flux" min-width="180" label="操作" fixed="right">
            <template slot-scope="scope">
              <!-- size="mini" type="warning" plain -->
              <el-button type="text" @click="edit(scope.$index, scope.row)">编辑</el-button>

              <span style='color:#f0f0f0;'>|</span>
              <!-- <el-button type="text" @click.native="details(scope.$index, scope.row)">审核</el-button> -->
              <el-button type="text">审核</el-button>
              <span style='color:#f0f0f0;'>|</span>
              <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
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
import TransferEdit from './TransferEdit'
import TransferAdd from './TransferAdd'
import TransferDetails from './TransferDetails'
import TransferDetailsGHS from './TransferDetails_GH'
import chooseuser from "./chooseuser"
export default {
  name: "Transfer",
  components: {
    TransferEdit,
    TransferAdd,
    TransferDetails,
    TransferDetailsGHS,
    chooseuser
  },
  data() {
    return {
      chooseuserName:"选择用户",
      chooseuserVisible:false,
      TransferDetailsGH: false,
      TransferAddVisible: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '客户中心', path: '/Transfer' },
          { title: '过户', method: () => { window.histroy.back() } }
        ],

      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "全部",
            value: "1"
          },
          {
            name: "已审",
            value: "2"
          },
          {
            name: "未审",
            value: "3"
          },
          {
            name: "删除",
            value: "4"
          },
        ],
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
      ArrearsDetails: {},
      TransferEditVisible: false,  //编辑的显示和隐藏
      WaterEditorName: '过户-新户信息编辑',
      TransferDetailsName: "欠费明细",
      TransferDetailsVisible: false,
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.$changeTable(this, '.water-meter-inquiry .kl-table', ['.water-meter-inquiry .toolbar', '.water-meter-inquiry .block', '.water-meter-inquiry #crumbs'])
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
            areaName: "未审批",
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
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "0.40",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "水资源费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "2.40",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "污水处理费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "4.82",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "水费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201906",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "0.60",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "水资源费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201906",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "3.40",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "污水处理费",
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
            sub: "",
            Total: ""
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
            sub: "5",
            Total: "11.62"
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
    //   查看历史
    viewHistory(index, row) {

    },
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.crumbsData.titleList.pop();
      this.TransferEditVisible = false;
      this.TransferAddVisible = false;
      this.TransferDetailsVisible = false;
      
      this.init()
    },
    closeChooseuser(){
      this.chooseuserVisible = false;
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.TransferEditVisible = false;
    },
    // 编辑
    edit() {
      this.TransferEditVisible = true;
      this.TransferAddVisible = false;
      this.crumbsData.titleList.push({ title: '编辑', method: () => { window.histroy.back() } });
    },
    // 添加
    addUser() {
      this.TransferAddVisible = true;
      this.TransferEditVisible = false;
      this.chooseuserVisible = true;
      this.crumbsData.titleList.push({ title: '添加', method: () => { window.histroy.back() } });
    },
    // 明细
    details() {
      this.TransferDetailsVisible = true;
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
  }
}
</script>
<style lang="scss">
.Transfer {
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
}
</style>
