import Vue from 'vue'
import Router from 'vue-router'
import WatchCenter from "./modules/WatchCenter"
import ReportCenter from "./modules/ReportCenter"
import FinancialCenter from "./modules/FinancialCenter"
import ServiceCenter from "./modules/ServiceCenter"
import MeterReadingCenter from "./modules/MeterReadingCenter"
import EngineeringCenter from "./modules/EngineeringCenter"
import CustomerCenter from "./modules/CustomerCenter"
import BasicSet from "./modules/BasicSet"
import SystemSet from "./modules/SystemSet"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '主容器'
      },
      component: resolve => require(['@/views/home'], resolve),
      children:[
      	{
          path: '/',
          meta: {
            title: '水司端首页'
          },
          component: resolve => require(['@/views/WaterSideIndex'], resolve)
        },
        {
          path: '/WaterSideIndex',
          meta: {
            title: '水司端首页1'//important
          },
          component: resolve => require(['@/views/WaterSideIndex'], resolve)
        },
        {
          path: '/WaterSideIndex2',
          meta: {
            title: '领导首页'//important
          },
          component: resolve => require(['@/views/WaterSideIndex/WaterSideIndex2'], resolve)
        },
        {
          path: '/HallBusiness',
          meta: {
            title: '工作台'//important
          },
          component: resolve => require(['@/views/ServiceCentre/HallBusiness'], resolve)
        },
        {
          path: '/CenterSideIndex',
          meta: {
            title: '集团首页'
          },
          component: resolve => require(['@/views/CenterSideIndex'], resolve)
        },

        // 统计报表
        ...ReportCenter,
        // 工程中心
        ...EngineeringCenter,
        // 表计管理
        ...WatchCenter,
        // 客户管理
        ...CustomerCenter,
        // 抄表中心
        ...MeterReadingCenter,
        // 系统设置
        ...BasicSet,
        // 系统管理
        ...SystemSet,
        // 收费管理
        ...FinancialCenter,
        // 信息发布
        ...ServiceCenter,
        // 销售管理
        {
          path: '/CustomerAnalysisReport',
          meta: {
            title: '销售管理'
          },
          component: resolve => require(['@/views/CustomerAnalysisReport'], resolve),
          children:[]
        },
        // 客户管理
        {
          path: '/ChargeAnalysisStatement',
          meta: {
            title: '客户管理'
          },
          component: resolve => require(['@/views/ChargeAnalysisStatement'], resolve),
          children:[]
        },
        // 业务办理
        {
          path: '/EngineeringAnalysisReport',
          meta: {
            title: '业务办理'
          },
          component: resolve => require(['@/views/EngineeringAnalysisReport'], resolve),
          children:[]
        },
        // 呼叫中心
        {
          path: '/StatementAnalysisReport',
          meta: {
            title: '呼叫中心'
          },
          component: resolve => require(['@/views/StatementAnalysisReport'], resolve),
          children:[]
        },
        // 微厅分析报表
        {
          path: '/MicrosoftAnalysisReport',
          meta: {
            title: '微厅分析报表'
          },
          component: resolve => require(['@/views/MicrosoftAnalysisReport'], resolve),
          children:[]
        },
        // 网厅分析报表
        {
          path: '/NetOfficeAnalysisReport',
          meta: {
            title: '网厅分析报表'
          },
          component: resolve => require(['@/views/NetOfficeAnalysisReport'], resolve),
          children:[]
        },
        // 智慧营业厅分析报表
        {
          path: '/AnalysisReportIntelligentBusiness',
          meta: {
            title: '智慧营业厅分析报表'
          },
          component: resolve => require(['@/views/AnalysisReportIntelligentBusiness'], resolve),
          children:[]
        },
      ]
    }
  ]
})
