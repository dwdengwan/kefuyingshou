<template>
  <div class="custom-home">
    <header >
        <first-Nav :firstNav="firstNav" @changeNav="changeNav">
          <div class="leftItem header-top-right">
            <!-- <el-select v-model="checkedCompany" @change="sendCompany">
              <el-option
                  v-for="item in companyData"
                  :key="item.interiorCode"
                  :label="item.shortName"
                  :value="item.interiorCode">
              </el-option>
            </el-select> -->
            <span>南沙水司</span>
            <i>
                <img :src=" userInfo.photourl" alt>
            </i>
      
            <b>周新宇</b>
            <span @click="quit">
              <i class="el-icon-switch-button"></i>
              退出
            </span>
          </div>
        </first-Nav>	
    

    </header>


    <aside v-show="menuShow" class="primary-menu">
      <aside class="kl-aside">
        <!-- <div class="nav-tree-contain">
          <el-menu
              class="el-menu-vertical-demo"
              :default-active="activeIndex"
              @select="navTreeHandleSelect"
              :router="true"
              unique-opened
              open>   
                  <section v-for="(k,i) in navTree" :key="i">
                      <el-menu-item v-if="k.children.length===0" :index="k.path">{{k.name}}</el-menu-item>                
                      <el-submenu v-else :index="k.path">
                          <template slot="title">{{k.name}}</template>
                          <el-menu-item v-for="(v,j) in k.children" :key="j" :index="v.path">{{v.name}}</el-menu-item>
                      </el-submenu>
                  </section>
          </el-menu>
        </div> -->
        <second-Nav :secondNav="secondNav"></second-Nav>
      </aside>
      <div class="collapse" @click="collapse">
          <i class="el-icon-arrow-left leftChange"></i>
      </div>
    </aside>
    <section class="kl-container  aside-show-css">
    	<div 
          class="kl-main loadingHiden" 
          style="margin-left: 0px;" 
          id="main-home">
        <router-view v-if='isRouterAlive'></router-view>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "custom-home",
  data () {
    return {
        firstNav: {
            //系统名称
            title: '营业收费系统',
            //logo路径
            logoSrc: require('../assets/images/logo3.png'),
            //导航
            navData: {
                navList: [
                //Navtitle:菜单标题，icon:菜单图标，路径：有三种形式  path，name，url，只可存在一种
                {Navtitle: '首页', icon: require('@/assets/images/timg.jpg'), path: '/CenterSideIndex',children:[]},
                {Navtitle: '销售管理', icon: 'el-icon-star-off', path: '/CustomerAnalysisReport',children:[]},
                {Navtitle: '业务办理', icon: '', path: '/EngineeringAnalysisReport',children:[]},

                {
                    Navtitle: '客户管理',
                    icon: '',
                    path: '/ChargeAnalysisStatement'
                },
                {Navtitle: '呼叫中心', icon: '', path: '/StatementAnalysisReport',children:[]},
                // {Navtitle: '微厅分析', icon: '', path: '/MicrosoftAnalysisReport',children:[]},
                // {Navtitle: '网厅分析', icon: '', path: '/NetOfficeAnalysisReport',children:[]},
                // {Navtitle: '智慧营业厅分析', icon: '', path: '/AnalysisReportIntelligentBusiness',children:[]},
              
                ],
                //默认路径
                activeChanel: '/CenterSideIndex',
            },
        },
        secondNav: {
          navList: [
            
          ],
        },
      MenuData: [],
      loginInfo: '',
      companyData: [
          {
            companyId: 58,
            fullName: "集团总部",
            interiorCode: "C000000",
            shortName: "集团总部"
        },
        {
            companyId: 58,
            fullName: "南沙水司",
            interiorCode: "C000001",
            shortName: "南沙水司"
    
        },
        {
            companyId: 58,
            fullName: "南沙水司",
            interiorCode: "C000002",
            shortName: "南沙水司"
  
        },
      ],
      checkedCompany: 'C000000',
      showMenu: 1,
      isRouterAlive: true,
      defaultPage: '/',
      userInfo: {
        photourl: require('../assets/images/cute.jpeg')
      },
      host: "",
      controllChilder: [],
      firstIndex: 0, // 点击第几个一级菜单的索引
      menuShow:false,
      navTree:[],
      activeIndex:"/",

    }
  },
  mounted () {
    let n = window.location.host.search(':')
    let str = window.location.host + ""

    this.host = str.slice(0, n)
      // this.host = "jc.uat.gdhwater.com"
    if (this.host === '127.0.0.1')
      this.host = 'localhost'
    this.getMenu()//获取菜单
    this.getCompany()// 获取权限水司
    // this.getUser()// 获取当前用户信息
    this.setCurrentPage()// 获取当前路径
    // this.getSecondMenus(window.location.href.split('#')[1].split('/')[1]);
  },
  updated () {
  	this.$nextTick(()=>{
  		if (!this.hasReset) {
	      this.hasReset = true
	    }
  	})
  },
  methods: {
    //获取菜单
    getMenu () {
        this.MenuData = [];

        // if(this.checkedCompany === "C000000"){
         
        //     this.firstNav.navData={
        //         navList: [
        //         //Navtitle:菜单标题，icon:菜单图标，路径：有三种形式  path，name，url，只可存在一种
        //         {Navtitle: '首页', icon: ' ', path: '/CenterSideIndex',children:[]},
        //         {Navtitle: '销售管理', icon: ' ', path: '/CustomerAnalysisReport',children:[]},
        //         {Navtitle: '业务办理', icon: '', path: '/EngineeringAnalysisReport',children:[]},
        //         {
        //             Navtitle: '客户管理',
        //             icon: '',
        //             path: '/ChargeAnalysisStatement'
        //         },
                
        //         {Navtitle: '呼叫中心', icon: '', path: '/StatementAnalysisReport',children:[]},
        //         // {Navtitle: '微厅分析', icon: '', path: '/MicrosoftAnalysisReport',children:[]},
        //         // {Navtitle: '网厅分析', icon: '', path: '/NetOfficeAnalysisReport',children:[]},
        //         // {Navtitle: '智慧营业厅分析', icon: '', path: '/AnalysisReportIntelligentBusiness',children:[]},
              
        //         ],
        //         //默认路径
        //         activeChanel: '/CenterSideIndex',
        //     };

        //      Array.apply(null, Array(10)).map(() => 0);//Array(10)生成一个长度为10的空数组
        //   this.controllChilder = Array.apply(null, Array(this.MenuData.length)).map(() => false)
        //   // this.chooseTopMenu(this.$router.history.current.path)
        //   this.chooseTopMenu(this.firstNav.navData.navList[0].path)
        //   this.$router.push(this.firstNav.navData.navList[0].path)//进入第一个菜单
  
 

        // }else{
         
            this.firstNav.navData={
                navList: [
                //Navtitle:菜单标题，icon:菜单图标，路径：有三种形式  path，name，url，只可存在一种
                {Navtitle: '首页', icon: 'WaterSideIndex', path: '/WaterSideIndex',children:[]},
                {Navtitle: '工作台', icon: 'HallBusiness', path: '/HallBusiness',children:[]},
                // {Navtitle: '领导首页', icon: 'WaterSideIndex2', path: '/WaterSideIndex2',children:[]},
                {
                  Navtitle: '工程管理', 
                  icon: require('@/assets/images/timg.jpg'), 
                  path: '/EngineeringCenter',
                  children:[
                    {
                      icon:"EngineeringCenter1",
                      type: 'submenu',
                      children: [
                          // {
                          //   icon:"EngineeringCenter1-1",
                          //   children: [],
                          //   NavName: "工程登记",               
                          //   url: "/EngineeringCenter/EngineeringRegistration"
                          // },
                          {
                            icon:"EngineeringCenter1-2",
                            children: [],
                            NavName: "处理中",               
                            url: "/EngineeringCenter/Processing"
                          },
                          {
                            icon:"EngineeringCenter1-3",
                            children: [],
                            NavName: "处理完成",               
                            url: "/EngineeringCenter/ProcessingCompleted"
                          },
                          {
                            icon:"EngineeringCenter1-4",
                            children: [],
                            NavName: "全部",               
                            url: "/EngineeringCenter/AllProjects"
                          },
                          // {
                          //   children: [],
                          //   code: "001002003001",
                          //   id: "815",
                          //   name: "工程计提",
                          //   
                          //   path: "/ProjectProvision"
                          // }

                          ],
                        url: "/EngineeringCenter",
                        NavName:"用户工程"
                      },
                    {
                      icon:"EngineeringCenter2",
                      type: 'submenu',
                      children: [
                          // {
                          //   icon:"EngineeringCenter2-1",
                          //   children: [],
                          //   NavName: "工程登记",               
                          //   url: "/EngineeringCenter/insideEngineeringRegistration"
                          // },
                          {
                            icon:"EngineeringCenter2-2",
                            children: [],
                            NavName: "处理中",               
                            url: "/EngineeringCenter/insideProcessing"
                          },
                          {
                            icon:"EngineeringCenter2-3",
                            children: [],
                            NavName: "处理完成",               
                            url: "/EngineeringCenter/insideProcessingCompleted"
                          },
                          {
                            icon:"EngineeringCenter2-4",
                            children: [],
                            NavName: "全部工程",                
                            url: "/EngineeringCenter/insideAllProjects"
                          },
                          // {
                          //   children: [],
                          //   code: "001002003001",
                          //   id: "814",
                          //   name: "工程计提",
                          //   
                          //   path: "/insideProjectProvision"
                          // }
                      ],
                      url: "/insideEngineeringRegistration",
                      NavName:"内部工程"
                    },
                  ],
                },
                
                {
                  Navtitle: '客户管理', 
                  icon: 'CustomerCenter', 
                  path: '/CustomerCenter',
                  children:[
                    {
                      icon:"CustomerCenter1",
                      type:'firstmenu',
                      children: [],
                      url: "/CustomerCenter/userInfo",
                      NavName:"用户资料"
                    },
                    {
                      icon:"CustomerCenter2",
                      type:'firstmenu',
                      children: [],
                      url: "/CustomerCenter/OpenAccount",
                      NavName:"开户"
                    },
                    {
                      icon:"CustomerCenter3",
                      type:'firstmenu',
                      children: [],
                      url: "/CustomerCenter/Transfer",
                      NavName:"过户"
                    },
                    {
                      icon:"CustomerCenter4",
                      type:'firstmenu',
                      children: [],
                      url: "/CustomerCenter/DiscontinueUse",
                      NavName:"停用"
                    },
                    {
                      icon:"CustomerCenter5",
                      type:'firstmenu',
                      children: [],
                      url: "/CustomerCenter/multiplexing",
                      NavName:"复用"
                    },
                    {
                      icon:"CustomerCenter6",
                      type:'firstmenu',
                      children: [],
                      url: "/CustomerCenter/SalesAccount",
                      NavName:"销户"
                    },
                    {
                      icon:"CustomerCenter7",
                      type:'submenu',
                      children: [
                          {
                            icon:"CustomerCenter7-2",
                            url:"/CustomerCenter/DataChange",
                            NavName:"用户资料变更"
                          },
                          {
                            icon:"CustomerCenter7-3",
                            url:"/CustomerCenter/TypesOfWaterUse",
                            NavName:"用水类型变更"
                          },
                          {
                            icon:"CustomerCenter7-4",
                            url:"/CustomerCenter/SteppedPopulation",
                            NavName:"用水人口变更"
                          },
                          {
                            icon:"CustomerCenter7-5",
                            url:"/CustomerCenter/PreferentialWaterUse",
                            NavName:"优惠用水变更"
                          },
                          {
                            icon:"CustomerCenter7-6",
                            url:"/CustomerCenter/PaymentMethod",
                            NavName:"缴费方式变更"
                          },
                          {
                            icon:"CustomerCenter7-7",
                            url:"/CustomerCenter/InvoiceInformation",
                            NavName:"开票资料变更"
                          },
                      ],
                      url: "/DataChange",
                      NavName:"资料变更"
                    },
                    {
                      icon:"CustomerCenter8",
                      type:'firstmenu',
                      children: [
                          // {
                          //     path:"/customerManagement",
                          //     name:"客户资料"
                          // },
                          // {
                          //     path:"/countManagement",
                          //     name:"账户资料"
                          // },
                      ],
                      url: "/CustomerCenter/customerManagement",
                      NavName:"客户资料"
                    },
                  ],
                },
                {
                  Navtitle: '抄表开账', 
                  icon: 'MeterReadingCenter', 
                  path: '/MeterReadingCenter',
                  children:[
                    {
                      icon:"MeterReadingCenter1",
                      type: 'submenu',
                      children: [
                        {
                          icon:"MeterReadingCenter1-1",
                          children: [],
                          NavName: "抄表记录",             
                          url: "/MeterReadingCenter/MeterReadingRecord"
                        },
                        {
                          icon:"MeterReadingCenter1-2",
                          children: [],
                          NavName: "抄表路线",              
                          url: "/MeterReadingCenter/MeterReadingCircuit"
                        },
                        {
                          icon:"MeterReadingCenter1-3",
                          children: [],
                          NavName: "计划调整",             
                          url: "/MeterReadingCenter/PlanAdjustment"
                        },
                        {
                          icon:"MeterReadingCenter1-4",
                          children: [],
                          NavName: "抄表轨迹",             
                          url: "/MeterReadingCenter/MeterReadingTrack"
                        },
                        {
                          icon:"MeterReadingCenter1-5",
                          children: [],
                          NavName: "水表关系",             
                          url: "/MeterReadingCenter/MeterRelationship"
                        },
                        // {
                        //   children: [],
                        //   code: "001002003001",
                        //   id: "815",
                        //   name: "抄表设备管理",
                        //   
                        //   path: "/MeterReadingEquipment"
                        // },
                        // {
                        //   children: [],
                        //   code: "001002003001",
                        //   id: "815",
                        //   name: "监控调度",
                        //   
                        //   path: "/MonitorScheduler"
                        // }
                      ],
                      url: "/MeterReadingCenter",
                      NavName:"抄表"
                    },
                    {
                      icon:"MeterReadingCenter2",
                      type: 'submenu',
                      children: [
                          {
                            icon:"MeterReadingCenter2-1",
                            children: [],
                            NavName: "批量开账",
                            url: "/MeterReadingCenter/BatchOpening"
                          },
                          {
                            icon:"MeterReadingCenter2-2",
                            children: [],
                            NavName: "常规开账",
                            url: "/MeterReadingCenter/RegularOpening"
                          }
                      ],
                      url: "/BatchOpening",
                      NavName:"开账"
                    },
                    {
                      icon:"MeterReadingCenter3",
                      type: 'submenu',
                      children: [
                        {
                          icon:"MeterReadingCenter3-1",
                          children: [],
                          NavName: "水量异常",            
                          url: "/MeterReadingCenter/AnomalyAnalysis"
                        },
                        {
                          icon:"MeterReadingCenter3-2",
                          children: [],
                          NavName: "水表异常",
                          url: "/MeterReadingCenter/AbnormalVerification"
                        },
                        {
                          icon:"MeterReadingCenter3-3",
                          children: [],
                          NavName: "抄表质量检查",
                          url: "/MeterReadingCenter/QualityReading"
                        },
                      ],
                      url: "/BookInfo",
                      NavName:"异常"
                    },
                    {
                      icon:"MeterReadingCenter4",
                      type: 'submenu',
                      children: [
                          // {
                          //   children: [],
                          //   code: "001002003001",
                          //   id: "814",
                          //   name: "异常用水稽查",
                          //   
                          //   path: "/AbnormalInspection"
                          // },
                          {
                            icon:"MeterReadingCenter4-1",
                            children: [],
                            NavName: "册本信息",
                            url: "/MeterReadingCenter/BookInfo"
                          },
                          {
                            icon:"MeterReadingCenter4-2",
                            children: [],
                            NavName: "册本调整",
                            url: "/MeterReadingCenter/BookAdjustment"
                          },
                      ],
                      url: "/CustomTable",
                      NavName:"表册"
                    },
                    {
                      icon:"MeterReadingCenter5",
                      type: 'submenu',
                      children: [
                          // {
                        //   children: [],
                        //   code: "001002003001",
                        //   id: "812",
                        //   name: "大用户",
                        //   
                        //   path: "/BigUsers"
                        // }
                          {
                            icon:"MeterReadingCenter5-1",
                            children: [],
                            NavName: "客户用水排名表",
                            url: "/MeterReadingCenter/CustomTable"
                          },
                          {
                            icon:"MeterReadingCenter5-2",
                            children: [],
                            NavName: "用户用水排名表",
                            url: "/MeterReadingCenter/PrecedenceTable"
                          },
                          {
                            icon:"MeterReadingCenter5-3",
                            children: [],
                            NavName: "零水量查缴记录",
                            url: "/MeterReadingCenter/ZeroPay"
                          },
                          {
                            icon:"MeterReadingCenter5-4",
                            children: [],
                            NavName: "总分分析",
                            url: "/MeterReadingCenter/TotalScoreAnalysis"
                          },
                          {
                            icon:"MeterReadingCenter5-5",
                            children: [],
                            NavName: "大用户",
                            url: "/MeterReadingCenter/BigUsers"
                          },
                        
                      ],
                      url: "/AnomalyAnalysis",
                      NavName:"统计"
                    },
                  ],
                },
                {
                  Navtitle: '收费管理', 
                  icon: 'FinancialCenter', 
                  path: '/FinancialCenter',
                  children:[
                    {
                      icon:"FinancialCenter1",
                      type:'submenu',
                      children: [
                          // {
                          //     path:"/FinancialCenter",
                          //     name:"现金收费"
                          // },
                          // {
                          //     path:"/BalanceTransfer",
                          //     name:"余额过户"
                          // },


                          // {
                          //     path:"/EngineeringFees",
                          //     name:"工程类收费"
                          // },
                          // {
                          //     path:"/FinancialCenter",
                          //     name:"余额取出"
                          // },

                          {
                            icon:"FinancialCenter1-1",
                            url:"/FinancialCenter/EngineeringFees",
                            NavName:"工程类收费"
                          },
                          {
                            icon:"FinancialCenter1-2",
                            url:"/FinancialCenter/BalanceWithdrawal",
                            NavName:"余额取出"
                          },
                      ],
                      url: "/CounterCharges",
                      NavName:"柜台收费"
                    },
                    {
                      icon:"FinancialCenter2",
                      type: 'firstmenu',
                      children: [
                          // {
                          //     path:"/BankCharges",
                          //     name:"银行代扣"
                          // },
                          // {
                          //     path:"/bankCollection",
                          //     name:"银行托收"
                          // },
                      ],
                      url: "/FinancialCenter/BankCharges",
                      NavName:"银行收费"
                    },
                    {
                      icon:"FinancialCenter3",
                      type: 'firstmenu',
                      children: [
                          // {
                          //     path:"/InternetCharging",
                          //     name:"微信"
                          // },
                          // {
                          //     path:"/AlipayCount",
                          //     name:"支付宝"
                          // },
                          // {
                          //     path:"/UnionPay",
                          //     name:"银联"
                          // },
                      ],
                      // path: "/InternetCharging",
                      url:"/FinancialCenter/UnionPay",
                      NavName:"互联网收费"
                    },
                    { 
                      icon:"FinancialCenter4",
                      type: 'submenu',
                      children: [
                          {
                            icon:"FinancialCenter4-1",
                            url:"/FinancialCenter/FinancialAdjustment",
                            NavName:"追加费用"
                          },
                          {
                            icon:"FinancialCenter4-2",
                            url:'/FinancialCenter/Recover',
                            NavName:"追缴费用"
                          },
                          {
                            icon:"FinancialCenter4-3",
                            url:"/FinancialCenter/LiquidatedDamages",
                            NavName:"违约金减免"
                          },
                          // {
                          //     path:"/AccountSplitting",
                          //     name:"分账处理"
                          // },
                          {
                            icon:"FinancialCenter4-4",
                            url:"/FinancialCenter/DealingBadDebts",
                            NavName:"呆账处理"
                          },
                          {
                            icon:"FinancialCenter4-5",
                            url:"/FinancialCenter/ReportingBadDebts",
                            NavName:"坏账报损"
                          },
                          {
                            icon:"FinancialCenter4-6",
                            url:"/FinancialCenter/RedFlushing",
                            NavName:"冲红"
                          },
                          // {
                          //     path:"/CancellationMonthlyCharges",
                          //     name:"取消当月收费"
                          // },

                      ],
                      url: "/FinancialAdjustment",
                      NavName:"账务调整"
                    },
                    {
                      icon:"FinancialCenter5",
                      type: 'firstmenu',
                      children: [
                          // {
                          //     path:"/FinancialManagement",
                          //     name:"月结"
                          // },
                          // {
                          //     path:"/AccountPeriod",
                          //     name:"账期"
                          // },
                      ],
                      url: "/FinancialCenter/FinancialManagement",
                      NavName:"结账管理"
                    },
                    {
                      icon:"FinancialCenter6",
                      type: 'submenu',
                      children: [
                        {
                          icon:"FinancialCenter6-1",
                          url:"/FinancialCenter/BillManagement",
                          NavName:"发票注册"
                        },
                        {
                          icon:"FinancialCenter6-2",
                          url:"/FinancialCenter/InvoiceAcquisition",
                          NavName:"发票领用"
                        },
                        {
                          icon:"FinancialCenter6-3",
                          url:"/FinancialCenter/InvoiceBorrowing",
                          NavName:"发票借用"
                        },
                        {
                          icon:"FinancialCenter6-4",
                          url:"/FinancialCenter/InvoiceInvalidated",
                          NavName:"发票修改"
                        },
                        // {
                        //     path:"/InvoiceRestoration",
                        //     name:"发票还原"
                        // },
                        // {
                        //     path:"/InvoiceEdit",
                        //     name:"发票修改"
                        // },
                        {
                          icon:"FinancialCenter6-4",
                          url:"/FinancialCenter/InvoicePayment",
                          NavName:"发票交票"
                        },
                        {
                          icon:"FinancialCenter6-5",
                          url:"/FinancialCenter/InvoiceSearch",
                          NavName:"发票查询"
                        },
                      ],
                      url: "/BillManagement",
                      NavName:"票据管理"
                    },
                
                  ],
                },
                {
                  Navtitle: '信息发布', 
                  icon: 'ServiceCenter', 
                  path: '/ServiceCenter',
                  children:[
                    {
                      icon:"ServiceCentre1",
                      type: 'firstmenu',
                      children: [
                          // {
                          //     path:"/ServiceCentre",
                          //     name:"书面通知"
                          // },
                          // {
                          //     path:"/ShortMessageNotification",
                          //     name:"短信通知"
                          // },
                          // {
                          //     path:"/WechatNotification",
                          //     name:"微信通知"
                          // },
                      ],
                      url: "/ServiceCenter/CustomerNotification",
                      NavName:"客户通知"
                    },
                    // {
                    //     children: [
                          
                    //     ],
                    //     path: "/CustomerServiceWorkOrder",
                    //     name:"客服工单"
                    // },
                    // {
                    //   icon:"ServiceCentre2",
                    //   type: 'firstmenu',
                    //   children: [

                    //   ],
                    //   url: "/ServiceCenter/HallBusiness",
                    //   NavName:"工作台"
                    // },
                    {
                      type: 'submenu',
                      icon:"ServiceCentre3",
                        children: [
                            {
                              icon:"ServiceCentre3-1",
                              url:"/ServiceCenter/InformationDelivery",
                              NavName:"水厂开放日管理"
                            },
                            {
                              icon:"ServiceCentre3-2",
                              url:"/ServiceCenter/InformationReleaseManagement",
                              NavName:"信息发布管理"
                            },
                            {
                              icon:"ServiceCentre3-3",
                              url:"/ServiceCenter/CommonFormManagement",
                              NavName:"常用表格管理"
                            },

                        ],
                        url: "/InformationDelivery",
                        NavName:"信息发布"
                    },

                    {
                      icon:"ServiceCentre4",
                      type: 'submenu',
                      children: [
                          // {
                          //     path:"/SatisfactionSurvey",
                          //     name:"问题库管理"
                          // },
                          {
                            icon:"ServiceCentre4-1",
                            url:"/ServiceCenter/QuestionnaireManagement",
                            NavName:"问卷管理"
                          },
                          // {
                          //     path:"/Findings",
                          //     name:"调查结果"
                          // },
                          {
                            icon:"ServiceCentre4-2",
                            url:"/ServiceCenter/QuestionnaireStatistics",
                            NavName:"问卷统计"
                          },

                      ],
                      url: "/SatisfactionSurvey",
                      NavName:"满意度调查"
                    },
                  ],
                },
                {
                    Navtitle: '表计管理',
                    icon: 'WatchCenter',
                    path: '/WatchCenter',
                    children:[
                      {
                        icon:"WatchCenter1",
                        type:'firstmenu',
                        children: [],
                        NavName: "水表查询",           
                        url: "/WatchCenter/WaterMeterInquiry"
                      },
                      {
                        icon:"WatchCenter2",
                        type:'firstmenu',
                        children: [],
                        NavName: "入库",           
                        url: "/WatchCenter/Warehousing"
                      },
                      {
                        icon:"WatchCenter3",
                        type:'firstmenu',
                        children: [],
                        NavName: "换表",            
                        url: "/WatchCenter/ChangeTables"
                      },
                      {
                        icon:"WatchCenter4",
                        type:'firstmenu',
                        children: [],
                        NavName: "拆表",           
                        url: "/WatchCenter/TableDismantling"
                      },
                      {
                        icon:"WatchCenter5",
                        type:'firstmenu',
                        children: [],
                        NavName: "复表",            
                        url: "/WatchCenter/DuplicateTable"
                      },
                      {
                        icon:"WatchCenter6",
                        type:'firstmenu',
                        children: [],
                        NavName: "校表",           
                        url: "/WatchCenter/ComparisonTable"
                      },
                      {
                        icon:"WatchCenter7",
                        type:'firstmenu',
                        children: [],
                        NavName: "维检",            
                        url: "/WatchCenter/DimensionalInspection"
                      },
                      {
                        icon:"WatchCenter8",
                        type:'submenu',
                          children: [
                              {
                                icon:"WatchCenter8-1",
                                url:"/WatchCenter/wMeterEdit",
                                NavName:"水表资料变更"
                              },
                              {
                                icon:"WatchCenter8-2",
                                url:"/WatchCenter/meterInfoDel",
                                NavName:"水表资料删除"
                              },
                          ],
                          NavName: "水表变更",           
                          url: "/WatchCenter/wMeterEdit"
                      },
                    ],
                },
                {
                  Navtitle: '统计报表', 
                  icon: 'ReportCenter', 
                  path: '/ReportCenter',
                  children:[
                    {
                      icon:"reportCenter1",
                      type: 'firstmenu',
                      children: [],
                      NavName: "销售管理分析",           
                      url: "/ReportCenter/ReportCenter"
                    },
                    {
                      icon:"reportCenter2",
                      type: 'firstmenu',
                      children: [],
                      NavName: "业务办理分析",            
                      url: "/ReportCenter/BusinessManagement"
                    },
                    {
                      icon:"reportCenter3",
                      type: 'firstmenu',
                      children: [],
                      NavName: "客户管理中心",           
                      url: "/ReportCenter/CustomerManagementCenter"
                    },
                    {
                      icon:"reportCenter4",
                      type: 'firstmenu',
                      children: [],
                      NavName: "呼叫中心分析",           
                      url: "/ReportCenter/CallCenter"
                    },
                    // {
                    //     children: [],
                    //     code: "001002003001",
                    //     id: "815",
                    //     name: "客户报表",
                    //     
                    //     path: "/MeterReadData"
                    // },
                    // {
                    //     children: [],
                    //     code: "001002003001",
                    //     id: "814",
                    //     name: "财务报表",
                    //     
                    //     path: "/MeterReadData"
                    // },
                    // {
                    //     children: [],
                    //     code: "001002003001",
                    //     id: "813",
                    //     name: "服务报表",
                    //     
                    //     path: "/MeterReadData"
                    // },
                  ],
                
                },
                {
                  Navtitle: '系统设置', 
                  icon: 'BasicSet', 
                  path: '/BasicSet',
                  children:[
                    {
                      icon:"BusinessArea1",
                      type:'submenu',
                      url: "/BasicInfo",
                      NavName:"系统设置",
                      children: [
                        {
                          icon:"BusinessArea1-1",
                          children: [],
                          NavName: "营业网点",
                          url: "/BasicSet/BusinessArea"
                        },
                        {
                          icon:"BusinessArea1-2",
                          children: [],
                          NavName: "行政区域",
                          url: "/BasicSet/AdminRegion"
                        },
                        {
                          icon:"BusinessArea1-3",
                          children: [],
                          NavName: "管理区域",
                          url: "/BasicSet/ManagementArea",
                        },
                        {
                          icon:"BusinessArea1-4",
                          children: [],
                          NavName: "行业分类",
                          url: "/BasicSet/IndustryCategory"
                        },
                        {
                          icon:"BusinessArea1-5",
                          children: [],
                          NavName: "水表厂家",
                          url: "/BasicSet/WaterMeterfacturer"
                        },
                        {
                          icon:"BusinessArea1-6",
                          children: [],
                          NavName: "水表型号",
                          url: "/BasicSet/WatermeterModel"
                        },
                        {
                          icon:"BusinessArea1-7",
                          children: [],
                          NavName: "水表口径",
                          url: "/BasicSet/CaliberInfo"
                        },
                        {
                          icon:"BusinessArea1-8",
                          children: [],
                          NavName: "抄表状态",
                          url: "/BasicSet/MeterStatus"
                        },
                        {
                          icon:"BusinessArea1-9",
                          children: [],
                          NavName: "银行信息",
                          url: "/BasicSet/BankInfo"
                        },
                        // {
                        //   children: [],
                        //   code: "001002003001",
                        //   id: "815",
                        //   name: "代扣设置",
                        //   parentId: "7",
                        //   path: "/WithholdConfig"
                        // },
                        {
                          icon:"BusinessArea1-10",
                          children: [],
                          NavName: "假期设置",
                          url: "/BasicSet/HolidaySet"
                        },
                        // {
                        //   children: [],
                        //   code: "001002003001",
                        //   id: "815",
                        //   name: "水厂信息",
                        //   parentId: "7",
                        //   path: "/WaterInfor"
                        // },
                        {
                          icon:"BusinessArea1-11",
                          children: [],
                          NavName: "泵站信息",
                          url: "/BasicSet/PumpStationInfo"
                        },
                        // {
                        //   children: [],
                        //   code: "001002003001",
                        //   id: "815",
                        //   name: "管线信息",
                        //   parentId: "7",
                        //   path: "/PipelineInfor"
                        // }
                        ],
                      },
                      {
                        icon:"BusinessArea2",
                        type:'submenu',
                        url: "/PriceContrl",
                        NavName:"价格管理",
                        children: [
                          {
                            icon:"BusinessArea2-1",
                            children: [],
                            NavName: "用水价格",
                            url: "/BasicSet/WaterPrice"
                          },
                          {
                            icon:"BusinessArea2-2",
                            children: [],
                            NavName: "费用明细",
                            url: "/BasicSet/PriceInfo"
                          },
                          {
                            icon:"BusinessArea2-3",
                            children: [],
                            NavName: "用水类型",
                            url: "/BasicSet/WaterType"
                          },
                          {
                            icon:"BusinessArea2-4",
                            children: [],
                            NavName: "优惠策略",
                            url: "/BasicSet/CheapStrategy"
                          }, 
                          {
                            icon:"BusinessArea2-5",
                            children: [],
                            NavName: "违约设置",
                            url: "/BasicSet/BreakSet"
                          }, 
                          {
                            icon:"BusinessArea2-6",
                            children: [],
                            NavName: "费用名称",
                            url: "/BasicSet/CostProject"
                          }
                        ],
                      },
                      {
                        type: 'firstmenu',
                        icon:"BusinessArea3",
                        url: "/BasicSet/GlobalParamSet",
                        NavName:"全局参数设置",
                        children: []
                      },
                      {
                        type: 'firstmenu',
                        icon:"BusinessArea4",
                        url: "/BasicSet/DataDictionary",
                        NavName:"数据字典",
                        children: []
                      }
                  ],
                },
                    //  {Navtitle: '系统管理', icon: ' ', path: '/SystemSet',children:[]},
              
              ],
              //默认路径
              activeChanel: '/WaterSideIndex',
            };
            
             Array.apply(null, Array(10)).map(() => 0);//Array(10)生成一个长度为10的空数组
          this.controllChilder = Array.apply(null, Array(this.MenuData.length)).map(() => false)
          // this.chooseTopMenu(this.$router.history.current.path)
          this.chooseTopMenu(this.firstNav.navData.navList[0].path)
          this.$router.push(this.firstNav.navData.navList[0].path)//进入第一个菜单
  
 

        // }

    //   let params = {
    //     "token": window.location.search.substring(1)
    //   }
    //   this.$api.fetch({
    //     apiUrl: 'selUserModuleInfo.api',//路径
    //     method: 'post',//请求方法
    //     params: params,//参数
    //     needErrorCallback: true
    //   }).then(res => {
    //     if (res.code === 0) {
    //       this.MenuData = res.data.menuTree.children//拿到1、2级菜单数据

    //       Array.apply(null, Array(10)).map(() => 0);//Array(10)生成一个长度为10的空数组
    //       this.controllChilder = Array.apply(null, Array(this.MenuData.length)).map(() => false)
    //       // this.chooseTopMenu(this.$router.history.current.path)
    //       this.chooseTopMenu(this.MenuData[0].path)
    //       this.$router.push(this.MenuData[0].path)//进入第一个菜单
    //     }else if(res.code ===10001){
    //       this.$message.error('错了哦，这是一条错误消息');
    //     }
    //   })
      
    },
    // 获取当前用户信息
    getUser () {
      let params = {
        "token": window.location.search.substring(1)
      }
      this.$api.fetch({
        apiUrl: 'TAuthorization/getLoginInfo.api',//路径
        method: 'post',//请求方法
        params: params,//参数
        needErrorCallback: true
      }).then(res => {
        if (res.code === 0) {
          this.loginInfo = JSON.parse(res.data.staff)
        }
      })

    },
    // 获取权限水司
    getCompany () {
        this.companyData =  [
          {
            companyId: 58,
            fullName: "粤海水务",
            interiorCode: "C000000",
            shortName: "粤海水务"
        },
        {
            companyId: 58,
            fullName: "南沙水司",
            interiorCode: "C000001",
            shortName: "南沙水司"
    
        },
        {
            companyId: 58,
            fullName: "南沙水司",
            interiorCode: "C000002",
            shortName: "南沙水司"
  
        },
      ];
     
    //   let params = {
    //     "busicode": "",
    //     "data": {}
    //   };
    //   this.$api.fetch({
    //     apiUrl: 'TAuthorization/companyList.api',//路径
    //     method: 'post',//请求方法
    //     params: params,//参数
    //     needErrorCallback: true
    //   }).then(res => {
    //     if (res.code === 0) {
    //       if (res.data.list === null) {
    //         if(this.host=='localhost'){
    //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    //         }else {
    //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'
    //         }

    //       } else {
    //         this.companyData = res.data.list
    //         this.checkedCompany = res.data.default
            
    //         if (res.data.default === null) {
    //           if(this.host=='localhost'){
    //             window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    //           }else {
    //             window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'
    //           }
    //         }
    //         if (res.data.default === "C000000") {
    //           //当前状态水司是否是本集团
    //           this.$store.state.company = '2'
    //           this.showMenu = 2;
    //         } else {
    //           this.$store.state.company = '1'
    //           this.showMenu = 1;
    //         }
    //       }
    //     } else {
          
    //           if(this.host == 'localhost'){
    //             window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    //           }else {
    //             window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'
    //           }
    //       // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    //     }
    //   });
    },
    //退出登录
    quit () {
      // window.localStorage.removeItem("taken")
      // // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         if(this.host=='localhost'){
      //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         }else {
      //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'

      //         }
      // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    },
    // 发送当前选中水司到后台
    sendCompany (val) {
      this.$store.state.companyInfo.code = val;// 当前选中水司信息;
      
      this.companyData.map((item,index)=>{
        if(item.interiorCode===val){
          this.$store.state.companyInfo.name = item.shortName
        }
      })
      // this.defaultPage = this.$route.path

      this.MenuData = []//切换水司时 清空菜单
      if (val === 'C000000') {
        this.firstNav.title = "营收系统运营统计报表"
        this.$store.state.company = '2'
        this.showMenu = 2;
        this.defaultPage = "/CenterSideIndex"
 
      } else {
        this.firstNav.title = "营收系统"
        this.$store.state.company = '1'
        this.showMenu = 1;
        // this.defaultPage = "/CenterSideIndex";
        this.defaultPage = "/WaterSideIndex";
  
        // let params = {
        //   "busicode": "",
        //   "data": { companyCode: val }
        // };
        // this.$api.fetch({
        //   apiUrl: 'TAuthorization/selectCompany.api',//路径
        //   method: 'post',//请求方法
        //   params: params,//参数
        //   needErrorCallback: true
        // }).then(res => {
        //   if (res.code === 0) {
        //     this.$nextTick(() => {
        //       this.getMenu()
        //       this.reload()
              
        //     })
            
          }

          this.menuShow = false;
          $('.kl-container').css('width','calc(100% - 30px)');

        this.getMenu()
        this.reload()
    
        // })
    //     setTimeout(() => {
    //       this.$store.state.company = '1'
    //     this.showMenu = 1
    //     this.defaultPage = '/WaterSideIndex';
    //     }, 0)
    //   }
    //   setTimeout(() => {
    //     let params = {
    //     "busicode": "",
    //     "data": { companyCode: val }
    //   };
    //   this.$api.fetch({
    //     apiUrl: 'TAuthorization/selectCompany.api',//路径
    //     method: 'post',//请求方法
    //     params: params,//参数
    //     needErrorCallback: true
    //   }).then(res => {
    //     if (res.code === 0) {
    //       this.$nextTick(() => {
    //         this.getMenu()
    //         this.reload()
    //       })
    //     }
    //   })
    //   }, 0)
    },

    // 获取当前路径
    setCurrentPage () {
      // this.defaultPage = this.$router.history.current.path === '/' ? '/WaterSideIndex' : this.$router.history.current.path;
      this.defaultPage = this.$route.path === '/' ? '/WaterSideIndex' : this.$route.path;
    },
    // 页面重加载函数
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    chooseTopMenu (key, keyPath, val) {
      // console.log(key, keyPath, val);
    	let arr = ['/WaterSideIndex','/CenterSideIndex','/LiveData','/UserRole','/']
      if(arr.includes(key)){
    	}else{

    	}
      const menuData = this.MenuData
      
      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].children.length !== 0) {
          // 存在二级菜单
          for (let j = 0; j < menuData[i].children.length; j++) {
            if (menuData[i].children[j].path === key) {
              this.controllChilder[this.firstIndex] = false
              this.firstIndex = i
              this.controllChilder[i] = true
              break
            }
          }
        } else {
          this.controllChilder[this.firstIndex] = false

          
        }
      }
    },
    //路径跳转
    getSecondMenus(key) {
      
      let highLight = ['/WaterSideIndex', '/LiveData', '/MeterReadData', '/RealTimeAlarm', '/DayReadCount','/ModelFirstRank','/IntelligentWaterMeter','/UserRole'];

      let arr = ['/WaterSideIndex','/CenterSideIndex','/LiveData','/UserRole']


      const menuData = this.MenuData
      for (let i = 0; i < menuData.length; i++) {//侧边栏的显示与隐藏
        if (menuData[i].children.length !== 0) {
          // 存在二级菜单
          for (let j = 0; j < menuData[i].children.length; j++) {
            if (menuData[i].children[j].path === key) {
              this.controllChilder[this.firstIndex] = false
              this.firstIndex = i
              this.controllChilder[i] = true
              break
            }
          }
        } else {
          this.controllChilder[this.firstIndex] = false
        }
      }
    },
    changeNav(val){
      let strurl = val.path.match(/^(\/[\w]+)\/?/)[1];
      let arr = ['/WaterSideIndex','/CenterSideIndex','/WaterSideIndex2','/HallBusiness','/CustomerAnalysisReport','/ChargeAnalysisStatement','/EngineeringAnalysisReport','/StatementAnalysisReport'];
      if(arr.includes(val.path)){
        this.menuShow = false;
        $(".primary-menu").css('width','0px');
        $('.kl-container').css('width','calc(100% - 30px)');
        $('.primary-menu .kl-aside').css('display','none');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-right').removeClass('el-icon-arrow-left');
    	}else{
        this.menuShow = true;
        $(".primary-menu").css('width','200px');
        $('.kl-container').css('width','calc(100% - 230px)');
        $('.primary-menu .kl-aside').css('display','block');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-left').removeClass('el-icon-arrow-right');
      }
      this.firstNav.navData.navList.forEach((item,index)=>{
        if(strurl===item.path){
          this.secondNav.navList = item.children;
        }
      })

      
    },
    navTreeHandleSelect(key, keyPath){

        this.activeIndex = key;
        
    },
    collapse(){
        this.util.menuShow('.primary-menu','.kl-container','.primary-menu .kl-aside','.primary-menu .leftChange')
    }
  },
  watch: {
    controllChilder(a,b){
    },
    defaultPage(){
      return this.defaultPage 
    },
    MenuData(){
        // console.log(this.MenuData)
        return this.MenuData
    },
    $route(newVal){
      this.changeNav(newVal);
    }
    

  },

}
</script>

