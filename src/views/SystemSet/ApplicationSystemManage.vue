<template>
  <div class="application-system-manage">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <h2 class="tab-title">
          <i></i>
          应用系统管理</h2>
      </div>
      <div class="btn-area">
        <el-button @click="add()" icon="el-icon-plus">新建</el-button>
      </div>
      <div class="application-system-manage-right-content">
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

            <el-table-column prop="severCode" min-width="100" label="服务器编号">
            </el-table-column>

            <el-table-column prop="severName" min-width="80" label="服务器名称">
            </el-table-column>

            <el-table-column prop="ipAdress" min-width="80" label="IP地址">
            </el-table-column>

            <el-table-column prop="severPort" min-width="150" label="服务器端口" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="station" min-width="100" label="状态" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="remark" min-width="120" label="备注">
            </el-table-column>

            <el-table-column label="操作" width="85">
              <template slot-scope="scope">
                <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;">编辑</el-button>
              </template>
            </el-table-column>
            
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div>
          <el-dialog title="应用系统管理-新建" :visible.sync="dialogFormVisible" width="60%">
            <el-form>
              <el-row>
                <el-col offset="2" :span='10'>
                  <el-form-item label="服务器编号:" :label-width="formLabelWidth">
                    <el-input v-model="form.severCode" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="IP地址:" :label-width="formLabelWidth">
                    <el-input v-model="form.ipAdress" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="服务器端口:" :label-width="formLabelWidth">
                    <el-input v-model="form.severPort" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='10'>
                  <el-form-item label="服务器名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.severName" autocomplete="off"></el-input>
                  </el-form-item>
                  
                  <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="form.station" placeholder="请选择状态">
                      <el-option label="启用" value="shanghai"></el-option>
                      <el-option label="禁止" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col offset="2" :span='20'>
                  <el-form-item label="备注:" :label-width="formLabelWidth">
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
      </div>
  </div>
</template>
<script>
export default {
  name: "application-system-manage-index",
  data() {
    return {
      dialogFormVisible:false,//弹出表单
      form: {
        severCode: "",
        severName:'',
        dbName:'',
        ipAdress:'',
        severPort:'',
        station:'',
        remark:'',
      },
      formLabelWidth: '120px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '应用系统管理', method: () => { window.histroy.back() } }
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
          areaId: null,
          severCode: "APP-001",
          severName:'160服务器',
          dbName:'CSS',
          ipAdress:'192.168.1.160',
          severPort:'8888',
          station:'启用',
          remark:'这台服务器很好用',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaId: null,
          severCode: "APP-002",
          severName:'170服务器',
          dbName:'HTML',
          ipAdress:'192.168.1.170',
          severPort:'8899',
          station:'禁用',
          remark:'这个系统很好用',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaId: null,
          severCode: "APP-003",
          severName:'180服务器',
          dbName:'JAVASCRIPT',
          ipAdress:'192.168.1.180',
          severPort:'8800',
          station:'启用',
          remark:'32个赞',
          id: null,
          page: 1,
          pageCount: 20,
        },
      ],
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.application-system-manage .application-system-manage-right', ['.application-system-manage .table-top'])
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
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.application-system-manage {
  .btn-area{
    .el-button{
      float: right;
    }
  }
  .application-system-manage-right-content {
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
  .el-dialog{
    height: 70% !important;
    .el-dialog__footer{
      margin-top:1rem;
    }
  }
}
</style>


