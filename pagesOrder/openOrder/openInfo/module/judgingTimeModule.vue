<template>
	<view>
		<view class="box">
			<view class="bigBox" v-if="type === 'WEDDING_DRESS'">
				<view class="left deleBox">
					<view class="title">结婚日期</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="params.typeTime" @change="bindDateChange">
							<view class="flex">
								<view class="uni-input">{{params.typeTime ? params.typeTime : '结婚日期'}} </view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker>
					</view>
					<view class="deleBoxChild" @click="onClickDelTiem" v-if="params.typeTime">
						<i-icon class="icon" type="delete" size="24" color="#80848f" />
					</view>
				</view>
			</view>
			<view class="bigBox" v-if="type === 'WEDDING'">
				<view class="left">
					<view class="title">婚庆日期</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="params.typeTime" @change="bindDateChange">
							<view class="flex">
								<view class="uni-input">{{params.typeTime ? params.typeTime : '婚庆日期'}} </view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="bigBox" v-if="type === 'PREGNANT'">
				<view class="left">
					<view class="title">预产日期</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="params.typeTime" @change="bindDateChange">
							<view class="flex">
								<view class="uni-input">{{params.typeTime ? params.typeTime : '预产日期'}} </view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getCategoryList } from '@/util/api/common.js'
	export default{
		props:['mainContact','type'],
		
		data(){
			return{
				params:{
					typeTime:null,	// 日期
				},
			}
		},
	
		methods:{
			save(){
				return this.params
			},
			bindDateChange (e) {
				this.params.typeTime = e.target.value
			},

			//清除日期
			onClickDelTiem(){
				this.params.typeTime = null
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './components/moduleStyle.scss';
</style>
