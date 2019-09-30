<template>
  <div class="cost-project">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
          <i></i>
          费用组成</h2> -->
      </div>

      <div class="cost-project-right-content">
        <div class="kr-right">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kr-left">
          <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                  <el-form-item class="form-right">
                      <el-button size="mini" type="primary" >保存</el-button>
                      <el-button size="mini" type="primary" icon="el-icon-plus" >添加行</el-button>
                  </el-form-item>
              </el-form>
          </div>
           <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tableData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed>
            </el-table-column>

            <el-table-column prop="areaName" min-width="100" label="费用名称" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.areaName"
                  placeholder="请输入费用名称">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="areaCode" min-width="80" label="编号">
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.areaCode"
                  placeholder="请输入编号">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="areaNum" min-width="80" label="参考系数">
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.areaNum"
                  placeholder="请输入参考系数">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="areaPrice" min-width="80" label="参考价格">
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.areaPrice"
                  placeholder="请输入参考价格">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="areaState" min-width="80" label="状态">
               <template slot-scope="scope">
                <el-select
                  v-model="scope.row.areaState"
                  @keyup.esc.native="cancel(scope.$index, scope.row)"
                  placeholder="请选择状态"
                >
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="areaBreak" min-width="100" label="违约金">
               <template slot-scope="scope">
                <el-select
                  v-model="scope.row.areaBreak"
                  @keyup.esc.native="cancel(scope.$index, scope.row)"
                  placeholder="请选择违约金"
                >
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <!-- <el-table-column prop="areaLevel" min-width="100" label="级别">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.areaLevel"
                  @keyup.esc.native="cancel(scope.$index, scope.row)"
                  placeholder="请选择级别"
                >
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column> -->

            <el-table-column prop="areaRemark" min-width="200" label="备注" show-overflow-tooltip>
              <template slot-scope="scope">

                  <!-- <el-form-item label="备注:" :label-width="formLabelWidth"> -->
                    <el-input v-model="scope.row.areaRemark" autocomplete="off" type="textarea" placeholder="请输入备注"></el-input>
                  <!-- </el-form-item> -->
                <!-- <el-input 
                  v-model="scope.row.areaRemark"
              
                  placeholder="请输入说明">
                </el-input> -->
              </template>
            </el-table-column>

            <el-table-column prop="areaOrderBy" min-width="70" label="排序号" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.areaOrderBy"
                  placeholder="请输入排序号">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="70" fixed='right'>
              <template slot-scope="scope">
                <el-button type="text" @click.native="edit(scope.$index, scope.row)" style='font-size:12px;'>删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "cost-project-index",
  data() {
    return {
      tableData:[
        {
          areaName:'水费',
          areaCode:'ZBSF',
          areaNum:'1.0',
          areaPrice:'1.4',
          areaState:'启用',
          areaBreak:'03',
          areaLevel:'1',
          areaRemark:'',
          areaOrderBy:'1',
        },
        {
          areaName:'污水处理费',
          areaCode:'WSCL',
          areaNum:'1.0',
          areaPrice:'0.7',
          areaState:'启用',
          areaBreak:'03',
          areaLevel:'1',
          areaRemark:'',
          areaOrderBy:'2',
        },
        {
          areaName:'垃圾处理费',
          areaCode:'LJCL',
          areaNum:'1.0',
          areaPrice:'12',
          areaState:'启用',
          areaBreak:'03',
          areaLevel:'1',
          areaRemark:'',
          areaOrderBy:'3',
        },

      ],
      dialogFormVisible:false,//弹出表单
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
      formLabelWidth: '120px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础配置', path: '/BusinessArea' },
          { title: '价格管理', path: '/WaterType' },
          { title: '费用组成', method: () => { window.histroy.back() } }
        ],
      },
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
      options1: [
        {
          value: '01',
          label: '启用'
        },
        {
          value: '02',
          label: '禁用'
        },
      ],
      options2: [
        {
          value: '03',
          label: '0.8倍'
        },
        {
          value: '04',
          label: '1倍'
        },
        {
          value: '05',
          label: '1.2倍'
        },
      ],
      options3: [
        {
          value: '06',
          label: '1'
        },
        {
          value: '07',
          label: '2'
        },
        {
          value: '08',
          label: '3'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      tabsData:[
        {
          name1:'11',
          name2:'22',
          name3:false,
          name4:'44',
          name5:'55',
          name6:'66',
          name7:'77',
          name8:'88',
          name9:'99',
          name10:'1010',
        },
        {
          name1:'111',
          name2:'222',
          name3:true,
          name4:'444',
          name5:'555',
          name6:'666',
          name7:'777',
          name8:'888',
          name9:'999',
          name10:'101010',
        },
        {
          name1:'1111',
          name2:'2222',
          name3:true,
          name4:'4444',
          name5:'5555',
          name6:'6666',
          name7:'7777',
          name8:'8888',
          name9:'9999',
          name10:'10101010',
        },
      ],
      treeDatas: {
        tree: [{ foreignkey: '费用组成', id: '222', _child: [{ foreignkey: '水费_ZBSF', id: '222'},{ foreignkey: '污水处理费_WSCL', id: '222'},{ foreignkey: '垃圾处理费_LJCL', id: '222'}] }],
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
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.cost-project .cost-project-right', ['.cost-project .table-top'])
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
    add(){//添加
      this.dialogFormVisible = true;
    },
    edit(){
      this.dialogFormVisible = true;
    },
    backTreeData(){},
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
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.cost-project {
  .el-input__inner{
    font-size: 12px;
  }
  .btn-area{
    div{
      width: 100%;
      float: right;
      .el-button{
        float: right;
      }
    }
  }
  .cost-project-right-content {
    height: 87%;
    overflow-y: auto;
    // margin-top:1rem;
    display: flex;
    flex-direction: row;
    .kr-right{
      width: 20%;
      height: 100%;
      // border: 2px solid red;
    }
    .kr-left{
      width: 80%;
      height: 100%;
    }
  }
}
</style>

