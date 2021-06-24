<template>
	<view class="bigBox">
		<!-- 子订单号 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">子订单号：</view>
				<view class="info">{{info.orderNo}}</view>
			</view>
		</view>

		<!-- 套系名称 订单套系金额 -->
		<view class="listBox">
			<view class="list">
				<view class="text">套系名称：</view>
				<view class="info">{{info.assemblyName}}</view>
			</view>
			<view class="list">
				<view class="text">套系金额：</view>
				<view class="info">{{info.assemblyPrice}}</view>
			</view>
		</view>
		
		<!-- 订单服务等级 接单人 -->
		<view class="listBox">
			<view class="list">
				<view class="text">服务等级：</view>
				<view class="info">{{serviceCategoryMap.get(info.serviceCategoryId)}}</view>
			</view>
			<view class="list">
				<view class="text">接单人：</view>
				<view class="info">{{info.orderActorVos | actor}}</view>
			</view>
		</view>
		
		<!-- 订单门店 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">订单门店：</view>
				<view class="info">{{shopIdMap.get(info.orderShopId)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['info'],
		filters:{
			actor(arr){
				if(arr){
					let name = []
					arr.forEach((i)=>{
						name.push(i.actorName)
					})
					return name.join('')
				}else{
					return '无'
				}
			}
		},
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr', 
				// 服务等级
				'get_serviceCategory'
			])
		},
		data(){
			return{
				shopIdMap: new Map(),
				serviceCategoryMap: new Map(),
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.serviceCategoryMap = new Map(this.get_serviceCategory.map(item => [item.id,item.name]))
		},
	}
</script>

<style lang="scss">
	@import '../../components/cashierDetailStyle.scss';

</style>
