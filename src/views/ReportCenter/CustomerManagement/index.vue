<template>
    <div class="CustomerManagement">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        </div>
        <CustomerManagements class="Customer" :areaShow="false"></CustomerManagements>
    </div>
</template>
<script>
import CustomerManagements from "../../ChargeAnalysisStatement"
export default {
    name:"CustomerManagement",
    components:{
        CustomerManagements
    },
    data(){
        return{ 
            crumbsData :{  //面包屑
                titleList:[
                    {title:'报表中心',path:'/ChangeTables'},
                    {title:'客户管理分析',method:()=>{window.histroy.back()}}
                ],
                
            },
        }
    },
}
</script>
<style lang="scss">
.CustomerManagement{
    width: 100%;
    height: 100%;
    .Customer{
        height: calc(100% - 40px);
        width: 100% ;
    }
}
</style>
