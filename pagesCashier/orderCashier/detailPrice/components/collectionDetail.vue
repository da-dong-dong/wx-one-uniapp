/************************  收款明细  ****************************/
<template>
	<view class="bigBox">
		
		<!-- 收款流水 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">收款流水：</view>
				<view class="info">{{info.receiptNo}}</view>
			</view>
		</view>
		
		<!-- 消费类型 收款项目 -->
		<view class="listBox">
			<view class="list">
				<view class="text">消费类型：</view>
				<view class="info">{{info.saleCategoryId === -1 ? '订单套系金' : consumeTypeMap.get(info.saleCategoryId)}}</view>
			</view>
			<view class="list">
				<view class="text">收款项目：</view>
				<view class="info">{{info.proceeds?info.proceeds:info.name}}</view>
			</view>
		</view>
		
		<!-- 收款金额 付款方式 -->
		<view class="listBox">
			<view class="list">
				<view class="text">收款金额：</view>
				<view class="info">{{info.totalPrice}}</view>
			</view>
			<view class="list">
				<view class="text">付款方式：</view>
				<view class="info">{{payMap.get(info.payCategoryId)}}</view>
			</view>
		</view>
		
		<!-- 收款类型 收款门店 -->
		<view class="listBox">
			<view class="list">
				<view class="text">收款类型：</view>
				<view class="info">{{info.entryType === 'EARLY' ? '前期收款' : '后期收款'}}</view>
			</view>
			<view class="list">
				<view class="text">收款门店：</view>
				<view class="info">{{shopIdMap.get(info.receiptShopId)}}</view>
			</view>
		</view>
		
		<!-- 接单人 收款人 -->
		<view class="listBox">
			<view class="list">
				<view class="text">接单人：</view>
				<view class="info">{{info.receptions}}</view>
			</view>
			<view class="list">
				<view class="text">收款人：</view>
				<view class="info">{{info.receiptUser}}</view>
			</view>
		</view>
		
		<!-- 收款时间 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">收款时间：</view>
				<view class="info">{{info.receiptTime | receiptTime}}</view>
			</view>
		</view>
		
		<!-- 收款备注 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">收款备注：</view>
				<view class="remark">{{info.remark | remark}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['info'],
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr', 
				// 消费类型
				'get_consumeType',
				// 付款方式
				'get_pay'
			])
		},
		filters:{
			// 收款时间
			receiptTime(time){
				let t = new Date(time)
				let y=t.getFullYear();
				let m=t.getMonth()+1; 
				let d=t.getDate(); 
				let h=t.getHours(); 
				let min=t.getMinutes(); 
				let s=t.getSeconds(); 
				return `${y}-${m}-${d} ${h}:${min}:${s}`
			},
			// 收款备注
			remark(text){
				if(text){
					return text
				}else{
					return '无'
				}
			},
		},
		data(){
			return{
				shopIdMap: new Map(),
				consumeTypeMap: new Map(),
				payMap: new Map(),
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.consumeTypeMap = new Map(this.get_consumeType.map(item => [item.id, item.name]))
			this.payMap = new Map(this.get_pay.map(item => [item.id, item.name]))
		},
	}
</script>

<style lang="scss" scoped>
 @import '../../components/cashierDetailStyle.scss';
</style>
