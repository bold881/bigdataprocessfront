import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '投放中心',
        iconCls: 'el-icon-message',
        children: [
            { path: '/dashboard', component: Page4, name: '', hidden: true },
            { path: '/user', component: user, name: '投放活动' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '效果中心',
        iconCls: 'el-icon-star-off',
        children: [
            { path: '/page4', component: echarts, name: '广告主报告' },
            { path: '/page5', component: Page5, name:"Page5"}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '客户中心',
        iconCls: 'el-icon-view',
        children: [
            { path: '/form', component: Form, name: '客户网站信息管理' },
            { path: '/table', component: Table, name: '客户公司信息管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;