/************************************  客户信息  ***********************************/
<template>
	<view class="bigBox">
		<!-- 标题 -->
		<view class="titleBox">
			<view class="title">
				客户信息
			</view>
		</view>
		
		<!-- 客户区域 -->
		<view class="listBox">
			<view class="title">客户区域：</view>
			<view class="text">{{dataInfo?dataInfo:''}}</view>
		</view>
		
		<!-- 日期类型 -->
		<view class="listBox" v-if="typeTimeTitle">
			<view class="title">{{typeTimeTitle }}</view>
			<view class="text">{{openInfo.typeTime | time}}</view>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['openInfo'],

		data(){
			return{
				// 类型日期显示
				typeTimeTitle:null,
				dataInfo:'未选择'
			}
		},
		
		watch:{
			openInfo(){
				
					this.dataInfo = this.openInfo.customerGroupVo.categoryStr
				
				switch(this.openInfo.type){
					case 'WEDDING_DRESS':
						this.typeTimeTitle = '结婚日期'
						break;
					case 'PREGNANT':
						this.typeTimeTitle = '预产日期'
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		padding: 0 30rpx;
		padding-top: 30rpx;
		.titleBox{
			font-size: 32rpx;
			border-left: 8rpx solid #61A3FF;
			.title{
				margin-left: 30rpx;
			}
		}
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin-top: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #f9f9f9;
			.title{
				width: 270rpx;
			}
		}
	}
</style>
