<template>
	<view>
		<view class="bigBox">
			<view class="left">
				<view class="title">{{timeTitle}}</view>
				<view class="text" @click="openCalendar">
					{{showTime ? showTime : timeTitle}}
					<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default{
		props:['typeTime','type'],
		components:{
			uniCalendar
		},
		data(){
			return{
				timeTitle:null,
				showTime:null,
			}
		},
		mounted(){
			switch(this.type){
				case 'WEDDING_DRESS':
					this.timeTitle = '结婚日期'
					break;
				case 'PREGNANT':
					this.timeTitle = '预产日期'
					break;
			}
		},
		methods:{
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				this.showTime = e.fulldate
				this.$emit('update:getTypeDate',Date.parse(new Date(this.showTime)))
			},
		},
		watch:{
			typeTime(){
				this.showTime = this.typeTime.split(/[ ]+/)[0]
			},
		}
	}
</script>

<style lang="scss" scoped>
	.left{
		display: flex;
		font-size: 28rpx;
		padding: 0 20rpx;
		margin: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1rpx solid #DDDDDD;
		.title{
			width: 270rpx;
		}
		.text{
			display: flex;
		}
	}
	image{
		width: 15rpx;
		height: 15rpx;
		margin: 40rpx 0 0 5rpx;
	}
</style>
