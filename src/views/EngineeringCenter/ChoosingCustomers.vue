<template>
  <div class="ChoosingCustomers">
      <div  class="ChoosingCustomers-right-content">
        <div class="kl-table">
            <el-table 
                v-if="tableShow" 
                :max-height="maxHeight" 
                stripe border 
                :data="tableData" 
                @cell-click="cellClick" 
                class="wuserInfo-table" @selection-change="handleSelectionChange">
                
        <el-table-column  type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="NO." width="50" fixed="left">
        </el-table-column>

        <el-table-column prop="connect" min-width="100" label="客户编号">
        </el-table-column>

        <el-table-column prop="areaName" min-width="180" label="客户名称">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="180" label="客户地址">
        </el-table-column>

        <el-table-column prop="connect" min-width="100" label="客户类型">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="100" label="联系人">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="联系电话">
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <span style='color:#f0f0f0;'>|</span> -->
            <el-button type="text" class="noclick" @click="record(scope.$index, scope.row)">变动情况</el-button>

          </template>
        </el-table-column>

          </el-table>
          
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
        </el-pagination>
      </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  

  name: "ChoosingCustomers-index",
  data() {
    return {
      EditVisible:false,//弹出表单
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
    //   crumbsData: {  //面包屑
    //     titleList: [
    //       { title: '基础配置', path: '/BusinessArea' },
    //       { title: '基础信息', path: '/BusinessArea' },
    //       { title: '行政区域', method: () => { window.histroy.back() } }
    //     ],
    //   },
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
      options: [
        {
          value: '01',
          label: '1'
        },
        {
          value: '02',
          label: '2'
        },
        {
          value: '03',
          label: '3'
        },
      ],
      options1: [
        {
          value: '01',
          label: '启用'
        },
        {
          value: '02',
          label: '禁用'
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
        tree: [{ 
          foreignkey: '全部', 
          id: '222', 
          _child: 
          [{ 
               id: "5622",
                "code": "00044",
                foreignkey: "广东省",
                "parent": "0",
                "isLeaf": null,
                "isParent": true,
                "group": null,
                "districtArr": null,
                "sonData": null,
                _child: [
                    {
                        id: "5623",
                        "code": "0004400001",
                        foreignkey: "广州市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5636",
                        "code": "0004400002",
                        foreignkey: "韶关市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5647",
                        "code": "0004400003",
                        foreignkey: "深圳市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5658",
                        "code": "0004400004",
                        foreignkey: "珠海市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5662",
                        "code": "0004400005",
                        foreignkey: "汕头市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5670",
                        "code": "0004400006",
                        foreignkey: "佛山市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5676",
                        "code": "0004400007",
                        foreignkey: "江门市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5684",
                        "code": "0004400008",
                        foreignkey: "湛江市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5694",
                        "code": "0004400009",
                        foreignkey: "茂名市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5701",
                        "code": "0004400012",
                        foreignkey: "肇庆市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5710",
                        "code": "0004400013",
                        foreignkey: "惠州市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5716",
                        "code": "0004400014",
                        foreignkey: "梅州市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5725",
                        "code": "0004400015",
                        foreignkey: "汕尾市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5730",
                        "code": "0004400016",
                        foreignkey: "河源市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5737",
                        "code": "0004400017",
                        foreignkey: "阳江市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5742",
                        "code": "0004400018",
                        foreignkey: "清远市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5754",
                        "code": "0004400051",
                        foreignkey: "潮州市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5758",
                        "code": "0004400052",
                        foreignkey: "揭阳市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    },
                    {
                        id: "5764",
                        "code": "0004400053",
                        foreignkey: "云浮市",
                        "parent": "5622",
                        "isLeaf": null,
                        "isParent": false,
                        "group": null,
                        "districtArr": null,
                        "sonData": null,
                        _child: []
                    }
                ]
            },]
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
      tableData:[
        {
          areaName:'南沙街道',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'珠江街道',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'龙穴街道',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'万顷街道',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'黄阁镇',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'横沥镇',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'东涌镇',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'大岗镇',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
        {
          areaName:'榄核镇',
          areaCode:'01',
          areaState:'启用',
          areaLevel:'南沙区',
          areaDesc:"城区客服营收系统已启用",
          id: null,
          page: 1,
          pageCount: 20,
        },
      ],
      multipleSelection:[]
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.$changeTable(this, '.ChoosingCustomers .ChoosingCustomers-right', ['.ChoosingCustomers .table-top'])
    })
  },
  methods: {
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
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
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.ChoosingCustomers {
    height: 100%;
  .ChoosingCustomers-right-content {
    height: calc(100% - 41px);
    overflow-y: auto;
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
      padding-left:1rem;
      padding-right:1rem;
    }
  }
  .btn-area{
    div{
      width: 100%;
      float: right;
      .el-button{
        float: right;
      }
    }
  }
}
</style>

