import AdminMain from '../views/AdminMain.vue';
import ShanghaiPoi from '../views/ShanghaiPoi';

export default [{
    path: '/', 
    component: AdminMain,
    leaf: true,
    children: [{
        path: 'ShanghaiPoi', 
        component: ShanghaiPoi,
        name: '易游上海poi校验',
        iconClass: 'fa-map'
    }]
}, {
    path: '/parent',
    name: '辅助功能',
    iconClass: 'home',
    leaf: false,
    children: [{
        path: 'ShanghaiPoi1', 
        component: ShanghaiPoi,
        name: '子节点1',
        iconClass: 'event'
    }, {
        path: 'ShanghaiPoi2', 
        component: ShanghaiPoi,
        name: '子节点2',
        iconClass: 'info'
    }]
}];
