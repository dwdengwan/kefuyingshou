<template>
  <div class="userInfor">
    <el-form class="backfillSubmitForm" :inline="true" :model="userInforForm" label-width="140px" ref="ruleForm" :rules="rules">
      <legend>客户信息</legend>

      <el-form-item label="客户编号：">
        <el-input v-model="userInforForm.countNum" placeholder="01003152" disabled class="read-only"></el-input>
      </el-form-item>

      <el-form-item label="客户名称：">
        <el-input v-model="userInforForm.countNum" placeholder="张三" ></el-input>
      </el-form-item>

      <el-form-item label="客户地址：">
        <el-input v-model="userInforForm.countNum" placeholder="宝积山路、体育巷"></el-input>
      </el-form-item>

      <el-form-item label="客户类型：">
        <el-input v-model="userInforForm.countNum" placeholder="大客户"></el-input>
      </el-form-item>

      <el-form-item label="信用等级：">
        <el-input v-model="userInforForm.countNum" placeholder="二级"></el-input>
      </el-form-item>

      <el-form-item label="联系人：">
        <el-input v-model="userInforForm.countNum" placeholder="谢顺新"></el-input>
      </el-form-item>

      <el-form-item label="联系电话：">
        <el-input v-model="userInforForm.countNum" placeholder="13662592308"></el-input>
      </el-form-item>

      <el-form-item label="手机号码：">
        <el-input v-model="userInforForm.countNum" placeholder="15566778899"></el-input>
      </el-form-item>

      <!-- <legend>账户信息</legend>
      <el-form-item label="账户编号：">
        <el-input v-model="userInforForm.PriceStrategy" placeholder="101801012001" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="账户类型：">
        <el-input v-model="userInforForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="缴费方式：">
        <el-input v-model="userInforForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in userInforForm.countMsg" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="开户行：">
        <el-input v-model="userInforForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in userInforForm.countMsgOrder" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item> -->

      <!-- <legend>开票信息</legend>
      <el-form-item label="发票类型：" prop="desc">
        <el-input v-model="userInforForm.desc" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in userInforForm.InvoiceInformation" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="开户行：">
        <el-input v-model="userInforForm.year" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：">
        <el-input v-model="userInforForm.bankCountNum" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="投递方式：">
            <el-input v-model="userInforForm.bankCountNum" placeholder="自取" disabled class="read-only"></el-input>
          </el-form-item> -->

      <legend>用户-基础信息</legend>
      <el-form-item label="用户编号：" prop="userNume">
        <el-input v-model="userInforForm.userNume" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="isfines">
        <el-input v-model="userInforForm.isfines" :disabled="isEdit" placeholder="有限公司"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="isfines">
        <el-input v-model="userInforForm.isfines" :disabled="isEdit" placeholder="有限公司"></el-input>
      </el-form-item>
      <el-form-item label="证件类型：" prop="idcardType">
        <el-select clearable v-model="userInforForm.idcardType" :disabled="isEdit" placeholder="居民身份证">
          <el-option v-for="(item,index) in userInforForm.idcardTypeList" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码：" prop="isfines" class="idCard">
        <el-input v-model="userInforForm.isfines" :disabled="isEdit" placeholder="">
          <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="供水合同号：" prop="isfines">
        <el-input v-model="userInforForm.isfines" :disabled="isEdit" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="营业网点：" prop="region">
        <el-select clearable v-model="userInforForm.region" :disabled="isEdit" placeholder="城区">
          <el-option v-for="(item,index) in userInforForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行政区域：" prop="desc">
        <el-select clearable v-model="userInforForm.desc" :disabled="isEdit" placeholder="城区">
          <el-option v-for="(item,index) in userInforForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理区域：" prop="desc">
        <el-select clearable v-model="userInforForm.desc" :disabled="isEdit" placeholder="城区">
          <el-option v-for="(item,index) in userInforForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="营业站点：" prop="BusinessSite">
        <el-select clearable v-model="userInforForm.BusinessSite" placeholder="营业部">
          <el-option v-for="(item,index) in userInforForm.BusinessSite" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item> -->

      <!-- <el-form-item>
        <span slot="label">
          <el-checkbox v-model="userInforForm.userNum">短信手机：</el-checkbox>
        </span>
        <el-input v-model="userInforForm.PriceStrategy" placeholder="1354687952"></el-input>
      </el-form-item> -->

      <el-form-item :label="v.label" v-for="(v,i) in userInforForm.ComparisonTableInfoForm" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="短信签约：">
        <el-radio v-model="userInforForm.radio" label="1"  :disabled="isEdit">是</el-radio>
        <el-radio v-model="userInforForm.radio" label="2"  :disabled="isEdit">否</el-radio>
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in userInforForm.ComparisonTableInfoForm1" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="立户日期：" prop="Remarks">
        <el-date-picker v-model="userInforForm.Remarks" :disabled="isEdit" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="停用日期：" prop="Remarks1">
        <el-date-picker v-model="userInforForm.Remarks1" :disabled="isEdit" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="注销日期：" prop="Remarks2">
        <el-date-picker v-model="userInforForm.Remarks2" :disabled="isEdit" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      
      <el-form-item label="泵站：">
        <el-select clearable v-model="userInforForm.pumpingStation" :disabled="isEdit" placeholder="">
          <el-option v-for="(item,index) in userInforForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>

      <el-form-item label="大用户：">
        <el-radio v-model="userInforForm.radio1" label="1" :disabled="isEdit">是</el-radio>
        <el-radio v-model="userInforForm.radio1" label="2" :disabled="isEdit">否</el-radio>
      </el-form-item>

      <el-form-item label="用水期限：" prop="userWaterTime">
        <el-date-picker v-model="userInforForm.userWaterTime" :disabled="isEdit" type="date" placeholder="选择用水期限">
        </el-date-picker>
      </el-form-item>
      

      <el-form-item label="用户状态：">
        <el-select clearable v-model="userInforForm.userStuse" placeholder="" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.userStuseOption" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="拆表原因：">
        <el-select  clearable v-model="userInforForm.isfinesResult" placeholder="">
          <el-option v-for="(item,index) in userInforForm.isfinesOptinon" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投递标记：" prop="caliber4">
        <!-- <el-input v-model="userInforForm.date4" placeholder=""></el-input> -->
        <el-radio v-model="userInforForm.date4" label="1" :disabled="isEdit">是</el-radio>
        <el-radio v-model="userInforForm.date4" label="2" :disabled="isEdit">否</el-radio>
      </el-form-item>
      <el-form-item label="邮政编码：" prop="caliber6">
        <el-input v-model="userInforForm.date5" placeholder="" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="投递备注：">
        <el-input v-model="userInforForm.userNume" placeholder="" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="备注：" class="beizhu">
        <el-input v-model="userInforForm.desc1" placeholder="请输入备注" :disabled="isEdit">
        </el-input>
      </el-form-item>
      <!-- <legend>用户-合同信息</legend>
      <el-form-item label="立户日期" prop="Remarks4">
        <el-input v-model="userInforForm.Remarks4" placeholder="2007-12-20"></el-input>
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in userInforForm.ContractInformation" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips"></el-input>
      </el-form-item> -->
      <legend>用户-分类信息</legend>
      <!-- <el-form-item :label="v.label" v-for="(v,i) in userInforForm.classifyPropOptions" :key="i">
        <el-select clearable v-model="v.value" :placeholder="tips">
          <el-option v-for="(item,index) in v.options" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="行业分类：" prop="TypesWaterUse">
        <el-select clearable v-model="userInforForm.TypesWaterUse1" :disabled="isEdit" placeholder="居民">
          <el-option v-for="(item,index) in userInforForm.workType" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="水表类型：" prop="TypesWaterUse">
        <el-select clearable v-model="userInforForm.TypesWaterUse" :disabled="isEdit" placeholder="实体表">
          <el-option v-for="(item,index) in userInforForm.TypesWwaterUse" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="虚拟计算公式：" prop="uuu" v-if="userInforForm.TypesWaterUse == 2">
        <el-input v-model="userInforForm.yuyuy" placeholder="" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="水表用途：" prop="WaterPropertie">
        <el-select clearable v-model="userInforForm.WaterPropertie" placeholder="一般用途" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.WaterProperties" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="用水对象：" prop="CategorisWaterUse">
        <el-select clearable v-model="userInforForm.CategorieWaterUse" placeholder="用户表" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.CategoriesWaterUse" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>
      <!-- <el-form-item label="计量方式：" prop="ClassificationUse">
        <el-select clearable v-model="userInforForm.ClassificationUse" placeholder="正常表" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.ClassificationUses" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item> -->
      
      
      <legend>用户-水表信息</legend>
      <el-form-item label="水表编号：" prop="code">
        <el-input v-model="userInforForm.code" placeholder="" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="装表地址：" prop="address">
        <el-input v-model="userInforForm.address" placeholder="" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="装表位置：" prop="address1">
        <el-select clearable v-model="userInforForm.caliber5" placeholder="户内" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.caliberoptions3" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="水表口径：" prop="caliber">
        <!-- <el-select clearable disabled class="read-only" v-model="userInforForm.caliber" placeholder="15">
          <el-option v-for="(item,index) in userInforForm.caliberoptions" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select> -->
        <el-input v-model="userInforForm.caliberoption1" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表厂家：" prop="caliber">
        <!-- <el-select clearable disabled class="read-only" v-model="userInforForm.caliber" placeholder="">
          <el-option v-for="(item,index) in userInforForm.caliberoptions1" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select> -->
        <el-input v-model="userInforForm.caliberoption2" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="水表型号：" prop="caliber">
        <!-- <el-select clearable disabled class="read-only" v-model="userInforForm.caliber" placeholder="">
          <el-option v-for="(item,index) in userInforForm.caliberoptions2" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select> -->
        <el-input v-model="userInforForm.caliberoption3" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="新装日期：" prop="Remarks3">
        <el-date-picker v-model="userInforForm.Remarks3" type="date" placeholder="选择日期" :disabled="isEdit">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="换表日期：" prop="Remarks4">
        <el-date-picker v-model="userInforForm.Remarks4" type="date" placeholder="选择日期" :disabled="isEdit">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="拆表日期：" prop="Remarks5">
        <el-date-picker v-model="userInforForm.Remarks5" type="date" placeholder="选择日期" :disabled="isEdit">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item :label="v.label" v-for="(v,i) in userInforForm.WaterMeter" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips"></el-input>
      </el-form-item> -->
      <!-- <el-form-item :label="v.label" v-for="(v,i) in userInforForm.WaterMeterpOptions" :key="i">
        <el-select clearable v-model="v.value" :placeholder="tips">
          <el-option v-for="(item,index) in v.options" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="位置分类：" class="Whether">
        <el-input v-model="userInforForm.userNume" placeholder="室外"></el-input>
        <el-checkbox v-model="userInforForm.VirtualTable">虚拟表</el-checkbox>
      </el-form-item> -->
      <!-- <legend>用户-抄表信息</legend>
      <el-form-item label="册本号：" prop="year">
        <el-input v-model="userInforForm.year" placeholder="003E" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="排序号：" prop="year1">
        <el-input v-model="userInforForm.year1" placeholder="1" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="抄表日：" prop="caliber1">
        <el-input v-model="userInforForm.date1" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="抄表周期：" prop="caliber2">
        <el-input v-model="userInforForm.date2" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="最后抄码：" prop="caliber3">
        <el-input v-model="userInforForm.date3" placeholder="" disabled class="read-only"></el-input>
      </el-form-item> -->
      
      <!-- <legend>用户-价格信息</legend>
      <el-form-item label="垃圾费类型：" v-if="false">
        <el-select clearable v-model="userInforForm.TypesGarbageCharges" placeholder="" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费标准1：" v-if="false">
        <el-select clearable v-model="userInforForm.TypesGarbageCharges1" placeholder="" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费标准2：" v-if="false">
        <el-select clearable v-model="userInforForm.TypesGarbageCharges2" placeholder="" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用水类型：">
        <el-select clearable v-model="userInforForm.TypesGarbageCharges3" placeholder="" :disabled="isEdit">
          <el-option v-for="(item,index) in userInforForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="违约金策略：" prop="caliber3">
        <el-input v-model="userInforForm.date8" placeholder="" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="用水人口：" prop="a5">
        <el-input v-model="userInforForm.a5" placeholder="" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="详细价格：" prop="tyi" class="selectCheck">
        <el-table stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="费用明细">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="阶梯类型">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="开始水量">
          </el-table-column>

          <el-table-column prop="flux" min-width="80" label="结束水量">
          </el-table-column>

          <el-table-column prop="flux" min-width="50" label="单价">
          </el-table-column>

          <el-table-column prop="flux" min-width="50" label="系数">
          </el-table-column>

        </el-table>
      </el-form-item> -->
    </el-form>

  </div>
