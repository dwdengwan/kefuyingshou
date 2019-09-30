<template>
  <div class="ComparisonTableExamine">

    <steps :step="step"></steps>
    <span>
      <h3>登记信息</h3>
      <div class="backfillSubmitForm">
        <el-form :inline="true" :model="backfillSubmitForm" label-width="120px">
          <!-- <el-form-item label="用户编号：">
                        <el-input v-model="userNum" placeholder="" disabled></el-input>
                    </el-form-item> -->

          <el-form-item :label="v.label" v-for="(v,i) in customerInfo" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item :label="v.label" v-for="(v,i) in customerInfoRead" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </span>
    <span v-if="showNum > 1">
      <h3>水表信息</h3>
      <div class="backfillSubmitForm">
        <el-form :inline="true" :model="backfillSubmitForm" label-width="120px">
          <el-form-item label="原表编号：">
            <el-input v-model="userNum" placeholder="1234534" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="原表底码：">
            <el-input v-model="userNum" placeholder="请输入原表底码"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户地址：">
                    <el-input type="textarea" v-model="backfillSubmitForm.desc" :rows="4" placeholder="用户地址"></el-input>
                </el-form-item> -->
        </el-form>
      </div>
    </span>
    <span v-if="showNum > 1">
      <h3>临时表信息</h3>
      <div class="backfillSubmitForm">
        <el-form :inline="true" :model="changeTbaleInfoForm" label-width="120px">
          <el-form-item :label="v.label" v-for="(v,i) in changeTbaleInfoForm.backfillInput" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>
          <el-form-item label="换表日期：">
            <el-date-picker v-model="changeTbaleInfoForm.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </span>
    <span v-if="showNum > 2">
      <h3>校核信息</h3>
      <div class="backfillSubmitForm">
        <el-form :inline="true" :model="ComparisonTableInfoForm" label-width="120px">
          <el-form-item label="校核人：">
            <el-input v-model="ComparisonTableInfoForm.desc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="校核日期：">
            <el-date-picker v-model="ComparisonTableInfoForm.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item :label="v.label" v-for="(v,i) in ComparisonTableInfoForm.backfillInput" :key="i">
                    <el-input v-model="v.value" :placeholder="v.tips"></el-input>
                </el-form-item> -->
          <el-form-item label="校核结果：">
            <el-select clearable v-model="ComparisonTableInfoForm.status" placeholder="正常" @change="reaultChange">
              <el-option v-for="(item,index) in ComparisonTableInfoForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="备注：" class="remark">
            <el-input type="textarea" v-model="ComparisonTableInfoForm.remark" :rows="2" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </span>
    <span v-if="showNum > 3">
      <h3>校核后处理信息</h3>
      <div class="backfillSubmitForm">
        <el-form :inline="true" v-if="resultShow" :model="backfillSubmitForm" label-width="120px">

          <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInput" :key="i">
            <el-input v-model="v.value" :placeholder="v.tips"></el-input>
          </el-form-item>

        </el-form>
        <el-form v-else :inline="true" :model="ComparisonTableInfoForm" label-width="120px">
          <el-form-item label="原表处理方式：">
            <el-select clearable v-model="ComparisonTableInfoForm.OldTableProcessing" placeholder="报废">
              <el-option v-for="(item,index) in ComparisonTableInfoForm.OldTableProcessingoptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </span>
    <span v-if="showNum == 5">
      <h3>押金退还</h3>
      <div class="backfillSubmitForm">
        <el-form :inline="true" :model="backfillSubmitForm" label-width="120px">

          <el-form-item label="退款方式：" style="width: 30%">
            <el-radio v-model="backfillSubmitForm.checked" label="1">转余额</el-radio>
            <el-radio v-model="backfillSubmitForm.checked" label="2">现金</el-radio>
            <el-radio v-model="backfillSubmitForm.checked" label="3">转账</el-radio>
          </el-form-item>

        </el-form>
      </div>
    </span>
  </div>
