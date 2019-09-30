<template>
    <div class="IntegratedBusiness">

        <!-- 弹出表修改电话 -->
    	<el-dialog :title="phoneNumEditorName" :visible.sync="phoneNumEditVisible" :close-on-click-modal="false" class="addDialog" @close="closeDialog" >
            <phoneNumEdit
                ref="phoneNumEditor" 
            ></phoneNumEdit>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm')">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单用户资料 -->
    	<el-dialog :title="UserInformationName" :close-on-click-modal="false" :visible.sync="userInfo" class="UserInformation" @close="closeDialog" >

            <userInfoSearch></userInfoSearch>

    	</el-dialog>
        <!-- 弹出表日收款查询 -->
    	<el-dialog :title="DailyReceiptInquiryName" :visible.sync="DailyReceiptInquiry" :close-on-click-modal="false" class="addDialog" @close="closeDialog" >

            <DailyReceiptInquiry ref="DailyReceiptInquiry"></DailyReceiptInquiry>
    		<!-- <div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit('ruleForm')">保 存</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
		    </div> -->
    	</el-dialog>
        <!-- 弹出表发票补打 -->
    	<el-dialog :title="InvoiceReplacementName" :visible.sync="InvoiceReplacement" :close-on-click-modal="false" class="addDialog" @close="closeDialog" >

            <InvoiceReplacement  ref="InvoiceReplacement"></InvoiceReplacement>

    	</el-dialog>
        <!-- 弹出表现金缴存 -->
    	<el-dialog :title="UnsettledAccountsStatisticsName" :visible.sync="UnsettledAccountsStatistics" :close-on-click-modal="false" class="addDialog" @close="closeDialog" >

            <UnsettledAccountsStatistics  ref="UnsettledAccountsStatistics"></UnsettledAccountsStatistics>
  
    	</el-dialog>
        <!-- 弹出表取消收费 -->
    	<el-dialog :title="CancellationChargesName" :visible.sync="CancellationCharges" :close-on-click-modal="false" class="addDialog" @close="closeDialog" >

            <CancellationCharges  ref="CancellationCharges"></CancellationCharges>

    	</el-dialog>
        <!-- 弹出表取消收费授权 -->
    	<el-dialog :title="CancellationChargeAuthorizationName" :visible.sync="CancellationChargeAuthorization" :close-on-click-modal="false" class="addDialog" @close="closeDialog" >

            <CancellationChargeAuthorization  ref="CancellationChargeAuthorization"></CancellationChargeAuthorization>

    	</el-dialog>
        <!-- 弹出表单账户流水 -->
    	<el-dialog :title="PredepositDdetailsName" append-to-body :close-on-click-modal="false" :visible.sync="PredepositDdetailsVisible" class="backfill" @close="closeDialog" >
            <PredepositDdetailsInfo
                ref="PredepositDdetails" 
            ></PredepositDdetailsInfo>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" >保 存</el-button>
		      <el-button type="info" size="mini" @click="closeDialog">取 消</el-button>
		    </div>
    	</el-dialog>
        <!-- 弹出表单高级查询 -->
        <el-dialog :title="WaterEditorName" :close-on-click-modal="false" :visible.sync="waterAddVisible" class="addDialog" @close="closeDialog">
            <ComprehensiveQuery ref="childWaterEditor"></ComprehensiveQuery>
            <div slot="footer" class="dialog-footer" ref="ruleForm">
                <el-button type="primary" size="mini" plain @click="submit('ruleForm');">查询</el-button>
                <el-button type="info" size="mini" plain @click="closeDialog('ruleForm')">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 弹出表单客户资料 -->
        <el-dialog :title="countManagementName" :close-on-click-modal="false" :visible.sync="countManagementVisible" class="addDialog" @close="closeDialog">
            <countManagementEdit ref="childcountManagement"></countManagementEdit>
        </el-dialog>
       <section class="toolBlock">
            <div class="leftForm">
                <div class="left-con">
                    <div class="leftFormOption">
                    
                        <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
                            <el-form-item class="fullSearch">
                                <!-- <el-tooltip class="item" effect="dark" content="用户号、账号、客户号、手机号、身份证号" placement="top"> -->
                                    <el-input v-model="formInline.con" clearable size="mini" placeholder="户号/账号/客户编号/手机号/身份证号"></el-input>
                                <!-- </el-tooltip> -->
                            </el-form-item>
                            <el-form-item class="fullBtn">
                                        
                                <el-button class="searchBtn"  @click="demand" icon="el-icon-search">搜索</el-button>
                                <el-button type="primary" icon="el-icon-copy-document">多户</el-button>
                                <el-button type="primary" @click="advSearch" class="advanceSearch">高级</el-button>
                                <!-- <el-tooltip class="item" effect="dark" content="高级查询" placement="top">
                                    <i class="el-icon-more advanceSearch" @click="advSearch"></i>  
                                </el-tooltip> -->
                                
                            </el-form-item>
        
                        </el-form>
                        <ul class="userInfo">
                            <li class="userDetails">
                                <span class="userInfoLabel">客户编号：</span>
                                
                                <span class="ctmNo" @click="ctmInfo">0120154265</span>
                                <!-- <el-tooltip class="item" effect="dark" content="客户资料" placement="top">
                                    <i class="el-icon-document" @click="ctmInfo"></i> 
                                </el-tooltip> -->
                                
                            </li>
                            <li v-for="(v,i) in details" :key="i">
                                <span class="userInfoLabel">{{v.title}}</span>
                                
                                <span class="userInfoValue">{{v.value}}</span>
                            </li>
                            <li>
                                增值税专用发票
                                <!-- <el-checkbox></el-checkbox> -->
                            </li>
                            
                        </ul>
                    </div>
                    <div class="leftFormPaymentOption">
                        
                        <ol class="costInfo">
                            <li v-for="(v,i) in costDetails" :key="i">
                                {{v.title}}：
                                <b>{{v.value}}</b>
                            </li>
                            <li class="AmountCharged">
                                收取金额：
                                <el-input size="mini" placeholder="35.0" v-model="AmountCharged"></el-input>
                                
                                
                            </li>
                            <li>
                                <el-button type="primary" icon="el-icon-wallet" size="mini">收费</el-button>
                            </li>
                            

                        </ol>
                        <el-form :inline="true" size="mini" :model="formInline" class="PayForm" label-width="80px">

                            <el-form-item label="收费方式：">
                                <el-radio-group v-model="paymentTypeModel">
                                    <el-radio  :label="v.label" v-for="(v,i) in paymentType" :key="i">{{v.value}}</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="收费项目：">
                                <el-checkbox-group v-model="payServiceModel">
                                    <el-checkbox :label="v.label" v-for="(v,i) in payServiceType" :key="i">{{v.value}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                 
                            <el-form-item label="结存方式：">
                                
                                <el-radio-group v-model="pinventoryTypeModel">
                                    <el-radio :label="v.label" v-for="(v,i) in pinventoryType" :key="i">{{v.value}}</el-radio>
                                    
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="打印选项：">
                                
                                <el-radio-group style="    line-height: 28px;" v-model="PrintingModel">
                                    <el-radio  :label="v.label" v-for="(v,i) in PrintingList" :key="i">{{v.value}}</el-radio>
                                </el-radio-group>
                                <el-checkbox label="收费后打印" class="afterPay"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="发票抬头：" class="invioce">
                                {{detailsinvoice}}
                                <el-checkbox v-model="detailsCheckList" @change="detailsClick" label="显示更多"></el-checkbox>

                            </el-form-item>
                            <el-form-item label="备注：" class="searchInput remark">
                                <el-input v-model="formInline.document" class="read-only" placeholder="备注"></el-input>
                
                            </el-form-item>
                        
                        </el-form>
                    </div>
                </div>
                <div class="kl-table">
                    <!-- <div class="table-tool">
                        <el-checkbox-group v-model="detailsCheckList" @change="detailsClick">
                        
                            <el-checkbox label="显示更多"></el-checkbox>
                        </el-checkbox-group>
                        <label class="payLabel" >收费项目：</label>
                        <el-checkbox-group v-model="payServiceModel">
                            <el-checkbox :label="v.label" v-for="(v,i) in payServiceType" :key="i">{{v.value}}</el-checkbox>
                        </el-checkbox-group>
                    </div> -->
                    
                    <el-table
                        
                        :height="maxHeight" 
                        :span-method="arraySpanMethod"
                        border
                        show-summary
                        :data="histroyData.list"
                        :summary-method="getSummaries"
                        class="change-tables-table">

                        <el-table-column 
                            type="index"  
                            label="NO."
                            width="45" 
                            fixed="left">
                        </el-table-column>

                        <el-table-column
                            prop="lvalue"
                            min-width="150"
                            label="用户"
                            :key="18">
                            <template slot-scope="scope">                        
                                <p style="color:#297ACC;cursor:pointer;text-align: left;" @click="userInfoSearch('用户资料','userInfo')">{{scope.row.daytime}}</p>
                                <h3 style="text-align: left;"><span style="color:#909399;">用户编号：</span><span style="color:#000;">{{scope.row.code}}</span></h3>
                                <!-- <h3 style="text-align: left;"><span style="color:#909399;">用水类型：</span><span style="color:#000;">{{scope.row.Wtype}}</span></h3> -->
                                <h3 style="text-align: left;"><span style="color:#909399;">地址：</span><span style="color:#000;">{{scope.row.areaName}}</span></h3>
                                <!-- <h3>{{scope.row.areaName}}</h3> -->
                            </template>
                        </el-table-column>
                        
                        <el-table-column
                            prop="Wtype"
                            min-width="80"
                            label="用水类型"
                            :key="22" >
                        </el-table-column>

                        <el-table-column
                            prop="lvalue"
                            min-width="80"
                            label="账期"
                            :key="1">
                            <template slot-scope="scope">                        
                                
                                <p>{{scope.row.lvalue}}</p>
                                <!-- <p>{{scope.row.daytime}} / {{scope.row.code}}</p>
                                <p>{{scope.row.areaName}}</p> -->
                            </template>
                        </el-table-column>

                        
                            <el-table-column
                                v-if='BreachOfContract'
                                prop="areaId"
                                min-width="80"
                                label="上期数"
                                :key="2" >
                            </el-table-column>

                            <el-table-column
                                v-if='BreachOfContract'
                                prop="modifyBy"
                                min-width="80"
                                label="本期数"
                                :key="3" >
                            </el-table-column>
                                        
                            <el-table-column
                                v-if='BreachOfContract'
                                prop="modifyBy"
                                min-width="80"
                                label="优惠单价"
                                :key="4" >
                            </el-table-column>

                            <el-table-column
                                v-if='BreachOfContract'
                                prop="modifyBy"
                                min-width="80"
                                label="优惠水量"
                                :key="5" >
                            </el-table-column>

                            <el-table-column
                                v-if='BreachOfContract'
                                prop="modifyBy"
                                min-width="80"
                                label="优惠金额"
                                :key="6" >
                            </el-table-column>
                        <!-- </div> -->
                        
                        <el-table-column
                            prop="type"
                            width="50"
                            
                            type="selection"
                            :key="7" 
                            >
                        </el-table-column>

                        <el-table-column
                            prop="areaNamea"
                            min-width="100"
                            label="费用名称"
                            :key="8">

                        </el-table-column>
                        <el-table-column
                            prop="concentrator"
                            min-width="80"
                            
                            :key="9"
                            label="计费水量">
                        </el-table-column>

                        <el-table-column
                            prop="offset"
                            min-width="80"
                            label="单价"
                            :key="10">
                        </el-table-column>

                        <el-table-column
                            prop="rowNumber"
                            min-width="90"
                            label="金额"
                            :key="11">
                        </el-table-column>


                        <!-- BreachOfContract:true,//违约明细
                        CopyInstructions:true,//抄表明细
                        Discount:true,  //    优惠明细                                                                                                                                                           
                        Balance:true,//结存明细  -->
                        <el-table-column
                            v-if='BreachOfContract'
                            prop="getMeter"
                            min-width="70"
                            label="违约天数"
                            :key="13">
                        </el-table-column>

                        <el-table-column
                            v-if='BreachOfContract'
                            prop="unusual"
                            min-width="90"
                            label="应收违约金"
                            :key="14">
                        </el-table-column>

                        <el-table-column
                            prop="fixValue"
                            min-width="90"
                            label="实收违约金"
                            :key="12">
                        </el-table-column>

                        <el-table-column
                            prop="usn"
                            min-width="120"
                            label="应缴合计"
                            :key="13">
                        </el-table-column>

                    </el-table>

                </div>
                <!-- <aside class="rightBtn" @mouseover="leftShow" @mouseleave="leftHidden">
                    
                    <div v-for="(v, i) in rightBtnsEvents" :key="i" @click="userInfoSearch(v.label,v.name)">
                    
                            <img :src="v.src" alt=""/>
                            <p>{{v.label}}</p>
                    
                    </div>
                    <div class="moreBtn">
                            <el-tooltip class="item" effect="dark" content="设置" placement="top">
                                <span class="set"></span>   
                            </el-tooltip>
                                    
                    </div>
                    <div class="menuLeft" @click="next" v-show="menuLeftShow">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <div class="menuRight" @click="next" v-show="menuLeftShow">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </aside> -->
            </div>
            <aside class="rightBtn" @mouseover="leftShow" @mouseleave="leftHidden">
                    
                <div v-for="(v, i) in rightBtnsEvents" :key="i" @click="userInfoSearch(v.label,v.name)">
                
                        <img :src="v.src" alt=""/>
                        <p>{{v.label}}</p>
                
                </div>
                <div class="moreBtn">
                        <!-- <SPagination 
                        class="spagination"
                        :lastPage='lastPage'
                        :total='total'
                        @pre="pre"
                        @next="next"
                        ></SPagination> -->
                        <el-tooltip class="item" effect="dark" content="设置" placement="top">
                            <span class="set"></span>   
                        </el-tooltip>
                                
                </div>
                <div class="menuLeft" @click="next" v-show="menuLeftShow">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <div class="menuRight" @click="next" v-show="menuLeftShow">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </aside>
            
            
       </section>
       
    </div>
</template>
<script>
import UserInformation from "./UserInformation"
import phoneNumEdit from "./phoneNumEdit"
import userInfoSearch from "./UserInformation/userInfoSearch"
import InvoiceReplacement from "./UserInformation/InvoiceReplacement"
import DailyReceiptInquiry from "./UserInformation/DailyReceiptInquiry"
import UnsettledAccountsStatistics from "./UserInformation/UnsettledAccountsStatistics"
import CancellationCharges from "./UserInformation/CancellationCharges"
import CancellationChargeAuthorization from "./UserInformation/CancellationChargeAuthorization"
import flowingDate from "@/views/CustomerCenter/customerManagement/flowingDate"
import SPagination from "../SPagination"
import ComprehensiveQuery from "@/views/CustomerCenter/userInfo/ComprehensiveQuery"
import countManagementEdit from "./UserInformation/ctmInfo"
import PredepositDdetailsInfo from "./UserInformation/PredepositDdetailsInfo"
export default {
    name:"IntegratedBusiness",
    components:{
        UserInformation,
        phoneNumEdit,
        userInfoSearch,
        InvoiceReplacement,
        DailyReceiptInquiry,
        UnsettledAccountsStatistics,
        CancellationCharges,
        CancellationChargeAuthorization,
        flowingDate,
        SPagination,
        ComprehensiveQuery,
        countManagementEdit,
        PredepositDdetailsInfo
    },
    data(){
        return{
            PredepositDdetailsName:"帐户流水",
            PredepositDdetailsVisible:false,
            countManagementName:"客户资料",
            countManagementVisible:false,  //客户资料的显示和隐藏
            waterAddVisible: false,  //综合查询的显示和隐藏
            WaterEditorName: '高级查询',
            menuLeftShow:false,
            moreBtn:"el-icon-arrow-down",
            isRightBtn:false,
            isRightBtnTitle:"查看更多",
            payServiceModelLive:false,
            FlowingTableVisible:false,
            formInline:{
                con:""
            },
            // 缴费类型
            PrintingModel:'',
            paymentTypeModel:1,
            pinventoryTypeModel:1,
            payServiceModel:[1,2,3],
            printCheckList:[],
            detailsCheckList:[],
            PrintingList:[
                {
                    label:1,
                    value:"打印发票"
                },
                {
                    label:2,
                    value:"打印收据"
                },

            ],
            payServiceType:[
                // {
                //     label:0,
                //     value:"全部"
                // },
                {
                    label:1,
                    value:"水费"
                },
                {
                    label:2,
                    value:"污水处理费"
                },
                {
                    label:3,
                    value:"垃圾处理费"
                },
            ],
             pinventoryType:[
                {
                    label:1,
                    value:"全额找零"
                },
                {
                    label:2,
                    value:"零头结存"
                },

            ],
            paymentType:[
                {
                    label:1,
                    value:"现金"
                },
                {
                    label:2,
                    value:"支票"
                },
                {
                    label:3,
                    value:"刷卡"
                },
                {
                    label:4,
                    value:"转账"
                },

            ],
            //   查询表单
            formInline: {
                con: '',
                document: '',
                proposer:"",
                application:"",
                options:[]
            },
            detailsinvoice:'王淑英',
            details:[
                // {
                //     title:" 客户编号：",
                //     value:"0120154265"
                // },
                {
                    title:" 客户名称：",
                    value:"王淑英"
                },
                // {
                //     title:"客户地址：",
                //     value:"宁水花园1栋1单元703"
                // },
                // {
                //     title:"价格分类",
                //     value:"工业用水"
                // },
                // {
                //     title:"联系人：",
                //     value:"王淑英"
                // },
                {
                    title:"账户编号：",
                    value:"11122445886"
                },
                {
                    title:"联系电话：",
                    value:"13655487981"
                },
                {
                    title:"客户地址：",
                    value:"宁水花园1栋1单元703"
                },

            ],
            costDetails:[
                {
                    title:"应缴金额",
                    value:"1525.20"
                },
                {
                    title:"找零",
                    value:"0.00"
                }

            ],
            rightBtns1:[
                 
                {
                    label:"用水类型变更",
                    name:"",
                    src: require('@/assets/images/用水类型更变.png')

                },
                {
                    label:"人口变更",
                    name:"",
                    src: require('@/assets/images/人口更变.png')

                },
                {
                    label:"优惠变更",
                    name:"",
                    src: require('@/assets/images/优惠更变.png')

                },
                {
                    label:"缴费方式变更",
                    name:"",
                    src: require('@/assets/images/缴费方式更变.png')

                },
                {
                    label:"开票变更",
                    name:"",
                    src: require('@/assets/images/开票变更.png')

                },
                {
                    label:"校表",
                    name:"",
                    src: require('@/assets/images/检定.png')

                },

            ],
            rightBtns2:[
                // {
                //     label:"用户资料",
                //     name:"userInfo",
                //     src: require('@/assets/images/用户资料.png')
                // },
                {
                    label:"日收款查询",
                    name:"DailyReceiptInquiry",
                    src: require('@/assets/images/日收款.png')

                },
                {
                    label:"发票补打",
                    name:"InvoiceReplacement",
                    src: require('@/assets/images/发票补打.png')

                },
                {
                    label:"现金缴存",
                    name:"UnsettledAccountsStatistics",
                    src: require('@/assets/images/未结账统计.png')

                },
                {
                    label:"取消收费",
                    name:"CancellationCharges",
                    src: require('@/assets/images/取消收费.png')

                },
                {
                    label:"取消收费授权",
                    name:"CancellationChargeAuthorization",
                    src: require('@/assets/images/取消收费权限.png')

                },
                // {
                //     label:"修改电话",
                //     name:"phoneNumEditVisible",
                //     src: require('@/assets/images/修改电话.png')
                // },
                // {
                //     label:"打印新卡",
                //     name:"PrintCard",
                //     src: require('@/assets/images/打印新卡.png')
                // },
                {
                    label:"用户工程",
                    name:"/EngineeringCenter/EngineeringRegistration",
                    src: require('@/assets/images/用户工程.png'),
                },
                
                 {
                    label:"用户停用",
                    name:"/CustomerCenter/DiscontinueUse",
                    src: require('@/assets/images/用户停用.png'),

                },
                {
                    label:"用户复用",
                    name:"/CustomerCenter/multiplexing",
                    src: require('@/assets/images/用户复用.png'),

                },
                {
                    label:"用户过户",
                    name:"/CustomerCenter/Transfer",
                    src: require('@/assets/images/用户过户.png'),

                },
                {
                    label:"用户销户",
                    name:"/CustomerCenter/SalesAccount",
                    src: require('@/assets/images/用户销户.png'),


                },
                {
                    label:"账户流水",
                    name:"PredepositDdetailsVisible",
                    src: require('@/assets/images/客服工单.png')

                },
                {
                    label:"资料变更",
                    name:"/CustomerCenter/DataChange",
                    src: require('@/assets/images/资料更变.png')
                },
                {
                    label:"用水类型变更",
                    name:"/CustomerCenter/TypesOfWaterUse",
                    src: require('@/assets/images/用水类型更变.png')

                },
                {
                    label:"人口变更",
                    name:"/CustomerCenter/SteppedPopulation",
                    src: require('@/assets/images/人口更变.png')

                },
                {
                    label:"优惠变更",
                    name:"/CustomerCenter/PreferentialWaterUse",
                    src: require('@/assets/images/优惠更变.png')

                },
                {
                    label:"缴费方式变更",
                    name:"/CustomerCenter/PaymentMethod",
                    src: require('@/assets/images/缴费方式更变.png')

                },
                {
                    label:"开票变更",
                    name:"/CustomerCenter/InvoiceInformation",
                    src: require('@/assets/images/开票变更.png')

                },
                {
                    label:"校表",
                    name:"/WatchCenter/ComparisonTable",
                    src: require('@/assets/images/检定.png')

                },
            ],
            rightBtnsEvents:[
                
               
            ],
            histroyData:{},
            phoneNumEditVisible:false,  //编辑的显示和隐藏
            phoneNumEditorName:'修改电话',
            UserInformationName:"",
            userInfo:false,
            currentName:"",
            tableShow:false,
            maxHeight:0,
            btnsHeight:0,
            paymentTypeModelLive:false,
            locking:"",
            DailyReceiptInquiryName:"日收款查询",
            InvoiceReplacementName:"发票补打",
            UnsettledAccountsStatisticsName:"现金缴存",
            CancellationChargesName:"取消收费",
            CancellationChargeAuthorizationName:"取消收费授权",
            DailyReceiptInquiry:false,
            InvoiceReplacement:false,
            UnsettledAccountsStatistics:false,
            CancellationCharges:false,
            CancellationChargeAuthorization:false,
            AmountCharged:"",
            BreachOfContract:false,//违约明细
            CopyInstructions:false,//抄表明细
            Discount:false,  //    优惠明细                                                                                                                                                           
            Balance:false,//结存明细    
            lastPage:1,
            total:2,
        }
    },
    mounted(){
        this.init();
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      
        this.$changeTable(this,'.IntegratedBusiness .toolBlock',['.IntegratedBusiness .left-con'])
    
    },
    methods:{
        check(){
            this.FlowingTableVisible = true

        },
        detailsClick(val){
            if(val){
                this.BreachOfContract = true;
            }else{
                this.BreachOfContract = false;
            }
        },
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
                        code:"0102654",
                        daytime:" 王淑英",
                        areaName:"宁水花园1栋1单元703",
                        lvalue:"201906",
                        areaId:"23232323",
                        modifyBy:"23",
                        concentrator:"23",
                        offset:"2.14",
                        getMeter:"2",
                        type:true,
                        areaNamea:"水费",
                        rowNumber:"2540000.02",
                        unusual:"254.2",
                        fixValue:"254.2",
                        usn:"254.2",
                        page:"254.2",
                        pageCount:"254.2",
                        Wtype:"工业用水",
                    },
                    {
                        code:"0102654",
                        daytime:" 王淑英",
                        areaName:"宁水花园1栋1单元703",
                        lvalue:"201906",
                        areaId:"23",
                        modifyBy:"23",
                        concentrator:"23",
                        offset:"2.14",
                        getMeter:"2",
                        type:true,
                        areaNamea:"污水处理费",
                        rowNumber:"254.2",
                        unusual:"254.2",
                        fixValue:"254.2",
                        usn:"254.2",
                        page:"254.2",
                        pageCount:"254.2",
                        Wtype:"工业用水",
                    },
                    {
                        code:"0102654",
                        daytime:" 王淑英",
                        areaName:"宁水花园1栋1单元703",
                        lvalue:"201906",
                        areaId:"23",
                        modifyBy:"23",
                        concentrator:"23",
                        offset:"2.14",
                        getMeter:"2",
                        type:true,
                        areaNamea:"垃圾处理费",
                        rowNumber:"254.2",
                        unusual:"254.2",
                        fixValue:"254.2",
                        usn:"254.2",
                        page:"254.2",
                        pageCount:"254.2",
                        Wtype:"工业用水",
                    },
                    {
                        code:"0102654",
                        daytime:" 王淑英",
                        areaName:"宁水花园1栋1单元703",
                        lvalue:"201905",
                        areaId:"23",
                        modifyBy:"23",
                        concentrator:"23",
                        offset:"2.14",
                        getMeter:"2",
                        type:true,
                        areaNamea:"水费",
                        rowNumber:"254.2",
                        unusual:"254.2",
                        fixValue:"254.2",
                        usn:"254.2",
                        page:"254.2",
                        pageCount:"254.2",
                        Wtype:"工业用水",
                    },
                    {
                        code:"0102654",
                        daytime:" 王淑英",
                        areaName:"宁水花园1栋1单元703",
                        lvalue:"201906",
                        areaId:"23",
                        modifyBy:"23",
                        concentrator:"23",
                        offset:"2.14",
                        getMeter:"2",
                        type:true,
                        areaNamea:"污水处理费",
                        rowNumber:"254.2",
                        unusual:"254.2",
                        fixValue:"254.2",
                        usn:"254.2",
                        page:"254.2",
                        pageCount:"254.2",
                        Wtype:"工业用水",
                    },
                    {
                        code:"0102654",
                        daytime:" 王淑英",
                        areaName:"宁水花园1栋1单元703",
                        lvalue:"201906",
                        areaId:"23",
                        modifyBy:"23",
                        concentrator:"23",
                        offset:"2.14",
                        getMeter:"2",
                        type:true,
                        areaNamea:"垃圾处理费",
                        rowNumber:"254.2",
                        unusual:"254.2",
                        fixValue:"254.2",
                        usn:"254.2",
                        page:"254.2",
                        pageCount:"254.2",
                        Wtype:"工业用水",
                    },
                    // {
                    //     code:"",
                    //     daytime:" ",
                    //     areaName:"",
                    //     lvalue:"",
                    //     areaId:"",
                    //     modifyBy:"",
                    //     concentrator:"23",
                    //     offset:"",
                    //     getMeter:"",
                    //     type:true,
                    //     areaNamea:"合计",
                    //     rowNumber:"254.2",
                    //     unusual:"254.2",
                    //     fixValue:"254.2",
                    //     usn:"254.2",
                    //     page:"254.2",
                    //     pageCount:"254.2",
                    // },
           
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
            };
            this.rightBtnsEvents = this.rightBtns2;
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if(column.label==="违约天数"||column.label==="应缴合计"||column.label==="上期余额"||column.label==="结存余额"||column.label==="账期"
            ||column.label==="上期数"||column.label==="本期数"){
                if (rowIndex % 3 === 0){
                    return {
                        rowspan: 3,
                        colspan: 1
                    };
                }else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
            // if (columnIndex==0||columnIndex==1||columnIndex==2||columnIndex==3||columnIndex==15||columnIndex==16||columnIndex==17){
            if (column.label==="NO."||column.label==="用户"||column.label==="用水类型"){
                if (rowIndex % 6 === 0){
                    return {
                        rowspan: 6,
                        colspan: 1
                    };
                }else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            
            }

        
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            let handleData = ['金额','应收违约金','实收违约金','应缴合计','上期余额','结存余额']
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                
                const values = data.map(item => Number(item[column.property]));
                if(handleData.includes(column.label)){
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                        }, 0);
                        sums[index] = sums[index].toFixed(2)
                        sums[index] += '';
                    } else {
                        sums[index] = '';
                    }
            });
            
            return sums;
        
        },

        closeDialog(){ //关闭会话
            this.phoneNumEditVisible = false;
            this.userInfo = false;
            this.DailyReceiptInquiry = false;
            this.InvoiceReplacement = false;
            this.UnsettledAccountsStatistics = false;
            this.CancellationCharges = false;
            this.CancellationChargeAuthorization = false;
            this.waterAddVisible = false;
            this.countManagementVisible = false;
            this.PredepositDdetailsVisible = false;
            this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.phoneNumEditor.submit()
            this.phoneNumEditVisible = false;
        },
        // 修改电话
        editPhoneNum(){
            this.phoneNumEditVisible = true;
        },
        // 用户信息查询
        userInfoSearch(currentLabel,name){
            
            if(/^[a-zA-Z]/g.test(name)){
                this.UserInformationName = currentLabel
                this.currentName = name;
                this[name] = true;
            }else if(/^\//g.test(name)){
                this.$router.push({path:name});
            }
            // this.rightBtnsEvents.forEach((item)=>{
            //     if(/^\//g.test(name))
            //     if(name==item.name){
            //         this[item.name] = true;
                   
            //     }
            // })
        } ,
        demand(){
            this.init()
        } ,
        dialogTitleEdit(title){
            this.UserInformationName = title;
        },
        next(){
            if(this.rightBtnsEvents==this.rightBtns1){
                this.rightBtnsEvents = this.rightBtns2;
            }else{
                this.rightBtnsEvents = this.rightBtns1;
            }
            
        },
        leftShow(){
            this.menuLeftShow = true;
        },
        leftHidden(){
            this.menuLeftShow = false;
        },
        // 高级查询
        advSearch(){
            this.waterAddVisible = true;
        },
        // 客户资料
        ctmInfo(){
            this.countManagementVisible = true;
        }
    },
    watch:{
      locking(){
          this.paymentTypeModelLive = !this.paymentTypeModelLive;
      },
    //   maxHeight(){
    //         this.tableShow = false
    //         this.$nextTick(()=>{
    //             this.tableShow = true
    //         })
    //     },
  
    }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$theme-color:#297ACC;
