<template>
	<view>
		<view v-for="item in info" :key="item.id" class="info">
			 {{item.name}} {{item | completeFilter}} {{item | pickupFilter}} 
		</view>
	</view>
</template>

<script>
	import { getPickupStatus } from '@/util/api/shop.js'
	export default{
		props:['item'],
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
		data(){
			return{
				info:null,
			}
		},
		mounted(){
			this.getPickupStatus()
		},
		methods:{
			// 获取取件状态
			getPickupStatus(){
				let ids = this.item.join()
				if(ids){
					getPickupStatus({ids:ids}).then(res=>{
						this.info = res.data.data
					})
				}
				
			},
		},
		watch:{
			item(){
				this.getPickupStatus()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info{
		width: 450rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		margin-bottom: 5rpx;
	}
</style>
