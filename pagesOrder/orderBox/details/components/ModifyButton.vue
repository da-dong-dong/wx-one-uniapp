/**************************  修改按钮  *******************************/
<template>
	<view>
		<view class="list">
			<!-- 开单信息 -->
			<view class="but" @click="onButtom('orderInfo')">
				<image :src="url+'survey.png'" mode=""></image>
				<view class="text">开单信息</view>
			</view>
			<!-- 客户信息 -->
			<view class="but" @click="onButtom('userInfo')">
				<image :src="url+'businessContact.png'" mode=""></image>
				<view class="text">客户信息</view>	
			</view>
			<!-- 客户来源 -->
			<view class="but" @click="onButtom('userSource')">
				<image :src="url+'export.png'" mode=""></image>
				<view class="text">客户来源</view>
			</view>
		</view>
		<view class="list">
			<!-- 服务人员 -->
			<view class="but" @click="onButtom('servicePersonnel')">
				<image :src="url+'assistant.png'" mode=""></image>
				<view class="text">服务人员</view>		
			</view>
			<!-- 客户区域 -->
			<view class="but" @click="onButtom('userArea')">
				<image :src="url+'areaChart.png'" mode=""></image>
				<view class="text">客户区域</view>
			</view>
			<!-- 套系信息 -->
			<view class="but" @click="onButtom('systemInfo')">
				<image :src="url+'viewDetails.png'" mode=""></image>
				<view class="text">套系信息</view>
			</view>
		</view>
		<view class="list">
			<!-- 入册/入底 -->
			<view class="but" @click="onButtom('bookAndBottom')">
				<image :src="url+'mms.png'" mode=""></image>
				<view class="text">入册/入底</view>
			</view>
			<!-- 产品 -->
			<view class="but" @click="onButtom('GOODS')">
				<image :src="url+'product.png'" mode=""></image>
				<view class="text">产品</view>
			</view>
			<!-- 服装 -->
			<view class="but" @click="onButtom('DRESSINFO')">
				<image :src="url+'dress.png'" mode=""></image>
				<view class="text">服装</view>	
			</view>
		</view>
		<view class="list">
			<!-- 景点 -->
			<view class="but" @click="onButtom('PLACE')">
				<image :src="url+'landscape.png'" mode=""></image>	
				<view class="text">景点</view>
			</view>
			<!-- 服务 -->
			<view class="but" @click="onButtom('SERVICES')">
				<image :src="url+'like.png'" mode=""></image>
				<view class="text">服务</view>
			</view>
			<view class="nobut"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:'https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/changeOrder/'
			}
		},
		methods:{
			onButtom(e){
				this.$emit('buttomType',e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		display: flex;
		.but{
			flex: 1;
			border-bottom: 1rpx solid #EDEDED;
			display: flex;
			padding: 30rpx;
			.text{
				font-size: 28rpx;
			}
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 5rpx 20rpx 0 0;
			}
		}
		.but:nth-child(2){
			border-left: 1rpx solid #EDEDED;
			border-right: 1rpx solid #EDEDED;
		}
		.nobut{
			flex: 1;
			padding: 30rpx;
		}
		
	}
	
</style>
