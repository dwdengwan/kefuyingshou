<template>
    <div class="ComprehensiveQuery">
        <div class="toorbar">
            <!-- <el-button type="primary" icon="el-icon-search" style="background:#faa646;color:#fff;border-color:#faa646" size="mini" @click="edit(scope.$index, scope.row)"></el-button> -->
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">增加</el-button>

        </div>
        <el-table :data="gridData" border>
            <el-table-column 
                type="index"  label="NO."
                min-width="50">   
            </el-table-column>
            <el-table-column label="字段名" min-width="150">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.FieldName" placeholder="请选择">
                        <el-option
                        v-for="item in scope.row.FieldNameoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="操作符" min-width="150">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.Operator" placeholder="请选择">
                        <el-option
                        v-for="item in scope.row.OperatorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="查询值" min-width="150">
                <template slot-scope="scope">
                   <el-input v-model="scope.row.QueryValue"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="逻辑值" min-width="150">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.LogicalValue" placeholder="请选择">
                        <el-option
                        v-for="item in scope.row.LogicalValueoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
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
    name:"ComprehensiveQuery",
    data(){
        return{
            gridData:[
                {
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
.ComprehensiveQuery{
    padding:5px 20px;
    .toorbar{
        padding:10px 0px;
        text-align: right;
    }
    .el-input__icon{
        line-height: 30px;
    }
}
</style>
