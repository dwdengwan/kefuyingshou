<template>
  <div class="industry-category">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
          <i></i>
          行业分类</h2> -->
        <div  class="bread-contain-right" v-if='dialogFormVisible'>
          <el-button size="mini" type="primary">保存</el-button>
          <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div  class="bread-contain-right" v-if='!dialogFormVisible'>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click.native="addEdit(0,null,null)">添加</el-button>
        </div>
      </div>

      <div v-if='!dialogFormVisible'>
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
              
              <!-- <el-form-item class="form-left">

                  <el-form-item label="模糊查询：" class="searchInput">
                      <el-input v-model="formData.con" clearable placeholder="行业名称"></el-input>
                  </el-form-item>

                  <el-form-item>
                      
                      <el-button style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                  </el-form-item>
                  
              </el-form-item> -->
              
              <!-- <el-form-item class="form-right">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="add">添加</el-button>
              </el-form-item> -->
          </el-form>
        </div>
        <div class="industry-category-right-content">
          <div class="kl-table">
            <el-table 
                      v-if="tableShow" 
                      :max-height="maxHeight" 
                      stripe border 
                      center
                      :data="tableData" 
                      @cell-click="cellClick" 
                      class="wuserInfo-table">
              <!-- <el-table-column min-width="45" type="selection" fixed="left" ></el-table-column> -->


              <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
              </el-table-column>


              <el-table-column prop="industryName" min-width="100"  label="角色名称">
              </el-table-column>

              <el-table-column prop="industryRemark" min-width="180" label="角色描述" show-overflow-tooltip>
              </el-table-column>

              <el-table-column prop="industryLastPeople" min-width="80" label="最后修改人"  show-overflow-tooltip>
              </el-table-column>

              <el-table-column prop="industryLastTime" min-width="120" label="最后修改时间"  show-overflow-tooltip>
              </el-table-column>

              <el-table-column label="操作" min-width="90">
                <template slot-scope="scope">
                  <el-button type="text" @click.native = "addEdit(1,scope.$index, scope.row)" style="font-size:12px;text-align:center;">编辑</el-button>
                  <span style="color:#e6e6e6;">|</span>
                  <el-button type="text" @click.native = "addEdit(2,scope.$index, scope.row)" style="font-size:12px;text-align:center;">查看</el-button>
                </template>
              </el-table-column>
              
            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
              </el-pagination>
            </div>
            <el-dialog title="行业分类-增加" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="50%">
              
              <el-form :model="form">
                <el-row>
                  <el-col offset="2" :span="20">
                    <el-form-item label="角色名称:">
                      <el-input 
                                v-model="form.name"
                                placeholder="请输入内容">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col offset="2" :span="20">

                    <!-- <el-form-item label="状态:">
                      <el-select v-model="form.region" placeholder="请选择行业状态">
                        <el-option label="启用" value="shanghai"></el-option>
                        <el-option label="禁用" value="beijing"></el-option>
                      </el-select>
                    </el-form-item> -->

                    <el-form-item label="角色描述:">
                      <el-input 
                                v-model="form.region"
                                placeholder="请输入内容">
                      </el-input>
                    </el-form-item>

                  </el-col>
                </el-row>

                <el-row>
                  <el-col offset="2" :span="20">
                    <!-- <el-form-item label="所属用户:">
                      <el-input 
                                v-model="form.name"
                                placeholder="请输入内容">
                      </el-input>
                    </el-form-item> -->
                    <el-form-item label="所属用户" prop="ownNames" ref="member">
                      <div class="input el-input is-disabled el-input__inner" contenteditable="false"  :class="{'active':activeShow}" @click="treeToggle">
                        <div class="select-member"
                          v-if="RepastMember.length!==0"
                          v-for="(item , index) in RepastMember">
                          <span>{{ item.name }}</span>
                          <i class="el-icon-error" @click.stop="delMember(item,index)"></i>
                        </div>
                        <span style="position:absolute;right:5px;">
                        </span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <el-row>
                  <el-col offset="2" :span="20">
                    <el-form-item label="权限全选:">
                      <el-checkbox v-model='form.desc'></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <tree-table v-if="treeShow" :data="treeData" :columns="columns" border @treeTableData="treeTableData"></tree-table>
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
      <div v-else class="kr-contain">
        <!-- <div  class="toolbar">
          <div class="form-left">

              <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        
          </div>
          <div class="form-right">
              <el-button size="mini" type="primary">保存</el-button>
          </div>
        </div> -->
        <el-form :model="form" style="margin-top: .5rem;">
          <el-row>
            <el-col offset="2" :span="10">
              <el-form-item label="角色名称:">
                <el-input 
                          v-model="form.name" 
                          :disabled="isAddEidt"
                          placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col  :span="10">

              <!-- <el-form-item label="状态:">
                <el-select v-model="form.region" placeholder="请选择行业状态">
                  <el-option label="启用" value="shanghai"></el-option>
                  <el-option label="禁用" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->

              <el-form-item label="角色描述:">
                <el-input 
                          v-model="form.region"
                          :disabled="isAddEidt"
                          placeholder="请输入内容">
                </el-input>
              </el-form-item>

            </el-col>
          </el-row>

          <!-- <el-row style="margin-top:1rem;">
            <el-col offset="2" :span="10">
              <el-form-item label="角色首页:">
                <el-input 
                          v-model="form.name12"
                          placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col offset="2" :span="20">
              <!-- <el-form-item label="所属用户:">
                <el-input 
                          v-model="form.name"
                          placeholder="请输入内容">
                </el-input>
              </el-form-item> -->
              <el-form-item label="所属用户:" prop="ownNames" ref="member" class='kr-form-item'>
                <div 
                    style="margin-top:1rem;"
                    class="input el-input is-disabled el-input__inner" 
                    contenteditable="false"  
                    :class="{'active':activeShow}" 
                    @click="treeToggle">
                  <div class="select-member"
                    v-if="RepastMember.length!==0"
                    v-for="(item , index) in RepastMember">
                    <span>{{ item.name }}</span>
                    <i class="el-icon-error" @click.stop="delMember(item,index)"></i>
                  </div>
                  <span style="position:absolute;right:5px;">
                  </span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col offset="2" :span="20">
              <el-form-item label="权限全选:">
                <el-checkbox v-model='form.desc'></el-checkbox>
              </el-form-item>
            </el-col>
            <!-- <tree-table v-if="treeShow" :data="treeData" :columns="columns" border @treeTableData="treeTableData"></tree-table> -->
          </el-row>

          <el-row>
            <el-table
             :data="tableData1"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column
                label="菜单列表"
                width="180">
                <template slot-scope="scope" @click="iconClick()">
                  <!-- <i class="el-icon-plus" v-if="iconShow" @click="iconClick()"></i>
                  <i class='el-icon-minus' v-else @click="iconClick()"></i> -->
                  <el-checkbox v-model="scope.row.checkAll"></el-checkbox>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="权限列表"
                width="180">
                <template slot-scope="scope">
                  <!-- <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    
                  </el-popover> -->
                  <div slot="reference" class="name-wrapper">
                    <el-checkbox v-model="scope.row.checkAll"></el-checkbox>
                    <span style="margin-left: 10px">查看</span>
                    <el-checkbox v-model="scope.row.checkAll"></el-checkbox>
                    <span style="margin-left: 10px">修改</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          
        </el-form>
        <!-- title="提示" -->
        <el-dialog
          
          :visible.sync="authTreeShow"
          width="30%"
          :before-close="handleClose">
          <div class="auth-tree">
            <div class="top">
              <h2>组织结构树</h2>
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
              </el-input>
              <el-tree class="filter-tree department"
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :filter-node-method="filterNode"
              ref="tree2">
              </el-tree>
            </div>

            <div class="bottom">
              <h2>{{department}}</h2>
              <el-tree
                :data="data2"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps2">
              </el-tree>
            </div>
            <!-- <div class="buttons">
                222222
                <el-button size="small" type="primary" @click="getCheckedNodes">添加</el-button>
                <el-button size="small" type="info" plain @click="resetChecked">退出</el-button>
            </div> -->
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="authTreeShow = false" size='mini'>添加</el-button>
            <el-button @click="authTreeShow = false" size='mini'>返回</el-button>
          </div>
        </el-dialog>
      </div>
  </div>