<style lang="scss">
@import "../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color:#297acc;
.qianfei {
    .el-dialog {
      height: 80% !important;
    }
  }
.el-checkbox__label{
  font-size: 12px;
}
.searchInput,.bigSelect{
  width: 220px;
  .el-form-item__content{
    width: calc(100% - 65px);
  }
  .el-input__inner,.el-select{
    width: 100%;
  }
}
.bigSelect{
  width: 230px;
}
.el-dialog{
  margin: 0 auto;
  width: 80%;
  height: 94%;
  margin-top: 38px !important;
}
.center-side-right .table-top{
  margin-top: 20px;
  .el-table__body-wrapper{
  font-weight: 700;
}
.el-table__body-wrapper tr td:nth-child(1) .cell {
  color: #3195f4;
  cursor: pointer;
  }
}
.custom-home .tab-title {
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0;
  background: #fff;
  color: #000;
  border-radius: 6px 6px 0 0;
  padding-left: 20px;
  font-size: large;
  font-weight: 600;
  border-bottom: 1px solid #f3f5fb;
  span{
  font-weight: 400;
  }
}
.custom-home .tab-title i {
  width: 4px;
  background: #c4d600;
  border-radius: 4px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f5f5f5;
}
#firstNav .title{
    height: 38px;
}
#firstNav .nav .navList > li{
    line-height: 25px;
    height:24px !important;
}
.el-table__header{
    th{
        color: #111;
        background: #F3F5FB;
    }  
}
// .el-table .cell{
//     line-height: 30px;
//     height: 30px;
// }
.toolbar{
    padding:10px 20px;
    &:after{
            @include _clearBoth()
        }
    .form-left{
        float: left;
        margin-bottom: 0px;
    }
    .form-right{
        float: right;
        margin-bottom: 0px;
        margin-right: 0px;
    }
    
}

