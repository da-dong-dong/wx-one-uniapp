<template>
	<view>
		<view class="bigBox">
			<view class="listInfo" v-for="(item,index) in listInfo" :key="item.id">
				
				<!-- 标题 -->
				<view class="titleBox">
					<view class="title">第{{index+1}}次拍摄</view>
				</view>
				
				<pzMainBoxInfo :item="item"></pzMainBoxInfo>
				
				<!-- 按键 -->
				<view class="butBox" v-if="item.processStatus !== 'COMPLETE'">
					<view class="but" :class="(!fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE'))?'':'fn_back'" @click="addActor(item.id)" v-if="!item.orderItemProcessActorVos">安排摄化人员</view>
					<view class="but" :class="(!fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE'))?'':'fn_back'" @click="updataActor(item.id)" v-else>修改摄化人员</view>
					<view class="but" :class="(!fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE'))?'':'fn_back'" @click="change(item.id)">改期</view>
					<view class="but" :class="(!fnPermissionShopId('STORE_CONTROL_PHOTO_CANCEL'))?'':'fn_back'" @click="cancel(item.id)">取消档期</view>
				</view>
					
			</view>
			
			<view class="prompt" v-if="listInfo.length < 1">您暂时还没有预约拍照哦~快去添加吧</view>
			
			<view class="button" @click="addPhoto">添加拍照预约</view>
		</view>
		<i-message id="message" />
		<delModal :title="'取消档期'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import delModal from '@/components/delModal.vue'
	import pzMainBoxInfo from './components/pzMainBoxInfo.vue'
	import { deletPhotoInfo } from '@/util/api/shop.js' //取消档期
	export default{
		props:[
			'listInfo',
			'oId',
			'gapList'
		],
		components:{
			delModal,
			pzMainBoxInfo
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
			// 新增拍照预约
			addPhoto(){
				// 预约信息
				let {reservationDate,reservationShopId,reservationTime,typographyTypeId} = this.gapList
				uni.navigateTo({
					url:`./pzAddorUpdata/pzAddorUpdata?oId=${this.oId}&reservationDate=${reservationDate}&reservationShopId=${reservationShopId}&reservationTime=${reservationTime}&typographyTypeId=${typographyTypeId}`
				})
			},
			// 修改拍照预约
			change(id){
				//判断修改权限
				if(this.fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				uni.navigateTo({
					url:'./pzAddorUpdata/pzAddorUpdata?oId=' +  this.oId + '&id=' + id
				})
			},
			// 新增人员
			addActor(id){
				//判断修改权限
				if(this.fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				uni.navigateTo({
					url:'./pzPerson/pzPerson?id=' + id + '&but=安排'
				})
			},
			// 修改人员
			updataActor(id){
				//判断修改权限
				if(this.fnPermissionShopId('STORE_CONTROL_PHOTO_UPDATE')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				uni.navigateTo({
					url:'./pzPerson/pzPerson?id=' + id + '&but=修改'
				})
			},
			
			// 打开取消档期模态框
			cancel(id){
				//判断取消档期权限
				if(this.fnPermissionShopId('STORE_CONTROL_PHOTO_CANCEL')){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				this.cancleId = id
				this.delModalShow = true		
			},
			// 确定取消档期
			ok(){
				deletPhotoInfo({id:this.cancleId}).then(res=>{
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
			}
		}
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
