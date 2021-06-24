/************************  支出与收入列表 ******************************/
<template>
	<view>
		<view class="top">
			<view class="title">支出项目：</view>
			<view class="text">{{spendingMap.get(info.itemId)}}</view>
		</view>
		
		<view class="orderInfo">
			<!-- 录单人 收款人 -->
			<view class="listBox">
				<view class="list">
					<view class="title">录单人：</view>
					<view class="info">{{info.createUser | actor}}</view>
				</view>
				<view class="list">
					<view class="title">收款人：</view>
					<view class="info">{{info.withdrawUser | actor}}</view>
				</view>		
			</view>
			
			<!-- 支出门店 支出时间 -->
			<view class="listBox">
				<view class="list">
					<view class="title">支出门店：</view>
					<view class="info">{{shopIdMap.get(info.expenditureShop)}}</view>
				</view>
				<view class="list">
					<view class="title">支出时间：</view>
					<view class="info">{{info.payTime | time}}</view>
				</view>		
			</view>
			
			<!-- 支出金额 支出方式 -->
			<view class="listBox">
				<view class="list">
					<view class="title">支出金额：</view>
					<view class="info">{{info.money}}</view>
				</view>
				<view class="list">
					<view class="title">支出方式：</view>
					<view class="info">{{payMap.get(info.payCategoryId)}}</view>
				</view>		
			</view>
			
			<!-- 按键 -->
			<view class="butBox">
				<view class="butS delete" @click="deldata(info.id)">删除</view>
				<view class="butS collection" @click="updata(info.id)">修改</view>
			</view>
		</view>
		
		
			
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['info'],
		filters:{
			actor(arr){
				if(arr){
					return arr.actorName
				}else{
					return '无'
				}
			}
		},
		computed:{
			...mapGetters('shopArr',[
				'get_spending',
				'get_shopAllArr',
				'get_pay'
			])
		},
		data(){
			return{
				// 项目支出Map
				spendingMap:new Map(),
				// 门店Map
				shopIdMap:new Map(),
				// 支付方式Map
				payMap:new Map(),
			}
		},
		mounted(){
			this.spendingMap = new Map(this.get_spending.map(item => [item.id,item.name]))
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.payMap = new Map(this.get_pay.map(item => [item.id,item.name]))
		},
		methods:{
			updata(id){
				let pages = getCurrentPages()
				let currPages = pages[pages.length - 1]
				currPages.setData({
					spendingDetail:this.info
				})
				uni.navigateTo({
					url:'./addOrUpdataSpending/addOrUpdataSpending?id=' + id
				})
			},
			
			//删除
			deldata(id){
				this.$emit('del',id)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.top{
		padding: 30rpx;
		font-size: 28rpx;
		color: #333333;
		display: flex;
		border-bottom: 1rpx solid #DDDDDD;
	}
	.orderInfo{
		padding: 30rpx;
		padding-bottom: 0;
		font-size: 24rpx;
		color: #a2a2a2;
		.listBox{
			display: flex;
			margin-bottom: 20rpx;
			.title{
				width: 120rpx;
				white-space: nowrap;
				overflow: hidden;
			}
			.list{
				display: flex;
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
	.butBox{
		border-top: 1rpx solid #DDDDDD;
		display: flex;
		flex-direction: row-reverse;
		padding: 30rpx 0;
		font-size: 28rpx;
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
		.delete{
			color: #FFFFFF;
			background-color: #FF0000;
		}
	}
</style>
