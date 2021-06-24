/******************* 收款明细  **********************/
<template>
	<view>
		<basicInfo v-if="cashierDetail" :info="cashierDetail"></basicInfo>
		<view class="title">收款明细</view>
		<view v-for="(item,index) in collectionInfo" :key="index">
			<collectionDetail :info="item"></collectionDetail>
		</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import collectionDetail from './components/collectionDetail.vue'
	import basicInfo from './components/basicInfo.vue'
	import { getReceiptList } from '@/util/api/shop.js'
	export default {
		components:{
			basicInfo,
			collectionDetail
		},
		data() {
			return {
				// 详情
				cashierDetail:null,
				// 收款明细
				collectionInfo:null,
			};
		},
		onLoad(){
			let pages = getCurrentPages();
			let prvePage = pages[pages.length - 2]; //上一页
			let cashierDetail = prvePage.data.cashierDetail
			this.cashierDetail = cashierDetail
			this.getReceiptList(cashierDetail.financeId)
		},
		methods:{
			// 明细详情
			getReceiptList(id){
				getReceiptList({ recordId: id}).then(res=>{
					this.collectionInfo = res.data.data
				})
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
	.title{
		margin-top: 30rpx;
		padding: 10rpx 55rpx;
		font-size: 28rpx;
		color: #333333;
		background-color: #F8F8F8;
	}
</style>
