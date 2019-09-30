
export default ([
   {// 用户工程-工程登记
        path: '/EngineeringCenter',
        meta: {
        title: '工程中心'
        },
        component: resolve => require(['@/views/EngineeringCenter'], resolve),
        children:[
            {
                path: '/',
                redirect:"Processing"
            },
            {
                path: 'EngineeringRegistration',
                meta: {
                title: '工程登记'
                },
                component: resolve => require(['@/views/EngineeringCenter/EngineeringRegistration.vue'], resolve)
            },
            {// 用户工程-处理中
                path: 'Processing',
                meta: {
                title: '处理中'
                },
                component: resolve => require(['@/views/EngineeringCenter/Processing.vue'], resolve)
            },
            {// 用户工程-处理完成
                path: 'ProcessingCompleted',
                meta: {
                title: '处理完成'
                },
                component: resolve => require(['@/views/EngineeringCenter/ProcessingCompleted.vue'], resolve)
            },
            {// 用户工程-全部工程
                path: 'AllProjects',
                meta: {
                title: '全部工程'
                },
                component: resolve => require(['@/views/EngineeringCenter/AllProjects.vue'], resolve)
            },
            {// 用户工程-工程计提
                path: 'ProjectProvision',
                meta: {
                title: '工程计提'
                },
                component: resolve => require(['@/views/EngineeringCenter/ProjectProvision.vue'], resolve)
            },
            {// 内部工程-工程登记
                path: 'insideEngineeringRegistration',
                meta: {
                title: '工程登记'
                },
                component: resolve => require(['@/views/EngineeringCenter/insideEngineeringRegistration.vue'], resolve)
            },
            {// 内部工程-处理中
                path: 'insideProcessing',
                meta: {
                title: '处理中'
                },
                component: resolve => require(['@/views/EngineeringCenter/insideProcessing.vue'], resolve)
            },
            {// 内部工程-处理完成
                path: 'insideProcessingCompleted',
                meta: {
                title: '处理中'
                },
                component: resolve => require(['@/views/EngineeringCenter/insideProcessingCompleted.vue'], resolve)
            },
            {// 内部工程-全部工程
                path: 'insideAllProjects',
                meta: {
                title: '全部工程'
                },
                component: resolve => require(['@/views/EngineeringCenter/insideAllProjects.vue'], resolve)
            },
            {// 内部工程-工程计提
                path: 'insideProjectProvision',
                meta: {
                title: '工程计提'
                },
                component: resolve => require(['@/views/EngineeringCenter/insideProjectProvision.vue'], resolve)
            },
        ]
    },
  ])