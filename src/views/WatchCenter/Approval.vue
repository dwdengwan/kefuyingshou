<template>
  <div class="Approval">
    <div class="toolbar">
      <el-form :inline="true" :model="formData" class="demo-form-inline formEdit" label-width="100px">
        <legend>单据信息</legend>

          <el-form-item label="入库单号：">
            <el-input v-model="formData.con" :disabled="true" placeholder="入库单号"></el-input>
          </el-form-item>
          <el-form-item label='入库日期：'>
            <el-date-picker v-model="DateChoosevalue" :disabled="true" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          
          <el-form-item label="水表口径：">
            <el-select clearable v-model="formData.waterMeterCaliber" :disabled="true" placeholder="水表口径">
              <el-option v-for="(item,index) in formData.waterMeterCaliberOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="水表厂家：">
            <el-select clearable v-model="formData.waterMeterManufacturer" :disabled="true" placeholder="水表厂家">
              <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <!-- <el-form-item label="水表形态：">
            <el-select clearable v-model="formData.waterMeterForm" :disabled="!tableEdit" placeholder="水表类型">
              <el-option v-for="(item,index) in formData.waterMeterFormOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="水表类型：">
            <el-select clearable v-model="formData.waterMeterType" :disabled="!tableEdit" placeholder="水表类型">
              <el-option v-for="(item,index) in formData.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item label="水表型号：">
            <el-input clearable v-model="formData.waterMeterModel" :disabled="true" placeholder="水表型号"></el-input>
            <!-- <el-select clearable v-model="formData.waterMeterModel" placeholder="水表型号">
              <el-option v-for="(item,index) in formData.waterMeterModelOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select> -->
          </el-form-item>
          <!-- <el-form-item label="所属部门：">
            <el-select clearable v-model="formData.waterMeterDemp" :disabled="!tableEdit" placeholder="所属部门">
              <el-option v-for="(item,index) in formData.waterMeterDempOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="总表数：">
            <el-input clearable v-model="formData.waterMeterDemp" :disabled="true" class="read-only" placeholder="2000"></el-input>
          </el-form-item>
          <el-form-item label="已校核数：">
            <el-input clearable v-model="formData.waterMeterForm" :disabled="true" class="read-only" placeholder="1345"></el-input>
          </el-form-item>

        <legend>校核信息</legend>
      </el-form>

    </div>
    
    <div class="kl-table">
      <el-table stripe border :data="histroyData.list" class="Warehousing-table">



        <!-- <el-table-column
                    prop="concentrator"
                    min-width="80"
                    label="水表厂家">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.concentrator" size="mini"></el-input>
                    </template>
                </el-table-column> -->

        <!-- <el-table-column
                    prop="endTime"
                    min-width="80"
                    label="水表口径"
                    >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.endTime" size="mini"></el-input>
                    </template>
                </el-table-column> -->

        <!-- <el-table-column
                    prop="connect"
                    min-width="120"
                    label="水表形态">
                    <template slot-scope="scope">
                         <el-select v-model="scope.row.connect" placeholder="请选择">
                            <el-option
                            v-for="item in scope.row.connectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column> -->

        <!-- <el-table-column
                    prop="getMeter"
                    min-width="120"
                    label="水表型号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.unusual" size="mini"></el-input>
                    </template>
                </el-table-column> -->

        <!-- <el-table-column
                    prop="connect"
                    min-width="120"
                    label="水表类型">
                    <template slot-scope="scope">
                         <el-select v-model="scope.row.modifyBy" placeholder="请选择">
                            <el-option
                            v-for="item in scope.row.modifyByOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
               
                    </template>
                </el-table-column> -->

        <!-- <el-table-column
                    prop="connect"
                    min-width="120"
                    label="水表型式">
                    <template slot-scope="scope">
                         <el-select v-model="scope.row.modifyTime" placeholder="请选择">
                            <el-option
                            v-for="item in scope.row.modifyTimeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
               
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="connect"
                    min-width="120"
                    label="传输方式">
                    <template slot-scope="scope">
                         <el-select v-model="scope.row.protocolName" placeholder="请选择">
                            <el-option
                            v-for="item in scope.row.protocolNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
               
                    </template>
                </el-table-column>
                                
                <el-table-column
                    prop="connect"
                    min-width="120"
                    label="水表传感器">
                    <template slot-scope="scope">
                         <el-select v-model="scope.row.sensorModel" placeholder="请选择">
                            <el-option
                            v-for="item in scope.row.sensorModelOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
               
                    </template>
                </el-table-column> -->

        <!-- <el-table-column
                    prop="getMeter"
                    min-width="120"
                    label="水表型号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.unusual" size="mini"></el-input>
                    </template>
                </el-table-column> -->

        <!-- 
                <el-table-column
                    prop="getMeter"
                    min-width="120"
                    label="合格证号">
                    <template slot-scope="scope" v-if="tableEdit">
                        <el-input v-model="scope.row.getMeter" size="mini"></el-input>
                    </template>
                </el-table-column> -->

        <el-table-column prop="meter" min-width="120" label="出厂编号" show-overflow-tooltip>
          <!-- <template slot-scope="scope" v-if="tableEdit">
              <el-input v-model="scope.row.meter" size="mini"></el-input>

            </template> -->
        </el-table-column>


      </el-table>
      <div class="factoryNo">
          <el-label>出厂编号：</el-label>
          <el-input v-model="factoryNo"></el-input>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "Approval",
  data() {
    return {
      formData: {
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "宁波",
            value: "1"
          },
          {
            name: "上海",
            value: "2"
          },
          {
            name: "梅花",
            value: "3"
          },
          {
            name: "常德",
            value: "4"
          },
          {
            name: "开封",
            value: "5"
          },
        ],

        waterMeterCaliber: "",
        waterMeterCaliberOptions: [
          {
            name: "15",
            value: "2"
          },
          {
            name: "20",
            value: "1"
          },
          {
            name: "25",
            value: "3"
          },
          {
            name: "40",
            value: "4"
          },
          {
            name: "200",
            value: "5"
          },
        ],

        waterMeterType: "",
        waterMeterTypeOptions: [
          {
            name: "人工表",
            value: "1"
          },
          {
            name: "远程表",
            value: "2"
          },
        ],
        waterMeterForm: '',
        waterMeterFormOptions: [
          {
            name: "新表",
            value: "1"
          },
          {
            name: "旧表",
            value: "2"
          },

        ],

        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "异常",
            value: "1"
          },
          {
            name: "校表",
            value: "2"
          },

        ],
        waterMeterDemp: '',
        waterMeterDempOptions: [
          {
            name: "营业部",
            value: "1"
          },
          {
            name: "工程部",
            value: "2"
          },

        ],
        waterMeterModel: '',
        waterMeterModelOptions: [
          {
            name: "LXSWN",
            value: "0"
          },
          {
            name: "LXSGY-15G",
            value: "1"
          },
          {
            name: "LXSGY",
            value: "2"
          },
          {
            name: "LXSFW",
            value: "3"
          },
          {
            name: "DG-FW001",
            value: "4"
          },
        ],
        con: "",
        reason: ""
      },
      histroyData: {
          list:[
              {},
              {},
          ]

      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: '',
      tableEdit:true,
      factoryNo:"",
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 15,
            id: null,
            isxz: "111",
            lvalue: "-",
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
            connectOptions: [
              {
                label: "新表",
                value: "1"
              },
              {
                label: "轮检表",
                value: "2"
              },
            ],
            modifyByOptions: [
              {
                label: "人工表",
                value: "1"
              },
              {
                label: "远传表",
                value: "2"
              },
            ],
            modifyTimeOptions: [
              {
                label: "旋翼",
                value: "1"
              },
              {
                label: "螺翼",
                value: "2"
              },
              {
                label: "复试",
                value: "3"
              },
              {
                label: "其他",
                value: "4"
              },
            ],
            protocolNameOptions: [
              {
                label: "无",
                value: "1"
              },
              {
                label: "NB-IOT",
                value: "2"
              },
              {
                label: "GPRS",
                value: "3"
              },
              {
                label: "LORA",
                value: "4"
              },
              {
                label: "有线",
                value: "5"
              },
              {
                label: "其他",
                value: "6"
              },
            ],
            sensorModelOptions: [
              {
                label: "机械表",
                value: "1"
              },
              {
                label: "脉冲",
                value: "2"
              },
              {
                label: "无磁",
                value: "3"
              },
              {
                label: "光电",
                value: "4"
              },
              {
                label: "摄像",
                value: "5"
              },
              {
                label: "电磁",
                value: "6"
              },
              {
                label: "其他",
                value: "7"
              },
            ]
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
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1);

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
    demand() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    // 删除行
    deleteRow(index, row) {
      this.$confirm('是否确认删除该行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.histroyData.list.splice(index, 1)
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
    },
    add() {
      this.histroyData.list.push({})
    },
    downFile(){

    },
    uploading(){

    }
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.Approval {
  padding: 10px 0px;
  legend {
    background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 20px;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .kl-table{
      zoom: 1;
      &:after {
            @include _clearBoth();
        }
      .factoryNo{
          float: right;
          width: 40%;
          .el-input{
              display:inline-block;
              width: calc(100% - 70px);
          }
      }
      .el-table{
          float: left;
          width: 40%;
      }
  }
  .demo-form-inline.formEdit {
 
    .el-form-item{
            width: 24%;
            margin-right: 0px;
            height: 30px;
            line-height: 30px; 
        .el-form-item__label{
            height: 30px;
            line-height: 30px;          
        }
        .el-form-item__content{
            width: calc(100% - 100px);
            height: 30px;
            line-height: 30px;
            .el-input--suffix,.el-input__inner{
                width: 100%;
                height: 30px;
                line-height: 30px;
            }
            .el-input__icon{
                line-height: 30px;
            }
        }
    }

        .el-date-editor /deep/ .el-input__inner,.el-select {
            width: 100% !important;
            height: 100%;
        }
        &:after {
             @include _clearBoth();
        }
        & > .form-left {
            float: left;
        //   width: 100%;
        .changeTabTextarea {
            width: 300px;
        }
        }
        & > .form-right {
            float: right;
        // margin-top: 3.9%;
        }
  }
  .el-table__body-wrapper td {
    height: 28px;
    line-height: 28px;
  }
}
#app .Approval .el-table__body-wrapper td,
#app .Approval .el-table__body-wrapper th {
  padding: 0px;
}
#app .Approval .el-table td,
#app .Approval .el-table th {
  padding: 0px;
}

</style>

