<template>
	<view>
		<add 
			v-if="type === 'add'"
			:recordId="recordId"
			:oId="oId"
			:enAddressInfo="enAddressInfo"
			@openCalendar="openCalendar"
		></add>
		<updata 
			v-if="earlyBasic" 
			:earlyBasic="earlyBasic" 
			:type="type"
			@openCalendar="openCalendar"
		></updata>
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import updata from './components/updata.vue'
	import add from './components/add.vue'
	export default {
		components:{
			updata,
			add
		},
		data() {
			return {
				// 	账单ID
				recordId:null,
				// 订单Id
				oId:null,
				// 类型
				type:null,
				// 基本信息
				earlyBasic:null,
				// 日历返回时间
				calendarTime:null,
				// 接单人信息
				enAddressInfo:null,
			};
		},
		onLoad(op){
			this.recordId = Number(op.recordId)
			this.oId = Number(op.oId)
			this.type = op.type
			let pages = getCurrentPages()
			let prvePage = pages[pages.length - 2]; //当前页面
			if(op.type !== 'add'){
				this.earlyBasic = prvePage.data.earlyBasic
			}
			let title 
			switch(op.type){
				case 'collection':
					title = '后期收款'
					break
				case 'refund':
					title = '后期退款'
					break
				case 'add':
					title = '添加收款'
					break
			}
			uni.setNavigationBarTitle({
				title:title
			})
		},
		onShow(){
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			let address = currPages.data.address
			if(address){
				this.enAddressInfo = address
			}
		},
		mounted(){
		},
		methods:{
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历返回
			enSure(e){	
				this.calendarTime = Date.parse(new Date(e.fulldate))
			},
		},
	}
</script>

<style lang="scss" scoped> 
	@import '../components/updataPriceStyle.scss';
</style>
