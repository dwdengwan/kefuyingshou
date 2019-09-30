<template>
  <div class="QualityReading">
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
          <el-button  @click="closeDia" type="primary" size='mini'>选择水表</el-button>
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-if="huitianVisible">
          <!-- <el-button  @click="closeDia" type="primary" size='mini'>选择水表</el-button> -->
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-if="!EditVisible && !huitianVisible">
            <el-button size="mini" icon="el-icon-plus" @click="add" type="primary">添加</el-button>
        </div>
      </div>

      <div v-if="EditVisible">
        <QualityReadingEdit ref="childWarehousing"></QualityReadingEdit>
      </div>
      <div v-if="huitianVisible">
        <QualityReadingHuiTian></QualityReadingHuiTian>
      </div>

      <div v-if="!EditVisible && !huitianVisible" >
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
              
              <el-form-item class="form-left">
                  <el-form-item label="账期：">
                       <el-date-picker
                        v-model="formInline.month"
                        type="month"
                        placeholder="选择账期">
                        </el-date-picker>

                  </el-form-item>
                  <!-- <el-form-item label="抄表日期：" >
                       <el-date-picker
                        v-model="formInline.checkDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                  </el-form-item> -->
                      
                      <el-button class='searchBtn' icon="el-icon-search"></el-button>
                  
              </el-form-item>
              
              <!-- <el-form-item class="form-right">
                  <el-button icon="el-icon-plus"   size="mini" type="primary" @click="add">添加</el-button>
              </el-form-item> -->
          </el-form>
        </div>
        <div class="QualityReading-right-content">
          <div class="kl-table">
            <el-table 
                      stripe border 
                      :data="tableData" 
            
                      class="wuserInfo-table">
              <el-table-column type="index" label="序号" fixed="left" width="50">
              </el-table-column>


              <el-table-column prop="waterLadder" min-width="80" label="单据编号">
              </el-table-column>


              <el-table-column prop="waterSelect" min-width="80" label="账期">
              </el-table-column>


              <!-- <el-table-column prop="waterLadder" min-width="80" label="抄表日期">
              </el-table-column> -->


              <el-table-column prop="remark" min-width="120" label="备注">
              </el-table-column>

              <el-table-column prop="waterSelect" min-width="80" label="抽检数量">
              </el-table-column>

              <el-table-column prop="waterState" min-width="120" label="制单日期">
              </el-table-column>


              <el-table-column prop="waterSelect" min-width="80" label="制单人">
              </el-table-column>

              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click.native="backEdit(scope.$index, scope.row)">回填</el-button>
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
      </div>
  </div>
</template>
<script>
import QualityReadingEdit from "./QualityReadingEdit"
import QualityReadingHuiTian from "./QualityReadingHuiTian"
export default {
  components:{
      QualityReadingEdit,
      QualityReadingHuiTian
  },
  name: "QualityReading-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      huitianVisible: false,
      fareDate:["2019-07-01","2019-07-05"],
      dialogFormVisible:false,//弹出表单
      tableData:[
        {
          waterLadder:'优惠策略1',
          waterSelect:'水费、污水费',
          waterState:'启用',
          remark:''
        },
        {
          waterLadder:'优惠策略2',
          waterSelect:'水费',
          waterState:'启用',
          remark:''
        },
        {
          waterLadder:'优惠策略3',
          waterSelect:'水费、污水费',
          waterState:'启用',
        },
      ],
      //   查询表单
      formInline: {
        month:'',
        checkDate:'',
      },
      form: {
        ladderType:'month',
        waterSelect:'',
        priceModel:'',
        mixtrueSelect:'',
        waterLevel:'',
        waterValue:false,
        startTime:'',
        endTime:'',
        bulidReson:'',
        priceDetail:'04',
        state:'1',
        bulidTime:'',
        updateReson:'',
        updataTime:'',
        remark:'',
      },
      formLabelWidth: '100px',
      crumbsData: {  //面包屑`    
        titleList: [
          { title: '基础配置', path: '/BusinessArea' },
          { title: '异常', path: '/WaterType' },
          { title: '抄表质量检查', method: () => { window.histroy.back() } }
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
      options1: [
        {
          value: 10,
          label: '包含当前'
        },
        {
          value: 11,
          label: '全部时间'
        },
      ],
      options2: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '停用'
        },
      ],
      options3: [
        {
          value: '01',
          label: '0015_特种用水1.67'
        },
        {
          value: '02',
          label: '0029_区域用水'
        },
        {
          value: '03',
          label: '0030_基本用水1.30'
        }
      ],
      options4: [
        {
          value: '04',
          label: 'ZBSF_水费'
        },
        {
          value: '05',
          label: 'SZYF_污水处理费'
        },
        {
          value: '06',
          label: 'SSCLF_省水处理费'
        }
      ],
      histroyData: {},
      tableShow: false,
      tableList: [
        {
          startUsage:"0",
          endUsage: '14',
          price: "2.68",
          coefficient: "1.0",
          stageMoney: "0",
        },
        {
          startUsage:"15",
          endUsage: "28",
          price: "4.68",
          coefficient: "1.0",
          stageMoney: "37.52",
        },
        {
          startUsage:"",
          endUsage: "",
          price: "",
          coefficient: "",
          stageMoney: "",
        },
      ],
    }
  },
  mounted() {
    this.init();
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
    backEdit(){
      this.$set(this.crumbsData.titleList, "3", { title: '回填', method: () => { window.histroy.back() } })
      this.huitianVisible = true;
    },
    closeDialog(){ //关闭会话
      this.crumbsData.titleList.splice(3, 1);
      this.EditVisible = false;
      this.huitianVisible = false;
    },
    closeDia(){
      eventBus.$emit('ccccc', true);
    },
    handleCurrentChange(){

    },
    handleSizeChange(){

    }
  },
  watch: {
  }
}
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.QualityReading {
  .btn-area{
    .btn-area-right{
      .el-form {
        .el-form-item__label{
          margin-top:1.2rem;
          margin-left: 1.1rem;
        }
        .el-input{
          padding: 1.3rem 0 0 0 !important;
          .el-input__inner{
            width: 7.5rem;
          }
          
            .el-input__suffix{
              top:10px !important;
            }
        }
        .el-button{
          width: 3rem;
        }
      }
    }
  }
  .QualityReading-right-content {
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
      padding:10px 20px 0px;
      .info{
        background: #f5f5f5;
        color:#000;
        height: 1.5rem;
        line-height: 1.5rem;
        padding:0 1rem;
        font-size: 14px;
      }
      // .el-form-item__content{
      //   height: 2.5rem;
      //   width: 40%;
      //   .el-input {
      //     width: 15rem;
      //     margin-top:.5rem;
      //     margin-left:1.2rem;
      //     .el-input__inner{
      //       width: 100%!important;
      //     }
      //   }
      //   .el-textarea{
      //     height: 100%;
      //     margin-left: 1rem;
      //     width: 100%;
      //     .el-textarea__inner{
      //       height: 100%;
      //     }
      //   }
      // }
      .el-form-item__label{
        font-size: 12px;
      }
      .el-table{
        margin-top:1rem;
      }
    }

    #kr-form-item{
      .el-form-item__content{
        display: flex;
        #waterValue{
          margin-left: 1rem;
        }
        .el-input{
          width: 10rem;
          #waterLevel{
            width: 10rem !important;
          }
        }
      }
    }
  }
}
</style>

