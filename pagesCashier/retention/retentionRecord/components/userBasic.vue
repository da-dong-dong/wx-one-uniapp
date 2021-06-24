<template>
	<view class="userInfo">
		<view class="list">
			<view class="title">客户姓名：</view>
			<view class="text">{{userInfo.name}}</view>
		</view>
		<view class="list">
			<view class="title">手机号：</view>
			<view class="text">{{userInfo.mobile}}</view>
		</view>
		<view class="list">
			<view class="title">现有保留金：</view>
			<view class="text">{{userInfo.retentionMoney}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['userInfo'],
	}
</script>

<style lang="scss" scoped>
	.userInfo{
		padding: 30rpx;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 28rpx;
		padding-bottom: 0;
		.list{
			display: flex;
			margin-bottom: 30rpx;
		}
	}
</style>
