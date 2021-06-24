/********************** 完成拍照 ***********************/
<template>
	<view>
		<view class="bigBox">
			
			<!-- 拍照时间 -->
			<!-- <photoTime :time="params.successTime" @openCalendar="openCalendar"></photoTime> -->
			<view class="box">
				<view class="title">拍照时间</view>
				<view class="flex_arr">
					<picker mode="date" :value="params.successTime" @change="bindDateChange($event, params)">
						<view class="text">
							<view class="uni-input">{{params.successTime ? params.successTime : '时间' | times}} </view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			
			<!-- 拍照状态 -->
			<photoStatus :status="params.processStatus" :getId.sync="params.processStatus"></photoStatus>
			
			<!-- 拍照类型 -->
			<processModule :process="params.processType" :getId.sync="params.processType"></processModule>
			
			<!-- 拍照张数 -->
			<photoNum :num="params.completePhotoDataJson.photoNum" :getNum.sync="params.completePhotoDataJson.photoNum"></photoNum>
			
			<!-- 预约门店 -->
			<shopModule :title="'拍摄门店'" :shopId="params.successShopId" @getId="getShopId"></shopModule>
			
			<list :title="'摄影师'" :show="showPHOTOGRAPHER" :type="'PHOTOGRAPHER'" @goAddress="goAddress"></list>
			<list :title="'摄影师助理'" :show="showPHOTOGRAPHER_ASSISTANT" :type="'PHOTOGRAPHER_ASSISTANT'" @goAddress="goAddress"></list>
			<list :title="'化妆师'" :show="showMAKEUP" :type="'MAKEUP'" @goAddress="goAddress"></list>
			<list :title="'化妆师助理'" :show="showMAKEUP_ASSISTANT" :type="'MAKEUP_ASSISTANT'" @goAddress="goAddress"></list>
			<list :title="'引导师'" :show="showINSTRUCTOR" :type="'INSTRUCTOR'" @goAddress="goAddress"></list>
			<list :title="'引导式助理'" :show="showINSTRUCTOR_ASSISTANT" :type="'INSTRUCTOR_ASSISTANT'" @goAddress="goAddress"></list>
			<list v-if="params.isVideo" :title="'录像师'" :show="showVIDEOGRAPHER" :type="'VIDEOGRAPHER'" @goAddress="goAddress"></list>
			
			<!-- 拍微视频 -->
			<videoModule 
				:isVideo="params.isVideo" 
				:getId.sync="params.isVideo"
			></videoModule>
			
			<view class="button" @click="updataPhoto">确定改修</view>
			
		</view>
		
		
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
		
		<i-message id="message" />
	</view>
</template>

<script>
	// import shopModule from '../components/shopModule.vue'
	import photoNum from './components/photoNum.vue'
	import photoTime from './components/photoTime.vue'
	import photoStatus from './components/photoStatus.vue'
	import shopModule from '@/pagesWork/arrange/components/shopModule.vue'
	import processModule from '@/pagesWork/arrange/components/processModule.vue'
	import videoModule from '@/pagesWork/arrange/components/videoModule.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import { getPhotoDetails, updataPhoto } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default {
		components:{
			photoNum,
			photoTime,
			photoStatus,
			shopModule,
			processModule,
			videoModule,
			list,
			uniCalendar
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
		},
		data() {
			return {
				showPHOTOGRAPHER:'请选择',
				showPHOTOGRAPHER_ASSISTANT:'请选择',
				showMAKEUP:'请选择',
				showMAKEUP_ASSISTANT:'请选择',
				showINSTRUCTOR:'请选择',
				showINSTRUCTOR_ASSISTANT:'请选择',
				showVIDEOGRAPHER:'请选择',
				params:{}
			};
		},
		onLoad(op){
			this.getPhotoDetails(Number(op.id))
			// this.getPhotoDetails(Number(66))
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
				this[show] = newArr
				}
			},
			
			// 打开日历
			openCalendar(time){
				this.$refs.calendar.open()
			},
			
			// 获取拍照时间
			enSure(e){
				let tem = Date.parse(new Date(e.fulldate))
				this.params.successTime = tem
			},
			bindDateChange (e, item) {
				item.successTime = new Date(e.target.value).getTime()
			},
			// 获取列表
			getPhotoDetails(id){
				getPhotoDetails({id:id}).then(res=>{
					this.params = res.data.data
					let data = res.data.data
					if(!data.successTime){
						let nowTime = Date.parse(new Date())
						this.params.successTime = nowTime
					}
					if(!data.successShopId){
						this.params.successShopId = this.shopId
					}
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
					this.params.completePhotoDataJson.photoDataDressJsons = null
					this.params.completePhotoDataJson.photoDataPlaceJsons = null
					this.params.photographers = null
					this.params.photographerAssistants = null
					this.params.makeups = null
					this.params.makeupAssistants = null
					this.params.instructors = null
					this.params.instructorAssistants = null
					this.params.videographers = null
				})
			},
			
			// 获得门店ID
			getShopId(e){
				this.params.successShopId = e
			},
			
			// 获得拍照类型
			getProcess(e){
				this.params.processType = e
			},
			
			// 选择人员
			goAddress(type){
				let show = `show${type}`
				uni.navigateTo({
					url:'/pages/address/address?type=' + type + '&show=' + this[show]
				})
			},
		
			updataPhoto(){
				updataPhoto(this.params).then(res=>{
					if(res.data.code === 200){
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	@import '@/pagesWork/arrange/components/component.scss';
	.button{
		margin-top: 30rpx;
	}
</style>
