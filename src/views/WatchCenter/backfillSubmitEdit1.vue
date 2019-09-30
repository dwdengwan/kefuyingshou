<template>
  <div class="backfillSubmitEdit1">
    <div class="submit_edit_left">
      <div class="submit_edit_left_msg">
        <div class="msg_content">
          <span>用户编号：</span>
          <span>553422</span>
        </div>

        <div class="msg_content">
          <span>用户名称：</span>
          <span>张三</span>
        </div>

        <div class="msg_content">
          <span>用户地址：</span>
          <span>科技大厦</span>
        </div>

        <div class="msg_content">
          <span>水表口径：</span>
          <span>BD30</span>
        </div>

        <div class="msg_content">
          <span>上期抄码：</span>
          <span>3821</span>
        </div>
      </div>

      <div class="submit_edit_left_content">
        <el-form :model="leftData" ref="form" label-width="100px">

          <div class="my-input">
            <el-form-item label="拆表日期：">
              <el-date-picker v-model="leftData.enterMeterDate" size="mini" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </div>

          <div class="my-input">
            <el-form-item label="旧表底码：" prop="village">
              <el-input v-model="leftData.a" size="mini" clearable></el-input>
            </el-form-item>
          </div>

          <div class="my-input">
            <el-form-item label="余量：" prop="village">
              <el-input v-model="leftData.d" size="mini" clearable></el-input>
            </el-form-item>
          </div>

          <div class="my-input">
            <el-form-item label="旧表处理方式：" size="mini">
              <el-select v-model="leftData.OldTableProcessing" placeholder="请选择">
                <el-option
                  v-for="item in leftData.OldTableProcessingOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="my-input">
            <el-form-item label="备注：" prop="village">
              <el-input v-model="leftData.e" size="mini" clearable></el-input>
            </el-form-item>
          </div>

          <div class="my-input">
            <el-form-item>
              <el-button size="mini" type="primary">上传附件</el-button>
              <el-button size="mini" type="primary">保存</el-button>
            </el-form-item>
          </div>

        </el-form>
      </div>

    </div>
    <div class="submit_edit_right">

      <div class="toolbar">
        <el-form :inline="true" class="demo-form-inline" label-width="120px">
          <el-form-item label="单据编号：">
            <el-input v-model="searchCon" size="mini" placeholder="单据编号" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="计划完成日期：">
            <el-input v-model="searchCon" size="mini" placeholder="计划完成日期" disabled  class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="拆表员：">
            <el-input v-model="searchCon" size="mini" placeholder="拆表员" disabled  class="read-only"></el-input>
          </el-form-item><br>
          <el-form-item label="拆表方式：">
            <el-input v-model="searchCon" size="mini" placeholder="欠费拆表" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="制单日期：">
            <el-input v-model="searchCon" size="mini" placeholder="制单日期" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="制单人：">
            <el-input v-model="searchCon" size="mini" placeholder="制单人" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="水表数量：">
            <el-input v-model="meterNum" size="mini" placeholder="水表数量" disabled class="read-only"></el-input>
          </el-form-item>
          <el-form-item label="已回填数量：">
            <el-input v-model="backfillNum" size="mini" placeholder="已回填数量" disabled class="read-only"></el-input>
          </el-form-item>

          <el-form-item label="模糊查询：" class="search">
            <el-input v-model="searchCon" size="mini" placeholder="用户编号/水表编号"></el-input>
          </el-form-item>
          <el-form-item class="form-btn">

            <el-button style="background:#faa646;color:#fff;" @click="demand" size="mini" icon="el-icon-search"></el-button>
            <!-- <el-button icon="el-icon-download" @click="downFile" size="mini" type="primary">下载模板</el-button>
            <el-button icon="el-icon-upload2" @click="uploading" size="mini" type="primary">上传数据</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="backfillSubmitForm">
        <div class="kl-table">
          <el-table stripe border :data="histroyData.list">

            <!-- <el-table-column 
                    type="selection" 
                    width="50" 
                    fixed="left"
                    >
                </el-table-column> -->

            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>

            <!-- <el-table-column
                    prop="code"
                    min-width="100"
                    label="工程证号">
                </el-table-column>

                <el-table-column
                    prop="concentrator"
                    min-width="120"
                    label="出单日期">

                </el-table-column> -->

            <el-table-column prop="daytime" min-width="80" label="用户编号">
            </el-table-column>

            <el-table-column prop="factoryName" min-width="80" label="用户名称">
            </el-table-column>

            <el-table-column prop="fixValue" min-width="150" label="用户地址">
            </el-table-column>

            <el-table-column prop="getMeter" min-width="80" label="水表口径">
            </el-table-column>

            <el-table-column min-width="80" label="上期抄码" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.isxz"></el-input>

              </template>
            </el-table-column>
            <!-- <el-table-column min-width="80" label="新表编号" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.model"></el-input>

            </template>
          </el-table-column> -->
            <el-table-column min-width="80" label="旧表底码" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.offset"></el-input>

              </template>
            </el-table-column>

            <!-- <el-table-column prop="flux" min-width="80" label="新表起码">
          </el-table-column> -->

            <el-table-column prop="modifyBy" min-width="80" label="拆表水量" show-overflow-tooltip>
            </el-table-column>

            <!-- <el-table-column 
                    prop="meter" 
                    min-width="100" 
                    label="上期水量" 
                    show-overflow-tooltip>
                </el-table-column> -->

            <!-- <el-table-column
             
                    min-width="180"
                    label="拆码"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.model"></el-input>
                  
                    </template>
                </el-table-column> -->

            <!-- <el-table-column
        
                    min-width="80"
                    label="拆表员"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sensorModel"></el-input>
                  
                    </template>
                </el-table-column> -->
            <el-table-column min-width="140" label="装表日期">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.meter" type="date" placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column min-width="140" label="拆表日期">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.meter" type="date" placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            
            <el-table-column
             
                    min-width="180"
                    label="旧表处理方式"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.model"></el-input>
                  
                    </template>
                </el-table-column>

            <el-table-column
        
                    min-width="80"
                    label="余量"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sensorModel"></el-input>
                  
                    </template>
                </el-table-column>

            <el-table-column prop="modifyTime" min-width="150" label="备注" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.modifyTime"></el-input>
                <!-- <el-select  clearable v-model="scope.row.modifyTime" placeholder="备注">
                            <el-option  v-for="(item,index) in scope.row.modifyTimeOptions" :key="index" :label="item.name" :value="item.value"></el-option>

                        </el-select> -->
              </template>
            </el-table-column>

          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
            </el-pagination>
          </div>
        </div>
        <!-- <el-form :inline="true" :rules="rules" :model="backfillSubmitForm" label-width="150px">
                <el-form-item :label="v.label" v-for="(v,i) in backfillSubmitForm.backfillInput" :key="i">
                    <el-input v-model="v.value" :placeholder="v.tips" disabled class="read-only"></el-input>
                </el-form-item>
                <el-form-item label="出单备注：">
                    <el-input type="textarea" v-model="backfillSubmitForm.desc" clearable placeholder="出单备注"></el-input>
                </el-form-item>
                <legend>回填信息</legend>
                <el-form-item label="旧表抄见码：" prop="PriceStrategy">
                    <el-input v-model="backfillSubmitForm.PriceStrategy" clearable placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="新表底码：" prop="isfines">
                    <el-input v-model="backfillSubmitForm.isfines" clearable placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="结余数：">
                    <el-input v-model="backfillSubmitForm.UpdateCodeCopye" clearable placeholder="-275" style="color:red;font-weight:700;"></el-input>
                </el-form-item>
                <el-form-item label="抄表年月：">
                    <el-input v-model="backfillSubmitForm.Remarks" clearable placeholder="201906"></el-input>
                </el-form-item>
                <el-form-item label="完工日期：" prop="year">
                    <el-input v-model="backfillSubmitForm.year" clearable placeholder="20191603"></el-input>
                </el-form-item>
                <el-form-item label="管表员：" disabled class="read-only">
                    <el-input v-model="backfillSubmitForm.CategoryItems" clearable placeholder="谢韵"></el-input>
                </el-form-item>
                <el-form-item label="拆表员：" prop="Template">
                    <el-input v-model="backfillSubmitForm.Template" clearable placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="回填备注：">
                    <el-input type="textarea" v-model="backfillSubmitForm.FinalModifier" clearable placeholder="出单备注"></el-input>
                </el-form-item>
                <el-form-item label="旧表处理方式：">
                    <el-select  clearable v-model="backfillSubmitForm.FinalModificationTime" placeholder="旧表处理方式">
                         <el-option  v-for="(item,index) in backfillSubmitForm.descoptions" :key="index" :label="item.name" :value="item.value"></el-option>

                    </el-select>
                </el-form-item>
            </el-form> -->
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: "backfillSubmitEdit1",
  data() {
    return {
      searchCon: "",
      meterNum:"2000",
      backfillNum:"100",
      backfillSubmitForm: {
        backfillInput: [
          {
            label: "客户编号：",
            value: "",
            tips: "132484614346"
          },
          {
            label: "出单日期：",
            value: "",
            tips: "2019-06-13"
          },
          {
            label: "客户地址：",
            value: "",
            tips: ""
          },
          {
            label: "客户名称：",
            value: "",
            tips: ""
          },
          {
            label: "旧表编号：",
            value: "",
            tips: "0134876"
          },
          {
            label: "联系电话：",
            value: "",
            tips: "123467894204"
          },
          {
            label: "旧表厂号：",
            value: "",
            tips: ""
          },
          {
            label: "新表编号：",
            value: "",
            tips: ""
          },
          {
            label: "旧表口径：",
            value: "",
            tips: "20"
          },
          {
            label: "新表厂号：",
            value: "",
            tips: ""
          },
          {
            label: "旧表合格证号：",
            value: "",
            tips: ""
          },
          {
            label: "新表口径：",
            value: "",
            tips: ""
          },
          {
            label: "上期抄见码：",
            value: "",
            tips: ""
          },
          {
            label: "新表合格证号：",
            value: "",
            tips: ""
          },
          {
            label: "上期用水量：",
            value: "",
            tips: ""
          }
        ],
        desc: "",
        descoptions: [
          {
            name: "报废",
            value: "1"
          },
          {
            name: "重入库",
            value: "2"
          },
          {
            name: "维检",
            value: "3"
          },
        ],
        PriceStrategy: "",
        isfines: "",
        UpdateCodeCopye: "",
        Remarks: "",
        year: "",
        CategoryItems: "",
        Template: "",
        FinalModifier: "",
        FinalModificationTime: "",
      },
      rules: {
        desc: [
          { required: true, message: '旧表抄见码', trigger: 'blur' },
        ],
        PriceStrategy: [
          { required: true, message: '旧表抄见码', trigger: 'blur' },
        ],
        isfines: [
          { required: true, message: '新表底码', trigger: 'blur' },
        ],
        year: [
          { required: true, message: '完工日期', trigger: 'blur' },
        ],
        Template: [
          { required: true, message: '拆表员', trigger: 'blur' },
        ],
      },
      histroyData: {},
      tableShow: false,
      maxHeight: 0,
      leftData: {
        OldTableProcessing:"",
        OldTableProcessingOptions:[
          {
            label:"报废",
            value:"1"
          },
          {
            label:"维检",
            value:"2"
          },
          {
            label:"入库",
            value:"3"
          },
        ]
      },
    }
  },
  mounted() {
    this.init();
    var myDate = new Date();
    myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    myDate.getDate();
    var month = myDate.getMonth() + 1;
    for (let i = 0; i < this.histroyData.list.length; i++) {
      this.histroyData.list[i].meter = myDate.getFullYear() + '-' + month + '-' + myDate.getDate();
    }

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
            areaName: "水费",
            code: "20100101",
            concentrator: "20190706",
            connect: null,
            daytime: "1720350",
            endTime: null,
            factoryName: "盛小红",
            fcode: null,
            fix: false,
            fixValue: "丰源路上浦新村101号",
            flux: "20001000",
            getMeter: 15,
            id: null,
            isxz: "1724",
            lvalue: "20501231",
            meter: 30,
            model: null,
            modifyBy: "-1724",
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1.6",
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
            modifyTimeOptions: []
          },
          {
            areaId: null,
            areaName: "污水处理费",
            code: "20100101",
            concentrator: "",
            connect: null,
            daytime: "12133506",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "丰源路上浦新村102号",
            flux: "288",
            getMeter: 17,
            id: null,
            isxz: "1725",
            lvalue: "20501231",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1.6",
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
            modifyTimeOptions: []
          },
          {
            areaId: null,
            areaName: "水费",
            code: "20100101",
            concentrator: "20190706",
            connect: null,
            daytime: "1720353",
            endTime: null,
            factoryName: "盛小红",
            fcode: null,
            fix: false,
            fixValue: "丰源路上浦新村101号",
            flux: "20001000",
            getMeter: 15,
            id: null,
            isxz: "1724",
            lvalue: "20501231",
            meter: 30,
            model: null,
            modifyBy: "-1724",
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1.6",
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
            modifyTimeOptions: []
          },
          {
            areaId: null,
            areaName: "污水处理费",
            code: "201101",
            concentrator: "",
            connect: null,
            daytime: "1720351",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "丰源路上浦新村106号",
            flux: "288",
            getMeter: 17,
            id: null,
            isxz: "1727",
            lvalue: "20501231",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1.6",
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
            modifyTimeOptions: []
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
    // 搜索
    demand() {

    },
    // 下载模板
    downFile() {
      // var elemIF = document.createElement("iframe")
      // elemIF.src =  `${this.url}/fileDown.htm?importType=1`
      // elemIF.style.display = "none"
      // document.body.appendChild(elemIF)
    },
    // 上传模板 
    uploading() {
      // this.uploadingVisible = true
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
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },

  },

}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.backfillSubmitEdit1 {
  height: calc(100% - 10px);
  .submit_edit_left{
    padding-top: 10px;
    width: 27%;
    display: inline-block;
    float: left;
    border-right: 1.5px solid #eaf4ff;
    height: calc(100% - 10px);
    // border-bottom: none;
    .submit_edit_left_msg {
      font-size: 14px;
      border-bottom: 1.5px solid #eaf4ff;
      border-left: none;
      .msg_content {
        margin-left: 20px;
        padding-bottom: 10px;
        width: 100%;
      }
    }
    .submit_edit_left_content {
      font-size: 14px;
      padding-right: 15px;
      // border-bottom: 1.5px solid #EAF4FF;
      // border-right: 1.5px solid #EAF4FF;
      .el-input--mini{
        width: 85%;
        .el-input__inner,.el-select{
          width: 100% !important;
        }
      }
      .el-select{
        width: 100% !important;
      }
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .submit_edit_right{
    width: 72%;
    display: inline-block;
    .toolbar{
      padding:0px;
      .demo-form-inline{
        width: 100%;
        .el-form-item {
          width: 32%;
          margin-right: 0px;
          .el-form-item__content {
            width: calc(100% - 120px);
            .el-select,.el-input__inner{
              width: 100%;
            }
          }
        }
        .search{
          width: 50%;
          .el-form-item__content {
            width: calc(100% - 120px);
          }
        }
        .form-btn{
          width: 48%;
          .el-form-item__content{
            width: 100%;
          }
        }
      
     } 
    }
    
    
  }
  legend {
    background: #f5f5f5;
    font-weight: 700;
    font-size: 12px;
    padding: 5px 20px;
    font-size: 14px;
  }
  .backfillSubmitForm {
    padding: 0px 20px;
    // width: 95%;
    .el-form-item {
      width: 32%;

      .el-form-item__content {
        width: 50%;
        .el-select {
          width: 100%;
        }
      }
    }
    .kl-table .el-input__icon {
      line-height: 30px;
    }
  }
  .toolbar .el-form-item {
    margin-bottom: 0px;
  }
  .search {
    width: 32%;
    .el-form-item__content {
      width: calc(100% - 165px);
    }
  }
  .kl-table {
    padding: 0px;
  }
}
</style>
