<template>
  <div class="water-type">
    
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add" type="primary">添加</el-button>
        </div>
      </div>
 
      <!-- <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            
            <el-button size="mini" type="primary">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div> -->
      
      <div v-if="EditVisible">
        <WaterTypeEdit ref="childWarehousing"></WaterTypeEdit>
      </div>

      <div v-else class="water-type-right-content">
        <div class="kr-right">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kr-left">
          <!-- <div class="toolbar">
              <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                  <el-form-item class="form-right">
                    <el-button size="mini" icon="el-icon-plus" type="primary" @click="add">添加</el-button>
                  </el-form-item>
              </el-form>
          </div> -->
          <el-table 
                    v-if="tableShow" 
                    :max-height="maxHeight" 
                    stripe border 
                    :data="tableData" 
                    @cell-click="cellClick" 
                    class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="areaCode" min-width="100" label="上级类型">
            </el-table-column>

            <el-table-column prop="areaFrist" min-width="100" label="类型编号">

            </el-table-column>

            <el-table-column prop="areaSecond" min-width="100" label="类型名称">

            </el-table-column>

            <el-table-column prop="areaThird" min-width="100" label="状态">
            </el-table-column>

            <!-- <el-table-column prop="areaFour" min-width="100" label="四级定义" show-overflow-tooltip>
              
            </el-table-column> -->
            
            <el-table-column prop="areaOrder" min-width="100" label="排序" show-overflow-tooltip>
              
            </el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;">编辑</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
  </div>
</template>
<script>import WaterTypeEdit from "./WaterTypeEdit"

export default {
  components:{
      WaterTypeEdit,
  },

  name: "water-type-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      tableData:[
        {
          areaCode:'-',
          areaFrist:'-',
          areaSecond:'-',
          areaThird:'-',
          areaFour:'-',
          areaOrder:'1',
        },
        {
          areaCode:'-',
          areaFrist:'-',
          areaSecond:'-',
          areaThird:'-',
          areaFour:'-',
          areaOrder:'2',
        },
        {
          areaCode:'-',
          areaFrist:'-',
          areaSecond:'-',
          areaThird:'-',
          areaFour:'-',
          areaOrder:'3',
        },
      ],
      dialogFormVisible:false,//弹出表单
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formLabelWidth: '120px',
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础配置', path: '/BusinessArea' },
          { title: '价格管理', path: '/WaterType' },
          { title: '用水类型', method: () => { window.histroy.back() } }
        ],
      },
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
        engineerType: ''
      },
      options1: [
        {
          value: 12,
          label: '居民用水'
        },
        {
          value: 11,
          label: '非居民用水'
        },
        {
          value: 10,
          label: '特种用水'
        },
      ],
      options2: [
        {
          value: 9,
          label: '农村居民用水'
        },
        {
          value: 8,
          label: '城镇居民用水'
        },
        {
          value: 7,
          label: '工业用水'
        },
      ],
      options3: [
        {
          value: 6,
          label: '一般'
        },
        {
          value: 5,
          label: '低保'
        },
        {
          value: 4,
          label: '五保'
        },
      ],
      options4: [
        {
          value: 3,
          label: '正常'
        },
        {
          value: 2,
          label: '阶梯'
        },
        {
          value: 1,
          label: '加压'
        },
      ],
      histroyData: {},
      maxHeight: 0,
      tableShow: false,
      tabsData:[
        {
          name1:'11',
          name2:'22',
          name3:false,
          name4:'44',
          name5:'55',
          name6:'66',
          name7:'77',
          name8:'88',
          name9:'99',
          name10:'1010',
        },
        {
          name1:'111',
          name2:'222',
          name3:true,
          name4:'444',
          name5:'555',
          name6:'666',
          name7:'777',
          name8:'888',
          name9:'999',
          name10:'101010',
        },
        {
          name1:'1111',
          name2:'2222',
          name3:true,
          name4:'4444',
          name5:'5555',
          name6:'6666',
          name7:'7777',
          name8:'8888',
          name9:'9999',
          name10:'10101010',
        },
      ],
      treeDatas: {
        tree: [{ foreignkey: '全部', id: '222', _child: 
                                                      [
                                                        { foreignkey: '01_居民用水', id: '222', _child: 
                                                                                              [{ foreignkey: '0101_农村居民用水', id: '222',_child:
                                                                                                                                                [{ foreignkey: '010101_一般', id: '222',_child:[]}] },
                                                                                               ] 
                                                        },
                                                        { foreignkey: '02_非居民用水', id: '222', _child: 
                                                                                              [{ foreignkey: '0205_行政事业', id: '222',_child:[
                                                                                                {foreignkey: '020501_一般', id: '222',_child:[]}
                                                                                              ] },] 
                                                        }
                                                      ] 
              }],
        defaultProps: {
          label: 'foreignkey',
          children: '_child'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['parentMask', 'mask', 'childMask', 'seq', 'id', 'type', 'foreignkey'],
        rootName: '总部',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.water-type .water-type-right', ['.water-type .table-top'])
    })
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
            position1: "正常",
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
            position1: "阶梯",
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
            position1: "加压",
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
            position1: "正常",
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
        total: 4,
      }
    },
    
    add(){//添加
      this.EditVisible = true;
      this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })

    },
    edit(){
      this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } })
      this.EditVisible = true;
    },
    closeDialog(){ //关闭会话
      this.crumbsData.titleList.splice(3, 1);
      this.EditVisible = false;
    },
    backTreeData(){},
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
<style lang="scss">
@import "../../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.water-type {
    height: 100%;
  .btn-area{
    div{
      width: 100%;
      float: right;
      .el-button{
        float: right;
      }
    }
  }
  .water-type-right-content {
    height: calc(100% - 41px);
    overflow-y: auto;
    // margin-top:1rem;
    display: flex;
    flex-direction: row;
    .kr-right{
      width: 20%;
      height: 100%;
      // border: 2px solid red;
    }
    .kr-left{
      width: 80%;
      height: 100%;
    }
  }
}
</style>
