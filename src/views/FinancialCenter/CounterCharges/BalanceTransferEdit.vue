

<template>
    <div class="BalanceTransferEdit">

        <el-form class="BalanceTransferForm" :inline="true" :model="BalanceTransferEditForm" label-width="160px" ref="ruleForm" :rules="rules">
            <el-form-item label="转出账户：">
                <el-input v-model="BalanceTransferEditForm.userNume" placeholder=""></el-input>
            </el-form-item>

            <el-form-item :label="v.label" v-for="(v,i) in BalanceTransferEditForm.backfillInputOnly" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled ></el-input>
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in BalanceTransferEditForm.turnOut" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips"></el-input>
            </el-form-item>
            <el-form-item label="转入账户：">
                <el-input v-model="BalanceTransferEditForm.TransferAccount" placeholder=""></el-input>
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in BalanceTransferEditForm.backfillInputOnly" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in BalanceTransferEditForm.backfillInput" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="desc" placeholder=""></el-input>
            </el-form-item>
 
        </el-form>

    </div>
</template>
<script>
export default {
    name:"BalanceTransferEdit",
    data(){
        return{
            BalanceTransferEditForm:{
                // 查询内容
                backfillInput:[

                     {
                        label:"转入金额：",
                        value:"",
                        tips:""
                    },
                    
                    {
                        label:"转入后余额：",
                        value:"",
                        tips:""
                    },
                   
                ],
                turnOut:[

                     {
                        label:"转出金额：",
                        value:"",
                        tips:""
                    },
                    
                    {
                        label:"转出后余额：",
                        value:"",
                        tips:""
                    },
                   
                ],
                backfillInputOnly:[
                    {
                        label:"客户名称：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"客户地址：",
                        value:"",
                        tips:""
                    },
                    
                    {
                        label:"账户余额：",
                        value:"",
                        tips:""
                    },
                ],
               
                desc:"",
                userNume:"",
                descoptions:[],
                TransferAccount:""
            },
            rules:{
                userNume:[
                    { required: true, message: '请输入用户编号', trigger: 'blur' },
                ],
                desc:[
                    { required: true, message: '请输入用户编号', trigger: 'blur' },
                ]
            },
            histroyData:{
                
            },
            label:0
    
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
$theme-font-color:#3680CD;
.BalanceTransferEdit{

    .BalanceTransferForm{
        margin-top: 15px;
    }
    .BalanceTransferForm{
        padding: 10px 20px;
        width: 93%;
        .el-form-item{
            width: 40%;
            .el-form-item__content{
                width: 50%;
                .el-select{
                    width: 100%;
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
    .theme-color .cell{
        color:$theme-font-color;
    }

}
</style>

