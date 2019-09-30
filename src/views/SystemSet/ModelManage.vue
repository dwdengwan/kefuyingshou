<template>
  <div class="model-manage">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <h2 class="tab-title">
          <i></i>
          模块管理</h2>
      </div>
      <div class="btn-area">
        <el-button icon="el-icon-plus">保存</el-button>
        <el-button icon="el-icon-plus">新建</el-button>
      </div>
      <div class="model-manage-right-content">
        <div class="kr-right">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kr-left">
          <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tableData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed>
            </el-table-column>

            <el-table-column prop="modelName" min-width="150" label="名称" fixed>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.modelName"
                  placeholder="请输入名称">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="modelSelect" min-width="130" label="分类">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.modelSelect"
                  placeholder="请选择分类"
                  @keyup.esc.native="cancel(scope.$index, scope.row)"
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

            <el-table-column prop="modelWork" min-width="70" label="常用工具">
               <template slot-scope="scope">
                <!-- <el-input 
                  v-model="scope.row.daytime"
                  placeholder="请输入内容">
                </el-input> -->
                <el-checkbox v-model="scope.row.modelWork"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column prop="menuPath" min-width="180" label="菜单路径" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.menuPath"
                  placeholder="请输入菜单路径">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="menuName" min-width="150" label="菜单图标" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.menuName"
                  placeholder="请输入菜单名称">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="modelLevel" min-width="150" label="级别" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.modelLevel"
                  placeholder="请选择级别"
                  @keyup.esc.native="cancel(scope.$index, scope.row)"
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

            <el-table-column prop="modelState" min-width="280" label="说明" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                 type="textarea"
                  v-model="scope.row.modelState"
                  placeholder="请输入说明">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="modelOrderBy" min-width="150" label="排序" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.modelOrderBy"
                  placeholder="请输入排序">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column fixed="right" prop="position" min-width="100" label="操作" show-overflow-tooltip>
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
  name: "model-manage-index",
  data() {
    return {
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
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '模块管理', method: () => { window.histroy.back() } }
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
          label: '用户工程'
        },
        {
          value: '02',
          label: '表物管理'
        },
        {
          value: '03',
          label: '立户管理i'
        },
      ],
      options2: [
        {
          value: '01',
          label: '1'
        },
        {
          value: '02',
          label: '2'
        },
        {
          value: '03',
          label: '3'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      tableData:[
        { 
          modelName:'用户工程',
          modelSelect:'用户工程', 
          menuPath:'fct/ctm/ctm_mng.jsp',
          menuName:'icon',
          modelLevel:'1',
          modelState:'用户工程客服系统已使用',
          modelOrderBy:'00100010001',
          id: null,
          page: 1,
          pageCount: 20,
        },
        { 
          modelName:'表物管理',
          modelSelect:'表物管理', 
          menuPath:'fct/ctm/ctm_mng.jsp',
          menuName:'icon',
          modelLevel:'1',
          modelState:'表物管理客服系统已使用',
          modelOrderBy:'00100010001',
          id: null,
          page: 1,
          pageCount: 20,
        },
        { 
          modelName:'立户管理',
          modelSelect:'立户管理', 
          menuPath:'fct/ctm/ctm_mng.jsp',
          menuName:'icon',
          modelLevel:'1',
          modelState:'立户管理客服系统已使用',
          modelOrderBy:'00100010001',
          id: null,
          page: 1,
          pageCount: 20,
        },
      ],
      treeDatas: {
        tree: [
          { foreignkey: '模块', id: '222', _child: 
                                                [{ foreignkey: '用户工程', id: '222', _child: 
                                                                                        [{ foreignkey: '0035E应抄7646已抄0', id: '222' }, 
                                                                                        { foreignkey: '0035E应抄7646已抄0', id: '222' }, 
                                                                                        { foreignkey: '0035E应抄7646已抄0', id: '222' }, 
                                                                                        { foreignkey: '0035E应抄7646已抄0', id: '222' }] }] }],
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
      this.$changeTable(this, '.model-manage .model-manage-right', ['.model-manage .table-top'])
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
        total: 3,
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
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.model-manage {
  .btn-area{
    .el-button{
      float: right;
    }
  }
  .model-manage-right-content {
    height: 87%;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    .kr-right{
      width: 20%;
      height: 100%;
      // border: 2px solid red;
    }
    .kr-left{
      padding-left:1rem;
      padding-right:1rem;
      width: 80%;
      height: 100%;
      .save-btn{
        margin-top:1rem;
        text-align:center;
        .el-button{
          width: 15rem;
          height: 2rem;
          padding:.5rem 20px;
          margin-left:5rem;
          color:#fff;
        }
        .save{
          background: red;
        }
        .add{
          background: pink;
        }
      }
    }
  }
}
</style>
