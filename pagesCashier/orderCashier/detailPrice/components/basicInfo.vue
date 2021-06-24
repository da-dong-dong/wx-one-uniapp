<template>
	<view>
		<!-- 基本信息 -->
		<view class="basic">
			
			<!-- 订单号 -->
			<view class="listBox">
				<view class="list">
					<view class="text">订单号：</view>
					<view class="info">{{info.orderNo}}</view>
				</view>
			</view>
			
			<!-- 订单时间 -->
			<view class="listBox">
				<view class="list">
					<view class="text">订单时间：</view>
					<view class="info">{{info.orderTime | time}}</view>
				</view>
			</view>
			
			<!-- 套系名称 -->
			<view class="listBox">
				<view class="list">
					<view class="text">套系名称：</view>
					<view class="info">{{info.assemblyName}}</view>
				</view>
			</view>
			
			<!-- 套系金额 -->
			<view class="listBox">
				<view class="list">
					<view class="text">套系金额：</view>
					<view class="info">{{info.assemblyPrice}}</view>
				</view>
			</view>
			
			<!-- 金额 -->
			<view class="moneyBox">
				<!-- 前期应收 后期应收 -->
				<view class="cashierListBox">
			
					<view class="textBox">
						<view class="text">前期应收</view>
						<view>{{info.earlyPrice}}</view>
					</view>
					
					<view class="textBox">
						<view class="text">后期应收</view>
						<view>{{info.latePrice}}</view>
					</view>
					
				</view>
				
				<!-- 已经收 欠款-->
				<view class="cashierListBox">
					<view class="textBox">
						<view class="text">已收</view>
						<view>{{info.incomePrice}}</view>
					</view>
					
					<view class="textBox">
						<view class="text">欠款</view>
						<view class="cRed">{{ info.latePrice + info.earlyPrice - info.incomePrice}}</view>
					</view>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		props:['info'],
	}
</script>

<style lang="scss" scoped>
	.basic{
		padding: 30rpx 55rpx;
		box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		color: #333333;
	}
	.listBox{
		font-size: 28rpx;
		display: flex;
		margin-bottom: 30rpx;
		.list{
			display: flex;
			.info{
				width: 250rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.moneyBox{
		.cashierListBox{
			font-size: 28rpx;
			padding-bottom: 30rpx;
			display: flex;
			.textBox:nth-child(1){
				width: 250rpx;
			}
			.textBox{
				display: flex;
				color: #61A3FF;
				.text{
					color: #333333;
				}
				>view:nth-child(2){
					margin-left: 15rpx;
				}
				.cRed{
					color: #FF0000;
				}
			}
		}
		.cashierListBox:last-child{ 
			padding-bottom: 0;
		}
	}
</style>
