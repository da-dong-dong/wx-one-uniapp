<template>
	<view class="mainBox">
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
		
		<view class="butBox">
			<view class="but" :class="(!fnPermissionShopId('STORE_FINANCIAL_LATE_RECEIPT'))?'':'fn_back'"  @click="collection('earlyPrice')">后期收款</view>
			<view class="but" :class="(!fnPermissionShopId('STORE_FINANCIAL_EARLY_RECEIPT'))?'':'fn_back'"  @click="collection('latePrice')">前期收款</view>
			<view class="but" @click="detailPrice">收款详情</view>
		</view>
	</view>
</template>

<script>
const { $Message } = require('@/wxcomponents/base/index');
	export default{
		props:['info'],
		data(){
			return{
				
			}
		},
		methods:{
			// 存储当页信息
			saveInfo(){
				let pages = getCurrentPages();
				let currPage = pages[pages.length - 1]; //当前页
				currPage.setData({
					cashierDetail:this.info
				})
			},
			
			// 收款详情
			detailPrice(){
				this.saveInfo()
				uni.navigateTo({
					url:'./detailPrice/detailPrice'
				})
			},
			// 收款
			collection(type){
				//判断修改权限
				if(type == 'earlyPrice'){
					// 后期
					if(this.fnPermissionShopId('STORE_FINANCIAL_LATE_RECEIPT')){
						$Message({
							content: '权限不足',
							type: 'error'
						});
						return false
					}
				}else{
					// 前期
					if(this.fnPermissionShopId('STORE_FINANCIAL_EARLY_RECEIPT')){
						$Message({
							content: '权限不足',
							type: 'error'
						});
						return false
					}
				}
				
				uni.navigateTo({
					url:'./collection/collection?recordId=' + this.info.financeId + '&oId=' + this.info.orderId + '&type=' + type
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.mainBox{
		margin: 30rpx;
		.moneyBox{
			border-bottom: 1rpx solid #DDDDDD;
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
		}
		.butBox{
			display: flex;
			flex-direction: row-reverse;
			padding: 30rpx 0;
			.but{
				color: #FFFFFF;
				background-color: #61A3FF;
				padding: 10rpx 20rpx;
				margin-left: 30rpx;
				font-size: 28rpx;
				box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
				border-radius:30rpx;
			}
			.but:last-child{
				background-color: #FFFFFF;
				color: #333333;
				border: 1rpx solid #DDDDDD;
			}
		}
	}
</style>
