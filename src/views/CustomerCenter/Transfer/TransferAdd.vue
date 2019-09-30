

<template>
  <div class="TransferAdd">
    <el-tabs type="border-card" v-model="tabsName">
      <el-tab-pane label="变更前">
        <el-form class="backfillSubmitForm" :inline="true" :model="TransferEditForm" label-width="160px" ref="ruleForm" :rules="rules">
          <legend>用户信息</legend>
          <el-form-item label="用户编号：" prop="userNume">
            <el-input v-model="TransferEditForm.userNume" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：" prop="isfines">
            <el-input v-model="TransferEditForm.isfines" placeholder="张三" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="用户地址：" prop="isfines">
            <el-input v-model="TransferEditForm.isfines" placeholder="有限公司" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：" prop="idcardType">
            <el-input v-model="TransferEditForm.idcardType" placeholder="居民身份证" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="证件号码：" prop="isfines">
            <el-input v-model="TransferEditForm.isfines" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="供水合同号：" prop="isfines">
            <el-input v-model="TransferEditForm.isfines" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="营业网点：" prop="region">
            <el-input v-model="TransferEditForm.region" placeholder="城区" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="行政区域：" prop="desc">
            <el-input v-model="TransferEditForm.region" placeholder="城区" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="管理区域：" prop="desc">
            <el-input v-model="TransferEditForm.region" placeholder="城区" disabled class="read-only"></el-input>
          </el-form-item>

          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.ComparisonTableInfoForm" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="短信签约：">
            <el-input v-model="TransferEditForm.region" placeholder="是" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.ComparisonTableInfoForm1" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="备注：" class="beizhu">
            <el-input v-model="TransferEditForm.desc1" placeholder="备注信息" disabled class="read-only">
            </el-input>
          </el-form-item>
          <legend>其他信息</legend>
          <el-form-item label="行业分类：" prop="TypesWaterUse">
            <el-input v-model="TransferEditForm.desc1" placeholder="" disabled class="read-only">
            </el-input>
          </el-form-item>
          <el-form-item label="投递标记：">
            <el-input v-model="TransferEditForm.desc1" placeholder="是" disabled class="read-only">
            </el-input>
          </el-form-item>
          <el-form-item label="邮政编码：" prop="caliber6">
            <el-input v-model="TransferEditForm.date5" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="投递备注：">
            <el-input v-model="TransferEditForm.userNume" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="过户原因：" class="beizhu">
            <el-input v-model="TransferEditForm.desc1" placeholder="备注" disabled class="read-only">
            </el-input>
          </el-form-item>

          <legend>
            客户信息
          </legend>
          <el-form-item label="客户编号：">
            <el-input v-model="TransferEditForm.userNume" placeholder="新立户" disabled class="read-only"></el-input>
          </el-form-item>

          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.ContractInformation" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
          </el-form-item>

          <legend>
            账户信息
            <!-- <el-button size="mini" type="primary" class="goright">选择账户</el-button> -->
          </legend>
          <el-form-item label="账户编号：">
            <el-input v-model="TransferEditForm.PriceStrategy" placeholder="新开户" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="缴费方式：">
            <el-input v-model="TransferEditForm.PriceStrategy" placeholder="现金" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="余额：">
            <el-input v-model="TransferEditForm.PriceStrategy1" placeholder="8000" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.countMsg" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="银行名称：">
            <el-input v-model="TransferEditForm.PriceStrategy1" placeholder="中国工商银行" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.countMsgOrder" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态：">
            <el-select clearable v-model="TransferEditForm.Remarks" placeholder="">
              <el-option v-for="(item,index) in TransferEditForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->

          <legend>开票信息</legend>
          <el-form-item label="发票类型：" prop="desc">
            <el-input v-model="TransferEditForm.desc" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.InvoiceInformation" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="开户行：">
            <el-input v-model="TransferEditForm.desc" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：">
            <el-input v-model="TransferEditForm.bankCountNum" placeholder="" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="投递方式：">
            <el-input v-model="TransferEditForm.bankCountNum1" placeholder="自取" disabled class="read-only"></el-input>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="变更后" name="after">
        <el-form class="backfillSubmitForm" :inline="true" :model="TransferEditForm" label-width="160px" ref="ruleForm" :rules="rules">
          <legend>基础信息</legend>
          <el-form-item label="用户编号：" prop="userNume" >
            <el-input v-model="TransferEditForm.userNume" disabled class="read-only" placeholder="16549793487874"></el-input>
            <!-- <el-button style="background:#faa646;color:#fff;" icon="el-icon-search"></el-button> -->
          </el-form-item>
          <el-form-item label="用户名称：" prop="isfines">
            <el-input v-model="TransferEditForm.isfines" placeholder="有限公司"></el-input>
          </el-form-item>
          <el-form-item label="用户地址：" prop="isfines">
            <el-input v-model="TransferEditForm.isfines" placeholder="有限公司"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：" prop="idcardType">
            <el-select clearable v-model="TransferEditForm.idcardType" placeholder="居民身份证">
              <el-option v-for="(item,index) in TransferEditForm.idcardTypeList" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="isfines" class="idCard">
            <el-input v-model="TransferEditForm.isfines" placeholder="">
              <el-button slot="append" icon="el-icon-reading" type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="供水合同号：" prop="isfines">
            <el-input v-model="TransferEditForm.isfines" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="营业网点：" prop="region">
            <el-select clearable v-model="TransferEditForm.region" placeholder="城区">
              <el-option v-for="(item,index) in TransferEditForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政区域：" prop="desc">
            <el-select clearable v-model="TransferEditForm.desc" placeholder="城区">
              <el-option v-for="(item,index) in TransferEditForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理区域：" prop="desc">
            <el-select clearable v-model="TransferEditForm.desc" placeholder="城区">
              <el-option v-for="(item,index) in TransferEditForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="营业站点：" prop="BusinessSite">
        <el-select clearable v-model="TransferEditForm.BusinessSite" placeholder="营业部">
          <el-option v-for="(item,index) in TransferEditForm.BusinessSite" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item> -->

          <!-- <el-form-item>
        <span slot="label">
          <el-checkbox v-model="TransferEditForm.userNum">短信手机：</el-checkbox>
        </span>
        <el-input v-model="TransferEditForm.PriceStrategy" placeholder="1354687952"></el-input>
      </el-form-item> -->

          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.ComparisonTableInfoForm" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>
          <el-form-item label="短信签约：">
            <el-radio v-model="TransferEditForm.radio" label="1">是</el-radio>
            <el-radio v-model="TransferEditForm.radio" label="2">否</el-radio>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.ComparisonTableInfoForm1" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>
          <el-form-item label="备注：" class="beizhu">
            <el-input v-model="TransferEditForm.desc1" placeholder="请输入备注">
            </el-input>
          </el-form-item>
          <legend>其他信息</legend>
          <el-form-item label="行业分类：" prop="TypesWaterUse">
            <el-select clearable v-model="TransferEditForm.TypesWaterUse1" placeholder="居民">
              <el-option v-for="(item,index) in TransferEditForm.workType" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投递标记：">
            <el-radio v-model="TransferEditForm.radio1" label="1">是</el-radio>
            <el-radio v-model="TransferEditForm.radio1" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="邮政编码：" prop="caliber6">
            <el-input v-model="TransferEditForm.date5" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="投递备注：">
            <el-input v-model="TransferEditForm.userNume" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="过户原因：" class="beizhu">
            <el-input v-model="TransferEditForm.desc1" type="textarea" placeholder="请输入备注">
            </el-input>
          </el-form-item>

          <!-- <legend>水表信息</legend>
      <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.changeTbaleInfoForm" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item> -->
          <!-- <legend>过户原因</legend>
      <el-form-item label="过户原因：" prop="desc">
        <el-select clearable v-model="TransferEditForm.desc" prop="desc" placeholder="二手房买卖">
          <el-option v-for="(item,index) in TransferEditForm.ReasonsTransfer" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item> -->
          <!-- <el-form-item label="操作人：">
        <el-input v-model="TransferEditForm.userNume" placeholder="管理员" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="备注：" class="address">
        <el-input type="textarea" v-model="TransferEditForm.desc" :rows="4" clearable placeholder="备注"></el-input>
      </el-form-item> -->
          <legend>
            客户信息
            <el-button size="mini" type="primary" class="goright">选择客户</el-button>
          </legend>
          <el-form-item label="客户编号：">
            <el-input v-model="TransferEditForm.userNume" placeholder="新立户" disabled class="read-only"></el-input>
          </el-form-item>

          <el-form-item label="客户类型：">
            <el-select clearable v-model="TransferEditForm.TypesWaterUse2" placeholder="普通客户">
              <el-option label="普通客户" value="0"></el-option>
              <el-option label="大客户" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="信用等级：">
            <el-select clearable v-model="TransferEditForm.TypesWaterUse3" placeholder="二级">
              <el-option label="vip级" value="0"></el-option>
              <el-option label="二级" value="1"></el-option>
              <el-option label="一级" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.ContractInformation1" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>

          <legend>
            账户信息
            <el-button size="mini" type="primary" class="goright">选择账户</el-button>
          </legend>
          <el-form-item label="账户编号：">
            <el-input v-model="TransferEditForm.PriceStrategy" placeholder="新开户" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="缴费方式：">
            <el-select clearable v-model="TransferEditForm.isfines" placeholder="">
              <el-option v-for="(item,index) in TransferEditForm.PaymentMethod" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="余额：">
            <el-input v-model="TransferEditForm.PriceStrategy1" placeholder="8000" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.countMsg" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>
          <el-form-item label="银行名称：">
            <el-select clearable v-model="TransferEditForm.UpdateCodeCopye" placeholder="">
              <el-option v-for="(item,index) in TransferEditForm.bankName" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.countMsgOrder" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>
          <el-form-item label="银行账号:" class="idCard">
            <el-input v-model="TransferEditForm.bankCode" placeholder="">
              <el-button slot="append" icon="el-icon-reading" type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="银行签约日期:">
            <el-date-picker v-model="TransferEditForm.bankCodeTime" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item> -->

          <legend>开票信息</legend>
          <el-form-item label="发票类型：" prop="desc">
            <el-select clearable v-model="TransferEditForm.desc" placeholder="">
              <el-option v-for="(item,index) in TransferEditForm.bankName1" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in TransferEditForm.InvoiceInformation" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>
          <el-form-item label="开户银行：">
            <el-select clearable v-model="TransferEditForm.year" placeholder="">
              <el-option v-for="(item,index) in TransferEditForm.bankName" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行账号：" class='idCard'>
            <el-input v-model="TransferEditForm.bankCountNum" placeholder="">
              <el-button slot="append" icon="el-icon-reading" type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="投递方式：">
            <el-select clearable v-model="TransferEditForm.year" placeholder="自取">
              <el-option v-for="(item,index) in TransferEditForm.yyy" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>

        </el-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>

