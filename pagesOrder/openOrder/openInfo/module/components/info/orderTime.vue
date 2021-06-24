<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">时间</view>
			<view class="uni-list-cell-db">
				<picker mode="date" :value="params.orderTime" @change="bindDateChange($event, params)" :disabled="fnPermissionShopId('STORE_ORDER_TIME')">
					<view class="flex">
						<view class="uni-input">{{params.orderTime ? params.orderTime  : '请选择时间' | times}} </view>
						<i-icon class="icon" type="enter" size="16" color="#80848f"/>
					</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['params'],
		data(){
			return{
				
			}
		},
		methods:{
			bindDateChange (e, item) {
				// console.log(item)
				// item.orderTime = e.target.value
				this.$emit('open', e.target.value)
			},
			openCalendar(){
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
