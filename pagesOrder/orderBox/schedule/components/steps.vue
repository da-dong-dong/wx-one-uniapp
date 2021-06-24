<template>
	<view> 
		<!-- <view class="left">
			<image :src="status | img" mode=""></image>
			<view class="clo"></view>
		</view> -->
		<!-- <view>标题{{title}}</view>
		<view>状态{{status}}</view>
		<view>时间{{time}}</view>
		<view>数字{{number}}</view>
		<view>是否最后{{number === last}}</view> -->
		
		<view class="list" v-for="item in arr" :key="item.number">
			<!-- {{item.title}} -->
			<view class="left">
				<image class="status" :src="item.status | img" mode=""></image>
				<image class="line" v-if="!(item.number === arrLen)" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/schedule/line.png" mode=""></image>
			</view>
			
			<view class="right">
				<view class="title">{{item.title}}</view>
				<view class="time">{{item.time | time}}</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['arr'],
		filters:{
			img(status){
				let url = 'https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/schedule/'
				const result = new Map([
					['NOT_PROCESSING',url+'NOT_PROCESSING.png'],
					['PROCESSING',url+'PROCESSING.png'],
					['COMPLETE',url+'COMPLETE.png'],
				])
				return result.get(status)
			},
		},
		data(){
			return{
				// 长度
				arrLen:null,
			}
		},
		mounted(){
		},
		methods:{
			// 是否显示line
		},
		watch:{
			arr(){
				this.arrLen = this.arr.length
			}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.list{
		display: flex;
		margin-left: 80rpx;
		.left{
			width: 60rpx;
			.status,.line{
				width: 60rpx;
				height: 60rpx;
			}
		}
		.right{
			margin-left: 30rpx;
			.title{
				font-size: 28rpx;
				height: 60rpx;
				line-height: 60rpx;
			}
			.time{
				font-size: 24rpx;
				color: #777777;
			}
		}
	}

</style>
