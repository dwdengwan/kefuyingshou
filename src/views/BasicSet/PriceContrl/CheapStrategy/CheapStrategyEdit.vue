
<template>
    <div class="CheapStrategyEdit">
         <div class="backfillSubmitForm">
            <div  class="toolbar">
                    <div class="form-left">
                        <div class="info"><div class="toolbar-line"></div>策略信息</div>
                    </div>
                </div>
            <el-form :inline="true" size="mini" :model="form" label-width="120px">
                

                  <el-form-item label="策略名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"  placeholder="请输入明细名称"></el-input>
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
                        <div class="info"><div class="toolbar-line"></div>优惠明细</div>
                    </div>
                    <div class="form-right">
                        <!-- <el-button icon="el-icon-plus" type="primary" size='mini'>增加费用阶梯</el-button> -->
                    </div>
                </div>

             <el-table 
                    stripe border 
                    :data="tableList" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="startUsage" min-width="80" label="费用名称">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.startUsage" placeholder="请选择状态">
                      <el-option label="水费" value="0"></el-option>
                      <el-option label="垃圾费" value="1"></el-option>
                      <el-option label="污水费" value="2"></el-option>
                      <el-option label="水资源费" value="3"></el-option>
                    </el-select>
                </template>
              </el-table-column>

              <el-table-column prop="coefficientMix" min-width="100" label="最小生效范围">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.coefficient"
                    placeholder="请输入最小生效范围">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="coefficientMax" min-width="100" label="最大生效范围">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.coefficient"
                    placeholder="请输入最大生效范围">
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column prop="endType" min-width="100" label="优惠方式">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.endType" placeholder="请选择优惠方式">
                      <el-option label="水量按公式优惠" value="0"></el-option>
                      <el-option label="金额按公式优惠" value="1"></el-option>
                      <el-option label="封顶金额" value="2"></el-option>
                      <el-option label="封顶水量" value="3"></el-option>
                      <el-option label="固定减免产量" value="4"></el-option>
                      <el-option label="固定减免金额" value="4"></el-option>
                      <el-option label="按人口减免水量" value="4"></el-option>
                      <el-option label="按人口减免金额" value="4"></el-option>
                    </el-select>
                </template>
              </el-table-column>
<!-- 
              <el-table-column prop="price" min-width="100" label="计算单位">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.price" placeholder="请选择计算单位">
                      <el-option label="按水量" value="0"></el-option>
                      <el-option label="按百分比" value="1"></el-option>
                    </el-select>
                </template>
              </el-table-column> -->

              <el-table-column prop="coefficient" min-width="100" label="优惠值/计算公式">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.coefficient"
                    placeholder="请输入优惠值或填入计算公式">
                  </el-input>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="stageMoney" min-width="100" label="优惠单价">
                <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.stageMoney"
                    placeholder="请输入优惠单价">
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
    name:"CheapStrategyEdit",
    data(){
        return{
            tableList: [
        {
            endType:'1',
          startUsage:"水费",
          endUsage: '14',
          price: "1",
          coefficientMix: "1.0",
          coefficientMax: "0",
        },
        {
            endType:'1',
          startUsage:"污水费",
          endUsage: "28",
          price: "0",
          coefficientMix: "1.0",
          coefficientMax: "0",
        },
        {
            endType:'2',
          startUsage:"",
          endUsage: "",
          price: "",
          coefficientMix: "1.0",
          coefficientMax: "0",
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
.CheapStrategyEdit{
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
