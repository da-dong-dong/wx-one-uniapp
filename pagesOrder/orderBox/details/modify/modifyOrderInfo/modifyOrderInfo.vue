/***************************************** 开单信息修改 ************************************************/

<template>
	<view>
		<view class="bigBox">
			<!-- 订单编号 -->
			<view class="listBox">
				<view class="title">订单编号</view>
				<view class="text flex_all">{{openInfo.orderNo}}</view>
			</view>

			<!-- 订单门店 -->
			<view class="listBox">
				<view class="title">订单门店</view>
				<view class="text flex_all">{{shopIdMap.get(openInfo.orderShopId)}}</view>
			</view>

			<!-- 订单时间 -->
			<view class="listBox" :class="!fnPermissionShopId('STORE_DETAILS_ORDER_TIME')?'':'fn_back'">
				<view class="title">订单时间</view>
				<!-- <view class="textBox" @click="openCalendar">
					<view class="text">{{openInfo.orderTime | time}}</view>
					<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
				</view> -->
				<view class="flex_all">
					<picker mode="date" :value="openInfo.orderTime" @change="bindDateChange($event, openInfo)" :disabled="fnPermissionShopId('STORE_DETAILS_ORDER_TIME')">
						<view class="flex">
							<view class="uni-input">{{openInfo.orderTime ? openInfo.orderTime : '订单时间' | times}} </view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>

			<!-- 订单分类 -->
			<view class="listBox">
				<view class="title">订单分类</view>
				<modifyPicker class="picker flex_all" :changeId="openInfo.orderCategoryId" :categoryName="'get_orderTypeArr'" :getId.sync="openInfo.orderCategoryId"></modifyPicker>
			</view>

			<!-- 订单分组 -->
			<view class="listBox">
				<view class="title">订单分组</view>
				<modifyPicker class="picker flex_all" :changeId="openInfo.groupCategoryId" :categoryName="'get_orderGroup'" :getId.sync="openInfo.groupCategoryId"></modifyPicker>
			</view>

			<!-- 喜爱风格 -->
			<view class="listBox">
				<view class="title">喜爱风格</view>
				<view class="textBox flex_all" @click="openModal">
					<view class="text">{{showLike}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</view>

			<!-- 订单类型时间 -->
			<birthday 
				v-if="type === 'WEDDING_DRESS'"
				:title="'结婚日期'"
				:time="openInfo.typeTime" 
				:lunar="openInfo.typeLunar" 
				:getBTime.sync="openInfo.typeTime"
				:getBLunar.sync="openInfo.typeLunar"
				:showText.sync="showText"
			></birthday>
			<birthday
				v-if="type === 'PREGNANT'"
				:title="'预产日期'"
				:time="openInfo.typeTime" 
				:lunar="openInfo.typeLunar" 
				:getBTime.sync="openInfo.typeTime"
				:getBLunar.sync="openInfo.typeLunar"
				:showText.sync="showText"
			></birthday>

			<!-- 备注 -->
			<view class="textareaBox" :hidden="showText">
				<view class="title">订单备注</view>
				<textarea class="textarea" v-model="openInfo.remark" placeholder="请填写" />
			</view>
			
			<view @click="save" class="save">保存</view>
			
			<!-- 喜爱风格 -->
			<styleModal v-if="visibleStyle" @cancel="cancel" @ok="enLike" :enLike="showLike"></styleModal>
			
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
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import birthday from '../components/birthday.vue'
	import styleModal from '@/pagesOrder/openOrder/openInfo/module/components/info/styleModal.vue'
	import modifyPicker from '../components/modifyPicker.vue'
	import { mapGetters } from 'vuex'
	import { getOrderDetails, updataOrderInfo } from '@/util/api/shop.js'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
			])
		},
		components:{
			uniCalendar,
			styleModal,
			modifyPicker,
			birthday
		},
		data() {
			return {
				type:null,
				// 过滤门店
				shopIdMap: new Map(),  
				
				// 喜爱风格模态框开关
				visibleStyle:false,
				// 前端显示喜爱风格
				showLike:'请选择',
				showText:false,
				
				// 数据
				openInfo:{
					orderNo: null, // 订单号
					orderShopId: null, // 订单门店
					orderTime: null, // 订单时间
					orderId: null, // 订单ID
					orderCategoryId:null, // 订单分类
					groupCategoryId:null, // 订单分组
					likeStyle:null, // 喜爱风格
					typeLunar:null, // 是否农历
					typeStr:null, // 农历时间
					typeTime:null, // 新历时间
					remark:null, // 订单备注
				}
			};
		},
		onLoad(option){
			this.getOrderDetails(Number(option.id))
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
		},
		methods:{
			// 获得详情
			getOrderDetails(id){
				getOrderDetails({orderId: id}).then(res=>{
					let data = res.data.data
					this.type = data.type
					Object.assign(this.openInfo,res.data.data)
					if(this.openInfo.likeStyle){
						this.showLike = JSON.parse(this.openInfo.likeStyle).join('/')
					}
				})
			},
			// 打开日历
			openCalendar(){
				this.showText = true
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				this.openInfo.orderTime = Date.parse(new Date(e.fulldate))
			},
			close(e){
				this.showText = false
			},

			//时间
			bindDateChange (e, item) {
				item.orderTime = new Date(e.target.value).getTime()
			},

			// 打开喜爱风格模态框
			openModal(){
				this.visibleStyle = true
			},	
			// 确定风格
			enLike(e){
				if(e.length === 0){
					this.openInfo.likeStyle = null
					this.showLike = '请选择'
				}else{
					this.openInfo.likeStyle = JSON.stringify(e)
					this.showLike = e.join('/')
				}
				this.visibleStyle = false
			},	
			// 取消风格
			cancel(){
				this.visibleStyle = false
			},
			
			// 提交
			save(){
				updataOrderInfo(this.openInfo).then(res=>{
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
	}
</script>

<style lang="scss" scoped>
	.flex_all{
		width: 100%;
	}
	.flex{
		display: flex;
		justify-content: space-between;
	}
	.bigBox{
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #f9f9f9;
			.title{
				width: 270rpx;
			}
			.textBox{
				display: flex;   
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
		}
		.textareaBox{
			margin: 30rpx;
			font-size: 28rpx;
			.title{
				padding: 0 20rpx;
			}
			.textarea{
				margin-top: 20rpx;
				padding:20rpx;
				width: 650rpx;
				border-radius:10rpx;
				border: 1rpx solid #f9f9f9;
			}
		}
		.save{
			width:650rpx;
			height:80rpx;
			line-height:80rpx;
			color:#FFFFFF;
			background-color: #61A3FF;
			text-align: center;
			margin: 10rpx auto;
			border-radius: 40rpx;
		}
	}
	/deep/.imgMargin{
		margin: 40rpx 0 0 5rpx !important;
	}
</style>
