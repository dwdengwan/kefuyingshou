<template>
  <div class="TransferDetails_GH">
    <el-table stripe border :data="historyData" class="change-tables-table">

      <el-table-column type="index" label="NO." width="50" fixed="left">
      </el-table-column>

      <el-table-column prop="month" min-width="150" label="账期">
      </el-table-column>

      <el-table-column prop="fname" min-width="100" label="费用名称">
      </el-table-column>

      <el-table-column prop="value" min-width="180" label="计量水量">
      </el-table-column>

      <el-table-column prop="money" min-width="180" label="欠费金额">
      </el-table-column>

      <el-table-column prop="fare" min-width="180" label="费用金额">
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  name: "TransferDetails_GH",
  data() {
    return {
      historyData:[
          {
            month:'201905',
            fname:'污水费',
            value:'12',
            money:'123',
            fare:'32',
            },
          {}
        ]
      
    }
  },
  mounted() {


  },
  methods: {


  }
}
</script>
<style lang="scss">
.TransferDetails_GH {
  padding: 10px 20px;
  .el-table {
    b {
      color: red;
    }
  }
}
</style>
