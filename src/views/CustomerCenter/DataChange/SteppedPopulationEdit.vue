

<template>
    <div class="SteppedPopulationEdit">

        <el-form class="SteppedPopulationForm" :inline="true" :model="SteppedPopulationEditForm" label-width="160px">
            <el-form-item label="用户编号：">
                <el-input v-model="SteppedPopulationEditForm.userNume" :disabled="isEdit" placeholder=""></el-input>
                <!-- <el-button style="background:#faa646;color:#fff;" icon="el-icon-search"></el-button> -->
            </el-form-item>
            <el-form-item :label="v.label" v-for="(v,i) in SteppedPopulationEditForm.backfillInput" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="证件类型：">
                <el-select  clearable v-model="SteppedPopulationEditForm.Remarks" placeholder="" disabled>
                    <el-option  v-for="(item,index) in SteppedPopulationEditForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="证件号码：">
                <el-input v-model="SteppedPopulationEditForm.PriceStrategy" placeholder=""></el-input>
            </el-form-item> -->
            <el-form-item label="证件号码：" style="margin-left: -3px" >
                <el-input placeholder="证件号码" v-model="SteppedPopulationEditForm.documentNumber" class="input-with-select" clearable disabled>
                    <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
                </el-input>
            </el-form-item>
            <!-- <el-form-item label="新用水类型：">
                <el-select  clearable v-model="SteppedPopulationEditForm.isfines" placeholder="">
                    <el-option  v-for="(item,index) in SteppedPopulationEditForm.descoptions1" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="用水人数：" style="margin-left: -3px">
                <el-input v-model="SteppedPopulationEditForm.userNum" placeholder=""></el-input>
            </el-form-item>
            <!-- <el-form-item label="住房类型：">
                <el-select  clearable v-model="SteppedPopulationEditForm.UpdateCodeCopye" placeholder="">
                    <el-option  v-for="(item,index) in SteppedPopulationEditForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="备注：" class="long_textarea">
                <el-input type="textarea" :rows="2" v-model="SteppedPopulationEditForm.year" placeholder=""></el-input>
            </el-form-item>
            <el-form-item style="float: right;" class="btnBox">
                <el-button size="mini" type="primary" style="float: right;" icon="el-icon-plus" @click="addTable">添加行</el-button>
            </el-form-item>
            <el-table      
                stripe
                border
                :data="histroyData.list"
                class="change-tables-table">

                <el-table-column 
                    type="index"  label="NO."
                    width="50" 
                    fixed="left"
                    :index="indexMethod">
                     
                </el-table-column>

                <el-table-column
                    prop="connect"
                    
                    
                    label="用户姓名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.connect1"></el-input>
                    </template>
                </el-table-column>
                    
                <el-table-column
                    prop="connect"
                    
                    label="证件类型">
                    <template slot-scope="scope">
                        <el-select  clearable v-model="scope.row.connect" placeholder="">
                            <el-option  v-for="(item,index) in SteppedPopulationEditForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="160"
                    label="证件号码">
                    <template slot-scope="scope">
                        <el-input placeholder="证件号码" v-model="scope.row.connect2" class="input-with-select" clearable>
                            <el-button slot="append" icon="el-icon-reading"  type="primary" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
                        </el-input>
                    </template>

                </el-table-column>

                <el-table-column
                    prop="connect"
                    
                    label="联系电话">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.connect3"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="connect"
                    min-width="180"
                    label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.connect4"></el-input>
                    </template>
                </el-table-column>



                </el-table>


            
        </el-form>

    </div>
