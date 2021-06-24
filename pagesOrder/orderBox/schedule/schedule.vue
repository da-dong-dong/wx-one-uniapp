<template>
	<view>
		
		<view class="stepsBox">
			<steps :arr="stepsArr" ></steps>
		</view>
		
		<view class="back" @click="back">返回</view>
		<i-message id="message" />
	</view>
</template>

<script>
	import steps from './components/steps.vue'
	import { getAllOrder } from '@/util/api/shop.js'
	export default {
		components:{
			steps
		},
		data() {
			return {
				// 订单信息
				orderInfo:null,
				// 进度信息
				stepsArr:[],
				
				parmas:{
					isSearchCount:true,
					limit:10,
					page:1,
					orderNo:null
				}
			};
		},
		onLoad(option){
			this.parmas.orderNo = option.orderNo
		},
		mounted(){
			// 获取订单信息
			this.getOrder()
		},
		methods:{
			// 创建订单进度状态数组
			getOrder(){
				getAllOrder(this.parmas).then(res=>{
					this.orderInfo = res.data.data.records
					let datas = res.data.data.records[0]
					this.stepsArr = [
						{
							number:1,
							title:'拍照',
							status: datas.photoStatus,
							time: datas.photoUpdateTime
						},
						{
							number:2,
							title:'修片',
							status: datas.repairStatus,
							time: datas.repairUpdateTime
						},
						{
							number:3,
							title:'选片',
							status: datas.chooseStatus,
							time: datas.chooseUpdateTime
						},
						{
							number:4,
							title:'精修',
							status: datas.refineStatus,
							time: datas.refineUpdateTime
						},
						{
							number:5,
							title:'看版',
							status: datas.watchStatus,
							time: datas.watchUpdateTime
						},
						{
							number:6,
							title:'设计',
							status: datas.designStatus,
							time: datas.designUpdateTime
						},
						{
							number:7,
							title:'发件',
							status: datas.senderStatus,
							time: datas.senderUpdateTime
						},
						{
							number:8,
							title:'回件',
							status: datas.returnStatus,
							time: datas.returnUpdateTime
						},
						{
							number:9,
							title:'取件',
							status: datas.pickupStatus,
							time: datas.pickupUpdateTime
						},
					]
				})
			},
		
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		},

	}
</script>

<style lang="scss">
	.stepsBox{
		margin: 80rpx 0;
	}
	.back{
		width: 550rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #61A3FF;
		color: #FFFFFF;
		border-radius: 30rpx;
		margin: 0 auto;
	}
</style>