.custom-home {
  background:#eaf4ff;
  zoom: 1;
  &:after{
      @include _clearBoth()
  }
  .title{
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    height: 50px;
    /* line-height: 50px; */
    padding: 0 20px;
  }
  height: 100%;
  .select-tree {
    z-index: 3000;
    position: fixed;
    right: 0;
    top: 60px;
    height: calc(100% - 60px);
    /*background: #ccc !important;*/
    transition: width 500ms linear;
    box-shadow: 0 0 10px 0 #ccc;
  }
  .show-tree {
    width: 300px;
  }
  .hide-tree {
    width: 0px;
  }
  header {
    height: 68px;
    background-color: #297acc;
    .header-top {
      // display: flex;
      padding-right:30px;
      color: #fff;
      text-align: center;
      height: 68px;
      line-height: 38px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      zoom: 1;
      &::after{
        display:block;
        content:"";
        clear:both;
      }
      .nav-right{

        height: 38px;
      }
      .header-top-left {
        float:left;
        height: 38px;
        // & > * {
        //   float: left;
        //   margin-top: px2rem(8);
        // }
        img {
          // margin-right: px2rem(30);
          height: 34px;
          vertical-align: middle;
          line-height: 34px;
          margin-top: -13px;
        }
        i{
          width: 1.8px;
          height: 20px;
          margin-top: 9px;
          background-color: #dfdfea;
          display: inline-block;
          opacity: 0.5;
        }
        & > p {
          float: left;
          height: px2rem(24px);
          border-right: 1px solid #000;
          margin: px2rem(27) px2rem(20);
        }
        span {
          font-weight: bolder;
          font-size: 18px;
          vertical-align: top;
        }
      }
      // .header-outer {
      //   width: 55%;
      //   display: flex;
      //   flex: 1;
      //   .header-menu {
      //     background-color: #0c6ad7;
      //     border-right: 0px;
      //     display: flex;
      //     width: 50%;
      //     .el-menu-item:hover {
      //       background: #0c6ad7;
      //       color:#fff;
      //     }
      //     .el-menu-item {
      //       height: 100%;
      //     }
      //     .is-active {
      //       background: $theme-color !important;
      //     }
      //   }
      //   ul {
      //     height: 100%;
      //     .menu-item {
      //       display: flex;
      //       cursor: pointer;
      //     }
      //     .left-icon {
      //       height: 50px;
      //       width: 25px;
      //       background: url(../assets/images/icon.png) no-repeat;
      //     }
      //     li {
      //       font-size: 12px;
      //       display: flex;
      //       padding-left: 10px !important;
      //       padding-right: 10px !important;
      //     }
      //     li:hover {
      //       background: #0c6ad7 !important;
      //     }
      //   }
      // }
      & > b {
        font-size: 20px;
      }
      .kl-button--mini {
        padding: 2px 10px;
      }
      
    }
  }
  .header-top-right {
        // margin-right: px2rem(30);
        // margin-left:5.7rem;
        display: flex;
        align-items: center;
        height: 100%;
        float:right;
        .el-input__icon{
          line-height: 45px;
        }
        & > span{
          color:#fff;
          font-size: 14px;
          i{
            color: #fff;
            font-size: 14px;
            vertical-align: middle;
            height: 14px;
            width: 14px;
          }
        }
        & > * {
          float: left;
        }
        .el-button--primary {
          border-color: #f78e1e;
          background-color: #f78e1e;
        }
        i {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 10px;
          img {
            width: 30px;
            height: 30px;
            float: left;
          }
        }
        b {
          height:36px;
          line-height:36px;
          font-size:14px;
          padding: 0 20px 0 10px;
          font-weight:400;
        }
        & > div {
          // height:36px;
          // line-height: px2rem(45px);
          position: relative;
          font-size: 24;
          color: #4bcb7c;
          // margin-top: -5px;
          margin-right: 10px;
          u {
            position: absolute;
            padding: 5px;
            border-radius: 50%;
            top: 5px;
            right: 0;
            &.active {
              background: red;
            }
          }
          .el-input.el-input--suffix {
            input {
              border: 0;
              color: #000;
              width: 2.5rem;
              padding-right: 0;
              padding-left: 10px;
              font-size: 12px;
              width: 90px;
              height: 26px;
            }
            .el-input__suffix {
              right: -4px;
              top: -3px;
              .el-input__suffix-inner {
                .el-select__caret {
                  height: auto;
                  // margin-top: -4px;
                }
              }
            }
          }
        }
      }
  .first_box {
    width: 100%;
    height: 0.35rem;
    .menu {
      height: 100%;
      div {
        display: inline-block;
        // width: 7%;
        height: .25rem;
        line-height: .25rem;
        background: white;
        text-align: center;
        border-radius: .05rem;
        border: 1px solid red;
        margin-left: .1%;
        cursor: pointer;
        margin-top: .4%;
        span {
          font-size: .12rem;
          color: #428ad2;
          // vertical-align: middle;
          line-height: 70%;
          display: inline-block;
          // margin-top: 2%;
          padding:0.1rem;
        }
      }
    }
  }

  & > .kl-container {
    height: calc(100% - 90px);
    position: relative;
    background: #eaf4ff;
    padding:10px;
    float:left;
    width: 100%;
    .kl-aside {
      position: absolute;
      left: 10px;
      top: 10px;
      width: $imgWidth;
      z-index: 1000;
      background: #fff;
      height: calc(100% - 18px);
      color: #000;
      border-radius: 3px;
    }
    .kl-main {
      height: 100%;
      margin-left: 210px ;
      border-radius: 3px;
      background: #fff;
      .model-first-rank{
        padding:0px;
      }
    }
  }
  & > .primary-menu{
    float:left;
    width: 200px;
    height:  calc(100% - 90px);
    position: relative;
    background: #fff;
    margin: 10px;
    margin-right: 0px;
      .kl-aside {
        position: absolute;
        left: 0px;
        top: 10px;
        width: 200px;
        z-index: 1000;
        background: #fff;
        height: calc(100% - 18px);
        color: #000;
        border-radius: 3px;
          .el-menu{
          width: 100%;
          border: none;
          overflow:auto;
          background: transparent;
          background: #fff;
          height: 100%;

          .el-menu-item{
              height: 38px;
          }

          .el-menu-item.is-active{
              background: #328ED1;
              color: #fff;
          }
          
          .el-menu-item{
              width: 100%;
    
              text-align: center;
          }
          .el-menu-item,
          // .el-submenu {
          //     i:first-child {
          //     display: inline-block;
          //     width: 15px;
          //     height: 20px;
          //     background-size: 100%;
          //     }
          // }
          li.el-submenu {
              color: #000;
              .el-menu {
              background: transparent;
              }
              .el-submenu__title {
              text-align: left;
              height: 50px !important;
              line-height: 50px !important;
              font-size: 14px;
              font-weight: 700;
              &:hover,
              &:focus {
                  background: $theme-color;
              }
              }
          }
          .el-menu-item {
              background: transparent;
              color: #3b3a3a;
              text-align: left;
              height: 38px !important;
              line-height: 38px !important;
              font-size: 14px;
              font-weight:700;
              &:hover,
              &:focus {
              background: $theme-color;
              }
              &.is-active {
              background: $theme-color;
              color: #fff;
              height: 38px !important;
              line-height: 38px !important;
              }
          }
        }
        .kr-title {
        color:#3195f4;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        text-align:center
        }

      .switch-btn {
          position: relative;
          width: 18px;
          height: 100%;
          float: left;
          background: rgba(0, 70, 142, 0.1);
          line-height: 100%;
          text-align: center;
          .glyphicon-menu-right,
          .glyphicon-menu-left {
          vertical-align: middle;
          background: rgb(0, 70, 141);
          color: #fff;
          height: 60px;
          line-height: 60px;
          font-weight: bolder;
          position: absolute;
          top: 50%;
          left: 3%;
          transform: translateY(-50%);
          border-radius: 0 3px 3px 0;
          }
      }
      }
      .kl-main {
      height: 100%;
      margin-left: 210px ;
      border-radius: 3px;
      background: #fff;
      .model-first-rank{
          padding:0px;
      }
    }

  }
}
.el-select-dropdown__item {
  padding: 0 17px;
}

