/************* 次 联系人  *************/
<template>
	<view>
		<view class="box">
			<view class="titleTop">次 联系人</view>
			<!-- 姓名 -->
			<userInput :title="'姓名'" :enText="params.name":getText.sync="params.name"></userInput>
			<!-- 关系 -->
			<userInput :title="'关系'" :enText="params.relationship" :getText.sync="params.relationship"></userInput>
			<!-- 性别 -->
			<userSex :sex="params.sex" :getSex.sync="params.sex"></userSex>
			<!-- 手机 -->
			<numberInput :title="'手机'" :enText="params.phone":getText.sync="params.phone"></numberInput>
			<!-- QQ -->
			<numberInput :title="'Q Q'" :enText="params.qqNumber" :getText.sync="params.qqNumber"></numberInput>
			<!-- 微信 -->
			<userInput :title="'微信'" :enText="params.wxNumber":getText.sync="params.wxNumber"></userInput>
			<!-- 生日 -->
			<birthday 
				:birthdayTime="params.birthdayTime" 
				:birthdayLunar="params.birthdayLunar" 
				:getBTime.sync="params.birthdayTime"
				:getBLunar.sync="params.birthdayLunar"
			></birthday>
		</view>
	</view>
</template>

<script>
	import userInput from './components/contact/userInput.vue'
	import numberInput from './components/contact/numberInput.vue'
	import userSex from './components/contact/userSex.vue'
	import birthday from './components/contact/birthday.vue'
	export default{
		props:['oldUser'],
		components:{
			userInput,
			numberInput,
			userSex,
			birthday
		},
		data(){
			return{
				params:{
					name:null, // 姓名
					phone:null, // 手机
					birthdayTime:null,	// 生日
					birthdayLunar:0, // 生日是否农历
					qqNumber:null, // QQ
					wxNumber:null, // 微信
					sex:'男', // 性别
					relationship:null, //关系
					type:1,
				}
			}
		},
		methods:{
			// 获取生日
			getBirthday(e){
				this.params.birthday = e.birthday
				this.params.birthdayLunar = e.birthdayLunar
			},
			save(){
				return this.params
			}
		},
		watch:{
			oldUser(){
				let newData = this.oldUser.filter((i)=>{ return i.type === 1})
				if(newData[0]){
					this.params = newData[0]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
</style>