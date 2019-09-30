
<template>
    <div class="WaterPriceEdit">

        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" label-width="120px">
                    <el-form-item label='用水类型：'>
                        <el-select  clearable v-model="formData.watermeterWarehouse" placeholder="">
                            <el-option  v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                    </el-form-item>
                                  <el-form-item label="违约金策略：">
                        <el-select  clearable v-model="formData.waterMeterManufacturer" placeholder="">
                            <el-option  v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label='生效日期：'>
                        <el-date-picker
                        v-model="formData.waterMeterCaliber"
                        type="date"
                        placeholder="生效日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label='截至日期：'>
                        <el-date-picker
                        v-model="formData.waterMeterStatus"
                        type="date"
                        placeholder="截至日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="状态:" >
                        <el-select v-model="formData.state" placeholder="请选择状态">
                            <el-option label="启用" value="1"></el-option>
                            <el-option label="停用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
            </el-form>
        </div>
        
        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                <el-form-item class="form-right">
                    <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加行</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <el-table 
        :data="gridData" 
        border>
            <el-table-column 
            type="index"  label="NO."
            min-width="50">   
            </el-table-column>
            <el-table-column label="明细名称" min-width="150">
                <template slot-scope="scope">
                    
                        <el-select  clearable v-model="scope.row.Operator" placeholder="">
                            <el-option  v-for="(item,index) in formData.OperatorOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                </template>
            </el-table-column>
            <!-- <el-table-column label="费用名称" min-width="150">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.FieldName"></el-input>
                </template>
            </el-table-column> -->
            <el-table-column label="费用名称" min-width="150">
                <template slot-scope="scope">
                    
                        <el-select  clearable v-model="scope.row.FieldName" placeholder="">
                            <el-option  v-for="(item,index) in formData.OperatorOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select>
                </template>
            </el-table-column>
            
            <el-table-column label="阶梯类型" min-width="150">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.LogicalValue"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>
<script>
export default {
    name:"WaterPriceEdit",
    data(){
        return{
             formData:{
                state:'1',
                con:"",
                watermeterWarehouse:"",
                watermeterWarehouseOptions:[
                     {
                        name:"居民用水",
                        value:"1"
                    },
                    {
                        name:"非居民用水",
                        value:"2"
                    },
        
                ],
                waterMeterManufacturer:"",
                waterMeterManufacturerOptions:[
                    {
                        name:"抄表后15天",
                        value:"1"
                    },
                    {
                        name:"抄表后2个月",
                        value:"2"
                    },
                ],
                OperatorOptions:[
                    {
                        name:"污水费",
                        value:"1"
                    },
                    {
                        name:"垃圾费",
                        value:"2"
                    },],
                waterMeterType:"",
                waterMeterTypeOptions:[],
                waterMeterCaliber:"2019-07-01",
                waterMeterCaliberOptions:[],
                waterMeterStatus:"2020-07-01",
                waterMeterStatusOptions:[],
                subordinateDepartments:"",
                subordinateDepartmentsOptions:[]

            },
            gridData:[
                {
                    FieldName:"水费_ZBSF",
                    FieldNameoptions:[
                        {
                            label:"用户编号",
                            value:"1"
                        }
                    ],
                    Operator:"",
                    OperatorOptions:[
                         {
                            label:"包含",
                            value:"1"
                        },
                        {
                            label:"等于",
                            value:"2"
                        },
                        {
                            label:"不等于",
                            value:"3"
                        },
                        {
                            label:"下于",
                            value:"4"
                        },
                        {
                            label:"大于",
                            value:"5"
                        },
                        {
                            label:"大于等于",
                            value:"6"
                        },
                    ],
                    LogicalValue:"",
                    LogicalValueoptions:[
                        {
                            label:"与",
                            value:"1"
                        },
                        {
                            label:"或",
                            value:"2"
                        },
                        // {
                        //     label:"非",
                        //     value:"3"
                        // },
                    ],
                    QueryValue:"",
                },
            ]
        }
    },
    methods:{
        add(){
            this.gridData.push({
                    FieldName:"",
                    FieldNameoptions:[
                        {
                            label:"用户编号",
                            value:"1"
                        }
                    ],
                    Operator:"",
                    OperatorOptions:[
                         {
                            label:"包含",
                            value:"1"
                        },
                        {
                            label:"等于",
                            value:"2"
                        },
                        {
                            label:"不等于",
                            value:"3"
                        },
                        {
                            label:"下于",
                            value:"4"
                        },
                        {
                            label:"大于",
                            value:"5"
                        },
                        {
                            label:"大于等于",
                            value:"6"
                        },
                    ],
                    LogicalValue:"",
                    LogicalValueoptions:[
                        {
                            label:"与",
                            value:"1"
                        },
                        {
                            label:"或",
                            value:"2"
                        },
                        // {
                        //     label:"非",
                        //     value:"3"
                        // },
                    ],
                    QueryValue:"",
                })
        },
        // 删除行
        deleteRow(index, row){
            this.$confirm('是否确认删除该行?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.gridData.splice(index,1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>
<style lang="scss">
.WaterPriceEdit{
    height: 100%;
    width: 80%;
    margin: 0 auto;
    padding:5px 20px;
    .toorbar{
        padding:10px 0px;
        text-align: right;
    }
    .el-input__icon{
        line-height: 30px;
    }
    .el-form-item{
        width: 48%;
        margin-right: 0px;
        .el-form-item__content{
            width: calc(100% - 120px);
            .el-input__inner,.el-select{
                width: 100% !important;
            }
        }
    }
}
</style>
