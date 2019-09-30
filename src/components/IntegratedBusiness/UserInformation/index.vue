<template>
    <div class="UserInformation">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="现金收费" name="CashCharges"></el-tab-pane>
            <!-- <el-tab-pane label="预存收费" name="third">预存收费</el-tab-pane> -->
            <el-tab-pane label="用户资料查询" name="userInfo">
                <userInfoSearch></userInfoSearch>
            </el-tab-pane>
            <el-tab-pane label="日收款查询" name="DailyReceiptInquiry">
                <DailyReceiptInquiry></DailyReceiptInquiry>
            </el-tab-pane>
            <el-tab-pane label="发票补打" name="InvoiceReplacement">
                <InvoiceReplacement></InvoiceReplacement>
            </el-tab-pane>
            <el-tab-pane label="未结账统计" name="UnsettledAccountsStatistics">
                <UnsettledAccountsStatistics></UnsettledAccountsStatistics>
            </el-tab-pane>
            <el-tab-pane label="取消收费" name="CancellationCharges">
                <CancellationCharges></CancellationCharges>
            </el-tab-pane>
            <el-tab-pane label="取消收费授权" name="CancellationChargeAuthorization">
                <CancellationChargeAuthorization></CancellationChargeAuthorization>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import userInfoSearch from "./userInfoSearch"
import InvoiceReplacement from "./InvoiceReplacement"
import DailyReceiptInquiry from "./DailyReceiptInquiry"
import UnsettledAccountsStatistics from "./UnsettledAccountsStatistics"
import CancellationCharges from "./CancellationCharges"
import CancellationChargeAuthorization from "./CancellationChargeAuthorization"
export default {
    name:"UserInformation",
    components:{
        userInfoSearch,
        InvoiceReplacement,
        DailyReceiptInquiry,
        UnsettledAccountsStatistics,
        CancellationCharges,
        CancellationChargeAuthorization
    },
    props:["activeTitle"],
    data(){
        return{
            activeName: this.activeTitle
        }
    },
    methods:{
        handleClick(tab, event) {
            if(tab.name==="CashCharges"){
                this.$emit('isVisiable',false);
  
            }
            this.$emit('dialogTitle',tab.label);

        }
    },
    watch:{
        activeTitle(newVal, oldVal){
            this.activeName = newVal
    
        }
    }
}
</script>
<style lang="scss">

</style>
