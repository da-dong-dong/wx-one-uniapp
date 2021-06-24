<template>
	<view>
		<view class="bigBox">
			<!-- 客户名称 -->
			<view class="listBox">
				<view class="title">客户名称</view>
				<view class="text">{{mainContact.name?mainContact.name:''}}</view>
			</view>
			
			<!-- 客户电话 -->
			<view class="listBox">
				<view class="title">客户电话</view>
				<view class="text">{{mainContact.mobile?mainContact.mobile:''}}</view>
			</view>
			
			<!-- 客户微信 -->
			<view class="listBox">
				<view class="title">客户微信</view>
				<view class="text">{{mainContact.wechat?mainContact.wechat:''}}</view>
			</view>
			
			<!-- 项目名字 -->
			<view class="listBox">
				<view class="title">项目名字</view>
				<input type="text" v-model="params.name" placeholder="请输入"  style="width:100%"/>
			</view>
			
			<!-- 消费类别 -->
			<consumePicker :getId.sync="params.saleCategoryId"></consumePicker>
			
			<!-- 订单金额 -->
			<view class="listBox">
				<view class="title">订单金额</view>
				<input type="number" v-model="params.sumPrice" placeholder="请输入"  style="width:100%"/>
			</view>
			
			<!-- 订单日期 -->
			<view class="listBox">
				<view class="title">订单日期</view>
				<view class="text" @click="openCalendar">
					<view>{{params.orderTime | time}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</view>
			
			<!-- 接单人 -->
			<view class="listBox">
				<list :title="'接单人'" :show="reception" :type="'RECEPTION'" @goAddress="goAddress"  style="width:100%"></list>
			</view>
			
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view style="width:100%">{{get_userInfo.anotherName}}</view>
			</view>
			
			<!-- 订单备注 -->
			<view class="remarkBox">
				<textarea placeholder="订单备注:" v-model="params.remark"/>
			</view>
		
			<goodsBox :info="params.orderGoodsItemDtos" @del="delGoods"></goodsBox>
			
			<view class="button" @click="addOrder">新增订单</view>
			
		</view>
		
		<i-message id="message" />
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	import { addOrderIndividual } from '@/util/api/shop.js'
	import { getMainContact } from '@/util/api/common.js'
	import goodsBox from './components/goodsBox.vue'
	import consumePicker from '@/pagesCashier/components/consumePicker.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	export default {
		components:{
			consumePicker,
			list,
			uniCalendar,
			goodsBox
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				// 消费类别
				'get_consumeType',
			]),
		},
		data() {
			return {
				reception:'请选择',
				pickerConsumeArr:[],
				mainContact:null,
				params:{
					name:null, //项目名称
					orderGoodsItemDtos:[]	,//商品数组
					orderTime:null, //订单时间
					receptions:null, //接单人ID
					remark:null, //备注
					saleCategoryId:null, //消费类别
					shopId:null, //门店ID
					sumPrice:null, //总价格
				}
			};
		},
		onLoad(op){
			//this.getMainContact(op.id)
			
			let jsonParams = JSON.parse(op.id)
			if(jsonParams.id){
				this.params.customerContactUpdateDto = jsonParams
			}else{
				this.params.customerContactAddDto = jsonParams
			}
			// 展示
			this.mainContact = jsonParams
			// 赋值
			console.log(this.params)
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
		mounted(){
			// 赋值当前时间
			this.params.orderTime = Date.parse(new Date())
			// 赋值当前门店
			this.params.shopId = this.shopId
		},
		methods:{
			// 主联系人信息
			getMainContact(id){
				getMainContact({customerId:id}).then(res=>{
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
							mobile:m.phone?m.phone:null,
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
						this.params.customerContactAddDto = data
					}
				})
			},
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历返回
			enSure(e){	
				this.params.orderTime = Date.parse(new Date(e.fulldate))
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
			// 新增订单
			addOrder(){
				let pages = getCurrentPages();
				let prvePage = pages[pages.length - 2]; //前一页	
				addOrderIndividual(this.params).then(res=>{
					if(res.data.code === 200){
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
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>
