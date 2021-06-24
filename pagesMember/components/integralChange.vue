<template>
	<view class="bigBox">
		<view class="box">
			<view class="title">{{title}}</view>
			<view v-if="title == '赠送积分'">
				<view class="border">
					<view class="text1">赠送积分</view>
					<input class="uni-input" type="text" v-model="param.points" placeholder="请输入" />
				</view>
				<textarea v-model="param.remarks" placeholder="请输入备注信息"></textarea>
			</view>
			<view v-else>
				<view class="border">
					<view class="text1">兑换物品</view>
					<input class="uni-input" type="text" v-model="param.changeGoods" placeholder="输入兑换物品" />
				</view>
				<view class="border">
					<view class="text1">所需积分</view>
					<input class="uni-input" type="text" v-model="param.points" placeholder="请输入所需积分" />
				</view>
			</view>
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['title'],
		data() {
			return {
				param:{
					points:null, // 积分
					remarks:null, // 备注
					changeGoods:null, // 物品
				}
			};
		},
		methods:{
			cancel(){
				this.$emit('cancel')
			},
			ok(){
				this.$emit('ok',this.param)
			}
		}
	}
</script>

<style lang="scss">
.border{
	margin: 30rpx;
    display: flex;
    border: 1rpx solid #DDDDDD;
    padding: 20rpx;
	font-size: 28rpx;
	.text1{
		width: 220rpx;
		font-weight: bold;
		color: #000;
	}
}
textarea{
	box-sizing: border-box;
    margin: 30rpx;
    height: 106rpx;
    border: 1px solid #DDDDDD;
    width: 486rpx;
    padding: 20rpx;
}
.title{
	font-weight: bold;
	text-align: center;
	font-size: 32rpx;
	color: #000;
	padding-top: 20rpx;
}
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
