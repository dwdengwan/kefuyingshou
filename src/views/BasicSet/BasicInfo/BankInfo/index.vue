<template>
  <div class="bank-info">
    
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
        <BankInfoEdit ref="childWarehousing"></BankInfoEdit>
      </div>

     
      <div v-else class="bank-info-right-content">
        <div class="kr-right">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kr-left">
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                
                <el-form-item class="form-left">
                </el-form-item>
                
                <!-- <el-form-item class="form-right">
                    <el-button icon="el-icon-plus" size="mini" type="primary" @click="add">添加</el-button>
                </el-form-item> -->
            </el-form>
          </div>
          <el-table 
              v-if="tableShow" 
              :max-height="maxHeight" 
              stripe border 
              :data="tableData" 
              @cell-click="cellClick" 
              class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod"></el-table-column>

            <el-table-column prop="meter" min-width="100" label="银行编号">
            </el-table-column>

            <el-table-column prop="meter" min-width="100" label="上级银行">
            </el-table-column>

            <el-table-column prop="bankName" min-width="100" label="银行名称">
            </el-table-column>

            <el-table-column prop="bankCode" min-width="100" label="银行行号">
            </el-table-column>

            <el-table-column prop="linkMan" min-width="100" label="联系人">
            </el-table-column>

            <el-table-column prop="linkTel" min-width="100" label="联系电话">
            </el-table-column>

            <el-table-column prop="desc" min-width="100" label="备注">
            </el-table-column>

            <el-table-column prop="state" min-width="80" label="状态">
            </el-table-column> 

            <el-table-column prop="sort" min-width="100" label="排序号">
              
            </el-table-column>

            <el-table-column label="操作" width="85">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="edit">编辑</el-button>
              </template>
            </el-table-column>

            
          </el-table>
          <!-- 分页 -->
          <!-- <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div> -->
        </div>
      </div>
  </div>
</template>
<script>
import BankInfoEdit from "./BankInfoEdit"

export default {
  components:{
      BankInfoEdit,
  },
  name: "bank-info-index",
  data() {
    return {
      EditVisible:false,//弹出表单
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
          desc: ''
        },
      formLabelWidth: '100px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础配置', path: '/BusinessArea' },
          { title: '基础信息', path: '/BusinessArea' },
          { title: '银行信息', method: () => { window.histroy.back() } }
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
          areaName: "农商银行",
          areaValue:'农商银行客服营收系统已启用',
          region: '1',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaState:'启用',
          areaName: "农商银行",
          areaValue:'农商银行客服营收系统已启用',
          region: '1',
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaState:'启用',
          areaName: "农商银行",
          areaValue:'农商银行客服营收系统已启用',
          region: '1',
          id: null,
          page: 1,
          pageCount: 20,
        }
      ],
      treeDatas: {
        tree: [{ foreignkey: '全部', id: '222', _child: 
                                                      [
                                                        { foreignkey: '01_中国银行', id: '222', _child: 
                                                                                              [{ foreignkey: '广州白云支行', id: '222' }, 
                                                                                              { foreignkey: '广州新市支行', id: '222' }, 
                                                                                              { foreignkey: '广州花都花东支行', id: '222' }] },
                                                        { foreignkey: '02_建设银行', id: '222', _child: 
                                                                                              [{ foreignkey: '广州南方医院支行', id: '222' }, 
                                                                                              { foreignkey: '广州富力桃园支行', id: '222' }, 
                                                                                              { foreignkey: '广州沙太南路支行', id: '222' }, 
                                                                                              { foreignkey: '广州太和支行', id: '222' }] }
                                                      ]
                 }],
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
      this.$changeTable(this, '.bank-info .bank-info-right', ['.bank-info .table-top'])
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
@import "../../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.bank-info {
    height: 100%;
  .bank-info-right-content {
    height: calc(100% - 41px);
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    .kr-right{
      width: 20%;
      height: 100%;
      // border: 2px solid red;
    }
    .kr-left{
      width: 80%;
      height: 100%;
      padding-left:1rem;
      padding-right:1rem;
    }
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
            width: 25rem;
            margin-left:1rem;
          }
        }
        .el-form-item__label{
          width: 5rem;
          font-size: 12px;
        }
      }

    }
  }
  
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
  .kr-left {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
}
</style>


