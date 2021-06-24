<template>
	<view>
		<view class="box" v-if="params.length > 0">
			<view class="titleTop">宝宝信息 <view class="right" @click="addOne"> + </view></view>
			<view v-for="(item,index) in params" :key="index">
				<callName :callNameArr="callNameArr" :callName.sync="item.callName"></callName>
				<!-- 姓名 -->
				<view class="bigBox">
					<view class="left">
						<view class="title">姓名</view>
						<!-- <view class="text">{{item.name}}</view> -->
						<input class="uni-input" type="text" v-model="item.name" placeholder="姓名" />
					</view>
				</view>
				<!-- 生日 -->
				<view class="bigBox last">
					<view class="left">
						<view class="title">生日</view>
						<!-- <view class="text">{{item.birthdayTime | time}}</view> -->
						<view class="uni-list-cell-db">
							<picker mode="date" :value="item.birthdayTime" @change="bindDateChange($event, item)">
								<view class="flex">
									<view class="uni-input">{{item.birthdayTime ? item.birthdayTime : '生日' | times}} </view>
									<i-icon class="icon" type="enter" size="16" color="#80848f"/>
								</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import callName from './components/callName.vue'
	import { getCallName } from '@/util/api/goods.js'
	export default{
		components:{
			callName
		},
		data(){
			return{
				callNameArr:[],
				params:[],
			}
		},
		created(){
			this.getCallName()
			this.params.push(this.addBabyOne())
		},
		methods:{
			bindDateChange (e, item) {
				item.birthdayTime = new Date(e.target.value).getTime()
			},
			addOne () {
				this.params.push(this.addBabyOne())
			},
			// 获取昵称
			getCallName(){
				getCallName({type:'BABY',isAdults:false}).then(res=>{
					this.callNameArr = res.data.data
				})
			},
			save(){
				return this.params
			},
			addBabyOne () {
				let p = {
					birthdayLunar: false,	//是否农历
					birthdayTime: null,	//出生日期
					callName: null, //宝宝称呼	
					display: true, //是否显示	
					name: '', //宝宝姓名	
					sex: true,	//性别
					zodiac: null, 
				}
				return p
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './components/moduleStyle.scss';
	.last{
		border-bottom: 2rpx solid #DDD;
	}
	.right{
		float: right;
	}
</style>
