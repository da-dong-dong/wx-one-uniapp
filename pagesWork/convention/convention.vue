/*********************************  拍照 选片 看板 取件 预约  ***************************************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">		
				<searchModul ref="searchModul" @search="search"></searchModul>			
				<view class="listBox" v-for="(item,index) in list" :key="item.orderNo">				
					<detailMoudel :info="item"></detailMoudel>			
					<view class="butBox" v-for="(lis, index) in item.orderItemBasisVos" :key="lis.itemId">
						<view class="textBox">
							<view class="text">{{lis.itemNo}} {{lis.name}}</view>
							<view class="text" v-if="type === 'xyyy'">男士/女士：{{lis.bookCount}}/{{lis.bottomCount}} {{lis.photoStatus|processStatus0}}</view>
							<view class="text" v-if="type === 'pzyy'">入册/入底：{{lis.bookCount}}/{{lis.bottomCount}} {{lis.photoStatus|processStatus}}</view>
							<view class="text" v-if="type === 'xpyy'">入册/入底：{{lis.bookCount}}/{{lis.bottomCount}} {{lis.photoStatus|processStatus1}}</view>
							<view class="text" v-if="type === 'kbyy'">入册/入底：{{lis.bookCount}}/{{lis.bottomCount}} {{lis.photoStatus|processStatus1}}</view>
							<view class="text" v-if="type === 'qjyy'">入册/入底：{{lis.bookCount}}/{{lis.bottomCount}} {{lis.photoStatus|processStatus2}}</view>
						</view>
						
						<view class="arrange" v-if="type === 'xyyy'" @click="xy(item.orderNo,index)">安排选衣</view>
						<view class="arrange" :class="(!fnPermissionShopId('STORE_CONTROL_PHOTO_ADD'))?'':'fn_back'" v-if="type === 'pzyy'" @click="pz(item.orderNo,index)">安排拍照</view>
						<view class="arrange" :class="(!fnPermissionShopId('STORE_CONTROL_CHOOSE_ADD'))?'':'fn_back'" v-if="type === 'xpyy'" @click="xp(item.orderNo,index)">安排选片</view>
						<view class="arrange" :class="(!fnPermissionShopId('STORE_CONTROL_WATCH_ADD'))?'':'fn_back'" v-if="type === 'kbyy'" @click="kb(item.orderNo,index)">安排看板</view>
						<view class="arrange" :class="(!fnPermissionShopId('STORE_CONTROL_PICKUP_ADD'))?'':'fn_back'" v-if="type === 'qjyy'" @click="qj(item.orderNo,index)">安排取件</view>
					</view>		
				</view>  
				<view class="noMove" v-if="showNoMore">没有更多数据</view>
			</s-pull-scroll>
		</section>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import searchModul from '@/components/searchModul.vue'
	import sPullScroll from '@/components/s-pull-scroll';
	import detailMoudel from '@/components/detailMoudel.vue'
	import { getAllOrderItem } from '@/util/api/shop.js'
	const { $Message } = require('@/wxcomponents/base/index');
	export default {
		components:{
			sPullScroll,
			searchModul,
			detailMoudel
		},
		filters:{
			// 选衣状态
			processStatus0 (type) {
				const result = new Map([
					['NOT_PROCESSING', '未选衣'],
					['PROCESSING', '选衣中'],
					['COMPLETE', '已选衣']
				])
				return result.get(type)
			},
			// 拍照状态
			processStatus (type) {
				const result = new Map([
					['NOT_PROCESSING', '未拍照'],
					['PROCESSING', '拍照中'],
					['COMPLETE', '拍照完成']
				])
				return result.get(type)
			},
			// 选片状态
			processStatus1 (type) {
				const result = new Map([
					['NOT_PROCESSING', '未选'],
					['PROCESSING', '选片中'],
					['COMPLETE', '已选']
				])
				return result.get(type)
			},
			// 取件状态
			processStatus2 (type) {
				const result = new Map([
					['NOT_PROCESSING', '未回件'],
					['PROCESSING', '部分回件'],
					['COMPLETE', '全部回件']
				])
				return result.get(type)
			},
		},
		data() {
			return {
				// 类型
				type:null,
				
				// 总数量
				total:11,
				// 列表
				list: [],
				// 没有更多
				showNoMore:false,
				
				params:{
					isSearchCount:true,
					limit:10,
					page:1,
				},
				// 存储空档期数据
				gapList:null
			};
		},
		onLoad(option){
			this.type = option.type
			this.gapList = option
			let title
			switch(option.type){
				case 'xyyy':
					title = '选衣预约'
					break;
				case 'pzyy':
					title = '拍照预约'
					break;
				case 'kbyy':
					title = '看板预约'
					break;
				case 'xpyy':
					title = '选片预约'
					break;
				case 'qjyy':
					title = '取件预约'
					break;
			}
			uni.setNavigationBarTitle({
				title:title
			})
			
			this.refresh();
		},
		methods:{
			// 获取摄化订单详情
			getAllOrderItem(){
				getAllOrderItem(this.params).then(res=>{
					this.total = res.data.data.total
						const curList = res.data.data.records
						curList.forEach((i)=>{
							this.list.push(i)
						})
				})
			},
			
			// 搜索
			search(e){
				this.params = e
				this.list = [];
				this.getAllOrderItem()
			},

			// 安排选衣
			xy(e,index){
				console.log(e,index,'选衣')
				// 预约信息
				let {reservationDate,reservationShopId,reservationTime,typographyTypeId} = this.gapList
				// 该 index 为子订单下标
				uni.navigateTo({
					url:`/pagesWork/arrange/arrange?indexType=xy&orderNo=${e}&index=${index}&reservationDate=${reservationDate}&reservationShopId=${reservationShopId}&reservationTime=${reservationTime}&typographyTypeId=${typographyTypeId}`
				})
			},
		
			// 安排拍照
			pz(e,index){
				//判断拍照权限
				if(this.fnPermissionShopId('STORE_CONTROL_PHOTO_ADD')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				// 预约信息
				let {reservationDate,reservationShopId,reservationTime,typographyTypeId} = this.gapList
				// 该 index 为子订单下标
				uni.navigateTo({
					url:`/pagesWork/arrange/arrange?indexType=pz&orderNo=${e}&index=${index}&reservationDate=${reservationDate}&reservationShopId=${reservationShopId}&reservationTime=${reservationTime}&typographyTypeId=${typographyTypeId}`
				})
			},
			// 安排选片
			xp(e,index){
				//判断选片权限
				if(this.fnPermissionShopId('STORE_CONTROL_CHOOSE_ADD')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				// 预约信息
				let {reservationDate,reservationShopId,reservationTime,typographyTypeId} = this.gapList
				uni.navigateTo({
					url:`/pagesWork/arrange/arrange?indexType=xp&orderNo=${e}&index=${index}&reservationDate=${reservationDate}&reservationShopId=${reservationShopId}&reservationTime=${reservationTime}&typographyTypeId=${typographyTypeId}`
				})
			},
			// 安排看板
			kb(e,index){
				//判断看板权限
				if(this.fnPermissionShopId('STORE_CONTROL_WATCH_ADD')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				// 预约信息
				let {reservationDate,reservationShopId,reservationTime,typographyTypeId} = this.gapList
				uni.navigateTo({
					url:`/pagesWork/arrange/arrange?indexType=kb&orderNo=${e}&index=${index}&reservationDate=${reservationDate}&reservationShopId=${reservationShopId}&reservationTime=${reservationTime}&typographyTypeId=${typographyTypeId}`
				})
			},
			// 安排取件
			qj(e,index){
				//判断取件权限
				if(this.fnPermissionShopId('STORE_CONTROL_PICKUP_ADD')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				// 预约信息
				let {reservationDate,reservationShopId,reservationTime,typographyTypeId} = this.gapList
				uni.navigateTo({
					url:`/pagesWork/arrange/arrange?indexType=qj&orderNo=${e}&index=${index}&reservationDate=${reservationDate}&reservationShopId=${reservationShopId}&reservationTime=${reservationTime}&typographyTypeId=${typographyTypeId}`
				})
			},
		
			// 组件
			refresh () {
			  this.$nextTick(() => {
			    this.$refs.pullScroll.refresh();
			  });
			},
			pullDown (pullScroll) {
			  setTimeout(() => {
			    this.loadData(pullScroll);
			  }, 200);
			},
			loadData (pullScroll) {
				if (pullScroll.page == 1) {
					this.list = [];
				}
				if(this.list.length < this.total){
					this.getAllOrderItem()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				if(!this.showNoMore){
					this.params.page = pullScroll.page
				}
				pullScroll.success();
			}
			
		}
	}
</script>
<style>
	page{
		background-color: #FDFDFD;
	}
</style>
<style lang="scss" scoped>
	.listBox{
		margin: 30rpx;
		box-shadow: 0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		background-color: #FFFFFF;
		.butBox{
			display: flex;
			justify-content: space-between;
			margin: 0 30rpx;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #DDDDDD;
			.textBox{
				font-size: 32rpx;
				font-weight: bold;
				.text{
					width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.arrange{
				width: 180rpx;
				height: 60rpx;
				font-size: 28rpx;
				line-height: 60rpx;
				text-align: center;
				border-radius: 30rpx;
				background-color: #61a3ff;
				color: #FFFFFF;
				border: 1rpx solid #61a3ff;
				box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
				margin-top: 15rpx;
			}
		}
		.butBox:last-child{
			border-bottom: none;
		}
	}
	.noMove{
		font-size: 28rpx;
		color: #a2a2a2;
		text-align: center;
		margin-bottom: 30rpx
	}
</style>
