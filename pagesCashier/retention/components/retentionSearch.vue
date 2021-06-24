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
		
		<view class="shopBox">
			<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/shop.png" mode=""></image>
			<picker @change="shopChange" :value="shopIndex" :range="shopArr">
				<view class="uni-input">
					<view>{{shopArr[shopIndex]}}</view>
					<image style="margin-top: 20rpx;" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
				</view>
			</picker>	
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		components:{
			// pickerModule
		},
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
				// 过滤来源
				shopIdMap: new Map(),  
				
				// 搜索下拉选择
				array:['姓名','手机号'],
				// 下拉下标
				index:0,
				// 搜索
				keyword:null,
			
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
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.getPickerArr()
		},
		methods:{	
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
				delete this.parmas.searchKey
			},
			// 搜索
			search(){
				this.parmas.page = 1
				if(this.keyword && this.keyword !== ''){
					let value = this.array[this.index]
					this.clearParmas()
					this.parmas.searchKey = this.keyword
				}else{
					this.clearParmas()
				}
				this.$emit('search',this.parmas)
			},
		},
	}
</script>

<style lang="scss" scoped>
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
</style>
