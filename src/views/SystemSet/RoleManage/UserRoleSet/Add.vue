<template>
  <div class="user-role-set">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <h2 class="tab-title">
          <i></i>
          用户角色配置</h2>
      </div>
      <div class="btn-area">
        <el-button @click="add()">添加</el-button>
      </div>
      <div class="user-role-set-right-content">
        <div class="kl-table">
          <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="histroyData.list" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

            <el-table-column type="index" label="序号" width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column label="操作" width="85">
              <template slot-scope="scope">
                <el-button type="text" @click.native="edit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>

            <el-table-column prop="daytime" min-width="100" label="服务器编号">
            </el-table-column>

            <el-table-column prop="areaName" min-width="80" label="服务器名称">
            </el-table-column>

            <el-table-column prop="lvalue" min-width="80" label="数据库名称">
            </el-table-column>

            <el-table-column prop="fixValue" min-width="80" label="IP地址">
            </el-table-column>

            <el-table-column prop="position" min-width="150" label="服务器端口" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="position" min-width="100" label="状态" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="concentrator" min-width="120" label="备注">
            </el-table-column>
            
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: "user-role-set-index",
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
      navTree:[
                 {
                    children: [],
                    code: "001002003001",
                    id: "819",
                    name: "数据库管理",
                    parentId: "7",
                    path: "/DatabaseManage"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "818",
                    name: "应用系统管理",
                    parentId: "7",
                    path: "/ApplicationSystemManage"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "817",
                    name: "微信公众号管理",
                    parentId: "7",
                    path: "/WeChat"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "816",
                    name: "组织管理",
                    parentId: "7",
                    path: "/OrganizaManage"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "815",
                    name: "水司管理",
                    parentId: "7",
                    path: "/WaterManage"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "814",
                    name: "部门管理",
                    parentId: "7",
                    path: "/DepartManage"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "813",
                    name: "用户管理",
                    parentId: "7",
                    path: "/UserManage"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "813",
                    name: "模块管理",
                    parentId: "7",
                    path: "/ModelManage"
                },
                {
                    children: [],
                    code: "001002003001",
                    id: "813",
                    name: "日志管理",
                    parentId: "7",
                    path: "/LogManage"
                },
    
            ],
      navTree1:[
        {
          children: [],
          code: "001002003001",
          id: "813",
          name: "角色管理",
          parentId: "7",
          path: "/RoleManage"
        },
        {
          children: [],
          code: "001002003001",
          id: "813",
          name: "用户角色配置",
          parentId: "7",
          path: "/UserRoleSet"
        },
      ],
      navTree2:[
        {
          children: [],
          code: "001002003001",
          id: "813",
          name: "菜单查看权",
          parentId: "7",
          path: "/MenuViewRight"
        },
        {
          children: [],
          code: "001002003001",
          id: "813",
          name: "增删改权",
          parentId: "7",
          path: "/Add"
        },
        {
          children: [],
          code: "001002003001",
          id: "813",
          name: "部门查看权",
          parentId: "7",
          path: "/DepartViewRight"
        },
        {
          children: [],
          code: "001002003001",
          id: "813",
          name: "区域查看权",
          parentId: "7",
          path: "/AreaViewRight"
        },
      ],
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          { title: '角色管理', path: '/RoleManage' },
          { title: '数据库管理', method: () => { window.histroy.back() } }
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
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.user-role-set .user-role-set-right', ['.user-role-set .table-top'])
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
@import "../../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.user-role-set {
  .user-role-set-right-content {
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
}
</style>


