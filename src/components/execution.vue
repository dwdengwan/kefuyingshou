<template>
  <!-- 工程中心-施工材料 -->
  <div class="execution">
      <span class="btnBox1">
        <span>施工材料</span>
      </span>
      <div class="kl-table">
        <el-table 
                v-if="tableShow" 
                :max-height="maxHeight" 
                stripe border 
                :data="tableData" 
                :summary-method="getSummaries"
                show-summary
                @cell-click="cellClick" 
                class="wuserInfo-table">
          <!-- <el-table-column type="selection" fixed="left" width="55"></el-table-column> -->
          <el-table-column type="index" fixed="left" label="NO." width="50" :index="indexMethod"></el-table-column>
          
          <el-table-column prop="userName" min-width="220" label="材料名称">
            <template slot-scope="scope">
              <el-select 
                        v-model="scope.row.userName" 
                        @keyup.esc.native="cancel(scope.$index,scope.row)"
                        @change="takeChange(scope.row,scope.$index)">
                <el-option 
                          v-for="item in billType" 
                          :key="item.value" 
                          :label="item.label" 
                          :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="userAddress" min-width="220" label="材料规格">
          </el-table-column>

          <el-table-column prop="meterAddress" min-width="220" label="材料数量">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.meterAddress"  @change="handleChange(scope.row)" :min="1" :max="10000">
              </el-input-number>
            </template>
          </el-table-column>

          
          <el-table-column prop="bookNum" min-width="100" label="材料单位">
          </el-table-column>

          <el-table-column prop="documentType" min-width="100" label="材料单价">
          </el-table-column>

          <el-table-column prop="documentNum" min-width="100" label="材料总价">
          </el-table-column>
          
          <el-table-column label="操作" width="85">
            <template slot-scope="scope">
              <el-button type="text" style='font-size:12px;' @click.native="delExecution(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="block">
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination> -->
        </div>
      </div>
  </div>
</template>
<script>
export default {
  // props:['uploadPic'],
  data(){
    return {
      tableData:[
        // {
        //   userName:0,
        //   userAddress:'材料规格一',
        //   meterAddress:1,
        //   bookNum:'米',
        //   documentType:619,
        //   documentNum:619,
        // },
        // { 
        //   userName:1,
        //   userAddress:'材料规格二',
        //   meterAddress:1,
        //   bookNum:'千克',
        //   documentType:615,
        //   documentNum:615,
        // },
      ],
      billType:[
        {
          value:0,
          label:"材料类型一"
        },
        {
          value:1,
          label:"材料类型二"
        },
        {
          value:2,
          label:"材料类型三"
        },
        {
          value:3,
          label:"材料类型四"
        },
      ],
      maxHeight: 0,
      tableShow: false,
    };
  },
  mounted(){
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.execution .kl-table', ['.execution .block'])
    })
  },
  methods:{
    getSummaries(param) {//汇总
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '汇总';
            return;
          }

          if(index === 6){
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += '';
              // sums[index] += ' 元';
            }
            // else {
            //   sums[index] = 'N/A';
            // }
          }
          
        });

        return sums;
    },
    handleChange(row){//材料数量的增减
      console.log(row);
      let num,price,Num;
      // documentType 单价 documentNum 总价 meterAddress 数量
      if(row.meterAddress){
        num = row.meterAddress;
      }else{
        num = 0;
      }
      if(row.meterAddress){
        price = row.documentType;
      }else{
        price = 0;
      }
      Num = row.documentNum;
      Num = Number(num) * Number(price);
      row.documentNum = Num; 
      console.log(num,price,Num);
    },
    addExecution(){//添加一行
      if(this.tableData.length < this.billType.length){
        this.tableData.push(
          // {
          //   userName:0,
          //   meterAddress:1,
          //   documentType:227,
          //   documentNum:227,
          // }
          {}
        );
      }else{
         this.$notify.error({
          title: '错误',
          message: '材料类型不能重复'
        });
      }
    },
    delExecution(row,index){//删除一行
      let num = row.userName;
      this.billType.splice(num,0,row.userName);
      console.log(this.billType.length);
      this.tableData.splice(index, 1);

    },
    saveExecution(){//数据保存
      console.log(this.tableData);
    },
    takeChange(row,index){//下拉框发生变化时
      let col = row;
      if(row.userName == 0){
        row.userAddress = '材料规格一';
        row.documentType = 227;
      }else if(row.userName == 1){
        row.userAddress = '材料规格二';
        row.documentType = 615;
      }else if(row.userName == 2){
        row.userAddress = '材料规格三';
        row.documentType = 813;
      }else if(row.userName == 3){
        row.userAddress = '材料规格四';
        row.documentType = 1020;
      }
      this.handleChange(col);
      let billType = this.billType.splice(index,1);
      console.log(this.billType);
      // this.$set(this,"billType",billType);
    }
  },
  watch:{
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  },
}
</script>
<style lang="scss">
  .execution{
    .kl-table{
      .el-table__fixed-footer-wrapper{
        table{
          height: 40px;
        }
        tbody{
          height: 40px;
          td{
            .cell{
              height: 40px;
              line-height: 40px;
            }
          }
        }
      }
      .el-table__footer-wrapper{
        .has-gutter td{
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
</style>