<template>
    <div class="userInfoSearchEdit">
        <!-- 弹出表单客户变动情况 -->
    	<el-dialog :title="WaterEditorName" append-to-body :close-on-click-modal="false" :visible.sync="CustomerChangesVisible" @close="closeDialog" >
            <CustomerChangesEdit
                ref="childWaterEditor" 
            ></CustomerChangesEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm')">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单费用信息 -->
    	<el-dialog :title="backfillName" append-to-body :close-on-click-modal="false" :visible.sync="backfillVisible" class="backfill" @close="closeDialog" >
            <WaterUseOverTheYears
                ref="backfillEditor" 
            ></WaterUseOverTheYears>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit('ruleForm')">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单抄表信息 -->
    	<el-dialog :title="MeterReadingName" append-to-body :close-on-click-modal="false" :visible.sync="MeterReadingVisible" class="backfill" @close="closeDialog" >
            <MeterReadingInfo
                ref="MeterReading" 
            ></MeterReadingInfo>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单账户流水 -->
    	<el-dialog :title="PredepositDdetailsName" append-to-body :close-on-click-modal="false" :visible.sync="PredepositDdetailsVisible" class="backfill" @close="closeDialog" >
            <PredepositDdetailsInfo
                ref="PredepositDdetails" 
            ></PredepositDdetailsInfo>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单附件查看 -->
    	<el-dialog :title="AttachmentViewName" append-to-body :close-on-click-modal="false" :visible.sync="AttachmentViewVisible" class="AttachmentView" @close="closeDialog" >
            <AttachmentViewInfo
                ref="AttachmentView" 
            ></AttachmentViewInfo>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="backfillSubmit">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog">取 消</el-button>
		    </div>
    	</el-dialog>
        <div class="toolbar">
                <el-form :inline="true" :model="formData" class="demo-form-inline">
                    <el-form-item class="form-left">

                        <el-form-item label="模糊查询：">
                            <el-tooltip class="item" effect="dark" content="用户编号、用户名称、用户地址、册本号" placement="top">
                                <el-input v-model="formData.con"></el-input>
                            </el-tooltip>
                            <!-- <el-input v-model="formData.con" placeholder="用户编号/用户名称/用户地址/册本"></el-input> -->
                        </el-form-item>
                        <el-form-item>
                            
                            <el-button  size="mini" style="background:#faa646;color:#fff;"  @click="demand" icon="el-icon-search"></el-button>
                        </el-form-item>
                        
                    </el-form-item>
                    
                    <el-form-item class="form-right">
                        <el-button size="mini" type="primary">上一户</el-button>
                        <el-button size="mini" type="primary">下一户</el-button>
                        
                        <el-button size="mini" type="primary" @click="CustomerChanges">变动情况</el-button>
                        <el-button size="mini" type="primary" @click="WaterUse">费用信息</el-button>
                        <el-button size="mini" type="primary" @click="MeterReading">抄表信息</el-button>
                        <el-button size="mini" type="primary" @click="PredepositDdetails">账户流水</el-button>
                        <el-button size="mini" type="primary">打印合同</el-button>
                        <el-button size="mini" type="primary">打印新卡</el-button>
                        <el-button size="mini" type="primary" @click="AttachmentView">查看附件</el-button>

                    </el-form-item>

                </el-form>
            </div>
        <!-- <el-form class="backfillSubmitForm" :inline="true" :model="userInfoSearchEditForm" label-width="150px" ref="ruleForm" :rules="rules">
             <legend>客户信息</legend>

                <el-form-item label="客户编号：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="01003152" disabled class="read-only"></el-input>
                </el-form-item>

                <el-form-item label="客户名称：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="张三" disabled class="read-only"></el-input>
                </el-form-item>

                <el-form-item label="客户地址：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="宝积山路、体育巷" disabled class="read-only"></el-input>
                </el-form-item>

                <el-form-item label="客户类型：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="谢顺新" disabled class="read-only"></el-input>
                </el-form-item>

                <el-form-item label="信用等级：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="二级" disabled class="read-only"></el-input>
                </el-form-item>

                <el-form-item label="联系人：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="谢顺新" disabled class="read-only"></el-input>
                </el-form-item>

                <el-form-item label="联系电话：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="13662592308" disabled class="read-only"></el-input>
                </el-form-item>

                <el-form-item label="手机号码：">
                    <el-input v-model="userInfoEditForm.countNum" placeholder="13662592308" disabled class="read-only"></el-input>
                </el-form-item>

                <legend>账户信息</legend>
                <el-form-item label="账户编号：">
                    <el-input v-model="userInfoEditForm.PriceStrategy" placeholder="101801012001" disabled class="read-only"></el-input>
                </el-form-item>
                <el-form-item label="账户类型：">
                    <el-input v-model="userInfoEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
                </el-form-item>
                <el-form-item label="缴费方式：">
                    <el-input v-model="userInfoEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
                </el-form-item>
                <el-form-item :label="v.label" v-for="(v,i) in userInfoEditForm.countMsg" :key="i">
                    <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
                </el-form-item>
                <el-form-item label="开户行：">
                    <el-input v-model="userInfoEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
                </el-form-item>
                <el-form-item :label="v.label" v-for="(v,i) in userInfoEditForm.countMsgOrder" :key="i">
                    <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
                </el-form-item>
           <legend>开票信息</legend>
            <el-form-item label="发票类型：" prop="desc">
                <el-input v-model="userInfoEditForm.desc" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in userInfoEditForm.InvoiceInformation" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="开户行：">
                <el-input v-model="userInfoEditForm.year" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="银行账号：">
                <el-input v-model="userInfoEditForm.bankCountNum" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="投递方式：">
                <el-select clearable v-model="userInfoEditForm.DeliveryMethods" disabled placeholder="">
                <el-option v-for="(item,index) in userInfoEditForm.DeliveryMethodsList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <legend>用户-基础信息</legend>
            <el-form-item label="用户编号：" prop="userNume">
                <el-input v-model="userInfoEditForm.userNume" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="用户名称：" prop="isfines">
                <el-input v-model="userInfoEditForm.isfines" disabled class="read-only" placeholder="有限公司"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：" prop="isfines">
                <el-input v-model="userInfoEditForm.isfines" disabled class="read-only" placeholder="有限公司"></el-input>
            </el-form-item>
            <el-form-item label="证件类型：" prop="idcardType">
                <el-select clearable v-model="userInfoEditForm.idcardType" disabled placeholder="居民身份证">
                <el-option v-for="(item,index) in userInfoEditForm.idcardTypeList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码：" prop="isfines">
                <el-input v-model="userInfoEditForm.isfines" disabled class="read-only" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="供水合同号：" prop="isfines">
                <el-input v-model="userInfoEditForm.isfines" disabled class="read-only" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="营业网点：" prop="region">
                <el-input v-model="userInfoEditForm.year" placeholder="城区" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="行政区域：" prop="desc">
                <el-select clearable v-model="userInfoEditForm.desc" disabled class="read-only" placeholder="城区">
                <el-option v-for="(item,index) in userInfoEditForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="管理区域：" prop="desc">
                <el-select clearable v-model="userInfoEditForm.desc" disabled class="read-only" placeholder="城区">
                <el-option v-for="(item,index) in userInfoEditForm.areas" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="v.label" v-for="(v,i) in userInfoEditForm.ComparisonTableInfoForm" :key="i">
                <el-input v-model="v.value" disabled class="read-only" :placeholder="v.tips"></el-input>
            </el-form-item>

            <el-form-item label="短信签约：">
                <el-radio v-model="userInfoEditForm.radio" disabled label="1">是</el-radio>
                <el-radio v-model="userInfoEditForm.radio" disabled label="2">否</el-radio>
            </el-form-item>

            <el-form-item :label="v.label" v-for="(v,i) in userInfoEditForm.ComparisonTableInfoForm1" :key="i">
                <el-input v-model="v.value" disabled class="read-only" :placeholder="v.tips"></el-input>
            </el-form-item>
            
            <el-form-item label="泵站：">
                <el-select clearable v-model="userInfoEditForm.pumpingStation" disabled placeholder="">
                <el-option v-for="(item,index) in userInfoEditForm.descoptions" disabled :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="大用户：">
                <el-radio v-model="userInfoEditForm.radio1" disabled  label="1">是</el-radio>
                <el-radio v-model="userInfoEditForm.radio1" disabled label="2">否</el-radio>
            </el-form-item>

            <el-form-item label="用水期限：" prop="userWaterTime">
                <el-date-picker v-model="userInfoEditForm.userWaterTime" disabled type="date" placeholder="选择用水期限">
                </el-date-picker>
            </el-form-item>
      

            <el-form-item label="用户状态：">
                <el-select clearable v-model="userInfoEditForm.userStuse" placeholder="">
                <el-option v-for="(item,index) in userInfoEditForm.userStuseOption" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="拆表原因：">
                <el-select disabled clearable v-model="userInfoEditForm.isfinesResult"  placeholder="">
                <el-option v-for="(item,index) in userInfoEditForm.isfinesOptinon" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="备注：" class="beizhu">
                <el-input v-model="userInfoEditForm.desc1"  class="read-only" disabled placeholder="请输入备注">
                </el-input>
            </el-form-item>

            <legend>用户-分类信息</legend>

            <el-form-item label="行业分类：" prop="TypesWaterUse">
                <el-select clearable v-model="userInfoEditForm.TypesWaterUse1" placeholder="居民" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.workType" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="水表类型：" prop="TypesWaterUse">
                <el-select clearable v-model="userInfoEditForm.TypesWaterUse" placeholder="实体表" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.TypesWwaterUse" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="水表用途：" prop="WaterPropertie">
                <el-select clearable v-model="userInfoEditForm.WaterPropertie" placeholder="一般用途" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.WaterProperties" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="用水对象：" prop="CategorisWaterUse">
                <el-select clearable v-model="userInfoEditForm.CategorieWaterUse" placeholder="用户表" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.CategoriesWaterUse" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="计量方式：" prop="ClassificationUse">
                <el-select clearable v-model="userInfoEditForm.ClassificationUse" placeholder="正常表" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.ClassificationUses" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            
            
            
            <legend>用户-水表信息</legend>
            <el-form-item label="水表编号：" prop="code">
                <el-input v-model="userInfoEditForm.code" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="装表地址：" prop="address">
                <el-input v-model="userInfoEditForm.address" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="装表位置：" prop="address1">
                <el-select clearable v-model="userInfoEditForm.caliber5" placeholder="户内" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.caliberoptions3" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="水表口径：" prop="caliber">
                <el-input v-model="userInfoEditForm.caliberoption1" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="水表厂家：" prop="caliber">
                <el-input v-model="userInfoEditForm.caliberoption2" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="水表型号：" prop="caliber">
                <el-input v-model="userInfoEditForm.caliberoption3" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>

            <legend>用户-抄表信息</legend>
            <el-form-item label="册本号：" prop="year">
                <el-input v-model="userInfoEditForm.year" placeholder="003E" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="排序号：" prop="year1">
                <el-input v-model="userInfoEditForm.year1" placeholder="1" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="抄表日：" prop="caliber1">
                <el-input v-model="userInfoEditForm.date1" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="抄表周期：" prop="caliber2">
                <el-input v-model="userInfoEditForm.date2" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="最后抄码：" prop="caliber3">
                <el-input v-model="userInfoEditForm.date3" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="投递标记：" prop="caliber4">
                <el-radio v-model="userInfoEditForm.radio" disabled label="1">是</el-radio>
                <el-radio v-model="userInfoEditForm.radio" disabled label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="邮政编码：" prop="caliber6">
                <el-input v-model="userInfoEditForm.date5" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="投递备注：">
                <el-input v-model="userInfoEditForm.userNume" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <legend>用户-价格信息</legend>

            <el-form-item label="水费比率（%）：" prop="a1">
                <el-input v-model="userInfoEditForm.a1" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="污水费比率（%）：" prop="a2">
                <el-input v-model="userInfoEditForm.a2" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="垃圾费比率（%）：" prop="a3">
                <el-input v-model="userInfoEditForm.a3" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="容量水价：" prop="a4">
                <el-input v-model="userInfoEditForm.a4" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="阶梯人口：" prop="a5">
                <el-input v-model="userInfoEditForm.a5" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="加压标记：">
                <el-radio v-model="userInfoEditForm.radio" label="1" disabled>是</el-radio>
                <el-radio v-model="userInfoEditForm.radio" label="2" disabled>否</el-radio>
            </el-form-item>
            <el-form-item label="用水类型：">
                <el-select clearable v-model="userInfoEditForm.TypesGarbageCharges3" placeholder="" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="违约金策略：" prop="caliber3">
                <el-input v-model="userInfoEditForm.date8" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="计费方式：">
                <el-select clearable v-model="userInfoEditForm.TypesGarbageCharges7" placeholder="" disabled>
                <el-option v-for="(item,index) in userInfoEditForm.asd" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始日期：" prop="caliber3">
                <el-input v-model="userInfoEditForm.date9" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="结束日期：" prop="caliber3">
                <el-input v-model="userInfoEditForm.date10" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="详细价格：" prop="tyi" class="selectCheck">
                <el-table stripe border :data="histroyData.list" class="change-tables-table">

                <el-table-column type="index" label="NO." width="50" :index="indexMethod">
                </el-table-column>

                <el-table-column prop="code" min-width="100" label="费用明细">
                </el-table-column>

                <el-table-column prop="daytime" min-width="100" label="阶梯类型">
                </el-table-column>

                <el-table-column prop="areaName" min-width="120" label="占比">

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
            </el-form-item>

        </el-form> -->
        <userInfo :isEdit="isEdit"></userInfo>
    </div>
