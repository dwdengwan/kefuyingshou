// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery'
import store from './store/store'
import axios from 'axios'

// 统一ui
import companyComponents from 'component-public-company'
import 'component-public-company/src/lib/css/allStyle.css'
Vue.use(companyComponents)

import { MP } from './map/map.js'
Vue.prototype.$mp = MP;

Vue.prototype.$axios = axios;
import api from './fetch/api.js'
Vue.prototype.$api = api;
import http from '@/assets/js/api.js'
Vue.prototype.$http = http;

import 'default-passive-events'

// 公用函数工具
import util from '@/assets/js/util.js'
Vue.prototype.util = util;
import adapt from './tableadapt/adapt.js'
Vue.prototype.$changeTable = adapt.changeTable;

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// import '../plugins/ztree/js/jquery.ztree.core.min'
// import '../plugins/ztree/js/jquery.ztree.excheck.min'
// import '../plugins/ztree/zTreeStyle/zTreeStyle.css'
// import FullCalendar from 'vue-fullcalendar'//日历插件
// Vue.use(FullCalendar)

//高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '6cd5aa0e6752ea8bfdc7984179395f51',
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType','AMap.Geocoder','AMap.Geolocation'],
    uiVersion: '1.0.11'
})

window.$baseUrl = process.env.baseUrl
Vue.config.productionTip = false;

Vue.use(ElementUI);
// 鼠标右击事件
import VueContextMenu from 'vue-contextmenu'
Vue.use(VueContextMenu)

// bus总线
window.eventBus = new Vue();

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
