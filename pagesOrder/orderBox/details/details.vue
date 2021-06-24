<template>
	<view>
		<!-- 修改按钮 -->
		<ModifyButton @buttomType="buttomType"></ModifyButton>
		
		<!-- 订单详情 -->
		<orderInfoModul :openInfo="openInfo"></orderInfoModul>
		
		<!-- 客户来源 -->
		<sourceModule :openInfo="openInfo"></sourceModule>
		
		<!-- 客户信息 -->
		<userInfoModule :openInfo="openInfo"></userInfoModule>
		
		<!-- 儿童信息 -->
		<baby v-if="showBaby" :openInfo="openInfo"></baby>
		
		<!-- 客户联系人信息 -->
		<contactInfoModule :openInfo="openInfo"></contactInfoModule>
		
		<!-- 套系内容 -->
		<orderPriceModule :openInfo="openInfo"></orderPriceModule>
		
		<!-- 修改来源模态框 -->
		<updataSourceModal :openInfo="openInfo" v-if="showUserSource" @cancel="cancel" @ok="ok"></updataSourceModal>
		
		<!-- 修改区域模态框 -->
		<updataAreaModal :openInfo="openInfo" v-if="showUserArea" @cancel="cancel" @ok="ok"></updataAreaModal>
		
		<!-- 修改套系模态框 -->
		<updataSystemModal :openInfo="openInfo" v-if="showUserSystem" @cancel="cancel" @ok="ok"></updataSystemModal>
		
		<!-- 选择修改套系 -->
		<chooseItemModal :openInfo="openInfo" v-if="showOnItem" :updataItemType="updataItemType" @cancel="cancel"></chooseItemModal>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import ModifyButton from './components/ModifyButton.vue'
	import orderInfoModul from './components/orderInfoModul.vue'
	import sourceModule from './components/sourceModule.vue'
	import userInfoModule from './components/userInfoModule.vue'
	import baby from './components/baby.vue'
	import contactInfoModule from './components/contactInfoModule.vue'
	import orderPriceModule from './components/orderPriceModule.vue'
	import { getOrderDetails } from '@/util/api/shop.js'
	
	import chooseItemModal from './modify/components/chooseItemModal.vue'
	import updataSourceModal from './modify/components/updataSourceModal.vue'
	import updataAreaModal from './modify/components/updataAreaModal.vue'
	import updataSystemModal from './modify/components/updataSystemModal.vue'
	export default {
		components:{
			ModifyButton,
			orderInfoModul,
			sourceModule,
			userInfoModule,
			baby,
			contactInfoModule,
			orderPriceModule,
			
			chooseItemModal,
			updataSourceModal,
			updataAreaModal,
			updataSystemModal
		},

		data() {
			return {
				// 订单号
				orderId: null,
				// 订单详情
				openInfo:null,
				
				// 显示儿童
				showBaby:false,
				
				// 显示修改客户来源模态框
				showUserSource:false,
				// 显示修改客户区域模态框
				showUserArea:false,
				// 显示修改套系信息模态框
				showUserSystem:false,
				
				// 选择编辑套系模态框
				showOnItem:false,
				// 选择编辑套系类型
				updataItemType:null,
			};
		},
		onLoad(option){
			this.orderId = option.orderId
			// this.orderId = 321
		},
		onShow(){
			this.getOrderDetails()
			uni.$emit('changeItem')
		},
		mounted(){
		},
		methods:{
			// 获取订单详情
			getOrderDetails(){
				getOrderDetails({orderId:this.orderId}).then(res=>{
					this.openInfo = res.data.data
					if(res.data.data.type === 'BABY'){
						this.showBaby = true
					}
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.setData({
						isChange: true
					})
				})
			},
			
			
			// 修改区块模态框确定
			ok(){
				this.getOrderDetails()
				this.showUserSource = false
				this.showUserArea = false
				this.showUserSystem = false
				$Message({
					content: '修改成功',
					type: 'success'
				});
			},
			//修改区块模态框取消 
			cancel(){
				this.showUserSource = false
				this.showUserArea = false
				this.showUserSystem = false
				this.showOnItem = false
			},
	
			// 按键返回值
			buttomType(e){
				switch(e){
					// 开单信息
					case 'orderInfo':
						uni.navigateTo({
							url:'./modify/modifyOrderInfo/modifyOrderInfo?id=' + this.orderId
						})
						break;
					// 客户来源
					case 'userSource':
						this.showUserSource = true
						break;
					// 客户区域
					case 'userArea':
						this.showUserArea = true
						break
					// 套系信息
					case 'systemInfo':
						this.showUserSystem = true
						break
					// 入册/入底
					case 'bookAndBottom':
						if(this.openInfo.orderItemVos.length === 1){
							uni.navigateTo({
								url:'./modify/modifyItemInfo/modifyItemInfo?id=' + this.openInfo.orderId + '&itemId=' + this.openInfo.orderItemVos[0].itemId
							})
						}else{
							this.showOnItem = true
							this.updataItemType = e
						}
						break;
					// 服务人员
					case 'servicePersonnel':
						uni.navigateTo({
							url:'./modify/modifyOrderActor/modifyOrderActor?id=' + this.orderId
						})
						break;
					// 客户信息
					// 客户信息
					case 'userInfo':
						uni.navigateTo({
							url:'./modify/modifyPersonnel/modifyPersonnel?id=' + this.orderId
						})
						break
					// 产品
					case 'GOODS':
						if(this.openInfo.orderItemVos.length === 1){
							uni.navigateTo({
								url:'./modify/modifyOrderItem/modifyOrderItem?id=' + this.openInfo.orderId + '&itemId=' + this.openInfo.orderItemVos[0].itemId + '&type=' + e
							})
						}else{
							this.showOnItem = true
							this.updataItemType = e
						}
						break
					// 服装
					case 'DRESSINFO':
						if(this.openInfo.orderItemVos.length === 1){
							uni.navigateTo({
								url:'./modify/modifyOrderItem/modifyOrderItem?id=' + this.openInfo.orderId + '&itemId=' + this.openInfo.orderItemVos[0].itemId + '&type=' + e
							})
						}else{
							this.showOnItem = true
							this.updataItemType = e
						}
						break
					// 景点
					case 'PLACE':
						if(this.openInfo.orderItemVos.length === 1){
							uni.navigateTo({
								url:'./modify/modifyOrderItem/modifyOrderItem?id=' + this.openInfo.orderId + '&itemId=' + this.openInfo.orderItemVos[0].itemId + '&type=' + e
							})
						}else{
							this.showOnItem = true
							this.updataItemType = e
						}
						break
					// 服务
					// 服务
					case 'SERVICES':
						if(this.openInfo.orderItemVos.length === 1){
							uni.navigateTo({
								url:'./modify/modifyOrderItem/modifyOrderItem?id=' + this.openInfo.orderId + '&itemId=' + this.openInfo.orderItemVos[0].itemId + '&type=' + e
							})
						}else{
							this.showOnItem = true
							this.updataItemType = e
						}
						break
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