.IntegratedBusiness{
    zoom: 1;
    padding-top:10px;
    width: 100%;
    height: calc(100% - 10px);
    .customerManagementEdit .backfillSubmitForm {
        width: calc(100% - 25px);
        margin-left: 10px;
        margin-right: 10px;
    }
    .el-table__footer-wrapper{
        .has-gutter{
            td:last-of-type .cell{
                color: red;
                font-size: 24px;
            }
        }
    }
    .UserInformation .el-dialog__body{
        height: calc(100% - 56px);
    }
    &:after{
        @include _clearBoth()
    }
    & > section{
        zoom: 1;
        height: 100%;
        &:after{
            @include _clearBoth()
        }
    }
    .leftForm{
        float: left;
        width: calc(100% - 220px);
        // width: 100%;
        height: 100%;
        zoom: 1;
        &:after{
            @include _clearBoth()
        }
        .left-con{
            // float: left;
            // width: calc(100% - 320px);
            width: 100%;
            .leftFormOption{
                width: 100%;
                zoom: 1;
                &:after{
                    @include _clearBoth()
                }
                .demo-form-inline{
                    float: left;
                    width: calc(40% - 50px);
                    height: 100px;
                    padding:10px 20px;
                    .fullSearch{
                        width: 100%;
                        margin-bottom: 15px;
                        .el-form-item__content{
                            width: 100%;
                            .el-input__inner{
                                width: 100%;
                                font-size: 18px;
                                height: 40px;
                                line-height: 40px;
                                // padding-left: 0px;
                                &::-webkit-input-placeholder{
                                    font-size: 14px;
                                }
                                &::-moz-placeholder{
                                    font-size: 14px;
                                }
                                &:-ms-input-placeholder{
                                    font-size: 142px;
                                }
                            }
                        }
                    }
                    .el-form-item__label{
                        font-size: 16px;
                        text-align: justify;
                    }
                    
                    .fullBtn{
                        width: 100%;
                        text-align: center;
                        position: relative;
                        .el-form-item__content{
                            width: 100%;
                            height: 40px;
                        }
                        .el-button{
                            width: 30%;
                            height: 40px;
                            line-height: 25px;
                            span{
                                font-size: 15px;
                            }
                        }
                        i{
                            font-size: 18px;
                        }
                        .el-button--default{
                            height: 40px;

                        }
                        .advanceSearch{
                            // position: absolute;
                            // bottom: 0px;
                            // right: 5px;
                            // color: rgba(0,0,0,.5);
                            // cursor: pointer;
                            width:15%;
                            height: 40px;
                        }
                    }
                }
                .userInfo{
                    width: calc(60% - 50px);
                    float:right;
                    height: 110px;
                    padding:10px 20px 0px;
                    text-align: justify;
                    
                }
            }
            .leftFormPaymentOption{
                height: 155px;
                padding:10px 20px 15px;
                .remark{
                    margin-right: 0px !important;
                    .el-form-item__content{
                        width: calc(100% - 80px);
                        .el-input{
                            width: 80%;
                        }
                    }
                }
                .costInfo{
                    width: 100%;
                    font-size: 16px;
                    margin-top: 0px;
                    border-bottom: 1px dashed #dfe3e6;
                    padding-bottom: 10px;
                    & > li{
                        width: 25%;
                        font-size: 16px;
                        height: 40px;
                        line-height: 40px;
                        b{
                            margin-right: 5px;
                        }
                    }
                    & > li:nth-of-type(1) > b{
                        width: 20%;
                        color: red;
                        font-size: 24px;
                        font-weight: 300;
                    }
                    & > li:nth-of-type(2) > b{
                        width: 20%;
                        font-size: 24px;
                        color: $theme-color;
                    }
                }
                .PayForm{
                    padding-top: 5px;
                    .invioce{
                        .el-checkbox__label{
                            color: #909399 !important;
                        }
                    }
                    .el-form-item{
                        width: 40%;
                        // &:last-of-type{
                        //     width: calc(100% - 200px);
                        //     .el-form-item__content{
                        //         width: 60%;
                                
                        //         .el-input{
                        //             width:60%;
                        //         }
                        //     }
                        // }
                        &:nth-of-type(2n){
                            width:50%;
                        }
                        &:nth-of-type(5){
                            // width: 150px;
                            // margin-right: 20px;
                            .el-checkbox {
                                margin-left: 20px;
                            }
                            
                        }
                        .el-radio{
                            height: 27px;
                            line-height: 27px;
                        }
                        .el-form-item__label,.el-radio__label,.el-checkbox__label{
                            font-size: 14px;
                            
                        }
                        .el-radio__label,.el-checkbox__label{
                            color: #000;
                        }
                        .el-form-item__label{
                            text-align: justify;
                            text-align-last: justify;
                        }
                    }
                    .afterPay{
                        height: 32px;
                        line-height: 27px;
                        vertical-align: top;
                    }
                }
            }
        }
        
    }
    .rightBtn{
        height: calc(100% - 10px);
        float: right;
        width: 200px;
        padding-top: 15px;
        box-sizing: border-box;
        overflow: auto;
        // height: 313px;
        .el-button{
            display: block;
            
        }
    }
    .rightBtn{
        text-align: right;
        border: 1px solid #aebbc342;
        margin-right: 10px;
        border-radius: 5px;
        zoom: 1;
        position: relative;
        box-shadow: 3px 3px 3px rgba(0,0,0,0.05);
        &:after{
            @include _clearBoth()
        }
        div{
            margin-top: 5px;
            width: 49%;
            float: left;
            text-align: center;
            &:hover{
                cursor: pointer;
            }
            p{
            color: #909399; 
            }
            img{
                width: 30px;
                height: 30px;
            }
        }
        .moreBtn{
            position: absolute;
            bottom: 0px;
            left: 0px;
            height: 0px;
            width: 100%;
            // padding-right: 15px;
            .spagination{
                position: absolute;
                bottom: 5px;
                right: 27%;
                text-align: center;
                .up,.down{
                    width: 0px;
                }
                .pageNum{
                    padding-top: 5px;
                }
            }
            .set{
                position: absolute;
                bottom: 5px;
                right: 5px;
                width: 5px;
                height: 5px;
                border-right: 1px solid $theme-color;
                border-bottom: 1px solid $theme-color;
            }
        }
        .menuLeft,.menuRight{
            position: absolute;
            top: 50%;
            width: 25px;
            height: 25px;
            line-height: 25px;
            border-radius: 50%;
            -moz-border-radius: 50%;
            background: rgba(0,0,0,.2);
            i{
                font-size: 14px;
                
                color: #fff;
                line-height: 25px;
            }
        }
        .menuLeft{
            left: 0px;
        }
        .menuRight{
            right: 0px;
        }
    }
    .el-form--inline{
        width: 100%;
        margin-top: 0px;
    }
    .el-form--inline .el-form-item{
        margin-right:15px;


    }
    .el-radio,.el-checkbox{
        margin-right:10px;
    }
    .el-table .el-checkbox{
        margin-right:0px;
    }
    .el-radio__label{
        font-size: 12px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 5px;
        
    }
    .userInfo,.costInfo{
        zoom: 1;
        
        &:after{
            @include _clearBoth()
        }
        & > li{
            float: left;
            & >  span{
                color: #000;
            }
        }
        .el-button{
            width: 90px;
            height: 40px;
            line-height: 24px;
            span{
                font-size: 14px;
            }
            i{
                font-size: 16px;
            }
        }
        .AmountCharged{
            width:220px !important;
            font-weight: 700;
            .el-input{
                width: 50% !important;
                
                .el-input__inner{
                    // color: red !important;
                    font-size: 18px;
                    margin-right: 5px;
                    height: 40px;
                    line-height: 40px;
                    // &::-webkit-input-placeholder{
                    //     color: red;
                    // }
                    // &::-moz-placeholder{
                    //     color: red;
                    // }
                    // &:-ms-input-placeholder{
                    //     color: red;
                    // }
                }

                
            }
            
            
        }
    }
    .userInfo{
        .userDetails{
            color: $theme-color;
            cursor: pointer;
            .ctmNo{
                text-decoration: underline;
                color: $theme-color;
            }
        }
        & > li{
            color: #909399;
            width: 50%;
            margin-bottom: 15px;
            font-size: 14px;
            &:nth-of-type(2){
                .userInfoValue{
                    font-size:18px;
                }
            }
            &:last-of-type{
                color: $theme-color;
            }
            .userInfoLabel{
                color: #909399;
                display: inline-block;
                width: 80px;
                text-align: justify;
                text-align-last: justify;
            }
            
        }
    }
     
    
    
    .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td {
        background-color: #fff;
        word-wrap: break-word;
    }
    .leftFormOption .demo-form-inline,.leftFormPaymentOption,.userInfo{
        border: 1px solid #aebbc342;
        box-shadow: 3px 3px 3px rgba(0,0,0,0.05);
        margin-bottom: 10px;
        border-radius: 5px;
    }
    
    .kl-table{
        // width: calc(100% - 10px);
        width: 100%;
        .el-table{
            margin-top: 10px;
            width: 100%;
        }
        .table-tool{
            .el-checkbox-group{
                width:280px;
                display: inline-block;
            }
            .payLabel{
                font-size: 15px;
            }
        }
    } 
    .border-line{
        width: 1px;
        border-right: 1px dashed #dfe3e6;
        height: 18px;
        margin-top: 5px;
    }
    .el-table__body-wrapper .el-table_97_column_1181 .cell{
        height: 90px;
        line-height: 90px;
        word-wrap: break-word;
    }
    .FlowingTabel{
        .el-form-item__content /deep/ .el-date-editor{
            width: 340px;
        }
        .el-dialog__body{
            padding: 10px;
        }
    }
    .el-dialog{
        width: 90% !important;
    }

    

}
.el-tooltip__popper.is-light{
        border: 1px solid #297ACC;
        color: #297ACC;
    }


</style>

