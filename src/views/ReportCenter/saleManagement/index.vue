<template>
    <div class="saleManagement">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        </div>
        <saleManagements class="saleManger" :areaShow="false"></saleManagements>
    </div>
</template>
<script>
import saleManagements from "../../CustomerAnalysisReport"
export default {
    name:"saleManagement",
    components:{
        saleManagements
    },
    data(){
        return{ 
            crumbsData :{  //面包屑
                titleList:[
                    {title:'报表中心',path:'/ChangeTables'},
                    {title:'销售管理分析',method:()=>{window.histroy.back()}}
                ],
                
            },
        }
    },
}
</script>
<style lang="scss">
.saleManagement{
    width: 100%;
    height: 100%;
    .saleManger{
        height: calc(100% - 40px);
        width: 100% ;
    }
}
</style>