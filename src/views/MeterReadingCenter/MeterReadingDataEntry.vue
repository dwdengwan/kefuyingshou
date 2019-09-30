<template>
  <div class="MeterReadingDataEntry">
    <div class='kr-right1-buttom'>
      <div class='luru-right'>
        <div class="luru-right-detail">
          <el-row>
            <el-col :span="24">

              <div class="my-input-detail">
                <div class="label-detail"><span>用户编号：</span></div>
                <div class="dialogcontent-detail"><span>01052664</span></div>
              </div>

            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">

              <div class="my-input-detail">
                <div class="label-detail"><span>用户名称：</span></div>
                <div class="dialogcontent-detail"><span>张三</span></div>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="my-input-detail">
                <div class="label-detail"><span>用户地址：</span></div>
                <div class="dialogcontent-detail"><span>水务大楼</span></div>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="my-input-detail">
                <div class="label-detail"><span>用水类型：</span></div>
                <div class="dialogcontent-detail"><span>生活用水2.85</span></div>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="my-input-detail">
                <span></span>
                <div class="label-detail"><span>上期抄表：</span></div>
                <div class="dialogcontent-detail"><span>2017-06-06</span></div>
              </div>
            </el-col>
          </el-row>

        </div>

        <div class='luru-righ-search'>
          <el-form :model="dialogForm" ref="form" label-width="100px">

            <el-row>
              <el-col :span="12">

                <div class="my-input">
                  <el-form-item label="抄表日期：">
                    <el-date-picker v-model="formData1.enterMeterDate" size="mini" type="date" placeholder="选择日期" disabled></el-date-picker>
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="抄表状态：">
                    <el-select style="width: 100%" v-model="dialogForm.TableStatus" clearable size="mini">
                      <el-option v-for="item in TableStatusList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="上期抄码：" prop="meterAddress">
                    <el-input v-model="dialogForm.meterAddress" size="mini" clearable disabled></el-input>
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="本期抄码：" prop="village1">
                    <el-input v-model="dialogForm.village1" size="mini" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="增减水量：" prop="village2">
                    <el-input v-model="dialogForm.village2" size="mini" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="分摊水量：" prop="village2">
                    <el-input v-model="dialogForm.village2" disabled size="mini" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="实际用水量：" prop="Contacts">
                    <el-input v-model="dialogForm.Contacts" size="mini" clearable disabled></el-input>
                  </el-form-item>
                </div>

                <div class="my-input my-important_1" style="margin-bottom: 10px;">
                  <el-form-item label="备注：" prop="Contacts">
                    <el-input v-model="dialogForm.phoneNumber" size="mini" clearable></el-input>
                  </el-form-item>
                </div>
              </el-col>

            </el-row>

          </el-form>
        </div>

        <div class='luru-righ-search_1'>
          <el-form :model="dialogForm" ref="form" label-width="100px">

            <el-row>
              <el-col :span="12">

                <div class="my-input short">
                  <el-form-item label="是否换表：" prop="changeTables">
                    <div class="dialogcontent3"><span class="inputcontent">是</span></div>
                    <!-- <el-select v-model="dialogForm.changeTables" clearable size="mini">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="2"></el-option>
                    </el-select> -->
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="旧表止码：" prop="phoneNumber">
                    <div class="dialogcontent3"><span class="inputcontent">1034</span></div>
                  </el-form-item>
                </div>
                
              </el-col>

              <el-col :span="12">

                <div class="my-input my-important_1">
                  <el-form-item label="余量：" prop="userName">
                    <div class="dialogcontent3"><span class="inputcontent">1</span></div>
                  </el-form-item>
                </div>

                <div class="my-input">
                  <el-form-item label="新表起码：" prop="userName">
                    <div class="dialogcontent3"><span class="inputcontent">4301</span></div>
                  </el-form-item>
                </div>
              </el-col>

            </el-row>

          </el-form>
        </div>
        <div class="luru-button">
          <el-button size="mini" type="primary">上传附件</el-button>
          <el-button size="mini" type="primary">保存</el-button>
        </div>
      </div>

      <div class='luru-left'>
        
    <div class="kr-right1-top">
      <div class="form-left">
        <el-form :inline="true" size="mini" :model="formData1" class="demo-form-inline" style="height:1rem;padding: 10px 10px;">
          

          <el-form-item label="账期：">
            <el-date-picker v-model="formData1.beginYearM" size="mini" disabled type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="" style="width:100%;">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="册本号：">
            <!-- <el-select v-model="formData1.information" size="mini"></el-select> -->
            <el-input v-model="formData1.information" size="mini" placeholder="请输入册本号"></el-input>
          </el-form-item>

          <el-form-item label="用户编号：">
            <el-input placeholder="请输入搜索内容" v-model="formData1.inputContent" size="mini"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="background:#faa646;color:#fff;" @click="search" icon="el-icon-search"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-right">
        <!-- <el-button size="mini" type="primary">保存</el-button> -->

      </div>
    </div>
    <div class="line" style="width: 100%;height: 1.5px;background: #eaf4ff;"></div>

        <div class="kl-table" style="margin-top:1rem;">
          <el-table stripe border :data="tableData" class="change-tables-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="state" min-width="100" label="用户状态">
            </el-table-column>

            <el-table-column prop="userCode" min-width="100" label="用户编号">
            </el-table-column>

            <el-table-column prop="userName" min-width="80" label="用户名称">

            </el-table-column>

            <el-table-column prop="preCopy" min-width="80" label="上期抄码">
            </el-table-column>

            <el-table-column prop="nowCopy" min-width="80" label="本期抄码">
            </el-table-column>

            <el-table-column prop="nowNum" min-width="80" label="本期水量">
            </el-table-column>

            <el-table-column prop="addWrite" min-width="80" label="增减水量">
            </el-table-column>

            <el-table-column prop="addWrite" min-width="80" label="分摊水量">
            </el-table-column>

            <el-table-column prop="count" min-width="120" label="实际用水量" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="nowCopyDate" min-width="100" label="抄表日期" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="copyState" min-width="100" label="抄表状态" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="preNum" min-width="100" label="上期水量" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="preCopyDate" min-width="100" label="上期抄表日" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="newCode" min-width="100" label="新表底码" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="oldCode" min-width="100" label="旧表底码" show-overflow-tooltip>
            </el-table-column>

            <!-- <el-table-column prop="wirteCode" min-width="100" label="表身号" show-overflow-tooltip>
            </el-table-column> -->

            <el-table-column prop="preNum" min-width="100" label="环比" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="preLevel" min-width="100" label="环比率" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="remark" min-width="100" label="备注" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="userAddress" min-width="100" label="用户地址" show-overflow-tooltip>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MeterReadingDataEntry",
  data() {
    return {
      tableData: [
        {
          userCode: 'CAZZ0001',
          userNum: "1",
          userName: '焦文',
          userAddress: '深圳市东深小区',
          userStart: '915',
          userEnd: '1213',
          copyList: '200',
          addWrite: '198',
          copyData: '2019-07-24',
          copyState: '正常',
          state: '正常',
          userPeople: '高友贵',

          preCopy: '0',
          nowCopy: '986',
          addWrite: '986',
          count: '986',
          preNum: '615',
          preCopyDate: '2019-06-15',
          nowCopyDate: '2019-07-19',
          copyState: '估抄',
          newCode: 'CAA0001',
          oldCode: 'DZ00001',
          wirteCode: '564',
          preNum: '619',
          preLevel: '10.2%',
          remark: '深圳市东深小区客服营收系统已启用。'
        },
        {
          userCode: 'CAZZ0002',
          userNum: "2",
          userName: '焦文',
          userAddress: '深圳市东深小区',
          userStart: '915',
          userEnd: '1213',
          copyList: '200',
          addWrite: '198',
          copyData: '2019-07-24',
          copyState: '正常',
          state: '停用',
          userPeople: '高友贵',

          preCopy: '0',
          nowCopy: '986',
          addWrite: '986',
          count: '986',
          preNum: '615',
          preCopyDate: '2019-06-15',
          nowCopyDate: '2019-07-19',
          copyState: '估抄',
          newCode: 'CAA0001',
          oldCode: 'DZ00001',
          wirteCode: '564',
          preNum: '619',
          preLevel: '10.2%',
          remark: '深圳市东深小区客服营收系统已启用。'
        },
        {
          userCode: 'CAZZ0003',
          userNum: "3",
          userName: '焦文',
          userAddress: '深圳市东深小区',
          userStart: '915',
          userEnd: '1213',
          copyList: '200',
          addWrite: '198',
          copyData: '2019-07-24',
          copyState: '正常',
          state: '销户',
          userPeople: '高友贵',

          preCopy: '0',
          nowCopy: '986',
          addWrite: '986',
          count: '986',
          preNum: '615',
          preCopyDate: '2019-06-15',
          nowCopyDate: '2019-07-19',
          copyState: '估抄',
          newCode: 'CAA0001',
          oldCode: 'DZ00001',
          wirteCode: '564',
          preNum: '619',
          preLevel: '10.2%',
          remark: '深圳市东深小区客服营收系统已启用。'
        },
      ],
      crumbsData: {  //面包屑
        titleList: [
          { title: '抄表中心', path: '/MeterReadingCenter' },
          { title: '抄表记录', method: () => { window.histroy.back() } }
        ],
      },
      treeDatas: {
        tree: [{ foreignkey: '册本', id: '222', _child: [{ foreignkey: '城区', id: '222', _child: [{ foreignkey: '0035E应抄7646已抄0', id: '222' }, { foreignkey: '0035E应抄7646已抄0', id: '222' }, { foreignkey: '0035E应抄7646已抄0', id: '222' }, { foreignkey: '0035E应抄7646已抄0', id: '222' }] }] }],
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
      formData: {},
      dialogFormVisible: false,//弹出表单
      dialogJiChao: false,//集抄弹出表单
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
      dialogForm: {
        TableStatus: 1,
        changeTables: '1',
      },
      formData1: {
        searchType: '1',
        beginYearM:"201908",
      },
      options6: [
        {
          value: 12,
          label: '用水报装'
        },
      ],
      TableStatusList: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '关门'
        },
        {
          value: 3,
          label: '物阻'
        },
        {
          value: 4,
          label: '过圈'
        },
        {
          value: 5,
          label: '自报'
        },
        {
          value: 6,
          label: '估抄'
        },
        {
          value: 7,
          label: '无铅封'
        }, {
          value: 8,
          label: '不见表'
        },
        {
          value: 9,
          label: '私移表'
        },
        {
          value: 10,
          label: '表不符'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      tabsData: [
        {
          name1: '11',
          name2: '22',
          name3: false,
          name4: '44',
          name5: '55',
          name6: '66',
          name7: '77',
          name8: '88',
          name9: '99',
          name10: '1010',
        },
        {
          name1: '111',
          name2: '222',
          name3: true,
          name4: '444',
          name5: '555',
          name6: '666',
          name7: '777',
          name8: '888',
          name9: '999',
          name10: '101010',
        },
        {
          name1: '1111',
          name2: '2222',
          name3: true,
          name4: '4444',
          name5: '5555',
          name6: '6666',
          name7: '7777',
          name8: '8888',
          name9: '9999',
          name10: '10101010',
        },
      ],
      treedata: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      beginYearM: '',
      enterMeterDataShow: false,
      enterMeterDate: '',
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.MeterReadingDataEntry .MeterReadingDataEntry-right', ['.MeterReadingDataEntry .table-top'])
    })
    let myDate = new Date();
    this.formData1.enterMeterDate = myDate.getFullYear() + '-' + (Number(myDate.getMonth()) + 1) + '-' + myDate.getDate();
  },
  methods: {
    init() {

    },
    add() {//添加
      this.dialogFormVisible = true;
    },
    jichao() {//集抄
      this.dialogJiChao = true;
    },
    edit() {
      this.dialogFormVisible = true;
    },
    calBack() {
      this.$emit('calback', false)
    },
    backTreeData() { },

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
.MeterReadingDataEntry {
  height: 100%;
  .kr-right1-top {
    // height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 10px;
    .form-left {
      .el-form-item {
        margin-bottom: 0px;
      }
    }
    .form-right {
    }
  }
  .kr-right1-buttom {
    height: 100%;
    display: flex;
    .luru-right {
      width: 35%;
      border-right: 1.5px solid rgb(234, 244, 255);
      // height: calc(100% -88px);
      // height: 38rem;
      // overflow: scroll;

      .luru-right-detail {
        // width: 93%;
        padding: 10px 20px;
        border-bottom: 1.5px solid #eaf4ff;
        .label-detail {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #606266;
          line-height: 20px;
          padding: 0 10px 14px 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .dialogcontent-detail {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #121315;
          line-height: 20px;
          padding: 0 10px 14px 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
      }
      .luru-righ-check {
        // border: 1px solid #e2dddd;
        margin: 0px 14px;
        padding: 10px 10px 0px;
        .label-detail {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #606266;
          line-height: 20px;
          padding: 0 10px 14px 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .dialogcontent-detail {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #121315;
          line-height: 20px;
          padding: 0 10px 14px 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
      }
    }
    .luru-left {
      width: 65%;
    }
    .luru-righ-search {
      border-bottom: 1.5px solid #eaf4ff;
      .el-col-12 {
        width: 100%;
      }
      .my-input {
        height: 34px;
      }
    }
    .luru-righ-search_1 {
      .el-form-item__label {
        padding: 0 0 0 10px;
        text-align: left;
            width: 80px !important;
      }
      .el-form-item__content {
        margin-left: 80px !important;
      }
    }
    .luru-button{
      padding: 0 5rem;
    }
  }

  .dialog-jichao {
    height: 70%;
    .el-dialog__body {
      .el-form-item {
        .el-form-item__content {
          width: 8rem;
          .kr-btn {
            margin-left: 1.5rem;
            background: #faa646;
            color: #fff;
            height: 28px;
            margin-top: 0.5rem;
            padding: 6px 20px;
          }
        }
      }
    }
  }
  // .dialog-luru{
  //   .el-dialog__body{
  //     display: flex;
  //     .luru-right{
  //       width: 40%;
  //     }
  //     .luru-left{
  //       width: 60%;
  //     }
  //   }
  // }

  .MeterReadingDataEntry-right-content {
    height: 87%;
    overflow-y: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    .kr-left {
      width: 18%;
      height: 100%;
      // border: 2px solid red;
    }
    .kr-right {
      width: 81%;
      height: 100%;
      table {
        overflow: scroll;
        width: 100%;
        thead th {
          width: 10%;
          font-size: 14px;
          font-weight: 700;
        }
        tbody tr {
          // display:block;
          margin-top: 1rem;
          td {
            text-align: center;
            .el-input,
            .el-select {
              width: 95%;
            }
          }
        }
      }
    }
  }
  .btnBox {
    display: inline-block;
    width: 100%;
    text-align: right;
    margin-bottom: 2%;
  }
  .btnBox .el-button {
    margin-left: 1%;
    font-size: 14px;
  }
  .my-input {
    width: 90%;
    
    display: inline-block;
    // padding-left: 10%;
    .el-input__inner {
      width: 100% !important;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .my-input .el-input {
    width: 100% !important;
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .my-important {
    .el-form-item__label {
      color: red;
      font-weight: bolder;
      text-align: right;
      padding-left: 30px;
    }
  }
  .my-important_1 {
    .el-form-item__label {
      font-weight: bolder;
      text-align: right;
      padding-left: 30px;
    }
  }
  .dialogcontent {
    width: 100%;
    display: inline-block;
  }
  .dialogcontent span {
    width: 100%;
    display: inline-block;
    // border-bottom: 1px solid;
  }
  .dialogcontent1 {
    width: 58%;
    display: inline-block;
  }
  .inputcontent {
    width: 52%;
    display: inline-block;
    // border-bottom: 1px solid;
  }
  .dialogcontent2 {
    width: 58%;
    display: inline-block;
  }
  .dialogcontent3 {
    width: 40%;
    display: inline-block;
  }
  .dialogcontent3 .inputcontent {
    width: 100%;
    display: inline-block;
    // border-bottom: 1px solid;
  }
  .kl-table {
    padding: 0 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .longinput .el-input__inner {
    width: 160px;
  }
  .short {
    .el-form-item__content {
      // width: 57px;
    }
  }
  .el-col-24 {
    // width: 100%;
    height: 30px;
  }
}
</style>

