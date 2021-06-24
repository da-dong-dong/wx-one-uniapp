<template>
	<view class="bigBox">
		<!-- 子订单号 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">子订单号：</view>
				<view class="info">{{info.markNo}}</view>
			</view>
		</view>
		
		<!-- 拍摄名称 套系金额 -->
		<view class="listBox">
			<view class="list">
				<view class="text">拍摄名称：</view>
				<view class="info">{{info.name}}</view>
			</view>
			<view class="list">
				<view class="text">套系金额：</view>
				<view class="info">{{info.sumPrice}}</view>
			</view>
		</view>
		
		<!-- 已收金额	欠款金额	 -->
		<view class="listBox">
			<view class="list">
				<view class="text">已收金额：</view>
				<view class="info">{{info.incomePrice}}</view>
			</view>
			<view class="list">
				<view class="text">欠款金额：</view>
				<view class="info">{{info.sumPrice - info.incomePrice}}</view>
			</view>
		</view>
		
		<!-- 退款金额	录入时间 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">退款金额：</view>
				<view class="info">{{info.refundPrice}}</view>
			</view>
		</view>
		
		<view class="onlyListBox">
			<view class="list">
				<view class="text">录入时间：</view>
				<view class="info">{{info.createTime | time}}</view>
			</view>
		</view>
		
		<view class="butBox">
			<view class="collection" v-if="info.sumPrice - info.incomePrice > 0" @click="button('collection')">收款</view>
			<view class="refund" v-if="info.refundPrice + info.incomePrice > 0" @click="button('refund')">退款</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['info'],
		methods:{
			// 收款
			button(type){
				let pages = getCurrentPages();
				let curePage = pages[pages.length - 1]; //当前页面
				curePage.setData({
					money: {
						'sumPrice':this.info.sumPrice,
						'incomePrice':this.info.incomePrice,
						'refundPrice': this.info.refundPrice
					}
				})
				uni.navigateTo({
					url:'./updataLatePrice/updataLatePrice?id=' + this.info.id + '&type=' + type
				})
			},
		},
	}
</script>

<style lang="scss">
	@import '../../components/cashierDetailStyle.scss';
	.butBox{
		padding: 0 !important;
	}
	.collection{
		color: #FFFFFF;
		background-color: #61A3FF;
		padding: 10rpx 20rpx;
		margin-left: 30rpx;
		font-size: 28rpx;
		box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
		border-radius:30rpx;
	}
	.refund{
		background-color: #FFFFFF;
		color: #333333;
		border: 1rpx solid #DDDDDD;
		padding: 10rpx 20rpx;
		margin-left: 30rpx;
		font-size: 28rpx;
		box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
		border-radius:30rpx;
	}
</style>
