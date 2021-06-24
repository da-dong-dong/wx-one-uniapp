/***********************************  编辑服务人员  **************************************/
<template>
	<view>
		<view class="bigBox">
			<!-- 接单人员 -->
			<view class="listBox" :class="!fnPermissionShopId('STORE_DETAILS_RECEPTION')?'':'fn_back'">
				<view class="title">接单人员：</view>
				<view class="textBox" @click="gotEnterpriseAll('RECEPTION')">
					<view class="text">{{showPeception}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</view>
			<!-- 专服人员 -->
			<view class="listBox" :class="!fnPermissionShopId('STORE_DETAILS_SERVICE')?'':'fn_back'">
				<view class="title">专服人员：</view>
				<view class="textBox" @click="gotEnterpriseAll('SERVICE')">
					<view class="text">{{showService}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</view>
			<!-- 网销人员 -->
			<view class="listBox" :class="!fnPermissionShopId('STORE_DETAILS_NETWORK_SALES')?'':'fn_back'">
				<view class="title">网销人员：</view>
				<view class="textBox" @click="gotEnterpriseAll('NETWORK_SALES')">
					<view class="text">{{showNetwork}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</view>
	
			<view class="save" @click="save">保存</view>
	
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { getOrderDetails, updataActor } from '@/util/api/shop.js'
	export default {
		components:{
		},
		filters:{
			actor(arr){
				if(arr){
					if(arr.length > 0){
						return arr.join('/')
					}else{
						return '未选择'
					}
				}
			},
		},
		data() {
			return {
				// 传给子组件
				showTextFa:null,
				
				// 选择联系人
				addressInfo:null,
				
				// 显示数据
				showPeception:'请选择',
				showService:'请选择',
				showNetwork:'请选择',
				
				actorInfo:{
					orderId:null,
					receptions:[],
					services:[],
					networkSales:[]
				}
			};
		},
		onLoad(option){
			
			this.actorInfo.orderId = Number(option.id)
			getOrderDetails({orderId:Number(option.id)}).then(res=>{
				let data = res.data.data
				data.orderActorVos.forEach((i)=>{
					// 接单人员 RECEPTION
					if(i.positionType === 'RECEPTION'){
						let rArr = []
						rArr.push(i)
						this.actorInfo.receptions = rArr
						this.showPeception =  this.filterActor(rArr)
					}
					// // 专服人员 SERVICE
					if(i.positionType === 'SERVICE'){
						let sArr = []
						sArr.push(i)
						this.actorInfo.services = sArr
						this.showService = this.filterActor(sArr)
					}
					// // 网销人员 NETWORK_SALES
					if(i.positionType === 'NETWORK_SALES'){
						let nArr = []
						nArr.push(i)
						this.actorInfo.networkSales = nArr
						this.showNetwork = this.filterActor(nArr)
					}
				})
			})
		},
		onShow(){
			let that = this;
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let address = currPage.data.address;
			this.addressInfo = address
		},
		methods:{
			// 打开模态框
			gotEnterpriseAll(type){
				let num
				if(type === 'RECEPTION'){
					if(this.fnPermissionShopId('STORE_DETAILS_RECEPTION')) return false
					this.showTextFa = this.showPeception
					num = 4
				}else if(type === 'SERVICE'){
					if(this.fnPermissionShopId('STORE_DETAILS_SERVICE')) return false
					this.showTextFa = this.showService
					num = 1
				}else if(type === 'NETWORK_SALES'){
					if(this.fnPermissionShopId('STORE_DETAILS_NETWORK_SALES')) return false
					this.showTextFa = this.showNetwork
					num = 1
				}
				uni.navigateTo({
					url:'/pages/address/address?type='+ type + '&show=' + this.showTextFa + '&num=' + num
				})
			},
			
			// 过去数据显示名字
			filterActor(arr){
				if(arr.length > 0){
					let show = []
					arr.forEach((i)=>{
						show.push(i.actorName)
					})
				  return show.join('/')
				}
			},
			
			// 模态框返回值
			getAddressInfo(e){
				let arr = []
				e.enArr.map((i)=>{
					let a = {
						actorId:i.id,
						main:i.main || false
					}
					arr.push(a)
				})
				if(e.type === 'RECEPTION'){
					this.showPeception = e.show
					this.actorInfo.receptions = arr
				}else if(e.type === 'SERVICE'){
					this.showService = e.show
					this.actorInfo.services = arr
				}else if(e.type === 'NETWORK_SALES'){
					this.showNetwork = e.show
					this.actorInfo.networkSales = arr
				}
			},
			
			// 保存
			save(){
				updataActor(this.actorInfo).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: '修改成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1000)
					}
				})
			},
		},
		watch:{
			addressInfo(){
				if(this.addressInfo){
					this.getAddressInfo(this.addressInfo) 
				} 
			}
		}
	}
</script>

<style lang="scss">
.bigBox{
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #DDDDDD;
			justify-content: space-between;
			.title{
				width: 270rpx;
			}
			.textBox{
				display: flex;   
				width: 100%;
				justify-content: space-between;
				.text{
					max-width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
			}
			.lunar{
				width:100%
			}
		}
		.textareaBox{
			margin: 30rpx;
			font-size: 28rpx;
			.title{
				padding: 0 20rpx;
			}
			.textarea{
				padding:20rpx;
				width: 650rpx;
				border-bottom: 1rpx solid #f9f9f9;
			}
		}
		.save{
			width:650rpx;
			height:80rpx;
			line-height:80rpx;
			color:#FFFFFF;
			background-color: #61A3FF;
			text-align: center;
			margin: 130rpx auto;
			border-radius: 40rpx;
		}
	}
</style>
