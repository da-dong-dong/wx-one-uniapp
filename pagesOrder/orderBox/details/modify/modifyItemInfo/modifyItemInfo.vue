/ ****************************  套系内容修改  **********************************/
<template>
	<view>
		<view class="bigBox">
			<!-- 子套系名 -->
			<view class="listBox">
				<view class="title">子套系名：</view>
				<view class="text">{{name}}</view>
			</view>
			
			<!-- 金额 -->
			<view class="listBox">
				<view class="title">金额：</view>
				<input class="text" type="number" v-model="infoData.price"/>
			</view>
			
			<!-- 入册 -->
			<view class="listBox">
				<view class="title">入册：</view>
				<input class="text" type="number"  v-model="infoData.bookCount"/>
			</view>
			
			<!-- 入底 -->
			<view class="listBox">
				<view class="title">入底：</view>
				<input class="text" type="number"  v-model="infoData.bottomCount"/>
			</view>
			
			<!-- 精修张数 -->
			<view class="listBox">
				<view class="title">精修张数：</view>
				<input class="text" type="number"  v-model="infoData.refineCount"/>
			</view>
			
			<!-- 保底张数 -->
			<view class="listBox">
				<view class="title">保底张数：</view>
				<input class="text" type="number"  v-model="infoData.photoCount"/>
			</view>
			
			<view :class="!fnPermissionShopId('STORE_DETAILS_ITEM')?'':'fn_back'" class="save" @click="save">保存</view>
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { getOrderDetails, updataItemInfo } from '@/util/api/shop.js'
	export default {
		data() {
			return {
				// 套系名
				name:null,
				infoData:{}
			};
		},
		onLoad(option){
			getOrderDetails({orderId:Number(option.id)}).then(res=>{
				res.data.data.orderItemVos.some((i)=>{
					if(i.itemId === Number(option.itemId)){
						this.name = i.name
						let info = {
							bookCount: i.bookCount,
							bottomCount: i.bottomCount,
							itemId: i.itemId,
							photoCount: i.photoCount,
							price: i.price,
							refineCount: i.refineCount,
						}
						this.infoData = info
					}
				})
			})
		},
		methods:{
			save(){
				let i = this.infoData
				let newInfo = {
					bookCount: Number(i.bookCount),
					bottomCount: Number(i.bottomCount),
					itemId: Number(i.itemId),
					photoCount: Number(i.photoCount),
					price: Number(i.price),
					refineCount: Number(i.refineCount),
				}
				updataItemInfo(newInfo).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: '修改成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								 delta: 1
							})
						},1000)
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			.title{
				width: 270rpx;
			} 
			.text{
				width: 360rpx;
			}
			input{
				border-radius: 10rpx;
				border: 1rpx solid #DDDDDD;
				padding: 16rpx;
			}
		}

		.save{
			width:650rpx;
			height:80rpx;
			line-height:80rpx;
			color:#FFFFFF;
			background-color: #61A3FF;
			text-align: center;
			margin: 10rpx auto;
			border-radius: 40rpx;
			margin-top: 130rpx;
		}
	}
</style>
