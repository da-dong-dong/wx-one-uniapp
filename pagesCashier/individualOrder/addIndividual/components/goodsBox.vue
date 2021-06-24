<template>
	<view class="goodsBox">
		<view class="topBox">
			<view class="title">消费商品</view>
			<view class="addGoods" @click="addGoods">+添加商品</view>
		</view>
		
		<view class="titleBox">
			<view class="title">商品名称</view>
			<view class="title">单价(元)</view>
			<view class="title">数量</view>
		</view>
		
		<view v-for="(item,index) in info" :key="index">
			<i-swipeout
				i-class-item="myitem"
				:actions="actions" 
				:toggle="toggle"
				@change="handlerCloseButton(index)"
			>
				<view slot="content" class="listInfo">
					<view class="text">{{item.name}}</view>
					<view class="text">{{item.pSalePrice}}</view>
					<view class="text">{{item.countNum}}</view>
				</view>
			</i-swipeout>
		</view>
		    
				
	</view>
</template>

<script>
	export default{
		props:['info'],
		data(){
			return{
				toggle:false,
				actions:[
					{
						name : '删除',
						color : '#fff',
						fontsize : '20',
						width : 80,
						icon : 'none',
						background : '#ed3f14'
					},
				],
			}
		},
		methods:{
			addGoods(){
				uni.navigateTo({
					url:'/pages/tool/tool?type=GOODS&commodityUses=UNIVERSAL,EARLY'
				})
			},
			handlerCloseButton(index){
				this.$emit('del',index)
			}
		},
	}
</script>

<style lang="scss" scoped>
	/deep/.myitem{
		padding: 0 !important;
	}
	.goodsBox{
		margin: 0 30rpx;
		font-size: 28rpx;
		margin-bottom: 30rpx;
		.topBox{
			display: flex;
			color: #333333;
			justify-content: space-between;
			border-left: 8rpx solid #61A3FF;
			.title{
				margin-left: 15rpx;
			}
			.addGoods{
				border: 1rpx dashed #61A3FF;
				color: #61A3FF;
				border-radius: 50rpx;
				padding: 0rpx 10rpx;
			}
		}
		.titleBox{
			display: flex;
			padding: 30rpx;
			margin-top: 30rpx;
			background-color:rgba(248,248,248,1);
			color: #333333;
			.title:nth-child(1){
				width: 350rpx;
			}
			.title:nth-child(2){
				width: 220rpx;
			}
		}
		.listInfo{
			display: flex;
			padding: 30rpx;
			color: #333333;
			.text:nth-child(1){
				width: 350rpx;
			}
			.text:nth-child(2){
				width: 220rpx;
			}
		}
	}
	
</style>
