<template>
  <div class="caliber-info">
        
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
      
      <div v-if="EditVisible">
        <CaliberInfoEdit ref="childWarehousing"></CaliberInfoEdit>
      </div>

      <div v-else >
           <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                  <el-form-item class="form-left">

                      <el-form-item label="口径值：" class="">
                        <el-input v-model="formData.con" clearable size="mini" placeholder="口径值"></el-input>
                      </el-form-item>

                      <el-form-item>
                          
                          <el-button class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
                      </el-form-item>
                      
                  </el-form-item>
                  <el-form-item class="form-right">
                      
                  </el-form-item>
              </el-form>
          </div>

          <div class="caliber-info-right-content">
              <div class="kl-table">

                <el-table 
                          v-if="tableShow" 
                          :max-height="maxHeight" 
                          stripe border 
                          :data="tableData" 
                          @cell-click="cellClick" 
                          class="wuserInfo-table">

                  <el-table-column type="index" label="NO." width="50" :index="indexMethod">
                  </el-table-column>
                  
                  <el-table-column prop="name" min-width="70" label="口径名称">
                  </el-table-column>

                  <el-table-column prop="value" min-width="100" label="口径值">
                  </el-table-column>


                  <el-table-column prop="cumulative" min-width="100" label="累积流量">
                  </el-table-column>
                  <el-table-column prop="number" min-width="120" label="表码位数">
                  </el-table-column>
                  <el-table-column prop="oldWeek" min-width="120" label="旧表换表周期">
                  </el-table-column>

                  <el-table-column prop="newWeek" min-width="120" label="新表换表周期">
                  </el-table-column>

                  <el-table-column prop="resident" min-width="100" label="居民容量水价" show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column prop="nonResident" min-width="100" label="非居民容量水价" show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column label="操作" width="70">
                    <template slot-scope="scope">
                      <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;text-align:center;">编辑</el-button>
                    </template>
                  </el-table-column>

                </el-table>
            </div>
          
        </div>
        
      </div>
  </div>
</template>
<script>
import CaliberInfoEdit from "./CaliberInfoEdit"

export default {
  name: "caliber-info-index",
  components:{
      CaliberInfoEdit,
  },
  data() {
    return {
      EditVisible:false,//弹出表单
      formData:{},
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
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础配置', path: '/BusinessArea' },
          { title: '基础信息', path: '/BusinessArea' },
          { title: '水表口径', method: () => { window.histroy.back() } }
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
      options2: [
        {
          value: '04',
          label: '1'
        },
        {
          value: '05',
          label: '2'
        },
        {
          value: '06',
          label: '3'
        },
      ],
      options1: [
        {
          value: '01',
          label: '启用'
        },
        {
          value: '02',
          label: '禁用'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      tabsData:[
        {
          name1:'11',
          name2:'22',
          name3:false,
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
          name3:true,
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
          name3:true,
          name4:'4444',
          name5:'5555',
          name6:'6666',
          name7:'7777',
          name8:'8888',
          name9:'9999',
          name10:'10101010',
        },
      ],
      tableData:[
        {
          name: "DN15",
          value:  "15",
          cumulative:'7000',
          number:'4',
          oldWeek:'72',
          newWeek:'72',
          resident:"-",
          nonResident:"-",
        }, {
          name: "DN20",
          value:  "20",
          cumulative:'11000',
          number:'4',
          oldWeek:'72',
          newWeek:'72',
          resident:"-",
          nonResident:"-",
        },
      ],
    }
  },
  mounted() {
    // this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.caliber-info .caliber-info-right', ['.caliber-info .table-top'])
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
.caliber-info {
  .caliber-info-right-content {
    height: 87%;
    overflow-y: auto;
    .kl-table{
      padding: 0px 20px;
      .block {
        text-align: right;
        padding: 10px 0px;
    }

    }
  }
}
</style>
