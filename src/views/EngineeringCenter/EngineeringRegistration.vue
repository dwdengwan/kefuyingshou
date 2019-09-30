<template>
  <div class="Engineering-Registration-content">
    <!-- 弹出表单选择客户 -->
    	<el-dialog :title="choosectmName" :visible.sync="choosectmVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
            <choosectm
                ref="childWaterEditor" 
                
            ></choosectm>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
		    </div>
    	</el-dialog>
    <!-- 弹出表单选择账户 -->
    	<el-dialog :title="chooseAccountName" :visible.sync="chooseAccountVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
            <chooseAccount
                ref="childWaterEditor" 
                
            ></chooseAccount>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
		    </div>
    	</el-dialog>
    <div class="bread-contain" v-if='chooseDioag'>
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      
      <div class="bread-contain-right" >
        <el-button size="mini" type="primary" @click="saveWiter()">保存</el-button>
        <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialogChooseCus" style="margin-right:1.5%;">返回</el-button>
      </div>
    </div>
    
    <div class="bread-contain" v-else>
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if='!editContent && !uploadPic'>
        <!-- <span class="btnBox"> -->
          <el-button size="mini" type="primary" @click="upload()">上传附件</el-button>
          <el-button size="mini" type="primary" @click='waterInfo()'>多水表录入</el-button>
          <!-- submitForm('EngineeringForm') -->
          <el-button size="mini" type="primary" @click="submitForm()">保存</el-button>
          <el-button size="mini" type="primary">电子签名</el-button>
          <el-button size="mini" type="primary">打印申请表</el-button>
          <el-button size="mini" type="primary" @click="submitForm()">提交</el-button>
          <!-- <el-button size="mini" type="primary" style="margin-right: 1.5%;">添加</el-button> -->
          <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog('add')" style="margin-right: 1.5%">返回</el-button>
        <!-- </span> -->
      </div>
      <div class="bread-contain-right" v-if='!editContent && uploadPic'>
        <el-button icon="el-icon-caret-left" size="mini" @click="comeBack()" style="margin-right:1.5%;">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if='editContent'>
        <!-- 用户工程-工程登记-水表明细 -->
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addWiter()">添加</el-button>
        <el-button size="mini" type="primary" icon="el-icon-bottom">下载模板</el-button>
        <el-button size="mini" type="primary" icon="el-icon-download">导入</el-button>
        <el-button size="mini" type="primary" @click="saveWiter()">保存</el-button>
        <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog" style="margin-right:1.5%;">返回</el-button>
      </div>
    </div>

    <div class="engineer-center-right-content" v-if='!editContent'>
      
      
       <div v-if ='chooseDioag' >
        <ChoosingCustomers></ChoosingCustomers>
      </div>
      <div v-else> 
      <div v-if='!uploadPic' class="kr-uploadF">
          <el-form 
              class='kr-form'
              :model="ruleForm" 
              ref="EngineeringForm" 
              :show-message="false" 
              :rules="rules" 
              label-width="135px">
              <el-row>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="业主名称：" prop="ownerName">
                      <el-input v-model="ruleForm.ownerName" size="mini" clearable></el-input>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="业主证件类型：" prop="ownerId">
                      <el-select v-model="ruleForm.ownerId" clearable size="mini" style="width:100%">
                        <el-option v-for="item in ownerIdType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                  <el-form-item label="业主证件号码：" prop="ownerNumber">
                    <el-input placeholder="证件号码" v-model="ruleForm.ownerNumber" class="input-with-select" clearable>
                      <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
                    </el-input>
                  </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <el-form-item label="申请日期：" prop="applicantDate">
                      <el-date-picker
                        v-model="ruleForm.applicantDate"
                        type="date"
                        placeholder="2019-09-02" clearable>
                      </el-date-picker>
                    </el-form-item>
                  <!-- <div class="my-input"> -->
                    
                  <!-- </div> -->
                </el-col>
              </el-row>
              
              <el-row>
                
                <el-col :span="6">
                  <el-form-item label="工程类型：" prop="engineerType">
                      <el-select v-model="ruleForm.engineerType" clearable size="mini" style="width:100%">
                        <el-option v-for="item in engineerDataType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="紧急程度：" prop="Emergency">
                      <el-select v-model="ruleForm.Emergency" clearable size="mini" style="width:100%">
                        <el-option v-for="item in urgencyType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系人：" prop="Contacts">
                      <el-input v-model="ruleForm.Contacts" size="mini" clearable></el-input>
                    </el-form-item>
                  <!-- <div class="my-input"> -->
                    
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系电话：" prop="contactNumber">
                    <el-input v-model="ruleForm.contactNumber" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="用户地址：" prop="userAddress">
                    <el-input v-model="ruleForm.userAddress" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="装表地址：" prop="waterAddress">
                      <el-input v-model="ruleForm.waterAddress" size="mini" clearable></el-input>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <el-form-item label="经办人证件类型：" prop="userId">
                    <el-select v-model="ruleForm.userId" clearable size="mini" style="width:100%">
                      <el-option v-for="item in ownerIdType" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="经办人证件号码：" prop="userIdNum">
                    <!-- <el-input v-model="ruleForm.userIdNum" size="mini" clearable></el-input> -->
                    <el-input placeholder="证件号码" v-model="ruleForm.userIdNum" class="input-with-select">
                      <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                
                
              </el-row>

              <el-row>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="营业网点：" prop="businessArea">
                      <el-select v-model="ruleForm.businessArea" clearable size="mini" style="width:100%">
                        <el-option v-for="item in businessAreaList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="行政区域：" prop="AdministrationArea">
                      <el-select v-model="ruleForm.AdministrationArea" clearable size="mini" style="width:100%">
                        <el-option v-for="item in AdministrationAreaList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="管理区域：" prop="userArea">
                      <el-select v-model="ruleForm.userArea" clearable size="mini" style="width:100%">
                        <el-option v-for="item in AdministrationAreaList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="原户号：" prop="oldNum">
                      <el-input v-model="ruleForm.oldNum" size="mini" clearable></el-input>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="总表户号：" prop="generalTableNum1">
                      <el-input v-model="ruleForm.generalTableNum1" size="mini" clearable></el-input>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="总表户号2：" prop="generalTableNum2">
                      <el-input v-model="ruleForm.generalTableNum2" size="mini" clearable></el-input>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <el-form-item label="用水期：" prop="waterUse">
                      <el-select v-model="ruleForm.waterUse" clearable size="mini" style="width:100%">
                        <el-option v-for="item in waterUseType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="6">
                  <!-- <div class="my-input"> -->
                    <!-- <el-form-item label="装表数量：" prop="putTableNum">
                      <el-input v-model="ruleForm.putTableNum" size="mini" placeholder="1" disabled class="read-only"></el-input>
                    </el-form-item> -->
                    <el-form-item label="用水期限：" prop="putTableNum">
                      <el-date-picker
                        v-model="ruleForm.putTableNum"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
              </el-row>

              <el-row>
              
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <!-- <div class="my-input gocenter"> -->
                    <el-form-item label="申请原因：" prop="applicationReasons">
                      <el-input type="textarea" v-model="ruleForm.applicationReasons" style="width:100%"></el-input>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
                <el-col :span="12">
                  <!-- <div class="my-input gocenter"> -->
                    <el-form-item label="派单说明：" prop="paymentNote">
                      <el-input type="textarea" v-model="ruleForm.paymentNote" style="width:100%"></el-input>
                    </el-form-item>
                  <!-- </div> -->
                </el-col>
              </el-row>
            
              
          </el-form>
        
          <el-form 
                  class="backfillSubmitForm" 
                  :model="countManagementEditForm" 
                  label-width="120px" 
                  ref="ruleForm" 
                  :rules="rules">
                  <!-- :inline="true"  -->
              <legend>
                客户信息
                <el-button size="mini" type="primary" style="float: right;margin-top: -5px;" @click="chooseCus()">选择客户</el-button>
              </legend>
              
              <el-row>
                <!-- v-for="(v,i) in countManagementEditForm.backfillInput" :key="i" -->
                <el-col :span="6">
                  <el-form-item label="客户编号：">
                    <el-input v-model="countManagementEditForm.backfillInput.peopleCode" placeholder="新立户" disabled class="read-only"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="客户类型：">
                    <el-select v-model="countManagementEditForm.backfillInput.peopleLevel" clearable size="mini" style="width:100%">
                      <el-option v-for="item in countManagementEditForm.backfillInput.peopleLevelType" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <legend>
                账户信息
                <el-button size="mini" type="primary" style="float: right;margin-top: -5px;" @click="chooseAccount">选择账户</el-button>
              </legend>
              <el-row>
                <el-col :span='6'>
                  <!-- 账户编号 -->
                  <el-form-item label="账户编号：">
                    <el-input v-model="countManagementEditForm.countMsg.PriceStrategy" placeholder="新开户" disabled class="read-only"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label="缴费方式：">
                    <el-select  clearable v-model="countManagementEditForm.countMsg.isfines" placeholder="">
                      <el-option  v-for="(item,index) in countManagementEditForm.PaymentMethod" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="账户类型：" prop="userType">
                    <el-select v-model="countManagementEditForm.userType" clearable size="mini" style="width:100%">
                      <el-option v-for="item in countManagementEditForm.userTypeList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                
                <el-col :span='6'>
                  <el-form-item label="开户银行：">
                    <el-select  clearable v-model="countManagementEditForm.countMsg.UpdateCodeCopye" placeholder="">
                        <el-option  v-for="(item,index) in countManagementEditForm.bankName" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span='6'>
                  <el-form-item label="账户名称：">
                    <el-input v-model="countManagementEditForm.countMsgOrder.value" placeholder="梅州粤海水务有限公司" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label="银行账户：">
                    <el-input v-model="countManagementEditForm.countMsgOrder.value1" class="input-with-select" clearable placeholder="101801012001">
                        <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span='6'>
                  <el-form-item label="托号：">
                    <el-input v-model="countManagementEditForm.countMsg.code" placeholder="101801012001" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label="托收合同号：">
                    <el-input v-model="countManagementEditForm.countMsg.codeNum" placeholder="101801012001" clearable></el-input>
                  </el-form-item>
                </el-col> -->
                
              </el-row>
              
              <el-row>
              </el-row>
              
              <legend>开票信息</legend>
              <el-row>
                <el-col :span='6'>
                  <el-form-item label="票据类型：" prop="desc">
                      <el-select  clearable v-model="countManagementEditForm.desc" placeholder="">
                        <el-option  v-for="(item,index) in countManagementEditForm.descType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单位名称：">
                    <el-input v-model="countManagementEditForm.InvoiceInformation.value" placeholder="粤海水务" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="纳税人识别号：">
                    <el-input v-model="countManagementEditForm.InvoiceInformation.value1" placeholder="12441400714861777E" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系地址：">
                    <el-input v-model="countManagementEditForm.InvoiceInformation.value2" placeholder="深圳市东深小区" clearable></el-input>
                  </el-form-item>
                </el-col>
                
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="联系电话：">
                    <el-input v-model="countManagementEditForm.InvoiceInformation.value3" placeholder="15544669988" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label="开户银行：">
                    <el-select  clearable v-model="countManagementEditForm.year" placeholder="">
                        <el-option  v-for="(item,index) in countManagementEditForm.bankName" :key="index" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span='6'>
                  <el-form-item label="银行账号：">
                    <el-input v-model="countManagementEditForm.bankCountNum" placeholder="" clearable></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span='6'>
                  <el-form-item label="银行账户：">
                    <el-input v-model="countManagementEditForm.bankCountNum" class="input-with-select" clearable placeholder="101801012001">
                        <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label="投递方式：">
                    <el-select  clearable v-model="countManagementEditForm.year1" placeholder="">
                        <el-option  v-for="(item,index) in countManagementEditForm.selectType" :key="index" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
          </el-form>
      </div>
      <div v-else>
        <uploadFile></uploadFile>
      </div>
      </div>
  
    </div>
    <div class="engineer-center-right-content" v-else>
      <waterMeter :isShow="isShow"></waterMeter>
    </div>
  </div>
