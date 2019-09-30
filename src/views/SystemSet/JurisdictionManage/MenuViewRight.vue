<template>
  <div class="menu-view-right">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
          <i></i>
          {{tabsNameChange}}</h2> -->
      </div>
      <div class="menu-view-right-right-content" v-if='!dialogFormVisible'>
        <el-tabs v-model="tabsActiveName" type="card" @tab-click="tabsHandleClick">
          <el-tab-pane v-for="(v,i) in tabsData" :key="i" :label="v.label" :name="v.name">
              <!-- 菜单查看 -->
              <div class="mydestop" v-if="tabsActiveName==='mydestop'">
                <el-tabs v-model="activeName2">
                  <div class="one1 fl">
                    <div class="role">
                      角色
                    </div>
                    <ul>
                      <li :key="tmp.label" v-for="tmp in listRoleMenu">
                        <a href="javascript:void(0)" @click.prevent="show(tmp)">{{tmp.label}}</a><span style="color:red">({{tmp.num}})</span>
                      </li>
                    </ul>
                  </div>
                  <div class="two1 fl">
                    <div>
                      <el-button type="primary" @click="save" size="mini">保存</el-button>
                    </div>
                    <div>
                      <el-button type="primary" @click="checkall" size="mini">全选</el-button>
                    </div>
                    <div>
                      <el-button type="primary" @click="reset1" size="mini">重置</el-button>
                    </div>
                  </div>
                  <div class="three1 fl">
                    <div class="rolefun">
                      功能角色
                    </div>

                    <el-tree v-loading="treeLoading" :data="data2" show-checkbox node-key="id" highlight-current ref="tree" :default-checked-keys="num" :props="defaultProps">
                    </el-tree>
                  </div>
                </el-tabs>
              </div>
              <!-- 增删改权 -->
              <div class="comprehensiveBusiness" v-else-if="tabsActiveName==='comprehensiveBusiness'">
                <el-tabs v-model="activeName2">
                  <div class="one1 fl">
                    <div class="role">
                      角色
                    </div>
                    <ul>
                      <li :key="tmp.label" v-for="tmp in listRoleMenu">
                        <a href="javascript:void(0)" @click.prevent="show(tmp)">{{tmp.label}}</a><span style="color:red">({{tmp.num}})</span>
                      </li>
                    </ul>
                  </div>
                  <div class="two1 fl">
                    <div>
                      <el-button type="primary" @click="save" size="mini">保存</el-button>
                    </div>
                    <div>
                      <el-button type="primary" @click="checkall" size="mini">全选</el-button>
                    </div>
                    <div>
                      <el-button type="primary" @click="reset1" size="mini">重置</el-button>
                    </div>
                  </div>
                  <div class="three1 fl">
                    <div class="rolefun">
                      功能角色
                    </div>

                    <el-tree v-loading="treeLoading" :data="data2" show-checkbox node-key="id" highlight-current ref="tree" :default-checked-keys="num" :props="defaultProps">
                    </el-tree>
                  </div>
                </el-tabs>
              </div>

              <!-- 部门查看权 -->
              <div class="mydestop1" v-else-if="tabsActiveName==='mydestop1'">
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
                          placeholder="请输入内容">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column prop="roleDepart" min-width="150" label="可查看区域">
                      <template slot-scope="scope">
                        <!-- type="textarea" -->
                        <el-input 
                          show-overflow-tooltip
                          v-model="scope.row.roleDepart"
                          placeholder="请输入内容">
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

              <!-- 区域查看权 -->
              <div class="comprehensiveBusiness1" v-else-if="tabsActiveName==='comprehensiveBusiness1'">
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
                          placeholder="请输入内容">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column prop="roleDepart" min-width="150" label="可查看区域">
                      <template slot-scope="scope">
                        <el-input 
                          v-model="scope.row.roleDepart"
                          show-overflow-tooltip
                          placeholder="请输入内容">
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
      </div>
      <div class='kr-content' v-else>
        <div  class="toolbar">
          <div class="form-left">

              <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        
          </div>
          <div class="form-right">
              <el-button size="mini" type="primary">保存</el-button>
          </div>
        </div>
        <el-form :model="form">
          <el-row>
            <el-col offset="2" :span="10">
              <el-form-item label="角色名称:" :label-width="formLabelWidth">
                <el-input v-model="form.roleName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col offset="2" :span="10">
              <el-form-item label="所属用户:" :label-width="formLabelWidth">
                <el-input v-model="form.roleUser" autocomplete="off" @focus="takeChange()"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-dialog title="角色管理-添加"  width="45%">
        <!-- :visible.sync="dialogFormVisible" -->
        <el-form :model="form">
          <el-form-item label="角色名称:" :label-width="formLabelWidth">
            <el-input v-model="form.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属用户:" :label-width="formLabelWidth">
            <el-input v-model="form.roleUser" autocomplete="off" @focus="takeChange()"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
          <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        </div>
      </el-dialog>
      <!-- <el-dialog :visible.sync="authTreeShow" title="请选择人员" class="kr-dialog" width="25%">
        <authTree @treeClick="getAddData" :allrow="allrow"></authTree>
      </el-dialog> -->
  </div>
