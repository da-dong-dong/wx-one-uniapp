<template>
	<view>
		<!-- 客户姓名 手机号-->
		<view class="topNum">
			<view class="topCon">
				<view>客户姓名：</view>
				<view>{{info.name}}</view>
			</view>
			<view class="topCon">
				<view>手机号：</view>
				<view>{{info.mobile}}</view>
			</view>
		</view>
	
		<!-- 订单信息 -->
		<view class="orderBox">
			<!-- 订单信息 -->
			<view class="orderInfo">
				<!-- 录单人 录入时间 -->
				<view class="listBox">
					<view class="list">
						<view class="title">录单人：</view>
						<view class="info">{{info.createUser.actorName}}</view>
					</view>
					<view class="list">
						<view class="title">录入时间：</view>
						<view class="info">{{info.createTime | time}}</view>
					</view>
				</view>
				
				<!-- 录入门店 录入金额 -->
				<view class="listBox">
					<view class="list">
						<view class="title">录入门店：</view>
						<view class="info">{{shopIdMap.get(info.shopId)}}</view>
					</view>
					<view class="list">
						<view class="title">录入金额：</view>
						<view class="info">{{info.retentionMoney}}元</view>
					</view>
				</view>
			</view>
			<!-- 按键 -->
			<view class="butBox">
				<view class="but" @click="topUp(info.id)">充值</view>
				<view class="but" @click="del(info.id,info.retentionMoney)">删除</view>
				<view class="but" @click="refund(info.id)">退款</view>
				<view class="but" @click="goRecord(info.id)">保留金记录</view>
			</view>
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['info'],
		computed:{
			...mapGetters('shopArr',[
				'get_shopAllArr'
			])
		},
		data(){
			return{
				shopIdMap: new Map(),
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
		},
		methods:{
			getBasic(){
				let pages = getCurrentPages()
				let currPages = pages[pages.length - 1]
				currPages.setData({
					retentionBasic:{
						'name': this.info.name,
						'mobile': this.info.mobile
					}
				})
			},
			// 充值
			topUp(id){
				this.getBasic()
				uni.navigateTo({
					url:'./retentionChange/retentionChange?type=topUp&id=' + id
				})
			},
			// 退款
			refund(id){
				this.getBasic()
				uni.navigateTo({
					url:'./retentionChange/retentionChange?type=refund&id=' + id
				})
			},
			// 删除
			del(id,retentionMoney){
				this.$emit('del',id,retentionMoney)
			},
			// 前往保留金记录
			goRecord(id){
				uni.navigateTo({
					url:'./retentionRecord/retentionRecord?id=' + id
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.topNum{
		font-size: 28rpx;
		border-bottom: 1rpx solid #DDDDDD;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		.topCon{
			display: flex;
		}
	}
	.orderBox{
		margin: 0 30rpx;
		padding-top: 30rpx;
		.orderInfo{
			font-size: 24rpx;
			color: #a2a2a2;
			.listBox{
				display: flex;
				margin-bottom: 30rpx;
				.list{
					display: flex;
					.title{
						width: 120rpx;
					}
					.info{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}	
				.list:nth-child(1){
					.info{
						width: 200rpx;
					}
				}
				.list:nth-child(2){
					.info{
						width: 160rpx;
					}
				}
			}
		}
		.goods{
			padding: 30rpx 0 15rpx 0;
			border-top: 1rpx solid #DDDDDD;
			.title{
				font-size: 28rpx;
				padding-bottom: 20rpx;
			}
			.infoBox{
				font-size: 24rpx;
				color: #a2a2a2;
				.list{
					display: flex;
					padding-bottom: 15rpx;
					>view{
						flex: 1;
					}
				}
			}
		}
		.butBox{
			border-top: 1rpx solid #DDDDDD;
			display: flex;
			flex-direction: row-reverse;
			padding: 30rpx 0;
			font-size: 28rpx;
			.but{
				padding: 10rpx 20rpx;
				margin-left: 30rpx;
				font-size: 28rpx;
				box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
				border-radius:30rpx;
				border: 1rpx solid #DDDDDD;
			}
			.but:nth-child(1){
				border: none;
				background-color: #61A3FF;
				color: #FFFFFF;
			}
		}
	}
</style>
