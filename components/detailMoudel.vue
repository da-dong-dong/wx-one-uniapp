/************************************* 订单详情组件 ************************************/
<template>
	<view>
		<!-- 顶部 订单号 订单类型 -->
		<view class="topNum">
			<view class="topConLeft">
				<view>订单号：</view>
				<view>{{info.orderNo}}</view>
			</view>
			<view class="topConRight">
				<image :src="info.type | img" mode=""></image>
				<view class="text">
					{{info.type | type}}
				</view>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="orderBox">
			<!-- 联系人信息 -->
			<view class="userInfo" v-for="user in info.customerContactBasicVos" :key="info.orderId">
				<view class="userLeft">
					<view class="callName">{{user.callName}}：</view>
					<view class="name">{{user.name}}</view>
				</view>
				<view class="userRight">
					<view>手机号：</view>
					<view>{{user.mobile | noMobile}}</view>
				</view>
			</view>
			
			<!-- 宝宝信息 -->
			<view class="babyInfo" v-for="baby in info.customerBabyBasicVos" :key="info.orderId">
				<view class="callName">{{baby.callName}}：</view>
				<view class="name">{{baby.name}}</view>
			</view>
			
			<!-- 订单详情 -->
			<view class="orderInfo">
				<view class="list">
					<view class="listLeft">
						<view class="title">订单门店：</view>
						<view class="text">{{shopIdMap.get(info.orderShopId)}}</view>
					</view>
					
					<view class="listRight">
						<view class="title">订单时间：</view>
						<view class="text">{{info.orderTime | times }}</view>
					</view>
				</view>
				
				<view class="list" v-if="!type">
					<view class="listLeft">
						<view class="title">订单分类：</view>
						<view class="text">{{typeIdMap.get(info.orderCategoryId) | none}}</view>
					</view>
					
					<view class="listRight">
						<view class="title">订单分组：</view>
						<view class="text">{{groupIdMap.get(info.groupCategoryId) | none}}</view>
					</view>
				</view>
				
				<view class="list">
					<view class="listLeft">
						<view class="title">套系名称：</view>
						<view class="text">{{info.assemblyName}}</view>
					</view>
					
					<view class="listRight">
						<view class="title">套系金额：</view>
						<view class="text">{{info.assemblyPrice}}</view>
					</view>
				</view>

				<view class="list" v-if="info.itemName">
					<view class="listLeft">
						<view class="title">子订单名称：</view>
						<view class="text">{{info.itemName}}</view>
					</view>
					
					<view class="listRight">
						<view class="title">子订单金额：</view>
						<view class="text">{{info.itemPrice}}</view>
					</view>
				</view>
				
				<view class="list" v-if="!type">
					<view class="listLeft">
						<view class="title">服务等级：</view>
						<view class="text">{{serviceIdMap.get(info.serviceCategoryId) | none}}</view>
					</view>
					
					<view class="listRight">
						<view class="title">老师级别：</view>
						<view class="text">{{teacherIdMap.get(info.teacherCategoryId) | none}}</view>
					</view>
				</view>
				
				<view class="list">
					<view class="listLeft">
						<view class="title">接单人员：</view>
						<view class="text" v-if="info.receptionist">{{info.receptionist | reception}}</view>
						<view class="text" v-else>{{info.receptions | reception}}</view>
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['info','type'],
		computed:{
			...mapGetters('shopArr',[
				'get_shopAllArr',
				'get_orderTypeArr',
				'get_orderGroup',
				'get_serviceCategory',
				'get_teacherCategory'
			])
		},
		filters:{
			type(type){
				const result = new Map([
					['WEDDING_DRESS', '婚纱订单'],
					['BABY', '儿童订单'],
					['PREGNANT', '孕妈订单'],
					['SERVICE', '服务订单'],
					['PORTRAY', '写真订单'],
					['WEDDING', '婚庆订单'],
				])
				return result.get(type) ? result.get(type) : ''
			},
			img(type){
				let url = 'https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/orderDetail/'
				const result = new Map([
					['WEDDING_DRESS', url+ 'WEDDING_DRESS.png'],
					['BABY', url+ 'BABY.png'],
					['PREGNANT', url+ 'PREGNANT.png'],
					['SERVICE', url+ 'SERVICE.png'],
					['PORTRAY', url+ 'PORTRAY.png'],
					['WEDDING', url+ 'WEDDING.png'],
				])
				return result.get(type)
			},
			reception(arr){
				// return arr.join('/')
				return arr
			},
			none(data){
				if(data){
					return data
				}else{
					return '未选择'
				}
			},
			noMobile(data){
				if(data){
					return data
				}else{
					return '未填写'
				}
			},
			times(dataStr){
				if(dataStr){
					 let dt = new Date(dataStr)
					 let y = dt.getFullYear()
					 let m = dt.getMonth()+1;
					 let d = dt.getDate()
					 return `${y}-${m}-${d}`
				}else{
					return '未选定时间'
				}
			}
		},
		data(){
			return{
				
				// 过滤门店
				shopIdMap: new Map(),
				// 过滤分组
				groupIdMap: new Map(),
				// 过滤分类
				typeIdMap: new Map(),
				// 过滤服务
				serviceIdMap: new Map(),
				// 过滤老师
				teacherIdMap: new Map(),
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.groupIdMap = new Map(this.get_orderGroup.map(item => [item.id, item.name]))
			this.typeIdMap = new Map(this.get_orderTypeArr.map(item => [item.id, item.name]))
			this.serviceIdMap = new Map(this.get_serviceCategory.map(item => [item.id, item.name]))
			this.teacherIdMap = new Map(this.get_teacherCategory.map(item => [item.id, item.name]))
		},
	}
</script>

<style lang="scss" scoped>
	.topNum{
		border-bottom: 1rpx solid #DDDDDD;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		.topConLeft{
			display: flex;
		}
		.topConRight{
			display: flex;
			image{
				width: 28rpx;
				height: 28rpx;
				margin: 5rpx 10rpx 0 0;
			}
			.text{
				color: #61A3FF;
			}
		}
	}
	.orderBox{
		border-bottom: 1rpx solid #DDDDDD;
		margin: 0 30rpx;
		padding-top: 30rpx;
		.userInfo{
			font-size: 28rpx;
			display: flex;
			// justify-content: space-between;
			margin-bottom: 30rpx;
			.userLeft,.userRight{
				flex: 1;
				display: flex;
			}
			.userRight{
				margin-left: 10rpx;
			}
		}
		.babyInfo{
			font-size: 28rpx;
			display: flex;
			margin-bottom: 30rpx;
		}
		.orderInfo{
			font-size: 24rpx;
			color: #a2a2a2;
			.list{
				display: flex;
				// justify-content: space-between;
				margin-bottom: 30rpx;
				.listLeft,.listRight{
					flex: 1;
					display: flex;
				}	
				.listRight{
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
