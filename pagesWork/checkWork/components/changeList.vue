<template>
	<view>
		<view class="butBox">
			<view @click="change(1)">
				<view class="text" :class="index === 1 ? 'action':''">我的</view>
				<view class="line" v-if="index === 1"></view>
			</view>
			<view @click="change(2)">
				<view class="text" :class="index === 2 ? 'action':''">部门</view>
				<view class="line" v-if="index === 2"></view>
			</view>
			<view @click="change(3)">
				<view class="text" :class="index === 3 ? 'action':''">所有</view>
				<view class="line" v-if="index === 3"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['text'],
		data(){
			return{
				index:1
			}
		},
		methods:{
			change(i){
				this.index = i
				let text
				switch(i){
					case 1:
						text = 'my'
						break
					case 2:
						text = 'department'
						break
					case 3:
						text = 'all'
						break
				}
				this.$emit('changeType',text)
			}
		}
	}
</script>

<style lang="scss">
	.butBox{
		width: 630rpx;
		padding: 0 30rpx;
		background-color: #F8F8F8;
		border-radius: 2rpx;
		font-size: 32rpx;
		color: #333333;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		.text{
			padding: 30rpx 0;
		}
		.action{
			color: #61A3FF;
		}
		.line{
			height:6rpx;
			background:#61A3FF;
			border-radius:3rpx;
		}
	}
</style>
