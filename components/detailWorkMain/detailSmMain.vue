<template>
	<view class="bigBox">
		<view class="listInfo">

			<view class="mainBox">
				<view class="detailTitleBox">
					<view class="title">子订单号：</view>
					<view class="text">{{item.itemNo}}</view>
				</view>
				
				<!-- 数码类型 数码状态 -->
				<view class="listBox">
					<view class="list">
						<view class="text">数码类型：</view>
						<view class="info">{{item.process | digitalProcess}}</view>
					</view>	
					<view class="list">
						<view class="text">数码状态：</view>
						<view class="info">{{item.processStatus | status}}</view>
					</view>	
				</view>
				
				<!-- 数码人员 完成期限 -->
				<view class="listBox">
					<view class="list">
						<view class="text">数码人员：</view>
						<view class="info">{{item.actorNameVo | actor}}</view>
					</view>	
					<view class="list">
						<view class="text">期限时间：</view>
						<view class="info">{{item.expireTime | time}}</view>
					</view>	
				</view>
				
				<!-- 完成时间 完成门店 -->
				<view class="listBox">
					<view class="list">
						<view class="text">完成时间：</view>
						<view class="info">{{item.successTime | successTime}}</view>
					</view>	
					<view class="list">
						<view class="text">数码门店：</view>
						<view class="info">{{shopIdMap.get(item.successShopId) | shop}}</view>
					</view>	
				</view>
				
			</view>
		</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['item'],
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
			])
		},
		filters:{
			// 数码类型
			digitalProcess(type){
				let result = new Map([
					['PHOTO', '拍照工作'],
					['REPAIR', '初修工作'],
					['REFINE', '精修工作'],
					['DESIGN', '设计工作'],
					['WATCH', '看版工作'],
					['SENDER', '发片工作'],
					['PICKUP', '取件工作'],
					['CHOOSE', '选修工作']
				])
				return result.get(type)
			},
			// 数码状态
			status(status){
				let result = new Map([
					['NOT_PROCESSING','未完成'],
					['PROCESSING','进行中'],
					['COMPLETE','已完成'],
				])
				return result.get(status)
			},
			// 完成时间
			successTime(time){
				if(time){
					return time
				}else{
					return '未选择'
				}
			},
			// 完成门店
			shop(shop){
				if(shop){
					return shop
				}else{
					return '未选择'
				}
			},
			// 人员
			actor(arr,type){
				if(arr){
					let name = []
					arr.map((i)=>{
						if(i.positionType === type){
							name.push(i.actorName)
						}
					})
					if(name.length > 0){
						return name.join()
					}else{
						return '无'
					}
				}
			}
		},
		data(){
			return{
				shopIdMap: new Map()
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
		}
	}
</script>

<style lang="scss">
	@import  './detailMainStyle.scss';
	.detailTitleBox{
		display: flex;
		font-size: 32rpx;
		border-left: 8rpx solid #61A3FF;
		margin-bottom: 30rpx;
		margin-left: -30rpx;
		.title{
			margin-left: 22rpx;
		}
		.text{
			font-weight: bold;
		}
	}

</style>