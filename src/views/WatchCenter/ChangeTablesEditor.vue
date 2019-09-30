<template>
    <div class="ChangeTablesEditor">
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
    
                <el-form-item label='换表类型：'>
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
                    <!-- <el-input v-model="formData.con" placeholder="计划完工时间"></el-input> -->
                </el-form-item>
                <el-form-item label='换表员：'>
                    <el-select  clearable v-model="formData.watermeterWarehouse1" placeholder="换表员">
                        <el-option  v-for="(item,index) in formData.changeMeterPeople" :key="index" :label="item.name" :value="item.value"></el-option>

                    </el-select>
                </el-form-item>
                
                <!-- <el-form-item>
                    <el-button size="mini" type="primary"  @click="chooseWaterMeter">选择水表</el-button>
                        <i class="el-icon-upload2 el-button el-button--mini" style="background:#47b5e8;color:#fff;" @click="chooseWaterMeter"> 选择水表</i>
                    
                </el-form-item> -->
                
      
            <el-form-item label="换表原因：" class="changeTabTextarea">
                <el-input type="textarea" :rows="2" v-model="formData.reason" placeholder="换表原因"></el-input>
            </el-form-item>
            
            <!-- <el-form-item class="form-right">
            </el-form-item> -->
        </el-form>
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


                <!-- <el-table-column 
                    prop="meter" 
                    min-width="100" 
                    label="换表原因" 
                    show-overflow-tooltip>
                </el-table-column> -->

            </el-table>
                <!-- 分页 -->
                <!-- <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div> -->
        </div>
    </div>
</template>
<script>
import chooseWaterMeter from './chooseWaterMeter'
export default {
    name:"ChangeTablesEditor",
    components:{
        chooseWaterMeter
    },
    data(){
        return{
            formData:{},
            histroyData:{
                
            },
            waterChooseVisible:false,  
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
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color:#297acc;
.ChangeTablesEditor{
    padding:10px 20px;
    .demo-form-inline.formEdit{
        width: 100%;
        margin:auto;
        .el-form-item{
            width: 32%;
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
            width: 50%;
            height: 60px;
            .el-form-item__content{
                width: calc(100% - 120px);
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
