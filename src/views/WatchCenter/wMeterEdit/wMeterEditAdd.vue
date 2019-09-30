<template>
    <div class="wMeterEditAdd">
        <!-- 弹出表单选择水表 -->
    	<!-- <el-dialog :title="WaterEditorName" :visible.sync="waterChooseVisible" :close-on-click-modal="false" class="addDialog" @close="closeDialog" append-to-body>
            <chooseWaterMeter
                ref="childWaterEditor" 
                
            ></chooseWaterMeter>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog">取 消</el-button>
		    </div>
    	</el-dialog> -->
        <el-form :inline="true" :model="formData" class="demo-form-inline formEdit" label-width="120px">
    
                <!-- <el-form-item label='换表类型：'>
                    <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="换表类型">
                        <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="计划完成日期：">
                    <el-date-picker
                    v-model="formData.con"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
            
                </el-form-item>
                <el-form-item label='换表员：'>
                    <el-select  clearable v-model="formData.watermeterWarehouse1" placeholder="换表员">
                        <el-option  v-for="(item,index) in formData.changeMeterPeople" :key="index" :label="item.name" :value="item.value"></el-option>

                    </el-select>
                </el-form-item> -->
                
                <!-- <el-form-item>
                    <el-button size="mini" type="primary"  @click="chooseWaterMeter">选择水表</el-button>
                        <i class="el-icon-upload2 el-button el-button--mini" style="background:#47b5e8;color:#fff;" @click="chooseWaterMeter"> 选择水表</i>
                    
                </el-form-item> -->
                
      
            <el-form-item label="修改原因：" class="remark">
                <el-input type="textarea" :rows="2" v-model="formData.reason" :disabled="!tableEdit" placeholder="修改原因"></el-input>
            </el-form-item>
            
            <!-- <el-form-item class="form-right">
            </el-form-item> -->
        </el-form>
        <div class="kl-table">
             <!-- <el-table       
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
                        prop="daytime"
                        min-width="100"
                        label="册本">
                    </el-table-column>

                    <el-table-column
                        prop="areaName"
                        min-width="80"
                        label="用户编号">

                    </el-table-column>

                    <el-table-column
                        prop="fixValue"
                        min-width="80"
                        label="水表编号">
                    </el-table-column>

                    <el-table-column
                        prop="meterForm"
                        min-width="80"
                        label="水表形态">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.meterForm" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        prop="meterBore"
                        min-width="80"
                        label="水表口径"
                        >
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.meterBore" size="mini"></el-input>
                        </template>
                    </el-table-column>
        
                    <el-table-column 
                        prop="meterFactory" 
                        min-width="100" 
                        label="水表厂家" 
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.meterFactory" size="mini"></el-input>
                        </template>
                    </el-table-column>


                    <el-table-column 
                        prop="meterType" 
                        min-width="100" 
                        label="水表类型" 
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.meterType" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    
                    <el-table-column 
                        prop="meterModel" 
                        min-width="100" 
                        label="水表型号" 
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.meterModel" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    
                    <el-table-column 
                        prop="departBelong" 
                        min-width="100" 
                        label="所属部门" 
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.departBelong" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    
                    <el-table-column 
                        prop="factoryNo" 
                        min-width="100" 
                        label="出厂编号" 
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.factoryNo" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    
                    <el-table-column 
                        prop="meterCert" 
                        min-width="100" 
                        label="合格证号" 
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.meterCert" size="mini"></el-input>
                        </template>
                    </el-table-column>  
                                            
                    <el-table-column
                        prop="meter"
                        min-width="120"
                        label="表读数"
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.meter" size="mini"></el-input>
                        </template>
                    </el-table-column>


                    <el-table-column 
                        prop="concentrator" 
                        min-width="100" 
                        label="累计流量" 
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.concentrator" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        prop="connect"
                        min-width="120"
                        label="使用期限">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.connect" size="mini"></el-input>
                        </template>
                    </el-table-column>
                                            
                    <el-table-column
                        prop="endTime"
                        min-width="120"
                        label="已用周期"
                        show-overflow-tooltip>
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.endTime" size="mini"></el-input>
                        </template>
                    </el-table-column>


                    <el-table-column label="操作" fixed="right" width="80">
                        <template slot-scope="scope">
                          
                            <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

            </el-table> -->
            <el-table        
                    stripe
                    border
                    :data="histroyData.list"
                    class="water-meter-inquiry-table">

                    <el-table-column 
                        type="index"  label="NO."
                        width="50" 
                        fixed="left"
                        :index="indexMethod">
                    </el-table-column>

                    <el-table-column
                        prop="code"
                        
                        min-width="150"
                        label="水表编号">
                    </el-table-column>

                    <el-table-column
                        prop="fcode"
                        min-width="100"
                        label="出厂编号">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.fcode" size="mini"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="wCaliber"
                        min-width="100"
                        label="水表口径">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-select  clearable v-model="scope.row.wCalibe" placeholder="水表口径">
                                <el-option  v-for="(item,index) in formDatas.waterMeterCaliberOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                            <!-- <el-input v-model="scope.row.wCaliber" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="wfactory"
                        min-width="100"
                        label="水表厂家">
                        <template slot-scope="scope" v-if="tableEdit">
                             <el-select  clearable v-model="scope.row.wfactory" placeholder="水表厂家">
                                <el-option  v-for="(item,index) in formDatas.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                            <!-- <el-input v-model="scope.row.wfactory" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="wmorphology"
                        min-width="120"
                        label="水表形态">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-select  clearable v-model="scope.row.wmorphology" placeholder="水表形态">
                                <el-option v-for="(item,index) in formDatas.wmorphologyOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                            <!-- <el-input v-model="scope.row.wmorphology" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="wtype"
                        min-width="120"
                        label="水表类型">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-select  clearable v-model="scope.row.wtype" placeholder="水表类型">
                                <el-option v-for="(item,index) in formDatas.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                            <!-- <el-input v-model="scope.row.wtype" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="wmodoel"
                        min-width="120"
                        label="水表型号">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-select  clearable v-model="scope.row.wmodoel" placeholder="水表型号">
                                <el-option  v-for="(item,index) in formDatas.waterMeterModelOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                            <!-- <el-input v-model="scope.row.wmodoel" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="qualification"
                        min-width="100"
                        label="合格证号">
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-input v-model="scope.row.qualification" size="mini"></el-input>
                        </template>

                    </el-table-column>
                                            
                    <el-table-column
                        prop="wState"
                        min-width="120"
                        label="水表状态"
                        >
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-select  clearable v-model="scope.row.wState" placeholder="水表状态">
                                    <el-option  v-for="(item,index) in formDatas.waterMeterStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                                </el-select>
                            <!-- <el-input v-model="scope.row.wState" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column 
                        prop="storage" 
                        min-width="150" 
                        label="入库日期" 
                        >
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-date-picker
                            v-model="scope.row.storage"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                            <!-- <el-input v-model="scope.row.storage" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column 
                        prop="demp" 
                        min-width="100" 
                        label="所属部门" 
                        >
                        <template slot-scope="scope" v-if="tableEdit">
                            <el-select  clearable v-model="scope.row.demp" placeholder="所属部门">
                                <el-option  v-for="(item,index) in formDatas.subordinateDepartmentsOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                            </el-select>
                            <!-- <el-input v-model="scope.row.demp" size="mini"></el-input> -->
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="80" v-if="tableEdit">
                        <template slot-scope="scope">
                          
                            <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
        </div>
    </div>
