<template>
  <div class="insideHandleInfo">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="operationShow == 1">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary" @click.native="submitEdit(0)">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:1.5%;">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="operationShow == 2">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary" @click.native="submitEdit(1)">提交</el-button>
        <el-button size="mini" type="primary">施工材料</el-button>
        <el-button size="mini" type="primary">工程暂停</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:1.5%;">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="operationShow == 3">
        <el-button size="mini" type="primary">上传附件</el-button>
        
        <el-button size="mini" type="primary" @click.native="submitEdit(2)">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:1.5%;">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="operationShow == 4">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary">施工材料</el-button>
        <el-button size="mini" type="primary" @click.native="submitEdit(3)">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:1.5%;">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if="operationShow == 5">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary" @click.native="submitEdit(4)">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:1.5%;">返回</el-button>
      </div>
      <div class="bread-contain-right" v-if='operationShow == 6'>
        <el-button size="mini" type="primary">上传附件</el-button>
        <!-- <el-button size="mini" type="primary">打印收据</el-button> -->
        <!-- <el-button size="mini" type="primary">打印发票</el-button> -->
        <el-button size="mini" type="primary" @click.native="submitEdit(5)">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus">处理意见</el-button>
        <el-button  icon="el-icon-caret-left" size="mini" @click="operationReturn" style="margin-right: 1.5%">返回</el-button>
      </div>
    </div>
    <div class="btn_box">
      <!-- <steps :step="step" :active="active"></steps> -->
      <el-steps :active="operationShow" finish-status="success">
        <el-step title="工程登记" @click.native="stepActive(1)">
          
        </el-step>
        <el-step title="勘察设计" @click.native="stepActive(2)"></el-step>
        <el-step title="工程预算" @click.native="stepActive(3)"></el-step>
        <el-step title="安装施工" @click.native="stepActive(4)"></el-step>
        <el-step title="工程验收" @click.native="stepActive(5)"></el-step>
        <el-step title="工程结算" @click.native="stepActive(6)"></el-step>
 
      </el-steps>
     
    </div>
    <!-- <steps :step="step" :active="active"></steps> -->

    <div class="operation_box" v-if="operationShow == 1">
      <!-- <span class="btnBox">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:3%;">返回</el-button>
      </span> -->
      <el-form :model="ruleForm" ref="form" :show-message="false" :rules="rules" label-width="120px">
        <div class="my-input">
          <el-form-item label="申请人：" prop="Applicant">
            <el-input v-model="ruleForm.Applicant" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="申请日期：" prop="applicantDate">
            <el-date-picker v-model="ruleForm.applicantDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="工程类型：" prop="engineerType">
            <el-select v-model="ruleForm.engineerType" clearable size="mini" style="width:100%">
              <el-option v-for="item in engineerTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="紧急程度：" prop="Emergency">
            <el-select v-model="ruleForm.Emergency" clearable size="mini" style="width:100%">
              <el-option label="不紧急" value="0"></el-option>
              <el-option label="紧急" value="1"></el-option>
              <!-- <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                </el-option> -->
            </el-select>
          </el-form-item>
        </div>
        <div class="my-input gocenter">
          <el-form-item label="用水地址：" prop="waterAddress">
            <el-input v-model="ruleForm.waterAddress" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input">
          <el-form-item label="联系人：" prop="Contacts">
            <el-input v-model="ruleForm.Contacts" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <!-- <div class="my-input">
            <el-form-item label="证件类型：" prop="documentType">
              <el-select v-model="ruleForm.documentType" clearable size="mini" style="width:100%">
                <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div> -->
        <div class="my-input">
          <el-form-item label="联系电话：" prop="contactNumber">
            <el-input v-model="ruleForm.contactNumber" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        
        <br>

        <div class="my-input gocenter" style="margin-bottom: 1%;">
          <el-form-item label="申请原因：" prop="applicationReasons">
            <el-input type="textarea" v-model="ruleForm.applicationReasons" style="width:100%"></el-input>
          </el-form-item>
        </div>
        <div class="my-input gocenter" style="margin-bottom: 1%;">
          <el-form-item label="派单说明：" prop="paymentNote">
            <el-input type="textarea" v-model="ruleForm.paymentNote" style="width:100%"></el-input>
          </el-form-item>
        </div>

      </el-form>
      <!-- <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list1" @cell-click="cellClick" class="wuserInfo-table">
          <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="time" min-width="100" label="时间"></el-table-column>
          <el-table-column prop="operator" min-width="80" label="操作人"></el-table-column>
          <el-table-column prop="disposal" min-width="150" label="处理意见" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" style="font-size:12px;text-align:center;">驳回</el-button>
              <el-button type="text" style="font-size:12px;text-align:center;">通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div> -->
      <el-dialog class="waterdialog" :close-on-click-modal="false" title="水表明细" :visible.sync="editContent">
        <el-form :model="dialogForm" ref="form" label-width="120px">
          <div class="my-input">
            <el-form-item label="用户编号：" prop="userNum">
              <el-input v-model="dialogForm.userNum" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="用户名称：" prop="userName">
              <el-input v-model="dialogForm.userName" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="用户地址：" prop="userAddress">
              <el-input v-model="dialogForm.userAddress" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="装表地址：" prop="meterAddress">
              <el-input v-model="dialogForm.meterAddress" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="街区：" prop="block">
              <el-input v-model="dialogForm.block" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="小区：" prop="village">
              <el-input v-model="dialogForm.village" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="册本号：" prop="bookNum">
              <el-input v-model="dialogForm.bookNum" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="联系人：" prop="Contacts">
              <el-input v-model="dialogForm.Contacts" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="联系电话：" prop="contactNumber">
              <el-input v-model="dialogForm.contactNumber" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="手机号码：" prop="phoneNumber">
              <el-input v-model="dialogForm.phoneNumber" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="证件类型：" prop="documentType">
              <el-select v-model="dialogForm.documentType" clearable size="mini" style="width:100%">
                <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="证件号码：" prop="documentNum">
              <el-input v-model="dialogForm.documentNum" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="装表日期：" prop="meterDate">
              <el-input v-model="dialogForm.documentNum" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="装表员：" prop="meterStaff">
              <el-input v-model="dialogForm.meterStaff" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="水表编号：" prop="meterNum">
              <el-input v-model="dialogForm.meterNum" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="水表口径：" prop="meterCaliber">
              <el-input v-model="dialogForm.meterCaliber" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="用水类型：" prop="waterType">
              <el-input v-model="dialogForm.waterType" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="供水合同：" prop="waterContract">
              <el-input v-model="dialogForm.waterType" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="是否加压：" prop="compression">
              <el-select v-model="dialogForm.compression" clearable size="mini" style="width:100%">
                <el-option key="0" label="是" value="0"></el-option>
                <el-option key="1" label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="押金：" prop="deposit">
              <el-input v-model="dialogForm.deposit" size="mini" clearable></el-input>
            </el-form-item>
          </div>
          <div class="my-input gocenter1">
            <el-form-item label="备注：" prop="remarks">
              <el-input type="textarea" v-model="dialogForm.remarks" style="width:100%"></el-input>
            </el-form-item>
          </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- 1px solid #ebeef5  -->
          <div class="sub" style="text-align:center;">
            <el-button type="primary" style="margin-right:10px;" size="mini">保存</el-button>
            <el-button @click="editContent = false" size="mini">返回</el-button>
            <!-- <div style="text-align:center;"><span style="color:#FF0000;">上传附件，请先保存</span></div> -->
          </div>
        </span>
      </el-dialog>
    </div>

    <div class="operation_box" v-if="operationShow == 2">
      <!-- <span class="btnBox">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" type="primary">暂不安装</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:3%;">返回</el-button>
      </span> -->
      <el-form :model="ruleForm1" ref="form" :rules="rules" label-width="120px">
        <div class="my-input1">
          <el-form-item label="工程名称：" prop="projectName">
            <el-input v-model="ruleForm1.projectName" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1" style="padding-left: 9.6%">
          <el-checkbox v-model="ruleForm1.checked">需要办破路手续</el-checkbox>
          <el-checkbox v-model="ruleForm1.checked2">超标高</el-checkbox>
        </div>
        <div class="my-input1">
          <el-form-item label="勘察人员：" prop="surveyors">
            <el-input v-model="ruleForm1.surveyors" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="勘察日期：" prop="investigationDate">
            <el-date-picker v-model="ruleForm1.investigationDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1 gocenter2">
          <el-form-item label="勘察结论：" prop="investigationConclusion">
            <el-input type="textarea" v-model="ruleForm1.investigationConclusion" style="width:100%"></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="设计人员：" prop="designer">
            <el-input v-model="ruleForm1.designer" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="设计日期：" prop="designDate">
            <el-date-picker v-model="ruleForm1.designDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1 gocenter2" style="margin-bottom: 1%;">
          <el-form-item label="设计说明：" prop="designInstructions">
            <el-input type="textarea" v-model="ruleForm1.designInstructions" style="width:100%"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list1" @cell-click="cellClick" class="wuserInfo-table">
          <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="time" min-width="100" label="时间"></el-table-column>
          <el-table-column prop="node" min-width="80" label="节点"></el-table-column>
          <el-table-column prop="operator" min-width="80" label="操作人"></el-table-column>
          <el-table-column prop="operation" min-width="80" label="操作"></el-table-column>
          <el-table-column prop="disposal" min-width="150" label="处理意见" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enclosure" min-width="100" label="附件" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div> -->
    </div>

    <div class="operation_box" v-if="operationShow == 3">
      <!-- <span class="btnBox">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary">施工材料</el-button>
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:3%;">返回</el-button>
      </span> -->
      <el-form :model="ruleForm2" ref="form" :rules="rules" label-width="120px">
        <!-- <div class="my-input1">
          <el-form-item label="表前预算：" prop="preTableBudget">
            <el-input v-model="ruleForm2.preTableBudget" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="表后预算：" prop="postTableBudget">
            <el-input v-model="ruleForm2.postTableBudget" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="其他预算：" prop="otherBudgets">
            <el-input v-model="ruleForm2.otherBudgets" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="设计费：" prop="designFee">
            <el-input v-model="ruleForm2.designFee" size="mini" clearable></el-input>
          </el-form-item>
        </div> -->
        <div class="my-input1">
          <el-form-item label="预算合计：" prop="total">
            <el-input v-model="ruleForm2.total" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <!-- <div class="my-input1">
          <el-form-item label="押金：" prop="deposit">
            <el-input v-model="ruleForm2.deposit" size="mini" clearable></el-input>
          </el-form-item>
        </div> -->
        <div class="my-input1">
          <el-form-item label="编制人员：" prop="staffingStaff">
            <el-input v-model="ruleForm2.staffingStaff" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="编制日期：" prop="compileDate">
            <el-date-picker v-model="ruleForm2.compileDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1 gocenter2" style="margin-bottom: 1%;">
          <el-form-item label="编制说明：" prop="compilationNotes">
            <el-input type="textarea" v-model="ruleForm2.compilationNotes" style="width:100%"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list1" @cell-click="cellClick" class="wuserInfo-table">
          <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="time" min-width="100" label="时间"></el-table-column>
          <el-table-column prop="node" min-width="80" label="节点"></el-table-column>
          <el-table-column prop="operator" min-width="80" label="操作人"></el-table-column>
          <el-table-column prop="operation" min-width="80" label="操作"></el-table-column>
          <el-table-column prop="disposal" min-width="150" label="处理意见" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enclosure" min-width="100" label="附件" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div> -->
    </div>

    <div class="operation_box receivables" v-if="operationShow == 4">
      <!-- <span class="btnBox">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary">施工材料</el-button>
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:3%;">返回</el-button>
      </span> -->
      <el-form :model="ruleForm3" ref="form" :rules="rules" label-width="120px">
        <div class="my-input1">
          <el-form-item label="派单日期：" prop="paymentDate">
            <el-date-picker v-model="ruleForm3.paymentDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="施工班组：" prop="constructionTeam">
            <el-input v-model="ruleForm3.constructionTeam" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="开始施工日期：" prop="beginConstructionDate">
            <el-date-picker v-model="ruleForm3.beginConstructionDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="结束施工日期：" prop="endConstructionDate">
            <el-date-picker v-model="ruleForm3.endConstructionDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1 gocenter2" style="margin-bottom: 1%;">
          <el-form-item label="施工说明：" prop="constructionInstructions">
            <el-input type="textarea" v-model="ruleForm3.constructionInstructions" style="width:100%"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list1" @cell-click="cellClick" class="wuserInfo-table">
          <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="time" min-width="100" label="时间"></el-table-column>
          <el-table-column prop="node" min-width="80" label="节点"></el-table-column>
          <el-table-column prop="operator" min-width="80" label="操作人"></el-table-column>
          <el-table-column prop="operation" min-width="80" label="操作"></el-table-column>
          <el-table-column prop="disposal" min-width="150" label="处理意见" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enclosure" min-width="100" label="附件" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div> -->
    </div>

    <div class="operation_box" v-if="operationShow == 5">
      <!-- <span class="btnBox">
        <el-button size="mini" type="primary">上传附件</el-button>
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="approvalShow = true">处理意见</el-button>
        <el-button size="mini" icon="el-icon-caret-left" @click="operationReturn" style="margin-right:3%;">返回</el-button>
      </span> -->
      <el-form :model="ruleForm4" ref="form" :rules="rules" label-width="120px">
        <div class="my-input1">
          <el-form-item label="验收人员：" prop="acceptancePersonnel">
            <el-input v-model="ruleForm4.acceptancePersonnel" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="验收日期：" prop="acceptanceDate">
            <el-date-picker v-model="ruleForm4.acceptanceDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1 gocenter2" style="margin-bottom: 1%;">
          <el-form-item label="验收说明：" prop="acceptanceNote">
            <el-input type="textarea" v-model="ruleForm4.acceptanceNote" style="width:100%"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list1" @cell-click="cellClick" class="wuserInfo-table">
          <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="time" min-width="100" label="时间"></el-table-column>
          <el-table-column prop="node" min-width="80" label="节点"></el-table-column>
          <el-table-column prop="operator" min-width="80" label="操作人"></el-table-column>
          <el-table-column prop="operation" min-width="80" label="操作"></el-table-column>
          <el-table-column prop="disposal" min-width="150" label="处理意见" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enclosure" min-width="100" label="附件" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div> -->
    </div>

    <div class="operation_box" v-if="operationShow == 6">
      <el-form :model="ruleForm6" ref="form" :rules="rules" label-width="120px">
        <div class="my-input1">
          <el-form-item label="结算合计：" prop="settlementTotal">
            <el-input v-model="ruleForm6.settlementTotal" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="编制人员：" prop="staffingStaff">
            <el-input v-model="ruleForm6.staffingStaff" size="mini" clearable></el-input>
          </el-form-item>
        </div>
        <div class="my-input1">
          <el-form-item label="编制日期：" prop="compileDate">
            <el-date-picker v-model="ruleForm1.compileDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-input1 gocenter2" style="margin-bottom: 1%;">
          <el-form-item label="编制说明：" prop="compilationNotes">
            <el-input type="textarea" v-model="ruleForm6.compilationNotes" style="width:100%"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!-- <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="工程登记" name="first">

      </el-tab-pane>

      <el-tab-pane label="勘察设计" name="second">

      </el-tab-pane>

      <el-tab-pane label="编制预算" name="third">

      </el-tab-pane>

      <el-tab-pane label="安装施工" name="four" class="receivables">

      </el-tab-pane>

      <el-tab-pane label="工程验收" name="five">

      </el-tab-pane>
    </el-tabs> -->
    <el-dialog class="waterdialog" :close-on-click-modal="false" title="审批流程" :visible.sync="approvalShow">
      <div class="kl-table">
        <el-table style="margin-top: 3%" v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list1" @cell-click="cellClick" class="wuserInfo-table">
          <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="time" min-width="100" label="时间"></el-table-column>
          <!-- <el-table-column prop="node" min-width="80" label="节点"></el-table-column> -->
          <el-table-column prop="operator" min-width="80" label="操作人"></el-table-column>
          <!-- <el-table-column prop="operation" min-width="80" label="操作"></el-table-column> -->
          <el-table-column prop="disposal" min-width="150" label="处理意见" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" style="font-size:12px;text-align:center;">驳回</el-button>
              <el-button type="text" style="font-size:12px;text-align:center;">通过</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="enclosure" min-width="100" label="附件" show-overflow-tooltip></el-table-column> -->
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="approvalShow = false" size='mini'>返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import steps from "@/components/Steps"
export default {
  components: {
    steps
  },
  data() {
    return {
      crumbsData: { //面包屑
        titleList: [
          { title: '工程中心', path: '/EngineeringCenter' },
          { title: '内部工程', path: '/insideEngineeringRegistration' },
          { title: '处理中', method: () => { window.histroy.back() } },
          { title: '办理', method: () => { window.histroy.back() } }
        ],
      },
      activeName: 'first',
      active: 3,
      operationShow: 1,
      rules: {
        Applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        applicantDate: [
          { required: true, message: '请输入申请日期', trigger: 'blur' }
        ],
        engineerType: [
          { required: true, message: '请选择工程类型', trigger: 'change' }
        ],
        Contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        documentType: [
          { required: true, message: '请输入证件类型', trigger: 'blur' }
        ],
        documentNumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        Emergency: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
      },
      ruleForm: {
        Applicant: '',
        applicantDate:'',
        engineerType: 1,
        Contacts:'',
        contactNumber:'',
        Emergency: '0',
        applicationReasons:'',
        paymentNote:'',
        waterAddress:'',
      },
      ruleForm1: {
        projectName:'',
        checked:false,
        checked2:false,
        surveyors:'',
        investigationDate:'',
        investigationConclusion:'',
        designer:'',
        designDate:'',
        designInstructions:'',
      },
      ruleForm2: {
        total:'',
        staffingStaff:'',
        compileDate:'',
        compilationNotes:'',
      },
      ruleForm3: {
        paymentDate:'',
        constructionTeam:'',
        beginConstructionDate:'',
        endConstructionDate:'',
        constructionInstructions:'',
      },
      ruleForm4: {
        acceptancePersonnel:'',
        acceptanceDate:'',
        acceptanceNote:'',
      },
      ruleForm6: {
        settlementTotal:'',
        staffingStaff:'',
        compileDate:'',
        compilationNotes:'',
      },
      dialogForm: {},
      options6: [
        {
          value: 12,
          label: '用水报装'
        },
      ],
      engineerTypeList: [
        {
          value: 1,
          label: '小管道工程'
        },
        {
          value: 2,
          label: '大管道工程'
        },
        {
          value: 3,
          label: '维修'
        },
        {
          value: 4,
          label: '其他工程'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      editContent: false,
      refundMode: '1',
      step: [
        {
          num: 1,
          title: "工程登记"
        },
        {
          num: 2,
          title: "勘察设计"
        },
        {
          num: 3,
          title: "工程预算"
        },
        {
          num: 4,
          title: "安装施工"
        },
        {
          num: 5,
          title: "工程验收"
        },
        {
          num: 6,
          title: "工程结算"
        },


      ],
      active: 3,
      approvalShow: false,
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    // this.$changeTable(this, '.userInfo .kl-table', ['.userInfo .toolbar', '.userInfo .block', '.userInfo bread-contain'])

    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.engineer-center .engineer-center-right', ['.engineer-center .table-top'])
    })
    eventBus.$on('operation', (item) => {
      this.operationShow = item.num;
    });
    // console.log(window.location.href.split('#')[1]);
    if(window.location.href.split('#')[1] == '/insideProcessingCompleted'){
      this.$set(this.crumbsData.titleList,"2",{title:'处理完成',method:()=>{window.histroy.back()}})
    }else if(window.location.href.split('#')[1] == '/insideAllProjects'){
      this.$set(this.crumbsData.titleList,"2",{title:'全部工程',method:()=>{window.histroy.back()}})
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
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
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
          },
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
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
          },
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
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
          },
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
            getMeter: 1,
            id: null,
            isxz: "未抄",
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
          }
        ],
        list1: [
          {
            time: '2019-06-21 16:27:35',
            node: '工程登记',
            operator: '张三',
            operation: '通过',
            disposal: '尽快完成',
            enclosure: '无',
          },
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
    submitEdit(num){
      if(num == 0){
        console.log(this.ruleForm);
      }else if(num == 1){
        console.log(this.ruleForm1);
      }else if(num == 2){
        console.log(this.ruleForm2);
      }else if(num == 3){
        console.log(this.ruleForm3);
      }else if(num == 4){
        console.log(this.ruleForm4);
      }else if(num == 5){
        console.log(this.ruleForm6);
      }
    },
    handleClick(item) {
      // this.active = Number(item.index);
    },
    operationReturn() {
      eventBus.$emit('insideOperationReturn', false);
    },
    stepActive(val){
      this.operationShow = val;
     
    },
  },
}
</script>
<style lang="scss">
.insideHandleInfo {
  height: 100%;
  .Steps > ul li b {
    font-size: 14px;
  }
  .Steps > ul li span {
    font-size: 13px;
  }
  .Steps {
    width: 100%;
    // margin: auto;
    margin-top: 10px;
    margin-left: 15px;
    display: inline-block;
    .stepCon {
      cursor: pointer;
    }
  }
  .btn_box {
    width: 98%;
    height: 58px;
    border-bottom: 1px solid #dcdfe6;
    margin:5px auto;
    .topclose {
      background: white;
      color: black;
      border: 1px solid #dcdfe6;
      float: left;
      margin-top: 10px;
      margin-left: 16px;
    }
  }
  .el-tabs {
    height: 94%;
  }
  .el-tabs__content {
    height: 100%;
  }
  .el-tab-pane {
    height: 100%;
  }

  .el-tabs__content {
    height: 100% !important;
  }
  .el-tabs--border-card {
    box-shadow: none !important;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
  .my-input {
    width: 22%;
    display: inline-block;
    padding-left: 2%;
    margin-top: 0.5%;
    .el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 0px !important;
    }
  }
  .my-input .el-input {
    width: 100% !important;
  }
  .my-input .el-input__inner {
    width: 100% !important;
    height: 28px;
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .my-input1 {
    width: 35%;
    display: inline-block;
    padding-left: 8%;
    margin-top: 0.5%;
    .el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 0px !important;
    }
    .el-checkbox__label {
      font-size: 14px !important;
    }
    .el-checkbox{
      width: 7rem;
    }
  }
  .my-input1 .el-input {
    width: 100% !important;
  }
  .my-input1 .el-input__inner {
    width: 100% !important;
    height: 28px;
  }
  .my-input1 .el-select .el-input {
    width: 100%;
  }
  .gocenter {
    width: 46.3%;
  }
  .gocenter1 {
    width: 83.5%;
  }
  .gocenter2 {
    width: 78.4%;
  }
  .gocenter .el-form-item__label {
    // text-align: center !important;
  }
  .gocenter .el-textarea__inner {
    min-height: 50px !important;
  }
  .btnBox {
    display: inline-block;
    width: 100%;
    margin-top:.8rem;
    margin-bottom: .8%;
    text-align: right;
  }
  .btnBox .el-button {
    margin-left: .8%;
    font-size: 14px;
  }
  .engineer-center-right-content {
    height: 87%;
    overflow-y: auto;
  }
  .kl-table {
    padding: 0px 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .btnBox1 {
    display: inline-block;
    width: 100%;
    margin-bottom: 1%;
  }
  .btnBox1 span {
    font-size: 14px;
    margin-left: 1.5%;
  }
  .el-dialog__body {
    padding: 0px 20px !important;
    height: calc(100% - 124px) !important;
  }
  .el-dialog__footer .el-button {
    font-size: 14px;
  }
  .el-tabs__content {
    overflow-y: auto;
  }
  .receivables .el-form-item__label {
    width: 110px !important;
  }
  .receivables .el-form-item__content {
    margin-left: 110px !important;
  }
  .el-tabs__content {
    height: 82.5% !important;
  }
  // .Steps {
  //   width: 750px;
  //   margin: 0 auto;
  //   margin-top: 15px;
  // }
  .operation_box {
    height: 75%;
    overflow: auto;
  }
}
</style>