.header-menu {//ul
  background-color: #0c6ad7;
  border-right: 0px !important;
  display: flex;
  width: 50%;
  height: 100%;
    .menu-item{
      padding:3px;
      & > li{
        padding: 11px 15px !important;
        height: 24px;
        font-size:12px;
      }
      .el-menu-item{       
        line-height: 2px;
        border-radius: 2px;
        color: #297acc;
      }
    }
  .el-menu-item:hover {//li
    background: #cdcdcd !important;
    color:#297acc !important;
  }
  .el-menu-item {
    height: 100%;
  }
  .is-active {
    background: #328ed1 !important;
    color:#fff !important;
  }
}
#firstNav .setting {
    margin-right: 30px;

}
#firstNav .nav .navList > li{
    min-width: 115px !important;
}

.read-only.el-input.is-disabled  .el-input__inner{
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  border-radius: 0px;
  cursor:text !important;
  &::-webkit-input-placeholder{
    color: #000;
  }
  &::-moz-placeholder{
    color: #000;
  }
  &:-ms-input-placeholder{
    color: #000;
  }
}


.el-table{
    padding:0px;
    .el-input__inner{
        border:none;
        background: transparent;
        height: 30px;
        line-height: 30px;
        padding-right: 0px;
        width: 100% !important;
        padding-left: 0px;
    }
    .el-input__inner:hover{
        border: 1px solid #b8bdca;
    }
    .el-date-editor .el-input__inner{
      padding-left: 30px;
    }
}
#app .center-side .el-dialog{
    width: 70% !important;
    .el-dialog__body {
        height: calc(100% - 56px);
       
    }
}
#app .searchBtn{
  background:#faa646;
  color:#fff;
}
#app .textareaBecs{
            width: 100%;
            .el-form-item__content{
                width: 50%;
            }
        }
