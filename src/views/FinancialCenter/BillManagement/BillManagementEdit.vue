
<template>
    <div class="BillManagementEdit">

        <el-form class="BillManagementForm" :inline="true" :model="BillManagementEditForm" label-width="160px" ref="ruleForm" :rules="rules">
            <el-form-item label="发票类型：" prop="desc">
                <el-select  clearable v-model="BillManagementEditForm.desc" placeholder="水费发票">
                    <el-option  v-for="(item,index) in BillManagementEditForm.invoice" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="票据来源：" prop="PriceStrategy">
                <el-select  clearable v-model="BillManagementEditForm.PriceStrategy" placeholder="税务局">
                    <el-option  v-for="(item,index) in BillManagementEditForm.SourceBills" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="所属部门：" prop="PriceStrategy">
                <el-select  clearable v-model="BillManagementEditForm.departments" placeholder="税务局">
                    <el-option  v-for="(item,index) in BillManagementEditForm.SourceBills" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="发票代码：" prop="UpdateCodeCopye">
                <el-input v-model="BillManagementEditForm.UpdateCodeCopye" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="开始号码：" prop="isfines">
                <el-input v-model="BillManagementEditForm.isfines" placeholder=""></el-input>

            </el-form-item>
            
            <el-form-item label="结束号码：" prop="Remarks">
                <el-input v-model="BillManagementEditForm.Remarks" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="年份：" prop="year">
                <el-input v-model="BillManagementEditForm.year" placeholder=""></el-input>

            </el-form-item>
             <!-- <el-form-item label="注册站点：" prop="userNume">
                <el-select  clearable v-model="BillManagementEditForm.userNume" placeholder="营业部">
                    <el-option  v-for="(item,index) in BillManagementEditForm.RegistrationSite" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item> -->
            <el-form-item label="发票数量：" prop="userNum">
                <el-input v-model="BillManagementEditForm.userNum" disabled placeholder=""></el-input>

            </el-form-item>
            
            
            


           
            
        </el-form>

    </div>
</template>
<script>
export default {
    name:"BillManagementEdit",
    data(){
        return{
            BillManagementEditForm:{
                // 查询内容
                backfillInput:[
                    {
                        label:"上期抄表：",
                        value:"",
                        tips:"165497974"
                    },
                    {
                        label:"抄表日期：",
                        value:"",
                        tips:""
                    },

                     {
                        label:"用户名称：",
                        value:"",
                        tips:""
                    },
                    
                    {
                        label:"用户地址：",
                        value:"",
                        tips:""
                    },
                   
                ],
                invoice:[
                    {
                        name:"水票发票",
                        value:"1"
                    }
                ],
                RegistrationSite:[
                    {
                        name:"全部",
                        value:"2"
                    },
                    {
                        name:"营业部",
                        value:"2"
                    }
                ],
                SourceBills:[
                    {
                        name:"税务局",
                        value:"1"
                    },
                    {
                        name:"财务局",
                        value:"2"
                    },
                    {
                        name:"粤海水务有限公司",
                        value:"3"
                    }
                ],
               
                desc:"",
                userNume:"",
                descoptions:[],
                userNum:"",
                PriceStrategy:"",
                isfines:"",
                UpdateCodeCopye:"",
                Remarks:"",
                year:"",
                departments:"",
            },
            rules:{
                userNume:[
                    { required: true, message: '请输入注册站点', trigger: 'blur' },
                ],
                desc:[
                    { required: true, message: '请输入发票类型', trigger: 'blur' },
                ],
                userNum:[
                    { required: true, message: '请输入张数', trigger: 'blur' },
                ],
                PriceStrategy:[
                    { required: true, message: '请输入票据来源', trigger: 'blur' },
                ],
                isfines:[
                    { required: true, message: '请输入开始号码', trigger: 'blur' },
                ],
                UpdateCodeCopye:[
                    { required: true, message: '请输入发票代码', trigger: 'blur' },
                ],
                Remarks:[
                    { required: true, message: '请输入结束号码', trigger: 'blur' },
                ],
                year:[
                    { required: true, message: '请输入年份', trigger: 'blur' },
                ],
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
.BillManagementEdit{

    .BillManagementForm{
        margin-top: 15px;
    }
    .BillManagementForm{
        padding: 10px 20px;
        width: 93%;
        .el-form-item{
            width: 32%;
            height: 30px;
            line-height: 30px;
            .el-form-item__content{
                width: 48%;
                .el-select,.el-input__inner{
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
            }
            .el-input__icon{
                line-height: 30px;
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

