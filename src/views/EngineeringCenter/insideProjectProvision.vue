<template>
  <div class="insideProjectProvision">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <!-- <h2 class="tab-title">
        <i></i>
        工程计提</h2> -->
      <div class="bread-contain-right">
        <el-button type="primary" size="mini" icon="el-icon-upload2" style="margin-right: 1.5%">导出</el-button>
      </div>
    </div>
    <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline" style="padding: 10px 20px 0;">
      <el-form-item label="验收日期：">
        <el-date-picker :editable="false" size="mini" v-model="formData.dataList" style="width:206px" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="信息来源：">
        <el-select v-model="information" size="mini">
          <el-option v-for="item in inforList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="工程类型：">
        <el-select v-model="formData.engineeringType" size="mini">
          <el-option v-for="item in engineeringTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="流程节点：">
        <el-select v-model="processNode" size="mini">
          <el-option v-for="item in processNodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      
      
      
      <el-form-item label="模糊查询：">
        
          <el-tooltip class="item" effect="dark" content="工程编号、工程名称、申请人、联系人、联系电话" placement="top">
            <el-input v-model="formData.inputContent"></el-input>
          </el-tooltip>
      <!-- <el-form-item label="查询条件：">
        <el-select class="searchType" v-model="formData.searchType" placeholder="请选择">
          <el-option v-for="item in searchTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="请输入搜索内容" v-model="formData.inputContent" size="mini"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button style="background:#faa646;color:#fff;" @click="search" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <!-- <el-button type="primary" size="mini" icon="el-icon-upload2">导出</el-button> -->
      </el-form-item>
    </el-form>

    <div class="kl-table">
      <el-table stripe border :data="tableData" class="change-tables-table">

        <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed>
        </el-table-column>

        <!-- <el-table-column prop="daytime" min-width="100" label="流程节点">
        </el-table-column> -->

        <el-table-column prop="engineeringCode" min-width="80" label="工程编号">
        </el-table-column>

        <el-table-column prop="engineeringType" min-width="80" label="工程类型">
        </el-table-column>

        <el-table-column prop="engineeringName" min-width="80" label="工程名称">
        </el-table-column>

        <el-table-column prop="userName" min-width="80" label="业主名称">
        </el-table-column>

        <el-table-column prop="address" min-width="100" label="用水地址" show-overflow-tooltip>
        </el-table-column>

        <!-- <el-table-column prop="userPeople" min-width="80" label="联系人">
        </el-table-column> -->

        <el-table-column prop="engineeringTime" min-width="100" label="验收日期">
        </el-table-column>

        <el-table-column prop="userPeople1" min-width="80" label="材料费用">
        </el-table-column>

        <el-table-column prop="userPeople2" min-width="80" label="人工费用">
        </el-table-column>
        
        <el-table-column prop="userPeople3" min-width="80" label="税前合计">
        </el-table-column>

        <el-table-column prop="userPeople4" min-width="80" label="应纳税额">
        </el-table-column>

        <el-table-column prop="userPeople5" min-width="80" label="税后金额">
        </el-table-column>

        <el-table-column prop="userPeople6" min-width="80" label="提成金额">
        </el-table-column>

        <el-table-column prop="telphone7" min-width="80" label="施工班组" show-overflow-tooltip>
        </el-table-column>

        <!-- <el-table-column prop="position" min-width="100" label="用户类型" show-overflow-tooltip>
        </el-table-column> -->

        <!-- <el-table-column prop="useLevel" min-width="100" label="紧急程度" show-overflow-tooltip>
        </el-table-column> -->

        <el-table-column label="操作"  width="180" fixed="right">
          <!-- fixed="right" -->
          <template slot-scope="scope">
            <el-button type="text" size="mini">材料费</el-button>
            <span class="lineBox">
              <div class="line"></div>
            </span>
            <el-button type="text" size="mini">人工费</el-button>
            <span class="lineBox">
              <div class="line"></div>
            </span>
            <el-button type="text" size="mini">施工班组</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <div class="block">
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
        </el-pagination> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "insideProjectProvision",
  components: {

  },
  data() {
    return {
      tableData:[
        {
          engineeringState:'未审批',
          engineeringType:'-',
          engineeringCode:"SS00001",
          engineeringTime:'2019/07/21',
          engineeringName:'-',
          userName:'焦文',
          userPeople:'丁文',
          telphone:'15566778899',
          address:'东深小区',
          userLevel:'-',
          useLevel:'不紧急',
          waterTime:'-',
          waterNum:'1000',
        },
        {
          engineeringState:'未审批',
          engineeringType:'-',
          engineeringCode:"SS00001",
          engineeringTime:'2019/07/21',
          engineeringName:'-',
          userName:'焦文',
          userPeople:'丁文',
          telphone:'15566778899',
          address:'东深小区',
          userLevel:'-',
          useLevel:'不紧急',
          waterTime:'-',
          waterNum:'1000',
        },
        {
          engineeringState:'未审批',
          engineeringType:'-',
          engineeringCode:"SS00001",
          engineeringTime:'2019/07/21',
          engineeringName:'-',
          userName:'焦文',
          userPeople:'丁文',
          telphone:'15566778899',
          address:'东深小区',
          userLevel:'-',
          useLevel:'不紧急',
          waterTime:'-',
          waterNum:'1000',
        },
      ],
      crumbsData: { //面包屑
        titleList: [
          { title: '工程中心', path: '/EngineeringCenter' },
          { title: '内部工程', path: '/insideEngineeringRegistration' },
          { title: '工程计提', method: () => { window.histroy.back() } }
        ],
      },
      inforList: [
        { value: 1, label: '柜台' },
        { value: 2, label: '网厅' },
        { value: 3, label: '微厅' },
        { value: 4, label: 'APP' },
        { value: 5, label: '自助机' },
      ],
      engineeringTypeList: [
        { value: 1, label: '全部' },
        { value: 2, label: '用水报装' },
        { value: 3, label: '户表改造' }
      ],
      processNodeList: [
        { value: 1, label: '全部' },
        { value: 2, label: '工程登记' },
        { value: 3, label: '勘察设计' }
      ],
      searchTypeList:[
        { value: 1, label: '工程编号'},
        { value: 2, label: '工程名称'},
        { value: 3, label: '业主名称'},
        { value: 4, label: '用水地址'},
        // { value: 5, label: '联系电话'},
      ],
      formData: {
        processNode: 1,
        inputContent: '',
        searchType: 1,
        dataList: [],
        engineeringType: 1,
        information: 1,
      },
      histroyData: {},
      handleContent: false,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.formData = {
      //   watermeterWarehouse: "",
      //   watermeterWarehouseOptions: [],
      //   con: "",
      //   reason: ""
      // };
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {},
          {},
          {},
          {}
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
    search(){//查询
      console.log(this.formData);
    },
    closeDialog() { //关闭会话
      this.waterChoooseVisible = false
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.waterChoooseVisible = false;
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
  }
}
</script>

<style lang="scss">
.insideProjectProvision {
  .kl-table {
    padding: 0 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
    .el-table  td {
      // .el-table__body-wrapper .el-table__body
      padding: 6px 0 !important;
    }
  }
  .searchType .el-input input {
    width: 120px;
  }
  .el-form-item__content .el-input {
    width: auto;
  }
  .el-input--mini /deep/ .el-input__inner {
    width: 110px;
  }
  .el-dialog__body {
    padding: 0 20px;
    height: calc(100% - 65px) !important;
    overflow: hidden !important;
  }
  .lineBox {
    display: inline-block;
    height: 100%;
  }
  .line {
    display: inline-block;
    background: #409eff;
    width: 1px;
    height: 12px;
    vertical-align: middle;
  }
}
</style>
