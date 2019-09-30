
<template>
  <div class="multiplexingAdd">
    <!-- 弹出表单明细 -->
    <el-dialog :title="multiplexingName" :close-on-click-modal="false" :visible.sync="multiplexingVisible" class="multiplexing" @close="closeDialog" append-to-body>
      <multiplexing ref="multiplexingEditor" :detailsData="ArrearsDetails"></multiplexing>
    </el-dialog>
    <el-form class="backfillSubmitForm" :inline="true" :model="multiplexingEditForm" label-width="160px" ref="ruleForm" :rules="rules">
      <!-- <legend>查询内容</legend>
      <el-form-item label="用户编号：" class='usercode'>
        <el-input v-model="multiplexingEditForm.userNum" placeholder="165497974"></el-input>
        <el-button type="primary" size="mini" style="background:#faa646;border: #faa646;" @click="demand" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item label="客户状态：">
        <el-input v-model="multiplexingEditForm.PriceStrategy" placeholder="正常使用" disabled class="read-only"></el-input>
      </el-form-item> -->
      <legend>用户-基本信息</legend>
      <el-form-item label="用户编号：" prop="userNume">
        <el-input v-model="multiplexingEditForm.userNume" disabled class="read-only" placeholder="16549793487874"></el-input>
        <!-- <el-button style="background:#faa646;color:#fff;" icon="el-icon-search"></el-button> -->
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in multiplexingEditForm.changeTbaleInfoForm" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>

      <legend>水表信息</legend>

      <el-form-item :label="v.label" v-for="(v,i) in multiplexingEditForm.ComparisonTableInfoForm" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>
      <!-- <legend>欠费信息</legend>
      <el-form-item :label="v.label" v-for="(v,i) in multiplexingEditForm.ContractInformation" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="报停日期：" class="userAdress">
        <el-input v-model="multiplexingEditForm.isfines" placeholder=""></el-input>
        <el-button type="primary" size="mini" @click="Details">欠费详细信息</el-button>
      </el-form-item>
      <legend>复用原因</legend>

      <el-form-item :label="v.label" v-for="(v,i) in multiplexingEditForm.classifyPropOptions" :key="i">
        <el-select clearable v-model="v.value" :placeholder="tips">
          <el-option v-for="(item,index) in v.options" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="原因说明：" class="Remarks" prop="userNume">
        <el-input type="textarea" v-model="multiplexingEditForm.userNume" placeholder=""></el-input>

      </el-form-item> -->

      <legend>复用信息</legend>
      <el-form-item label="复用日期：" prop="Remarks1">
        <el-date-picker v-model="multiplexingEditForm.Remarks1" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      
        <el-form-item label="是否复表：" prop="Remarks1">
        <el-radio v-model="multiplexingEditForm.checked" label="1">是</el-radio>
        <el-radio v-model="multiplexingEditForm.checked" label="2">否</el-radio>
      </el-form-item>

      <!-- <el-form-item :label="v.label" v-for="(v,i) in multiplexingEditForm.classifyPropOptions" :key="i">
        <el-select clearable v-model="v.value" :placeholder="tips">
          <el-option v-for="(item,index) in v.options" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item> -->
      <el-form-item label="原因说明：" class="Remarks" prop="userNume">
        <el-input type="textarea" v-model="multiplexingEditForm.userNume" placeholder=""></el-input>

      </el-form-item>

    </el-form>

  </div>
</template>
<script>
import multiplexing from '../Transfer/TransferDetails'
export default {
  name: "multiplexingAdd",
  components: {
    multiplexing
  },
  data() {
    return {
      multiplexingEditForm: {
        // 查询内容
        backfillInput: [
          {
            label: "用户编号：",
            value: "",
            tips: "165497974"
          },
          {
            label: "客户状态：",
            value: "",
            tips: "正常使用"
          },



        ],
        // 用户信息
        changeTbaleInfoForm: [
          {
            label: "用户名称：",
            value: "",
            tips: ""
          },

          {
            label: "用户地址：",
            value: "",
            tips: ""
          },
          {
            label: "证件类型：",
            value: "",
            tips: ""
          },
          {
            label: "证件号码：",
            value: "",
            tips: ""
          },
          {
            label: "供水合同号：",
            value: "",
            tips: ""
          },
          {
            label: "营业网点：",
            value: "",
            tips: ""
          },
          {
            label: "行政区域：",
            value: "",
            tips: ""
          },
          {
            label: "管理区域：",
            value: "",
            tips: ""
          },
          {
            label: "联系人：",
            value: "",
            tips: ""
          },
          {
            label: "联系电话：",
            value: "",
            tips: ""
          },
          {
            label: "邮箱：",
            value: "",
            tips: ""
          },
          // 、行政区域、管理区域、联系人、联系电话、邮箱、手机号码、短信签约、传真号码
          {
            label: "手机号码：",
            value: "",
            tips: ""
          },
          {
            label: "短信签约：",
            value: "",
            tips: ""
          },
          {
            label: "传真号码：",
            value: "",
            tips: ""
          },
          {
            label: "房产证编号：",
            value: "",
            tips: ""
          },
          {
            label: "立户日期：",
            value: "",
            tips: ""
          },
          {
            label: "停用日期：",
            value: "",
            tips: ""
          },
          {
            label: "注销日期：",
            value: "",
            tips: ""
          },
          {
            label: "泵站：",
            value: "",
            tips: ""
          },
          {
            label: "大用户：",
            value: "",
            tips: ""
          },
          {
            label: "用水期限：",
            value: "",
            tips: ""
          },
          {
            label: "用户状态：",
            value: "",
            tips: ""
          },
          {
            label: "拆表原因：",
            value: "",
            tips: ""
          },
          {
            label: "投递标记：",
            value: "",
            tips: ""
          },
          {
            label: "邮政编码：",
            value: "",
            tips: ""
          },
          {
            label: "投递备注：",
            value: "",
            tips: ""
          },

        ],
        // 水表信息
        ComparisonTableInfoForm: [
          {
            label: "水表编号：",
            value: "",
            tips: ""
          },
          {
            label: "装表地址：",
            value: "",
            tips: ""
          },
          {
            label: "装表位置：",
            value: "",
            tips: ""
          },
          {
            label: "水表口径：",
            value: "",
            tips: ""
          },
          {
            label: "水表厂家：",
            value: "",
            tips: ""
          },
          {
            label: "水表型号：",
            value: "",
            tips: ""
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
          {
            label: "是否复表：",
            tips: "复表",
            value: "",
            options: [
              {
                name: "复表",
                value: "1"
              },
              {
                name: "不复表",
                value: "2"
              },
            ]
          },


        ],
        userNum: "",
        PriceStrategy: "",
        isfines: "",


        desc: "",
        userNume: "",
        descoptions: []
      },
      rules: {
        userNume: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ]
      },
      histroyData: {},
      multiplexingName: "欠费明细",
      multiplexingVisible: false,
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
      this.multiplexingVisible = false;
      this.init()
    },
    Details() {
      this.multiplexingVisible = true;
    }
  }
}
</script>
<style lang="scss">
.multiplexingAdd {
  height: calc(100% - 41px);
  overflow-y: auto;
  .el-input__inner {
    height: 30px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-date-editor /deep/ .el-input__inner {
    width: 100% !important;
  }
  legend {
    background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 20px;
    font-size: 14px;
  }
  .backfillSubmitForm {
    // margin-top: 15px;
  }
  .backfillSubmitForm {
    // padding: 10px 20px;
    width: 98%;
    .el-form-item {
      margin-bottom: 0px;
      width: 32%;
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

