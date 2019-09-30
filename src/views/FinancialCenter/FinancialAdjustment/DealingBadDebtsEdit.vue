

<template>
    <div class="DealingBadDebtsEdit">

        <el-form class="backfillSubmitForm" size="mini" :inline="true" :model="DealingBadDebtsEditForm" label-width="80px" ref="ruleForm" :rules="rules">
            <el-form-item label="用户编号：" prop="userNum">
                <el-input v-model="DealingBadDebtsEditForm.userNum" placeholder="0102689"></el-input>
            </el-form-item>
            
            <el-form-item :label="v.label" v-for="(v,i) in DealingBadDebtsEditForm.backfillInput" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
            </el-form-item>
            <el-form-item label="用水类型：">
                <el-select v-model="DealingBadDebtsEditForm.PriceStrategy" placeholder="居民用水" disabled>
                    <el-option
                    v-for="item in DealingBadDebtsEditForm.descoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in DealingBadDebtsEditForm.backfillInputOther" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
            </el-form-item>
            <el-form-item  class="Remarks" label="备注：">
                <el-input type="textarea" :rows="3" v-model="DealingBadDebtsEditForm.isfines" placeholder=""></el-input>
            </el-form-item>

            <el-form-item class="from-table">
                <el-table        
                    stripe
                    border
                    :data="histroyData.list"
                    class="change-tables-table">
                    
                    <el-table-column 
                         label="NO."
                        min-width="50" 
                        fixed="left"
                        type="selection"
                        >
                    </el-table-column>

                    <el-table-column 
                         label="NO."
                        min-width="50" 
                        fixed="left"
                        type="index"
                        >
                    </el-table-column>



                    <el-table-column
                        prop="daytime"
                        min-width="100"
                        label="账期">
                    </el-table-column>

                    <el-table-column
                        prop="model"
                        min-width="80"
                        label="抄表日期">

                    </el-table-column>

                    <el-table-column
                        prop="isxz"
                        min-width="100"
                        label="费用名称">
                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="计费水量">

                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="80"
                        label="应缴金额">

                    </el-table-column>
                    
                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="违约天数">

                    </el-table-column>

                    <el-table-column
                        prop="lvalue"
                        min-width="80"
                        label="违约金">

                    </el-table-column>


                </el-table>

            </el-form-item>


            
        </el-form>

    </div>
</template>
<script>
export default {
    name:"DealingBadDebtsEdit",
    props:["tableData"],
    data(){
        return{
            DealingBadDebtsEditForm:{
                // 查询内容
                backfillInput:[
                    {
                        label:"用户名称：",
                        value:"",
                        tips:"xx319"
                    },
                    {
                        label:"用户地址：",
                        value:"",
                        tips:"登封路"
                    },
                    
                ],
                backfillInputOther:[
                    {
                        label:"联系人：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"联系电话：",
                        value:"",
                        tips:""
                    },
                ],
               
                desc:"",
                userNume:"",
                descoptions:[
                    {
                        name:"居民用水",
                        value:"1"
                    },
                    {
                        name:"非居民用水",
                        value:"2"
                    },
                ],
                userNum:"",
                PriceStrategy:"",
                isfines:"",
            },
            rules:{
                userNum:[
                    { required: true, message: '请输入用户编号', trigger: 'blur' },
                ],
                desc:[
                    { required: true, message: '请输入用户编号', trigger: 'blur' },
                ]
            },
            histroyData:this.tableData,
                
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){

        },

    }
}
</script>
<style lang="scss">
.DealingBadDebtsEdit{
    padding: 10px 20px;
    legend{
        background: #f5f5f5;
        font-weight: 700;
        font-size: 12px;
        padding: 5px 20px;
        font-size: 14px;
    }
    .backfillSubmitForm{
        margin-top: 15px;
    }
    .backfillSubmitForm{
        
        width: 100%;
        
        .el-form-item{
            width: 24%;
            margin-right: 0px;
            margin-bottom: 15px;
            .el-form-item__content{
                width: calc(100% - 80px);
                
                .el-select,.el-input__inner{
                    width: 100%;
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
                width:calc(100% - 100px);
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

        .Remarks{
            width: 48%;
            .el-form-item__content{
                width:calc(100% - 80px);
            }
        }
    }
    .el-steps--horizontal{
        margin: 0 auto;
        width: 50%;
        padding-bottom: 20px;
    }

}
</style>