</template>
<script>

export default {
    name:"wMeterEditAdd",
    props:["tableEdit"],
    data(){
        return{
            formData:{},
            histroyData:{
                
            },
            waterChooseVisible:false,  
            WaterEditorName:'水表选择',
            ruleFormData:{},
            formDatas:{
                con:"",
                watermeterWarehouse:"",
                waterMeterModel:'',
                waterMeterModelOptions:[
                    {
                        name:"LXSWN",
                        value:"0"
                    },
                    {
                        name:"LXSGY-15G",
                        value:"1"
                    },
                    {
                        name:"LXSGY",
                        value:"2"
                    },
                    {
                        name:"LXSFW",
                        value:"3"
                    },
                    {
                        name:"DG-FW001",
                        value:"4"
                    },
                    ],
                watermeterWarehouseOptions:[
                    // {
                    //     name:"全部",
                    //     value:"1"
                    // },
                    {
                        name:"停用",
                        value:"2"
                    },
                    {
                        name:"启用",
                        value:"3"
                    },
                ],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[
                     {
                        name:"宁波",
                        value:"1"
                    },
                    {
                        name:"上海",
                        value:"2"
                    },
                    {
                        name:"梅花",
                        value:"3"
                    },
                    {
                        name:"常德",
                        value:"4"
                    },
                    {
                        name:"开封",
                        value:"5"
                    },
                ],
                waterMeterType:"",
                waterMeterTypeOptions:[
                    {
                        name:"人工表",
                        value:"1"
                    },
                    {
                        name:"远程表",
                        value:"2"
                    },
                ],
                waterMeterCaliber:"",
                waterMeterCaliberOptions:[
                    {
                        name:"15",
                        value:"2"
                    },
                    {
                        name:"20",
                        value:"1"
                    },
                    {
                        name:"25",
                        value:"3"
                    },
                    {
                        name:"40",
                        value:"4"
                    },
                    {
                        name:"200",
                        value:"5"
                    },
                ],
                waterMeterStatus:"",
                waterMeterStatusOptions:[
                    {
                        name:"在库",
                        value:"1"
                    },
                    {
                        name:"在用",
                        value:"2"
                    },
                    {
                        name:"在途",
                        value:"3"
                    },
                    {
                        name:"报废",
                        value:"4"
                    },

                ],
                subordinateDepartments:"",
                subordinateDepartmentsOptions:[
                    //  {
                    //     name:"全部",
                    //     value:"1"
                    // },
                    {
                        name:"营业部",
                        value:"2"
                    },
                    {
                        name:"法务部",
                        value:"3"
                    },
                ],
                wmorphologyOptions:[
                    {
                        name:"新表",
                        value:"1"
                    },
                    {
                        name:"轮检表",
                        value:"2"
                    },
                ]

            },
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.formData= {
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                    {
                        name:"临时换表",
                        value:"1"
                    },
                    {
                        name:"正常换表",
                        value:"2"
                    },
                    {
                        name:"异常换表",
                        value:"3"
                    },
                    

                ],
                changeMeterPeople:[
                    {
                        name:"詹 杰",
                        value:"1"
                    },
                    {
                        name:"刘帅军",
                        value:"2"
                    },
                    {
                        name:"吴希",
                        value:"3"
                    },
                    {
                        name:"杜忠杰",
                        value:"4"
                    },
                    {
                        name:"于鹏飞",
                        value:"5"
                    },
                    

                ],
                con:"",
                reason:""
            };
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
                        areaName: "01091012",
                        code: "C7551990000003",
                        concentrator: "",
                        connect: null,
                        daytime: "301-1003",
                        endTime: null,
                        factoryName: "东井",
                        fcode: null,
                        fix: false,
                        fixValue: "02892019",
                        flux: "新表",
                        getMeter: 1,
                        id: null,
                        isxz: "未抄",
                        lvalue: "龙天县9号",
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
        chooseWaterMeter(){
            this.waterChooseVisible = true;
        },
        closeDialog(){ //关闭会话
            this.waterChoooseVisible = false;
            this.waterChooseVisible = false;
			this.init()
        },
        //弹出框
        submit(formName){	//提交
            this.$refs.childWaterEditor.submit()
            // this.waterChoooseVisible = false;
        },
        indexMethod(index) {//获取表格序号
        //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
        return  (this.histroyData.pageSize-20)*this.histroyData.pages + (index+1) ;
        
        },
         //分页
        handleSizeChange(val) { //显示多少数据一页
            // this.tableQuery.pageCount = val
            // this.tableQuery.page = 1
            this.init()
        },
        handleCurrentChange(val) {  //显示多少页码
            // this.tableQuery.page = val
            this.init()
        },
    }
}
</script>
<style lang="scss">