</template>
<script>
import waterMeter from '@/components/waterMeter'
import uploadFile from '@/components/uploadPic'
import ChoosingCustomers from './ChoosingCustomers'
import chooseAccount from "@/components/accountInfo"
import choosectm from "@/components/ctmInfor"
export default {
  name: "engineer-center-index",
  components: {
    uploadFile,
    ChoosingCustomers,
    waterMeter,
    chooseAccount,
    choosectm
  },
  data() {
    return {
      choosectmName:"选择客户",
      choosectmVisible:false,
      chooseAccountName:"选择账户",
      chooseAccountVisible:false,
      chooseDioag:false,
      isShow:false,
      icon:'\ue617',
      oldData:'',
      tableData:[
        {
          userName:'焦文',
          userAddress:'东深小区',
          meterAddress:'科技大厦',
          Contacts:'0',
          contactNumber:'430124199412099909',
        },
        {
          userName:'焦文',
          userAddress:'东深小区',
          meterAddress:'科技大厦',
          Contacts:'0',
          contactNumber:'430124199412099909',
        }
      ],
      countManagementEditForm:{
                
        backfillInput:{
          peopleCode:'',
          peopleName:'',
          peopleAddress:'',
          people:'',
          peopleTel:'',
          peopleLevel:'0',

          peopleLevelType:[
            {
              value:'0',
              label:'普通客户',
            },
            {
              value:'1',
              label:'大客户',
            },
          ],
        },
        countMsg:{
          PriceStrategy:'',
          moreMoney:'',
          isfines:'1',
          codeNum:'',
          code:'',
          UpdateCodeCopye:'0',
        },
        countMsgOrder:{
          Remarks:'',
          value:'',
          value1:'',
          value3:'',
        },
        InvoiceInformation:{
          value:'',
          value1:'',
          value2:'',
          value3:'',
        },
        bankCountNum:"",
        desc:"0",
        descType:[//发票类型
          {
            value:'0',
            label:'收据',
          },
          {
            value:'1',
            label:'普通发票'
          },
          {
            value:'2',
            label:'专业发票',
          }
        ],
        userType:'1',
        userTypeList: [
          {
            value: '1',
            label: '私户'
          },
          {
            value: '2',
            label: '公户'
          },
        ],
        userNume:"",
        descoptions:[
          {
              name:"普通用户",
              value:"1"
          },
          {
              name:"VIP客户",
              value:"2"
          },
          {
              name:"大客户",
              value:"3"
          },
        ],
        PaymentMethod:[
            {
                name:"代扣",
                value:"1"
            },
            // {
            //     name:"托收",
            //     value:"2"
            // },
            {
                name:"其他",
                value:"3"
            },
        ],
        bankName:[
            {
                name:"中国银行",
                value:'0'
            },
            {
                name:"中国农业银行",
                value:'1'
            },
            {
                name:"中国工商银行",
                value:'2'
            },
        ],
        selectType:[
            {
                name:"自取",
                value:'0'
            },
            {
                name:"邮寄",
                value:'1'
            },
            {
                name:"上门派送",
                value:'2'
            },
        ],
        descoptions:[
            {
                name:"启用",
                value:'2'
            },
            {
                name:"停用",
                value:'4'
            },
        ],
        PriceStrategy:"",
        isfines:"",
        UpdateCodeCopye:"",
        Remarks:"",
        year:"0",
        year1:"0",
      },
      uploadPic:false,
      dialogEditContent:false,
      crumbsData: { //面包屑
        titleList: [
          { title: '工程中心', path: '/EngineeringCenter' },
          { title: '用户工程', path: '/EngineeringCenter' },
          { title: '处理中', method: () => { window.histroy.back() } },
          { title: '添加', method: () => { window.histroy.back() } }
        ],
      },
      rules: {
        ownerName: [
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
        ownerNumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        Emergency: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
      },
      ruleForm: {//基本信息表单
        putTableNum:'',
        ownerName: '',
        ownerId:'0',
        userAddress:'',
        userId:'0',
        userIdNum:'',
        engineerType: 1,
        applicantDate: '',
        Contacts: '',
        // documentType: '',
        ownerNumber: '',
        AdministrationArea:'',
        contactNumber: '',
        Emergency: '0',
        businessArea: 1,
        userArea:'',
        oldNum:'',
        generalTableNum1:'',
        generalTableNum2:'',
        // residentialType: '0',
        applicationReasons:'',
        userType: 1,
        waterUse: '0',
        paymentNote:'',
      },
      ownerIdType:[//证件类型
        {
          value:'0',
          label:"居民身份证",
        },
        {
          value:'1',
          label:"护照",
        },
        {
          value:'2',
          label:"户口本",
        },
        {
          value:'3',
          label:"回乡证",
        },
        {
          value:'4',
          label:"台胞证",
        },
      ],
      engineerDataType: [//工程类型
        {
          value: 1,
          label: '用水报装'
        },
        {
          value: 2,
          label: '户表改造'
        },
        {
          value: 3,
          label: '水表移表'
        },
        {
          value: 4,
          label: '水表扩容'
        },
      ],
      urgencyType:[//紧急程度
        {
          value:'0',
          label:'不紧急',
        },
        {
          value:'1',
          label:'紧急',
        }
      ],
      businessAreaList: [//营业网点
        {
          value: 1,
          label: '南沙'
        },
        {
          value: 2,
          label: '横沥'
        },
        {
          value: 3,
          label: '黄阁'
        },
        {
          value: 4,
          label: '万顷沙'
        },
      ],
      waterUseType:[//用水期类型
        {
          value:'0',
          label:'固定',
        },
        {
          value:'1',
          label:'临时',
        },
      ],
      dialogForm: {
        userName:'',
        userAddress:'',
        meterAddress:'',
        Contacts:'',
        contactNumber:'',
      },
      AdministrationAreaList: [],
      documentTypeList: [],
      histroyData: {},
      editContent: false,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    chooseCus(){
      // this.chooseDioag = true
      this.choosectmVisible = true;
    },
    closeDialogChooseCus(){
      this.chooseDioag = false

    },
    
    //分页
    handleSizeChange(val) { //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      // this.tableQuery.page = val
      this.init()
    },
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
    addWiter(){//多水表明细-添加
      this.tableData.push({});
    },
    editWiter(row){//多水表明细-编辑
      this.dialogForm.userName = row.userName;
      this.dialogForm.userAddress= row.userAddress;
      this.dialogForm.meterAddress = row.meterAddress;
      this.dialogForm.Contacts = row.Contacts;
      this.dialogForm.contactNumber = row.contactNumber;
      this.oldData = row;
      this.dialogEditContent = true;
    },
    delWiter(index){//多水表明细-删除某一行
      this.tableData.splice(index,1)
    },
    saveWiter(){//水表明细-保存
    },
    back() {//多水表明细-编辑-返回
      this.dialogEditContent = false;
    },
    saveWriterInfo(){//多水表明细-编辑-保存
      // console.log(this.dialogForm);
      // let oldData = localStorage.getItem('ruleFormData');
      let newData = this.dialogForm;
      if(this.oldData !== newData){
        // this.oldData = newData;
        this.oldData.userName = newData.userName;
        this.oldData.userAddress= newData.userAddress;
        this.oldData.meterAddress = newData.meterAddress;
        this.oldData.Contacts = newData.Contacts;
        this.oldData.contactNumber = newData.contactNumber;
      }
      this.dialogEditContent = false;
    },
    idCard(){ 
    },
    waterInfo(){
      this.$changeTable(this, '.engineer-center-right-content', ['.engineer-center-right-content .btnBox1']);
      this.$set(this.crumbsData.titleList,"3",{title:'水表明细',method:()=>{window.histroy.back()}})
      this.editContent = true;
    },
    upload(){//附件上传
      this.$set(this.crumbsData.titleList,"3",{title:'附件上传',method:()=>{window.histroy.back()}})
      this.uploadPic = true;
    },
    submitForm() {//工程登记-保存
      // formName
      for(let item in this.ruleForm){
        if(this.ruleForm.item == ''){
          delete this.ruleForm[`${item}`]
        }
      }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$refs[formName].resetFields();
      //     this.$message({
      //       message: '保存成功！',
      //       type: 'success'
      //     });
      //   } else {
      //     this.$message.error('保存失败，请完成必填（*）信息！');
      //     return false;
      //   }
      // });
    },
    isNull(prop, name) {
      if (this.ruleForm[prop] === "") {
        this.$message.error('请输入' + name);
      }
    },
    comeBack(){
      this.crumbsData.titleList.splice(3,1);
      this.uploadPic = false;
    },
    closeDialog(val){
      this.crumbsData.titleList.splice(3,1);
      this.editContent = false;
      if(val==='add'){
        this.$parent.closechoosectm();
      }
    },
    chooseAccount(){
      this.chooseAccountVisible = true;
    },
    closechoosectm(){
      this.choosectmVisible = false;
      this.chooseAccountVisible = false;
    },

  },
  watch: {
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.Engineering-Registration-content {
  height: 100%;
  .bread-contain #crumbs {
    width: 30% !important;
  }
  .bread-contain .bread-contain-right {
    width: 65% !important;
  }
  .kr-form{
    .el-form-item{
      margin-bottom: 0 !important;
      .el-form-item__content{
        .el-date-editor{
          .el-input__inner{
            width: 100% !important;
            height: 28px;
            line-height: 28px;
          }
        } 
        .input-with-select{
          .el-input__inner{
            padding: 0 0 ;
          }
        }
      }
      .el-input__inner{
        width: 100%;
      }
      .input-with-select{
        margin-top: 8px;
        .el-input__inner{
          height: 28px !important;
          line-height: 28px !important;
        }
      }
      // .idCard{
      //   width: 99%;
      //   height: 28px;
      //   line-height: 28px;
      //   margin-top:6px;
      //   border: 1px solid #b4bccc;
      //   border-radius: 4px;
      //   .el-button,i{
      //     float: right;
      //   }
      //   .el-input__inner{
      //     font-size: 14px;
      //   }
      // }
    }
  }
  .my-input {
    width: 22%;
    display: inline-block;
    padding-left: 2%;
    .el-input__inner {
      width: 100%;
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
  .gocenter {
    width: 46.3%;
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .gocenter1 {
    width: 83.5%;
  }
  .gocenter .el-form-item__label {
    // text-align: center !important;
  }
  .gocenter .el-textarea__inner {
    min-height: 50px !important;
  }
  .btnBox {
    display: inline-block;
    width: 100%;
    text-align: right;
    margin-top: 1%;
    margin-bottom: 1%;
    // position:fixed; 
    // left:0px;  
    // top:110px;
  }
  .btnBox .el-button {
    margin-left: .8%;
    font-size: 14px;
  }
  .engineer-center-right-content {
    // height: 87%;
    height: 95%;
    overflow-y: auto;
    .kr-uploadF{
      height: 100%;
      // border: 1px solid #000;
      overflow: hidden;
      .kr-top{
        // height: 56px;
        height: 10%;
        // border: 1px solid red;
      }
      .kr-bottom{
        height: 90%;
        // height: calc(100% -56px)!important;
        // border: 1px solid pink;
        overflow-y:scroll;
      }
    }
    
    legend{
        background: #f5f5f5;
        font-weight: 700;
        font-size: 12px;
        padding: 5px 20px;
        font-size: 14px;
    }
    .backfillSubmitForm{
        padding: 1rem 0rem;
        .kr-col{
          .el-form-item__content{
            margin-left:1rem !important;
          }
        }
        // width: 93%;
        .el-form-item{
            // width: 29%;
            margin-top: 0rem;
            margin-bottom: 0rem;
            .input-with-select{
              margin-top: 8px;
              .el-input__inner{
                height: 28px !important;
                line-height: 28px !important;
              }
            }
            .el-form-item__content{
                width: 60%;
                .el-select{
                    width: 100%;
                }
                .el-checkbox{
                  margin-left:1rem;
                  margin-right: 1rem;
                  width: 4rem;
                }
                .el-input{
                  .el-input__inner{
                    height: 28px;
                    line-height: 28px;
                    width: 100% !important;
                  }
                }
            }
        }
        .right-btn{
            text-align: right;
            width: 100%;
        }
        .from-table{
            width: 100%;
            .el-form-item__content{
                width: 100%;
            }
        }
        .userAdress{
            width:80%;
            .el-form-item__content{
                width:calc(100% - 160px);
                .el-form-item__label{
                    width: 100px !important;
                }
                .el-textarea, .el-input{
                    width:30%;
                }
                .el-select{
                    width:20%;
                }
                .el-checkbox-group{
                    display:inline-block;
                    width: 50%;
                }
            }
        }
        .selectCheck{
            width:100%;
            .el-form-item__content{
                width:calc(100% - 160px);
                .el-form-item__label{
                    width: 80px !important;
                }
                .el-textarea, .el-input{
                    width:17%;
                }
                .el-select{
                    width:20%;
                }
                .el-checkbox-group{
                    display:inline-block;
                    width: 77%;
                }
            }
        }

        .Remarks{
            width: 100%;
            .el-form-item__content{
                width:calc(100% - 160px);
            }
        }
    }
    .el-steps--horizontal{
        margin: 0 auto;
        width: 50%;
        padding-bottom: 20px;
    }
  }
  .kl-table {
    padding: 0px 20px;
    height: calc(100% - 46px);
    overflow-y: scroll;
    .el-input {
      height: 100%;
      .el-input__inner {
        // height: 100%;
        width: 100%;
      }
    }
    .el-select {
      height: 100%;
      .el-input__icon {
        line-height: 25px;
      }
    }
    .el-date-editor{
      width: 100%;
      .el-input__inner{
        width: 100% !important;
      }
    }
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .btnBox1 {
    display: inline-block;
    width: 100%;
    margin-bottom: 1%;
    margin-top: 1%;
  }
  .btnBox1 span {
    font-size: 14px;
    margin-left: 1.5%;
  }
  .el-dialog{
    height: 60%;
    .el-dialog__body {
      padding: 0px 20px !important;
      height: calc(100% - 124px) !important;
      .my-input{
        width: 100%;
      }
    }
    .el-dialog__footer .el-button {
      font-size: 14px;
    }
  }
}
</style>
