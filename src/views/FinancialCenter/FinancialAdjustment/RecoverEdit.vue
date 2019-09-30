

<template>
<!-- RedFlushingEdit -->
    <div class="RecoverEdit">

        <el-form class="RecoverForm" size="mini" :inline="true" :model="RecoverEditForm" label-width="100px" ref="ruleForm" :rules="rules">
            <legend>用户信息</legend>
            <el-form-item label="用户编号：">
                <el-input v-model="RecoverEditForm.userNo" :disabled="true" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="用户名称：">
                <el-input v-model="RecoverEditForm.userName" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="用户地址：">
                <el-input v-model="RecoverEditForm.userAddr" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="营业网点：">
                <!-- <el-input v-model="RecoverEditForm.useWaterType" :disabled="true" placeholder=""></el-input> -->
                <el-select  clearable v-model="RecoverEditForm.useWaterType" placeholder="">
                    <el-option  v-for="(item,index) in RecoverEditForm.useWaterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="联系人：">
                <el-input v-model="RecoverEditForm.linkMan" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="联系电话：">
                <el-input v-model="RecoverEditForm.linkTel" placeholder=""></el-input>

            </el-form-item>
            <legend>开票信息</legend>
                <!-- <el-form-item label="发票类型：" prop="desc" class="selectCheck"> -->
                <el-form-item label="发票类型：" prop="invoiceType">
                    <el-input v-model="RecoverEditForm.invoiceType" placeholder=""></el-input>

                    <!-- <el-checkbox-group v-model="RecoverEditForm.descoptions">
                        
                                <el-checkbox label="大客户"></el-checkbox>
                                <el-checkbox label="盖章"></el-checkbox>
                                <el-checkbox label="手工托"></el-checkbox>
                                <el-checkbox label="发票放营业厅"></el-checkbox>
                            </el-checkbox-group> -->
                </el-form-item>
                <el-form-item :label="v.label" v-for="(v,i) in RecoverEditForm.InvoiceInformation" :key="i">
                    <el-input v-model="v.value" :placeholder="v.tips"></el-input>
                </el-form-item>
                <el-form-item label="开户行：">
                    <el-input v-model="RecoverEditForm.year" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="银行账号：">
                    <el-input v-model="RecoverEditForm.bankCountNum" placeholder=""></el-input>
                </el-form-item>
            <legend>追缴信息</legend>
            <el-form-item label="追缴账期：" prop="cDate">
                
                  <el-date-picker
                    v-model="RecoverEditForm.cDate"
                    type="month"
                    placeholder="选择日期">
                    </el-date-picker>
            </el-form-item>
             <el-form-item label="追缴日期：">
                  <el-date-picker
                    v-model="RecoverEditForm.cTime"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="追缴水量：" >
                <el-input v-model="RecoverEditForm.currendPeriodNum" placeholder=""></el-input>

            </el-form-item>
            <el-form-item label="用水类型：" >
                <!-- <el-input v-model="RecoverEditForm.priorPeriodNum" :disabled="true" placeholder=""></el-input> -->
                <el-select  clearable v-model="RecoverEditForm.priorPeriodNum" placeholder="">
                    <el-option  v-for="(item,index) in RecoverEditForm.priorPeriodNumOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="费用类型："  class="Remarks">
                <el-checkbox-group v-model="payServiceModel">
                    <!-- <el-radio  :label="v.label" v-for="(v,i) in payServiceModel" :key="i">{{v.value}}</el-radio> -->
                    <el-checkbox :disabled="payServiceModelLive" :label="v.label" v-for="(v,i) in payServiceType" :key="i">{{v.value}}</el-checkbox>
                </el-checkbox-group>
                <!-- <el-select  clearable v-model="RecoverEditForm.costType" placeholder="" @change="isPay">
                    <el-option  v-for="(item,index) in RecoverEditForm.IsFine" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select> -->

            </el-form-item>
            <el-form-item label="总金额：">
                <el-input v-model="RecoverEditForm.amountMoney" disabled placeholder=""></el-input>

            </el-form-item>


 
            <el-form-item  class="Remarks"  label="备注：">
                <el-input type="textarea" v-model="RecoverEditForm.Remarks" placeholder=""></el-input>

            </el-form-item>
            <!-- <el-table      
                stripe
                border
                :data="histroyData.list"
                class="change-tables-table">

                
                <el-table-column
                 
                    label="换表止码">
                    <el-table-column 
                        type="index"  label="NO."
                        width="80" 
                        :index="indexMethod">
                        
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
       
                    <el-table-column 
                        label="费用项目"
                        min-width="100" 
                        prop="areaName"
                        >
          
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="新表底码">
                    <el-table-column 
                        label="阶梯1水量"
                        min-width="80" 
                        prop="daytime"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.concentrator" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="阶梯2水量"
                        min-width="80" 
                        prop="areaName"
                       >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.connect" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="上期码">
                    <el-table-column 
                        label="阶梯3水量"
                        min-width="80" 
                        prop="lvalue"
                        >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.endTime" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="水量"
                        min-width="80" 
                        prop="areaName"
                       >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.factoryName" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="本期码">
                    <el-table-column 
                        label="阶梯1水价"
                        min-width="80" 
                        prop="lvalue"
                        >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.fcode" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="阶梯2水价"
                        min-width="80" 
                        prop="areaName"
                       >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.fixValue" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="水量">
                    <el-table-column 
                        label="阶梯3水价"
                        min-width="80" 
                        prop="lvalue"
                        >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.flux" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="金额"
                        min-width="80" 
                        prop="isxz"
                       >
                        
                    </el-table-column>
                </el-table-column>
                </el-table> -->


            
        </el-form>

    </div>
