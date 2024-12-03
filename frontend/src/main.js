import 'animate.css';
import  './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { ElTable, ElTableColumn } from 'element-plus';
import 'element-plus/theme-chalk/el-table.css';
import 'element-plus/theme-chalk/el-table-column.css';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.component(ElTable.name, ElTable);
app.component(ElTableColumn.name, ElTableColumn);
app.use(router);
app.mount('#app');