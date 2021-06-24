<template>
	<view class="bigBox">
		<view class="listInfo">
			<view class="mainBox">
				<!-- 预约时间 取件类型 -->
				<view class="listBox">
					<view class="list">
						<view class="text">预约时间：</view>
						<view class="info">{{item.reservationDate | time}} {{item.reservationTime | reservationTime}}</view>
					</view>	
				</view>
				
				<!-- 预约门店 预约档期 -->
				<view class="listBox">
					<view class="list">
						<view class="text">预约门店：</view>
						<view class="info">{{shopIdMap.get(item.orderShopId) | shopId}}</view>
					</view>	
					<view class="list">
						<view class="text">预约档期：</view>
						<view class="info">{{item.groupTypeCategoryId==-1|| !item.groupTypeCategoryId?'':scheduleMap.get(item.groupTypeCategoryId)}}({{item.isOnline | isOnline}})</view>
					</view>	
				</view>
				
				<!-- 取件状态 取件时间 -->
				<view class="listBox">
					<view class="list">
						<view class="text">取件状态：</view>
						<view class="info">{{item.processStatus | status}}</view>
					</view>	
					<view class="list">
						<view class="text">取件时间：</view>
						<view class="info">{{item.successTime | time}}</view>
					</view>	
				</view>
				
				<!-- 取件师 -->
				<view class="listBox">
					<view class="list">
						<view class="text">取件师：</view>
						<view class="info arr" v-if="item.actorNameVo">{{item.actorNameVo | actor}}</view>
						<view class="info arr" v-else>{{item.actorNameVos | actor}}</view>
					</view>	
				</view>
			
				<!-- 取件商品 -->
				<view class="listBox">
					<view class="list">
						<view class="text">取件商品：</view>
						<pickupStatus :item="item.reservationPickupDataJson"></pickupStatus>
					</view>	
				</view>

				<!-- 取件备注： -->
				<view class="listBox">
					<view class="list">
						<view class="text">取件备注：</view>
						<view class="info arr">{{item.remark?item.remark:'无'}}</view>
					</view>	
				</view>
				
				<view class="butBox" v-if="item.processStatus !== 'COMPLETE'">
					<view v-if="flag" class="but marginL20" :class="(!fnPermissionShopId('STORE_CONTROL_PICKUP_CANCEL'))?'':'fn_back'" @click="cancel(item.id)">取消档期</view>
					<view v-if="flag" class="but marginL20" :class="(!fnPermissionShopId('STORE_CONTROL_PICKUP_UPDATE'))?'':'fn_back'" @click="change(item)">修改档期</view>
				</view>
			</view>
		</view>
		
		
		<i-message id="message" />
	</view>
</template>
<script>
	import pickupStatus from '@/components/detailWorkMain/getPickupStatus.vue'
	import { mapGetters } from 'vuex'
	export default{
		props:['item','flag'],
		components:{
			pickupStatus
		},
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
			// 线上线下
			isOnline(boo){
				if(boo){
					return '线上'
				}else{
					return '线下'
				}
			},
			// 取件状态
			status(type){
				const result = new Map([
					['NOT_PROCESSING', '未开始'],
					['PROCESSING', '取件中'],
					['COMPLETE', '取件完成']
				])
				return result.get(type)
			},
			// 人员
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
				shopIdMap: new Map(),
				scheduleMap: new Map(),
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
		},
		methods:{
			// 取消档期
			cancel(id){
				//判断取消档期权限
				if(this.fnPermissionShopId('STORE_CONTROL_PICKUP_CANCEL')){
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
				if(this.fnPermissionShopId('STORE_CONTROL_PICKUP_UPDATE')){
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

<style lang="scss">
	@import  './detailMainStyle.scss';
</style>
