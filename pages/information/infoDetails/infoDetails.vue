<template>
	<view>
		<view class="topBox">
			<view class="title">{{info.title}}</view>
			<view class="timeAndType">
				<view class="time">{{info.time}}</view>
				<view class="type">系统消息</view>
			</view>
		</view>
		
		<view class="listBox">
			<view class="title">订单号：</view>
			<view class="text">{{info.Did}}</view>
		</view>
		
		<view class="listBox" v-if="info.women">
			<view class="title">女士：</view>
			<view class="text">{{info.women}}</view>
			<view class="title phoneTitle">电话：</view>
			<view class="phone"  @click="goPhone(info.womenPhone)">{{info.womenPhone}}</view>
		</view>
		
		<view class="listBox" v-if="info.man">
			<view class="title">男士：</view>
			<view class="text">{{info.man}}</view>
			<view class="title phoneTitle">电话：</view>
			<view class="phone" @click="goPhone(info.manPhone)">{{info.manPhone}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">套系：</view>
			<view class="text">{{info.series}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">价格：</view>
			<view class="text">{{info.money}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">拍摄等级：</view>
			<view class="text">{{info.lv}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">拍摄时间：</view>
			<view class="text">{{info.psTime}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">选样时间：</view>
			<view class="text">{{info.xyTime}}</view>
		</view>
	
		<view class="but" @click="details">详情</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					title:'您有一条2019年6月12的选样新任务,快去看看吧!',
					time:'2019-06-14 13:12:23',
					Did:'JX190527015',
					women:'飞飞',
					womenPhone:'17894281971',
					man:'刘兴龙',
					manPhone:'12349812356',
					series:'杭州套系A',
					money:'7000.00',
					lv:'萧山店1v1',
					psTime:'2019年05月30',
					xyTime:'2019年06月14'
				}
			};
		},
		onLoad(option){
			// 获取详情Id
			console.log(option)
		},
		methods:{
			// 点击详情
			details(){
				console.log('详情')
			},
			// 进入拨号页
			goPhone(phone){
				console.log(phone)
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topBox{
		margin: 40rpx ;
		margin-bottom: 0;
		padding-bottom: 30rpx;
		border-bottom: 4rpx solid #BBBBBB;
		.title{
			font-size: 36rpx;
			font-weight: bold;
		}
		.timeAndType{
			display: flex;		
			margin-top: 50rpx;
			font-size: 28rpx;
			.time{
				margin-right: 10rpx;
			}
		}
	}
	.listBox{
		margin: 0 40rpx;
		padding-top: 40rpx;
		font-size: 28rpx;
		display: flex;
		.phoneTitle{
			margin-left: 15rpx;
		}
		.phone{
			color: #100de2;
			text-decoration: underline;
		}
	}
	.but{
		color: #FFFFFF;
		background-color: #f26161;
		width: 175rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		font-size:28rpx;
		border-radius: 5rpx;
		margin-left: 40rpx;
		margin-top: 50rpx;
	}
</style>
