<template>
    <div class="TransferDetails">
        <el-table      
            stripe
            border
            :data="historyData.list"
            class="change-tables-table">

            <el-table-column 
                type="index"  label="NO."
                width="50" 
                fixed="left"
                >
            </el-table-column>

            <el-table-column
                prop="code"
                
                min-width="150"
                label="客户编号">
            </el-table-column>

            <el-table-column
                prop="areaName"
                min-width="100"
                label="户名">
            </el-table-column>

            <el-table-column
                prop="daytime"
                min-width="180"
                label="年月">

            </el-table-column>

            <el-table-column
  
                min-width="200"
                label="费用类型">
                     
                <template slot-scope="scope">
                    <span>{{scope.row.lvalue}}</span>
                    <b>{{scope.row.sub}}</b>
                </template>
            </el-table-column>

            <el-table-column

                min-width="180"
                label="应收金额（不含违约金）">
                <template slot-scope="scope">
                    <span>{{scope.row.fixValue}}</span>
                    <b>{{scope.row.Total}}</b>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script>
export default {
    name:"TransferDetails",
    props:["detailsData"],
    data(){
        return{
            historyData:this.detailsData
        }
    },
    mounted(){

      
    },
    methods:{


    }
}
</script>
<style lang="scss">
.TransferDetails{
    padding:10px 20px;
    .el-table{
        b{
            color: red;
        }
    }
}
</style>
