/*********************************  数码安排选择  ***************************************/
<template>
	<view>
		<view class="but" @click="go('cx')">安排初修工作</view>
		<view class="but" @click="go('jx')">安排精修工作</view>
		<view class="but" @click="go('sj')">安排设计工作</view>
		<view class="but" @click="go('fp')">安排发片工作</view>
		<i-message id="message" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			go(type){
				uni.navigateTo({
					url:'../digitalArrange/digitalArrange?type=' + type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.but{
		width: 600rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 10rpx;
		background-color: #61A3FF;
		margin: 80rpx auto;
		font-size: 32rpx;
		color: #FFFFFF;
	}
</style>
