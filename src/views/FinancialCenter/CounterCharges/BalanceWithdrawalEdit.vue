


<template>
    <div class="BalanceWithdrawalEdit">
        <!-- <el-form :inline="true" :model="formData" class="demo-form-inline" :rules="rules">
            <el-form-item label="模糊查询：">
                <el-input v-model="formData.con" placeholder="用户编号/流水号" class="search"></el-input>
            </el-form-item>

            <el-form-item>
                
                <el-button style="background:#faa646;color:#fff;" size="mini"  @click="demand" icon="el-icon-search"></el-button>
            </el-form-item>
        </el-form> -->
        <el-form class="BalanceWithdrawalForm" :inline="true" :model="BalanceWithdrawalEditForm" label-width="100px" ref="ruleForm" :rules="rules">
            <legend>客户信息</legend>

            <el-form-item label="客户编号：">
                <el-input v-model="BalanceWithdrawalEditForm.ctmNo" placeholder="01003152" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="客户名称：">
                <el-input v-model="BalanceWithdrawalEditForm.countNum" placeholder="张三" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="客户地址：">
                <el-input v-model="BalanceWithdrawalEditForm.countNum" placeholder="宝积山路、体育巷" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="客户类型：">
                <el-input v-model="BalanceWithdrawalEditForm.countNum" placeholder="大客户" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="信用等级：">
                <el-input v-model="BalanceWithdrawalEditForm.countNum" placeholder="二级" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="联系人：">
                <el-input v-model="BalanceWithdrawalEditForm.countNum" placeholder="谢顺新" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="联系电话：">
                <el-input v-model="BalanceWithdrawalEditForm.countNum" placeholder="13662592308" disabled class="read-only"></el-input>
            </el-form-item>

            <el-form-item label="手机号码：">
                <el-input v-model="BalanceWithdrawalEditForm.countNum" placeholder="15566778899" disabled class="read-only"></el-input>
            </el-form-item>

            <legend>账户信息</legend>
            <el-form-item label="账户编号：" class='userCode'>
                <el-input v-model="BalanceWithdrawalEditForm.userNo" placeholder="101801012001" class="read-only"></el-input>
                <el-button style="background:#faa646;color:#fff;" icon="el-icon-search"></el-button>
            </el-form-item>
            <el-form-item label="账户类型：">
                <el-input v-model="BalanceWithdrawalEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="缴费方式：">
                <el-input v-model="BalanceWithdrawalEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in BalanceWithdrawalEditForm.countMsg" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="开户行：">
                <el-input v-model="BalanceWithdrawalEditForm.PriceStrategy" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in BalanceWithdrawalEditForm.countMsgOrder" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
            </el-form-item>
            <legend>取出信息</legend>
            <el-form-item label="取出金额：">
                <el-input v-model="BalanceWithdrawalEditForm.VirtualTable" placeholder="" class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="取出后余额：">
                <el-input v-model="BalanceWithdrawalEditForm.TypesGarbageCharges" placeholder="" disabled class="read-only"></el-input>
            </el-form-item>
            <el-form-item label="备注：" class="Remarks">
                <el-input v-model="BalanceWithdrawalEditForm.PriceTypes" type="textarea" placeholder="" class="read-only"></el-input>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
export default {
    name:"BalanceWithdrawalEdit",
    data(){
        return{
            BalanceWithdrawalEditForm: {
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
                isfinesOptinon:[
                    {
                        name: "欠费拆表",
                        value: "1"
                    },
                    {
                        name: "停用拆表",
                        value: "2"
                    },
                    {
                        name: "销户拆表",
                        value: "3"
                    },

                ],
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
                radio1: '1',
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
                countMsg: [
                {
                    label: "余额：",
                    value: "",
                    tips: ""
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
                    label: "停水联系人：",
                    value: "",
                    tips: ""
                },
                {
                    label: "停水联系电话：",
                    value: "",
                    tips: ""
                },
                {
                    label: "房产证编号：",
                    value: "",
                    tips: ""
                },


                ],
                Waterworks: "",
                pumpingStation: "",
                Pipeline: "",
                VirtualTable: "",
                TypesGarbageCharges: "",
                PriceTypes: "",

            },

            rules:{
                userNume:[
                    { required: true, message: '请输入客户名称', trigger: 'blur' },
                ],
                desc:[
                    { required: true, message: '请输入取出金额', trigger: 'blur' },
                ]
            },
            histroyData:{
                
            },
            formData:{
                con:""
            }
    
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
   
        },
        demand(){
            this.init()
        }

    }
}
</script>
<style lang="scss">
$theme-font-color:#3680CD;
.BalanceWithdrawalEdit{
    legend {
        background: #f5f5f5;
        font-weight: 700;
        font-size: 12px;
        padding: 5px 20px;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .BalanceWithdrawalForm{
        margin-top: 15px;
    }
    .BalanceWithdrawalForm{
        padding: 10px 20px;
        width: calc(100% - 40px);
        margin:0px auto;
        .el-form-item{
            width: 24%;
            margin-right: 0px;
            .el-form-item__content{
                width: calc(100% - 100px);
                .el-select,.el-input__inner{
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        .Remarks{
            width: 50%;
            .el-form-item__content{
                width:calc(100% - 100px);
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
    .userCode{
        .el-form-item__content{
            .el-input{
                width: 75% !important;
            }
            .el-button{
                width: 23%;
                padding: 7px 0px;
            }
        }
    }
}
</style>

