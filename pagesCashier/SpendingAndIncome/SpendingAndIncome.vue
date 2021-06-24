/******************** 支出与收入 ************************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				<searchModul ref="searchModul" :sai="true" @search="search"></searchModul>
				<view class="listBigBox" v-for="(item,index) in list" :key="index">
					<spendingDetail v-if="type === 'spending'" :info="item" @del="del"></spendingDetail>
					<IncomeDetail v-if="type === 'income'" :info="item" @del="del"></IncomeDetail>
				</view>
				<view class="noMove"v-if="showNoMore">没有更多数据</view>
				<view class="button" @click="add">+添加{{type == 'spending'?'支出':'其他收入'}}</view>
			</s-pull-scroll>
		</section>
		<delModal :title="'删除'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import delModal from '@/components/delModal.vue'
	import sPullScroll from '@/components/s-pull-scroll';
	import searchModul from '@/components/searchModul.vue'
	import spendingDetail from './conponents/spendingDetail.vue'
	import IncomeDetail from './conponents/IncomeDetail.vue'
	import { getExpenditureList, getOtherReceiptList, delOtherReceiptList, delExpenditure } from '@/util/api/shop.js'
	export default {
		components:{
			searchModul,
			sPullScroll,
			spendingDetail,
			IncomeDetail,
			delModal
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
				
				// 删除模态框
				delModalShow:false,
				delId:null,
				
				params:{
					expenditureType:1,
					isSearchCount:true,
					limit:10,
					page:1,
				},
			};
		},
		onLoad(op){
			this.type = op.type
			let title
			if(this.type == 'spending'){
				title = '店面支出'
			}else{
				title = '其他收入'
			}
			uni.setNavigationBarTitle({
				title:title
			})
			this.refresh();
		},
		onShow(){
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页
			let change = currPage.data.isChange
			if(change){
				this.getPage()
			}
			currPage.setData({
				isChange: false
			})
		},
		methods:{
			// 获取页面
			getPage(){
				let maxPage = this.params.page
				let params = {
					expenditureType:1,
					isSearchCount:true,
					limit:10 * maxPage,
					page: 1,
				}
				if(this.type === 'spending'){
					getExpenditureList(params).then(res=>{
						this.total = res.data.data.total
						this.list = res.data.data.records
					})
				}else{
					getOtherReceiptList(params).then(res=>{
						this.total = res.data.data.total
						this.list = res.data.data.records
					})
				}
				
			},
			
			getList(){
				if(this.type === 'spending'){
					this.getExpenditureList()
				}else{
					this.getOtherReceiptList()
				}
			},
			// 获取店面支出列表
			getExpenditureList(){
				getExpenditureList(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取其他收入列表
			getOtherReceiptList(){
				getOtherReceiptList(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			search(e){
				this.params = e
				this.params.expenditureType = 1
				this.getList()
			},
					
			add(){
				if(this.type === 'spending'){
					uni.navigateTo({
						url:'./addOrUpdataSpending/addOrUpdataSpending'
					})
				}else{
					uni.navigateTo({
						url:'./addIncome/addIncome'
					})
				}
			
			},
			
			// 删除
			del(e){
				this.delId = e
				this.delModalShow = true
			},
			close(){
				this.delId = null
				this.delModalShow = false
			},
			ok(){
				if(this.type == 'spending'){
					delExpenditure({id: this.delId}).then(res=>{
						if(res.data.code === 200){
							this.delId = null
							$Message({
								content: '删除成功',
								type: 'success'
							});
							this.getPage()
						}
					})
				}else{
					delOtherReceiptList({id: this.delId}).then(res=>{
						if(res.data.code === 200){
							this.delId = null
							$Message({
								content: '删除成功',
								type: 'success'
							});
							this.getPage()
						}
					})
				}
				
				this.delModalShow = false
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
				if(!this.showNoMore){
					this.params.page = pullScroll.page
				}
				if(this.list.length < this.total){
					this.getList()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				pullScroll.success();
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #FDFDFD
	}
</style>
<style lang="scss">
	.listBigBox{
		margin: 30rpx;
		box-shadow: 0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		background-color: #FFFFFF;
	}
	.noMove{
		text-align: center;
		margin-bottom: 180rpx;
		font-size: 28rpx;
	}
	.button{
		position: fixed;
		bottom: 30rpx;
		width: 600rpx;
		color: #FFFFFF;
		background-color: #61A3FF;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin: 0 auto;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-bottom: 30rpx;
	}
</style>
