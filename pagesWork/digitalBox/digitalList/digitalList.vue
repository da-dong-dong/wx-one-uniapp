/*********************************  数码安排列表  ***************************************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				
				<searchModul ref="searchModul" @search="search"></searchModul>
				
				<view class="listBox" v-for="(item,index) in list" :key="item.itemId">
					
					<detailMoudel :info="item"></detailMoudel>
					
					<view class="butBox">
						<view class="textBox">
							<view class="text">{{item.itemNo}}</view>
							<view class="text">入册/入底：{{item.bookCount}}/{{item.bottomCount}}</view>
						</view> 
						<view class="arrange" @click="arrange(index)">数码安排</view>
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
	import { getDigitalPage } from '@/util/api/shop.js'
	export default {
		components:{
			sPullScroll,
			searchModul,
			detailMoudel
		},
		filters:{
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
				}
			};
		},
		onLoad(){
			this.refresh();
		},
		// onShow(){
		// 	this.getAllOrderItem()
		// },
		methods:{
			// 获取摄化订单详情
			getAllOrderItem(){
				getDigitalPage(this.params).then(res=>{
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
		
			arrange(index){
				let pages = getCurrentPages();
				let currPage = pages[pages.length - 1]; //当前页面
				currPage.setData({
					digitalInfo: this.list[index]
				})
				uni.navigateTo({
					url:'../digitalChange/digitalChange'
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
			},

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
