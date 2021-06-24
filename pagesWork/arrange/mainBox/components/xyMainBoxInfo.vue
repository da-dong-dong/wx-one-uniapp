<template>
	<view>
		<view class="mainBox">
			
			<!-- 预约时间 -->
			<view class="listBox">
				<view class="list">
					<view class="text">预约时间：</view>
					<view class="info">{{item.reservationDate | time}} {{item.reservationTime | reservationTime}}</view>
				</view>	
			</view>
			
			<!-- 预约门店 档期分组 -->
			<view class="listBox">
				<view class="list">
					<view class="text">预约门店：</view>
					<view class="info">{{shopIdMap.get(item.reservationShopId)}}</view>
				</view>	
				<view class="list">
					<view class="text">档期分组：</view>
					<view class="info">{{item.groupTypeCategoryId==-1?'':scheduleMap.get(item.groupTypeCategoryId)}}({{item.isOnline | isOnline}})</view>
				</view>	
			</view>
			
			<!-- 选衣状态 选衣时间 -->
			<view class="listBox">
				<view class="list">
					<view class="text">选衣状态：</view>
					<view class="info">{{item.processStatus | processStatus}}</view>
				</view>	
				<view class="list">
					<view class="text">选衣时间：</view>
					<view class="info">{{item.successTime | time}}</view>
				</view>	
			</view>
			
			<!-- 选衣师 -->
			<view class="listBox">
				<view class="list">
					<view class="text">选衣师：</view>
					<view class="info arr">{{item.orderItemProcessActorVos | actor}}</view>
				</view>	
			</view>
			
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['item'],
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
				// 预约档期
				'get_schedule'
			])
		},
		filters:{
			// 线上线下
			isOnline(boo){
				if(boo){
					return '线上'
				}else{
					return '线下'
				}
			},
			// 选衣状态
			processStatus (type) {
				const result = new Map([
					['NOT_PROCESSING', '未开始'],
					['PROCESSING', '选衣中'],
					['COMPLETE', '选衣完成']
				])
				return result.get(type)
			},
			// 摄化人员
			actor(arr,type){
				if(arr){
					let name = []
					arr.map((i)=>{
						name.push(i.actorName)
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
			this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
		},
	}
</script>

<style lang="scss">
	@import '../mainStyle.scss';
</style>
