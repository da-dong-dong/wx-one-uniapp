/*****************  开单信息模块  *****************/
<template>
	<view>
		<view class="box">
			<view class="titleTop">开单信息</view>
			<!-- 订单号 -->
			<orderNo :autoOrderNo="params.autoOrderNo" :autoOrder.sync="params.autoOrderNo" :getOrderNo.sync="params.orderNo"></orderNo>
			<!-- 门店 -->
			<shop :shopId.sync="params.orderShopId"></shop>
			<!-- 时间 -->
			<orderTime :params="params" @open="openCalendar"></orderTime>
			<!-- 接单 -->
			<peception :addressInfo="addressInfo" :peception.sync="params.receptions" :peceptionName="peceptionName"></peception>
			<!-- 客服 -->
			<service :addressInfo="addressInfo" :service.sync="params.services"></service>
			<!-- 网销 -->
			<networkSales :addressInfo="addressInfo" :network.sync="params.networkSales"></networkSales>
			<!-- 分类 -->
			<openInfoPicker :title="'分类'" :categoryName="'get_orderTypeArr'" :getId.sync="params.orderCategoryId"></openInfoPicker>
			<!-- 分组 -->
			<openInfoPicker :title="'分组'" :categoryName="'get_orderGroup'" :getId.sync="params.groupCategoryId"></openInfoPicker>
			<!-- 风格 -->
			<likeStyle :likeStyle="showLike" @open="openLikeStyle"></likeStyle>
			<!-- 备注 -->
			<view class="remark">
				<view class="title">备注</view>
				<textarea class="textartea" placeholder="订单备注" v-model="params.remark" :hidden="showText"></textarea>
			</view>
		</view>
		
		<!-- 喜爱风格 -->
		<styleModal v-if="showLikeModal" @cancel="cancel" @ok="enLike" :enLike="showLike"></styleModal>
		
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
	import { mapGetters } from 'vuex'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import orderNo from './components/info/orderNo.vue'
	import shop from './components/info/shop.vue'
	import orderTime from './components/info/orderTime.vue'
	import peception from './components/info/peception.vue'
	import networkSales from './components/info/networkSales.vue'
	import service from './components/info/service.vue'	
	import openInfoPicker from './components/openInfoPicker.vue'
	import likeStyle from './components/info/likeStyle.vue'
	import styleModal from './components/info/styleModal.vue'
	export default{
		props:['addressInfo'],
		components:{
			uniCalendar,
			orderNo,
			shop,
			orderTime,
			peception,
			networkSales,
			service,	
			openInfoPicker,
			likeStyle,
			styleModal,
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			])
		},
		data(){
			return{
				// 风格模态框显示
				showLikeModal:false,
				// 风格显示
				showLike:'喜爱风格',
				showText:false,
				params:{
					// 自动生成时间
					autoOrderTime:false,
					// 订单号
					orderNo:null,
					// 是否自动获取订单
					autoOrderNo:true,
					// 门店ID
					orderShopId:null,
					// 订单时间
					orderTime:null,
					// 接单人
					receptions:null,
					// 专服人员
					services:null,
					// 网销人员
					networkSales:null,
					// 分类
					orderCategoryId:null,
					// 分组
					groupCategoryId:null,
					// 喜爱风格
					likeStyle:null,
					// 备注
					remark:null,
				},
				//展示默认接单人
				peceptionName:null
			}
		},
		mounted(){
			// 赋值当前门店
			this.params.orderShopId = this.shopId
			
			// 时间
			this.params.orderTime = new Date().getTime()
			
			
			//当前接单人
			this.params.receptions = [{
				actorId : this.get_userInfo.userId,
				main : true
			}]
			//展示默认接单人
			this.peceptionName = this.get_userInfo.anotherName
				
		},
		methods:{
			// 打开日历
			openCalendar(date){
				this.params.orderTime = new Date(date).getTime()
				// this.$refs.calendar.open()
				// this.showText = true
			},
			// 日历选中确定返回值
			enSure(e){
				this.params.orderTime = new Date(e.fulldate).getTime()
			},
			close(){
				this.showText = false
			},
			// 打开喜爱模态框
			openLikeStyle(){
				this.showLikeModal = true
			},
			// 获取已选风格
			enLike(e){
				if(e.length === 0){
					this.params.likeStyle = null
					this.showLike = '喜爱风格'
				}else{
					this.params.likeStyle = JSON.stringify(e)
					this.showLike = e.join('/')
				}
				this.showLikeModal = false
			},
			// 关闭模态框
			cancel(){
				this.showLikeModal = false
			},
		
			// 保存订单
			save(){
				
				return this.params
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './components/moduleStyle.scss';
</style>
