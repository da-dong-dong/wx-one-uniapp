<template>
	<view class="bigBox">
		<view class="box">
			<view class="text">开卡成功！是否立即充值</view>
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">去充值</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['title'],
		data() {
			return {
				
			};
		},
		methods:{
			cancel(){
				this.$emit('cancel')
			},
			ok(){
				this.$emit('ok')
			}
		}
	}
</script>

<style lang="scss">
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
			margin: 50% auto;
			border-radius: 15rpx;
			.text{
				padding: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 36rpx;
				text-align: center;
				font-weight: bold;
				color: #000000;
			}
			.but{
				display: flex;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				border-top: 1rpx solid #f9f9f9;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					border-left: 1rpx solid #f9f9f9;
					color: #61A3FF;
				}
			}
		}
	}
</style>
