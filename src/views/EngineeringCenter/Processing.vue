<template>
  <div>
    <!-- 弹出表单选择客户 -->
    	<el-dialog :title="choosectmName" :visible.sync="choosectmVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
            <choosectm
                ref="childWaterEditor" 
                
            ></choosectm>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
		    </div>
    	</el-dialog>
      <!-- 弹出表单选择账户 -->
    	<el-dialog :title="chooseAccountName" :visible.sync="chooseAccountVisible" :close-on-click-modal="false" class="addDialog" @close="closechoosectm">
            <chooseAccount
                ref="childWaterEditor" 
                
            ></chooseAccount>
    		<div slot="footer" class="dialog-footer" ref="ruleForm">
		      <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
		      <el-button type="info" size="mini" plain @click="closechoosectm">取 消</el-button>
		    </div>
    	</el-dialog>
      <div v-show="handleContent">
        <handleInfo  @chooseCtm="choosectm" @chooseAccount="chooseAccount"></handleInfo>
      </div>
      <div v-show="EngContent">
        <EngineeringRegistration></EngineeringRegistration>
      </div>
    
  
  
    <div class="Processing" v-show="ProcessingCon">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <!-- <h2 class="tab-title">
          <i></i>
          处理中</h2> -->
          <div class="bread-contain-right">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
          </div>
      </div>
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline" style="padding: 10px 20px 0;">
        <el-form-item label="申请日期：">
          <el-date-picker :editable="false" size="mini" v-model="formData.dataList" style="width:206px" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="信息来源：">
          <el-select v-model="formData.information" size="mini">
            <el-option v-for="item in inforList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工程类型：">
          <el-select v-model="formData.engineeringType" size="mini">
            <el-option v-for="item in engineeringTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态：">
          <el-select v-model="formData.processNode" size="mini">
            <!-- <el-option label="所有" value="0"></el-option> -->
            <el-option v-for="item in processNodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模糊查询：">
          
            <el-tooltip class="item" effect="dark" content="工程编号、用水地址、申请人、联系人、联系电话" placement="top">
              <el-input v-model="formData.inputContent"></el-input>
            </el-tooltip>
          <!-- <el-select class="searchType" v-model="formData.searchType" placeholder="请选择搜索类型">
            <el-option label="工程编号" value='1'></el-option>
            <el-option label="用水地址" value='2'></el-option>
            <el-option label="申请人" value='3'></el-option>
            <el-option label="联系人" value='4'></el-option>
            <el-option label="联系电话" value='5'></el-option>
          </el-select>
          <el-input placeholder="请输入搜索内容" v-model="formData.inputContent" size="mini"></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button style="background:#faa646;color:#fff;" @click="formDataSearch()" icon="el-icon-search"></el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <!-- <el-button type="primary" size="mini" icon="el-icon-upload2">导出</el-button> -->
        </el-form-item>
      </el-form>

      <div class="kl-table">
        <el-table stripe border :data="tableData" class="change-tables-table">

          <el-table-column type="index" fixed="left" label="NO." width="50" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="engineeringState" min-width="100" label="审批状态">
          </el-table-column>

          <el-table-column prop="engineeringType" min-width="180" label="工程类型">
          </el-table-column>

          <el-table-column prop="engineeringCode" min-width="80" label="工程编号">

          </el-table-column>

          <el-table-column prop="engineeringTime" min-width="100" label="申请日期">
          </el-table-column>

          <el-table-column prop="engineeringName" min-width="80" label="工程名称">
          </el-table-column>

          <el-table-column prop="userName" min-width="80" label="业主名称">
          </el-table-column>

          <el-table-column prop="userPeople" min-width="80" label="联系人">
          </el-table-column>

          <el-table-column prop="telphone" min-width="120" label="联系电话" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="address" min-width="100" label="用水地址" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="userLevel" min-width="100" label="用户类型" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="useLevel" min-width="100" label="紧急程度" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="waterTime" min-width="100" label="用水期" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="waterNum" min-width="100" label="装表数量" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="85">
            <template slot-scope="scope">
              <el-button type="text" @click.native="edit()" style="font-size:12px;">办理</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
      <!-- <el-dialog id="dialogBox" :close-on-click-modal="false" title="办理详情" :visible.sync="handleContent">
        <handleInfo v-if="handleContent"></handleInfo>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import handleInfo from '../EngineeringCenter/handleInfo'
import choosectm from "@/components/ctmInfor"
import chooseAccount from "@/components/accountInfo"
import EngineeringRegistration from "./EngineeringRegistration"
export default {
  name: "Processing",
  components: {
    handleInfo,
    choosectm,
    chooseAccount,
    EngineeringRegistration
  },
  data() {
    return {
      chooseAccountName:"选择账户",
      chooseAccountVisible:false,
      choosectmName:"选择客户",
      choosectmVisible:false,
      tableData:[
        {
          engineeringState:'未审批',
          engineeringType:'-',
          engineeringCode:"SS00001",
          engineeringTime:'2019/07/19',
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
          engineeringCode:"SS00002",
          engineeringTime:'2019/07/20',
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
          engineeringCode:"SS00003",
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
          { title: '用户工程', path: '/EngineeringCenter' },
          { title: '处理中', method: () => { window.histroy.back() } }
        ],
      },
      inforList: [
        { value: 1, label: '全部' },
        { value: 2, label: '柜台' },
        { value: 3, label: '网厅' },
        { value: 4, label: '微厅' },
        { value: 5, label: 'APP' },
        { value: 6, label: '自助机' },
      ],
      information: 1,
      engineeringTypeList: [
        { value: 1, label: '全部' },
        { value: 2, label: '用水报装' },
        { value: 3, label: '户表改造' }
      ],
      engineeringType: 1,
      processNodeList: [
        { value: 1, label: '全部' },
        { value: 2, label: '已审批' },
        { value: 3, label: '未审批' }
      ],
      processNode: 1,
      inputContent: '',
      searchType: '1',
      formData: {
        dataList: "",
        information:'',
        engineeringType:'',
        processNode:'',
        searchType:'',
        inputContent: ""
      },
      histroyData: {},
      dataList: [],
      handleContent: false,
      ProcessingCon:true,
      EngContent:false,
    }
    
    
  },
  mounted() {
    this.init();
    // 接收handleinfo的返回
    eventBus.$on('operationReturn', (bool) => {
      this.handleContent = bool;
      this.ProcessingCon = !bool;
      if(!bool){
        this.crumbsData.titleList.pop();
      }
    });
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
    edit(){
      this.handleContent = true;
      this.ProcessingCon = false;
      this.$set(this.crumbsData.titleList,"3",{title:'办理',method:()=>{window.histroy.back()}});
    },
    formDataSearch(){//查询
    },
    closeDialog() { //关闭会话
      this.waterChoooseVisible = false;
      
      this.ProcessingCon = true;
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
    closechoosectm(){
      this.choosectmVisible = false;
      this.chooseAccountVisible = false;
      this.EngContent = false;
      this.ProcessingCon = true;
    },
    choosectm(){
      this.choosectmVisible = true;
    },
    chooseAccount(){
      this.chooseAccountVisible = true;
    },
    add(){
      this.EngContent = true;
      this.ProcessingCon = false;
      this.$set(this.crumbsData.titleList,"3",{title:'添加',method:()=>{window.histroy.back()}});
    }
  }
}
</script>

<style lang="scss">
.Processing {
  .kl-table {
    padding: 0 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
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

  
}
</style>
