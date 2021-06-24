<template>
	<view>
		<!-- 主 联系人  -->
		<mainContact ref="mainContact" :type="type" :oldUser="oldUser"></mainContact>
		<!-- 次 联系人  -->
		<secondContact ref="secondContact" :oldUser="oldUser.customerContacts"></secondContact>
		<!-- 宝宝 -->
		<babyContact v-if="type === 'BABY'" ref="babyContact":oldUser="oldUser.customerContacts"></babyContact>
		
		<view class="button" v-if="oldUser" @click="save('update')">修改录入并{{type | type}}</view>
		<view class="button" v-else @click="save('add')">保存录入并{{type | type}}</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index.js');
	import { addCustomer, updateCustomer } from '@/util/api/common.js'
	import mainContact from './module/mainContact.vue'
	import secondContact from './module/secondContact.vue'
	import babyContact from './module/babyContact.vue'
	export default {
		components:{
			mainContact,
			secondContact,
			babyContact,
		},
		filters:{
			type(type){
				const result = new Map([
					['WEDDING_DRESS','婚纱开单'],
					['BABY','儿童开单'],
					['PREGNANT','孕妈开单'],
					['SERVICE','服务开单'],
					['PORTRAY','写真开单'],
					['WEDDING','婚庆开单'],
				])
				return result.get(type)
			}
		},
		data() {
			return {
				type:null,
				// 重复客资信息
				repeatData:null,
				params:{},
				oldUser:null,
			};
		},
		onLoad(op){
			this.type = op.type
			// this.type = 'BABY'
		},
		onShow(){
			this.$forceUpdate()
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			this.oldUser = currPages.data.repeatUser
		},
		methods:{
			// 保存新增
			save(type){
				let customerContacts = []
				let mainContact = this.$refs.mainContact.save()
				this.params = mainContact
				if(this.params.name !== null){
					let secondContact = this.$refs.secondContact.save()
					if(secondContact.name !== null && secondContact.name.trim() !== ''){
						customerContacts.push(secondContact)
					}
					if(this.type === 'BABY'){
						let babyContact = this.$refs.babyContact.save()
						customerContacts.push(...babyContact)
					}
					this.params.customerContacts = customerContacts
					if(type === 'add'){
						this.addCustomer()
					}else{
						this.params.customerContacts.forEach((i)=>{
							i.customerId = mainContact.customerId
						})
						this.updateCustomer()
					}
				}else{
					$Message({
							content: '主联系人名字不能为空',
							type: 'warning'
					});
				}
			},
			// 新增
			addCustomer(){
				addCustomer(this.params).then(res=>{
					if(res.data.code === 1000){
						uni.redirectTo({
							url:'../openInfo/openInfo?type=' + this.type + '&id=' + res.data.data.customerId
						})
					}else if(res.data.code === 5000){
						this.repeatData = res.data.data
						uni.navigateTo({
							url:'./repeat/repeat'
						})
					}
				})
			},
			// 修改
			updateCustomer(){
				updateCustomer(this.params).then(res=>{
					if(res.data.code === 1000){
						uni.redirectTo({
							url:'../openInfo/openInfo?type=' + this.type + '&id=' + res.data.data.customerId
						})
					}
				})
			},
			close(){
				this.isRepeat = false
			},
		},
	}
</script>

<style lang="scss">
	.button{
		width: 600rpx;
		height: 80rpx;
		margin: 30rpx 0;
		line-height: 80rpx;
		border-radius: 40rpx;
		background-color: #61A3FF;
		color: #FFFFFF;
		text-align: center;
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
