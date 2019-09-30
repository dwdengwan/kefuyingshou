<template>
  <div class="Regular-Opening">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- <h2 class="tab-title">
        <i></i>
        常规开账</h2> -->
      <div class="bread-contain-right">
        <el-button size="mini" type="primary">开账</el-button>
        <el-button size="mini" type="primary">销账</el-button>
        <el-button size="mini" type="primary">作废</el-button>
      </div>
    </div>
    <div v-if="enterMeterDataShow">
      <MeterReadingDataEntry
      @calback="closeDialog"
      ></MeterReadingDataEntry>
    </div>
    <div v-else class="Regular-Opening-right-content">
      <div class="kr-left">
        <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
      </div>
      <div class="kr-right">
        <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline" style="padding: 10px 10px;">
          <el-form-item class="form-left">

            
            <el-form-item label="账期：">
              <el-date-picker v-model="formData.beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开账状态：">
                <el-select clearable v-model="formData.proportionMax1" placeholder="全部">
                  <el-option v-for="(item,index) in proportionList1" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="抄表周期：">
          <el-select v-model="formData.options7go" clearable size="mini" style="width:100%">
            <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
            <el-form-item label="模糊查询：" class="longinput">
              <el-tooltip class="item" effect="dark" content="用户编号、用户名称、册本号" placement="top">
                <el-input v-model="formData.inputContent" clearable size="mini"></el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" style="background:white;color:#3193F6;font-size:.12rem">高级查询</el-button>
              <el-button style="background:#faa646;color:#fff;" @click="search" icon="el-icon-search"></el-button>
            
            </el-form-item> 
            <el-form-item v-show="isActive" class="advancedQuery">
              <el-form-item label="显示内容：">
                <el-select clearable v-model="formData.showContents" placeholder="显示内容">
                  <el-option v-for="(item,index) in showContentsList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="比较时间：">
                <el-select clearable v-model="formData.comparingTime" placeholder="比较时间">
                  <el-option label="六期" value="1"></el-option>
                  <el-option label="上月" value="2"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="水量偏差：">
                <el-select clearable v-model="formData.proportionMax" placeholder="比例">
                  <el-option v-for="(item,index) in proportionList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="比例小于(%)：">
                <el-select clearable v-model="formData.proportionMin" placeholder="比例">
                  <el-option v-for="(item,index) in proportionList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item> -->
            </el-form-item>
          </el-form-item>
          <!-- <el-form-item class="form-right">
              <el-button size="mini" type="primary" style="margin-left: 0;">开账</el-button>
              <el-button size="mini" type="primary">销账</el-button>
              <el-button size="mini" type="primary">作废重抄</el-button>
          </el-form-item> -->
          
        </el-form>
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData" @cell-click="cellClick" class="wuserInfo-table">
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column type="index" label="NO." fixed width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="daytime" min-width="100" label="用户编号"></el-table-column>
          <el-table-column prop="areaName1" min-width="100" label="用户名称"></el-table-column>
          <el-table-column prop="lvalue" min-width="100" label="上期抄码"></el-table-column>
          <el-table-column prop="fixValue" min-width="100" label="本期抄码"></el-table-column>
          <el-table-column prop="position" min-width="100" label="本期用水"></el-table-column>
          <el-table-column prop="status" min-width="100" label="增减水量"></el-table-column>
          <el-table-column prop="position8" min-width="100" label="分摊水量"></el-table-column>
          <el-table-column prop="status" min-width="100" label="实际用水量"></el-table-column>
          <el-table-column prop="position" min-width="100" label="上期水量"></el-table-column>
          <el-table-column prop="position7" min-width="100" label="六期平均"></el-table-column>
          <el-table-column prop="usn1" min-width="100" label="用水分类"></el-table-column>
          <el-table-column prop="usn" min-width="100" label="费用合计"></el-table-column>
          <el-table-column prop="engineeringType" min-width="100" label="开账状态"></el-table-column>
          <!-- <el-table-column label="操作" fixed="right" width="85">
            <template slot-scope="scope">
              <el-button type="text" @click.native="enterMeterDataShow = true" style="font-size:12px;">编辑</el-button> 
              <el-button type="text" style="font-size:12px;">编辑</el-button>
            </template>
          </el-table-column> -->

        </el-table>
        <span class="btnBox">
          
          <!-- <el-button size="mini" type="primary">质疑</el-button> -->
          <!-- <el-button size="mini" type="primary">作废重抄</el-button> -->
        </span>
      </div>
    </div>
    <!-- <el-dialog :close-on-click-modal="false" title="录入抄表数据" :visible.sync="enterMeterDataShow">
      <el-form :model="dialogForm" ref="form" label-width="100px">
        <div class="my-input">
          <el-form-item label="排序号：" prop="userNum">
            <div class="dialogcontent"><span>1</span></div>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="抄表状态：" prop="userName">
            <el-select v-model="dialogForm.documentType" clearable size="mini" style="width:40%">
              <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-checkbox style="margin-left:25%" v-model="checked">开账标志</el-checkbox>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="用户编号：" prop="userAddress">
            <div class="dialogcontent"><span>01052664</span></div>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="起码：" prop="meterAddress">
            <el-input v-model="dialogForm.meterAddress" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="用户名称：" prop="block">
            <div class="dialogcontent"><span>公测</span></div>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="止码：" prop="village">
            <el-input v-model="dialogForm.village" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="用户地址：" prop="bookNum">
            <div class="dialogcontent"><span>水务大楼</span></div>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="用量：" prop="Contacts">
            <el-input v-model="dialogForm.Contacts" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="价格类别：" prop="contactNumber">
            <div class="dialogcontent"><span>生活用水2.85</span></div>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="备注：" prop="phoneNumber">
            <el-input v-model="dialogForm.phoneNumber" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="上期抄表：" prop="documentType">
            <div class="dialogcontent"><span>2017-06-06</span></div>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="换表：" prop="userName">
            <el-select v-model="dialogForm.documentType" clearable size="mini" style="width:40%">
              <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="dialogcontent1"><span>旧表止码：</span><span class="inputcontent">1</span></div>
          </el-form-item>
        </div>

        <div class="my-input">
          <el-form-item label="收费方式：" prop="meterDate">
            <div class="dialogcontent"><span>现金</span></div>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="余量：" prop="userName">
            <div class="dialogcontent3"><span class="inputcontent">1</span></div>
            <div class="dialogcontent2"><span>新表起码：</span><span class="inputcontent">1</span></div>
          </el-form-item>
        </div>

      </el-form>
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline" style="padding: 10px 20px;">
        <el-form-item label="册本号：">
          <el-select v-model="information" size="mini">
            <el-option label="所有" value="0"></el-option>
            <el-option v-for="item in inforList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄表日期：">
          <el-date-picker v-model="enterMeterDate" type="date" placeholder="选择日期">
          </el-date-picker>
          
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">覆盖</el-button>
        </el-form-item>

        <el-form-item label="年月：">
          <el-date-picker v-model="beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="用水性质：">
          <el-select class="searchType" v-model="searchType" placeholder="请选择搜索类型">
            <el-option label="工程编号" value=type></el-option>
            <el-option label="key" value=key></el-option>
            <el-option label="value" value=value></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户编号：">
          <el-input placeholder="请输入搜索内容" v-model="inputContent" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">定位</el-button>
        </el-form-item>

        <el-form-item label="用户编号：">
          <el-input v-model="beginHousehold" style="width: 38%"></el-input>
          至
          <el-input v-model="endHousehold" style="width: 38%"></el-input>
          <el-button style="background:#faa646;color:#fff;" @click="search" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
      <div class="kl-table">
        <el-table stripe border :data="tableData" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="engineeringType" min-width="180" label="开账状态">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="用户编号">
          </el-table-column>

          <el-table-column prop="areaName" min-width="80" label="用户名称">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="80" label="上期抄码">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="本期抄码">
          </el-table-column>

          <el-table-column prop="flux" min-width="80" label="本期水量">
          </el-table-column>

          <el-table-column prop="status" min-width="80" label="增减水量">
          </el-table-column>

          <el-table-column prop="status" min-width="80" label="实际用水">
          </el-table-column>

          <el-table-column prop="usn" min-width="120" label="水量合计" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position" min-width="100" label="上期水量" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position1" min-width="100" label="上期抄表日" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position2" min-width="100" label="本期抄表日" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position3" min-width="100" label="抄表状态" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position4" min-width="100" label="新表底码" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position5" min-width="100" label="旧表底码" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position6" min-width="100" label="表身号" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position7" min-width="100" label="与上期差量" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position8" min-width="100" label="与上期差率" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position9" min-width="100" label="备注" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="position10" min-width="100" label="地址" show-overflow-tooltip>
          </el-table-column>

        </el-table>

        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align:center;" class="dialog-footer">
        <el-button type="primary" @click="approvalShow = false" size="mini">导出</el-button>
        <el-button type="primary" @click="approvalShow = false" style="color:black;background:white;border:gray solid 1px;" size="mini">返回</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import MeterReadingDataEntry from "./MeterReadingDataEntry"
