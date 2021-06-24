/********************  保留金 ***********************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				<retentionSearch ref="searchModul" @search="search"></retentionSearch>
				<view class="listBigBox" v-for="(item,index) in list" :key="index">
					<retentionDetail :info="item" @del="del"></retentionDetail>
				</view>
				<view class="noMove"v-if="showNoMore">没有更多数据</view>
				<view v-if="!fnPermissionShopId('STORE_RETENTION_MONEY_ADD')" class="button" @click="add">+添加保留金</view>
				<view v-else class="button fn_back">+添加保留金</view>
			</s-pull-scroll>
		</section>
		<delModal :title="'删除'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import retentionSearch from './components/retentionSearch.vue'
	import sPullScroll from '@/components/s-pull-scroll';
	import delModal from '@/components/delModal.vue'
	import retentionDetail from './components/retentionDetail.vue'
	import { getRetentionList, delRetention } from '@/util/api/shop.js'
	export default {
		components:{
			retentionSearch,
			sPullScroll,
			delModal,
			retentionDetail
		},
		data() {
			return {
				// 总数量
				total:11,
				// 列表
				list: [],
				// 没有更多
				showNoMore:false,
				// 删除
				delModalShow:false,
				// 删除Id
				delId:null,
				//金额
				retentionMoney:null,

				params:{
					isSearchCount:true,
					limit:10,
					page:1,
				},
			};
		},
		onLoad(){
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
			// 重新获取列表
			getPage(){
				let maxPage = this.params.page
				let params = {
					isSearchCount:true,
					limit:10 * maxPage,
					page: 1,
				}
				getRetentionList(params).then(res=>{
					this.total = res.data.data.total
					this.list = res.data.data.records
				})
			},
			
			// 获取保留金列表
			getRetentionList(){
				getRetentionList(this.params).then(res=>{
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
				this.getRetentionList()
			},
			
			// 添加保留金
			add(){
				// uni.navigateTo({
				// 	url:'./retentionChange/retentionChange?type=add'
				// })
				uni.navigateTo({
					url:'../userInfo/userInfo?type=retention'
				})
			},
			
			// 删除
			del(e,retentionMoney){
				this.delModalShow = true
				this.delId = e
				this.retentionMoney = retentionMoney
			},
			close(){
				this.delModalShow = false
			},
			ok(){
				
				if(this.retentionMoney == 0){
					delRetention({id:this.delId}).then(res=>{
						if(res.data.code === 200){
							this.getPage()
							$Message({
								content: '删除成功',
								type: 'success'
							});
						}
					})
					this.delModalShow = false
					this.delId = null
				}else{
					uni.showToast({
						title: '有金额不能删除',
						icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
						duration: 2000    //持续时间为 2秒
					}) 
				}
				
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
					this.getRetentionList()
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
