/*********************************  数码安排操作  ***************************************/
<template>
	<view>
		<detailMoudel v-if="info" :info="info"></detailMoudel>
		<view v-for="(item,index) in list" :key="item.itemId" class="mainBox">
			<view class="index">第{{index + 1}}次</view>
			<digitalArrangeList :type="type" :item='item' @onButton="onButton"></digitalArrangeList>
		</view>
		
		<digitalUpdataOrAdd 
			v-if="showModal" 
			:info="listInfo" 
			:itemId="info.itemId"
			:type="type" 
			:showName="showName"
			@ok="ok"
			@close="closeModal"
		></digitalUpdataOrAdd>
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import digitalUpdataOrAdd from './components/digitalUpdataOrAdd.vue'
	import detailMoudel from '@/components/detailMoudel.vue'
	import digitalArrangeList from './components/digitalArrangeList.vue'
	import { getDigitalItem } from '@/util/api/shop.js'
	export default {
		components:{
			detailMoudel,
			digitalArrangeList,
			digitalUpdataOrAdd
		},
		data() {
			return {
				// 类型
				type:null,
				// 详情
				info:null,
				// 所有子订单内容
				list:null,
				showModal:false,
				// 选择修改的子订单内容
				listInfo:null,
				showName:null,
			};
		},
		onLoad(op){
			this.type = op.type
			let pages = getCurrentPages();
			let prvePage = pages[pages.length - 3]; //当前页面
			let digitalInfo = prvePage.data.digitalInfo
			if(digitalInfo){
				this.info = digitalInfo
			}
			let title 
			switch(this.type){
				case 'cx':
					title = '安排初修工作'
					break
				case 'jx':
					title = '安排精修工作'
					break
				case 'sj':
					title = '安排设计工作'
					break
				case 'fp':
					title = '安排发片工作'
					break
			}
			uni.setNavigationBarTitle({
				title: title
			})
			
			
		},
		onShow(){
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let address = currPage.data.address;
			if(address){
				this.showName = address
			}
		},
		methods:{
			getDigitalItem(){
				getDigitalItem({ itemId: this.info.itemId}).then(res=>{
					this.list = res.data.data
					this.showModal = false
				})
			},
			// 显示模态框
			onButton(e){
				this.listInfo = e
				this.showModal = true
			},
			// 关闭模态框
			closeModal(){
				this.showModal = false
			},
			ok(){
				$Message({
					content: '修改成功',
					type: 'success'
				});
				this.getDigitalItem()
			},
		},
		watch:{
			info(){
				this.getDigitalItem()
			}
		}
	}
</script>

<style>
	page{
		background-color: #fdfdfd;
	}
</style>
<style lang="scss">
	.mainBox{
		margin: 30rpx;
		.index{
			background-color: #61A3FF;
			color: #FFFFFF;
			border-radius: 10rpx 10rpx 0 0 ;
			font-size: 32rpx;
			padding: 20rpx;
		}
	}

</style>
