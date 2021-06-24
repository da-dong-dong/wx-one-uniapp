<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				<view class="listBox" v-for="(item,index) in list" :key="index">
					<view class="left">
						<image :src="item.portrait ? item.portrait : 'https://storagetest.lyfz.net/static/img/default-user.jpg'" mode=""></image>
						<view class="nAndp">
							<view class="name">{{item.name}}</view>
							<view class="phone">{{item.mobile ? item.mobile : '无联系方式'}}</view>
						</view>
					</view>
					<image src="/static/goPhone.png" class="icon" mode="" @click="goPhone(item.mobile)"></image>
				</view>
				<view class="noMove"v-if="showNoMore">没有更多数据</view>
				<view style="height: 150rpx;"></view>
			</s-pull-scroll>
		</section>
		<i-message id="message" />
		<tabBar :index="2"></tabBar>
	</view>
</template>

<script>
	import { pageAccountAddressBookVo } from '@/util/api/user.js'
	import sPullScroll from '@/components/s-pull-scroll';
	export default {
		components:{
			sPullScroll,
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
					limit:15,
					page:1,
				},
			};
		},
		onLoad(){
			this.refresh();
		},
		methods:{
			pageAccountAddressBookVo(){
				pageAccountAddressBookVo(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						// 过滤离职
						if(i.office == 1){
							this.list.push(i)
						}
					})
				})
			},
			// 跳转进拨号页
			goPhone(phone){
				uni.makePhoneCall({
					phoneNumber:phone
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
					this.params.page = 1
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
					this.pageAccountAddressBookVo()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				pullScroll.success();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		display: flex;
		border-bottom: 1rpx solid #BBBBBB;
		padding: 22rpx;
		font-size: 28rpx;
		justify-content: space-between;
		.left{
			display: flex;
			image{
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				margin-top: 0;
				margin-right: 15rpx
			}
			.nAndp{
				margin-top: 10rpx;
			}
		}
		image{
			width: 44rpx;
			height: 44rpx;
			margin-top: 25rpx;
		}
	}
	.noMove{
		font-size: 28rpx;
		text-align: center;
		margin: 20rpx 0 ;
	}
</style>