</template>
<script>
import authTree from '../authTree'
export default {
  name: "menu-view-right-index",
  components: { authTree },
  data() {
    return {
      listRoleMenu:[
        {
          value:'01',
          label:'营业管理员',
          num:'256',
        },
        {
          value:'02',
          label:'公司领导',
          num:'41',
        },
        {
          value:'03',
          label:'生产技术科',
          num:'0',
        },
      ],
      tabsData:[
          {
              label:"菜单查看权",
              name:"mydestop"
          },
          {
              label:"增删改权",
              name:"comprehensiveBusiness"
          },
          {
              label:"部门查看权",
              name:"mydestop1"
          },
          {
              label:"区域查看权",
              name:"comprehensiveBusiness1"
          },
      ],
      tableData:[
        {
          roleName:'营业管理员',
          roleDepart:'营业管理员',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          roleName:'公司领导',
          roleDepart:'公司领导',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          roleName:'生产技术科',
          roleDepart:'生产技术科',
          id: null,
          page: 1,
          pageCount: 20,
        },
      ],
      tabsActiveName: 'mydestop',
      tabsName:'角色管理',
      dialogFormVisible:false,//弹出表单
      form: {
        roleUser: '',
        roleName:'',
      },
      formLabelWidth: '120px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '权限管理', path: '/MenuViewRight' },
          { title: '菜单查看权', method: () => { window.histroy.back() } }
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
      authTreeShow:true,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.menu-view-right .menu-view-right-right', ['.menu-view-right .table-top'])
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
    closeDialog(){
      // this.crumbsData.titleList.splice(2,1);
      this.dialogFormVisible = false;
    },
    takeChange(){
      this.authTreeShow = true;
    },
    tabsHandleClick(){
      if(this.tabsActiveName == 'mydestop'){
        this.crumbsData.titleList[2].title = '菜单查看权'
      }else if(this.tabsActiveName == 'comprehensiveBusiness'){
        this.crumbsData.titleList[2].title = '增删改权'
      }else if(this.tabsActiveName == 'mydestop1'){
        this.crumbsData.titleList[2].title = '部门查看权'
      }else if(this.tabsActiveName == 'comprehensiveBusiness1'){
        this.crumbsData.titleList[2].title = '区域查看权'
      }
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
        this.tabsName = '菜单查看权'
      }else if(this.tabsActiveName == 'comprehensiveBusiness'){
        this.tabsName = '增删改权'
      }else if(this.tabsActiveName == 'mydestop1'){
        this.tabsName = '部门查看权'
      }else{
        this.tabsName = '区域查看权'
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
.menu-view-right {
  .menu-view-right-right-content {
    height: 87%;
    overflow-y: auto;
    .el-tabs__content{
      padding-left: 1rem;
      padding-right:1rem;
    }
  }
  .kl-table {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .el-tabs {
    height: 100%;
    .one1 {
      width: 30%;
      height: 99%;
      // overflow-y: scroll;
      border: 1px solid #ebeef5;
      .role {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        text-align: center;
        // background:#f5f7fa;
        background: #dedfe0;
        font-size: 20px;
      }
      ul {
        margin: 0px auto;
        width: 100%;
        height: 100%;
      }
      li {
        width: calc(100% - 70px);
        margin: 0 auto;
        font-size: 17px;
      }
      ul li {
        margin-top: 15px;
      }
      ul li a {
        color: #000;
        font-size: 17px;
      }
      ul li a:hover {
        color: #006699;
      }
    }
    .two1 {
      width: 20%;
      height: 99%;
      text-align: center;
      div {
        margin-top: 20px;
      }
    }
    .three1 {
      width: 30%;
      height: 99%;
      overflow: auto;
      border: 1px solid #ebeef5;
      .rolefun {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        text-align: center;
        background: #dedfe0;
        font-size: 20px;
      }
    }
    .one1,
    .two1,
    .three1 {
      margin-left: 5%;
    }
    .el-button--primary {
      width: 80px;
      height: 40px;
      font-size: 20px;
      background: #47b5e8;
      border-color: #47b5e8;
    }
    .el-tree{
      height: 90%;
      overflow-y: auto
    }
    .el-checkbox__inner{
      margin-left:.1rem;
    }
    .el-tree-node__content>.el-tree-node__expand-icon{
      padding: 12px;
    }
  }
  .el-tabs__content {
    // height: calc(100% - 40px);
    // height:510px;
    // width: 1280px;
    // width: calc(100%-220px);
    display: flex;
    flex-direction: row ;
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
  #pane-comprehensiveBusiness1,#pane-mydestop1{
    width: 100%;
  }
  #pane-mydestop,#pane-comprehensiveBusiness{
    width: 100%;
    height: 100%;
  }
}
</style>

