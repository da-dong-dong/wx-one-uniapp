/************* 主 联系人  *************/
<template>
	<view>
		<view class="box">
			<view class="titleTop">主 联系人</view>
			<!-- 姓名 -->
			<userInput :title="'姓名'" :enText="params.name" :getText.sync="params.name"></userInput>
			<!-- 性别 -->
			<userSex :sex="params.sex" :getSex.sync="params.sex"></userSex>
			<!-- 手机 -->
			<numberInput :title="'手机'" :enText="params.phone" :getText.sync="params.phone"></numberInput>
			<!-- QQ -->
			<numberInput :title="'Q Q'" :enText="params.qqNumber" :getText.sync="params.qqNumber"></numberInput>
			<!-- 微信 -->
			<userInput :title="'微信'" :enText="params.wxNumber" :getText.sync="params.wxNumber"></userInput>
			<!-- 客户区域 -->
			<category :city="params.city" :province="params.province" :region="params.region" @getCategory="getCategory"></category>
			<!-- 来源 -->
			<userSource :soureId="params.soureId" @getOrigin="getOrigin"></userSource>
			<!-- 生日 -->
			<birthday 
				:birthdayTime="params.birthdayTime" 
				:birthdayLunar="params.birthdayLunar" 
				:getBTime.sync="params.birthdayTime"
				:getBLunar.sync="params.birthdayLunar"
			></birthday>
			<!-- 老客姓名 -->
			<userInput :title="'老客姓名'" :enText="params.regularCustomerName" :getText.sync="params.regularCustomerName"></userInput>
			<!-- 老客手机 -->
			<numberInput :title="'老客手机'" :enText="params.regularCustomerPhone" :getText.sync="params.regularCustomerPhone"></numberInput>
			<!-- 特殊日期 -->
			<specialDate v-if="type === 'WEDDING_DRESS'" :type="type" :typeTime="params.weddingDay" :getTypeDate.sync="params.weddingDay"></specialDate>
			<specialDate v-if="type === 'PREGNANT'" :type="type" :typeTime="params.dueDate" :getTypeDate.sync="params.dueDate"></specialDate>
		</view>
	</view>
</template>

<script>
	import userSource from './components/contact/userSource.vue'
	import category from './components/contact/category.vue'
	import specialDate from './components/contact/specialDate.vue'
	import userInput from './components/contact/userInput.vue'
	import numberInput from './components/contact/numberInput.vue'
	import birthday from './components/contact/birthday.vue'
	import userSex from './components/contact/userSex.vue'
	export default{
		props:['type','oldUser'],
		components:{
			userSource,
			category,
			specialDate,
			userInput,
			numberInput,
			birthday,
			userSex
		},
		data(){
			return{
				params:{
					birthdayTime:null,	// 生日
					birthdayLunar:0, // 生日是否农历
					callId:null, 
					cid:null, //来源第一层Id
					city:null, //城市
					country:'中国', //国家
					customerContacts:null, //次联系人 宝宝
					customerId:null, //用户Id
					dueDate:null, //孕妈日期
					extend:null,	
					name:null, // 姓名
					phone:null, // 手机
					province:null, //市
					qqNumber:null, // QQ 
					region:null, //区
					regularCustomerName:null, // 老客姓名
					regularCustomerPhone:null, // 老客手机
					sex:'男', // 性别
					sid:null,
					soureId:null, //来源ID
					state:4, 
					wbNumer:null, 
					wxNumber:null, // 微信
					weddingDay:null, //结婚日期
					customerContacts:[],
				}
			}
		},
		methods:{
			// 获取客户区域
			getCategory(e){
				Object.assign(this.params,e)
			},
			// 获取客户来源
			getOrigin(e){
				Object.assign(this.params,e)
			},
			// 获取生日
			getBirthday(e){
				this.params.birthdayTime = e.birthdayTime
				this.params.birthdayLunar = e.birthdayLunar
			},
			// 保存订单
			save(){
				return this.params
			},
		},
		watch:{
			oldUser(){
				let soureId = [this.oldUser.cid,this.oldUser.sid]
				this.oldUser.soureId = soureId
				this.params = this.oldUser
				this.params.extend = null
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
</style>