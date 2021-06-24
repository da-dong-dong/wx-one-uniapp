/********************** 保留金充值 *************************/
<template>
	<view>
		<view class="bigBox">
			<!-- 客户姓名 -->
			<view class="listBox">
				<view class="title">客户姓名</view>
				<view class="text">{{basic.name}}</view>
			</view>
			<!-- 手机号 -->
			<view class="listBox">
				<view class="title">手机号</view>
				<view class="text">{{basic.mobile}}</view>
			</view>
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view class="text">{{get_userInfo.anotherName}}</view>
			</view>
			<!-- 门店 -->
			<shopPicker :title="text+'门店'" :nowShop="params.shopId" :getId.sync="params.shopId"></shopPicker>
			
			<!-- 保留金充值 -->
			<view class="listBox">
				<view class="title">{{text}}金额</view>
				<input type="number" placeholder="请输入" v-model="params.money" style="width:100%"/>
			</view>
			
			<!-- 方式 -->
			<payPicker :title="text+'方式'" :getId.sync="params.payType" :nowPay="params.payType" :getName.sync="params.payTypeName"></payPicker>
			
			<!-- 记录类型 -->
			<view v-if="type === 'refund'" class="listBox">
				<view class="title">记录类型</view>
				<picker @change="change" :value="index" :range="arr" style="width:100%">
					<view class="textBox">
						<view class="text">{{arr[index]}}</view>
						<i-icon class="icon" type="enter" size="16" color="#80848f"/>
					</view>
				</picker>
			</view>
			
			<!-- 备注 -->
			<view class="remarkBox">
				<textarea :placeholder="text+'备注'" v-model="params.remark"/>
			</view>
			
			<view v-if="text== '收款'" class="button" @click="addRecord" :class="(!fnPermissionShopId('STORE_RETENTION_MONEY_RECHARGE'))?'':'fn_back'" >确定{{text}}</view>
			<view v-else class="button" @click="refundRecord" :class="( !fnPermissionShopId('STORE_RETENTION_MONEY_REFUND'))?'':'fn_back'" >确定{{text}}</view>
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import payPicker from '../../../components/payPicker.vue'
	import shopPicker from '../../../components/shopPicker.vue'
	import { addRetentionRecord,refundRetentionRecord } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default{
		props:['retentionId','basic','type'],
		components:{
			payPicker,
			shopPicker
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
		},
		data(){
			return{
				text:null,
				// 记录类型
				index:0,
				pickerTypeArr:[
					// {name:'退款',id:'REFUND'},
					{name:'订单退款',id:'ORDERREFILL'},
					// {name:'订单扣款',id:'ORDERREFUND'},
				],
				//arr:['退款','订单退款','订单扣款'],
				arr:['订单退款'],
				params:{
					createUser:null, //录入人
					evidence:null, //扣款凭证
					money:null, //金额
					payType:null, //支付方式
					payTypeName:null, //支付方式名称
					recordId:null, //收款记录ID
					remark:null, //备注
					retentionId:null, //保留金ID
					shopId:null, //门店ID
					type:null,
				},
			}
		},
		mounted(){
			if(this.type === 'topUp'){
				this.text = '收款'
				this.params.type = 'REFILL'
			}else{
				this.text = '退款'
				this.params.type = 'REFUND'
			}
			this.params.createUser = this.get_userInfo.userId
			this.params.shopId = this.shopId
			this.params.retentionId = Number(this.retentionId)
		},
		methods:{
			change(e){
				this.index = e.detail.value
				this.params.type = this.pickerTypeArr[this.index].id
			},
			// 记录类型返回
			// getTypeId(e){
			// 	this.params.type = e.id
			// },
			// 充值
			addRecord(){
				addRetentionRecord(this.params).then(res=>{
					if(res.data.code === 200){
						let pages = getCurrentPages();
						let prvePage = pages[pages.length - 2]; //前一页
						prvePage.setData({
							isChange: true
						})
						$Message({
							content: this.text + '成功',
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
			//退款
			refundRecord(){
				refundRetentionRecord(this.params).then(res=>{
					if(res.data.code === 200){
						let pages = getCurrentPages();
						let prvePage = pages[pages.length - 2]; //前一页
						prvePage.setData({
							isChange: true
						})
						$Message({
							content: this.text + '成功',
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
	.textBox{
		display: flex;
		width: 100%;
		justify-content: space-between;
		image{
			width: 15rpx;
			height: 15rpx;
			margin-top: 18rpx;
		}				
	}
</style>
