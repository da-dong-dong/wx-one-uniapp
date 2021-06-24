<template>
	<view class="bigBox">
		<view class="listInfo">
			<view class="mainBox">
				<!-- 预约时间 拍照类型 -->
				<view class="listBox">
					<view class="list">
						<view class="text">预约时间：</view>
						<view class="info">{{item.reservationDate | time}} {{item.reservationTime | reservationTime}}</view>
					</view>	
					<view class="list">
						<view class="text">拍照类型：</view>
						<view class="info">{{item.processType | processType}}</view>
					</view>	
				</view>
				
				<!-- 预约门店 预约档期 -->
				<view class="listBox">
					<view class="list">
						<view class="text">预约门店：</view>
						<view class="info">{{shopIdMap.get(item.successShopId) | shopId}}</view>
					</view>	
					<view class="list">
						<view class="text">预约档期：</view>
						<view class="info">{{item.groupTypeCategoryId==-1|| !item.groupTypeCategoryId?'':scheduleMap.get(item.groupTypeCategoryId)}}({{item.isOnline | isOnline}})</view>
					</view>	
				</view>
				
				<!-- 拍照状态 拍照时间 -->
				<view class="listBox">
					<view class="list">
						<view class="text">拍照状态：</view>
						<view class="info">{{processStatus | status}}</view>
					</view>	
					<view class="list">
						<view class="text">拍照时间：</view>
						<view class="info">{{item.successTime | time}}</view>
					</view>	
				</view>
				
				<!-- 拍摄景点 -->
				<view class="listBox">
					<view class="list">
						<view class="text">拍摄景点：</view>
						<view class="info arr">{{item.completePhotoDataJson.photoDataPlaceJsons | photoDataArr}}</view>
					</view>	
				</view>
				
				<!-- 拍摄服装 -->
				<view class="listBox">
					<view class="list">
						<view class="text">拍摄服装：</view>
						<view class="info arr">{{item.completePhotoDataJson.photoDataDressJsons | photoDataArr}}</view>
					</view>	
				</view>
				<!-- 拍照备注： -->
				<view class="listBox">
					<view class="list">
						<view class="text">拍照备注：</view>
						<view class="info arr">{{item.remark?item.remark:'无'}}</view>
					</view>	
				</view>
				
				<!-- 摄化人员 -->
				<view class="personnel" v-if="item.orderItemProcessActorVos">
					<!-- 标题 -->
					<view class="pTitleBox">
						<view class="cross"></view>
						<view class="pTitle">摄化人员</view>
						<view class="cross"></view>
					</view>
					<!-- 内容 -->
					<view class="personBox">
						
						<!-- 摄影师 & 助理 -->
						<view class="listBox">
							<view class="list">
								<view class="text">摄影师：</view>
								<view class="info actor">{{item.orderItemProcessActorVos | actor('PHOTOGRAPHER')}}</view>
							</view>
							<view class="list">
								<view class="text">摄影师助理：</view>
								<view class="info actor">{{item.orderItemProcessActorVos | actor('PHOTOGRAPHER_ASSISTANT')}}</view>
							</view>		
						</view>
						
						<!-- 化妆师 & 助理 -->
						<view class="listBox">
							<view class="list">
								<view class="text">化妆师：</view>
								<view class="info actor">{{item.orderItemProcessActorVos | actor('MAKEUP')}}</view>
							</view>
							<view class="list">
								<view class="text">化妆师助理：</view>
								<view class="info actor">{{item.orderItemProcessActorVos | actor('MAKEUP_ASSISTANT')}}</view>
							</view>		
						</view>
						
						<!-- 引导师 & 助理 -->
						<view class="listBox">
							<view class="list">
								<view class="text">引导师：</view>
								<view class="info actor">{{item.orderItemProcessActorVos | actor('INSTRUCTOR')}}</view>
							</view>
							<view class="list">
								<view class="text">引导师助理：</view>
								<view class="info actor">{{item.orderItemProcessActorVos | actor('INSTRUCTOR_ASSISTANT')}}</view>
							</view>		
						</view>

					
						
					</view>
				</view>
				
				
				<view class="butBox" v-if="item.processStatus !== 'COMPLETE'">
					<view  class="but marginL20" :class="(!fnPermissionShopId('STORE_ORDER_PHOTO_UPDATE'))?'':'fn_back'" @click="overPhoto(item.id)">完成拍照</view>
					<view v-if="flag" class="but marginL20" :class="(!fnPermissionShopId('STORE_CONTROL_PHOTO_CANCEL'))?'':'fn_back'" @click="cancel(item.id)">取消档期</view>
					<view v-if="flag" class="but marginL20" :class="(!fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE'))?'':'fn_back'" @click="change(item)">修改档期</view>
				</view>
				
			</view>
		</view>
		
		
		<i-message id="message" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	const { $Message } = require('@/wxcomponents/base/index');
	export default{
		props:['item','flag'],
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
				// 预约档期
				'get_schedule'
			])
		},
		filters:{
			// 门店
			shopId(text){
				if(text){
					return text
				}else{
					return '未选择门店'
				}
			},
			// 拍照类型
			processType(state){
				const result = new Map([
					['NORMAL','正常'],
					['RETAKE','重拍'],
					['MAKE_UP','补拍'],
					['ADD','加拍'],
				])
				return result.get(state)
			},
			// 线上线下
			isOnline(boo){
				if(boo){
					return '线上'
				}else{
					return '线下'
				}
			},
			// 拍照状态
			status(type){
				const result = new Map([
					['NOT_PROCESSING', '未拍照'],
					['PROCESSING', '拍照中'],
					['COMPLETE', '拍照完成']
				])
				return result.get(type)
			},
			// 服装 景点显示过滤
			photoDataArr(arr){
				if(arr){
					if(arr.length <= 0){
						return '无'
					}else{
						let name = []
						arr.forEach((i)=>{
							name.push(i.name)
						})
						return name.join()
					}
				}else{
					return '无'
				}
				
			},
			// 摄化人员
			actor(arr,type){
				if(arr){
					let name = []
					arr.map((i)=>{
						if(i.positionType === type){
							name.push(i.actorName)
						}
					})
					if(name.length > 0){
						return name.join()
					}else{
						return '无'
					}
				}
			}
		},
		data(){
			return{
				// 拍照状态
				processStatus:null,
				shopIdMap: new Map(),
				scheduleMap: new Map(),
			}
		},
		mounted(){
			this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.processStatus = this.item.processStatus
		},
		methods:{
			// 完成拍照
			overPhoto(id){
				//判断拍照权限
				if(this.fnPermissionShopId('STORE_ORDER_PHOTO_UPDATE')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				uni.navigateTo({
					url:'/pagesWork/checkWork/completePhoto/completePhoto?id=' + id
				})
			},
			// 取消档期
			cancel(id){
				//判断取消档期权限
				if(this.fnPermissionShopId('STORE_CONTROL_PHOTO_CANCEL')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				this.$emit('cancel',id)
			},
			// 修改档期
			change(item){
				//判断修改权限
				if(this.fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				this.$emit('change',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  './detailMainStyle.scss';
</style>
