<template>
    <div class="WarehousingAdd">
        <!-- 弹出表单选择水表 -->
    	<el-dialog :title="WaterEditorName" :visible.sync="waterChooseVisible" :close-on-click-modal="false" class="addDialog" @close="closeDialog" append-to-body>
            <chooseWaterMeter
                ref="childWaterEditor" 
                
            ></chooseWaterMeter>
    		<!-- <waterMeterEditor 
                            ref="childWaterEditor" 
                            @waterMeterEditorClick='closeDialog' 
                            :ruleFormData="ruleFormData" 
                            :group="tableQuery.group" 
                            :areaId="tableQuery.areaId" 
                            :isShow="isShowWaterName">
            </waterMeterEditor> -->
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closeDialog">取 消</el-button>
		    </div>
    	</el-dialog>
         <div class="toolbar">
             <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
             
                <el-form-item class="form-left">
                    <el-form-item label='入库日期：'>
                        <el-date-picker
                        v-model="DateChoosevalue"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="入库单号：">
                        <el-input v-model="formData.con" placeholder="入库单号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门：">
                        <el-input v-model="formData.watermeterWarehouse" placeholder="所属部门"></el-input>
                    </el-form-item>

                </el-form-item>
                <el-form-item class="form-right">
                        
                    <el-button  @click="add" size="mini" icon="el-icon-plus" type="primary">添加</el-button>
                    <!-- <el-button size="mini" type="primary" @click="backfill">回填</el-button> -->
                    <el-button size="mini" type="primary">删除</el-button>
                </el-form-item>

            </el-form>
            
        </div>
        <div class="kl-table">
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
                    prop="lvalue"
                    min-width="80"
                    label="装表地址">
                </el-table-column>

                <el-table-column
                    prop="fixValue"
                    min-width="80"
                    label="水表编号">
                </el-table-column>

                <el-table-column
                    prop="flux"
                    min-width="80"
                    label="水表形态">
                </el-table-column>

                <el-table-column
                    prop="meter"
                    min-width="80"
                    label="水表口径"
                    >
                </el-table-column>

                <el-table-column
                    prop="meter"
                    min-width="120"
                    label="装表日期">
                </el-table-column>
                                        
                <el-table-column
                    prop="meter"
                    min-width="120"
                    label="表读数"
                    show-overflow-tooltip>
                </el-table-column>


                <el-table-column 
                    prop="meter" 
                    min-width="100" 
                    label="累计流量" 
                    show-overflow-tooltip>
                </el-table-column>
                
                <el-table-column
                    prop="meter"
                    min-width="120"
                    label="使用期限">
                </el-table-column>
                                        
                <el-table-column
                    prop="meter"
                    min-width="120"
                    label="已用周期"
                    show-overflow-tooltip>
                </el-table-column>


                <el-table-column 
                    prop="meter" 
                    min-width="100" 
                    label="换表原因" 
                    show-overflow-tooltip>
                </el-table-column>

                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div>
            </div>
    </div>
</template>
<script>
import chooseWaterMeter from './chooseWaterMeter'
export default {
    name:"WarehousingAdd",
    components:{
        chooseWaterMeter
    },
    data(){
        return{
            formData:{},
            histroyData:{
                
            },
            waterChooseVisible:false,  //添加弹窗的显示和隐藏
            WaterEditorName:'水表选择',
            ruleFormData:{},
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
                        name:"校表",
                        value:"1"
                    },
                    {
                        name:"异常",
                        value:"1"
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
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color:#297acc;
.WarehousingAdd{
    .demo-form-inline{
        &:after{
            @include _clearBoth()
        }
        & > .form-left{
            float:left;
            .changeTabTextarea{
                width: 300px;
            }
        }
        & > .form-right{
            float:right;
        }   
    }
    .kl-table{
        padding:0px;
    }
    
}

.el-dialog{
    margin: 0 auto;
    width: 80%;
    height: 94%;
    margin-top: 38px !important;
}
.addDialog{
    .el-dialog__body{
         padding:10px 20px; 
        height: calc(100% - 156px);

    }
}
</style>
