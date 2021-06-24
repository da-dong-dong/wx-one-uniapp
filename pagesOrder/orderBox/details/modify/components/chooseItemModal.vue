/***************************************** 选择编辑子套系 ***************************/
<template>
	<view class="bigBox">
		<view class="box">
			
			<view class="titleBox">
				<view class="title">选择需编辑子套系名称</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
			
			<view class="listBox">
				<view class="list" v-for="(item, index) in itemNameArr" :key="index" @click="choose(item.itemId)">{{item.name}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		props:['openInfo','updataItemType'],
		data(){
			return{	
				orderId : null,
				itemNameArr:[],
			}
		},
		mounted(){
			this.orderId = this.openInfo.orderId,
			this.openInfo.orderItemVos.forEach((i)=>{
				let info = {
					name:i.name,
					itemId:i.itemId,
				}
				this.itemNameArr.push(info)
			})
		},
		methods:{
			cancel(){
				this.$emit('cancel')
			},
			choose(e){
				this.cancel()
				if(this.updataItemType === 'bookAndBottom'){
					uni.navigateTo({
						url:'./modify/modifyItemInfo/modifyItemInfo?id=' + this.orderId + '&itemId=' + e
					})
				}else{
					uni.navigateTo({
						url:'./modify/modifyOrderItem/modifyOrderItem?id=' + this.orderId + '&itemId=' + e + '&type=' + this.updataItemType
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
			margin: 50% auto;
			border-radius: 15rpx;
			.titleBox{
				display: flex;
				justify-content: space-between;
				color: #000000;
				padding: 30rpx;
				border-bottom: 1rpx solid #DDD
			}
			.listBox{
				font-size: 28rpx;
				padding: 50rpx;
				.list{
					padding-bottom: 30rpx;
				}
			}
		}
	}
</style>
