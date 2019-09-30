
<template>
  <div class="WaterPrice">
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
           <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加行</el-button>
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
        <WaterPriceEdit ref="childWarehousing"></WaterPriceEdit>
      </div>
       

      <div v-else class="admin-region-right-content">        
 
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
              
              <el-form-item class="form-left">

                  <el-form-item label="状态：" >
                    <el-select v-model="formInline.paramState" placeholder="请选择状态">
                      <el-option label="启用" value="1"></el-option>
                      <el-option label="停用" value="0"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="模糊查询：" class="searchInput">
                      <el-input v-model="formInline.areaName" clearable placeholder="用水类型"></el-input>
                  </el-form-item>

                  <el-form-item>
                      
                      <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                  </el-form-item>
                  
              </el-form-item>
              
              <!-- <el-form-item class="form-right">
                  <el-button  size="mini" icon="el-icon-plus" type="primary" @click="add">添加</el-button>

              </el-form-item> -->
          </el-form>
        </div>

        <div class="WaterPrice-right-content">
          <div class="kl-table">
            <el-table 
                      v-if="tableShow" 
                      :max-height="maxHeight" 
                      stripe border 
                      :data="tableData" 
                      @cell-click="cellClick" 
                      class="wuserInfo-table">
              <!-- <el-table-column min-width="45" type="selection" fixed="left" ></el-table-column> -->


              <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
              </el-table-column>


              <el-table-column prop="type" min-width="100" label="用水类型">
              </el-table-column>

              <el-table-column prop="breakLevel" min-width="180" label="违约金策略">
              </el-table-column>


              <el-table-column prop="startTime" min-width="120" label="生效时间">
              </el-table-column>
              
              <el-table-column prop="endTime" min-width="120" label="截至时间">
              </el-table-column>
              

              <el-table-column prop="waterState" min-width="120" label="状态">
              </el-table-column>

              <el-table-column label="操作" width="85">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">编辑</el-button>
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
import WaterPriceEdit from "./WaterPriceEdit"
export default {
  name: "WaterPrice-index",
  components:{
      WaterPriceEdit
  },
  data() {
    return {
      EditVisible:false,//弹出表单
      formInline:{
        areaName:""
      },
      tableData:[
        {
          type:'居民用水',
          breakLevel:"抄表后15天",
          minPrice:'50',
          minDay:'0',
          waterState:'启用',
          remark:'A1',
          setTime:'2018-02-05 09:30:27',
          minBreakPrice:'0',
          count:'2',
          startTime:'2000-01-01',
          endTime:'2050-12-31',
        },
        {
          type:'非居民用水',
          breakLevel:"抄表后2个月",
          minPrice:'50',
          minDay:'0',
          waterState:'启用',
          remark:'A1',
          setTime:'2018-02-05 09:30:27',
          minBreakPrice:'0',
          count:'2',
          startTime:'2000-01-01',
          endTime:'2050-12-31',
        },
      ],
      radio: '1',
      checkList: ['选中且禁用','复选框 A'],
      dialogFormVisible:false,//弹出表单
      form: {
        radio:'1',
        breakPrice1:'',
        breakPrice2:'',
        breakPrice3:'',
        minPrice:'',
        maxLevel:'',
        minDay:'',
        countPrice:'',
        startTime:'',
        countNum:'',
        minBreakPrice:'',
        endTime:'',
        isUse:false,
      },
      formLabelWidth: '9.375rem',
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础配置', path: '/BusinessArea' },
          { title: '价格管理', path: '/WaterType' },
          { title: '用水价格', method: () => { window.histroy.back() } }
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
      this.$changeTable(this, '.WaterPrice .WaterPrice-right', ['.WaterPrice .table-top'])
    })
  },
  methods: {
    init() {

 
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

$imgWidth: 200px;
$theme-color: #297acc;
.WaterPrice {
  .WaterPrice-right-content {
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
      padding: 10px 20px;
      .kr-div1{
        border:1px solid #999;
        height:9rem;
        .el-checkbox{
          margin-left: 0 !important;
        }
      }
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
        .kr-div{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .el-checkbox,.el-radio{
            margin-right: 5px;
          }
          .el-radio, .el-radio__input {
            line-height: 40px;
          }
          .el-input{
            margin-left: .2rem !important;
          }
        }
        .el-checkbox,.el-textarea{
          margin-left:1rem;
        }
        .el-checkbox{
          margin-right: 1rem;
        }
        .el-input {
          width: 10rem;
          // margin-top:.5rem;
          margin-left:1.2rem;
          .el-input__inner{
            width: 10rem !important;
          }
        }
      }
      .el-form-item__label{
        font-size: 12px;
        padding:0;
      }
    }

  }
}
</style>


