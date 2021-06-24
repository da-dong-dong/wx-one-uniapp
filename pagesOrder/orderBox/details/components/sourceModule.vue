/**************************  客户来源模板  *******************************/
<template>
	<view class="bigBox"> 
		<!-- 标题 -->
		<view class="titleBox">
			<view class="title">
				客户来源
			</view>
		</view>
		
		<!-- 客户来源 -->
		<view class="listBox">
			<view class="title">客户来源：</view>
			<view class="text">{{dataInfo.originStr}}</view>
		</view>
		
		<!-- 介绍人 -->
		<view class="listBox">
			<view class="title">介绍人：</view>
			<view class="text">{{dataInfo.referrerName | referrer}}</view>
		</view>
		
		<!-- 手机号码 -->
		<view class="listBox">
			<view class="title">手机号码：</view>
			<view class="text">{{dataInfo.referrerMobile | referrer}}</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['openInfo'],
		filters:{
			referrer(data){
				if(data !== null && data.trim() !== ''){
					return data
				}else{
					return '未填写'
				}
			}
		},
		data(){
			return{
				// 内容
				dataInfo:{
					// 客户来源
					originStr:'未选择',
					// 介绍人
					referrerName:null,
					// 手机号码
					referrerMobile:null
				}
			}
		},
		watch:{
			openInfo(){
				// 客户来源
				this.dataInfo.originStr = this.openInfo.customerGroupVo.originStr
				// 介绍人
				this.dataInfo.referrerName = this.openInfo.customerGroupVo.referrerName
				// 介绍人电话
				this.dataInfo.referrerMobile = this.openInfo.customerGroupVo.referrerMobile
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
