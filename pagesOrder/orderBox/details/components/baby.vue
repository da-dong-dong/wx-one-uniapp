/*************************************  宝宝信息  **************************************/
<template>
	<view class="bigBox">
		<!-- 标题 -->
		<view class="titleBox">
			<view class="title">
				宝宝信息
			</view>
		</view>
		
		<view v-for="item in dataInfo" :key="item.id">
			<!-- 昵称 -->
			<view class="listBox">
				<view class="title">昵称：</view>
				<view class="text">{{item.callName}}</view>
			</view>
			
			<!-- 姓名 -->
			<view class="listBox">
				<view class="title">姓名：</view>
				<view class="text">{{item.name | noData}}</view>
			</view>	
			
			<!-- 生日 -->
			<view class="listBox last">
				<view class="title">生日：</view>
				<view class="text" v-if="item.birthdayLunar">{{item.birthdayStr | typeStr}}</view>
				<view class="text" v-else>{{item.birthdayTime | typeTime}}</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		props:['openInfo'],
		filters:{
			noData(data){
				if(data !== null && data.trim() !== ''){
					return data
				}else{
					return '未填写'
				}
			},
			// 农历
			typeStr(str){
				if(str){
					return str
				}else{
					return '未定日期'
				}
			},
			// 新历
			typeTime(time){
				if(time){
					let dt = new Date(Number(time))
					let y = dt.getFullYear()
					let m = (dt.getMonth() + 1).toString().padStart(2, 0)
					let d = dt.getDate().toString().padStart(2, 0)
					return `${y}-${m}-${d}`
				}else{
					return '未定日期'
				}
			},
		},
		data(){
			return{
				// 内容 customerBabyVos
				dataInfo:[]
			}
		},
		mounted(){
			this.dataInfo = this.openInfo.customerGroupVo.customerBabyVos
		},
		watch:{
			openInfo(){
				this.dataInfo = this.openInfo.customerGroupVo.customerBabyVos
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		padding: 0 30rpx;
		padding-top: 30rpx;
		.titleBox{
			font-size: 32rpx;
			border-left: 8rpx solid #61A3FF;
			.title{
				margin-left: 30rpx;
			}
		}
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin-top: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #f9f9f9;
			.title{
				width: 270rpx;
			}
		}
		.last{
			border-bottom: 1rpx solid #DDDDDD;
		}
	}
</style>