</template>
<script>
import steps from "@/components/Steps"
export default {
  name: "ComparisonTableExamine",
  components: {
    steps
  },
  data() {
    return {
      resultShow: true,
      backfillSubmitForm: {
        backfillInput: [
          {
            label: "水表编号",
            value: "",
            tips: ""
          },
          {
            label: "户号",
            value: "",
            tips: ""
          },
          {
            label: "厂家名称",
            value: "",
            tips: ""
          },
          {
            label: "用户名称",
            value: "",
            tips: ""
          },
          {
            label: "位置及编号",
            value: "",
            tips: ""
          },
          {
            label: "水表类型",
            value: "",
            tips: ""
          },
          {
            label: "合格证号",
            value: "",
            tips: ""
          },
          {
            label: "水表形态",
            value: "",
            tips: ""
          },
          {
            label: "检定结果",
            value: "",
            tips: ""
          },
          {
            label: "检定人",
            value: "",
            tips: ""
          },
          {
            label: "累计流量",
            value: "",
            tips: ""
          },
          {
            label: "始用日期",
            value: "",
            tips: ""
          },
          {
            label: "押金",
            value: "",
            tips: ""
          },

        ],
        desc: "",
        descoptions: []
      },
      changeTbaleInfoForm: {
        backfillInput: [
          {
            label: "临时表编号",
            value: "",
            tips: ""
          },
          {
            label: "临时表底码",
            value: "",
            tips: ""
          },
          // {
          //     label:"借表底码",
          //     value:"",
          //     tips:""
          // },
        ],
        date: "",
      },
      ComparisonTableInfoForm: {
        backfillInput: [

          {
            label: "校核日期",
            value: "",
            tips: ""
          },

        ],
        desc: "",
        descoptions: [
          {
            name: "正常",
            value: "1"
          },
          {
            name: "异常",
            value: "2"
          },
        ],
        descoptions1: [
          {
            name: "水表异常",
            value: "1"
          },
          {
            name: "水量突增",
            value: "2"
          },
          {
            name: "其他",
            value: "3"
          },
        ],
        date: "",
        status: "",
        remark: "",
        OldTableProcessingoptions: [
          {
            name: "报废",
            value: "2"
          },
          {
            name: "送修",
            value: "1"
          },
        ],
        OldTableProcessing: "",
      },
      backfillSubmitForm: {
          checked: '1',
        backfillInput: [
          {
            label: "临时表底码",
            value: "",
            tips: ""
          },
          {
            label: "原表起码",
            value: "",
            tips: ""
          },
          {
            label: "临时表余量",
            value: "",
            tips: ""
          },


        ],
        desc: "",
        descoptions: []
      },
      step: [
        {
          num: 1,
          title: "校表登记"
        },
        {
          num: 2,
          title: "换表"
        },
        {
          num: 3,
          title: "校核结果"
        },
        {
          num: 4,
          title: "二次换表"
        },
        {
          num: 5,
          title: "押金退还"
        },


      ],
      customerInfoRead: [
        {
          label: "支付押金：",
          value: "",
          tips: ""
        },
        {
          label: "校核原因：",
          value: "",
          tips: ""
        },
        {
          label: "备注：",
          value: "",
          tips: ""
        },
      ],
      customerInfo: [

        {
          label: "用户编号：",
          value: "",
          tips: ""
        },
        {
          label: "用户名称：",
          value: "",
          tips: ""
        },
        {
          label: "用户地址：",
          value: "",
          tips: ""
        },
        {
          label: "装表地址：",
          value: "",
          tips: ""
        },
        {
          label: "水表编号：",
          value: "",
          tips: ""
        },
        {
          label: "水表形态：",
          value: "",
          tips: ""
        },
        {
          label: "水表厂家：",
          value: "",
          tips: ""
        },
        {
          label: "水表型号：",
          value: "",
          tips: ""
        },
        {
          label: "水表口径：",
          value: "",
          tips: ""
        },
        {
          label: "装表日期：",
          value: "",
          tips: ""
        },





      ],
      userNum: "",
      showNum: 0,
    }

  },
  mounted() {
    eventBus.$on('operation', (item) => {
      this.showNum = item.num;
      console.log(this.showNum);
    });
  },
  methods: {
    reaultChange(val) {
      if (val == 2) {
        this.resultShow = false;
      } else {
        this.resultShow = true;
      }

    }
  }
}
</script>
<style lang="scss">
.ComparisonTableExamine {
  padding: 10px 20px;
  height: calc(100% - 41px);
  overflow: auto;
  h3,
  legend {
    background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 20px;
    font-size: 14px;
  }
  .backfillSubmitForm {
    margin-top: 15px;
  }
  .backfillSubmitForm {
    padding: 10px 20px;
    width: calc(100% - 40px);
    .el-form-item {
      width: 24%;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
      .el-form-item__content {
        width: calc(100% - 120px);
        height: 30px;
        line-height: 30px;
        .el-select,
        .el-input__inner {
          width: 100%;
          height: 30px;
          line-height: 30px;
        }
        .el-input__icon {
          line-height: 30px;
        }
      }
    }
    .remark {
      width: 50%;
      height: 60px;
      .el-form-item__content {
        width: calc(100% - 120px);
      }
    }
  }
  .el-steps--horizontal {
    margin: 0 auto;
    width: 50%;
    padding-bottom: 20px;
  }
  .Steps {
    width: 740px;
    margin: 0 auto;
    li {
      padding-right: 20px;
    }
  }
  .Steps > ul .is-active{
        width: 14%;
  }
}
</style>
