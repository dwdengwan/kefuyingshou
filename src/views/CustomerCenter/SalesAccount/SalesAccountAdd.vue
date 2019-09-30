
<template>
  <div class="SalesAccountAdd">
    <!-- 弹出表单明细 -->
    <el-dialog :title="TransferDetailsName" :close-on-click-modal="false" :visible.sync="TransferDetailsVisible" class="TransferDetails" @close="closeDialog" append-to-body>
      <TransferDetails ref="TransferDetailsEditor" :detailsData="ArrearsDetails"></TransferDetails>
    </el-dialog>
    <el-form class="backfillSubmitForm" :inline="true" :model="SalesAccountEditForm" label-width="160px" ref="ruleForm" :rules="rules">
      <!-- <legend>查询内容</legend>
      <el-form-item label="用户编号：" class='usercode'>
        <el-input v-model="SalesAccountEditForm.userNum" placeholder="165497974"></el-input>
        <el-button type="primary" size="mini" style="background:#faa646;border: #faa646;" @click="demand" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item label="客户状态：">
        <el-input v-model="SalesAccountEditForm.PriceStrategy" placeholder="正常使用" disabled class="read-only"></el-input>
      </el-form-item> -->
      <legend>用户信息</legend>
      <el-form-item label="用户编号：" prop="userNume" class='userCode'>
        <el-input v-model="SalesAccountEditForm.userNume" placeholder="16549793487874"></el-input>
        <el-button style="background:#faa646;color:#fff;" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in SalesAccountEditForm.changeTbaleInfoForm" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>
      <legend>水表信息</legend>

      <el-form-item :label="v.label" v-for="(v,i) in SalesAccountEditForm.ComparisonTableInfoForm" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>
      <!-- <legend>欠费信息</legend>
      <el-form-item :label="v.label" v-for="(v,i) in SalesAccountEditForm.ContractInformation" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="报停日期：" prop="userNume" class="userAdress">
        <el-input v-model="SalesAccountEditForm.userNume" placeholder=""></el-input>
        <el-button type="primary" size="mini" @click="Details">欠费详细信息</el-button>
      </el-form-item>
      <legend>销户原因</legend>

      <el-form-item label="原因说明：" class="Remarks" prop="userNume">
        <el-input type="textarea" v-model="SalesAccountEditForm.userNume" placeholder=""></el-input>

      </el-form-item> -->
      <legend>销户信息</legend>
      <el-form-item label="销户日期：" prop="userNume">
        <el-date-picker
                    v-model="SalesAccountEditForm.userNume"
                    type="date"
                    placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="销户类型：">
        <el-select  clearable v-model="SalesAccountEditForm.stopType" placeholder="请选择销户类型">
            <el-option  v-for="(item,index) in SalesAccountEditForm.stopTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="欠费金额">
        <el-input v-model="SalesAccountEditForm.Arrears" placeholder="12.00" disabled class="read-only"></el-input>
      </el-form-item>

      <el-form-item label="销户原因：" class="Remarks" prop="userNume">
        <el-input type="textarea" v-model="SalesAccountEditForm.userNume1" placeholder=""></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>
