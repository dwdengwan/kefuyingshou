
<template>
    <div class="FinancialCenter">
       
        <!-- <section class="FinancialCenter-left">
                
           <section class="kl-container">
            <aside class="kl-aside">
                <div class="nav-tree-contain">
                <el-menu
                    class="el-menu-vertical-demo"
                    :default-active="activeIndex"
                     @select="navTreeHandleSelect"
                    :router="true"
                    unique-opened
                    open>   
                        <section v-for="(k,i) in navTree" :key="i">
                            <el-menu-item v-if="k.children.length===0" :index="k.path">{{k.name}}</el-menu-item>                
                            <el-submenu v-else :index="k.path">
                                <template slot="title">{{k.name}}</template>
                                <el-menu-item v-for="(v,j) in k.children" :key="j" :index="v.path">{{v.name}}</el-menu-item>
                            </el-submenu>
                        </section>
                </el-menu>
                </div>
            </aside>
            <div class="collapse" @click="collapse">
                <i class="el-icon-arrow-left leftChange"></i>
            </div>
            </section>
        </section> -->
        <aside class="FinancialCenter-right">
                <CounterCharges v-if="$route.path==='/FinancialCenter/EngineeringFees'"></CounterCharges>
                <!-- <counter-charges v-if="$route.path==='/EngineeringFees'"></counter-charges> -->
                <router-view v-else></router-view>
        </aside>
    </div>
</template>
<script>
// import CounterCharges from './CounterCharges/BalanceWithdrawal.vue'
import CounterCharges from './CounterCharges/EngineeringFees.vue'
export default {
    name:"FinancialCenter",
    components:{
        CounterCharges
    },
    data(){
        return{
            navTree:[],
            activeIndex:"/EngineeringFees",
        }
    },
    mounted(){
        this.init();
        
    },
    methods:{
        init(){
            this.navTree = [
                 {
                    children: [
                        // {
                        //     path:"/FinancialCenter",
                        //     name:"现金收费"
                        // },
                        // {
                        //     path:"/BalanceTransfer",
                        //     name:"余额过户"
                        // },


                        // {
                        //     path:"/EngineeringFees",
                        //     name:"工程类收费"
                        // },
                        // {
                        //     path:"/FinancialCenter",
                        //     name:"余额取出"
                        // },

                        {
                            path:"/EngineeringFees",
                            name:"工程类收费"
                        },
                        {
                            path:"/BalanceWithdrawal",
                            name:"余额取出"
                        },
                    ],
                    path: "/CounterCharges",
                    name:"柜台收费"
                },
                {
                    children: [
                        // {
                        //     path:"/BankCharges",
                        //     name:"银行代扣"
                        // },
                        // {
                        //     path:"/bankCollection",
                        //     name:"银行托收"
                        // },
                    ],
                    path: "/BankCharges",
                    name:"银行收费"
                },
                {
                    children: [
                        // {
                        //     path:"/InternetCharging",
                        //     name:"微信"
                        // },
                        // {
                        //     path:"/AlipayCount",
                        //     name:"支付宝"
                        // },
                        // {
                        //     path:"/UnionPay",
                        //     name:"银联"
                        // },
                    ],
                    // path: "/InternetCharging",
                    path:"/UnionPay",
                    name:"互联网收费"
                },
                {
                    children: [
                        {
                            path:"/FinancialAdjustment",
                            name:"追加费用"
                        },
                        {
                            path:'/Recover',
                            name:"追缴费用"
                        },
                        {
                            path:"/LiquidatedDamages",
                            name:"违约金减免"
                        },
                        // {
                        //     path:"/AccountSplitting",
                        //     name:"分账处理"
                        // },
                        {
                            path:"/DealingBadDebts",
                            name:"呆账处理"
                        },
                        {
                            path:"/ReportingBadDebts",
                            name:"坏账报损"
                        },
                        {
                            path:"/RedFlushing",
                            name:"冲红"
                        },
                        // {
                        //     path:"/CancellationMonthlyCharges",
                        //     name:"取消当月收费"
                        // },
       
                    ],
                    path: "/FinancialAdjustment",
                    name:"账务调整"
                },
                {
                    children: [
                        // {
                        //     path:"/FinancialManagement",
                        //     name:"月结"
                        // },
                        // {
                        //     path:"/AccountPeriod",
                        //     name:"账期"
                        // },
                    ],
                    path: "/FinancialManagement",
                    name:"结账管理"
                },
                {
                    children: [
                        {
                            path:"/BillManagement",
                            name:"发票注册"
                        },
                        {
                            path:"/InvoiceAcquisition",
                            name:"发票领用"
                        },
                        {
                            path:"/InvoiceBorrowing",
                            name:"发票借用"
                        },
                        {
                            path:"/InvoiceInvalidated",
                            // name:"发票作废"
                            name:"发票修改"
                        },
                        // {
                        //     path:"/InvoiceRestoration",
                        //     name:"发票还原"
                        // },
                        // {
                        //     path:"/InvoiceEdit",
                        //     name:"发票修改"
                        // },
                        {
                            path:"/InvoicePayment",
                            name:"发票交票"
                        },
                        {
                            path:"/InvoiceSearch",
                            name:"发票查询"
                        },
                    ],
                    path: "/BillManagement",
                    name:"票据管理"
                },
            
            ];
            
        },
        navTreeHandleSelect(key, keyPath){

            this.activeIndex = key
        },
        collapse(){
            this.util.menuShow('.FinancialCenter .FinancialCenter-left','.FinancialCenter .FinancialCenter-right','.FinancialCenter .kl-aside','.FinancialCenter .leftChange')
        }
      
    },

}
</script>
<style lang="scss">
  @import "../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
    .FinancialCenter{
        .el-table{
            .el-button--text {
                line-height: 5px;
                font-size: 12px;
            }
        }
        #crumbs {
            border-bottom: 1px solid #eaf4ff;
        }
        &:after{
            @include _clearBoth()
        }

        & > .FinancialCenter-right{
            width: 100%;
            height: 100%;
        }
        
    }
</style>
