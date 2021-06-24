<template>
	<view>
		<view class="titleTop">主 联系人</view>
		<view class="listBox">
			<view class="title">姓名</view>
			<input type="text" placeholder="姓名" v-model="params.name"/>
		</view>
		<view class="listBox">
			<view class="title">性别</view>
			<picker
				@change="enList"
				:value="index" 
				:range="sexArr" 
			>
				<view class="picker">
					<view class="text">{{params.sex?'男':'女'}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
		<!-- 手机 -->
		<mobile-model :mobile.sync="params.mobile" @confirmMobile="confirmMobile" :mobileIndex="0" />
		<view class="listBox">
			<view class="title">Q Q</view>
			<input type="number" placeholder="QQ" v-model="params.qq"/>
		</view>
		<view class="listBox">
			<view class="title">微信</view>
			<input type="text" placeholder="微信号" v-model="params.wechat"/>
		</view>
		<!-- 客户区域 -->
		<!-- <category :city="params.city" :province="params.province" :region="params.region" @getCategory="getCategory"></category> -->
		<!-- <view class="listBox">
			<view class="title">区域</view>
			<view class="flex_all">
				<picker @change="changeRegion" :value="indexRegion" :range="arrRegion">
					<view class="flex">
						<view class="uni-input">{{arrRegion[indexRegion]}}</view>
						<i-icon class="icon" type="enter" size="16" color="#80848f"/>
					</view>
				</picker>
			</view>
		</view> -->
		<!-- 来源 -->
		<!-- <userSource :soureId="params.soureId" @getOrigin="getOrigin"></userSource> -->
		<!-- 生日 -->
		<view class="listBox">
			<view class="title">生日</view>
			<view class="flex_all">
				<picker mode="date" :value="params.birthdayTime" @change="bindDateChange($event, params)">
					<view class="flex">
						<view class="uni-input">{{params.birthdayTime ? params.birthdayTime : '生日' | times}} </view>
						<i-icon class="icon" type="enter" size="16" color="#80848f"/>
					</view>
				</picker>
			</view>
		</view>
		
		
		<view class="button" v-if="oldUser" @click="save('update')">修改录入</view>
		<view class="button" v-else @click="save('add')">保存录入</view>
		
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
		<i-message id="message" />
		
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index.js');
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import userSource from '../components/userSource.vue'
	import { addCustomer, updateCustomer, getCategoryList} from '@/util/api/common.js'
	import mobileModel from '../components/mobileModel.vue'
	export default {
		components:{
			uniCalendar,
			userSource,
			mobileModel
		},
		data() {
			return {
				arrRegion:[],	//客户区域数据
				indexRegion:0, //客户区域索引

				type:null,
				showTime:'生日',
				index:0,
				sexArr:['男','女'],
				// 重复客资信息
				repeatData:null,
				oldUser:null,
				params:{
					address: null, // 区域
					birthdayLunar: false, // 生日是否农历
					birthdayTime: null, // 生日
					mobile: null, 
					name: null, //姓名
					qq: null,
					sex: true, // 性别
					wechat: null,
					workUnit: null,

				}
			};
		},
		onLoad(op){
			this.type = op.type
		},
		created(){
			getCategoryList({ type: 'CUSTOMER_REGION' }).then(res => {
				console.log('客户区域', res)
				this.otherSourceRegion = res.data.data
				//优化客户区域
				let arrRes = this.otherSourceRegion.filter(_ => _.level === 2)
				this.arrRegion = arrRes.map((i)=>{ return i.name })

				//可为空
				this.arrRegion.unshift('')

				//默认取值
				this.params.address = this.arrRegion[this.indexRegion]
			})
		},
		methods:{
			save(type){
				if(this.oldUser){
					delete this.params.customerContacts
					this.params.extend = null
					this.updateCustomer()
				}else{
					if(this.params.name !== null ){
						if(this.params.mobile && this.params.mobile.length == '11'){
							// if(!this.params.id){
							// 	this.addCustomer()
							// }else{
							// 	$Message({
							// 		content: '客户资料已存在手机号码',
							// 		type: 'error'
							// 	});
							// }
							this.addCustomer()
							
						}else{
							$Message({
								content: '手机11位数',
								type: 'warning'
							});
						}
						
					}else{
						$Message({
								content: '主联系人名字不能为空',
								type: 'warning'
						});
					}
				}
			},
			// 日历选中确定返回值
			enSure(e){
				this.showTime = e.fulldate
				this.params.birthdayTime = `${this.showTime} 0:0:0`
			},
			enList(e){
				this.index = e.detail.value
				this.params.sex = this.sexArr[this.index] == '男'? true : false
			},

			// 新增
			addCustomer(){
				let url
				let toStriongParams = JSON.stringify(this.params);
				if(this.type === 'individual'){
					//散客
					url = '../individualOrder/addIndividual/addIndividual?id=' + toStriongParams
				}else{
					//保留金
					url = '../retention/retentionChange/retentionChange?type=add&id=' + toStriongParams
				}
				uni.redirectTo({
					url:url
				})
			},
			// 修改
			updateCustomer(){
				updateCustomer(this.params).then(res=>{
					if(res.data.code === 1000){
						let url
						if(this.type === 'individual'){
							url = '../individualOrder/addIndividual/addIndividual?id=' + res.data.data.customerId
						}else{
							url = '../retention/retentionChange/retentionChange?type=add&id=' + res.data.data.customerId
						}
						uni.redirectTo({
							url:url
						})
					}
				})
			},

			//电话绑定
			confirmMobile(mobileList){
				Object.assign(this.params,mobileList)
				console.log(mobileList)
			},
			//生日
			bindDateChange (e, item) {
				item.birthdayTime = new Date(e.target.value).getTime()
			},
			//客户区域
			changeRegion(val){
				let index = val.detail.value
				this.indexRegion = index
				this.params.address = this.arrRegion[index]
			},
		},
	}
</script>

<style lang="scss">
	.flex{
		display: flex;
		justify-content: space-between;
	}
	.flex_all{
		width: 605rpx;
	}
	.titleTop{
		font-size: 38rpx;
		margin: 20rpx 30rpx;
		font-weight: bold;
	}
	.listBox{
		display: flex;
		font-size: 28rpx;
		margin: 0 30rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
		.title{
			margin-right: 30rpx;
		}
		.dayRight{
			display: flex;
			justify-content: space-between;
			.time{
				width: 450rpx;
			}
			.lunar{
				display: flex;
			}
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
				margin: -10rpx -20rpx -20rpx 0;
				transform:scale(0.5);
			}
		}
		.text{
			color: #8d8d8d;
			width: 480rpx;
		}
		input{
			width: 400rpx;
			margin-top: -7rpx;
		}
		.picker{
			display: flex;
			justify-content: space-between;
			width: 605rpx;
		}
	}
	.button{
		position: fixed;
		bottom: 30rpx;
		width: 600rpx;
		color: #FFFFFF;
		background-color: #61A3FF;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin: 0 auto;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-bottom: 30rpx;
	}
</style>
