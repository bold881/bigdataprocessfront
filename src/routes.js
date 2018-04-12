import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Dashboard from './views/Dashboard.vue'
import Page5 from './views/Page5.vue'
import Page6 from './views/Page6.vue'
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
            { path: '/dashboard', component: Dashboard, name: '', hidden: true },
            { path: '/user', component: user, name: '投放活动' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '效果中心',
        iconCls: 'el-icon-star-off',
        children: [
            { path: '/page5', component: Page5, name: '广告主报告' },
            { path: '/page6', component: Page6, name:"活动报告"}
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