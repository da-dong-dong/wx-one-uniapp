/**************************  订单详情  *******************************/
<template>
	<view class="bigBox">
		<!-- 标题 -->
		<view class="titleBox">
			<view class="title">
				订单详情
			</view>
		</view>
		
		<!-- 订单号 时间 -->
		<view class="orderTop">
			<view class="left">
				<view class="title">订单号：</view>
				<view class="text">{{dataInfo.orderNo}}</view>
			</view>
			<view class="right">
				<view class="title">创建时间：</view>
				<view class="text">{{dataInfo.orderTime | time}}</view>
			</view>
		</view>
		
		<!-- 门店 -->
		<view class="listBox">
			<view class="title">门店：</view>
			<view class="text">{{shopIdMap.get(dataInfo.orderShopId)}}</view>
		</view>
		<!-- 接单人员 -->
		<view class="listBox">
			<view class="title">接单人员：</view>
			<view class="text">{{dataInfo.peception | actor}}</view>
		</view>
		<!-- 专服人员 -->
		<view class="listBox">
			<view class="title">专服人员：</view>
			<view class="text">{{dataInfo.service | actor}}</view>
		</view>
		<!-- 网销人员 -->
		<view class="listBox">
			<view class="title">网销人员：</view>
			<view class="text">{{dataInfo.network | actor}}</view>
		</view>
		<!-- 订单分类 -->
		<view class="listBox">
			<view class="title">订单分类：</view>
			<view class="text">{{typeIdMap.get(dataInfo.orderCategoryId) | noDate}}</view>
		</view>
		<!-- 订单分组 -->
		<view class="listBox">
			<view class="title">订单分组：</view>
			<view class="text">{{groupIdMap.get(dataInfo.groupCategoryId) | noDate}}</view>
		</view>
		<!-- 订单风格 -->
		<view class="listBox">
			<view class="title">订单风格：</view>
			<view class="text overText" @click="onClickShow">{{dataInfo.likeStyle | like}}</view>
		</view>
		<!-- 备注 -->
		<view class="bei">
			<view class="title">备注：</view>
			<view class="text">{{dataInfo.remark | remark}}</view>
		</view>

		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['openInfo'],
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
				// 类别
				'get_orderTypeArr',
				// 分组
				'get_orderGroup',
			])
		},
		filters:{
			noDate(data){
				if(data){
					return data
				}else{
					return '未选择'
				}
			},
			like(data){
				if(data){
					return data.join('/')
				}else{
					return '未选择'
				}
			},
			actor(arr){
				if(arr){
					if(arr.length > 0){
						return arr.join('/')
					}else{
						return '未选择'
					}
				}
			},
			remark(data){
				if(data){
					if(data !== null && data.trim() !== ''){
						return data
					}else{
						return '未备注'
					}
				}
			},
		},
		data(){
			return{
				// 过滤门店
				shopIdMap: new Map(),  
				// 过滤类别
				typeIdMap: new Map(),  
				// 过滤分组
				groupIdMap: new Map(),  
				
				dataInfo:{
					// 订单号
					orderNo:null,
					// 创建时间
					orderTime:null,
					// 门店ID
					orderShopId:null,
					// 接单人员
					peception:[],
					// 专服人员
					service:[],
					// 网销人员
					network:[],
					// 订单分类
					orderCategoryId:null,
					// 订单分组
					groupCategoryId:null,
					// 订单风格
					likeStyle:null,
					// 备注
					remark:null,
				}
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.typeIdMap = new Map(this.get_orderTypeArr.map(item => [item.id, item.name]))
			this.groupIdMap = new Map(this.get_orderGroup.map(item => [item.id, item.name]))
		},
		methods:{
			//弹窗显示
			onClickShow(){
				let text  = this.dataInfo.likeStyle.join('/')
				uni.showToast({
					title: text,
					icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
					duration: 2000    //持续时间为 2秒
				}) 
			}
		},
		watch:{
			openInfo(){
				// 订单号
				this.dataInfo.orderNo = this.openInfo.orderNo
				// 创建时间
				this.dataInfo.orderTime = this.openInfo.orderTime
				// 门店ID
				this.dataInfo.orderShopId = this.openInfo.orderShopId
				// 服务人员
				this.openInfo.orderActorVos.forEach((i)=>{
					// 接单人员 RECEPTION
					if(i.positionType === 'RECEPTION'){
						let rArr = []
						rArr.push(i.actorName)
						this.dataInfo.peception = rArr
					}
					// // 专服人员 SERVICE
					if(i.positionType === 'SERVICE'){
						let sArr = []
						sArr.push(i.actorName)
						this.dataInfo.service = sArr
					}
					// // 网销人员 NETWORK_SALES
					if(i.positionType === 'NETWORK_SALES'){
						let nArr = []
						nArr.push(i.actorName)
						this.dataInfo.network = nArr
					}
				})
				// 订单分类
				this.dataInfo.orderCategoryId = this.openInfo.orderCategoryId
				// 订单分组
				this.dataInfo.groupCategoryId = this.openInfo.groupCategoryId
				// 订单风格
				this.dataInfo.likeStyle = JSON.parse(this.openInfo.likeStyle)
				// 备注
				// if(this.openInfo.remark !== null && this.openInfo.remark.trim() !== ''){
				this.dataInfo.remark = this.openInfo.remark
				// }else{
				// 	this.dataInfo.remark = '未备注'
				// }
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
		.orderTop{
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #f9f9f9;
			padding: 0 20rpx;
			font-size: 28rpx;
			margin-top: 30rpx;
			.left{
				display: flex;
			}
			.right{
				display: flex;
				color: #BBBBBB;
				font-size: 24rpx;
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
		.bei{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin-top: 30rpx;
			min-height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #f9f9f9;
			.title{
				width: 270rpx;
			}
		}
		.overText{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