</template>
<script>
import CustomerChangesEdit from "./CustomerChanges"
import WaterUseOverTheYears from "./WaterUseOverTheYears"
import MeterReadingInfo from "./MeterReadingInfo"
import PredepositDdetailsInfo from "./PredepositDdetailsInfo"
import AttachmentViewInfo from "./AttachmentViewInfo"
import userInfo from "@/components/userInfo/ctmInfo.vue"
export default {
    name:"userInfoSearchEdit",
    components:{
        CustomerChangesEdit,
        WaterUseOverTheYears,
        MeterReadingInfo,
        PredepositDdetailsInfo,
        AttachmentViewInfo,
        userInfo
    },
    data(){
        return{
            isEdit:true,
            userInfoEditForm: {
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
                radio1:'1',
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
                bigUser: '1',
                userWaterTime:'2020-01-01',
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

                    {
                        label: "托号：",
                        value: "",
                        tips: "101801012001"
                    },
                    {
                        label: "托收合同号：",
                        value: "",
                        tips: "101801012001"
                    },


                ],

                // 用户-基础信息
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
                        label: "停水联系人",
                        value: "",
                        tips: ""
                    },
                    {
                        label: "停水联系电话",
                        value: "",
                        tips: ""
                    },
                    {
                        label: "房产证编号",
                        value: "",
                        tips: ""
                    },


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
                DeliveryMethods:"",
                DeliveryMethodsList:[
                    {
                        name:"自取",
                        value:"1"
                    },
                    {
                        name:"上门",
                        value:"2"
                    },
                    {
                        name:"邮寄",
                        value:"3"
                    },
                ]

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
            histroyData:{},
            formData:{
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[],
                waterMeterType:"",
                waterMeterTypeOptions:[],
                waterMeterCaliber:"",
                waterMeterCaliberOptions:[],
                waterMeterStatus:"",
                waterMeterStatusOptions:[],
                subordinateDepartments:"",
                subordinateDepartmentsOptions:[]

            },
            // 日期选择器
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now() ;
                }
            },
            DateChoosevalue: [],
            CustomerChangesVisible:false,  
            WaterEditorName:'变动情况',
            ruleFormData:{},
            backfillName:"费用信息",
            backfillVisible:false,
            MeterReadingName:"抄表信息",
            MeterReadingVisible:false,
            PredepositDdetailsName:"账户流水",
            PredepositDdetailsVisible:false,
            AttachmentViewName:"查看附件",
            AttachmentViewVisible:false,
                
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            
            this.histroyData = {
                areaId:"",
                endRow: 5,
                hasNextPage: false,
                hasPreviousPage: false,
                isFirstPage: true,
                isLastPage: true,
                list: [
                    {
                        areaId: null,
                        areaName: "水费",
                        code: "20100101",
                        concentrator: "",
                        connect: null,
                        daytime: "按抄表期",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "0",
                        flux: "192",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "20501231",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1.6",
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
                        areaName: "污水处理费",
                        code: "20100101",
                        concentrator: "",
                        connect: null,
                        daytime: "按抄表期",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "0",
                        flux: "288",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "20501231",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1.6",
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
        demand() {  //查询
            // this.tableQuery.page = 1
            // this.tableQuery.pageCount = 20
            this.init()
        },
        //   导出
        exportExcel(){
        //   	let listData = {}
        //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
        //     let params ={
        //       "busicode":"MeterReadingList",
        //       "data": this.tableQuery
        //     }
        //     this.$api.fetch({
        //       apiUrl: 'interface.api',//路径
        //       method: 'post',//请求方法
        //       params:params,//参数
        //       needErrorCallback:true
        //     }).then(res =>{
        //     	if(res.code===0){
        //         listData = res.data
        //         if (!listData.list[0]) {
        //         		this.$notify({
        //               title: '警告',
        //               message:'表格没有相关数据',
        //               type: 'error'
        //             })
        //         	} else {
        //         		import('@/vendor/Export2Excel').then(excel => {
        // 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
        // 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
        // 			        const list = listData.list
        // 			        const data = this.formatJson(filterVal, list)
        // 			        excel.export_json_to_excel({
        // 			          header: tHeader,
        // 			          data,
        // 			          filename: this.tableQuery.daytime + '抄表数据',
        // 			          autoWidth: '100'
        // 			        })
        // 			      })
        //         		this.tableQuery.pageCount = 20
        //         	}
        //       }
        //     })
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
        //   查看历史
        viewHistory(index, row){

        },
        cellClick(row, column, cell, event) { //点击文件名
            let that = this;
            
        },
        indexMethod(index) {//获取表格序号
            //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
            return  (this.histroyData.pageSize-20)*this.histroyData.pages + (index+1) ;
        
        },
        closeDialog(){ //关闭会话
            this.CustomerChangesVisible = false;
            this.backfillVisible = false;
            this.MeterReadingVisible = false;
            this.PredepositDdetailsVisible = false;
            this.AttachmentViewVisible = false;
			this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childWaterEditor.submit()
            // this.CustomerChangesVisible = false;
        },
        // 用户变动情况
        CustomerChanges(){
            this.CustomerChangesVisible = true;
        },
        // 抄表信息
        MeterReading(){
            this.MeterReadingVisible = true;
        },
        // 预存明细
        PredepositDdetails(){
            this.PredepositDdetailsVisible = true;
        },
        // 查看附件
        AttachmentView(){
            this.AttachmentViewVisible = true;
        },
        // 导出本页
        exportPage(){

        },

        // 历年用水
        WaterUse(){
            this.backfillVisible = true;
        }
    }
}
</script>
<style lang="scss">
.userInfoSearchEdit{
    legend{
        background: #f5f5f5;
        font-weight: 700;
        font-size: 12px;
        padding: 5px 20px;
        font-size: 14px;
    }
    .backfillSubmitForm{
        margin-top: 0px;
    }
    .backfillSubmitForm{
        padding: 0px 10px;
        width: calc(100% - 30px) !important;
        .el-form-item{
            width: 30%;
            .el-form-item__content{
                width: 50%;
                .el-select{
                    width: 100%;
                }
            }
        }
        .userAdress{
            width:80%;
            .el-form-item__content{
                width:calc(100% - 150px);
                .el-form-item__label{
                    width: 100px !important;
                }
                .el-textarea, .el-input{
                    width:80%;
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
                width:calc(100% - 150px);
                .el-form-item__label{
                    width: 80px !important;
                }
                .el-textarea, .el-input{
                    width:80%;
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
        .Whether{
            width:55%;
            .el-form-item__content{
                width:70%;
                .el-form-item__label{
                    width: 100px !important;
                }
                .el-textarea, .el-input,.el-select{
                    width:43%;
                }
            }
        }
        .Remarks{
            width: 100%;
            .el-form-item__content{
                width:calc(100% - 150px);
            }
        }
        .el-dialog__body{
            padding:0;
        }
    }
    .el-steps--horizontal{
        margin: 0 auto;
        width: 50%;
        padding-bottom: 20px;
    }


}
    .AttachmentView .el-dialog__body{
        padding-top: 15px;
        width: 100%;
        
    }
</style>
