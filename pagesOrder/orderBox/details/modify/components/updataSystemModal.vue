/************************************ 编辑套系信息 ***********************************/
<template>
	<view class="bigBox">
		<view class="box">
				
			<view class="titleBox">
				<view class="title">编辑套系信息</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
			
			<view class="mainBox">
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">套系名称：</view>
					</view>
					<view class="textBox">
						<view class="text">{{openInfo.assemblyName}}</view>
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">服务级别：</view>
					</view>
					<modifyPicker class="picker flex_all" :changeId="params.serviceCategoryId" :categoryName="'get_serviceCategory'" :getId.sync="params.serviceCategoryId"></modifyPicker>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">老师级别：</view>
					</view>
					<modifyPicker class="picker flex_all" :changeId="params.teacherCategoryId" :categoryName="'get_teacherCategory'" :getId.sync="params.teacherCategoryId"></modifyPicker>
				</view>
			</view>
			
				
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import modifyPicker from './modifyPicker.vue'
	import { updataSystem } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default{
		props:["openInfo"],
		components:{
			modifyPicker
		},
		data(){
			return{				
				params:{}
			}
		},
		mounted(){
			let info = {
				orderId:this.openInfo.orderId,
				serviceCategoryId:this.openInfo.serviceCategoryId,
				teacherCategoryId:this.openInfo.teacherCategoryId,
			}
			this.params = info
		},
		methods:{
			// 保存
			ok(){
				updataSystem(this.params).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
			// 取消
			cancel(){
				this.$emit('cancel')
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './updataModal.scss';
	.flex_all{
		width: 60%;
	}
</style>