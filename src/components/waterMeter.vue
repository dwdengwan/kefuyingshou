<template>
  <!-- 工程中心-多水表录入 -->
  <div class="water-meter">
      <span class="btnBox1">
        <span>水表明细</span>
      </span>
      <div class="kl-table">
        <el-table 
                v-if="tableShow" 
                :max-height="maxHeight" 
                stripe border 
                :data="tableData" 
                @cell-click="cellClick" 
                class="wuserInfo-table">
          <!-- <el-table-column type="selection" fixed="left" width="55"></el-table-column> -->
          <el-table-column type="index" fixed="left" label="NO." width="50" :index="indexMethod"></el-table-column>
          
          <el-table-column prop="userName1" min-width="120" label="用户编号" v-if="isShow">
            <template slot-scope="scope">
              <el-input v-model="scope.row.userName1" disabled>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="userName" min-width="120" label="用户名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.userName" :disabled="isEdit">
              </el-input>
            </template>
          </el-table-column>
          
          <el-table-column prop="userAddress" min-width="120" label="用户地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.userAddress" :disabled="isEdit">
              </el-input>
            </template>
          </el-table-column>
          
          <el-table-column prop="meterAddress" min-width="120" label="装表地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.meterAddress" :disabled="isEdit">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="linkMan" min-width="120" label="联系人" v-if="isShow">
            <template slot-scope="scope">
              <el-input v-model="scope.row.linkMan">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="linkTel" min-width="120" label="联系电话" v-if="isShow">
            <template slot-scope="scope">
              <el-input v-model="scope.row.linkTel">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="linkTelNum" min-width="120" label="手机号码" v-if="isShow">
            <template slot-scope="scope">
              <el-input v-model="scope.row.linkTelNum">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="bookNum" min-width="120" label="册本号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bookNum" :disabled="isEdit">
              </el-input>
            </template>
          </el-table-column>
          
          <el-table-column prop="documentType" min-width="200" label="证件类型">
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.documentType" :disabled="isEdit"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                <!-- <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option> -->
                <el-option label="居民身份证" value="0"></el-option>
                <el-option label="护照" value="1"></el-option>
                <el-option label="户口本" value="2"></el-option>
                <el-option label="回乡证" value="3"></el-option>
                <el-option label="台胞证" value="4"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="documentNum" min-width="240" label="证件号码">
            <template slot-scope="scope">
              <el-input 
                v-model="scope.row.documentNum" 
                size="mini" :disabled="isEdit"
                clearable 
                class='idCard'>
                <el-button slot="append" icon="el-icon-reading" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="meterDate" min-width="180" label="装表日期">
            <template slot-scope="scope">
              <el-date-picker 
                v-model="scope.row.meterDate" 
                type="date" 
                placeholder="选择日期" 
                :disabled="isEdit">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column prop="meterStaff" min-width="120" label="装表员">
            <template slot-scope="scope">
              <el-input v-model="scope.row.meterStaff" :disabled="isEdit">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="meterNum" min-width="120" label="水表编号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.meterNum">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="meterCaliber" min-width="120" label="水表口径">
            <template slot-scope="scope">
              <el-select v-model="scope.row.meterCaliber" @keyup.esc.native="cancel(scope.$index, scope.row)" disabled>
                <el-option v-for="item in meterCaliberType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="waterType" min-width="160" label="用水类型">
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.waterType" 
                @keyup.esc.native="cancel(scope.$index, scope.row)"
                :disabled="isEdit">
                <el-option 
                  v-for="item in waterDataType" 
                  :key="item.value" 
                  :label="item.label" 
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column prop="compression" min-width="120" label="是否加压">
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.compression" 
                @keyup.esc.native="cancel(scope.$index, scope.row)"
                :disabled="isEdit">
                <el-option 
                  v-for="item in compressionType" 
                  :key="item.value" 
                  :label="item.label" 
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column prop="deposit" min-width="120" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.deposit" :disabled="isEdit">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="85">
            <template slot-scope="scope">
              <el-button type="text" @click.native="editEditContent(scope.row)" style='font-size:12px;'>编辑</el-button>
              <span style="color:#e6e6e6;" v-if="!isEdit">|</span>
              <el-button 
                type="text" 
                style='font-size:12px;' 
                @click.native="delEditContent(scope.$index)" 
                v-if="!isEdit">
              删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <div class="block">
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination> -->
        </div>

      </div>
      <el-dialog class="waterdialog" :close-on-click-modal="false" title="水表明细-编辑" :visible.sync="editContent1">
        <el-form :model="dialogForm" ref="form" label-width="100px">
          <el-row>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="用户编号：" prop="userNum">
                  <el-input v-model="dialogForm.userNum" size="mini" clearable disabled></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="用户名称：" prop="userName">
                  <el-input v-model="dialogForm.userName" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="用户地址：" prop="userAddress">
                  <el-input v-model="dialogForm.userAddress" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="装表地址：" prop="meterAddress">
                  <el-input v-model="dialogForm.meterAddress" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="册本号：" prop="bookNum">
                  <el-input v-model="dialogForm.bookNum" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="证件类型：" prop="documentType">
                  <el-select v-model="dialogForm.documentType" clearable size="mini" style="width:100%">
                    <!-- <el-option v-for="item in documentTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option> -->
                    <el-option label="居民身份证" value="0"></el-option>
                    <el-option label="护照" value="1"></el-option>
                    <el-option label="户口本" value="2"></el-option>
                    <el-option label="回乡证" value="3"></el-option>
                    <el-option label="台胞证" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="证件号码：" prop="documentNum">
                  <el-input v-model="dialogForm.documentNum" size="mini" clearable class='id-card'>
                    <el-button slot="append" icon="el-icon-reading" style="background: #409eff;color: #fff;" @click="idCard()" size='mini'></el-button>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="装表日期：" prop="meterDate">
                  <el-date-picker v-model="dialogForm.meterDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="装表员：" prop="meterStaff">
                  <el-input v-model="dialogForm.meterStaff" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="联系人：" prop="block">
                  <el-input v-model="dialogForm.block" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="联系电话：" prop="village">
                  <el-input v-model="dialogForm.village" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="手机号码：" prop="village1">
                  <el-input v-model="dialogForm.village1" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            
            
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="水表编号：" prop="meterNum">
                  <el-input v-model="dialogForm.meterNum" size="mini" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="水表口径：" prop="meterCaliber">
                  <el-select v-model="dialogForm.meterCaliber" clearable size="mini" style="width:100%">
                    <el-option  v-for="(item,index) in meterCaliberType" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="用水类型：" prop="waterType">
                  <el-select v-model="dialogForm.waterType" clearable size="mini" style="width:100%">
                    <el-option  v-for="(item,index) in waterDataType" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span='6'>
              <div class="my-input">
                <el-form-item label="是否加压：" prop="compression">
                  <el-select v-model="dialogForm.compression" clearable size="mini" style="width:100%">
                    <el-option key="0" label="是" value="0"></el-option>
                    <el-option key="1" label="否" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
            <el-col :span='24'>
              <div class="my-input gocenter1">
                <el-form-item label="备注：" prop="deposit">
                  <el-input type="textarea" v-model="dialogForm.deposit" style="width:100%"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='6'></el-col>
            <el-col :span='6'></el-col>
            <el-col :span='6'></el-col>
          </el-row>
          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- 1px solid #ebeef5  -->
          <div class="sub" style="text-align:center;">
            <el-button type="primary" style="margin-right:10px;" size="mini" @click="saveEditContent(1)">保存</el-button>
            <el-button @click="editContent1 = false" size="mini">返回</el-button>
            <!-- <div style="text-align:center;"><span style="color:#FF0000;">上传附件，请先保存</span></div> -->
          </div>
        </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  props:["isEdit","isShow"],
  data(){
    return {
      tableData:[
        {
          userCode:'D00001',
          userName:'张三',
          userAddress:'深圳市罗湖区东深小区',
          meterAddress:'深圳市罗湖区科技大厦',
          bookNum:'E000001',
          documentType:'0',
          documentNum:'430124199406192201',
          meterDate:'2019-06-19',
          meterStaff:'焦文',
          meterNum:'E000001',
          meterCaliber:'0',
          waterType:'0',
          compression:'0',
          deposit:'工程中心用户工程客服营收系统已启用测试数据1',
        },
        { 
          userCode:'D00002',
          userName:'李四',
          userAddress:'深圳市罗湖区东深小区',
          meterAddress:'深圳市罗湖区科技大厦',
          bookNum:'E000002',
          documentType:'0',
          documentNum:'430124199406192201',
          meterDate:'2019-08-13',
          meterStaff:'焦文',
          meterNum:'E000002',
          meterCaliber:'0',
          waterType:'0',
          compression:'0',
          deposit:'工程中心用户工程客服营收系统已启用测试数据2',
        },
      ],
      maxHeight: 0,
      oldData:[],
      isLiHu:false,//是否是立户
      tableShow: false,
      editContent1:false,
      dialogForm: {
        userName:'',
        userAddress:'',
        meterAddress:'',
        bookNum:'',
        documentType:'',
        documentNum:'',
        meterDate:'',
        meterStaff:'',
        meterNum:'',
        meterCaliber:'',
        waterType:'',
        compression:'',
        deposit:'',
      },
    };
  },
  mounted(){
    // console.log(this.isEdit);
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.execution .kl-table', ['.execution .block'])
    })
    if(this.isEdit || !this.isEdit){
      this.isLiHu = true;
 
    }
  },
  methods:{
    editEditContent(row){//步骤条-工程登记-多水表录入-编辑
      this.dialogForm.userName = row.userName;
      this.dialogForm.userAddress = row.userAddress;
      this.dialogForm.meterAddress = row.meterAddress;
      this.dialogForm.bookNum = row.bookNum;
      this.dialogForm.documentType = row.documentType;
      this.dialogForm.documentNum = row.documentNum;
      this.dialogForm.meterDate = row.meterDate;
      this.dialogForm.meterStaff = row.meterStaff;
      this.dialogForm.meterNum = row.meterNum;
      this.dialogForm.meterCaliber = row.meterCaliber;
      this.dialogForm.waterType = row.waterType;
      this.dialogForm.compression = row.compression;
      this.dialogForm.deposit = row.deposit;
      this.oldData = row;
      this.editContent1 = true;
    },
    saveEditContent(num){//步骤条-工程登记-多水表录入-保存
      if(num == 0){
     
      }else if(num == 1){
        let newData = this.dialogForm;
        if(this.oldData !== newData){
          this.oldData.userName = newData.userName;
          this.oldData.userAddress = newData.userAddress;
          this.oldData.meterAddress = newData.meterAddress;
          this.oldData.bookNum = newData.bookNum;
          this.oldData.documentType = newData.documentType;
          this.oldData.documentNum = newData.documentNum;
          this.oldData.meterDate = newData.meterDate;
          this.oldData.meterStaff = newData.meterStaff;
          this.oldData.meterNum = newData.meterNum;
          this.oldData.meterCaliber = newData.meterCaliber;
          this.oldData.waterType = newData.waterType;
          this.oldData.compression = newData.compression;
          this.oldData.deposit = newData.deposit;
        }
        this.editContent1 = false;
      }else if(num == 2){
       
      }else if(num == 3){
      
      }else if(num == 4){
   
      }else if(num == 5){
    
      }else if(num == 6){
       
      }else if(num == 7){
      
      }else if(num == 8){
       
      }else if(num == 9){
       
      }else if(num == 10){
        
      }
    },
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
  .water-meter{
    .waterdialog{
      .gocenter1 {
        width: 83.5% !important;
      }
      .el-date-editor{
        .el-input__inner{
          width: 100% !important;
        }
      }
    }
  }
  
</style>