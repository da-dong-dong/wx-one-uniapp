<template>
	<view>
		<view class="title">开单成功</view>
		<view class="ok" @click="ok('see')">查看</view>
		<view class="ok" @click="ok('money')">收款</view>
		<view class="ok" @click="ok('out')">退出</view>
		<i-message id="message" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paramId:null
			};
		},
		onLoad(option){
			this.paramId = {
				id: option.id,
				recordId: option.recordId
			}
			// this.orderId = 321
		},
		methods:{
			ok(type){
				switch (type) {
					case 'see':
						//跳转订单详情
						uni.navigateTo({
							url:'/pagesOrder/orderBox/details/details?orderId=' + this.paramId.id
						})
						break;
				
					case 'money':
						//前期收款
						uni.navigateTo({
							url:`/pagesCashier/orderCashier/collection/collection?recordId=${this.paramId.recordId}&oId=${this.paramId.id}&type=latePrice`
						})
						break;
					
					case 'out':
						uni.switchTab({
							url:'../../../pages/index/index',
						})
						break;
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 38rpx;
		color: #61A3FF;
		margin: 300rpx auto;
		text-align: center;
	}
	.ok{
		width: 500rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		background-color: #61A3FF;
		color: #FFFFFF;
		margin: 20rpx auto;
	}
</style>
