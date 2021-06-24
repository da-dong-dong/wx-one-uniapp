<template>
	<view>
		<view class="bigBox">
			<!-- 称呼 -->
			<view class="listBox">
				<view class="title">称呼</view>
				<view class="text">{{sex}}</view>
			</view>
			
			<!-- 客户名称 -->
			<view class="listBox">
				<view class="title">客户名称</view>
				<view class="text" v-if="detials">{{detials.contactName?detials.contactName:''}}</view>
			</view>
			
			<!-- 客户电话 -->
			<view class="listBox">
				<view class="title">客户电话</view>
				<view class="text" v-if="detials">{{detials.contactMobile?detials.contactMobile:''}}</view>
			</view>
			
			<!-- 客户微信 -->
			<view class="listBox">
				<view class="title">客户微信</view>
				<view class="text" v-if="detials">{{detials.contactWechat?detials.contactWechat:''}}</view>
			</view>
			
			<!-- 项目名字 -->
			<view class="listBox">
				<view class="title">项目名字</view>
				<input type="text" v-model="params.name" placeholder="请输入" style="width:100%"/>
			</view>
			
			<!-- 项目类别 -->
			<consumePicker :saleCategoryId="params.saleCategoryId" :getId.sync="params.saleCategoryId"></consumePicker>
			
			<!-- 订单金额 -->
			<view class="listBox">
				<view class="title">订单金额</view>
				<input type="number" v-model="params.sumPrice" placeholder="请输入" style="width:100%"/>
			</view>
			
			<!-- 订单日期 -->
			<view class="listBox">
				<view class="title">订单日期</view>
				<view class="text">{{params.orderTime | time}}</view>
			</view>
			
			<!-- 接单人 -->
			<view class="listBox">
				<list :title="'接单人'" :show="reception" :type="'RECEPTION'" @goAddress="goAddress" style="width:100%"></list>
			</view>
			
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view style="width:100%">{{detials.createUser}}</view>
			</view>
			
			<!-- 订单备注 -->
			<view class="remarkBox">
				<textarea placeholder="订单备注:" v-model="params.remark"/>
			</view>
					
			<goodsBox :info="params.orderGoodsItemDtos" @del="delGoods"></goodsBox>
			
			<view class="button" @click="updataOrder">修改订单</view>
		</view>
		
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import goodsBox from '../addIndividual/components/goodsBox.vue'
	import consumePicker from '../../components/consumePicker.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	import { updateOrderIndividual, getOrderIndividualDetials } from '@/util/api/shop.js'
	export default {
		components:{
			goodsBox,
			consumePicker,
			list
		},
		data() {
			return {
				// 详情
				detials:null,
				// 性别
				sex:null,
				// 接单人
				reception:null,
				
				params:{
					contactId:null, //客户联系人ID
					name:null, //项目名称
					orderGoodsId:null, //订单ID
					orderGoodsItemDtos:[], //商品数组
					orderTime:null, //订单时间
					receptions:null, //接单人ID
					remark:null, //备注
					saleCategoryId:null, //消费类别
					sumPrice:null, //总价格
				},
			};
		},
		onLoad(op){
			this.getOrderIndividualDetials(Number(op.id))
		},
		onShow(){
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			let tool = currPages.data.tool
			let address = currPages.data.address
			if(address){
				this.reception = address.show
				let ids = []
				address.enArr.forEach((i)=>{
					ids.push(i.id)
				})
				this.params.receptions = ids
			}
			if(tool){
				tool.toolArr.forEach((i)=>{
					let lis ={
						countNum:1,
						defaultP:i.defaultP,
						goodsId:i.id,
						name:i.name,
						pSalePrice:i.pSalePrice,
						remark:null,
						salePrice:i.salePrice,
					}
					this.params.orderGoodsItemDtos.push(lis)
				})
			}
			// 清空
			currPages.setData({
				tool:null,
				address:null,
			})
		},
		methods:{
			// 获取详情
			getOrderIndividualDetials(id){
				getOrderIndividualDetials({id : id}).then(res=>{
					let data = res.data.data
					this.detials = data
					// 性别赋值
					if(this.detials.contactSex){
						this.sex = '先生'
					}else{
						this.sex = '女士'
					}
					// 获取当前项目类别
					this.params.contactId = data.contactId
					this.params.name = data.name
					this.params.orderGoodsId = data.id
					this.params.orderGoodsItemDtos = data.orderGoodsItemVos
					this.params.orderTime = data.orderTime
					// 接单人
					let recId = []
					let recName = []
					data.receptions.forEach((i)=>{
						recId.push(i.actorId)
						recName.push(i.actorName)
					})
					this.reception = recName.join('/')
					this.params.receptions = recId
					this.params.remark = data.remark
					this.params.saleCategoryId = data.saleCategoryId
					this.params.sumPrice = data.sumPrice
				})
			},
			// 接单人
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=RECEPTION' + '&show=' + this.reception + '&num=1'
				})
			},
			// 删除商品
			delGoods(e){
				this.params.orderGoodsItemDtos.splice(e,1)
			},
			// 修改订单
			updataOrder(){
				let pages = getCurrentPages();
				let prvePage = pages[pages.length - 2]; //前一页	
				updateOrderIndividual(this.params).then(res=>{
					if(res.data.code === 200){
						prvePage.setData({
							isChange: true
						})
						$Message({
							content: '修改成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
							})
						},1000)
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
	input{
		border: 1rpx solid #DDDDDD;
		border-radius: 10rpx;
		padding: 0 10rpx;
	}
</style>
