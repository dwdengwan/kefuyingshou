<template>
  <div class="business-area">
        
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary" @click="save(saveData)">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
        </div>
      </div>
      
      <div v-if="EditVisible">
        <BusinessAreaEdit ref="childWarehousing"></BusinessAreaEdit>
      </div>

      <div v-else >
          <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                  <el-form-item class="form-right">
                      <!-- <el-button icon="el-icon-plus" size="mini" type="primary" @click="add('add')">添加</el-button> -->
                  </el-form-item>
              </el-form>
          </div>

          <div class="business-area-right-content">
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
                
                <el-table-column prop="areaCode" min-width="70" label="网点编号">
                </el-table-column>

                <el-table-column prop="areaName" min-width="100" label="网点名称">
                </el-table-column>


                <el-table-column prop="address" min-width="100" label="网点地址">
                </el-table-column>
                <el-table-column prop="postion" min-width="120" label="经纬度坐标">
                </el-table-column>


                <el-table-column prop="areaState" min-width="60" label="状态">
                </el-table-column>

                <el-table-column prop="time" min-width="220" label="营业时间" show-overflow-tooltip>
                </el-table-column>

                <el-table-column prop="areaDesc" min-width="150" label="备注" show-overflow-tooltip>
                  
                </el-table-column>

                <el-table-column label="操作" width="70">
                  <template slot-scope="scope">
                    <el-button type="text" @click.native="add(scope)" style="font-size:12px;text-align:center;">编辑</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          
          </div>
        
      </div>
  </div>
</template>
<script>
import BusinessAreaEdit from "./BusinessAreaEdit"

export default {
  name: "business-area-index",
  components:{
      BusinessAreaEdit,
  },
  data() {
    return {
      saveData:"",
      formData:{},
      EditVisible:false,//弹出表单
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
          { title: '营业网点', method: () => { window.histroy.back() } }
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
          address: "1栋3单元",
          postion:  "39.928353,116.416357",
          areaName:'黄阁镇营业厅',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'01_城区',
          areaDesc:"城区客服营收系统已启用",
          time:"周一至周五08：30-12：00，14：00-17：00（法定节假日除外）",
          id: null,
          page: 1,
          pageCount: 20,
        }, {
          address: "1栋3单元",
          postion: "39.921470,116.443108",
          areaName:'横沥镇营业厅',
          areaCode:'02',
          areaState:'启用',
          areaLevel:'01_城区',
          areaDesc:"农村客服营收系统已启用",
          time:"周一至周五08：30-12：00，14：00-17：00（法定节假日除外）",
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
      this.$changeTable(this, '.business-area .business-area-right', ['.business-area .table-top'])
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
    save(name){
      console.log(name);
      if(name == 'add'){

      }else{

      }
    },
    add(name){//添加
      this.saveData = name;
      if(name == 'add'){
        this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })
      }else{
        this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
        console.log(name.row);
        console.log(this.$refs);
        // this.$refs.childWarehousing.backfillSubmitForm.address =  name.row.address 
      }
      this.EditVisible = true;
    },
    // edit(i,row){
    //   console.log(i,row);
    //   console.log(this.$refs);
    //   console.log(this.$refs.childWarehousing);
    //   // console.log(this.$refs.childWarehousing.backfillSubmitForm);
    //   console.log(this.$refs["childWarehousing"]);
      // this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
      // this.EditVisible = true;
    // },
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
.business-area {
  .bread-contain{
    &:after{
      display: block;
      content: "";
      clear: both;
    }
  }
  .business-area-right-content {
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
