<template>
	<view>
		<view class="bigBox">
			<!-- 收款项目 -->
			<view class="listBox">
				<view class="title">收款项目</view>
				<view class="text">{{basic.name}}</view>
			</view>
			
			<!-- 收款人 -->
			<view class="listBox">
				<view class="title">收款人</view>
				<view class="text">{{get_userInfo.anotherName}}</view>
			</view>
			
			<!-- 接单人 -->
			<view class="listBox">
				<view class="title">接单人</view>
				<view class="text">{{basic.receptions[0].actorName}}</view>
			</view>
			
			<!-- 金额 -->
			<view class="money">
				<view class="sumPrice">
					<view class="title">应收金额：</view>
					<view class="text">{{basic.sumPrice}}</view>
				</view>
				<view class="incomePrice">
					<view class="title">已收金额</view>
					<view class="text">{{basic.incomePrice}}</view>
				</view>
				<view class="arrears">
					<view class="title">欠款</view>
					<view class="text">{{basic.sumPrice - basic.incomePrice}}</view>
				</view>
			</view>
			
			<!-- 支付金额 -->
			<view class="listBox">
				<view class="title">支付金额</view>
				<input class="flex_all" @input="money" @blur="moneyBlur" type="number" v-model="params.billEntryReceiptDtos[0].incomePrice" placeholder="请输入"/>
			</view>
			
			<!-- 支付方式 -->
			<payPicker :getId.sync="params.billEntryReceiptDtos[0].payCategoryId" :getName.sync="params.billEntryReceiptDtos[0].payName" :expandField.sync="params.billEntryReceiptDtos[0].expandField"></payPicker>
			
			<!-- 收款时间 -->
			<view class="listBox">
				<view class="title">收款时间</view>
				<view class="flex_all">
					<picker mode="date" :value="params.receiptTime" @change="bindDateChange($event, params)">
						<view class="flex">
							<view class="uni-input">{{params.receiptTime ? params.receiptTime : '时间' | times}} </view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			
			<!-- 收款凭证 -->
			<view class="listBox">
				<view class="title">收款凭证</view>
				<input class="flex_all" type="text" placeholder="收款凭证" v-model="params.billEntryReceiptDtos[0].credentials"/>
			</view>
			
			<!-- 收款备注 -->
			<view class="remarkBox">
				<textarea placeholder="收款备注:" v-model="params.remark" :hidden="showText"/>
			</view>
			
		</view>
		
		<view class="button" @click="en">确定收款</view>
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
		<cardModel v-if="showCar" :typeCar='true' :showCar.sync="showCar" :expandField.sync="params.billEntryReceiptDtos[0].expandField"/>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import cardModel from '@/pagesCashier/components/cardModel.vue'
	import { mapGetters } from 'vuex'
	import { updataReceipt } from '@/util/api/shop.js'
	export default {
		components:{
			uniCalendar,
			payPicker,
			cardModel
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
		},
		data() {
			return {
				showCar:false, // 选中储蓄卡后
				// 订单基本信息
				basic:null,
				changeNum:false,
				showText:false,
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
					receptions:[], //接单人	
					remark:null, //收款备注
					saleCategoryId:-1, //销售类别	
					shopId:null, //当前门店ID
				}
			};
		},
		onLoad(){
			let pages = getCurrentPages()
			let prvePages = pages[pages.length - 2]
			let basic = prvePages.data.basic
			this.basic = basic
		},
		mounted(){
			this.getParams()
		},
		methods:{
			// 赋值基本信息
			getParams(){
				// 业绩分配人
				this.basic.receptions.forEach((i)=>{
					let lis = {
						actorId:i.actorId,
						resultsRatio:1,
					}
					this.params.receptions.push(i.actorId)
					this.params.employeePerformances.push(lis)
				})
				// 录入订单ID
				this.params.entryId = this.basic.entryId
				// 消费项目
				this.params.name = this.basic.name
				// 收款门店
				this.params.receiptShopId = this.shopId
				// 收款日期
				this.params.receiptTime = Date.parse(new Date()) 
				// 收款人
				this.params.receiptUser = this.get_userInfo.userId
				// 赋值当前门店
				this.params.shopId = this.shopId
			},
			
			// 输入金额
			money(e){
				let arrears = Number(this.basic.sumPrice - this.basic.incomePrice)
				if(Number(e.detail.value) > arrears){
					this.changeNum = true
					$Message({
						content: '超过应付金额',
						type: 'warning'
					});
				}
			},
			moneyBlur(){
				let arrears = Number(this.basic.sumPrice - this.basic.incomePrice)
				if(this.changeNum){
					this.params.billEntryReceiptDtos[0].incomePrice = arrears
				}
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

			// 时间
			bindDateChange (e, item) {
				item.receiptTime = new Date(e.target.value).getTime()
			},
			
			// 收款
			en(){
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上上一个页面
				// 增加业绩金额
				this.params.employeePerformances[0].performanceMoney = this.params.billEntryReceiptDtos[0].incomePrice
				updataReceipt(this.params).then(res=>{
					if(res.data.code === 200){
						prevPage.setData({
							isChange: true
						})
						$Message({
							content: '收款成功',
							type: 'success',
							duration: 1
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
 @import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
 .flex_all{
	 width: 100%;
 }
 .flex{
	display: flex;
	justify-content: space-between;
}
</style>
