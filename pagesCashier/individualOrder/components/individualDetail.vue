/*********************** 散客基本信息 *****************************/
<template>
	<view>
		<!-- 顶部 订单号 订单类型 -->
		<view class="topNum">
			<view class="topConLeft">
				<view>订单号：</view>
				<view>{{info.orderNo}}</view>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="orderBox">
			<!-- 联系人信息 -->
			<view class="userInfo">
				<view class="list">
					<view class="title">客户姓名：</view>
					<view class="info">{{info.contactName}}</view>
				</view>
				<view class="list">
					<view class="title">客户电话：</view>
					<view class="info">{{info.contactMobile | noMobile}}</view>
				</view>
			</view>
			
			<!-- 订单详情 -->
			<view class="orderInfo">
				<!-- 订单门店 订单时间 -->
				<view class="listBox">
					<view class="list">
						<view class="title">订单门店：</view>
						<view class="info">{{shopIdMap.get(info.shopId)}}</view>
					</view>
					<view class="list">
						<view class="title">订单时间：</view>
						<view class="info">{{info.orderTime | time}}</view>
					</view>		
				</view>
				<!-- 项目类别 消费名称 -->
				<view class="listBox">
					<view class="list">
						<view class="title">消费名称：</view>
						<view class="info">{{info.name}}</view>
					</view>
					<view class="list">
						<view class="title">消费类别：</view>
						<view class="info">{{consumeTypeMap.get(info.saleCategoryId)}}</view>
					</view>		
				</view>
				<!-- 已付金额 应付金额 -->
				<view class="listBox">
					<view class="list">
						<view class="title">已付金额：</view>
						<view class="info">{{info.incomePrice}}</view>
					</view>			
					<view class="list">
						<view class="title">应付金额：</view>
						<view class="info">{{info.sumPrice}}</view>
					</view>
				</view>
				<!-- 欠款金额 接单人 -->
				<view class="listBox">
					<view class="list">
						<view class="title">欠款金额：</view>
						<view class="info">{{info.sumPrice - info.incomePrice}}</view>
					</view>			
					<view class="list">
						<view class="title">接单人：</view>
						<view class="info">{{info.receptions | actor}}</view>
					</view>
				</view>
			</view>
				
			<!-- 商品 -->
			<view class="goods" v-if="info.orderGoodsItemNameVos.length > 0">
				<view class="title">消费商品</view>
				<view class="infoBox" v-for="(item,index) in info.orderGoodsItemNameVos" :key="index">
					<view class="list">
						<view class="text">{{item.name}}</view>
						<view class="num">X {{item.countNum}}</view>
					</view>
				</view>
			</view>
		
			<!-- 按键 -->
			<view class="butBox">
				<view class="butS refund" v-if="Number(info.sumPrice - info.incomePrice) > 0 " @click="cashier(info.id)">收款</view>
				<view class="butS collection" @click="updata(info.id)">修改</view>
				<view class="butS delete" @click="del(info.id)">删除</view>
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
				'get_consumeType',
				'get_shopAllArr'
			])
		},
		filters:{
			actor(arr){
				if(arr){
					let name =[]
					arr.forEach((i)=>{
						name.push(i.actorName)
					})
					return name.join('')
				}else{
					return '无'
				}
			},
			noMobile(data){
				if(data){
					return data
				}else{
					return '未填写'
				}
			}
		},
		data(){
			return{
				consumeTypeMap: new Map(),
				shopIdMap: new Map(),
			}
		},
		mounted(){
			this.consumeTypeMap = new Map(this.get_consumeType.map(item => [item.id, item.name]))
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
		},
		methods:{
			cashier(id){
				let pages = getCurrentPages()
				let currPage = pages[pages.length - 1]
				currPage.setData({
					basic:this.info
				})
				uni.navigateTo({
					url:'./individualCashier/individualCashier?id=' + id,
				})
			},
			updata(id){
				uni.navigateTo({
					url:'./updataIndividual/updataIndividual?id=' + id
				})
			},
			del(id){
				this.$emit('del',id)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.topNum{
		border-bottom: 1rpx solid #DDDDDD;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		.topConLeft{
			display: flex;
		}
	}
	.orderBox{
		margin: 0 30rpx;
		padding-top: 30rpx;
		.userInfo{
			font-size: 28rpx;
			display: flex;
			margin-bottom: 30rpx;
			.list{
				display: flex;
			}
			.list:nth-child(1){
				.info{
					width: 150rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		.orderInfo{
			font-size: 24rpx;
			color: #a2a2a2;
			.listBox{
				display: flex;
				margin-bottom: 30rpx;
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
						width: 170rpx;
					}
				}
				.list:nth-child(2){
					.info{
						width: 200rpx;
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
		}
	}
</style>