$imgWidth: 200px;
$theme-color:#297acc;
.wMeterEditAdd{
    padding:10px 20px;
    .demo-form-inline.formEdit{
        width: 60%;
        // margin:auto;
        .el-form-item{
            width: 100%;
            margin-right: 0px;
            height: 30px;
            line-height: 30px; 
            .el-form-item__label{
                height: 30px;
                line-height: 30px;          
            }
            .el-form-item__content{
                width: calc(100% - 120px);
                height: 30px;
                line-height: 30px;
                .el-input--suffix,.el-input__inner,.el-select{
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
                .el-input__icon{
                    line-height: 30px;
                } 
            }
            
        }
        .remark{
            height: 60px;
        }
        .el-date-editor /deep/ .el-input__inner {
            width: 100% !important;
            height: 100%;
        }
        .changeTabTextarea{
            width: 59%;
            height: 60px;
            .el-form-item__content{
                width: calc(100% - 100px);
                .el-textarea{
                    width: 100%;

                }
            }
        }
        // .form-right .el-button{
        //     background: $theme-color;
        // } 
        
    }
    .kl-table{
        padding:0px;
        width: 100%;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 10px;
    }
    .el-form--inline .el-form-item{
        margin-right: 0px;
    }
    
}

.el-dialog{
    margin: 0 auto;
    width: 80%;
    height: 90%;
    margin-top: 38px !important;
}
.addDialog{
    .el-dialog__body{
         padding:10px 20px; 
        height: calc(100% - 156px);

    }
}
</style>
