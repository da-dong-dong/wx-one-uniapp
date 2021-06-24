<template>
	<view>
		<!-- 产品 -->
		<view class="mainBox" v-if="orderItem.orderItemGoods.length > 0">
			<view class="topTitle">
				<view class="title">产品</view>
			</view>
			<view class="titleBox">
				<view class="title">商品</view>
				<view class="title">单价</view>
				<view class="title">P数</view>
				<view class="title">数量</view>
			</view>
			<view class="mian" v-for="(item,index) in orderItem.orderItemGoods" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.pSalePrice}}</view>
				<view class="text">{{item.countP}}</view>
				<view class="text">{{item.countNum}}</view>
			</view>
		</view>
		<!-- 服装 -->
		<view class="mainBox" v-if="orderItem.orderItemDressInfo.length > 0">
			<view class="topTitle">
				<view class="title">服装</view>
			</view>
			<view class="titleBox">
				<view class="title">服装</view>
				<view class="title">单价</view>
				<view class="title">类型</view>
				<view class="title">数量</view>
			</view>
			<view class="mian" v-for="(item,index) in orderItem.orderItemDressInfo" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.salePrice}}</view>
				<view class="text">{{item.type | type}}</view>
				<view class="text">{{item.count}}</view>
			</view>
		</view>
		<!-- 景点 -->
		<view class="mainBox" v-if="orderItem.orderItemPlace.length > 0">
			<view class="topTitle">
				<view class="title">景点</view>
			</view>
			<view class="titleBox">
				<view class="title">景点</view>
				<view class="title">单价</view>
				<view class="title">类型</view>
			</view>
			<view class="mian" v-for="(item,index) in orderItem.orderItemPlace" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.salePrice}}</view>
				<view class="text">{{item.placeType | type}}</view>
			</view>
		</view>
		<!-- 服务 -->
		<view class="mainBox" v-if="orderItem.orderItemService.length > 0">
			<view class="topTitle">
				<view class="title">服务</view>
			</view>
			<view class="titleBox">
				<view class="title">服务</view>
				<view class="title">单价</view>
				<view class="title">人数</view>
				<view class="title">数量</view>
			</view>
			<view class="mian" v-for="(item,index) in orderItem.orderItemService" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.salePrice}}</view>
				<view class="text">{{item.peopleNumber}}</view>
				<view class="text">{{item.count}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['orderItem'],
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mainBox{
		.topTitle{
			font-size: 32rpx;
			margin: 20rpx 0;
			border-left: 8rpx solid #61A3FF;
			.title{
				margin-left: 30rpx;
			}
		}
		.titleBox{
			padding: 20rpx;
			background-color: #F7F7F7;
			font-size: 28rpx;
			color: #333333;
			display: flex;
			.title{
				width: 20%;
				text-align: center;
			}
			.title:nth-child(1){
				width: 40%;
			}
		}
		.mian{
			display: flex;
			color: #999999;
			font-size: 24rpx;
			padding: 20rpx;
			.text{
				width: 20%;
				text-align: center;
			}
			.text:nth-child(1){
				width: 40%;
			}
		}
	}
</style>
