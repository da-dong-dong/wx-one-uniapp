/************************** 保留金记录 ******************************/
<template>
	<view>
		<userBasic :userInfo="userInfo"></userBasic>
		<listDetail v-for="(item,index) in list" :key="index" :info="item"></listDetail>
		<i-message id="message" />
	</view>
</template>

<script>
	import listDetail from './components/listDetail.vue'
	import userBasic from './components/userBasic.vue'
	import { retentionDetail } from '@/util/api/shop.js'
	export default {
		components:{
			userBasic,
			listDetail
		},
		data() {
			return {
				userInfo:null,
				list:null,
			};
		},
		onLoad(op){
			this.retentionDetail(Number(op.id))
		},
		methods:{
			// 获取详情
			retentionDetail(id){
				retentionDetail({id:id}).then(res=>{
					this.userInfo = res.data.data.retention
					this.list = res.data.data.recordList
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
