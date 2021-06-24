import { getAllShopQY, getCategoryList, getOrigin } from '@/util/api/common.js'
import { getUserPermission } from '@/util/api/user.js'
export default{
	namespaced: true,
	state:{
		// 门店数组
		shopAllArr: [],
		// 订单分类 
		orderTypeArr: [],
		// 订单分组
		orderGroup: [],
		// 客户来源
		origin: [],
		// 客户区域
		category: [],
		// 服务等级
		serviceCategory: [],
		// 老师级别 
		teacherCategory: [],
		// 套系数组
		piceList: [],
		// 工具箱选择类
		toolType:[],
		// 礼包数组
		giftType:[],
		// 取件方式
		pickUp:[],
		// 预约档期
		schedule:[],
		// 档期标签
		label:[],
		// 消费类型
		consumeType:[],
		// 付款方式
		pay:[],
		// 收款项目
		receipt:[],
		// 支出项目
		spending:[],
		// 界面权限
		permission_ui:new Map(),
		// 功能权限
		permission_fn:new Map()
	},
	getters:{
		get_shopAllArr: state => state.shopAllArr,
		get_orderTypeArr: state => state.orderTypeArr,
		get_orderGroup: state => state.orderGroup,
		get_origin: state => state.origin,
		get_category: state => state.category,
		get_serviceCategory: state => state.serviceCategory,
		get_teacherCategory: state => state.teacherCategory,
		get_piceList: state => state.piceList,
		get_toolType: state => state.toolType,
		get_giftType: state => state.giftType,
		get_pickUp: state => state.pickUp,
		get_schedule: state => state.schedule,
		get_label: state => state.label,
		get_consumeType: state => state.consumeType,
		get_pay: state => state.pay,
		get_receipt: state => state.receipt,
		get_spending: state => state.spending,
		get_permission_ui: state => state.permission_ui,
		get_permission_fn: state => state.permission_fn,
	},
	mutations:{
		mut_shopAllArr (state, data) {
			state.shopAllArr = data
		},
		mut_orderTypeArr (state, data) {
			state.orderTypeArr = data
		},
		mut_orderGroup (state, data) {
			state.orderGroup = data
		},
		mut_origin (state,data) {
			state.origin = data
		},
		mut_category (state,data) {
			state.category = data
		},
		mut_serviceCategory (state,data) {
			state.serviceCategory = data
		},
		mut_teacherCategory (state,data) {
			state.teacherCategory = data
		},
		mut_piceList (state,data) {
			state.piceList = data
		},
		mut_toolType (state,data) {
			state.toolType = data
		},
		mut_giftType (state,data) {
			state.giftType = data
		},
		mut_pickUp (state,data) {
			state.pickUp = data
		},
		mut_schedule (state,data) {
			state.schedule = data
		},
		mut_label (state,data) {
			state.label = data
		},
		mut_consumeType (state,data) {
			state.consumeType = data
		},
		mut_pay (state,data) {
			state.pay = data
		},
		mut_receipt (state,data) {
			state.receipt = data
		},
		mut_spending (state,data) {
			state.spending = data
		},
		mut_permission_ui (state,data) {
			state.permission_ui = data
		},
		mut_permission_fn (state,data) {
			state.permission_fn = data
		},
	},
	actions:{
		act_shopAllArr ({ commit }) {
			getAllShopQY().then(res => {
				// let shopIdMap = new Map(res.data.data.map(item => [item.shopId, item.shopName]))
				commit('mut_shopAllArr', res.data.data)
			})
		},
		act_orderTypeArr ({ commit }) {
			getCategoryList({type:'ORDER_TYPE'}).then(res => {
				commit('mut_orderTypeArr', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_orderGroup ({ commit }) {
			getCategoryList({type:'ORDER_GROUP'}).then(res => {
				// let shopIdMap = new Map(res.data.data.map(item => [item.shopId, item.shopName]))
				commit('mut_orderGroup', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_origin ({ commit }) {
			// getOrigin().then(res => {
			// 	commit('mut_origin', res.data.data.list)
			// })
		},
		act_category ({ commit }) {
			getCategoryList({type:'CUSTOMER_REGION'}).then(res => {
				commit('mut_category', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_serviceCategory ({ commit }) {
			getCategoryList({type:'PACKAGE_SERVICE'}).then(res => {
				commit('mut_serviceCategory', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_teacherCategory ({ commit }) {
			getCategoryList({type:'PACKAGE_TEACHER'}).then(res => {
				console.log('老师等级', res.data.data)
				commit('mut_teacherCategory', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_piceList ({ commit }) {
			getCategoryList({type:'PACKAGE'}).then(res => {
				commit('mut_piceList', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_toolType ({ commit } ,data) {
			getCategoryList({type:data}).then(res => {
				commit('mut_toolType', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_giftType ({ commit }) {
			getCategoryList({type:'PACKAGE_GIFT'}).then(res => {
				commit('mut_giftType', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_pickUp ({ commit }) {
			getCategoryList({type:'PICKUP_METHOD'}).then(res => {
				commit('mut_pickUp', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_schedule ({ commit }) {
			getCategoryList({type:'TYPOGRAPHY_GROUP'}).then(res => {
				commit('mut_schedule', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_label ({ commit }) {
			getCategoryList({type:'TYPOGRAPHY_LABEL'}).then(res => {
				commit('mut_label', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_consumeType ({ commit }) {
			getCategoryList({type:'SALES_NAME'}).then(res => {
				commit('mut_consumeType', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_pay ({ commit }) {
			getCategoryList({type:'PAY_METHOD'}).then(res => {
				commit('mut_pay', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_receipt ({ commit }) {
			getCategoryList({type:'RECEIPT_NAME'}).then(res => {
				commit('mut_receipt', res.data.data.filter(_ => _.flag === false))
			})
		},
		act_spending ({ commit }) {
			getCategoryList({type:'FINANCE_EXPENDITURE'}).then(res => {
				commit('mut_spending', res.data.data.filter(_ => _.flag === false))
			})
		},

		//权限标识 界面权限
		act_permission_ui ({commit}) {
			getUserPermission({menu:true}).then(res=>{
				let data = res.data.data
				let dataMap = new Map(data.map(_ => [_.authority, _.shopIds]))
				commit('mut_permission_ui',dataMap)
				console.log(data,'界面权限',dataMap)
			})
		},
		//权限标识 功能权限
		act_permission_fn ({commit}) {
			getUserPermission({menu:false}).then(res=>{
				let data = res.data.data
				let dataMap = new Map(data.map(_ => [_.authority, _.shopIds]))
				commit('mut_permission_fn',dataMap)
				console.log(data,'功能权限',dataMap)
			})
		}
		
	}
}