<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">订单号</view>
			<view class="flex_arr">
				<view v-if="autoOrderNo" class="text backText">生成订单号</view>
				<input v-else type="text" class="text" placeholder="输入订单号" @input="orderNo"/>
				<switch @change="change" :checked="autoOrderNo" color="#61a3ff" class="switch"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['autoOrderNo'],
		data(){
			return{
				
			}
		},
		methods:{
			// 是否自动生成订单号
			change(e){
				this.$emit('update:autoOrder',e.detail.value)
			},
			// 获取输入订单号
			orderNo(e){
				this.$emit('update:getOrderNo',e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
	.backText{
		background:#eee
	}
	.flex_arr{
		display: flex;
		justify-content: space-between;
	}
</style>
