<template>
	<view>
		<view class="bigBox">
			<!-- 收入项目 -->
			<view class="listBox">
				<view class="title">收入项目</view>
				<input style="width:100%" type="text" v-model="params.name" placeholder="请输入" />
			</view>
			<!-- 付款人 -->
			<view class="listBox">
				<view class="title">付款人</view>
				<input style="width:100%"  type="text" v-model="params.payer" placeholder="请输入" />
			</view>
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view style="width:100%">{{get_userInfo.anotherName}}</view>
			</view>
			<!-- 收入金额 -->
			<view class="listBox">
				<view class="title">收入金额</view>
				<input type="number" v-model="params.money" placeholder="请输入" style="width:100%"/>
			</view>
			<!-- 收入方式 -->
			<payPicker :title="'收入方式'" :getId.sync="params.payType" :getName.sync="params.typeName"></payPicker>
			<!-- 收入时间 -->
			<view class="listBox">
				<view class="title">收入时间</view>
				<view class="flex_all">
					<picker mode="date" :value="params.receiptTime" @change="bindDateChange($event, params)">
						<view class="flex">
							<view class="uni-input">{{params.receiptTime ? params.receiptTime : '时间' | times}} </view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			<!-- 订单备注 -->
			<view class="remarkBox">
				<textarea placeholder="订单备注:" v-model="params.remark" :hidden="showText"/>
			</view>
			
			<view class="button" @click="add">录入其他收入</view>
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
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { addOtherReceiptList } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		components:{
			uniCalendar,
			payPicker,
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
		},
		data() {
			return {
				reception:'请选择',
				showText:false,
				params:{
					money:null, //金额
					name:null, //项目名称	
					payType:null, //进账方式		
					payer:null, //付款人	
					receiptTime:null, //收入时间
					remark:null, //项目备注	
					shopId:null, //门店ID
					typeName:null, //进账方式名称
				},
			};
		},
		mounted(){
			this.params.shopId = this.shopId
			this.params.receiptTime = Date.parse(new Date())
		},
		methods:{	
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

			//时间控件
			bindDateChange (e, item) {
				item.receiptTime = new Date(e.target.value).getTime()
			},
			
			add(){
				addOtherReceiptList(this.params).then(res=>{
					if(res.data.code === 200){
						let pages = getCurrentPages();
						let prvePage = pages[pages.length - 2]; //前一页
						prvePage.setData({
							isChange: true
						})
						$Message({
							content: '新增成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
							})
						},1000)
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
	.flex{
		display: flex;
		justify-content: space-between;
	}
	.flex_all{
		width: 100%;
	}
</style>
