<template>
  <div class="organiza-manage">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <h2 class="tab-title">
          <i></i>
          组织管理</h2>
      </div>
      <div class="btn-area">
        <el-button @click="add()" icon="el-icon-plus">新建</el-button>
      </div>
      <div class="organiza-manage-right-content">
        <div class="kl-table">
          <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tableData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="outCode" min-width="100" label="外部编号">
            </el-table-column>

            <el-table-column prop="inCode" min-width="80" label="内部编号">
            </el-table-column>

            <el-table-column prop="simpleName" min-width="80" label="水司简称">
            </el-table-column>

            <el-table-column prop="fullName" min-width="150" label="水司全称" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="dbServe" min-width="150" label="数据库服务器" show-overflow-tooltip>
            </el-table-column>

             <el-table-column prop="schemaCode" min-width="80" label="schema标识">
            </el-table-column>

            <el-table-column prop="station" min-width="80" label="状态">
            </el-table-column>

            <el-table-column prop="remark" min-width="120" label="备注" show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;">编辑</el-button>
                <span style="color:#e6e6e6;">|</span>
                <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;">授权范围</el-button>
              </template>
            </el-table-column>
            
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <el-dialog title="组织管理-新建" :visible.sync="dialogFormVisible" width="50%">
        <el-form>
          <el-row>
            <el-col offset="2" :span='22'>
              <el-form-item label="外部编号:" :label-width="formLabelWidth" class="kr-input">
                <el-input v-model="form.outCode" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="内部编号:" :label-width="formLabelWidth" class="kr-input">
                <el-input v-model="form.inCode" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="水司简称:" :label-width="formLabelWidth" class="kr-input">
                <el-input v-model="form.simpleName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="水司全称:" :label-width="formLabelWidth" class="kr-input">
                <el-input v-model="form.fullName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="状态:" :label-width="formLabelWidth" class="kr-input">
                <el-select v-model="form.station" placeholder="请选择状态">
                  <el-option label="启用" value="shanghai"></el-option>
                  <el-option label="停用" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注:" :label-width="formLabelWidth" class="kr-input">
                <el-input v-model="form.remark" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
       
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false" size='mini'>确 定</el-button>
          <el-button @click="dialogFormVisible = false" size='mini'>取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: "organiza-manage-index",
  data() {
    return {
      dialogFormVisible:false,//弹出表单
      form: {
        outCode:'',
        inCode:'',
        simpleName:'',
        fullName:'',
        dbServe:'',
        schemaCode:'',
        station:'',
        remark:'',
      },
      formLabelWidth: '120px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '组织管理', method: () => { window.histroy.back() } }
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
      options6: [
        {
          value: 12,
          label: '用水报装'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      tableData:[
        {
          outCode:'WATTER-008',
          inCode:'WATTER-008',
          simpleName:'清溪',
          fullName:'东莞市清溪粤海水务有限公司',
          dbServe:'DB-001',
          schemaCode:'S007',
          station:'启用',
          remark:'清溪水司客服营收系统已启用',
          id: null,
          page: 1,
          pageCount: 20,
          totalPage: 0,
        },
        {
          outCode:'WATTER-009',
          inCode:'WATTER-009',
          simpleName:'梧州',
          fullName:'东莞市梧州粤海水务有限公司',
          dbServe:'DB-002',
          schemaCode:'S008',
          station:'启用',
          remark:'梧州水司客服营收系统已启用',
          id: null,
          page: 1,
          pageCount: 20,
          totalPage: 0,
        },
        {
          outCode:'WATTER-010',
          inCode:'WATTER-010',
          simpleName:'南沙',
          fullName:'广州市南沙粤海水务有限公司',
          dbServe:'DB-003',
          schemaCode:'S009',
          station:'启用',
          remark:'南沙水司客服营收系统已启用',
          id: null,
          page: 1,
          pageCount: 20,
          totalPage: 0,
        },
      ],
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.organiza-manage .organiza-manage-right', ['.organiza-manage .table-top'])
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
.organiza-manage {
  .btn-area{
    .el-button{
      float: right;
    }
  }
  .organiza-manage-right-content {
    height: 87%;
    overflow-y: auto;
  }
  .kl-table {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .el-dialog__wrapper{
    .kr-input{
      .el-input,.el-textarea{
        width: 70% !important;
      }
    }
    .el-dialog{
      height: 80% !important;
    }
    .el-dialog__footer{
      margin-top: .9rem;
    }
  }
}
.el-select-dropdown{
  // width: 25%;
}
</style>


