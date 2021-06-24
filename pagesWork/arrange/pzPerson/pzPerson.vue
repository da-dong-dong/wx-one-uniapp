<template>
	<view class="bigBox">
		<view class="titleBox">
			<view class="left">
				<view>{{itemNo}}</view>
				<view>{{name}}</view>
			</view>
		</view>
		
		<list :title="'摄影师'" :show="showPHOTOGRAPHER" :type="'PHOTOGRAPHER'" @goAddress="goAddress"></list>
		<list :title="'摄影师助理'" :show="showPHOTOGRAPHER_ASSISTANT" :type="'PHOTOGRAPHER_ASSISTANT'" @goAddress="goAddress"></list>
		<list :title="'化妆师'" :show="showMAKEUP" :type="'MAKEUP'" @goAddress="goAddress"></list>
		<list :title="'化妆师助理'" :show="showMAKEUP_ASSISTANT" :type="'MAKEUP_ASSISTANT'" @goAddress="goAddress"></list>
		<list :title="'引导师'" :show="showINSTRUCTOR" :type="'INSTRUCTOR'" @goAddress="goAddress"></list>
		<list :title="'引导式助理'" :show="showINSTRUCTOR_ASSISTANT" :type="'INSTRUCTOR_ASSISTANT'" @goAddress="goAddress"></list>
		<list v-if="params.isVideo" :title="'录像师'" :show="showVIDEOGRAPHER" :type="'VIDEOGRAPHER'" @goAddress="goAddress"></list>
		
		<view class="button" @click="button">{{but}}摄化人员</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import list from '@/components/detailWorkMain/personList.vue'
	const { $Message } = require('@/wxcomponents/base/index');
	import { getPhotoDetail, updataPhotoInfo } from '@/util/api/shop.js'
	export default {
		components:{
			list
		},
		computed:{
			...mapGetters('app',[
				'shopId' 
			]),
		},
		data() {
			return {
				// 子订单号
				itemNo:null,
				// 子订单名
				name:null,
				// 按键名
				but:null,
				
				showPHOTOGRAPHER:'请选择',
				showPHOTOGRAPHER_ASSISTANT:'请选择',
				showMAKEUP:'请选择',
				showMAKEUP_ASSISTANT:'请选择',
				showINSTRUCTOR:'请选择',
				showINSTRUCTOR_ASSISTANT:'请选择',
				showVIDEOGRAPHER:'请选择',
				params:{},
				// 是否安排传参
				gapFlag:false,
			};
		},
		onLoad(op){
			let pages = getCurrentPages()
			let prvePage = pages[pages.length - 2]
			let option = prvePage.data.options
			// 判断是否传参
			if(op.gapFlag){
				console.log(op.id)
				console.log('啦啦啦')
				this.gapFlag = true
			}
			this.itemNo = option.itemNo
			this.name = option.name
			this.but = op.but
			this.getPhotoDetail(op.id)
			uni.setNavigationBarTitle({
				title: op.but + '摄化人员'
			})
		},
		onShow(){
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let address = currPage.data.address;
			if(address){
				let show = `show${address.type}`
				let arr = []
				address.enArr.forEach((i)=>{
					arr.push(i.id)
				})
				switch(address.type){
					case 'PHOTOGRAPHER':
						this[show] = address.show
						this.params.photographers = arr
						break
					case 'PHOTOGRAPHER_ASSISTANT':
						this[show] = address.show
						this.params.photographerAssistants = arr
						break
					case 'MAKEUP':
						this[show] = address.show
						this.params.makeups = arr
						break
					case 'MAKEUP_ASSISTANT':
						this[show] = address.show
						this.params.makeupAssistants = arr
						break
					case 'INSTRUCTOR':
						this[show] = address.show
						this.params.instructors = arr
						break
					case 'INSTRUCTOR_ASSISTANT':
						this[show] = address.show
						this.params.instructorAssistants = arr
						break
					case 'VIDEOGRAPHER':
						this[show] = address.show
						this.params.videographers = arr
						break
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
			
			// 修改 获取预约详情
			getPhotoDetail(id){
				getPhotoDetail({ id: id}).then(res=>{
					this.params = res.data.data
					let data = res.data.data
					// 摄影师
					this.showName(data.photographers,'showPHOTOGRAPHER')
					// 摄影师助理
					this.showName(data.photographerAssistants,'showPHOTOGRAPHER_ASSISTANT')
					// 化妆师
					this.showName(data.makeups,'showMAKEUP')
					// 化妆师助理
					this.showName(data.makeupAssistants,'showMAKEUP_ASSISTANT')
					// 摄影师助理
					this.showName(data.instructors,'showINSTRUCTOR')
					// 摄影师助理
					this.showName(data.instructorAssistants,'showINSTRUCTOR_ASSISTANT')
					// 录像师
					this.showName(data.videographers,'showVIDEOGRAPHER')
					this.params.photographers = null
					this.params.photographerAssistants = null
					this.params.makeups = null
					this.params.makeupAssistants = null
					this.params.instructors = null
					this.params.instructorAssistants = null
					this.params.videographers = null
				})
			},
			goAddress(type){
				let show = `show${type}`
				uni.navigateTo({
					url:'/pages/address/address?type=' + type + '&show=' + this[show]
				})
			},
			
			// 点击
			button(){
				this.params.orderItemProcessReservation = null,
				updataPhotoInfo(this.params).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: this.but + '成功',
							type: 'success'
						});
						setTimeout(()=>{
							if(this.gapFlag){
								uni.reLaunch({
									url:'/pages/calendar/calendar?type=pz&check=true&id=' + this.shopId
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
		}
	}
</script>

<style lang="scss">
	@import '../components/component.scss';
	.bigBox{
		.titleBox{
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			font-size: 32rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #DDDDDD;
			.left{
				display: flex;
				>view{
					margin-right: 20rpx;
				}
			}		
		}
	}
</style>
