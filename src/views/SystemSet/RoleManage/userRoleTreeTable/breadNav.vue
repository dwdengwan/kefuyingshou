<template>
    <div class="nav-bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
             v-for="(item, index) in breaddata"
             :key=index>{{item.name}}</el-breadcrumb-item>   
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    name:"bread-nav",
    props:{
        breaddata:{
            type:Array,
            default:[]
        }
    }
}
</script>
<style lang="scss">
$theme-color:#297acc;
.el-breadcrumb{
  padding-left: 20px;
}
.el-breadcrumb__item{
    .el-breadcrumb__inner{
        color:$theme-color;
        .el-breadcrumb__inner:first-child{
            color:#606266;
        }
    }
}
</style>
