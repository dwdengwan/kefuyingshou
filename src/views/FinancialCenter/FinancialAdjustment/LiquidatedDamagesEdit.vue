

<template>
    <div class="LiquidatedDamagesEdit">

        <el-form class="LiquidatedDamagesForm" size="mini" :inline="true" :model="LiquidatedDamagesEditForm" :rules="rules" label-width="100px">
            <el-form-item label="用户编号：" prop="userNum">
                <el-input v-model="LiquidatedDamagesEditForm.userNum" placeholder=""></el-input>

            </el-form-item>
            <!-- <el-form-item label="账期：" prop="PriceStrategy">
                <el-input v-model="LiquidatedDamagesEditForm.PriceStrategy" placeholder=""></el-input>

            </el-form-item> -->
            
            <el-form-item :label="v.label" v-for="(v,i) in LiquidatedDamagesEditForm.backfillInputDisable" :key="i">
                <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="价格策略：">
                <el-select  clearable v-model="LiquidatedDamagesEditForm.isfines" placeholder="" disabled>
                    <el-option  v-for="(item,index) in LiquidatedDamagesEditForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item :label="v.label" v-for="(v,i) in LiquidatedDamagesEditForm.backfillInput" :key="i">
                <el-date-picker
                    v-model="v.value"
                    type="date"
                    :placeholder="v.tips">
                </el-date-picker>
                <!-- <el-input v-model="v.value" :placeholder="v.tips"></el-input> -->
            </el-form-item>

            <el-form-item class="Remarks" label="减免原因：">
                <el-input type="textarea" v-model="LiquidatedDamagesEditForm.UpdateCodeCopye" placeholder=""></el-input>

            </el-form-item>
            <!-- <el-form-item class="totalRedu" label="全减">
                <el-checkbox v-model="LiquidatedDamagesEditForm.totalRedu"></el-checkbox>
            </el-form-item> -->
            <el-table      
                stripe
                border
                :data="histroyData.list"
                class="change-tables-table">

                <el-table-column 
                    type="selection"
                    fixed="left"
                    width="50" 
                   >
                </el-table-column>

                <el-table-column 
                    type="index"  label="NO."
                    fixed="left"
                    width="50" 
                   >
                </el-table-column>
                                
                <el-table-column
                    prop="daytime"
                    
                    min-width="100"
                    label="账期">
                </el-table-column>

                <el-table-column
                    prop="areaName"
                    
                    min-width="100"
                    label="费用项目">
                </el-table-column>
                                                
                <el-table-column
                    prop="daytime"
                    
                    min-width="100"
                    label="抄表日期">
                </el-table-column>


                <el-table-column
                    prop="factoryName"
                    min-width="100"
                    label="水量">
                </el-table-column>

                <el-table-column
                    prop="factoryName"
                    min-width="80"
                    label="金额">

                </el-table-column>

                <el-table-column
                    prop="lvalue"
                    min-width="100"
                    label="应收违约金">
                </el-table-column>
                                                
                <el-table-column
                    prop="daytime"
                    min-width="100"
                    label="计算截止日期">
                    <template slot-scope="scope">
                        <el-date-picker
                        v-model="scope.row.meter"
                        type="date"
                        placeholder="">
                        </el-date-picker>
                    </template>
                </el-table-column>
                                
                <el-table-column
                    prop="fixValue"
                    min-width="100"
                    label="减免金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.meter" placeholder=""></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="100"
                    label="实收违约金">
                </el-table-column>


                <!-- <el-table-column label="操作" fixed="right" width="85">
                    <template slot-scope="scope">
                    <el-button type="text">半减</el-button>
                    <span style='color:#f0f0f0;'>|</span>
                    <el-button type="text" class="noclick">全减</el-button>
                    </template>
                </el-table-column> -->

                </el-table>


            
        </el-form>

    </div>
</template>
<script>
export default {
    name:"LiquidatedDamagesEdit",
    data(){
        return{
            LiquidatedDamagesEditForm:{
                // 查询内容
                backfillInput:[
                    
                    {
                        label:"有效日期：",
                        value:"",
                        tips:""
                    },
                    
                    
                   
                ],
                backfillInputDisable:[
                    {
                        label:"用户名称：",
                        value:"",
                        tips:"165497974"
                    },
                    {
                        label:"用户地址：",
                        value:"",
                        tips:""
                    },
                    {
                        label:"用水类型：",
                        value:"",
                        tips:""
                    },
                ],
               
                desc:"",
                userNume:"",
                descoptions:[
                    {
                        name:"0040__生活用水2.85",
                        value:""
                    },
                    {
                        name:"0041__免费用水",
                        value:""
                    },
                ],
                userNum:"",
                PriceStrategy:"",
                isfines:"",
                UpdateCodeCopye:"",
                Remarks:"",
                totalRedu:"",
            },
            histroyData:{
                
            },
            rules:{
                userNum:[
                    { required: true, message: '请输入用户编号', trigger: 'blur' },
                ],
                PriceStrategy:[
                    { required: true, message: '请输入账期', trigger: 'blur' },
                ]
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
                        areaName: "水费",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "201907",
                        endTime: null,
                        factoryName: "10",
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
                        areaName: "污水管理费",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "201907",
                        endTime: null,
                        factoryName: "10",
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
                        areaName: "水资源费",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "201907",
                        endTime: null,
                        factoryName: "10",
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
    }
}
</script>
<style lang="scss">
.LiquidatedDamagesEdit{

    .LiquidatedDamagesForm{
        margin-top: 15px;
    }
    .LiquidatedDamagesForm{
        padding: 10px 20px;
        width: calc(100% - 40px);
        .el-form-item{
            width: 24%;
            margin-right: 0px;
            .el-form-item__content{
                width:calc(100% - 100px);
                .el-select,.el-input__inner{
                    width: 100% !important;
                }
            }
        }
        .Remarks{
            width: 48%;
            .el-form-item__content{
                width:calc(100% - 100px);
            }
        }
        .totalRedu{
            height: 60px;
            margin-left: 20px;
            font-size: 16px;
            .el-form-item__label{
                font-size: 16px;
                padding-right: 15px;
            }
            .el-form-item__label,.el-form-item__content{
                height: 60px;
                line-height: 60px;
            }
        }

    }
    .el-steps--horizontal{
        margin: 0 auto;
        width: 50%;
        padding-bottom: 20px;
    }
    .el-table{
        .el-input__inner{
            height: 30px;
            line-height: 30px;
            font-size: 12px;
        }
    }

}
</style>

