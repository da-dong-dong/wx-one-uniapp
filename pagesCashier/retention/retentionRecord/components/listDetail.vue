<template>
	<view class="bigBox">
		<image :src="url+'recharge.png'" mode=""></image>
		<view class="infoBox">
			<view class="top">
				<view class="title">保留金{{info.type | type}}</view>
				<view class="money" :class="(info.type === 'REFILL') ? 'plus' : 'minus'">{{info.type | money}}{{info.money}}</view>
			</view>
		
			<view class="listBox">
				<view class="list">
					<view class="title">录单人：</view>
					<view class="text">{{info.createUser}}</view>
				</view>
				<view class="list">
					<view class="title">收款门店：</view>
					<view class="text">{{shopIdMap.get(info.shopId)}}</view>
				</view>
			</view>
			
			<view class="listBox">
				<view class="list">
					<view class="title">{{info.type | fun}}方式：</view>
					<view class="text">{{payIdMap.get(info.payType)}}</view>
				</view>
				<view class="list">
					<view class="title">时间：</view>
					<view class="text">{{info.createTime | time}}</view>
				</view>
			</view>
			
			<view class="remarkBox">
				<view class="title">备注：</view>
				<view class="text">{{info.remark | remark}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['info'],
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr', 
				'get_pay'
			])
		},
		filters:{
			type(type){
				const result = new Map([
					[ 'REFILL','充值' ],
					[ 'REFUND', '退款' ],
					[ 'ORDERREFILL', '订单退款' ],
					[ 'ORDERREFUND',  '订单扣款' ]
				])
				return result.get(type)
			},
			money(type){
				if(type === 'REFILL'){
					return '+'
				}else{
					return '-'
				}
			},
			fun(type){
				if(type === 'REFILL'){
					return '收款'
				}else{
					return '退款'
				}
			},
			remark(text){
				if(text){
					return text
				}else{
					return '无'
				}
			},
		},
		data(){
			return{
				shopIdMap: new Map(),
				payIdMap: new Map(),
				url:'https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/'
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.payIdMap = new Map(this.get_pay.map(item => [item.id, item.name]))
		},
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		padding: 30rpx;
		display: flex;
		image{
			width: 64rpx;
			height: 64rpx;
		}
		.infoBox{
			margin-left: 30rpx;
			width: 590rpx;
			border-bottom: 1rpx solid #DDD;
			padding-bottom: 30rpx;
			.top{
				font-size: 36rpx;
				display: flex;
				justify-content: space-between;
				line-height: 64rpx;
				margin-bottom: 23rpx;
				.plus{
					color: #61A3FF;
				}
				.minus{
					color: #FF0000;
				}
			}
			.listBox{
				font-size: 24rpx;
				color: #343434;
				display: flex;
				.list{
					display: flex;
					margin-bottom: 23rpx;
				}
				.text{
					width: 140rpx;
					white-space: nowrap;
					overflow: hidden;
				}
				.list:nth-child(1){
					width: 330rpx;
					.text{
						width: 180rpx;
					}
				}
			}
			.remarkBox{
				font-size: 24rpx;
				color: #343434;
				display: flex;
				.text{
					width: 500rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}

</style>
