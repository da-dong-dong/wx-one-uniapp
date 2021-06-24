<template>
	<view>
		<view class="listBox" v-for="(item,index) in info" :key="index">
			<view class="time">{{item.time}}</view>
			<view class="infoBox" v-for="(list,i) in item.data" @click="infoDetails(list.id)" :key="i">
				<view class="avatarBox">
					<image :src="url+'icon_tjfb@2x.png'" class="avatar" mode=""></image>
					<view class="text">系</view>
				</view>
				<view class="info">
					<view class="title">{{list.title}}</view>
					<view class="text">{{list.text}}</view>
				</view>
			</view>
		</view>
		
		<view class="ts" v-if="info.length < 1">暂无消息</view>
		<tabBar :index="4"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				info:[]
			};
		},
		methods:{
			// 消息详情
			infoDetails(d){
				// 传信息ID给消息详情页
				uni.navigateTo({
					url:'./infoDetails/infoDetails?infoId=' + d 
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		.time{
			font-size: 24rpx;
			color: #898994;
			background-color: #e6e5f5;
			padding: 10rpx 30rpx;
		}
		.infoBox{
			display: flex;
			border-bottom: 1rpx solid #BBBBBB;
			.avatarBox{
				width: 88rpx;
				height: 88rpx;
				padding: 30rpx;
				position: relative;
				image{
					width: 88rpx;
					height: 88rpx;
				}
				.text{
					position: absolute;
					top: 48rpx;
					left: 54rpx;
					color: #FFFFFF;
					font-size: 40rpx;
					
				}
			}
			
			.info{
				margin: auto 0;
				.title,.text{
					width: 600rpx;
					white-space:nowrap;		
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.title{
					font-size: 36rpx;
				}
				.text{
					font-size: 28rpx;
					color: #747474;
				}
			}
		}
	}
	.ts{
		text-align: center;
		margin: 30rpx 0;
	}
</style>
