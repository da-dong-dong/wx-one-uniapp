/******************** 添加支出或修改支出 *********************/
<template>
	<view>
		<view class="bigBox">
			<!-- 支出项目 -->
			<spendingPicker showText="支出" :nowSpending="params.itemId" :getId.sync="params.itemId" :getName.sync="params.itemName" style="width:100%"></spendingPicker>
			<!-- 取款人 -->
			<view class="listBox">
				<list :title="'取款人'" :show="reception" @goAddress="goAddress" style="width:100%"></list>
			</view>
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view style="width:100%">{{anotherName}}</view>
			</view>
			<!-- 支出门店 -->
			<shopPicker :title="'支出门店'" :nowShop="params.expenditureShop" :getId.sync="params.expenditureShop"></shopPicker>
			<!-- 支付金额 -->
			<view class="listBox">
				<view class="title">支付金额</view>
				<input type="number" v-model="params.money" placeholder="请输入" style="width:100%"/>
			</view>
			<!-- 支付方式 -->
			<payPicker :nowPay="params.payCategoryId" :getId.sync="params.payCategoryId"></payPicker>
			<!-- 支付时间 -->
			<view class="listBox">
				<view class="title">支付时间</view>
				<view class="flex_all">
					<picker mode="date" :value="params.payTime" @change="bindDateChange($event, params)">
						<view class="flex">
							<view class="uni-input">{{params.payTime ? params.payTime : '时间' | times}} </view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			<!-- 订单备注 -->
			<view class="remarkBox">
				<textarea placeholder="订单备注:" v-model="params.remark" :hidden="showText"/>
			</view>
			<!-- 收据/合同 -->
			<view class="listBox">
				<view class="title">收据/合同</view>
				<view style="width:100%" @click="addImg">{{params.receipt?'重新上传':'上传'}}</view>
			</view>
			<!-- 图片展示 -->
			<view class="remarkBox"  >
				<view class="imgShow" >
					<view class="imgBg" v-if="params.receipt" :style="{backgroundImage:`url(http://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/${params.receipt})`}"></view>
					<view class="off" @click="imgDel" v-if="params.receipt">
						<i-icon type="delete_fill" size="26" color="#FF0000"/>
					</view>
				</view>
				
			</view>
			
			<view v-if="spendingDetail" class="button" @click="updata">修改店面支出</view>
			<view v-else class="button" @click="add">录入店面支出</view>
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
	import { mapGetters } from 'vuex'
	import { addExpenditure, updateExpenditure, deleteOne, uploadOne } from '@/util/api/shop.js'
	import spendingPicker from '@/pagesCashier/components/spendingPicker.vue'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import shopPicker from '@/pagesCashier/components/shopPicker.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		components:{
			uniCalendar,
			spendingPicker,
			shopPicker,
			payPicker,
			list,
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_ticket',
				'get_ccId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_spending',
			])
		},
		data() {
			return {
				// 是否为添加
				isAdd: false,
				// 详情
				spendingDetail:null,
				// 录单人
				anotherName:null,
				reception:'请选择',
				showText:false,
				params:{
					expenditureShop:null, //支出门店
					expenditureType:1, //1店面支出， 2财务支出
					itemId:null, //支出项目ID
					itemName:null, //项目名称
					money:null, //金额
					payCategoryId:null, //支付方式
					payTime:null, //支付时间
					receipt:null, //发票/收据/合同
					remark:null, //备注
					shopId:null, //录入门店
					withdrawUser:null, //取款人ID
				},
			};
		},
		onLoad(op){
			let title
			if(op.id){
				this.isAdd = false
				let pages = getCurrentPages()
				let prvePages = pages[pages.length - 2]
				let spendingDetail = prvePages.data.spendingDetail
				this.spendingDetail = spendingDetail
				title = '修改店面支出'
			}else{
				this.isAdd = true
				title = '录入店面支出'
			}
			uni.setNavigationBarTitle({
				title:title
			})		
		},
		onShow(){
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			let address = currPages.data.address
			if(address){
				this.reception = address.show
				this.params.withdrawUser = address.enArr[0].id
			}
		},
		mounted(){
			this.anotherName = this.get_userInfo.anotherName
			this.params.shopId = this.shopId
			this.params.expenditureShop = this.shopId
			this.params.payTime = Date.parse(new Date())
			if(this.spendingDetail){
				this.getParams()
			}
		},
		methods:{
			// 基本赋值
			getParams(){
				let data = this.spendingDetail
				// 支出门店
				this.params.expenditureShop = data.expenditureShop
				// 订单ID
				this.params.id = data.id
				// 支出项目ID
				this.params.itemId = data.itemId
				// 金额
				this.params.money = data.money
				// 支付方式
				this.params.payCategoryId = data.payCategoryId
				// 支付时间
				this.params.payTime = data.payTime
				// 凭证
				this.params.receipt = data.receipt
				// 备注
				this.params.remark = data.remark
				// 取款人
				this.params.withdrawUser = data.withdrawUser.actorId
				this.reception = data.withdrawUser.actorName
				// 录单人
				this.anotherName = data.createUser.actorName
				// 录入门店
				this.params.shopId = this.shopId
			},
			// 取款人
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=RECEPTION' + '&show=' + this.reception + '&num=1'
				})
			},
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
				this.showText = true
			},
			// 日历返回
			enSure(e){	
				this.params.payTime = Date.parse(new Date(e.fulldate))
			},
			close(){
				this.showText = false
			},

			//时间控件
			bindDateChange (e, item) {
				item.payTime = new Date(e.target.value).getTime()
			},
			
			// 跳转
			backPage(){
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
			},
			// 上传图片
			addImg(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album'], // 从相册选择
					success: res => {
						uni.uploadFile({
							url: uploadOne,		//post请求的地址
							filePath:res.tempFilePaths[0],
							name: 'files',	
							timeout: 15000,
							header:{
								"content-type": "multipart/form-data",
								"ticket": this.get_ticket,
								"CurrentShopId" : this.shopId,
								"ccId":this.get_ccId,
								"ossToken":"061FEB14A1E1929338E877AAD529F4AB"
							},
							formData: {
								enterpriseId: JSON.stringify(this.get_userInfo.enterpriseId), // 企业id
								shopId: JSON.stringify(this.shopId), // 门店ID
								resourceType: "ORDER", // 资源类型
							},
							success: (uploadFileRes) => {
								//这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
								let obj = JSON.parse(uploadFileRes.data);
								this.params.receipt = obj.data
								console.log(obj.data)
							},
							fail: (err) => {
								console.log('err',err)
							}
						})
					}
				});
			},
			// 删除图片
			imgDel(){
				let pars = {
					fileName: this.params.receipt
				}
				deleteOne(pars).then(res=>{
					console.log(res.data.code)
					if(res.data.code == 200){
						this.params.receipt = ''
					}	
				})
			},
			// 添加
			add(){
				addExpenditure(this.params).then(res=>{
					if(res.data.code === 200){
						this.backPage()
					}
				})
			},
			// 修改
			updata(){
				updateExpenditure(this.params).then(res=>{
					if(res.data.code === 200){
						this.backPage()
					}
				})
			},
		}
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
	.imgShow{
		padding: 20rpx;
    	margin: 30rpx;
		width: 650rpx;
		height: 200rpx;
		border: 1px solid #dcdee2;
		position: relative;
		.imgBg{
			width: 650rpx;
			height: 200rpx;
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
		}
		// 定位按钮
		.off{
			position: absolute;
			right: 0;
			top: 0;
		}
	}
</style>
