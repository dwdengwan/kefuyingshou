<template>
  <div class="price-info">
    
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
        <!-- <el-dialog title="费用明细-增加" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="60%">
            <legend class="info">费用明细</legend>
            <el-form :model="form" :inline="true">

                  <el-form-item label="阶梯类型:" :label-width="formLabelWidth">
                    <el-select v-model="form.ladderType" placeholder="请选择阶梯类型">
                      <el-option label="非阶梯" value="anchaobiaoqi"></el-option>
                      <el-option label="日阶梯" value="date"></el-option>
                      <el-option label="月阶梯" value="month"></el-option>
                      <el-option label="年阶梯" value="year"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="费用名称:" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.priceDetail"
                      placeholder="请选择费用明细:"
                    >
                      <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                     <el-form-item label="状态:" :label-width="formLabelWidth">
                    <el-select v-model="form.state" placeholder="请选择状态">
                      <el-option label="启用" value="1"></el-option>
                      <el-option label="禁用" value="0"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="备注:" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off" type="textarea" placeholder="请输入备注"></el-input>
                  </el-form-item>
        

              <legend class="info">价格阶梯</legend>

            </el-form>



            <el-table 
                    stripe border 
                    :data="tableList" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="startUsage" min-width="100" label="开始水量">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.startUsage"
                    placeholder="请输入开始水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="endUsage" min-width="100" label="结束水量">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.endUsage"
                    placeholder="请输入结束水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="price" min-width="100" label="单价">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.price"
                    placeholder="请输入单价">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="coefficient" min-width="100" label="系数">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.coefficient"
                    placeholder="请输入系数">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="stageMoney" min-width="100" label="阶段起始金额">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.stageMoney"
                    placeholder="请输入阶段起始金额">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;">删除</el-button>
                </template>
              </el-table-column>

            </el-table>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false" size='mini'>返回</el-button>
            </div>
          </el-dialog>
       -->
      <div v-if="EditVisible">
        <PriceInfoEdit ref="childWarehousing"></PriceInfoEdit>
      </div>
       

      <div v-else >
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
              
              <el-form-item class="form-left">
                  <el-form-item label="时间：">
                    <el-date-picker
                        v-model="fareDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="状态：">
                    <el-select
                      v-model="formInline.areaState"
                      placeholder="请选择状态"
                    >
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="模糊查询：" class="searchInput">
                      <el-input v-model="formInline.areaName" clearable placeholder="用水类型/费用名称"></el-input>
                  </el-form-item>

                  <el-form-item>
                      
                      <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                  </el-form-item>
                  
              </el-form-item>
              
              <!-- <el-form-item class="form-right">
                  <el-button icon="el-icon-plus"   size="mini" type="primary" @click="add">添加</el-button>
              </el-form-item> -->
          </el-form>
        </div>
        <div class="price-info-right-content">
          <div class="kl-table">
            <el-table 
                      stripe border 
                      :data="tableData" 
                      @cell-click="cellClick" 
                      class="wuserInfo-table">
              <el-table-column type="index" label="序号" fixed="left" width="50" :index="indexMethod">
              </el-table-column>


              <el-table-column prop="waterLadder" min-width="80" label="明细名称">
              </el-table-column>


              <el-table-column prop="waterLadder" min-width="80" label="阶梯类型">
              </el-table-column>

              <!-- <el-table-column prop="waterSelect" min-width="100" label="用水类型">
              </el-table-column> -->

              <el-table-column prop="waterName" min-width="80" label="费用名称">
              </el-table-column>

              <el-table-column prop="waterPrice" min-width="80" label="综合单价">
              </el-table-column>

              <el-table-column prop="waterCount" min-width="100" label="计算单位">
              </el-table-column>
              <el-table-column prop="waterCount" min-width="100" label="人口基数">
              </el-table-column>
              <el-table-column prop="waterCount" min-width="100" label="水量基数">
              </el-table-column>

              <el-table-column prop="waterState" min-width="100" label="状态">
              </el-table-column>

              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <el-button type="text" style="font-size: 12px;" @click.native="edit(scope.$index, scope.row)">编辑</el-button>
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
import PriceInfoEdit from "./PriceInfoEdit"
export default {
  components:{
      PriceInfoEdit,
  },
  name: "price-info-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      fareDate:["2019-07-01","2019-07-05"],
      dialogFormVisible:false,//弹出表单
      tableData:[
        {
          waterLadder:'月阶梯',
          waterSelect:'0015_特低用水1.67',
          waterName:'水费',
          waterPrice:'1.670',
          waterRate:'1.0',
          waterValue:'',
          waterStart:"2010-01-01",
          waterEnd:'2050-12-31',
          waterCount:'-',
          waterState:'启用',
        },
        {
          waterLadder:'日阶梯',
          waterSelect:'0015_特低用水1.67',
          waterName:'水费',
          waterPrice:'1.670',
          waterRate:'1.0',
          waterValue:'',
          waterStart:"2010-01-01",
          waterEnd:'2050-12-31',
          waterCount:'-',
          waterState:'启用',
        },
        {
          waterLadder:'日阶梯',
          waterSelect:'0015_特低用水1.67',
          waterName:'水费',
          waterPrice:'1.670',
          waterRate:'1.0',
          waterValue:'',
          waterStart:"2010-01-01",
          waterEnd:'2050-12-31',
          waterCount:'-',
          waterState:'启用',
        },
      ],
      //   查询表单
      formInline: {
        areaTime:'',
        areaState:'1',
        areaName:''
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
          { title: '价格管理', path: '/WaterType' },
          { title: '费用明细', method: () => { window.histroy.back() } }
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
  }
}
</script>
<style lang="scss">
@import "../../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.price-info {
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
  .price-info-right-content {
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
      .el-form-item__content{
        height: 2.5rem;
        width: 40%;
        .el-input {
          width: 15rem;
          // margin-top:.5rem;
          margin-left:1.2rem;
          .el-input__inner{
            width: 15rem !important;
          }
        }
        .el-textarea{
          height: 100%;
          margin-left: 1rem;
          width: 15rem;
          .el-textarea__inner{
            height: 100%;
          }
        }
      }
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