#app .basicInfoForm{
      margin: 20px;
        .el-form-item{
            margin-bottom: 18px;
            width: 75%;
            .el-form-item__content{
                width: calc(100% - 150px);
              .el-select{
              width: 100%;
              }
            }
        }
        .el-input--mini /deep/ .el-input__inner{
                width: 100% !important;
        }
}
#app .water-side .el-tabs,#app .WaterSideIndex2 .el-tabs{
    height: 100%;
    width: 100%;
    .el-tabs__header{
        height: 41px;
        width: 100%;
        margin-bottom: 0px;            
    }
    .el-tabs__content{
        // height: calc(100% - 41px);
        height: 100%;
        width: 100%;
    }
    .el-tab-pane{
      width: 100%;
      height: 100%;
    }
}
#app .WaterSideIndex2 .el-tabs .el-tabs__content{
  // width: calc(100% - 30px);
}
  #app .toolbar-line{
          width: 4px;
          background: #c4d600;
          border-radius: 4px;
          height: 18px;
          display: inline-block;
          vertical-align: middle;
        }
  #app .toolbar-font{
          font-weight: 700;
          font-size: 16px;
          height: 19px;
          display: inline-block;
          line-height: 19px;
          vertical-align: middle;
  }
  #app .toolbar-fontSon{
          font-size: 14px;
          height: 19px;
          display: inline-block;
          line-height: 19px;
          vertical-align: middle;
  }