</template>
<script>
  import treeTable from './userRoleTreeTable/index'
	import authTree from './userRoleTreeTable/authTree'
	import bread from './userRoleTreeTable/breadComponent'
	import breadNav from './userRoleTreeTable/breadNav'
export default {
  
  name: "industry-category-index",
  data() {
    return {
      tableData1: [{
          date: '首页',
          checkAll:false,
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          children: [{
              id: 31,
              date: '水司首页',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '集团首页',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, 
        {
          date: '实时监控',
          checkAll:false,
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '抄表管理',
          checkAll:false,
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, 
        {
          date: '报警管理',
          checkAll:false,
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
      }],
      isAddEidt:false,
      iconShow:true,
      filterText:'',
      treeShow:true,
      all: false,
      authTreeShow: false, // 组织树展示状态
      activeShow: false, // 输入框激活展示状态
      treeData:[
        {
          act: "全选",
          checkAll: true,
          checked: false,
          children:[
            {
              act: null,
              checkAll: true,
              checked: false,
              children: [],
              code: "001002001001",
              id: "4",
              indeterminate: false,
              isLeaf: 1,
              name: "水司首页",
              parent: {
                act: "全选",
                checkAll: true,
                checked: false,
                children: [],
                code: "001002001",
                id: "3",
                indeterminate: false,
                isLeaf: 0,
                name: "首页",
                parentId: null,
                selectchecked: null,
                sonData: null,
                _expanded: true,
                _level: 1,
                _show: true,
              },
              parentId: "3",
              selectchecked: [],
              sonData: [],
              _expanded: true,
              _level: 2,
              _show: true,
            }
          ],
          code: "001002001",
          id: "3",
          indeterminate: false,
          isLeaf: 0,
          name: "首页",
          parentId: null,
          selectchecked: null,
          sonData: null,
          _expanded: true,
          _level: 1,
          _show: true,
        },
      ],
      RepastMember:[],
      columns: [
        {
          text: '菜单列表',
          value: 'name',
          //width: 200,
          option: 'sonData',
          act: 'act'
        },
        {
          text: '权限列表',
          value: 'sonData',
          option: 'sonData',
          //width: 400,
          //act: 'act'
        }
      ],
      formData:{
          con:"",
          watermeterWarehouse:"",
          watermeterWarehouseOptions:[
                {
                  name:"全部",
                  value:"1"
              },
              {
                  name:"已审",
                  value:"2"
              },
              {
                  name:"未审",
                  value:"3"
              },
              {
                  name:"删除",
                  value:"4"
              },
          ],
          waterMeterManufacturer:"",
          waterMeterManufacturerOptions:[],
          waterMeterType:"",
          waterMeterTypeOptions:[],
          waterMeterCaliber:"",
          waterMeterCaliberOptions:[],
          waterMeterStatus:"",
          waterMeterStatusOptions:[],
          subordinateDepartments:"",
          subordinateDepartmentsOptions:[]

      },
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
      formLabelWidth: '100px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/DatabaseManage' },
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '角色管理', method: () => { window.histroy.back() } },
          // {title:'角色管理',path: '/DatabaseManage'}
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
          industryName:'营业管理员',
          industryState:'启用',
          industryRemark:'可查看营业管理员区域',
          industryLastPeople:'焦文',
          industryLastTime:'2019/08/09',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          industryName:'公司领导',
          industryState:'启用',
          industryRemark:'可查看公司所有区域',
          industryLastPeople:'焦文',
          industryLastTime:'2019/08/09',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          industryName:'生产技术科',
          industryState:'启用',
          industryRemark:'可查看生产技术科区域',
          industryLastPeople:'焦文',
          industryLastTime:'2019/08/09',
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
      this.$changeTable(this, '.industry-category .industry-category-right', ['.industry-category .table-top'])
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
    addEdit(num,index,row){
      if(num == 0){
        this.form.name = '';
        this.form.region = '';
        this.$set(this.crumbsData.titleList,"2",{title:'添加',method:()=>{window.histroy.back()}})
      }else if(num == 1){
        this.form.name = row.industryName;
        this.form.region = row.industryRemark;
        this.isAddEidt = false;
        this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}})
      }else if(num == 2){
        this.form.name = row.industryName;
        this.form.region = row.industryRemark;
        // this.isAddEidt = true;
        this.$set(this.crumbsData.titleList,"2",{title:'查看',method:()=>{window.histroy.back()}})
      }
      this.dialogFormVisible = true;
    },
    // add(){//添加
    //   this.$set(this.crumbsData.titleList,"2",{title:'添加',method:()=>{window.histroy.back()}})
    //   this.dialogFormVisible = true;
    // },
    // edit(){
    //   this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}})
    //   this.dialogFormVisible = true;
    // },
    // editEidt(){
    //   this.$set(this.crumbsData.titleList,"2",{title:'查看',method:()=>{window.histroy.back()}})
    //   this.dialogFormVisible = true;
    // },
    closeDialog(){
      this.crumbsData.titleList.splice(2,1);
      this.dialogFormVisible = false;
    },
    treeTableData (data) {
      if (!Array.isArray(data)) {
        data = [data]
      }
      let arr = []
      
      data.forEach(val => {
        let id = val.id
        let flag = false
        let flag1 = false
        let obj1 = {}
        let obj2 = {}
        if (val.children) {
          val.children.forEach(el => {
            //是否有三级的处理
            if(el.children.length === 0){
              let obj = {}
              obj.moduleId = el.id
              if (el.selectchecked.length) {
                obj.operation = el.selectchecked.reduce(function(total,i) {
                      return total + '' +　i
                })
                flag = true
                arr.push(obj)
              }
            }else {
              el.children.forEach(val => {
                let obj = {}
                obj.moduleId = val.id
                if (val.selectchecked.length) {
                  obj.operation = val.selectchecked.reduce(function(total,i) {
                        return total + '' +　i
                  })
                  flag1 = true
                  arr.push(obj)
                  
                }
              })
              if (flag1) {
                obj2.moduleId = el.id
                obj2.operation = ''
                arr.push(obj2)
              }
            }
          })
        }
        //父级的id
        if (flag) {
          obj1.moduleId = id
          obj1.operation = ''
          arr.push(obj1)
        }
      })
      //arr = arr.join().split(',').filter(n => { return n })
      this.ruleForm.rModuleBeans = arr
    },
    activeBlur() {
      this.activeShow = false
      this.authTreeShow = false
    },
    // 图标显示
    iconShow (index, record) {
      if (record.isLeaf !== 3) {
  			if(index === 0 && record.isLeaf === 0){
					return true
				} else {
					return false
				}
  		} else {
    		return (index === 0 && record.children && record.children.length > 0)
    	}
    },
    toggleExpanded(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    delMember(row,index) {
      this.RepastMember.splice(index,1)
    },
    treeToggle() {
      console.log(1111);
      this.activeShow = true;
      this.authTreeShow = true
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    iconClick(){
      if(this.iconShow){
        this.$set(this,'iconShow',false);
      }else{
        this.$set(this,'iconShow',true);
      }
      console.log(this.iconShow);
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
    treeData(){
      this.treeShow = false
      this.$nextTick(()=>{
        this.treeShow = true
      })
    },
    all(val) {
      let data = this.treeData
      if(val){
        for(let i = 0; i< data.length; i++) {
          //判断isLeaf 是否为3
          if(data[i].isLeaf === 3) {
            data[i].checkAll = true
            data[i].indeterminate = false
            let d = data[i].children
            d.forEach(el => {
              if (el.children.length === 0) {
                let d = el.sonData
                el.checkAll = true
                el.indeterminate = false
                for(let j = 0; j< d.length; j++) {
                  el.selectchecked.push(d[j].id)
                }
              } else {
                el.checkAll = true
                el.indeterminate = false
                el.children.forEach(val => {
                  let d = val.sonData
                  val.checkAll = true
                  val.indeterminate = false
                  for(let j = 0; j< d.length; j++) {
                    val.selectchecked.push(d[j].id)
                  }
                })
              }
            })
          } else {
            let arr = data[i].children
            data[i].checkAll = true
            for(let k in arr){
              let arr1 = arr[k].sonData
              arr[k].checkAll = true
              arr[k].indeterminate = false
              for(let j = 0; j< arr1.length; j++) {
                arr[k].selectchecked.push(arr1[j].id)
              }
            }
          }
        }
      } else {
        //全不选状态
        for(let i = 0; i< data.length; i++) {
          let arr = data[i].children
          data[i].checkAll = false
          for(let k in arr){
            arr[k].selectchecked = []
            arr[k].checkAll = false
            arr[k].indeterminate = false
            if(arr[k].children.length > 0) {
              let d = arr[k].children
              for(let i in d){
                d[i].selectchecked = []
                d[i].checkAll = false
                d[i].indeterminate = false
              }
            }
          }
        }
      }
    },
  }
}
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.industry-category {
  $color-blue: #2196F3;
  $space-width: 18px;
  .my-input {
    width: 25%;
    display: inline-block;
    padding-left: 4%;
    .el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .industry-category-right-content {
    height: 87%;
    overflow-y: auto;
    .el-dialog{
      height: 70% !important;
      .el-dialog__body{
        // padding:20px;
        .info{
          background: #666;
          color:#fff;
          height: 1.5rem;
          line-height: 1.5rem;
          padding:0 1rem;
          font-size: 14px;
        }
        .el-form-item__label{
            width: 4.375rem;
        }
        .el-form-item__content{
          height: 2.5rem;
          width: 90%;
          .el-input {
            width: 25rem;
            // margin-top:.5rem;
            margin-left:1.2rem;
            .el-input__inner{
              width: 25rem !important;
            }
          }
          .el-textarea{
            // width: 75%;
            width: 25rem;
            margin-left:1rem;
          }
        }
        .el-form-item__label{
          font-size: 12px;
        }
      }
      .el-dialog__footer{
        // margin-top: 2rem;
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
  .kr-contain{
    .el-dialog{
      margin-left:70% !important; 
      .el-dialog__header{
        display: none;
      }
      .el-dialog__body{
        height: calc(100% - 70px) !important;
      }
    }
    .el-table{
      width: 80% !important;
      margin-left: 7rem;
      .el-table__header{
        width: 100% !important;
      }
      .el-table__body{
        .el-checkbox {
          margin-right: 0px;
          margin-left: 10px;
        }
      }
    }
    .el-form{
      .el-form-item{
        margin-bottom: 0;
        .el-form-item__content{
          .el-input{
            width: 80%;
          }
          .is-disabled{
            width: 90%;
          }
        }
      }
      .kr-form-item{
        .el-form-item__label{
          margin-top: 1rem;
        }
      }
    }
    .auth-tree{
      background: #fff;
      h2{
        padding: 0;
        margin: 0;
        background: #3193f5;
        color: #fff;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
      }

      height: 100%;
      .top{
        height: calc(50% - 25px);
        .el-tree{
          height: calc(100% - 80px);
          overflow-y: scroll;
        }
      }
      .bottom{
        height: calc(50% - 25px);
        .el-tree{
          height: calc(100% - 40px);
          overflow-y: scroll;
        }
      }
      .buttons{
        padding: 5px;
        text-align: center;
      }
    }
      
    .ms-tree-space {
      position: relative;
      top: 1px;
      display: inline-block;
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      width: $space-width;
      height: 24px;
      &::before {
        content: ""
      }
    }
    .processContainer{
      width: 100%;
      height: 100%;
    }
    table td {
      line-height: 26px;
      text-align: left;
    }

    .tree-ctrl{
      position: relative;
      cursor: pointer;
      color: $color-blue;
      margin-left: -$space-width;
    }
    
  }
}
</style>