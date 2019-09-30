
export default ([
    {//系统管理
        path: '/SystemSet',
        meta: {
          title: '系统设置'
        },
        component: resolve => require(['@/views/SystemSet/DatabaseManage'], resolve),
        children:[
            {
                path: '/',
                redirect:"RoleManage"
            },
            {//系统管理-部门管理
                path: 'DepartManage',
                meta: {
                title: '部门管理'
                },
                component: resolve => require(['@/views/SystemSet/DepartManage'], resolve),
                children:[],
            },
            {//系统管理-应用系统管理
                path: 'ApplicationSystemManage',
                meta: {
                title: '应用系统管理'
                },
                component: resolve => require(['@/views/SystemSet/ApplicationSystemManage'], resolve),
                children:[],
            },
            {//系统管理-微信公众号管理
                path: 'WeChat',
                meta: {
                title: '微信公众号管理'
                },
                component: resolve => require(['@/views/SystemSet/WeChat/AddSet'], resolve),
                children:[],
            },
            {//系统管理-组织管理
                path: 'OrganizaManage',
                meta: {
                title: '组织管理'
                },
                component: resolve => require(['@/views/SystemSet/OrganizaManage/Edit'], resolve),
                children:[],
            },
            {//系统管理-水司管理
                path: 'WaterManage',
                meta: {
                title: '水司管理'
                },
                component: resolve => require(['@/views/SystemSet/WaterManage'], resolve),
                children:[],
            },
            {//系统管理-用户管理
                path: 'UserManage',
                meta: {
                title: '用户管理'
                },
                component: resolve => require(['@/views/SystemSet/UserManage/Add'], resolve),
                children:[],
            },
            {//系统管理-模块管理
                path: 'ModelManage',
                meta: {
                title: '模块管理'
                },
                component: resolve => require(['@/views/SystemSet/ModelManage'], resolve),
                children:[],
            },
            {//系统管理-日志管理
                path: 'LogManage',
                meta: {
                title: '日志管理'
                },
                component: resolve => require(['@/views/SystemSet/LogManage'], resolve),
                children:[],
            },
            {//系统管理-角色管理-角色管理
                path: 'RoleManage',
                meta: {
                title: '角色管理'
                },
                component: resolve => require(['@/views/SystemSet/RoleManage'], resolve),
                children:[],
            },
            {//系统管理-角色管理-用户角色配置
                path: 'UserRoleSet',
                meta: {
                title: '用户角色配置'
                },
                component: resolve => require(['@/views/SystemSet/RoleManage/UserRoleSet/Add'], resolve),
                children:[],
            },
            {//系统管理-权限管理-菜单查看权
                path: 'MenuViewRight',
                meta: {
                title: '菜单查看权'
                },
                component: resolve => require(['@/views/SystemSet/JurisdictionManage/MenuViewRight'], resolve),
                children:[],
            },
            {//系统管理-权限管理-增删改权
                path: 'Add',
                meta: {
                title: '增删改权'
                },
                component: resolve => require(['@/views/SystemSet/JurisdictionManage/Add'], resolve),
                children:[],
            },
            {//系统管理-权限管理-部门查看权
                path: 'DepartViewRight',
                meta: {
                title: '部门查看权'
                },
                component: resolve => require(['@/views/SystemSet/JurisdictionManage/DepartViewRight/Select'], resolve),
                children:[],
            },
            {//系统管理-权限管理-区域查看权
                path: 'AreaViewRight',
                meta: {
                title: '区域查看权'
                },
                component: resolve => require(['@/views/SystemSet/JurisdictionManage/AreaViewRight'], resolve),
                children:[],
            },
        ],
    },
])