/*********************** 订单收款 ****************************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				<searchModul ref="searchModul" @search="search"></searchModul>
				<view class="listBox" v-for="(item,index) in list" :key="index">
					<detailMoudel :info="item"></detailMoudel>
					<orderCashierList :info="item"></orderCashierList>
				</view>
				<view class="noMove"v-if="showNoMore">没有更多数据</view>
			</s-pull-scroll>
		</section>
		<i-message id="message" />
	</view>
</template>

<script>
	import orderCashierList from './components/orderCashierList.vue'
	import searchModul from '@/components/searchModul.vue'
	import sPullScroll from '@/components/s-pull-scroll';
	import detailMoudel from '@/components/detailMoudel.vue'
	import { getAllOrder }  from '@/util/api/shop.js'
	export default {
		components:{
			orderCashierList,
			searchModul,
			sPullScroll,
			detailMoudel
		},
		data() {
			return {
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
			// 获取页面
			getPage(){
				let maxPage = this.params.page
				let params = {
					isSearchCount:true,
					limit:10 * maxPage,
					page: 1,
				}
				getAllOrder(params).then(res=>{
					this.total = res.data.data.total
					this.list = res.data.data.records
				})
			},
			// 获取全部订单
			getAllOrder(){
				getAllOrder(this.params).then(res=>{
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
				this.getAllOrder()
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
					this.getAllOrder()
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
	.listBox{
		margin: 30rpx;
		box-shadow: 0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		background-color: #FFFFFF;
	}
	.noMove{
		text-align: center;
		margin-bottom: 30rpx;
		font-size: 28rpx;
	}
</style>

