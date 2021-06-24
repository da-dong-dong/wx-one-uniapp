<template>
	<view>
		<view class="box">
			<view class="titleTop ">
				客户联系人信息
				<!-- <view class="right" v-if="type == 'PORTRAY'" @click="addOne">+</view> -->
				<view class="right"  @click="addOne">+</view>
			</view>
			<view v-for="(item,index) in params" :key="index">
				<view class="bigBox border_reduce" v-if="index>0" >
					<view class="left">
						<view class="title" @click="reduce(index)">-</view>
					</view>
				</view>
				<!-- 昵称 -->
				<callName :callNameArr="callNameArr" :callName.sync="item.callName" :sex.sync="item.sex" :oneShow="index"></callName>
				<!-- 性别 -->
				<!-- <view class="bigBox">
					<view class="left">
						<view class="title">性别</view>
						性别绑定
						<view class="text">{{item.sex ? '男' : '女' }}</view>
						<picker @change="sexChange" :value="sexIndex" :range="sexArr">
							<view class="picker">
								<view class="text">{{sexArr[sexIndex]}}</view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker>
					</view>
				</view> -->
				<!-- 姓名 -->
				<view class="bigBox">
					<view class="left">
						<view class="onRequired">*</view>
						<view class="title">姓名</view>
						<!-- <view class="text">{{item.name}}</view> -->
						<input class="uni-input" type="text" v-model="item.name" placeholder="姓名" />
					</view>
				</view>
				<!-- 电话 -->
				<mobile-model :mobile.sync="item.mobile" @confirmMobile="confirmMobile" :mobileIndex="index" />
				
				<!-- Q Q -->
				<view class="bigBox">
					<view class="left">
						<view class="title">Q Q</view>
						<!-- <view class="text">{{item.qq | noData('QQ')}}</view> -->
						<input class="uni-input" type="text" v-model="item.qq" placeholder="QQ" />
					</view>
				</view>
				<!-- email -->
				<view class="bigBox">
					<view class="left">
						<view class="title">邮箱</view>
						<!-- <view class="text">{{item.qq | noData('QQ')}}</view> -->
						<input class="uni-input" type="text" v-model="item.email" placeholder="邮箱" />
					</view>
				</view>
				<!-- 微信 -->
				<view class="bigBox">
					<view class="left">
						<view class="title">微信</view>
						<!-- <view class="text">{{item.wechat | noData('微信')}}</view> -->
						<input class="uni-input" type="text" v-model="item.wechat" placeholder="微信" />
					</view>
				</view>
				<!-- 生日 -->
				<view class="bigBox last">
					<view class="left deleBox" >
						<view class="title">生日</view>
						<!-- <view class="text">{{item.birthdayTime | time}}</view> -->
						<view class="uni-list-cell-db">
							<!-- 结婚需要农历选择 -->
							<!-- <view v-if="type=='WEDDING_DRESS'">
								<calen-dar-open :Item="item" :Index="index" @changeTime="changeTime"/>
							</view> -->
							<view>
								<picker mode="date" :value="item.birthdayTime" @change="bindDateChange($event, item)">
									<view class="flex">
										<view class="uni-input">{{item.birthdayTime ? item.birthdayTime : '生日' | times}} </view>
										<i-icon class="icon" type="enter" size="16" color="#80848f"/>
									</view>
								</picker>
							</view>
						</view>
						<view class="deleBoxChild" @click="onClickDelTiem(item)" v-if="item.birthdayTime">
							<i-icon class="icon" type="delete" size="24" color="#80848f" />
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import callName from './components/callName.vue'
	import mobileModel from './components/mobileModel.vue'
	import { getCallName } from '@/util/api/goods.js'
	import calenDarOpen from './components/calenDarOpen.vue'
	export default{
		props:['mainContact','secondContact','type'],
		components:{
			callName,
			calenDarOpen,
			mobileModel
		},
		filters:{
			noData(data,text){
				if(Boolean(data)){
					return data
				}else{
					return text
				}
			},
		},
		data(){
			return{
				// 昵称
				callNameArr:null,
				params:[],
				sexIndex: 0,
				sexArr: ['女', '男'],
				
			}
		},
		mounted(){
			this.getCallName()
			this.getMainParams()
			if(this.type != 'PORTRAY'){
				this.getSecondParams()
			}
		},
		methods:{
			sexChange (e) {
				this.sexIndex = e.detail.value
			},
			bindDateChange (e, item) {
				item.birthdayTime = new Date(e.target.value).getTime()
			},
			// 获取昵称
			getCallName(){
				getCallName({type:this.type,isAdults:true}).then(res=>{
					this.callNameArr = res.data.data
				})
			},
			// 主联系人赋值
			getMainParams(){
				// let m = this.mainContact
				// let p = {
				// 	address:m.address,	//地址	
				// 	birthdayLunar: (m.birthdayLunar == 0) ? false : true,	//是否农历	
				// 	birthdayTime:Boolean(m.birthdayTime) ? Date.parse(new Date(m.birthdayTime)) : null,	//出生日期	
				// 	callName:null,	//	联系人称呼
				// 	ccId:m.customerId,	//从客户ID	
				// 	customerId:m.customerId,	//主客户ID	
				// 	display:true,	//是否显示	
				// 	email:m.email,	//邮箱
				// 	main:true,	//是否主联系人	
				// 	mobile:m.phone,	//手机号码	
				// 	name:m.name,	//客户姓名	
				// 	qq:m.qqNumber,	//QQ
				// 	sex:Boolean(m.sex === '男') ? true : false,	//性别
				// 	tel:m.telphone,	//固定电话	
				// 	wechat:m.wxNumber,	//微信
				// }
				this.params.push(this.mainContact)
				this.$forceUpdate()
			},
			// 次联系人赋值
			getSecondParams(){
				let p = {
					address: null, //地址
					birthdayLunar: false, //是否农历	
					birthdayTime: null,	//出生日期
					callName: null,	//	联系人称呼
					display:true, //是否显示	
					email: null, //邮箱
					main: false,	//是否主联系人	
					mobile:  null, //手机号码	
					name: null,	//客户姓名	
					qq: null, //QQ
					sex: true, //性别
					tel: null, //固定电话	
					wechat: null //微信
				}
				this.params.push(p)
				this.$forceUpdate()
			},
			
			//添加多个联系人
			addOne(){
				this.getSecondParams()
			},
			//减少联系人
			reduce(index){
				this.params.splice(index,1)
			},
			//新婚农历修改
			changeTime(value){
				let {val,index} =  value
				this.params[index].birthdayTime = val
			},

			//确认号码
			confirmMobile(val,index){
				//赋值
				Object.assign(this.params[index], val);
				
				this.$forceUpdate()
			},

			//清除日期
			onClickDelTiem(item){
				item.birthdayTime = null
			},
			
			save(){
				//判断第二个联系人
				let params = JSON.parse(JSON.stringify(this.params))
				if(params.length > 1){
					params.map((item,index)=>{
						if(index > 0){
							if(item.name == null || item.name == ''){
								params.splice(index,1)
							}else{
								if(item.mobile == ''){
									item.mobile = null
								}
							}
						}
					})
				}
				return params
			}
		},
		watch:{
			secondContact(){
				this.getSecondParams()
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
	.border_reduce{
		//padding: 0;
		.left{
			font-size: 60rpx;
    		font-weight: bold;
			place-content: flex-end;
			.title{
				width: 30rpx;
				height: 30rpx;
				line-height: 20rpx;
				margin: 0;
			}
		}
	}
</style>
