<template>
  <div class="depart-manage">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <h2 class="tab-title">
          <i></i>
          部门管理</h2>
      </div>
      <div class="btn-area">
        <el-button>保存</el-button>
        <el-button icon="el-icon-plus">新建</el-button>
      </div>
      <div class="depart-manage-right-content">
        <div class="kl-table">
          <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tabData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed>
            </el-table-column>

            <el-table-column prop="departName" min-width="150" label="部门名称" fixed>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.departName"
                  placeholder="请输入部门名称">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="departLevel" min-width="120" label="部门级别">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.departLevel"
                  placeholder="请输入部门级别"
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

            <el-table-column prop="departCode" min-width="150" label="部门编号">
               <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.departCode"
                  placeholder="请输入部门编号">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="departType" min-width="130" label="部门类型">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.departType"
                  placeholder="请输入部门类型"
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

            <el-table-column prop="principal" min-width="150" label="负责人" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.principal"
                  placeholder="请输入负责人">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="telphone" min-width="150" label="电话" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.telphone"
                  placeholder="请输入负责人电话">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="telphoneNum" min-width="150" label="手机" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.telphoneNum"
                  placeholder="请输入内容负责人手机">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="orderBy" min-width="150" label="排序号" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.orderBy"
                  placeholder="请输入排序号">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="position" min-width="150" label="仓位所属" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.position"
                  placeholder="请输入仓位所属"
                  @keyup.esc.native="cancel(scope.$index, scope.row)"
                >
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="remark" min-width="280" label="备注" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input type="textarea"
                  v-model="scope.row.remark"
                  placeholder="请输入备注">
                </el-input>
              </template>
            </el-table-column>


          </el-table>
          <!-- <div class="save-btn">
            <el-button class="save">保存</el-button><el-button class="add">新建</el-button>
          </div> -->
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "depart-manage",
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
      tabsData:[
        {
          name1:'11',
          name2:'22',
          name3:'33',
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
          name3:'333',
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
          name3:'3333',
          name4:'4444',
          name5:'5555',
          name6:'6666',
          name7:'7777',
          name8:'8888',
          name9:'9999',
          name10:'10101010',
        },
      ],
      formLabelWidth: '120px',
        // navTree:[
        //       {
        //         children: [],
        //         code: "001002003001",
        //         id: "819",
        //         name: "数据库管理",
        //         parentId: "7",
        //         path: "/DatabaseManage"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "818",
        //         name: "应用系统管理",
        //         parentId: "7",
        //         path: "/ApplicationSystemManage"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "817",
        //         name: "微信公众号管理",
        //         parentId: "7",
        //         path: "/WeChat"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "816",
        //         name: "组织管理",
        //         parentId: "7",
        //         path: "/OrganizaManage"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "815",
        //         name: "水司管理",
        //         parentId: "7",
        //         path: "/WaterManage"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "814",
        //         name: "部门管理",
        //         parentId: "7",
        //         path: "/DepartManage"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "813",
        //         name: "用户管理",
        //         parentId: "7",
        //         path: "/UserManage"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "813",
        //         name: "模块管理",
        //         parentId: "7",
        //         path: "/ModelManage"
        //     },
        //     {
        //         children: [],
        //         code: "001002003001",
        //         id: "813",
        //         name: "日志管理",
        //         parentId: "7",
        //         path: "/LogManage"
        //     },

        // ],
        // navTree1:[
        //   {
        //     children: [],
        //     code: "001002003001",
        //     id: "813",
        //     name: "角色管理",
        //     parentId: "7",
        //     path: "/RoleManage"
        //   },
        //   {
        //     children: [],
        //     code: "001002003001",
        //     id: "813",
        //     name: "用户角色配置",
        //     parentId: "7",
        //     path: "/UserRoleSet"
        //   },
        // ],
        // navTree2:[
        //   {
        //     children: [],
        //     code: "001002003001",
        //     id: "813",
        //     name: "菜单查看权",
        //     parentId: "7",
        //     path: "/MenuViewRight"
        //   },
        //   {
        //     children: [],
        //     code: "001002003001",
        //     id: "813",
        //     name: "增删改权",
        //     parentId: "7",
        //     path: "/Add"
        //   },
        //   {
        //     children: [],
        //     code: "001002003001",
        //     id: "813",
        //     name: "部门查看权",
        //     parentId: "7",
        //     path: "/DepartViewRight"
        //   },
        //   {
        //     children: [],
        //     code: "001002003001",
        //     id: "813",
        //     name: "区域查看权",
        //     parentId: "7",
        //     path: "/AreaViewRight"
        //   },
        // ],
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '部门管理', method: () => { window.histroy.back() } }
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
      options1: [{
          value: '选项1',
          label: '第一级'
        }, {
          value: '选项2',
          label: '第二级'
        }, {
          value: '选项3',
          label: '第三级'
        }],
      options2: [{
          value: '选项1',
          label: '本部门'
        }, {
          value: '选项2',
          label: '其他部门'
        }],
      options3: [{
          value: '选项1',
          label: '是'
        }, {
          value: '选项2',
          label: '否'
        },],
      histroyData: {},
      maxHeight: 0,
      tableShow: true,
      tabData:[
        {
          departName:"公司领导",
          departLevel:'第一级',
          departCode:"0100010001",
          departType:"其他部门",
          principal:'何志森',
          telphone:"87899566",
          telphoneNum:"15556234896",
          orderBy:"1.0",
          remark:'测试数据111111',
          position: "是",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          departName:"营业部",
          departLevel:'第一级',
          departCode:"0100010002",
          departType:"其他部门",
          principal:'时文喜',
          telphone:"87899566",
          telphoneNum:"15556234896",
          orderBy:"1.0",
          remark:'测试数据2222',
          position: "是",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          departName:"客服中心",
          departLevel:'第一级',
          departCode:"0100010002",
          departType:"其他部门",
          principal:'贺征发',
          telphone:"87899566",
          telphoneNum:"15556234896",
          orderBy:"1.0",
          remark:'测试数据333',
          position: "是",
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
      this.$changeTable(this, '.depart-manage .depart-manage-right', ['.depart-manage .table-top'])
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
.depart-manage {
  .depart-manage-right-content {
    height: 87%;
    overflow-y: auto;
    // margin-top: 1rem;
  }
  .btn-area{
    .el-button{
      float: right;
    }
  }
  .kl-table {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
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
</style>


