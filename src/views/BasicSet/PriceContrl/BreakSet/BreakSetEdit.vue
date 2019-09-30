<template>
  <div class="BreakSetEdit">
         <div class="backfillSubmitForm">


        <el-form :inline="true" size="mini" :model="form" class="basicInfoForm"  label-width="150px">
                
                    <el-form-item label="违约金名称：" :label-width="formLabelWidth">
                        <el-input v-model="form.minPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item class="company" label="计算方式：">
                      <el-form-item>
                        <el-radio label="从每月" v-model="form.radio"></el-radio>
                          <el-input v-model="form.breakPrice1" ></el-input>
                          <span style=" font-size: 12px;color: #606266;">日开始计算违约金（即账期的下一个月）</span>
                       </el-form-item>
                       <el-form-item>
                        <el-radio label="开账后" v-model="form.radio"></el-radio>
                            <el-input v-model="form.breakPrice2" ></el-input>
                            <span style=" font-size: 12px;color: #606266;">日开始计算违约金</span>
                        </el-form-item>
                        <el-form-item>
                        <el-radio label="开账后" v-model="form.radio"></el-radio>
                            <el-input v-model="form.breakPrice3" ></el-input>
                            <span style=" font-size: 12px;color: #606266;">月开始计算违约金</span>
                        </el-form-item>
                     
                        <el-form-item>
                            <el-checkbox v-model="form.checked">假期除外</el-checkbox>
                        </el-form-item>
                    </el-form-item>
                <el-row>
                  <el-col :span="10">
                    <!-- <el-form-item label="开始日期：" :label-width="formLabelWidth">
                        <el-date-picker
                        v-model="form.startTime"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item label="最低计算金额：" :label-width="formLabelWidth">
                        <el-input v-model="form.minBreakPrice" autocomplete="off"></el-input>
                        <!-- <span>%</span> -->
                    </el-form-item>

                    <el-form-item label="最低违约金额：" :label-width="formLabelWidth">
                        <el-input v-model="form.minBreakPrice" autocomplete="off"></el-input>
                        <!-- <span>%</span> -->
                    </el-form-item>
                    <el-form-item label="每天收取比例：" :label-width="formLabelWidth">
                        <el-input v-model="form.minBreakPrice" autocomplete="off"></el-input>
                        <!-- <span>%</span> -->
                    </el-form-item>
                  </el-col>
                  <el-col  :span="10">
                  <!-- <el-form-item label="结束日期：" label-width="5.5rem">
                        <el-date-picker
                        v-model="form.endTime"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                  </el-form-item> -->
                    <el-form-item label="保留小数位数："  :label-width="formLabelWidth">
                        <el-input v-model="form.countNum" type="number" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="最高违约金额："  :label-width="formLabelWidth">
                        <el-input v-model="form.minBreakPrice" autocomplete="off"></el-input>
                        <!-- <span>%</span> -->
                    </el-form-item>
                    <el-form-item label="最高收取比例："  :label-width="formLabelWidth">
                        <el-input v-model="form.minBreakPrice" autocomplete="off"></el-input>
                        <!-- <span>%</span> -->
                    </el-form-item>
                  <!-- <el-form-item label="状态：" label-width="5.5rem"> -->
                  </el-col>

                </el-row>

                        
                        <el-form-item label="状态：" class="statueCss">
                            <el-select v-model="form.state" placeholder="请选择状态">
                                <el-option label="启用" value="0"></el-option>
                                <el-option label="停用" value="1"></el-option>
                            </el-select>
                        <!-- </el-form-item> -->
                          </el-form-item>
                  <el-form-item label="备注：" >
                    <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
                  </el-form-item>
              
        </el-form>
      </div>

  </div>
</template>
<script>
export default {
  name: "BreakSetEdit",
  data() {
    return {
      formInline:{
        areaName:""
      },
      tableData:[
        {
          type:'按开账后3个月',
          breakLevel:"0.5",
          minPrice:'0',
          minDay:'0',
          state:'启用',
          remark:'3个月开始计算违约金,每天千分之五',
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
          checked:[],
        radio:'1',
        state:'1',
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
          { title: '违约设置', method: () => { window.histroy.back() } }
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
      this.$changeTable(this, '.break-set .break-set-right', ['.break-set .table-top'])
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
        total: 1,
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
.BreakSetEdit {

    height: 100%;
    width: 90%;
    margin: 10px auto;
    .statueCss{
      .el-input{
        width: 29.5% !important;

      }
    }
    .company{
      margin-bottom: 0px !important;
      .el-form-item{
        width: 100% !important;
        .el-form-item__content{
              width: 100% !important;
              font-size: 12px;
              .el-radio{
                    margin-right: 10px;
                .el-radio__label{
                  font-size: 12px;
                }
              }
                .el-input{
                  width: 23%;

                }
        }
      }

    }
    .basicInfoForm{
            margin: 10px;
    }
      
}
</style>