</template>
<script>
import SteppedPopulation from '../Transfer/TransferDetails'
export default {
    name:"SteppedPopulationEdit",
    components:{
        SteppedPopulation
    },
    props:{
        isEdit:{
            type:Boolean,
        }
    },
    data(){
        return{
            SteppedPopulationEditForm:{
                // 查询内容
                backfillInput:[

                    // {
                    //     label:"开户日期：",
                    //     value:"",
                    //     tips:""
                    // },

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
                     {
                        label:"手机号码：",
                        value:"",
                        tips:""
                    },
                    // {
                    //     label:"邮箱地址：",
                    //     value:"",
                    //     tips:""
                    // },
                    // {
                    //     label:"原用水类型：",
                    //     value:"",
                    //     tips:""
                    // },
                    // {
                    //     label:" 办理日期：",
                    //     value:"",
                    //     tips:""
                    // },
                    

                    // {
                    //     label:"办理人：",
                    //     value:"",
                    //     tips:"6"
                    // },

                   
                ],

               
                desc:"",
                userNume:"",
                descoptions:[
                    {
                        name:'居民身份证',
                        value:'0'
                    },
                    {
                        name:'护照',
                        value:'1'
                    },
                    {
                        name:'户口本',
                        value:'2'
                    },
                    {
                        name:'回乡证',
                        value:'3'
                    },
                    {
                        name:'台胞证',
                        value:'4'
                    },
                ],
                userNum:"",
                PriceStrategy:"",
                isfines:"",
                UpdateCodeCopye:"",
                Remarks:"",
                year:""
            },
            histroyData:{
                
            },
    
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.histroyData = {
                areaId:"",
                endRow: 5,
                hasNextPage: false,
                hasPreviousPage: false,
                isFirstPage: true,
                isLastPage: true,
                list: [
                    {
                        areaId: null,
                        areaName: "东深小区",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "-",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1栋3单元",
                        protocolName: null,
                        rowNumber: 0,
                        sensorModel: null,
                        sn: null,
                        status: "未上传",
                        totalPage: 0,
                        type: 5,
                        unusual: null,
                        usn: "00",
                        waterGroup: null,
                    },
                     {
                        areaId: null,
                        areaName: "东深小区",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "-",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1栋3单元",
                        protocolName: null,
                        rowNumber: 0,
                        sensorModel: null,
                        sn: null,
                        status: "未上传",
                        totalPage: 0,
                        type: 5,
                        unusual: null,
                        usn: "00",
                        waterGroup: null,
                    },
                     {
                        areaId: null,
                        areaName: "东深小区",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "-",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1栋3单元",
                        protocolName: null,
                        rowNumber: 0,
                        sensorModel: null,
                        sn: null,
                        status: "未上传",
                        totalPage: 0,
                        type: 5,
                        unusual: null,
                        usn: "00",
                        waterGroup: null,
                    },
                     {
                        areaId: null,
                        areaName: "东深小区",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "2019-07-02",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "-",
                        flux: "-",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "-",
                        meter: null,
                        model: null,
                        modifyBy: null,
                        modifyTime: null,
                        offset: 0,
                        page: 1,
                        pageCount: 20,
                        position: "1栋3单元",
                        protocolName: null,
                        rowNumber: 0,
                        sensorModel: null,
                        sn: null,
                        status: "未上传",
                        totalPage: 0,
                        type: 5,
                        unusual: null,
                        usn: "00",
                        waterGroup: null,
                    }
                ],
                navigateFirstPage: 1,
                navigateLastPage: 1,
                navigatePages: 8,
                navigatepageNums: Array(1),
                nextPage: 0,
                pageNum: 1,
                pageSize: 20,
                pages: 1,
                prePage: 0,
                size: 5,
                startRow: 1,
                total: 5,
            }
        },
        addTable(){
            this.histroyData.list.push({});
        },

    }
}
</script>
<style lang="scss">
.SteppedPopulationEdit{
    height: 83%;
    overflow-y: auto;
    .SteppedPopulationForm{
        // margin-top: 15px;
        .el-input__inner{
            height: 30px;
        }
    }
    .SteppedPopulationForm{
        padding: 0 10px;
        width: 98%;
        .el-form-item{
            width: 32%;
            margin-bottom: 10px;
            .el-form-item__content{
                width: 48%;
                .el-select{
                    width: 100%;
                    height: 30px !important;
                    line-height: 30px;
                    .el-input__inner{
                        height: 30px !important;
                        line-height: 30px;
                        .el-input__icon{
                            line-height: 30px;
                        }
                    }
                }
            }
        }
        .long_textarea {
            width: 100%;
            .el-form-item__content{
                width: 81.5%;
                .el-select{
                    width: 100%;
                    height: 30px !important;
                    line-height: 30px;
                    .el-input__inner{
                        height: 30px !important;
                        line-height: 30px;
                        .el-input__icon{
                            line-height: 30px;
                        }
                    }
                }
            }
        }
        .btnBox{
            .el-form-item__content{
                width: 100%;
                float: right;
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

}
</style>

