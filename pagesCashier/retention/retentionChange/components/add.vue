/********************** 保留金录入 *************************/
<template>
	<view>
		<view class="bigBox">		
			<!-- 保留金额 -->
			<view class="listBox">
				<view class="title">保留金额</view>
				<input type="text" v-model="params.money" placeholder="请输入" style="width:100%"/>
			</view>
			<!-- 收款方式 -->
			<payPicker :title="'收款方式'" :getId.sync="params.payType" :nowPay="params.payType" :getName.sync="params.payTypeName"></payPicker>
			<!-- 门店 -->
			<shopPicker :title="'收款门店'" :nowShop="params.shopId" :getId.sync="params.shopId"></shopPicker>
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view style="width:100%">{{get_userInfo.anotherName}}</view>
			</view>
			<!-- 收款备注 -->
			<view class="remarkBox">
				<textarea placeholder="收款备注:" v-model="params.remark"/>
			</view>
			
			<view class="button" @click="add">录入保留金</view>
			
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import payPicker from '../../../components/payPicker.vue'
	import shopPicker from '../../../components/shopPicker.vue'
	import { mapGetters } from 'vuex'
	import { addRetention } from '@/util/api/shop.js'
	import { getMainContact } from '@/util/api/common.js'
	export default{
		props:['retentionId'],
		components:{
			payPicker,
			shopPicker
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_pay'
			])
		},
		data(){
			return{
				params:{
					createUser:null, //录入人id
					customer:{}, //客户信息对象
					money:null, //金额
					payType:null, //支付方式
					payTypeName:null, //支付方式名称
					remark:null, //收款备注
					shopId:null, //门店ID
				},
			}
		},
		mounted(){
			// 录单人
			this.params.createUser = this.get_userInfo.userId
			this.params.shopId = this.shopId
			let jsonParams = JSON.parse(this.retentionId)
			this.params.customer = jsonParams
		},
		methods:{
			// 主联系人信息
			getMainContact(){
				getMainContact({customerId:this.retentionId}).then(res=>{
					if(res.data.code === 1000){
						this.mainContact = res.data.data
						let m = this.mainContact
						let data = {
							address: m.address,
							birthdayLunar: (m.birthdayLunar == 0) ? false : true,	//是否农历
							birthdayTime: Boolean(m.birthdayTime) ? Date.parse(new Date(m.birthdayTime)) : null,
							categoryJson:{
								city:m.city,
								country:m.country,
								province:m.province,
								region:m.region,
							},
							ccId:m.customerId,	//从客户ID
							customerId:m.customerId,	//主客户ID	
							email:m.email,
							mobile:m.phone,
							name:m.name,
							originJson:{
								cid:m.cid,
								cname:m.source.split('-')[0],
								sid:m.sid,
								sname:m.source.split('-')[1],
							},
							qq:m.qqNumber,
							sex:Boolean(m.sex === '男') ? true : false,	//性别
							tel:m.telphone,
							wechat:m.wxNumber
						}
						this.params.customer = data
						console.log('7777777777',this.params)
					}
				})
			},
			
			// 录入保留金
			add(){
				addRetention(this.params).then(res=>{
					if(res.data.code === 200){
						let pages = getCurrentPages();
						let prvePage = pages[pages.length - 2]; //前一页
						prvePage.setData({
							isChange: true
						})
						$Message({
							content: '录入成功',
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
</style>
