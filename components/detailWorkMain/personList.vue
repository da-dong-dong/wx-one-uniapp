<template>
	<view class="box">
		<view class="listBox">
			<view class="title fa-title">{{title}}</view>
			<view class="textBox">
				<view class="text fa-text" @click="goAddress">{{show}}</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		externalClasses:['fa-title','fa-text'],
		props:['title','show','type'],
		data(){
			return{
				
			}
		},
		methods:{
			goAddress(){
				this.$emit('goAddress',this.type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		display: flex;
		width: 100%;
		.title{
			width: 270rpx;
		}
		.textBox{
			display: flex;
			width: 100%;
			justify-content: space-between;
			.text{
				max-width: 360rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			image{
				width: 15rpx;
				height: 15rpx;
				margin: 18rpx 0 0 5rpx;
			}	
		}
	}
</style>
