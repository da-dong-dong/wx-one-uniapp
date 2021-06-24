import Vue from 'vue'
import App from './App'
import store from './store'
// 导航栏
import tabBar from './components/tabbar.vue'
//权限封装
import {fnPermissionUi,fnPermissionShopId,fnPermissionShopIdArr} from './util/power'
// 封装request
// 全局使用stroe
Vue.prototype.$store = store;
Vue.config.productionTip = false
//权限ui
Vue.prototype.fnPermissionUi = fnPermissionUi
//门店id
Vue.prototype.fnPermissionShopId = fnPermissionShopId
//门店数组
Vue.prototype.fnPermissionShopIdArr = fnPermissionShopIdArr

// 导入导航栏组件
Vue.component('tabBar', tabBar)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

Vue.filter('time',function(dataStr,pattern = ''){
	if(dataStr){
		let dt = new Date(Number(dataStr))
		let y = dt.getFullYear()
		let m = (dt.getMonth() + 1).toString().padStart(2, 0)
		let d = dt.getDate().toString().padStart(2, 0)
		return `${y}-${m}-${d}`
	}else{
		return '未选定时间'
	}
})
Vue.filter('times',function(dataStr,pattern = ''){
	if(typeof(dataStr)=='string') return dataStr
		if(dataStr){
			 let dt = new Date(dataStr)
			 let y = dt.getFullYear()
			 let m = dt.getMonth()+1;
			 let d = dt.getDate()
			 return `${y}-${m}-${d}`
		}else{
			return '未选定时间'
		}
})

// 预约时间
Vue.filter('reservationTime',function(dataStr,pattern = ''){
	if(dataStr){
		return dataStr
	}else{
		return ''
	}
})