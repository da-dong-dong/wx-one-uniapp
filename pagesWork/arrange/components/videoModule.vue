<template>
	<view>
		<view class="switch">
			<switch @change="video" :checked="isVideo" style="transform:scale(0.5)" color="#61a3ff"/>
			<view>拍微视频</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['isVideo'],
		data(){
			return{
				
			}
		},
		methods:{
			// 是否拍微视频
			video(e){
				this.$emit('update:getId',e.detail.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.switch{
		margin-left: 20rpx;
		font-size: 28rpx;
		display: flex;
		>view{
			margin: 12rpx 0 0 -20rpx;
		}
	}
</style>
