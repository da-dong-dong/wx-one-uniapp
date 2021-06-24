<template>
	<view>
		<view class="bigBox">
			<!-- 收款门店 -->
			<view class="listBox">
				<view class="title">收款门店</view>
				<view class="text">{{shopIdMap.get(params.receiptShopId)}}</view>
			</view>
			
			<!-- 收款人 -->
			<view class="listBox">
				<view class="title">{{text === "收款"?"收款人":"项目退款人"}}</view>
				<view class="text">{{get_userInfo.anotherName}}</view>
			</view>
			
			<!-- 接单人 -->
			<view class="listBox">
				<view class="title">接单人</view>
				<view class="text">{{actor}}</view>
			</view>
			
			<!-- 收款项目 -->
			<receiptPicker :getId.sync="params.name" :text="text"></receiptPicker>
			
			<!-- 收款时间 -->
			<view class="listBox">
				<view class="title">{{text === "收款"?"收款时间":"退款时间"}}</view>
				<!-- <view class="text" @click="openCalendar">
					<view>{{params.receiptTime | time}}</view>
					<image class="my-img" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
				</view> -->
				<picker mode="date" :value="params.receiptTime" @change="bindDateChange($event, params)" style="width:100%">
					<view class="text">
						<view>{{params.receiptTime | time}}</view>
						<i-icon class="icon" type="enter" size="16" color="#80848f"/>
					</view>
				</picker>
			</view>
			
			<!-- 支付方式 -->
			<payPicker :getId.sync="params.billEntryReceiptDtos[0].payCategoryId" :getName.sync="params.billEntryReceiptDtos[0].payName" :expandField.sync="params.billEntryReceiptDtos[0].expandField"></payPicker>
			
			<!-- 金额 -->
			<view class="money">
				<view class="sumPrice">
					<view class="title">应收金额：</view>
					<view class="text">{{sumPrice}}</view>
				</view>
				<view class="incomePrice">
					<view class="title">已收金额</view>
					<view class="text">{{incomePrice}}</view>
				</view>
				<view class="arrears">
					<view class="title">欠款</view>
					<view class="text">{{arrears}}</view>
				</view>
				<view class="refundPrice">
					<view class="title">已退款</view>
					<view class="text">{{refundPrice}}</view>
				</view>
			</view>
			
			<!-- 支付金额 -->
			<view class="listBox">
				<view class="title">支付金额</view>
				<input @input="money" @blur="moneyBlur" type="number" v-model="params.billEntryReceiptDtos[0].incomePrice" placeholder="请输入" style="width:100%"/>
			</view>
			
			<!-- 收款凭证 -->
			<view class="listBox">
				<view class="title">收款凭证</view>
				<input type="text" placeholder="收款凭证" v-model="params.billEntryReceiptDtos[0].credentials" style="width:100%"/>
			</view>
			
			<!-- 收款备注 -->
			<view class="remarkBox">
				<textarea placeholder="收款备注:" v-model="params.remark" :hidden="showText"/>
			</view>

			<view class="button" :class="(!fnPermissionShopId('STORE_FINANCIAL_RECEIPT_REFUND') || text === '收款')?'':'fn_back'" @click="en">确定{{text}}</view>
			
		</view>
		
		<i-message id="message" />
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			@close="close"
			ref="calendar"
		/>
		<!-- 储蓄卡弹窗 -->
		<cardModel v-if="showCar" :typeCar="text === '收款'?true:false" :showCar.sync="showCar" :expandField.sync="params.billEntryReceiptDtos[0].expandField"/>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import receiptPicker from '@/pagesCashier/components/receiptPicker.vue'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import cardModel from '@/pagesCashier/components/cardModel.vue'
	import { mapGetters } from 'vuex'
	import { updataReceipt, refund } from '@/util/api/shop.js'
	export default {
		components:{
			receiptPicker,
			payPicker,
			uniCalendar,
			cardModel
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_shopAllArr'
			]),
		},
		data() {
			return {
				showCar:false, // 选中储蓄卡后
				// 基本信息
				basic:[],
				
				text:null,
				showText:false,
				shopIdMap: new Map(),
				
				// 接单人
				actor:null,
				
				// 需付
				sumPrice:null,
				// 已付
				incomePrice:null,
				// 欠款
				arrears:null,
				// 退款
				refundPrice:null,
				
				// 不合法数字是否改变
				changeNum:false,
				
				params:{
					billEntryReceiptDtos:[
						{
							credentials:null,	//收款凭证
							expandField:null,	//扩展字段
							incomePrice:null,	//收款金额
							payCategoryId:null,	//支付方式类别
							payName:null,	//支付方式名称
						}
					],	//支付方式	
					employeePerformances:[],	//业绩分配人员
					entryId:null, //录入订单ID
					name:null, //消费项目	
					receiptShopId:null, //收款门店	
					receiptTime:null, //收款日期	
					receiptUser:null, //收款人	
					receptions:null, //接单人	
					remark:null, //收款备注
					saleCategoryId:-1, //销售类别	
					shopId:null, //当前门店ID
				}
			}
		},
		onLoad(op){
			let pages = getCurrentPages();
			let prvePage = pages[pages.length - 2]; //上个页面
			this.basic = prvePage.data.basic
			this.sumPrice = prvePage.data.money.sumPrice
			this.incomePrice = prvePage.data.money.incomePrice
			this.refundPrice = prvePage.data.money.refundPrice
			this.arrears = this.sumPrice - this.incomePrice
			// 录入订单ID
			this.params.entryId = Number(op.id)
			
			if(op.type === 'collection'){
				this.text = '收款'
				//赋值退款全部
				this.params.billEntryReceiptDtos[0].incomePrice = this.arrears
			}else{
				this.text = '退款'
				//赋值退款全部
				this.params.billEntryReceiptDtos[0].incomePrice = prvePage.data.money.incomePrice
			}
			uni.setNavigationBarTitle({
				title: '前期' + this.text
			})
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.getParams()
		},
		methods: {
			// 基本赋值
			getParams(){
				// 收款门店
				this.params.shopId = this.shopId
				this.params.receiptShopId = this.shopId
				this.params.receiptUser = this.get_userInfo.userId
				// 接单人
				let receptions = []
				let name = []
				let employeePerformances = []
				this.basic.orderActorVos.forEach((i)=>{
					receptions.push(i.actorId)
					name.push(i.actorName)
					let arr = {
						actorId:i.actorId,
						resultsRatio:1,
					}
					employeePerformances.push(arr)
				})
				
				this.actor = name
				this.params.receptions = receptions
				this.params.employeePerformances = employeePerformances
				// 当前时间戳
				this.params.receiptTime = Date.parse(new Date())
			},
		
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
				this.showText = true
			},
			// 日历返回
			enSure(e){	
				this.params.receiptTime = Date.parse(new Date(e.fulldate))
			},
			close(){
				this.showText = false
			},

			/*
			 * 修改时间控件 
			 *
			*/
			bindDateChange(e){
				this.params.receiptTime = Date.parse(new Date(e.target.value))
			},
			
			// 输入金额
			money(e){
				if(this.text == '收款'){
					if(Number(e.detail.value) > Number(this.arrears)){
						this.changeNum = true
						$Message({
							content: '超过应付金额',
							type: 'warning'
						});
					}
				}else{
					if(Number(e.detail.value) > (Number(this.incomePrice) + Number(this.refundPrice))){
						this.changeNum = true
						$Message({
							content: '超过已付金额',
							type: 'warning'
						});
					}
				}
			},
			moneyBlur(){
				if(this.changeNum){
					if(this.text == '收款'){
						this.params.billEntryReceiptDtos[0].incomePrice = Number(this.arrears)
					}else{
						this.params.billEntryReceiptDtos[0].incomePrice = Number(this.incomePrice) + Number(this.refundPrice)
					}
				}
				this.changeNum = false
			},
			
			// 返回
			back(data){
				let pages = getCurrentPages();
				let pPrevPage = pages[pages.length - 3]; //上上一个页面
				pPrevPage.setData({
					isChange: true
				})
				$Message({
					content: data + '成功',
					type: 'success',
					duration: 1
				});
				setTimeout(()=>{
					uni.navigateBack({
						delta:1,
					})
				},1000)
			},
			
			// 收款
			updataReceipt(){
				// 增加业绩金额
				this.params.employeePerformances[0].performanceMoney = this.params.billEntryReceiptDtos[0].incomePrice
				updataReceipt(this.params).then(res=>{
					if(res.data.code===200){
						this.back('收款')
					}
				})
			},
			
			// 退款
			refund(){
				// 增加业绩金额
				this.params.employeePerformances[0].performanceMoney = this.params.billEntryReceiptDtos[0].incomePrice
				refund(this.params).then(res=>{
					if(res.data.code===200){
						this.back('退款')
					}
				})
			},
			// 提交
			en(){
				if(this.text === '收款'){
					this.updataReceipt()
				}else{
					this.refund()
				}
			},	
		},
		watch:{

			// 监听是否选中储蓄卡
			params: {
				handler(newVal) {
					let data = newVal.billEntryReceiptDtos[0];
					if(data.payName == "储值卡扣款" && !data.expandField){
						this.showCar = true
					}
				},
				deep: true
			}

		}
	}
</script>

<style lang="scss">
	@import '../components/updataPriceStyle.scss';
</style>
