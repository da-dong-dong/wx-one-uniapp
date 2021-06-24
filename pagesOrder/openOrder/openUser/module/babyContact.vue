/************* 宝宝  *************/
<template>
	<view>
		<view class="box">
			<view class="titleTop">
				<view>宝宝</view>
				<view @click="addBaby"><i-icon type="add" size="28"/></view>
			</view>
			<view v-for="(item,index) in params" :key="index">
				<babyModuel ref="baby" :info="item"></babyModuel>
			</view>
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index.js');
	import babyModuel from './components/babyModuel.vue'
	export default{
		props:['oldUser'],
		components:{
			babyModuel,
		},
		data(){
			return{
				params:[],
			}
		},
		mounted(){
			this.addBaby()
		},
		methods:{
			// 新增宝宝
			addBaby(){
				let baby = {
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
				if(this.params.length >= 3){
					$Message({
							content: '宝宝不能超过三个',
							type: 'warning'
					});
				}else{
					this.params.push(baby)
					this.getParams()
				}	
			},
			getParams(){
				this.$nextTick(res=>{
					let babyArr = []
					this.$refs.baby.forEach((i)=>{
						babyArr.push(i.save())
					})
					this.params = babyArr
				})
			},
			save(){
				let babyArr = []
				this.$refs.baby.forEach((i)=>{
					babyArr.push(i.save())
				})
				this.params = babyArr
				return this.params
			}
		},
		watch:{
			oldUser(){
				this.params = this.oldUser.filter((i)=>{ return i.type === 2})
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
	.titleTop{
		display: flex;
		justify-content: space-between;
	}
</style>