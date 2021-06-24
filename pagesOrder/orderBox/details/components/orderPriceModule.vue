/***********************************   订单套系内容   ***********************************/
<template>
	<view class="bigBox">
		<!-- 标题 -->
		<view class="titleBox">
			<view class="title">
				订单套系内容
			</view>
		</view>
		
		<!-- 服务等级 -->
		<view class="listBox">
			<view class="title">服务等级：</view>
			<view class="text">{{serviceIdMap.get(dataInfo.serviceCategoryId) | noData}}</view>
		</view>
		
		<!-- 老师等级 -->
		<view class="listBox">
			<view class="title">老师等级：</view>
			<view class="text">{{teacherIdMap.get(dataInfo.teacherCategoryId) | noData}}</view>
		</view>
		
		<!-- 套系名称 -->
		<view class="listBox">
			<view class="title">套系名称：</view>
			<view class="text">{{dataInfo.assemblyName}}</view>
		</view>
		
		<!-- 套系内容 -->
		<view v-for="(item,index) in dataInfo.assemblyInfo" :key="index">
			<assembly :info="item"></assembly>
		</view>
		
	</view>
</template>

<script>
	import assembly from './assembly.vue'
	import { mapGetters } from 'vuex'
	export default{
		props:['openInfo'],
		components:{
			assembly
		},
		computed:{
			...mapGetters('shopArr',[
				// 服务
				'get_serviceCategory',
				// 老师
				'get_teacherCategory'
			])
		},
		filters:{
			noData(data){
				if(data){
					return data
				}else{
					return '未选择'
				}
			}
		},
		data(){
			return{
				// 过滤服务
				serviceIdMap: new Map(),  
				// 过滤老师
				teacherIdMap: new Map(),  
				
				// 内容
				dataInfo:{
					// 服务等级
					serviceCategoryId:null,
					// 老师等级
					teacherCategoryId:null,
					// 套系名称
					assemblyName:null,
					// 套系内容
					assemblyInfo:null,
				}
			}
		},
		mounted(){
			this.serviceIdMap = new Map(this.get_serviceCategory.map(item => [item.id, item.name]))
			this.teacherIdMap = new Map(this.get_teacherCategory.map(item => [item.id, item.name]))
		},
		watch:{
			openInfo(){
				// 服务等级
				this.dataInfo.serviceCategoryId = this.openInfo.serviceCategoryId
				// 老师等级
				this.dataInfo.teacherCategoryId = this.openInfo.teacherCategoryId
				// 套系名称
				this.dataInfo.assemblyName = this.openInfo.assemblyName
				// 套系内容
				this.dataInfo.assemblyInfo = this.openInfo.orderItemVos
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		padding: 0 30rpx;
		padding-top: 30rpx;
		margin-bottom: 30rpx;
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
	}
</style>