</template>
<script>
export default {
    name:"RecoverEdit",
    data(){
        return{
            payServiceType:[
                {
                    label:1,
                    value:"水费"
                },
                {
                    label:2,
                    value:"污水处理费"
                },
                {
                    label:3,
                    value:"垃圾处理费"
                },
            ],
            payServiceModelLive:false,
            payServiceModel:[1,2,3],
            RecoverEditForm:{
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
                // 查询内容
                cDate:'',
                cTime:'',
                desc:"",
                userNo:"自动生成",
                userName:"",
                userAddr:"",
                linkMan:"",
                linkTel:"",
                meterReadingMonth:"",
                useWaterType:"",
                priorPeriodMrDate:"",
                updateReadingNumFlag:"",
                priorPeriodNum:"",
                currendPeriodNum:"",
                costType:"",
                currendPeriodWater:"",
                amountMoney:"",
                descoptions:[
                    {
                        name:"0040__生活用水2.85",
                        value:"1"
                    },
                    {
                        name:"0041__免费用水",
                        value:"2"
                    },
                ],
                priorPeriodNumOptions:[
                    {
                        name:"居民用水",
                        value:"1"
                    }
                ],
                IsFine:[
                    
                ],
                UpdateCodeCopying:[
                    {
                        name:"是",
                        value:"1"
                    },
                    {
                        name:"否",
                        value:"2"
                    },
                ],
                PriceStrategy:"",
                isfines:"2",
                UpdateCodeCopye:"2",
                Remarks:"",
                invoiceType:"",
                year:"",
                bankCountNum:"",
            },
            rules:{
                userNo:[
                    { required: true, trigger: 'blur',message:"请输入用户编号" },
                ],
                cDate:[
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ]
            },
            histroyData:{
                
            },
            label:0,
            userNumEdit:false,
    
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
                        label:0,
                        areaId: null,
                        areaName: "水费",
                        code: "C7551990000003",
                        concentrator: "10",
                        connect: 0,
                        daytime: "2019-07-02",
                        endTime: 0,
                        factoryName: "10",
                        fcode: 1.60,
                        fix: false,
                        fixValue: "2.40",
                        flux: "4.80",
                        getMeter: 1,
                        id: null,
                        isxz: "16.00",
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
                        label:0,
                        areaId: null,
                        areaName: "污水处理费",
                        code: "C7551990000003",
                        concentrator: "10",
                        connect: 0,
                        daytime: "2019-07-02",
                        endTime: 0,
                        factoryName: "10",
                        fcode: 1.60,
                        fix: false,
                        fixValue: "2.40",
                        flux: "4.80",
                        getMeter: 1,
                        id: null,
                        isxz: "16.00",
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
                        label:0,
                        areaId: null,
                        areaName: "水资源费",
                        code: "C7551990000003",
                        concentrator: "10",
                        connect: 0,
                        daytime: "2019-07-02",
                        endTime: 0,
                        factoryName: "10",
                        fcode: 1.60,
                        fix: false,
                        fixValue: "2.40",
                        flux: "4.80",
                        getMeter: 1,
                        id: null,
                        isxz: "16.00",
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
        isPay(val){
            if(val==='1'){
                this.userNumEdit = true;
            }else{
                this.userNumEdit = false;
            }
        }

    }
}
</script>
<style lang="scss">
$theme-font-color:#3680CD;
.RecoverEdit{
    legend {
        background: #f5f5f5;
        font-weight: 700;
        font-size: 12px;
        padding: 5px 20px;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .RecoverForm{
        margin-top: 15px;
    }
    .RecoverForm{
        padding: 10px;
        width: calc(100% - 20px);
       
        margin-bottom: 15px;
        .el-form-item{
            width: 24%;
            margin-bottom: 20px;
            margin-right: 0px;
            .el-form-item__content{
                width: calc(100% - 100px);
                .el-select,.el-input__inner{
                    width: 100% !important;
                }
                .el-input__inner{
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        .Remarks{
            width: 48%;
            .el-form-item__content{
                width:calc(100% - 100px);
            }
        }
        .el-table{
            margin-top: 15px;
        }

    }
    // .el-steps--horizontal{
    //     margin: 0 auto;
    //     width: 50%;
    //     padding-bottom: 20px;
    // }
    .theme-color .cell{
        color:$theme-font-color;
    }

}
</style>

