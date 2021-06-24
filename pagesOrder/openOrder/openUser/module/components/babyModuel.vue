/************* 宝宝  *************/
<template>
	<view>
		<view class="box">
			<!-- 姓名 -->
			<userInput :title="'姓名'" :enText="params.name" :getText.sync="params.name"></userInput>
			<!-- 关系 -->
			<userInput :title="'关系'" :enText="params.relationship" :getText.sync="params.relationship"></userInput>
			<!-- 性别 -->
			<userSex :sex="params.sex" :getSex.sync="params.sex"></userSex>
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
	import userInput from './contact/userInput.vue'
	import userSex from './contact/userSex.vue'
	import birthday from './contact/birthday.vue'
	export default{
		props:['info'],
		components:{
			userInput,
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
					type:2,
				}
			}
		},
		mounted(){
			this.params = this.info
		},
		methods:{
			save(){
				return this.params
			}
		},
		watch:{
			info(){
				this.params = this.info
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
	.box{
		border-bottom: 2rpx solid #DDD;
	}
</style>