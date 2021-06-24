<template>
	<view>
		<view class="bigBox">
			<view class="listInfo" v-for="(item,index) in listInfo" :key="item.id">
				
				<xyMainBoxInfo v-if="item.id" :item="item"></xyMainBoxInfo>

				<!-- 按键 -->
				<view class="butBox" v-if="item.id && item.processStatus !== 'COMPLETE'">
					<view :class="(!fnPermissionShopId('STORE_CONTROL_WATCH_UPDATE'))?'':'fn_back'" class="but" @click="updata1(item.id)">修改选衣档期</view>
					<view :class="(!fnPermissionShopId('STORE_CONTROL_WATCH_CANCEL'))?'':'fn_back'" class="but" @click="cancel(item.id)">取消档期</view>
				</view>
				
				<view class="button" v-if="!item.id && item.processStatus !== 'COMPLETE'" @click="updata(item.id)">安排选衣档期</view>

			</view>
		</view>
		
		<delModal :title="'取消档期'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { deletChooseClothesInfo } from '@/util/api/shop.js'
	import xyMainBoxInfo from './components/xyMainBoxInfo.vue'
	import delModal from '@/components/delModal.vue'
	export default{
		props:[
			'listInfo',
			'gapList'
		],
		components:{
			delModal,
			xyMainBoxInfo
		},
		data(){
			return{	
				// 取消档期模态框
				delModalShow:false,
				// 取消档期ID
				cancleId:null,
			}
		},
		methods:{
			// 修改1
			updata1(id){
				uni.navigateTo({
					url:'./xyAddorUpdata/xyAddorUpdata?id=' + id
				})
			},
			// 修改
			updata(id){
				// 预约信息
				let {reservationDate,reservationShopId,reservationTime,typographyTypeId} = this.gapList
				uni.navigateTo({
					url:`./xyAddorUpdata/xyAddorUpdata?id=${id}&reservationDate=${reservationDate}&reservationShopId=${reservationShopId}&reservationTime=${reservationTime}&typographyTypeId=${typographyTypeId}`
				})
			},
			// 打开取消档期模态框
			cancel(id){
				this.cancleId = id
				this.delModalShow = true		
			},
			// 确定取消档期
			ok(){
				deletChooseClothesInfo({id:this.cancleId}).then(res=>{
					if(res.data.code === 200){
						this.cancleId = null
						this.delModalShow = false
						$Message({
							content: '取消成功',
							type: 'success'
						});
						this.$emit('refresh')
					}
				})
			},
			// 关闭取消模态框
			close(){
				this.cancleId = null,
				this.delModalShow = false
			},
		},
	}
</script>
<style>
	page{
		background-color: #fefefe;
	}
</style>
<style lang="scss" scoped>
	@import './mainStyle.scss';
</style>
