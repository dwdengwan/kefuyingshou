
<template>
    <div class="PriceInfoEdit">
         <div class="backfillSubmitForm">
            <div  class="toolbar">
                    <div class="form-left">
                        <div class="info"><div class="toolbar-line"></div>费用明细</div>
                    </div>
                </div>
              <el-form :inline="true" size="mini" :model="form" label-width="120px">
                

                <el-form-item label="明细名称：" :label-width="formLabelWidth">
                  <el-input v-model="form.remark" autocomplete="off"  placeholder="请输入明细名称"></el-input>
                </el-form-item>

                <el-form-item label="费用名称：" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.priceDetail"
                    placeholder="请选择费用明细"
                  >
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="阶梯类型：" :label-width="formLabelWidth">
                  <el-select v-model="form.ladderType" placeholder="请选择阶梯类型">
                    <el-option label="非阶梯" value="anchaobiaoqi"></el-option>
                    <el-option label="日阶梯" value="date"></el-option>
                    <el-option label="月阶梯" value="month"></el-option>
                    <el-option label="年阶梯" value="year"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="计算单位：" :label-width="formLabelWidth">
                  <el-select v-model="form.state" placeholder="请选择状态">
                    <el-option label="按户" value="1"></el-option>
                    <el-option label="按人" value="0"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="人口基数：" :label-width="formLabelWidth">
                  <el-input v-model="form.remark1" autocomplete="off"  placeholder="请输入人口基数" type="number" min="0"></el-input>
                </el-form-item>

                <el-form-item label="水量基数：" :label-width="formLabelWidth">
                  <el-input v-model="form.remark2" autocomplete="off"  placeholder="请输入水量基数" type="number" min="0"></el-input>
                </el-form-item>

                  
                <el-form-item label="状态：" :label-width="formLabelWidth">
                  <el-select v-model="form.state" placeholder="请选择状态">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="备注：" :label-width="formLabelWidth">
                  <el-input v-model="form.remark" autocomplete="off" type="textarea" placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-form>
            
                
                
                <div  class="toolbar">
                    <div class="form-left">
                        <div class="info"><div class="toolbar-line"></div>价格阶梯</div>
                    </div>
                    <div class="form-right">
                        <el-button icon="el-icon-plus" type="primary" size='mini'>添加行</el-button>
                    </div>
                </div>

             <el-table 
                    stripe border 
                    :data="tableList" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="startUsage" min-width="100" label="开始水量">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.startUsage"
                    placeholder="请输入开始水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="endUsage" min-width="100" label="结束水量">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.endUsage"
                    placeholder="请输入结束水量">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="price" min-width="100" label="单价">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.price"
                    placeholder="请输入单价">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="coefficient" min-width="100" label="系数">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.coefficient"
                    placeholder="请输入系数">
                  </el-input>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="stageMoney" min-width="100" label="阶段起始金额">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.stageMoney"
                    placeholder="请输入阶段起始金额">
                  </el-input>
                </template>
              </el-table-column> -->

              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name:"PriceInfoEdit",
    data(){
        return{
            tableList: [
        {
          startUsage:"0",
          endUsage: '14',
          price: "2.68",
          coefficient: "1.0",
          stageMoney: "0",
        },
        {
          startUsage:"15",
          endUsage: "28",
          price: "4.68",
          coefficient: "1.0",
          stageMoney: "37.52",
        },
        {
          startUsage:"",
          endUsage: "",
          price: "",
          coefficient: "",
          stageMoney: "",
        },
      ],
            
      form: {
        ladderType:'month',
        waterSelect:'',
        priceModel:'',
        mixtrueSelect:'',
        waterLevel:'',
        waterValue:false,
        startTime:'',
        endTime:'',
        bulidReson:'',
        priceDetail:'04',
        state:'1',
        bulidTime:'',
        updateReson:'',
        updataTime:'',
        remark:'',
      },
        }
    }
}
</script>
<style lang="scss">
 @import "../../../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
.PriceInfoEdit{
    height: 100%;
    width: 95%;
    margin: 0 auto;
    .backfillSubmitForm{
        // margin-top: 15px;
        // padding: 10px 20px;
        // // width: 93%
        .el-input--mini /deep/ .el-input__inner{
                width: 100%;
        }
        .toolbar-line{
          width: 4px;
          background: #c4d600;
          border-radius: 4px;
          height: 1.5rem;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
      .info{
        margin:10px 0px;
        // background: #f5f5f5;
        font-weight: 700;
        color:#000;
        height: 1.5rem;
        line-height: 1.5rem;
        padding:0 1rem;
        font-size: 14px;
      }
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
