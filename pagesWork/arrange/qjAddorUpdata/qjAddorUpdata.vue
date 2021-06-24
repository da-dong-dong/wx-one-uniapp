<template>
	<view>
		<view class="bigBox">
			<!-- 标题 -->
			<view class="titleBox">
				<view class="left">
					<view>{{itemNo}}</view>
					<view>{{name}}</view>
				</view>
			</view>
			
			<!-- 预约门店 -->
			<shopModule
			 :shopId="params.orderItemProcessReservation.reservationShopId" 
				@getId="getShopId" 
			></shopModule>
			
			<!-- 预约日期 -->
			<dateModule
				:getType="'qj'"
				:reservationDate="params.orderItemProcessReservation.reservationDate"
				:shopId="params.orderItemProcessReservation.reservationShopId"
			></dateModule>
			
			<!-- 档期分组 -->
			<scheduleModule
				:type="type" 
				:getType="'qj'"
				:date="params.orderItemProcessReservation.reservationDate" 
				:shopId="params.orderItemProcessReservation.reservationShopId" 
				:typographyTypeId="params.orderItemProcessReservation.typographyTypeId"
				:getId.sync="params.orderItemProcessReservation.typographyTypeId"
				:gapFlag="gapFlag"
			></scheduleModule>
			
			<!-- 预约时间 -->
			<timeModule
				:getType="'qj'"
				:date="params.orderItemProcessReservation.reservationDate" 
				:shopId="params.orderItemProcessReservation.reservationShopId" 
				:typography="params.orderItemProcessReservation.typographyTypeId" 
				:time="params.orderItemProcessReservation.reservationTime" 
				@getTime="getTime"
			></timeModule>
			
			<!-- 预约标签 -->
			<labelModule
				:labelId="params.labelCategoryId" 
				:getId.sync="params.labelCategoryId"
			></labelModule>
			
			<!-- 取件师 -->
			<list
				:title="'取件师'" 
				:show="showPICKUPGRAPHER" 
				:type="'PICKUPGRAPHER'"
				@goAddress="goAddress"
			></list>
			
			<!-- 取件商品 -->
			<pickupGoods
				:ids="params.reservationPickupDataJson"
				@goGetGoods="goGetGoods"
			></pickupGoods>
			
			<!-- 通知状态 -->
			<noticeModule 
				:notice="params.noticeStatus" 
				:getId.sync="params.noticeStatus"
			></noticeModule>
			
			<!-- 预约备注 -->
			<textarea v-model="params.remark" placeholder="预约备注"></textarea>
			
			<view class="button" @click="button">{{buttonText}}</view>
			
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	import shopModule from '../components/shopModule.vue'
	import dateModule from '../components/dateModule.vue'
	import scheduleModule from '../components/scheduleModule.vue'
	import timeModule from '../components/timeModule.vue'
	import labelModule from '../components/labelModule.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	import noticeModule from '../components/noticeModule.vue'
	import pickupGoods from'../components/pickupGoods.vue'
	import { addPickupInfo, getPickupDetail, updataPickupInfo } from '@/util/api/shop.js'
	export default {
		components:{
			shopModule,
			dateModule,
			scheduleModule,
			timeModule,
			labelModule,
			list,
			noticeModule,
			pickupGoods
		},
		computed:{
			...mapGetters('app',[
				'shopId' 
			]),
		},
		data() {
			return {
				/************** 上页面传值 *************/
				// 子订单号
				itemNo:null,
				// 子订单名
				name:null,
				// 订单类型
				type:null,
				// 子订单ID
				itemId:null,
				
				// 时间在不在范围内
				isTime:null,
				
				// 修改 用来对比数据是否修改
				contrast:{},
				
				// showGoods:'请选择',
				
				// 按键名字
				buttonText:null,
				
				// 取件师
				showPICKUPGRAPHER:'请选择',
				
				params:{
					itemId:null,	//子订单ID
					labelCategoryId:null,	//标签类别
					noticeStatus:true, //通知状态
					orderItemProcessReservation:{	//预约信息
						reservationDate:null,	//预约时间
						reservationShopId:null,	//预约门店ID
						reservationTime:null,	//预约日期
						typographyTypeId:null,	//模板ID
					},
					pickupgraphers:null,	//取件师
					remark:null,	//备注
					reservationPickupDataJson:null,	//预约取件数据	
					shopId:null,	//操作门店
				},
				// 传参是否携带值
				gapFlag:true, //
			};
		},
		onLoad(op){
			let pages = getCurrentPages()
			let prvePage = pages[pages.length - 2]
			let option = prvePage.data.options
			
			this.itemId = Number(option.itemId)
			this.itemNo = option.itemNo
			this.name = option.name
			this.type = option.type
			console.log('预约信息:',op,option)
			if(op.typographyTypeId != undefined && op.typographyTypeId != "undefined"){
				// 赋值预约信息
				this.isTime = true
				this.params.orderItemProcessReservation={
					reservationDate:Number(op.reservationDate),	//预约日期
					reservationShopId:Number(op.reservationShopId),	//预约门店ID
					reservationTime:op.reservationTime, //预约时间
					typographyTypeId:Number(op.typographyTypeId) , //模板ID
				}
				this.gapFlag=false;
				console.log('我存在哦')
			}
			if(op.id){
				this.getPickupDetail(op.id)
				uni.setNavigationBarTitle({
					title:'修改取件预约'
				})
				this.buttonText = '修改取件预约'
			}else{
				this.params.itemId = Number(option.itemId)
				uni.setNavigationBarTitle({
					title:'新增取件预约'
				})
				this.buttonText = '保存取件预约'
			}
		},
		onShow(){
			let pages = getCurrentPages()
			let currPage = pages[pages.length - 1]
			let date = currPage.data.date
			let address = currPage.data.address
			let pickupGoods = currPage.data.pickupGoods
			if(date){
				this.params.orderItemProcessReservation.reservationDate = date.date
			}
			if(address){
				let show = `show${address.type}`
				let arr = []
				address.enArr.forEach((i)=>{
					arr.push(i.id)
				})
				this[show] = address.show
				this.params.pickupgraphers = arr
			}
			if(pickupGoods){
				let arr = pickupGoods.arr
				if(arr.length > 0){
					this.params.reservationPickupDataJson = arr.map(Number)
					// this.showGoods = pickupGoods.show
				}else{
					this.params.reservationPickupDataJson = null
					// this.showGoods = '请选择'
				}
			}
		},
		mounted(){
			// 赋值当前门店ID
			this.params.shopId = this.shopId
			// 如果不为修改预约拍照 则赋值预约门店
			if(!this.params.id){
				// 如果是预约参数
				if(this.gapFlag){
					this.params.orderItemProcessReservation.reservationShopId = this.shopId
				}
			}
		},
		methods:{
			showName(arr,show){
				let newArr = []
				arr.forEach((i)=>{
					newArr.push(i.actorName)
				})
				if(newArr.length > 0){
					this[show] = newArr.join('/')
				}
			},
			// 获得详情
			getPickupDetail(id){
				getPickupDetail({id:id}).then(res=>{
					this.isTime = true
					this.contrast = JSON.parse(JSON.stringify(res.data.data.orderItemProcessReservation))
					this.params = res.data.data
					this.showName(res.data.data.pickupgraphers,'showPICKUPGRAPHER')
					this.params.pickupgraphers = null
				})
			},
			
			// 获得门店ID
			getShopId(e){
				this.params.orderItemProcessReservation.reservationShopId = e
				this.params.orderItemProcessReservation.reservationDate = null
				this.params.orderItemProcessReservation.typographyTypeId = null
				this.params.orderItemProcessReservation.reservationTime = null
			},
			// 获得预约时间
			getTime(e){
				this.isTime = e.bool
				if(!e.bool){
					$Message({
						content: '预约时间不在档期模板时间内',
						type: 'warning'
					});
				}else{
					this.params.orderItemProcessReservation.reservationTime = e.time
				}
			},
			// 获取看版师
			goAddress(type){
				let show = `show${type}`
				uni.navigateTo({
					url:'/pages/address/address?type=' + type + '&show=' + this[show]
				})
			},
			// 选择取件商品
			goGetGoods(){
				let idArr = this.params.reservationPickupDataJson
				let ids
				if(idArr){
					ids = idArr.join()
				}else{
					ids = ''
				}
				uni.navigateTo({
					url:'./getGoods/getGoods?itemId=' + this.itemId + '&ids=' + ids
				})
			},
			// 更新
			updataPickupInfo(params){
				updataPickupInfo(params).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: '修改成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				})
			},
			// 新增
			addPickupInfo(){
				addPickupInfo(this.params).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: '保存成功',
							type: 'success'
						});
						setTimeout(()=>{
							if(!this.gapFlag){
								uni.reLaunch({
									url:'/pages/calendar/calendar?type=qj&check=true&id=' + this.shopId
								})
							}else{
								uni.navigateBack({
									delta:1
								})
							}
						},1000)
					}
				})
			},
		
			button(){
				if(this.params.orderItemProcessReservation.reservationDate === null){
					$Message({
							content: '预约日期不能为空',
							type: 'warning'
					});
				}else if(this.params.orderItemProcessReservation.reservationTime === null){
					$Message({
							content: '预约时间不能为空',
							type: 'warning'
					});
				}else if(!this.isTime){
					$Message({
							content: '预约时间不在档期模板时间内',
							type: 'warning'
					});
				}else if(this.params.reservationPickupDataJson === null){
					$Message({
							content: '取件商品不能为空',
							type: 'warning'
					});
				}else{
					if(this.params.id){
						let newParams = JSON.parse(JSON.stringify(this.params))
						let contrast = this.contrast
						let originally = this.params.orderItemProcessReservation
						if(contrast.controlType === originally.controlType &&
							 contrast.groupTypeCategoryId === originally.groupTypeCategoryId &&
							 contrast.isOnline === originally.isOnline &&
							 contrast.reservationDate === originally.reservationDate && 
							 contrast.reservationShopId === originally.reservationShopId &&
							 contrast.reservationTime === originally.reservationTime
						){
							// 如果都为true 则预约日期没修改
							newParams.orderItemProcessReservation = null
						}else{
							// 如果其中一个为false 则重新赋值预约日期
							let newO = {
								reservationDate: originally.reservationDate,
								reservationShopId: originally.reservationShopId,
								reservationTime: originally.reservationTime,
								typographyTypeId: originally.typographyTypeId
							}
							newParams.orderItemProcessReservation = newO
						}
						this.updataPickupInfo(newParams)
					}else{
						this.addPickupInfo()
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../components/component.scss';
</style>
