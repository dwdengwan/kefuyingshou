<template>
    <div class="FinancialManagement">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right" v-if="!historyShow">
                <!-- <el-button  type="primary" size="mini" icon="el-icon-upload2" @click="exportExcel">导出</el-button> -->

                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div>
        </div>
        <div class="FinancialManagementCon" v-show="historyShow">
            <ul>
                <li>最后月结账日期：
                    <span>201803</span>
                </li>
                <li>本次月结账日期：
                    <span>201804</span>
                </li>
            </ul>
            <p>账期201804预存余额为2168876.71元，请核对预收款统计分析报表是否一致！</p>
            <h4>
                <el-button type="primary">月结</el-button>
                <el-button type="primary" @click="history">历史查询</el-button>
            </h4>
        </div>
        <div v-show="!historyShow">
            <AccountPeriod></AccountPeriod>
        </div>
    </div>
</template>
<script>
import AccountPeriod from "./AccountPeriod"
export default {
    name:"FinancialManagement",
    components:{
        AccountPeriod
    },
    data(){
        return{
            crumbsData :{  //面包屑
                titleList:[
                    {title:'账务中心',path:'/AccountSplitting'},
                    {title:'结账管理',method:()=>{window.histroy.back()}},
                    {title:'月结',method:()=>{window.histroy.back()}},

                ],
                
            },
            historyShow:true,
        }
    },
    methods:{
        history(){
            this.historyShow = false;
            this.$set(this.crumbsData.titleList,"3",{title:'历史查询',method:()=>{window.histroy.back()}})

        },
        closeDialog(){
            this.historyShow = true;
            this.crumbsData.titleList.splice(3,1);
        }
    }
}
</script>
<style lang="scss">
.FinancialManagement{
    .FinancialManagementCon{
        width: 60%;
        margin:20px auto;
        & > ul{
            padding:20px;
            width: 100%;
            zoom: 1;
            &::after{
                display:block;
                content: "";
                clear: both;
            }
            & > li{
                width: 50%;
                text-align: center;
                float: left;
                font-size: 18px;
                &:first-of-type{
                    color:#3680CD;
                }
            }
        }
        & > p{
            text-align: center;
            color:#ccc;
            font-size: 16px;
        }
        & > h4{
            text-align: center;
            padding:30px;
            .el-button--primary {
                padding: 12px 100px;
            }
        }
    }
}
</style>