<script>
import TransferDetails from '../Transfer/TransferDetails'
export default {
  name: "SalesAccountAdd",
  components: {
    TransferDetails
  },
  data() {
    return {
      SalesAccountEditForm: {
        stopType:"",
        stopTypeOptions:[
          {
            name:"用户报停销户",
            value:"1"
          },
          {
            name:"欠费销户",
            value:"2"
          },
        ],
        Arrears:"",
        // 查询内容
        backfillInput: [
          {
            label: "",
            value: "",
            tips: ""
          },
          {
            label: "",
            value: "",
            tips: ""
          },



        ],
        // 用户信息
                changeTbaleInfoForm:[
                    {
                        label:"用户名称：",
                        value:"",
                        tips:""
                    },
                    
                    {
                        label:"用户地址：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"证件类型：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"证件号码：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"供水合同号：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"营业网点：",
                        value:"",
                        tips:""
                    },
                     {
                        label:"行政区域：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"管理区域：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"联系人：",
                        value:"",
                        tips:""
                    },
                    {
                        label:" 联系电话：",
                        value:"",
                        tips:""
                    },
                    {
                        label:" 邮箱：",
                        value:"",
                        tips:""
                    },
                    // 、行政区域、管理区域、联系人、联系电话、邮箱、手机号码、短信签约、传真号码
                    {
                        label:" 手机号码：",
                        value:"",
                        tips:""
                    },
                    {
                        label:" 短信签约：",
                        value:"",
                        tips:""
                    },
                    {
                        label:" 传真号码：",
                        value:"",
                        tips:""
                    },
                    
                ],
                // 水表信息
                ComparisonTableInfoForm:[
                    {
                        label:"水表编号：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"装表地址：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"装表位置：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"水表口径：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"水表厂家：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"水表型号：",
                        value:"",
                        tips:""
                    },

                    

                ],
        // 欠费信息
        ContractInformation: [
          {
            label: "笔数：",
            value: "",
            tips: "6"
          },
          {
            label: "（不含违约金）金额：",
            value: "",
            tips: "17.7"
          },
          {
            label: "结算余额：",
            value: "",
            tips: "-0.31"
          },


        ],
        // 停用原因
        classifyPropOptions: [
          // {
          //     label:"是否拆表：",
          //     tips:"拆表",
          //     value:"",
          //     options:[
          //         {
          //             name:"拆表",
          //             value:"1"
          //         },
          //         {
          //             name:"不拆表",
          //             value:"2"
          //         },

          //     ]
          // },
          {
            label: "拆表原因：",
            tips: "欠费拆表",
            value: "",
            options: [
              {
                name: "欠费拆表",
                value: "1"
              },
              {
                name: "报停拆表",
                value: "2"
              },
              {
                name: "正常拆表",
                value: "3"
              },
            ]
          },


        ],

        checked: "",
        desc: "",
        userNume: "",
        descoptions: [],
        userNum: "",
        PriceStrategy: "",
        isfines: "",
        UpdateCodeCopye: "",
        Remarks: "",
        year: ""
      },
      rules: {
        userNume: [
          { required: true, message: '请输入报停日期', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ]
      },
      histroyData: {},
      TransferDetailsName: "欠费明细",
      TransferDetailsVisible: false,
      ArrearsDetails: {}

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
        total: 5,
      }
      this.ArrearsDetails = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "0.40",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "水资源费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "2.40",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "污水处理费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "4.82",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "水费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201906",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "0.60",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "水资源费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "小饭店（王书英）",
            code: "0102683638",
            concentrator: "",
            connect: null,
            daytime: "201906",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "3.40",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "污水处理费",
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
            sub: "",
            Total: ""
          },
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "合计：",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "笔数：",
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
            sub: "5",
            Total: "11.62"
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
    closeDialog() { //关闭会话
      this.TransferDetailsVisible = false;
      this.init()
    },
    Details() {
      this.TransferDetailsVisible = true;
    }
  }
}
</script>
<style lang="scss">
.SalesAccountAdd {
  height: calc(100% - 41px);
  overflow-y: auto;
  .el-form-item {
    margin-bottom: 10px;
}
  .el-input__inner {
    height: 30px;
  }
  legend {
    background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 20px;
    font-size: 14px;
    // margin-top: 11px;
    border: red;
  }
  .backfillSubmitForm {
    // margin-top: 15px;
  }
  .backfillSubmitForm {
    // padding: 10px 20px;
    width: 98%;
    // width: 100%;
    .el-form-item {
      width: 32%;
      margin-bottom: 0px;
    //   margin-top: 11px;
      .el-form-item__content {
        width: 50%;
        .el-select {
          width: 100%;
        }
      }
    }
    .usercode {
      .el-form-item__content {
        .el-input {
          width: 70%;
        }
      }
    }
    .userAdress {
      width: 80%;
      .el-form-item__content {
        width: calc(100% - 160px);
        .el-form-item__label {
          width: 100px !important;
        }
        .el-textarea,
        .el-input {
          width: 30%;
        }
        .el-select {
          width: 20%;
        }
        .el-checkbox-group {
          display: inline-block;
          width: 50%;
        }
      }
    }

    .Remarks {
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 160px);
      }
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .el-steps--horizontal {
    margin: 0 auto;
    width: 50%;
    padding-bottom: 20px;
  }
}
</style>

