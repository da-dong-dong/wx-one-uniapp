<template>
	<view>
		<view class="listBox" v-for="(item,index) in repeatData" :key="index">
			<view class="list">
				<view class="title">编号</view>
				<view class="text">{{item.customerNo}}</view>
			</view>
			<view class="list">
				<view class="title">姓名</view>
				<view class="text">{{item.name}}</view>
			</view>
			<view class="list">
				<view class="title">联系方式</view>
				<view class="text">{{item.phone}}</view>
			</view>
			<view class="list">
				<view class="title">qq</view>
				<view class="text">{{item.qqNumber | nullData}}</view>
			</view>
			<view class="list">
				<view class="title">微信</view>
				<view class="text">{{item.wxNumber | nullData}}</view>
			</view>
			<view class="butBox">
				<view class="but" @click="yes(item)">查看</view>
			</view>
		</view>
		
		<view class="backBox">
			<view class="back" @click="back">知道了</view>
		</view>
	</view>
</template>

<script>
	export default {
		filters:{
			nullData(data){
				if(data){
					return data
				}else{
					return '未填写'
				}
			}
		},
		data() {
			return {
				repeatData:null,
			};
		},
		onLoad(){
			let pages = getCurrentPages()
			let prvePages = pages[pages.length - 2]
			this.repeatData = prvePages.data.repeatData
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			yes(item){
				let pages = getCurrentPages()
				let prvePages = pages[pages.length - 2]
				prvePages.setData({
					repeatUser:item,
				})
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.listBox{
		font-size: 28rpx;
		margin: 30rpx;
		margin-top: 0;
		box-shadow: 0px 7px 29px 6px rgba(0, 0, 0, 0.03);
		border-radius: 10px;
		.list{
			display: flex;
			margin: 0 30rpx;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #DDDDDD;
			.title{
				width: 190rpx;
			}
		}
		.butBox{
			display: flex;
			flex-direction: row-reverse;
			padding: 20rpx 30rpx;
			.but{
				padding: 10rpx;
				border-radius: 10rpx;
				background-color: #61A3FF;
				color: #FFFFFF;
			}
		}
	}
	.backBox{
		display: flex;
		flex-direction: row-reverse;
		padding: 0 30rpx;
		font-size: 28rpx;
		.back{
			padding: 15rpx;
			border-radius: 10rpx;
			border: 1rpx solid #DDDDDD;
		}
	}
</style>