export default {
  name: "Regular-Opening-index",
  components:{
    MeterReadingDataEntry,
  },
  data() {
    return {
      tableData:[
        {
          engineeringType:'未开账',
          daytime:'ED0001',
          areaName:'清溪水司',
          areaName1:'焦文',
          lvalue:'819',
          fixValue:'1020',
          flux:'201',
          status:'100',
          usn:'615',
          usn1:'事业单位用水',
          position:'619',
          position1:'2019/06/28',
          position2:'2019/7/29',
          position3:'未开账',
          position4:'1002',
          position5:'1064',
          position6:'FD0001',
          position7:'120',
          position8:'10%',
          position9:'客服营收系统已启用',
          position10:'东深小区',
        },
      ],
      crumbsData: {  //面包屑
        titleList: [
          { title: '抄表中心', path: '/MeterReadingCenter' },
          { title: '开账', path: '/BatchOpening' },
          { title: '常规开账', method: () => { window.histroy.back() } }
        ],
      },
      treeDatas: {
        tree: [{ foreignkey: '全部', id: '222', _child: [{ foreignkey: '城区', id: '222', _child: [{ foreignkey: '0035E', id: '222' }, { foreignkey: '0036E', id: '222' }, { foreignkey: '0037E', id: '222' }, { foreignkey: '0038E', id: '222' }] }] }],        
        defaultProps: {
          label: 'foreignkey',
          children: '_child'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['parentMask', 'mask', 'childMask', 'seq', 'id', 'type', 'foreignkey'],
        rootName: '总部',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
      dialogFormVisible: false,//弹出表单
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formData: {
        showContents: 1,
        comparingTime: '1',
        proportionMax: 1,
        proportionMin: 1,
        options7go: '',
      
      },
      options7: [
        {
          value: 0,
          label: '每月抄'
        },
        {
          value: 1,
          label: '奇月抄'
        },
        {
          value: 2,
          label: '偶月抄'
        },
        {
          value: 3,
          label: '季度抄'
        },

      ],
      showContentsList: [
        { value: 1, name: '全部' },
        // { value: 2, name: '未开账' },
        // { value: 3, name: '已开账' },
        { value: 4, name: '水量为零' },
        { value: 5, name: '水量偏小' },
        { value: 6, name: '水量偏大' },
        { value: 7, name: '水量为负' },
        { value: 8, name: '抄表异常' },
      ],
      proportionList1: [
        { value: 1, name: '全部' },
        { value: 2, name: '已开账' },
        { value: 3, name: '未开账' },
      ],
      proportionList: [
        { value: 1, name: '0' },
        { value: 2, name: '5' },
        { value: 3, name: '10' },
        { value: 4, name: '15' },
        { value: 5, name: '20' },
        { value: 6, name: '25' },
        { value: 7, name: '30' },
        { value: 8, name: '35' },
        { value: 9, name: '40' },
        { value: 10, name: '45' },
        { value: 11, name: '50' },
        { value: 12, name: '55' },
        { value: 13, name: '60' },
        { value: 14, name: '65' },
        { value: 15, name: '70' },
        { value: 16, name: '75' },
        { value: 17, name: '80' },
        { value: 18, name: '85' },
        { value: 19, name: '90' },
        { value: 20, name: '95' },
        { value: 21, name: '100' },
      ],
      formLabelWidth: '120px',
      rules: {
        Applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        applicantDate: [
          { required: true, message: '请输入申请日期', trigger: 'blur' }
        ],
        engineerType: [
          { required: true, message: '请选择工程类型', trigger: 'change' }
        ],
        Contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        documentType: [
          { required: true, message: '请输入证件类型', trigger: 'blur' }
        ],
        documentNumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        Emergency: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
      },
      ruleForm: {
        Applicant: '',
        engineerType: ''
      },
      dialogForm: {},
      options6: [
        {
          value: 12,
          label: '用水报装'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      tabsData: [
        {
          name1: '11',
          name2: '22',
          name3: false,
          name4: '44',
          name5: '55',
          name6: '66',
          name7: '77',
          name8: '88',
          name9: '99',
          name10: '1010',
        },
        {
          name1: '111',
          name2: '222',
          name3: true,
          name4: '444',
          name5: '555',
          name6: '666',
          name7: '777',
          name8: '888',
          name9: '999',
          name10: '101010',
        },
        {
          name1: '1111',
          name2: '2222',
          name3: true,
          name4: '4444',
          name5: '5555',
          name6: '6666',
          name7: '7777',
          name8: '8888',
          name9: '9999',
          name10: '10101010',
        },
      ],
      treedata: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      beginYearM: '',
      enterMeterDataShow: false,
      enterMeterDate: '',
      isActive: false,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.Regular-Opening .Regular-Opening-right', ['.Regular-Opening .table-top'])
    })
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
      }
    },
    add() {//添加
      this.dialogFormVisible = true;
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
    backTreeData() { },
    edit(){//编辑
      this.crumbsData = {  //面包屑
        titleList: [
          { title: '抄表中心', path: '/MeterReadingCenter' },
          { title: '常规开账', path: '/RegularOpening' },
          { title: '编辑', method: () => { window.histroy.back() } }
        ]
      }
      this.dialogFormVisible  = true;
    },
    // 返回
    closeDialog(val){
      this.enterMeterDataShow  = val;
      this.crumbsData = {  //面包屑
        titleList: [
          { title: '抄表中心', path: '/MeterReadingCenter' },
          { title: '常规开账', path: '/RegularOpening' },
        ]
      }
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
$imgWidth: 200px;
$theme-color: #297acc;
.Regular-Opening {
  .Regular-Opening-right-content {
    height: 87%;
    overflow-y: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    .kr-left {
      width: 18%;
      height: 100%;
      // border: 2px solid red;
    }
    .kr-right {
      width: 81%;
      height: 100%;
      padding-left: 10px;
      form{
        zoom: 1;
        &::after{
          display: block;
          content: "";
          clear: both;
        }
      }
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 10px;
      }
      .form-left{
        float: left;
        margin-right: 0px;
        margin-bottom: 0px !important;
      }
      .form-right{
        float:right;
        margin-right: 0px;
        margin-bottom: 0px !important;
      }
      .advancedQuery{
        margin-bottom: 0px !important;
      }
      table {
        overflow: scroll;
        width: 100%;
        thead th {
          width: 10%;
          font-size: 14px;
          // font-weight: 700;
        }
        tbody tr {
          // display:block;
          margin-top: 1rem;
          td {
            text-align: center;
            .el-input,
            .el-select {
              width: 95%;
            }
          }
        }
      }
    }
  }
  .btnBox {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 2%;
  }
  .btnBox .el-button {
    margin-left: 2%;
    font-size: 14px;
  }
  .my-input {
    width: 30%;
    display: inline-block;
    // padding-left: 10%;
    .el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .my-input .el-input {
    width: 100% !important;
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .dialogcontent {
    width: 100%;
    display: inline-block;
  }
  .dialogcontent span {
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid;
  }
  .dialogcontent1 {
    width: 58%;
    display: inline-block;
  }
  .inputcontent {
    width: 50%;
    display: inline-block;
    border-bottom: 1px solid;
  }
  .dialogcontent2 {
    width: 58%;
    display: inline-block;
  }
  .dialogcontent3 {
    width: 40%;
    display: inline-block;
  }
  .dialogcontent3 .inputcontent {
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid;
  }
  .kl-table {
    padding: 0 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .longinput .el-input__inner {
    width: 160px;
  }
}
</style>

