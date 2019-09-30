<template>
  <div class="role-manage">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <h2 class="tab-title">
          <i></i>
          {{tabsNameChange}}</h2>
      </div>
      <div class="role-manage-right-content">
        <el-tabs v-model="tabsActiveName" type="card" @tab-click="tabsHandleClick">
            <el-tab-pane v-for="(v,i) in tabsData" :key="i" :label="v.label" :name="v.name">
                <!-- 角色管理 -->
                <div class="mydestop" v-if="tabsActiveName==='mydestop'">
                  <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tableData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

                    <el-table-column type="index" label="NO." width="50" :index="indexMethod">
                    </el-table-column>

                    <el-table-column prop="roleName" min-width="150" label="角色名称">
                      <template slot-scope="scope">
                        <el-input 
                          v-model="scope.row.roleName"
                          placeholder="请输入角色名称">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column prop="roleFirst" min-width="120" label="角色首页">
                      <template slot-scope="scope">
                        <el-select
                          v-model="scope.row.roleFirst"
                          placeholder="请选择角色首页"
                          @keyup.esc.native="cancel(scope.$index, scope.row)"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>

                    <el-table-column prop="roleArea" min-width="150" label="可查看区域">
                      <template slot-scope="scope">
                        <el-input 
                          show-overflow-tooltip
                          type="textarea"
                          v-model="scope.row.roleArea"
                          placeholder="请输入可查看区域">
                        </el-input>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
                <!-- 用户角色配置 -->
                <div class="comprehensiveBusiness" v-else>
                  <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tableData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

                    <el-table-column type="index" label="NO." width="50" :index="indexMethod">
                    </el-table-column>

                    <el-table-column prop="roleName" min-width="150" label="角色名称">
                      <template slot-scope="scope">
                        <el-input 
                          v-model="scope.row.roleName"
                          placeholder="请输入角色名称">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column prop="roleArea" min-width="150" label="可查看区域">
                      <template slot-scope="scope">
                        <el-input 
                          type="textarea"
                          show-overflow-tooltip
                          v-model="scope.row.roleArea"
                          placeholder="请输入可查看区域">
                        </el-input>
                      </template>
                    </el-table-column>

                    

                    <el-table-column width="70" label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" @click.native="edit(scope.$index, scope.row)" style='font-size:12px;'>添加</el-button>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
                
            </el-tab-pane>
           

        </el-tabs>
        <el-dialog title="角色管理-添加" :visible.sync="dialogFormVisible" width="45%">
          <el-form :model="form">
            <el-form-item label="角色名称:" :label-width="formLabelWidth">
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属用户:" :label-width="formLabelWidth">
              <el-input v-model="form.user" autocomplete="off" @focus="takeChange()"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
          </div>
        </el-dialog>
        <!-- <el-dialog title="请选择人员" :visible.sync="authTreeShow" class="kr-dialog" width="25%">
          <authTree @treeClick="getAddData" :allrow="allrow"></authTree>
        </el-dialog> -->
      </div>
  </div>
</template>
<script>
import authTree from '../authTree'
export default {
  name: "role-manage-index",
  components: { authTree },
  data() {
    return {
      // tabs标签页
      tabsData:[
          {
              label:"角色管理",
              name:"mydestop"
          },
          {
              label:"用户角色配置",
              name:"comprehensiveBusiness"
          },
      ],
      tableData:[
        {
          roleName:'公司领导',
          roleFirst:'公共首页',
          roleArea:'公司领导',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          roleName:'营业管理员',
          roleFirst:'公共首页',
          roleArea:'营业管理员',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          roleName:'生产技术科',
          roleFirst:'公共首页',
          roleArea:'生产技术科',
          id: null,
          page: 1,
          pageCount: 20,
        },
      ],
      tabsActiveName: 'mydestop',
      tabsName:'角色管理',
      dialogFormVisible:false,//弹出表单
      authTreeShow:false,//弹出表单
      form: {
          userName: '',
          user:'',
        },
      formLabelWidth: '120px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '角色管理', method: () => { window.histroy.back() } }
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
      options: [
        {
          value: 12,
          label: '公共首页'
        },
        {
          value: 13,
          label: '公司首页'
        },
        {
          value: 14,
          label: '部门首页'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.role-manage .role-manage-right', ['.role-manage .table-top'])
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
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    takeChange(){
      this.authTreeShow = true;
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  },
  computed:{
    tabsNameChange(){
      if(this.tabsActiveName == 'mydestop'){
        this.tabsName = '角色管理'
      }else{
        this.tabsName = '用户角色配置'
      }
      return this.tabsName;
    }
  },
}
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.role-manage {
  .role-manage-right-content {
    height: 87%;
    overflow-y: auto;
    .el-tabs__content{
      padding-left: 1rem;
      padding-right:1rem;
    }
    .el-dialog{
      height: 70% !important;
      .el-dialog__footer{
        margin-top:.9rem;
      }
      .el-dialog__body {
        .el-input__inner {
          width: 25rem;
        }
      }
    }
    .kr-dialog{
      .el-dialog{
        height: 94% !important;
        margin-right: 0 !important;
        overflow: hidden;
        .el-dialog__header{
          width: 90%;
          height: 4%;
          overflow: hidden;
        }
        .el-dialog__body{
          height: 80% !important;
          width: 90%;
          overflow: hidden;
          padding: 20px 20px;
          .el-input__inner {
            width: 100%;
          }
        }
      }
    }
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


