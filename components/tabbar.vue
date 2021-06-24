<template>
	<view class="tabbar">
		<view class="list tabBarIndex" @click="tabBarIndex" :class="index===1?'tabBarAction':null">
			<image class="icon icon1" :src="index===1?url+'index_ac.png':url+'index.png'" mode=""></image>
			<view class="text">工作台</view>
		</view>
		<view class="list tabBarAddressBook" @click="tabBarAddressBook"  :class="index===2?'tabBarAction':null">
			<image class="icon icon2" :src="index===2?url+'address_ac.png':url+'address.png'" mode=""></image>
			<view class="text">通讯录</view>
		</view>
		<view class="list tabBarInformation" @click="tabBarInformation"  :class="index===4?'tabBarAction':null">
			<image class="icon icon4" :src="index===4?url+'info_ac.png':url+'info.png'" mode=""></image>
			<view class="text">消息</view>
		</view>
		<view class="list tabBarMy" @click="tabBarMy"  :class="index===5?'tabBarAction':null">
			<image class="icon icon5" :src="index===5?url+'my_ac.png':url+'my.png'" mode=""></image>
			<view class="text">我的</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['index'],		
		data() {
			return {
				url:'https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/tabbar/'
			};
		},
		methods:{
			// 进入工作台
			tabBarIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			// 进入通讯录
			tabBarAddressBook(){
				uni.switchTab({
					url:'/pages/addressBook/addressBook'
				})
			},
			// 进入消息
			tabBarInformation(){
				uni.switchTab({
					url:'/pages/information/information'
				})
			},
			// 进入我的
			tabBarMy(){
				uni.switchTab({
					url:'/pages/my/my' 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		position: fixed;
		bottom: 0;
		padding: 30rpx 0;
		width: 750rpx;
		border-top: 2rpx solid #f7f7f9;
		background-color: #fff;
		font-size: 28rpx;
		text-align: center;
		display: flex;
		justify-content: space-around;
		z-index: 2;
		.list{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.icon{
				margin-left: 50%;
				transform: translateX(-50%);
			}
			.icon1{
				width: 41rpx;
				height: 37rpx;
			}
			.icon2{
				width: 33rpx;
				height: 39rpx;
			}
			.icon4{
				width: 40rpx;
				height: 36rpx;
			}
			.icon5{
				width: 36rpx;
				height: 36rpx;
			}
		}
		.tabBarAction{
			color: #40adff;
		}
	}
</style>
