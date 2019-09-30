
<template>
    <div class="InformationReleaseManagementEditFrom">

         <div class="backfillSubmitForm">
        <el-form class="basicInfoForm" size="mini" :model="InformationReleaseManagementEditFromForm" label-width="150px" ref="ruleForm" :rules="rules">
            <el-form-item label="信息类型：" prop="userNume">
                <el-select v-model="InformationReleaseManagementEditFromForm.userNume" placeholder="">
                    <el-option
                    v-for="item in InformationReleaseManagementEditFromForm.descoptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图标：" prop="userNume">
               <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题：" prop="title">
                <el-input v-model="InformationReleaseManagementEditFromForm.title" placeholder=""></el-input>
            </el-form-item>
            
            <el-form-item label="描述：">
                <el-input v-model="InformationReleaseManagementEditFromForm.describe" placeholder=""></el-input>
            </el-form-item>
            
            <el-form-item label="类型：" prop="factoryName">
                <el-select v-model="InformationReleaseManagementEditFromForm.type" placeholder="">
                    <el-option
                    v-for="item in InformationReleaseManagementEditFromForm.informationType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="类型：">
                <el-input v-model="InformationReleaseManagementEditFromForm.type" placeholder=""></el-input>
            </el-form-item> -->
            <el-form-item v-if="InformationReleaseManagementEditFromForm.type==0" label="链接：" >
                <el-input v-model="InformationReleaseManagementEditFromForm.LeavingMessage" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-else label="内容：" prop="userNume" class="userAdress">
                <!-- <el-input type="textarea" v-model="InformationReleaseManagementEditFromForm.userNume" placeholder=""></el-input> -->
                <InformationReleaseManagementEdit></InformationReleaseManagementEdit>
            </el-form-item>
 
        </el-form>
        </div>

    </div>
</template>
<script>
import InformationReleaseManagementEdit from "./InformationReleaseManagementEdit"
// import InformationReleaseManagementEdit from "./Tinymce"
export default {
    name:"InformationReleaseManagementEditFrom",
    components:{
        InformationReleaseManagementEdit
    },
    data(){
        return{
            InformationReleaseManagementEditFromForm:{
                informationType:[
                    {
                        label:"文章",
                        value:"1",
                    },
                    {
                        label:"链接",
                        value:"0",
                    },
                ],
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
                    {
                        label:"联系人：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"联系方式：",
                        value:"",
                        tips:""
                    },
                ],
               
                desc:"",
                userNume:"",
                descoptions:[
                    {
                        name:"水务咨询-新闻咨询",
                        value:"1"
                    },
                    {
                        name:"通知公告-停水通知",
                        value:"2"
                    },
                    {
                        name:"通知公告-其他通知",
                        value:"3"
                    },
                ],
                title:"",
                describe:"",
                type:"1",
                LeavingMessage:"",
            },
            rules:{
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                type:[
                    { required: true, message: '请输入类型', trigger: 'blur' },
                ],
                LeavingMessage:[
                    { required: true, message: '请输入留言', trigger: 'blur' },
                ],
                userNume:[
                    { required: true, message: '请输入留言', trigger: 'blur' },
                ]
            },
            fileList:[]
                
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){

        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        

    }
}
</script>
<style lang="scss">
.InformationReleaseManagementEditFrom{
    
    height: 100%;
    width: 80%;
    margin: 0 auto;
    legend{
        background: #f5f5f5;
        font-weight: 700;
        font-size: 12px;
        padding: 5px 20px;
        font-size: 14px;
    }
    .backfillSubmitForm{
        // padding: 10px 20px;
        // width: 83%;
        // margin:10px auto;
        // .el-form-item{
        //     width: 100%;
        //     .el-form-item__content{
        //         width: 30%;
        //         .el-select{
        //             width: 100%;
        //         }
        //     }
        // }
        // .right-btn{
        //     text-align: right;
        //     width: 100%;
        // }
        .userAdress{
            width:100%;
            .el-form-item__content{
                width:calc(100% - 160px);
                .el-form-item__label{
                    width: 100px !important;
                }

            }
        }

        .Btngroup{
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
    #editor{
        border:1px solid var(--ck-color-toolbar-border);
        height: 200px;
    }

}
</style>

