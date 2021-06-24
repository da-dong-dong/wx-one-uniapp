<template>
	<view class="bigBox">
		<!-- 编号 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">编号：</view>
				<view class="info">{{info.entryNo}}</view>
			</view>
		</view>
		<!-- 消费订单 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">消费订单：</view>
				<view class="info">{{info.markNo}}</view>
			</view>
		</view>
		
		<!-- 消费时间 消费门店 -->
		<view class="listBox">
			<view class="list">
				<view class="text">消费时间：</view>
				<view class="info">{{info.entryTime | time}}</view>
			</view>
			<view class="list">
				<view class="text">消费门店：</view>
				<view class="info">{{shopIdMap.get(info.entryShopId)}}</view>
			</view>
		</view>
		
		
		<!-- 消费项目 消费类型 -->
		<view class="listBox">
			<view class="list">
				<view class="text">消费项目：</view>
				<view class="info">{{info.name}}</view>
			</view>
			<view class="list">
				<view class="text">消费类型：</view>
				<view class="info">{{consumeTypeMap.get(info.saleCategoryId)}}</view>
			</view>
		</view>
		
		<!-- 消费金额 收款项目 -->
		<view class="listBox">
			<view class="list">
				<view class="text">消费金额：</view>
				<view class="info">{{info.sumPrice}}</view>
			</view>
			<view class="list">
				<view class="text">收款项目：</view>
				<view class="info">{{info.proceeds?info.proceeds:''}}</view>
			</view>
			
		</view>
		
		<!--已收金额 欠款金额 -->
		<view class="listBox">
			<view class="list">
				<view class="text">已收金额：</view>
				<view class="info">{{info.incomePrice}}</view>
			</view>
			<view class="list">
				<view class="text">欠款金额：</view>
				<view class="info">{{info.sumPrice - info.incomePrice}}</view>
			</view>
			
		</view>
		
		<!--退款金额 接单人 录单人 -->
		<view class="listBox">
			<view class="list">
				<view class="text">退款金额：</view>
				<view class="info">{{info.refundPrice}}</view>
			</view>
			<view class="list">
				<view class="text">接单人：</view>
				<view class="info">{{info.receptions | actor}}</view>
			</view>
		</view>

		<!-- 录单人 -->
		<view class="listBox">
			<view class="list">
				<view class="text">录单人：</view>
				<view class="info">{{info.entryUser}}</view>
			</view>
		</view>
		
		<view class="butBox">
			<view class="butS refund" v-if="info.refundPrice + info.incomePrice > 0" @click="button('refund')">退款</view>
			<view class="butS collection" v-if="info.sumPrice - info.incomePrice > 0" @click="button('collection')">收款</view>
			<view class="butS delete" @click="del">删除</view>
		</view>
		
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	export default{
		props:['info'],
		filters:{
			actor(arr){
				if(arr){
					let name = []
					arr.forEach((i)=>{
						name.push(i.actorName)
					})
					return name.join('')
				}else{
					return '无'
				}
			}
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr', 
				// 消费类别
				'get_consumeType'
			])
		},
		data(){
			return{
				shopIdMap: new Map(),
				consumeTypeMap: new Map()
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.consumeTypeMap = new Map(this.get_consumeType.map(item => [item.id, item.name]))
		},
		methods:{
			// 删除
			del(){
				this.$emit('refresh',this.info.id)
			},
			// 收款 退款跳转
			button(type){
				let pages = getCurrentPages()
				let curePage = pages[pages.length - 1]; //当前页面
				curePage.setData({
					earlyBasic:this.info
				})
				uni.navigateTo({
					url:'./updataEarlyPrice/updataEarlyPrice?type=' + type
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../components/cashierDetailStyle.scss';
	.butBox{
		padding-bottom: 0;
		border-top: 1rpx solid #DDDDDD;
	}
	.bigBox{
		padding: 30rpx;
		margin: 20rpx;
		box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		border: none;
	}
	.butS{
		padding: 10rpx 20rpx;
		margin-left: 30rpx;
		font-size: 28rpx;
		box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
		border-radius:30rpx;
	}
	.collection{
		color: #FFFFFF;
		background-color: #61A3FF;
	}
	.refund{
		background-color: #FFFFFF;
		color: #333333;
		border: 1rpx solid #DDDDDD;
	}
	.delete{
		color: #FFFFFF;
		background-color: #FF0000;
	}
</style>
