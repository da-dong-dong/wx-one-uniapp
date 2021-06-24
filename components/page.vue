<template>
	<view>
		<view class="bigBox">
			<view class="but" @click="prev">上一页</view>
			<view class="page">{{current}}/{{total}}</view>
			<view class="but" @click="next">下一页</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:['current','total'],
		data() {
			return {
				
			};
		},
		methods:{
			// 上一页
			prev(){
				if(this.current>1){
					this.$emit('pageChange',this.current - 1)
				}
				
			},
			// 下一页
			next(){
				if(this.current<this.total){
					this.$emit('pageChange',this.current + 1)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		margin: 30rpx;
		display: flex;
		justify-content: space-between;
		.page{
			padding: 10rpx
		}
		.but{
			padding: 10rpx 15rpx;
			color: #FFFFFF;
			background-color: #61A3FF;
			border-radius: 10rpx;
		}
	}
</style>
