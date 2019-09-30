<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="width:calc(100% - 2rem);">
    <el-breadcrumb-item
      v-for="item in treeBread"
      @click.native="breadClick(item)"
      :key="item.id"
      :class="{ 'bread-active': item.checkable === true }">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  // 其他组件引入面包屑组件需要在组件中加入面包屑点击事件
  // breadClick(treeNode){
  //   if(treeNode.checkable === true){
  //     var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
  //     var node = treeObj.getNodeByParam('id',treeNode.id);
  //     treeObj.selectNode(node);
  //     vm.$store.dispatch('commitSetTreeNode',node)
  //     // console.log(treeNode)
  //   }
  // }
  import { mapState } from 'vuex'
    export default {
        name: "bread-component",
      data(){
          return {

          }
      },
      computed: {
        ...mapState(['treeBread'])
      },
      methods:{
        breadClick(treeNode){
          if('breadClick' in this.$parent){
            this.$parent.breadClick(treeNode)
          }else {
            this.$parent.$parent.breadClick(treeNode)
          }

        }
      
      }
    }
</script>

<style lang="scss" scoped>
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
