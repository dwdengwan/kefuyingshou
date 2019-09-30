
export default ([
    {// 抄表-抄表线路
        path: '/MeterReadingCenter',
        meta: {
          title: '抄表中心'
        },
        component: resolve => require(['@/views/MeterReadingCenter'], resolve),
        children:[
            {
                path: '/',
                redirect:"MeterReadingRecord"
            },
            {
                path: 'MeterReadingCircuit',
                meta: {
                  title: '抄表路线'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MeterReadingCircuit.vue'], resolve)
            },
            {// 抄表-计划调整
                path: 'PlanAdjustment',
                meta: {
                title: '计划调整'
                },
                component: resolve => require(['@/views/MeterReadingCenter/PlanAdjustment.vue'], resolve)
            },
            {// 抄表-抄表记录
                path: 'MeterReadingRecord',
                meta: {
                title: '抄表记录'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MeterReadingRecord.vue'], resolve)
            },
            {// 抄表-水表关系
                path: 'MeterRelationship',
                meta: {
                title: '水表关系'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MeterRelationship.vue'], resolve)
            },
            {// 抄表-抄表设备管理
                path: 'MeterReadingEquipment',
                meta: {
                title: '抄表设备管理'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MeterReadingEquipment.vue'], resolve)
            },
            {// 抄表-抄表轨迹
                path: 'MeterReadingTrack',
                meta: {
                title: '抄表轨迹'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MeterReadingTrack.vue'], resolve)
            },
            {// 抄表-监控调度
                path: 'MonitorScheduler',
                meta: {
                title: '监控调度'
                },
                component: resolve => require(['@/views/MeterReadingCenter/MonitorScheduler.vue'], resolve)
            },
            {// 开账-批量开账
                path: 'BatchOpening',
                meta: {
                title: '批量开账'
                },
                component: resolve => require(['@/views/MeterReadingCenter/BatchOpening.vue'], resolve)
            },
            {// 开账-常规开账
                path: 'RegularOpening',
                meta: {
                title: '常规开账'
                },
                component: resolve => require(['@/views/MeterReadingCenter/RegularOpening.vue'], resolve)
            },
            {// 开账-册本信息
                path: 'BookInfo',
                meta: {
                title: '册本信息'
                },
                component: resolve => require(['@/views/MeterReadingCenter/BookInfo.vue'], resolve)
            },
            {// 开账-册本调整
                path: 'BookAdjustment',
                meta: {
                title: '册本调整'
                },
                component: resolve => require(['@/views/MeterReadingCenter/BookAdjustment.vue'], resolve)
            },
            {// 抄表中心-大用户
                path: 'BigUsers',
                meta: {
                title: '大用户'
                },
                component: resolve => require(['@/views/MeterReadingCenter/BigUsers.vue'], resolve)
            },
            {// 统计-异常用水分析
                path: 'AnomalyAnalysis',
                meta: {
                title: '水量异常'
                },
                component: resolve => require(['@/views/MeterReadingCenter/AnomalyAnalysis.vue'], resolve)
            },
            {// 统计-水表异常
                path: 'AbnormalVerification',
                meta: {
                title: '水表异常'
                },
                component: resolve => require(['@/views/MeterReadingCenter/AbnormalVerification.vue'], resolve)
            },
            {// 统计-水表异常
                path: 'QualityReading',
                meta: {
                title: '抄表质量检查'
                },
                component: resolve => require(['@/views/MeterReadingCenter/QualityReading/index'], resolve)
            },
            {// 统计-异常用水稽查
                path: 'AbnormalInspection',
                meta: {
                title: '异常用水稽查'
                },
                component: resolve => require(['@/views/MeterReadingCenter/AbnormalInspection.vue'], resolve)
            },
            {// 统计-用水排名表
                path: 'CustomTable',
                meta: {
                title: '客户用水排名表'
                },
                component: resolve => require(['@/views/MeterReadingCenter/CustomTable.vue'], resolve)
            },
            {// 统计-用水排名表
                path: 'PrecedenceTable',
                meta: {
                title: '用户用水排名表'
                },
                component: resolve => require(['@/views/MeterReadingCenter/PrecedenceTable.vue'], resolve)
            },
            {// 统计-用水排名表
                path: 'ZeroPay',
                meta: {
                title: '零水量查缴记录'
                },
                component: resolve => require(['@/views/MeterReadingCenter/ZeroPay/index'], resolve)
            },
            {// 统计-总分分析
                path: 'TotalScoreAnalysis',
                meta: {
                title: '总分分析'
                },
                component: resolve => require(['@/views/MeterReadingCenter/TotalScoreAnalysis.vue'], resolve)
            },
        ]
      },
  ])