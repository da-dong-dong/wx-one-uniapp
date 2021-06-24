<template>
	<view>
		<view class="bigBox">
			<checkbox-group @change="checkboxChange">
				<label v-for="item in goodsList" :key="item.id">
					<view class="check">
						<checkbox :value="item.id" :checked="item.checked" style="transform:scale(0.7)"/>
						<view class="text">{{item.name}} {{item | completeFilter}} {{item | pickupFilter}}</view>
					</view>
				</label>
			</checkbox-group>
			
			<view class="button" @click="enSure">选择取件商品</view>
		</view>
	</view>
</template>

<script>
	import { getPickupGOODS } from '@/util/api/shop.js'
	export default {
		filters: {
			completeFilter (v) {
				if (v.countNum === v.returnCount) {
					return '[已完成]'
				} else if (v.returnCount > 0) {
					return '[部分完成]'
				} else if (v.returnCount === 0) {
					return '[未完成]'
				}
			},
			pickupFilter (v) {
				if (v.countNum === v.pickupCount) {
					return '[已取件]'
				} else if (v.pickupCount > 0) {
					return '[部分取件]'
				} else if (v.pickupCount === 0) {
					return '[未取件]'
				}
			}
		},
		data() {
			return {
				goodsList:null,
				checkId:null,
			};
		},
		onLoad(option){
			getPickupGOODS({ itemId: option.itemId}).then(res=>{
				this.goodsList = res.data.data
				let showArr = option.ids.slice()
				let enArr = []
				this.goodsList.forEach((i)=>{
					if(showArr.includes(i.id)){
						this.$set(i,'checked',true)
						enArr.push(i.id)
					}
				})
				this.checkId = enArr.map(Number)
			})
		},
		methods:{
			// 多选返回
			checkboxChange: function (e) {
				let arr = e.detail.value
				this.checkId = arr.map(Number)
			},
			
			// 确定选择
			enSure(){
				let needArr = this.goodsList.filter((i)=>{
					if(this.checkId){
						if(this.checkId.includes(i.id)){
							return i
						}
					}
				})
				let showName = needArr.map((i)=>{
					return i.name
				})

				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					pickupGoods: {
						'arr':this.checkId,
						'show':showName.join()
					}
				})
				uni.navigateBack({//返回
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.bigBox{
		margin: 60rpx;
		font-size: 32rpx;
		.check{
			display: flex;
			margin-bottom: 30rpx;
		}
		.button{
			width: 600rpx;
			color: #FFFFFF;
			background-color: #61A3FF;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			font-size: 32rpx;
			margin: 0 auto;
			margin-left: 50%;
			transform: translateX(-50%);
			margin-bottom: 30rpx;
			margin-top: 30rpx;
		}
	}
</style>