</template>
<script>
export default {
  name: "userInfor",
  props:{
      isEdit:{
          type:Boolean,
          default:false
      }
  },
  data() {
    return {
      userInforForm: {
        userStuse:'2',
        userStuseOption:[
          {
                name: "注销",
                value: "1"
              },
              {
                name: "正常",
                value: "2"
              },
              {
                name: "停用",
                value: "3"
              },
        ],
        isfinesOptinon:[
              {
                name: "欠费拆表",
                value: "1"
              },
              {
                name: "停用拆表",
                value: "2"
              },
              {
                name: "销户拆表",
                value: "3"
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
        radio: '1',
        radio1: '1',
        bankName: [
          {
            name: "中国银行",
            value: '1'
          }
        ],
        InvoiceInformation: [
          {
            label: "单位名称：",
            value: "",
            tips: ""
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
        countMsgOrder: [
          {
            label: "开户名：",
            value: "",
            tips: "梅州粤海水务有限公司"
          },
          {
            label: "银行账户：",
            value: "",
            tips: "101801012001"
          },
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

          // {
          //     label:"银行签约日期：",
          //     value:"",
          //     tips:"20180-02-13"
          // },
        ],
        countMsg: [
          {
            label: "余额：",
            value: "",
            tips: ""
          },

          


        ],

        // 用户-基础信息
        ComparisonTableInfoForm: [
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
        ComparisonTableInfoForm1: [
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
          // {
          //   label: "虚拟计算公式：",
          //   value: "",
          //   tips: ""
          // },


        ],
        Waterworks: "",
        pumpingStation: "",
        Pipeline: "",
        // 用户合同信息
        ContractInformation: [
          {
            label: "身份证号：",
            value: "",
            tips: ""
          },
          {
            label: "合同年限（月）：",
            value: "",
            tips: ""
          },
          {
            label: "签订日期：",
            value: "",
            tips: ""
          },
          {
            label: "供水合同号：",
            value: "",
            tips: ""
          },

        ],
        // 用户分类信息
        classifyPropOptions: [
          {
            label: "行业分类：",
            tips: "居民",
            value: "",
            options: [
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
            ]
          },
          {
            label: "计量收费标志：",
            tips: "计量收费",
            value: "",
            options: [
              {
                name: "计量收费",
                value: "1"
              },
              {
                name: "计量不收费",
                value: "1"
              },
              {
                name: "不计量收费",
                value: "1"
              },
              {
                name: "不计量不收费",
                value: "1"
              },
            ]
          },
          {
            label: "户型：",
            tips: "单户",
            value: "",
            options: [
              {
                name: "单户",
                value: "1"
              },
              {
                name: "多户",
                value: "1"
              },

            ]
          },
        ],
        TypesWaterUse: "",
        WaterPropertie: "",
        CategorieWaterUse: "",
        ClassificationUse: "",
        // 用户抄表信息
        MeterReading: [

          {
            label: "抄表顺序号：",
            value: "",
            tips: "2753"
          },
          {
            label: "新表起码：",
            value: "",
            tips: ""
          },
          {
            label: "旧抄表码：",
            value: "",
            tips: ""
          },
          {
            label: "邮箱：",
            value: "",
            tips: ""
          },
          {
            label: "投递人：",
            value: "",
            tips: ""
          },
          {
            label: "投递备注信息：",
            value: "",
            tips: ""
          },

        ],
        MeterReadingOnly: [
          {
            label: "抄表日：",
            value: "",
            tips: "20"
          },
          {
            label: "抄表周期：",
            value: "",
            tips: "每月"
          },
          {
            label: "本期行度：",
            value: "",
            tips: ""
          },
        ],
        yes: "",
        no: "",
        // 用户水表信息
        WaterMeter: [
          {
            label: "水表编号：",
            value: "",
            tips: "20"
          },
          {
            label: "出厂编号：",
            value: "",
            tips: "每月"
          },
          {
            label: "有效日期：",
            value: "",
            tips: ""
          },
          {
            label: "装表日期：",
            value: "",
            tips: "2753"
          },
          {
            label: "换表日期：",
            value: "",
            tips: ""
          },
          {
            label: "拆表日期：",
            value: "",
            tips: ""
          },
        ],
        WaterMeterpOptions: [
          {
            label: "表类型：",
            tips: "机械表",
            value: "",
            options: [
              {
                name: "机械表",
                value: "1"
              },
              {
                name: "智能表",
                value: "1"
              },
            ]
          },
          {
            label: "厂家名称：",
            tips: "宁波",
            value: "",
            options: [
              {
                name: "宁波",
                value: "1"
              },
              {
                name: "上海",
                value: "1"
              },
              {
                name: "梅花",
                value: "1"
              },
              {
                name: "常德",
                value: "1"
              },
              {
                name: "开封",
                value: "1"
              },
            ]
          },
          {
            label: "信用等级：",
            tips: "A",
            value: "",
            options: [
              {
                name: "A",
                value: "1"
              },
              {
                name: "B",
                value: "1"
              },
              {
                name: "C",
                value: "1"
              },
              {
                name: "D",
                value: "1"
              },

            ]
          },
          {
            label: "总分表：",
            tips: "",
            value: "",
            options: [
              {
                name: "否",
                value: "1"
              },
              {
                name: "总表",
                value: "1"
              },
              {
                name: "分表",
                value: "1"
              },
            ]
          },
          {
            label: "字母表：",
            tips: "",
            value: "",
            options: [
              {
                name: "否",
                value: "1"
              },
              {
                name: "子表",
                value: "1"
              },
              {
                name: "母表",
                value: "1"
              },
            ]
          },
        ],
        UnplannedMeterReading: "",
        caliber: "",
        caliberoptions1: [],
        caliberoptions2: [],
        caliberoptions3: [
          {
            name: '户内',
            value: "1"
          },
          {
            name: '户外',
            value: "2"
          },
        ],
        caliberoptions: [
          {
            name: 15,
            value: "1"
          },
          {
            name: 20,
            value: "2"
          },
          {
            name: 25,
            value: "3"
          },
          {
            name: 40,
            value: "4"
          },
          {
            name: 50,
            value: "5"
          },
          {
            name: 80,
            value: "6"
          },
          {
            name: 100,
            value: "7"
          },
        ],
        // 用户价格信息
        PriceInfo: [
          {
            label: "水费比率（%）：",
            value: "",
            tips: "20"
          },
          {
            label: "污水费比率（%）：",
            value: "",
            tips: "100.00"
          },
          {
            label: "最低用水量：",
            value: "",
            tips: "0"
          },
          {
            label: "人数：",
            value: "",
            tips: ""
          },
          {
            label: "垃圾费比率（%）：",
            value: "",
            tips: "2753"
          },
          {
            label: "垃圾费数量：",
            value: "",
            tips: ""
          },
          {
            label: "每月应收垃圾费：",
            value: "",
            tips: ""
          },
        ],
        desc: "",
        userNume: "",
        descoptions: [
        ],
        asd: [
          {
            name: "计量、计费",
            value: "1"
          },
          {
            name: "计量、不计费",
            value: "2"
          },
          {
            name: "不计量、计费",
            value: "3"
          },
          {
            name: "不计量、不计费",
            value: "4"
          },
        ],
        areas: [
          {
            name: "城区",
            value: "1"
          },
          {
            name: "农村",
            value: "2"
          },
        ],
        BusinessSite: [
          {
            name: "营业部",
            value: "1"
          },
        ],
        idcardTypeList: [
          {
            name: "居民身份证",
            value: "1"
          },
          {
            name: "户口本",
            value: "2"
          },
          {
            name: "护照",
            value: "3"
          },
          {
            name: "回乡证",
            value: "4"
          },
          {
            name: "台胞证",
            value: "5"
          },
        ],
        TypesWwaterUse: [
          {
            name: "实体表",
            value: "1"
          },
          {
            name: "虚拟表",
            value: "2"
          },
        ],
        WaterProperties: [
          {
            name: "一般用途",
            value: "1"
          },
          {
            name: "消防表",
            value: "2"
          },
          {
            name: "监控表",
            value: "3"
          },
          {
            name: "总分总表",
            value: "4"
          },
        ],
        CategoriesWaterUse: [
          {
            name: "用户表",
            value: "1"
          },
          {
            name: "自用表",
            value: "2"
          },
        ],
        ClassificationUses: [
          {
            name: "正常表",
            value: "1"
          },
          {
            name: "总分总表",
            value: "3"
          },
          {
            name: "总分分表",
            value: "4"
          },
          // {
          //   name: "公司表内部",
          //   value: "5"
          // },
        ],
        PriceType: [
          {
            name: "0038__工业用水3.54",
            value: "1"
          },
          {
            name: "0015__特种用水3.54",
            value: "2"
          },
          {
            name: "0029__区域用水3.54",
            value: "3"
          },
          {
            name: "0030__基本水价3.54",
            value: "4"
          },
          {
            name: "0039__特种用水3.54",
            value: "5"
          },
          {
            name: "0040__生活用水3.54",
            value: "6"
          },
          {
            name: "0041__免费用水3.54",
            value: "7"
          },
        ],
        userNum: "",
        PriceStrategy: "",
        isfines: "",
        isfinesResult: "1",
        userWaterTime:'',
        UpdateCodeCopye: "",
        Remarks: "",
        year: "",
        countNum: "",
        PaymentMethod: "",
        bankName: "",
        status: "",
        region: "",
        BusinessSite: "",
        bankNameOptions: [
          {
            name: "中国银行",
            value: "1"
          }
        ],
        PaymentMethodOption: [
          {
            name: "托收",
            value: "1"
          }
        ],
        statusoptions: [
          {
            name: "启用",
            value: "1",

          },
          {
            name: "停用",
            value: "2"
          }
        ],
        VirtualTable: "",
        TypesGarbageCharges: "",
        PriceTypes: "",

      },
      rules: {
        userNume: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择城区', trigger: 'blur' },
        ],
        BusinessSite: [
          { required: true, message: '请选择营运站点', trigger: 'blur' },
        ],
        TypesWaterUse: [
          { required: true, message: '请选择用水类型', trigger: 'blur' },
        ],
        WaterPropertie: [
          { required: true, message: '请选择用水性质', trigger: 'blur' },
        ],
        CategorieWaterUse: [
          { required: true, message: '请选择用水类别', trigger: 'blur' },
        ],
        ClassificationUse: [
          { required: true, message: '请选择用途分类', trigger: 'blur' },
        ],
        caliber: [
          { required: true, message: '请选择水表口径', trigger: 'blur' },
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
            areaName: "40%",
            code: "居民阶梯水费",
            concentrator: "",
            connect: null,
            daytime: "月阶梯",
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
            areaName: "60%",
            code: "居民阶梯水费",
            concentrator: "",
            connect: null,
            daytime: "月阶梯",
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
            areaName: "80%",
            code: "居民阶梯水费",
            concentrator: "",
            connect: null,
            daytime: "月阶梯",
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
            areaName: "100%",
            code: "居民阶梯水费",
            concentrator: "",
            connect: null,
            daytime: "非阶梯",
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
.userInfor {
  overflow-y: auto;
  height: 100%;
  .el-date-editor /deep/ .el-input__inner {
    width: 100% !important;
  }
  .beizhu {
    width: 72% !important;
    .el-form-item__content {
      width: 73% !important;
    }
  }
  .read-only .el-input__inner {
    border: none;
    border-bottom: 1px solid #ccc;
    background: transparent;
    border-radius: 0px;
    cursor: text !important;
    &::-webkit-input-placeholder {
      color: #000;
    }
    &::-moz-placeholder {
      color: #000;
    }
    &:-ms-input-placeholder {
      color: #000;
    }
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
    width: 100%;
    .el-form-item {
      width: 32%;
      margin-bottom: 5px;
      margin-top: 0px;
      .el-form-item__content {
        width: 60%;
        .el-select,
        .el-input {
          width: 100%;
        }
      }
    }
    .userAdress {
      width: 80%;
      .el-form-item__content {
        width: calc(100% - 150px);
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
    .selectCheck {
      width: 100% !important;
      .el-form-item__content {
        width: calc(100% - 150px) !important;
        .el-form-item__label {
          width: 80px !important;
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
          width: 77%;
        }
      }
    }
    .Whether {
      width: 55%;
      .el-form-item__content {
        width: 70%;
        .el-form-item__label {
          width: 100px !important;
        }
        .el-textarea,
        .el-input,
        .el-select {
          width: 43%;
        }
      }
    }
    .Remarks {
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 150px);
      }
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-input__inner {
      height: 30px;
    }
  }
  .el-steps--horizontal {
    margin: 0 auto;
    width: 50%;
    padding-bottom: 20px;
  }
}
</style>
