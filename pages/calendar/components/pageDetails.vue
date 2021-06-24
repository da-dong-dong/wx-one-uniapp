<template>
	<view>
		<view class="listBigBox" v-for="item in pageDetails" :key="item.id">
			<detailMoudel :info="item"></detailMoudel>
			<detailXyMain v-if="type === 'xy'" :item="item" :flag="flag" @cancel="cancel" @change="change"></detailXyMain>
			<detailPzMain v-if="type === 'pz'" :item="item" :flag="flag" @cancel="cancel" @change="change"></detailPzMain>
			<detailXpMain v-if="type === 'xp'" :item="item" :flag="flag" @cancel="cancel" @change="change"></detailXpMain>
			<detailKbMain v-if="type === 'kb'" :item="item" :flag="flag" @cancel="cancel" @change="change"></detailKbMain>
			<detailQjMain v-if="type === 'qj'" :item="item" :flag="flag" @cancel="cancel" @change="change"></detailQjMain>
		</view>
		<view class="ts" v-if="pageDetails.length < 1">暂无数据</view>
		<!-- 弹窗 -->
		<delModal :title="'取消档期'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
	</view>
</template>

<script>
	import detailMoudel from '@/components/detailMoudel.vue'
	import detailXyMain from '@/components/detailWorkMain/detailXyMain.vue'
	import detailKbMain from '@/components/detailWorkMain/detailKbMain.vue'
	import detailPzMain from '@/components/detailWorkMain/detailPzMain.vue'
	import detailQjMain from '@/components/detailWorkMain/detailQjMain.vue'
	import detailXpMain from '@/components/detailWorkMain/detailXpMain.vue'
	import delModal from '@/components/delModal.vue'
	import { deletPhotoInfo,deletChooseInfo,deletWatchInfo,deletPickupInfo } from '@/util/api/shop.js' //取消档期
	const { $Message } = require('@/wxcomponents/base/index');
	export default{
		props:['pageDetails','type'],
		components:{
			detailXyMain,
			detailKbMain,
			detailPzMain,
			detailQjMain,
			detailXpMain,
			detailMoudel,
			delModal
		},
		data(){
			return{
				// 取消档期模态框
				delModalShow:false,
				// 取消档期ID
				cancleId:null,
				// 日历是否有取消修改按钮
				flag:true
			}
		},
		methods:{
			// 修改档期
			change(item){
				
				console.log(item,'*******')
				let pages = getCurrentPages()
				let currPage = pages[pages.length - 1]
				currPage.setData({
					options: {
						'itemNo': item.itemNo,
						'name': item.assemblyName,
						'type': item.type,
						'itemId': item.itemId
					}
				})
				switch (this.type) {
					case 'xy':
						//选衣
						uni.navigateTo({
							url:`/pagesWork/arrange/xyAddorUpdata/xyAddorUpdata?id=${item.id}`
						})
						break;
					case 'pz':
						//拍照
						uni.navigateTo({
							url:`/pagesWork/arrange/pzAddorUpdata/pzAddorUpdata?oId=${item.orderId}&id=${item.id}`
						})
						break;
					case 'xp':
						//选片
						uni.navigateTo({
							url:`/pagesWork/arrange/xpAddorUpdata/xpAddorUpdata?id=${item.id}`
						})
						break;
					case 'kb':
						//看板
						uni.navigateTo({
							url:`/pagesWork/arrange/kbAddorUpdata/kbAddorUpdata?id=${item.id}`
						})
						break;
					case 'qj':
						//取件
						uni.navigateTo({
							url:`/pagesWork/arrange/qjAddorUpdata/qjAddorUpdata?id=${item.id}`
						})
						break;
				}
				
			},
			// 打开取消档期模态框
			cancel(id){
				this.cancleId = id
				this.delModalShow = true		
			},
			// 确定取消档期
			ok(){
				switch (this.type) {
					case 'pz':
						//拍照
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
						break;
					case 'xp':
						//选片
						deletChooseInfo({id:this.cancleId}).then(res=>{
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
						break;
					case 'kb':
						//看板 
						deletWatchInfo({id:this.cancleId}).then(res=>{
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
						break;
					case 'qj':
						//取件
						deletPickupInfo({id:this.cancleId}).then(res=>{
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
						break;
				}
				
			},
			// 关闭取消模态框
			close(){
				this.cancleId = null,
				this.delModalShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBigBox{
		margin: 30rpx;
		box-shadow: 0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		background-color: #FFFFFF;
	}
	.ts{
		font-size: 28rpx;
		text-align: center;
		margin: 30rpx 0 ;
	}
</style>
