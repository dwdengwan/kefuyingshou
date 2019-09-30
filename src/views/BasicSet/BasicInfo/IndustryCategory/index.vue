<template>
  <div class="industry-category">
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add" type="primary">添加</el-button>
        </div>
      </div>
    
 
      <!-- <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div> -->

      
      <div v-if="EditVisible">
          <IndustryCategoryEdit ref="childWarehousing"></IndustryCategoryEdit>
        </div>

        <div v-else>
          <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                  
                  <el-form-item class="form-left">

                      <el-form-item label="行业名称：" class="">
                          <el-input v-model="formData.con" clearable placeholder="行业名称"></el-input>
                      </el-form-item>

                      <el-form-item>
                          
                          <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                      </el-form-item>
                      
                  </el-form-item>
                  
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


                <el-table-column prop="industryName" min-width="100"  label="行业名称">
                </el-table-column>

                <el-table-column prop="industryRemark" min-width="200" label="备注"  show-overflow-tooltip>
                </el-table-column>

                <el-table-column prop="industryState" min-width="80" label="状态" >
                </el-table-column>

                <el-table-column prop="industrySort" min-width="80" label="排序号" >
                </el-table-column>

                <el-table-column label="操作" width="70">
                  <template slot-scope="scope">
                    <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;text-align:center;">编辑</el-button>
                  </template>
                </el-table-column>
                
              </el-table>
              <!-- 分页 -->
              <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
                </el-pagination>
              </div>
              <!-- <el-dialog title="行业分类-增加" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="50%">
                
                <el-form :model="form">
                  <el-row>
                    <el-col offset="2" :span="20">
                      <el-form-item label="行业名称:">
                        <el-input 
                                  v-model="form.name"
                                  placeholder="请输入内容">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col offset="2" :span="20">
                      <el-form-item label="行业说明:">
                        <el-input 
                                  v-model="form.desc"
                                  placeholder="请输入内容">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col offset="2" :span="20">

                      <el-form-item label="状态:">
                        <el-select v-model="form.region" placeholder="">
                          <el-option label="启用" value="1"></el-option>
                          <el-option label="禁用" value="0"></el-option>
                        </el-select>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col offset="2" :span="20">
                      <el-form-item label="排序号:">
                        <el-input 
                                  v-model="form.sort"
                                  placeholder="请输入排序号">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogFormVisible = false" size='mini'>保存</el-button>
                  <el-button @click="dialogFormVisible = false" size='mini'>返回</el-button>
                </div>
              </el-dialog> -->
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import IndustryCategoryEdit from "./IndustryCategoryEdit"

export default {
  components:{
      IndustryCategoryEdit,
  },
  name: "industry-category-index",
  data() {
    return {
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
          region: '1',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          sort: '',
          desc: ''
        },
      formLabelWidth: '100px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础配置', path: '/BusinessArea' },
          { title: '基础信息', path: '/BusinessArea' },
          { title: '行业分类', method: () => { window.histroy.back() } }
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
          industryName:'居民',
          industryState:'启用',
          industryRemark:'居民生活用水',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          industryName:'学校',
          industryState:'启用',
          industryRemark:'各类托儿所,幼儿园,中专,职业高中...',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          industryName:'公共事业',
          industryState:'启用',
          industryRemark:'市政,公园,环卫,绿化...',
          id: null,
          page: 1,
          pageCount: 20,

        },
      ],
      EditVisible:false,//弹出表单
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
    
    add(){//添加
      this.EditVisible = true;
      this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })

    },
    edit(){
      this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
      this.EditVisible = true;
    },
    closeDialog(){ //关闭会话
      this.crumbsData.titleList.splice(3, 1);
      this.EditVisible = false;
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
.industry-category {
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
  
}
</style>



