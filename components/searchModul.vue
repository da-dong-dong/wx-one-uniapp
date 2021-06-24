/*******************************   订单搜索   *****************************************/
<template>
	<view>
		<view class="search">
			<view class="searchLeft">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">
						<view>{{array[index]}}</view>
						<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
					</view>
				</picker>
				<input type="text" :placeholder="array[index]" v-model="keyword"/>
			</view>
			
			<view class="searchBut" @click="search">
				<i-icon type="search" size="20" color="#80848f" />
			</view>
		</view>
		
		<view :class="gapId?'flexGap':''">
			<view class="shopBox">
				<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/shop.png" mode=""></image>
				<picker @change="shopChange" :value="shopIndex" :range="shopArr">
					<view class="uni-input">
						<view>{{shopArr[shopIndex]}}</view>
						<image style="margin-top: 20rpx;" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
					</view>
				</picker>
			</view>
			<view v-if="gapId" class="gap">
				<text>隐藏空档</text>
				<switch :checked="gapFlag" color="#61A3FF" @change="switchChange" style="transform: scale(0.7,0.7);"/>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props:['needShop','sai','gapShow','gapId'],
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr', 
			])
		},
		data(){
			return{				
				// 搜索下拉选择
				array:['姓名','手机号','订单号'],
				// 下拉下标
				index:0,
				// 搜索
				keyword:null,
				// 空档期
				gapFlag:false,

				showShop:true,
				
				shopIndex:0,
				shopArr:[],
				
				parmas:{
					isSearchCount:true,
					limit:10,
					page:1,
				}
			}
		},
		mounted(){
			if(this.sai !== null){
				this.array = ['项目名']
			}
			if(this.needShop !== null){
				this.showShop = false
			}
			this.getPickerArr()
		},
		methods:{	
			// 空档期变化
			switchChange(e){
				this.$emit('update:gapShow',e.target.value)
			},
			getPickerArr(){
				this.shopArr = this.get_shopAllArr.map((i)=>{ return i.shopName })
				this.shopIndex = this.get_shopAllArr.findIndex((i)=>{ return this.shopId === i.shopId})
			},
			
			// 获取门店ID
			shopChange(e){
				this.shopIndex = e.detail.value
				this.parmas.orderShopId = this.get_shopAllArr[this.shopIndex].shopId
				this.$emit('search',this.parmas)
			},
			
			// 下拉选择
			bindPickerChange(e){
				this.index = e.detail.value
			},
			// 清空所有选择
			clearParmas(){
				delete this.parmas.contactMobile
				delete this.parmas.orderNo
				delete this.parmas.contactName
				delete this.parmas.itemName
			},
			// 搜索
			search(){
				this.parmas.page = 1
				if(this.keyword && this.keyword !== ''){
					let value = this.array[this.index]
					if(value === '姓名'){
						this.clearParmas()
						this.parmas.contactName = this.keyword
					}else if(value === '手机号'){
						this.clearParmas()
						this.parmas.contactMobile = this.keyword
					}else if(value === '订单号'){
						this.clearParmas()
						this.parmas.orderNo = this.keyword
					}else if(value === '项目名'){
						this.clearParmas()
						this.parmas.itemName = this.keyword
					}
				}else{
					this.clearParmas()
				}
				this.$emit('search',this.parmas)
			},
		},
	}
</script>

<style lang="scss" scoped>
// 空档期
	.flexGap{
		display: flex;
		padding: 0 30rpx;
		box-sizing: content-box;
		justify-content: space-between;
		align-items: center;
		.shopBox{
			width: 445rpx;
			margin: 0;
		}
		.gap{
			font-size: 28rpx;
		}
	}
	.search{
		background-color: #f8f8f8;
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 30rpx auto; 
		display: flex;
		justify-content: space-between;
		.searchLeft{
			display: flex; 
			input{
				font-size: 28rpx;
				margin-top: 18rpx;
				border-left: 1rpx solid #DDDDDD;
				padding: 0 30rpx;

			}
		}
		.searchBut{
			padding: 0 30rpx;
		}
	}
	.shopBox{
		width: 690rpx;
		margin: 30rpx auto;
		display: flex;
		image{
			width: 28rpx;
			height: 28rpx;
			margin: 6rpx 10rpx 0 0;
		}
	}
	.uni-input{
		display: flex;
		font-size: 28rpx;
		font-weight: bold;
		padding: 0 30rpx;
		image{
			width: 15rpx;
			height: 15rpx;
			margin: 40rpx 0 0 5rpx;
		}
	}
	// /deep/.imgMargin{
	// 	margin: 18rpx 0 0 5rpx !important;
	// }
</style>
