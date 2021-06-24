/*********************  前后期收款 ***********************/
<template>
	<view>
		<basicInfo v-if="basic" :info="basic"></basicInfo>
		<view class="title">{{text}}收款</view>
		<latePriceList v-if="type === 'latePrice'" v-for="(item,index) in list" :key="index" :info="item"></latePriceList>
		<earlyPriceList v-if="type === 'earlyPrice'" v-for="(item,index) in list" :key="index" :info="item" @refresh="del"></earlyPriceList>
		<view class="button" v-if="type === 'earlyPrice'" @click="addEarly">+添加收款</view>
		<delModal :title="'删除'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import delModal from '@/components/delModal.vue'
	import basicInfo from './components/basicInfo.vue'
	import latePriceList from './components/latePriceList.vue'
	import earlyPriceList from './components/earlyPriceList.vue'
	import { mapGetters } from 'vuex'
	import { getLatePriceList, getEarlyPriceList, getOrderBasic, deleteFinancia } from '@/util/api/shop.js'
	export default {
		components:{
			basicInfo,
			latePriceList,
			earlyPriceList,
			delModal
		},
		data() {
			return {
				// 详情
				basic:null,
				oId:null,
				type:null,
				text:null,
				recordId:null,
				list:[],
				delModalShow:false,
				delId:null,
			};
		},
		onLoad(op){
			this.oId = Number(op.oId)
			this.recordId = Number(op.recordId)
			this.type = op.type
			if(op.type === 'latePrice'){
				this.text = "前期"
			}else{
				this.text = '后期'
			}
			uni.setNavigationBarTitle({
				title:this.text + '收款'
			})
		},
		onShow(){
			this.getList()
		},
		mounted(){
			this.getOrderBasic(this.oId)
		},
		methods:{
			// 获取列表
			getList(){
				if(this.type === 'latePrice'){
					this.getLatePriceList(this.recordId)
				}else{
					this.getEarlyPriceList(this.recordId)
				}
			},
			// 获取前期列表
			getLatePriceList(id){
				getLatePriceList({ recordId: id }).then(res=>{
					this.list = res.data.data
				})
			},
			// 获取后期列表
			getEarlyPriceList(id){
				getEarlyPriceList({ recordId: id }).then(res=>{
					this.list = res.data.data
				})
			},
			// 基本信息
			getOrderBasic(id){
				getOrderBasic({id:id}).then(res=>{
					this.basic = res.data.data
				})
			},
			
			// 跳转添加后期收款
			addEarly(){
				uni.navigateTo({
					url:'./updataEarlyPrice/updataEarlyPrice?type=add&recordId=' + this.recordId + '&oId=' + this.oId
				})
			},
			
			// 删除后期收款
			del(e){
				this.delModalShow = true
				this.delId = e
			},
			close(){
				this.delModalShow = false
			},
			ok(){
				deleteFinancia({id: this.delId}).then(res=>{
					if(res.data.code === 200){
						this.getList()
						$Message({
							content: '删除成功',
							type: 'success'
						});
					}
				})
				this.delModalShow = false
				this.delId = null
			},
		},
	}
</script>

<style>
	page{
		background-color: #FDFDFD;
	}
</style>
<style lang="scss">
	.title{
		padding: 10rpx 55rpx;
		font-size: 28rpx;
		color: #333333;
		background-color: #F8F8F8;
	}
	.button{
		width: 600rpx;
		color: #FFFFFF;
		background-color: #61A3FF;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin: 0 auto;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-bottom: 30rpx;
	}
</style>
