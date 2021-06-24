<template>
	<view>
		<view class="bigBox">
			<view class="left">
				<view class="title">{{title}}:</view>
				<view class="flex_all">
					<picker mode="date" :value="time" @change="bindDateChange($event, time)">
						<view class="flex">
							<view class="uni-input">{{time ? time : '请选择' | times}} </view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			<!-- <view class="right">
				<span>{{lunar? '农历' : '新历'}}</span>
				<switch @change="change" :checked="lunar" color="#61a3ff" class="switch"/>
			</view> -->
		</view>
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			@close="close"
			ref="calendar"
		/>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default{
		props:{
			time:{
				default:null,
			},
			lunar:{
				default:false,
			},
			title:{
				default:'生日'
			}
		},
		components:{
			uniCalendar
		},
		data(){
			return{
			}
		},
		methods:{
			openCalendar(){
				this.$refs.calendar.open()
				this.$emit('update:showText',true)
			},
			close(){
				this.$emit('update:showText',false)
			},
			// 日历选中确定返回值
			enSure(e){
				this.$emit('update:getBTime',Date.parse(new Date(e.fulldate)))
				this.$emit('update:showText',false)
			},
			change(e){
				this.$emit('update:getBLunar',e.target.value)
			},

			//时间
			bindDateChange (e, item) {
				this.$emit('update:getBTime',new Date(e.target.value).getTime())
			},
		}
	}
</script>

<style lang="scss" scoped>
	.flex_all{
		width: 100%;
	}
	.flex{
		display: flex;
		justify-content: space-between;
	}
	.bigBox{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #ddd;
		margin: 0 30rpx;
		padding: 20rpx;
		.left{
			display: flex;
			justify-content: space-between;
			width: 100%;
			.title{
				width: 270rpx;
			}
			.text{
				width: 100%;
				display: flex;
				justify-content: space-between;
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
			}
		}
		.right{
			display: flex;
			>span{
				margin-right: -20rpx;
			}
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
				margin: -20rpx -20rpx -20rpx 0;
				transform:scale(0.5);
			}
		}
	}
</style>