export default {
  name: "TransferAdd",
  data() {
    return {
      tabsName:"after",
      readyonlyShow: true,
      ArrearsDetails: {},
      TransferEditForm: {
        year: '',
        yyy: [
          {
            name: "自取",
            value: '1'
          },
          {
            name: "邮寄",
            value: '1'
          },
          {
            name: "上门派送",
            value: '1'
          },
        ],
        ComparisonTableInfoForm1: [

          // {
          //     label:"街区：",
          //     value:"",
          //     tips:""
          // },
          {
            label: "传真号码：",
            value: "",
            tips: ""
          },
          {
            label: "停水联系人：",
            value: "",
            tips: ""
          },
          {
            label: "停水联系电话：",
            value: "",
            tips: ""
          },
          {
            label: "房产证编号：",
            value: "",
            tips: ""
          },


        ],
        ComparisonTableInfoForm: [
          // {
          //     label:"街区：",
          //     value:"",
          //     tips:""
          // },
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
          {
            label: "手机号码：",
            value: "",
            tips: ""
          },


        ],
        InvoiceInformation: [
          {
            label: "单位名称：",
            value: "",
            tips: "梧州水司"
          },
          {
            label: "纳税人识别号：",
            value: "",
            tips: "12441400714861777E "
          },
          {
            label: "联系地址：",
            value: "",
            tips: ""
          },
          {
            label: "联系电话：",
            value: "",
            tips: ""
          },


        ],
        workType: [
          {
            name: "居民",
            value: "1"
          },
          {
            name: "学校",
            value: "1"
          },
          {
            name: "公共事业",
            value: "1"
          },
          {
            name: "福利、敬老院",
            value: "1"
          },
          {
            name: "行政事业单位",
            value: "1"
          },
          {
            name: "部队",
            value: "1"
          },
          {
            name: "医疗卫生单位",
            value: "1"
          },
          {
            name: "能源",
            value: "1"
          },
        ],
        //证件类型
        idcardTypeList: [
          {
            name: '居民身份证',
            value: '0'
          },
          {
            name: '护照',
            value: '1'
          },
          {
            name: '户口本',
            value: '2'
          },
          {
            name: '回乡证',
            value: '3'
          },
          {
            name: '台胞证',
            value: '4'
          },
        ],
        // 用户信息
        backfillInput: [

          {
            label: "投递户名：",
            value: "",
            tips: "000"
          },
          {
            label: "投递邮政编码：",
            value: "",
            tips: "2007-07-04"
          },
          {
            label: "账单投递地址：",
            value: "",
            tips: ""
          },
          {
            label: "联系人：",
            value: "",
            tips: ""
          },
          {
            label: "短信手机：",
            value: "",
            tips: ""
          },
          {
            label: "邮箱：",
            value: "",
            tips: ""
          },
          {
            label: "供水合同号：",
            value: "",
            tips: ""
          },
          {
            label: " 合同签订日期：",
            value: "",
            tips: ""
          },
          {
            label: "证件类型：",
            value: "",
            tips: ""
          },
          {
            label: " 证件号码：",
            value: "",
            tips: ""
          },
          {
            label: "户口本号：",
            value: "",
            tips: ""
          },
          {
            label: " 房产证号：",
            value: "",
            tips: ""
          },




        ],
        backfillInputOnly: [
          {
            label: "册本号：",
            value: "",
            tips: "165497974"
          },
          {
            label: "区域名称：",
            value: "",
            tips: "城区"
          },
          {
            label: "用户状态：",
            value: "",
            tips: "启用"
          },
          {
            label: "用户编号：",
            value: "",
            tips: "13016546"
          },
          {
            label: "用水类型：",
            value: "",
            tips: "非居民用水"
          },
        ],
        // 水表信息
        changeTbaleInfoForm: [
          {
            label: "水表编号：",
            value: "",
            tips: "16549793487874"
          },
          {
            label: "水表口径：",
            value: "",
            tips: "15"
          },
          {
            label: "抄表日：",
            value: "",
            tips: "20"
          },
          {
            label: "装表日期：",
            value: "",
            tips: "2007-07-04"
          },
          {
            label: "拆表日期：",
            value: "",
            tips: ""
          },
          {
            label: "抄表周期：",
            value: "",
            tips: "偶月抄"
          },


        ],

        // 客户信息
        ContractInformation: [
          {
            label: "客户类型：",
            value: "",
            tips: "普通用户"
          },
          {
            label: '信用等级',
            value: '',
            tips: '二级',
          },
          {
            label: "联系电话：",
            value: "",
            tips: "13662592308"
          },
          {
            label: '手机号码',
            value: '',
            tips: '18866222090'
          },
          {
            label: "联系人：",
            value: "",
            tips: "谢顺新"
          },
          {
            label: "客户地址：",
            value: "",
            tips: "宝积山路、体育巷"
          },
          {
            label: "客户名称：",
            value: "",
            tips: "谢顺新"
          },
        ],
        ContractInformation1: [
          // {
          //   label:'信用等级',
          //   value:'',
          //   tips:'二级',
          // },
          {
            label: "联系电话：",
            value: "",
            tips: "13662592308"
          },
          {
            label: '手机号码',
            value: '',
            tips: '18866222090'
          },
          {
            label: "联系人：",
            value: "",
            tips: "谢顺新"
          },
          {
            label: "客户地址：",
            value: "",
            tips: "宝积山路、体育巷"
          },
          {
            label: "客户名称：",
            value: "",
            tips: "谢顺新"
          },
        ],
        // 账户信息
        countMsg: [

          {
            label: "托收号：",
            value: "",
            tips: "101801012001"
          },
          {
            label: "托收合同号：",
            value: "",
            tips: "101801012001"
          },


        ],
        countMsgOrder: [
          {
            label: "开户名称：",
            value: "",
            tips: "梅州粤海水务有限公司"
          },
          // {
          //   label: "银行账户：",
          //   value: "",
          //   tips: "101801012001"
          // },

          // {
          //   label: "银行签约日期：",
          //   value: "",
          //   tips: "20180-02-13"
          // },
        ],


        desc: "",
        userNume: "",
        descoptions: [
          {
            name: "启用",
            value: "1",

          },
          {
            name: "停用",
            value: "2"
          }
        ],
        ReasonsTransfer: [
          {
            name: "二手房买卖",
            value: ""
          },
          {
            name: "商品房买卖",
            value: ""
          },
          {
            name: "原户主身故",
            value: ""
          },
          {
            name: "租户转户",
            value: ""
          },
          {
            name: "单位转户",
            value: ""
          },
          {
            name: "亲属转户",
            value: ""
          },
        ],
        customerType: [
          {
            name: "普通用户",
            value: ""
          },
          {
            name: "VIP客户",
            value: ""
          },
          {
            name: "大客户",
            value: ""
          },
        ],
        PriceStrategy: "",
        isfines: "",
        UpdateCodeCopye: "",
        Remarks: "",
        year: "",
        bankName: [
          {
            name: "中国银行",
            value: "1"
          }
        ],
        bankName1: [
          {
            name: "收据",
            value: "1"
          },
          {
            name: "普通发票",
            value: "2"
          },
          {
            name: "专用发票",
            value: "3"
          }
        ],
        PaymentMethod: [
          {
            name: "托收",
            value: "1"
          },
          {
            name: "代扣",
            value: "2"
          },
          {
            name: "其他",
            value: "3"
          }
        ]
      },
      rules: {
        userNume: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ]
      },
      histroyData: {}

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
    },
  }
}
</script>
<style lang="scss">
.TransferAdd {
  height: 91%;
  overflow: hidden;
  .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: 88%;
      overflow-y: auto;
    }
  }
  

  .goright {
    // margin-left: 88%;
    float: right;
    margin-top: -5px;
  }
  .beizhu {
    width: 64% !important;
    .el-form-item__content {
      width: 77% !important;
    }
  }
  .el-date-editor /deep/ .el-input__inner {
    width: 100% !important;
  }
  .el-input__inner {
    height: 30px;
  }
  .el-form-item {
    margin-bottom: 10px;
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
    width: 99%;
    .el-form-item {
      width: 32%;
      .el-form-item__content {
        width: 50%;
        .el-select {
          width: 100%;
        }
      }
    }
    .userCode {
      .el-form-item__content {
        width: 59% !important;
        .el-input {
          width: 65% !important;
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
          width: 80%;
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