#app .water-side .mydestop .el-tabs .el-tabs__content{
  width: calc(100% - 41px);
}
#app .bread-contain{
  width: calc(100% - 10px);
  zoom: 1;
  border-bottom: 1px solid #eaf4ff;
  &::after{
    @include _clearBoth()
  }
  .bread-contain-right{
    float:right;
    width: 50%;
    text-align: right;
    line-height: 40px;
  }
  #crumbs{
    float:left;
    width: 40%;
    padding-right: 0px;
    // .is-link{
    //   color: #606266 !important;
    //   font-weight: 500 !important;
    // }
    // .el-breadcrumb__inner{
    //   font-weight: 700;
    //   color: #409eff; 
    // }
  }
}
.date-picker .el-date-editor{
  display: inline-block;
  width: calc(100% - 30px) !important;
  .el-input__inner{
    width: 100% !important;
    border: none;
    border-bottom: 1px solid #ccc;
    background-color: transparent;
    border-radius: 0px;
  }
}
 #app .center-side .quotaSetting .el-dialog__body,#app .WaterSideIndex2 .quotaSetting .el-dialog__body{
       height: calc(100% - 136px);
 }
 #app .center-side .echartsWaterSaless .el-dialog{
        height: 70%;
        margin-top: 30px !important;
    } 
#app .el-input.is-disabled .el-input__inner{
  color: #000;
}
#app .collapse{
    z-index: 1122;
    position: absolute;
    right: 0;
    top: 50%;
    margin-bottom: 25px;
    cursor: pointer;
    background-color: #000;
    color: #f3f3f3;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    -webkit-border-top-left-radius: 3px;
    -webkit-border-bottom-left-radius: 3px;
    -moz-border-radius-topleft: 3px;
    -moz-border-radius-bottomleft: 3px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    filter: alpha(opacity=25);
    -moz-opacity: .25;
    opacity: .25;
    
}
#app .animation{
  transition: all 0.5s;
  -webkit-transform: translateX(0px);
  -ms-transform: translateX(0px);
  transform: translateX(0px);
}
#app .water-side .el-tabs__header.is-top{
    display: none !important;
}
#app .el-checkbox__input.is-checked+.el-checkbox__label{
  margin-right: 0px !important;
}
</style>
