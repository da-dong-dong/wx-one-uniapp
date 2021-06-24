/****************** 保留金编 充值 退款 *******************/
<template>
	<view>
		<add v-if="type === 'add'" :retentionId="retentionId"></add>
		<addRecord v-else :type="type" :retentionId="retentionId" :basic="basic"></addRecord>
		<i-message id="message" />
	</view>
</template>

<script>
	import addRecord from './components/addRecord.vue'
	import add from './components/add.vue'
	export default {
		components:{
			addRecord,
			add
		},
		data() {
			return {
				// 类型
				type:null,
				retentionId:null,
				basic:null,
			};
		},
		onLoad(op){
			let pages = getCurrentPages()
			let prvePages = pages[pages.length - 2]
			let basic = prvePages.data.retentionBasic
			this.retentionId = op.id
			this.type = op.type
			let title
			switch(op.type){
				case 'topUp':
					this.basic = basic
					title = '充值保留金'
					break
				case 'refund':
				this.basic = basic
					title = '退款保留金'
					break
				case 'add':
					title = '录入保留金'
					break
			}
			uni.setNavigationBarTitle({
				title:title
			})
			
			
		},
	}
</script>

<style lang="scss">

</style>
