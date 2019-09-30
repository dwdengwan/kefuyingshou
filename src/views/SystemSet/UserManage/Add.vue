<template>
  <div class="user-manage">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <h2 class="tab-title">
          <i></i>
          用户管理</h2>
      </div>
      <div class="btn-area">
        <div class="btn-area-right">
          <el-input placeholder="用户名/姓名/编号/部门/职位" class="myinput"></el-input>
          <el-button class="search" icon="el-icon-search"></el-button>
        </div>
        <div class="btn-area-left">
          <!-- <el-button @click="add()" icon="el-icon-plus">新建</el-button>
          <el-button @click="add()" icon="el-icon-edit">修改</el-button> -->
          <el-button icon="el-icon-delete">删除</el-button>
          <el-button class="btn-stop">停/启用</el-button>
          <el-button icon="el-icon-upload2" class="btn-ex">导出</el-button>
        </div>
      </div>
      <div class="user-manage-right-content">
        <div class="kl-table">
          <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tableData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

            <el-table-column type="index" label="序号" width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column min-width="45" type="selection" ></el-table-column>

            <el-table-column prop="userName" min-width="100" label="姓名">
            </el-table-column>

            <el-table-column prop="userCode" min-width="80" label="用户编号">
            </el-table-column>

            <el-table-column prop="userNickName" min-width="80" label="用户名">
            </el-table-column>

            <el-table-column prop="depart" min-width="80" label="所属部门">
            </el-table-column>

            <el-table-column prop="duty" min-width="80" label="职务" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="differServ" min-width="100" label="业务分类" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="telphoneNum" min-width="120" label="手机">
            </el-table-column>

            <el-table-column prop="telphone" min-width="120" label="电话">
            </el-table-column>

            <el-table-column prop="station" min-width="120" label="状态">
            </el-table-column>

            <!-- <el-table-column label="操作" width="85">
              <template slot-scope="scope">
                <el-button type="text" @click.native="edit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column> -->
            
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div>
          <el-dialog title="用户管理-新建" :visible.sync="dialogFormVisible" width="60%">
            <div class="info">基础信息</div>
            <el-form :model="form">
              <el-row>
                <el-col offset="2" :span="10">

                  <el-form-item label="用户编号:" :label-width="formLabelWidth">
                    <el-input v-model="form.userCode" autocomplete="off" placeholder="请输入用户编号"></el-input>
                  </el-form-item>

                  <el-form-item label="用户名(集团唯一):" :label-width="formLabelWidth">
                    <el-input v-model="form.userNickName" autocomplete="off" placeholder="请输入用户名"></el-input>
                  </el-form-item>

                  <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-select v-model="form.departName" placeholder="请选择所属部门">
                      <el-option label="公司领导" value="shanghai"></el-option>
                      <el-option label="营业部" value="beijing"></el-option>
                      <el-option label="客户中心" value="shenzhen"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="职务:" :label-width="formLabelWidth">
                    <el-input v-model="form.duty" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="身份证号:" :label-width="formLabelWidth">
                    <el-input v-model="form.userID" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="手机:" :label-width="formLabelWidth">
                    <el-input v-model="form.telphoneNum" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="地址:" :label-width="formLabelWidth">
                    <el-input v-model="form.userAddress" autocomplete="off"></el-input>
                  </el-form-item>

                </el-col>
                <el-col :span="10">

                  <el-form-item label="姓名:" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="密码:" :label-width="formLabelWidth">
                    <el-input v-model="form.userPassWord" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="区域" :label-width="formLabelWidth">
                    <el-select v-model="form.workArea" placeholder="请选择区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="业务分类:" :label-width="formLabelWidth">
                    <el-input v-model="form.differServ" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="form.userSex" placeholder="请选择性别">
                      <el-option label="男" value="shanghai"></el-option>
                      <el-option label="女" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="电话:" :label-width="formLabelWidth">
                    <el-input v-model="form.telphone" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="邮箱:" :label-width="formLabelWidth">
                    <el-input v-model="form.userEmail" autocomplete="off"></el-input>
                  </el-form-item>

                </el-col>
              </el-row>
              
              <el-row>
                <el-col offset="2" :span='22'>
                  <el-form-item label="备注:" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <div class="info">接口信息</div>

              <el-row>
                <el-col offset="2" :span="10">
                  <el-form-item label="财政局名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.financeName" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="财政局账套:" :label-width="formLabelWidth">
                    <el-input v-model="form.financeSelect" autocomplete="off"></el-input>
                  </el-form-item>


                </el-col>
                <el-col :span="10">
                  <el-form-item label="财政局密码:" :label-width="formLabelWidth">
                    <el-input v-model="form.financePassWord" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false" size='mini'>保存</el-button>
              <el-button @click="dialogFormVisible = false" size='mini'>返回</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "user-manage-index",
  data() {
    return {
      dialogFormVisible:false,//弹出表单
      form: {
        userCode:"",
        departName:'',
        duty:"",
        userID:'',
        userAddress:'',
        telphoneNum:'',
        userName:"",
        userPassWord:'',
        workArea:'',
        telphone:'',
        userSex:'',
        differServ:"",
        userEmail:'',
        remark:'',
        financeName:'',
        financeSelect:'',
        financePassWord:'',
        userNickName:'',
        // depart:"",
        // station:'',
      },
      formLabelWidth: '100px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '用户管理', method: () => { window.histroy.back() } }
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
          userName:"何志森",
          userCode:"001",
          userNickName:'heZhiSen',
          depart:"公司领导",
          duty:"董事长",
          differServ:"未分类",
          telphoneNum:'18875546699',
          telphone:'87554466',
          station:'启用',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          userName:"时文喜",
          userCode:"002",
          userNickName:'shiWenXi',
          depart:"公司领导",
          duty:"财务总监",
          differServ:"未分类",
          telphoneNum:'18875542658',
          telphone:'87554466',
          station:'启用',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          userName:"贺征发",
          userCode:"003",
          userNickName:'heZhengFa',
          depart:"公司领导",
          duty:"副总经理",
          differServ:"未分类",
          telphoneNum:'18875541862',
          telphone:'87554466',
          station:'启用',
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
      this.$changeTable(this, '.user-manage .user-manage-right', ['.user-manage .table-top'])
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
.user-manage {
  .search{
    // margin-right:100px;
    // clear:both;
  }
  .user-manage-right-content {
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
    .el-dialog__body{
      padding:20px;
      .info{
        background: #666;
        color:#fff;
        height: 1.5rem;
        line-height: 1.5rem;
        padding:0 1rem;
        font-size: 14px;
      }
      .el-form-item__content{
        height: 2.5rem;
        .el-input {
          width: 15rem;
          // margin-top:.5rem;
          margin-left:1.2rem;
          .el-input__inner{
            width: 15rem !important;
          }
        }
      }
      .el-form-item__label{
        font-size: 12px;
        
      }
    }
    .el-dialog__footer{
      margin-top: 2rem;
    }
  }
  .btn-area{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    .btn-area-right{
      display: flex;
      flex-direction: row;
      .el-input {
        padding:1.3rem 0 0 1.6rem;
        width: 90%;
        .el-input__inner{
          width: 13rem;
          height: 1.8rem;
        }
      }
      .search{
        width: 2.75rem;
        height: 1.8rem;
        background: #faa646;
      }
    }
    .btn-area-left{
      .el-button{
        margin-right: 0rem !important;
      }
      
      .btn-ex{
        margin-right:1rem !important; 
      }
      .btn-stop{
        width: 5rem;
      }
    }
  }
}
</style>


