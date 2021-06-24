/*****************************  修改客户信息  *******************************/
<template>
	<view class="bigBox">
		<view class="mainBox" v-if="type === 'BABY'">
			<view class="titleBox">
				<view class="title">宝宝信息</view>
				<view class="add" @click="addBaby">新增</view>
			</view>
			<view class="infoList" v-for="(item, index) in baby" :key="item.id">
				<babyList ref="baby" :info="item" :callNameList="babyCallNameList"></babyList>
			</view>
		</view>
		
		<view class="mainBox">
			<view class="titleBox">
				<view class="title">客户信息</view>
				<view class="add" @click="addPerson">新增</view>
			</view>
			<view class="infoList" v-for="(item,index) in person" :key="item.id">
				<personList ref="person" :info="item" :callNameList="personCallNameList"></personList>
			</view>
		</view>
		
		<view  :class="!fnPermissionShopId('STORE_DETAILS_CUSTOMER')?'':'fn_back'" class="save" @click="save">保存</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import babyList from './list/babyList.vue'
	import personList from './list/personList.vue'
	import { getCallName } from '@/util/api/goods.js'
	import { mapGetters } from 'vuex'
	import { getOrderDetails, updataPersonnel } from '@/util/api/shop.js'
	export default {
		components:{
			babyList,
			personList
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			])
		},
		data() {
			return {
				// 订单类型
				type:null,
		
				// 宝宝昵称列表
				babyCallNameList:[],
				// 客户昵称列表
				personCallNameList:[],
							
				person:[],
				baby:[],
					
				// 接口params
				personnelInfo:{
					addCustomerBabyDtos:[], // 新增宝宝
					addCustomerContactDtos:[], // 新增客户
					orderId:null, //订单ID
					shopId:null, // 当前门店ID
					updateCustomerBabyDtos:[], // 修改宝宝
					updateRelationCustomerContactDtos:[], // 修改客户
				}
			};
		},
		onLoad(option){
			getOrderDetails({orderId:Number(option.id)}).then(res=>{
				let data = res.data.data
				this.type = data.type
				if(data.type === 'BABY'){
					this.getCallName(false)
				}
				this.getCallName(true)
				// 客户组ID
				this.personnelInfo.orderId = Number(option.id)
				// 获取客户列表
				this.person = data.customerGroupVo.relationCustomerContactVos
				// 获取宝宝列表
				this.baby = data.customerGroupVo.customerBabyVos
			})
		},
		mounted(){
			// 当前门店ID
			this.personnelInfo.shopId = this.shopId
		},
		methods:{
			// 添加宝宝
			addBaby(){
				let info={
					birthdayLunar:null, //生日是农历还是阴历
					birthdayStr:null, //出生日期	
					birthdayTime:null, //出生日期	
					callName:this.babyCallNameList[0].name, //宝宝称呼	
					ccId:null, //从客户ID	
					customerId:null, //主客户ID	
					display:null, //是否显示	
					name:null, //宝宝姓名	
					sex:this.babyCallNameList[0].sex, //性别，false：女，true：男
					zodiac:null, //生肖
				}
				if(this.baby.length >= 3){
					$Message({
						content: '宝宝不能超过三个',
						type: 'warning'
					});
				}else{
					this.baby.push(info)
				}
			},
			
			// 新增客户
			addPerson(){
				let info = {
					address: null, //地址
					birthdayLunar: null, //是否农历	
					birthdayTime: null, //出生日期	
					callName: this.personCallNameList[0].name, //联系人称呼	
					ccId: null, //从客户ID	
					customerId: null, //主客户ID	
					display: null, //是否显示
					email: null, //邮箱
					main: null, //是否主联系人
					mobile: null, //手机号码
					name: null, //客户姓名
					qq: null, //QQ
					sex: this.personCallNameList[0].sex, //性别，false：女，true：男
					tel: null, //固定电话
					wechat: null, //微信
				}
				if(this.person.length >= 2){
					$Message({
						content: '客户不能超过两个',
						type: 'warning'
					});
				}else{
					this.person.push(info)
				}
			},
			
			// 获得昵称
			getCallName(bool){
				getCallName({isAdults:bool , type:this.type}).then(res=>{
					if(bool){
						this.personCallNameList = res.data.data
					}else{
						this.babyCallNameList = res.data.data
					}
				})
			},
			
			// 删除宝宝
			delBaby(index){
				// 获取删除对象
				let delBaby = this.babyDtos[index]
				if(delBaby.id){
					this.personnelInfo.deleteBabyIds.push(delBaby.id)
				}
				this.babyDtos.splice(index,1)
			},
			// 删除客户
			delPerson(index){
				// 获取删除对象
				let delPerson = this.personDtos[index]
				if(delPerson.id){
					this.personnelInfo.deleteRelationIds.push(delPerson.id)
				}
				this.personDtos.splice(index,1)
			},
			
			save(){
				let addB = []
				let updateB = []
				let addP = []
				let updateP = []
				if(this.type === 'BABY'){
					this.$refs.baby.forEach((i)=>{
						let babyInfo = i.save()
						if(babyInfo.id){
							updateB.push(babyInfo)
						}else{
							addB.push(babyInfo)
						}
					})
				}
				
				this.$refs.person.forEach((i)=>{
					let personInfo = i.save()
					if(personInfo.id){
						updateP.push(personInfo)
					}else{
						addP.push(personInfo)
					}
				})
				this.personnelInfo.updateCustomerBabyDtos = updateB
				this.personnelInfo.addCustomerBabyDtos = addB
				this.personnelInfo.updateRelationCustomerContactDtos = updateP
				this.personnelInfo.addCustomerContactDtos = addP
				
				updataPersonnel(this.personnelInfo).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: '修改成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.bigBox{
	.mainBox{
		.titleBox{
			display: flex;
			justify-content: space-between;
			border-left: 8rpx solid #61A3FF;
			margin: 10rpx 30rpx;
			.title{
				margin-left: 30rpx;
			}
			.add{
				background-color: #61A3FF;
				font-size: 24rpx;
				width: 80rpx;
				height: 40rpx;
				border-radius: 10rpx;
				line-height: 40rpx;
				text-align: center;
				color: #FFFFFF;
				margin: auto 0;
			}
		}
		.infoList{
			.delBox{
				display: flex;
				flex-direction: row-reverse;
				.del{
					background-color: #FF0000;
					font-size: 24rpx;
					width: 80rpx;
					height: 40rpx;
					border-radius: 10rpx;
					line-height: 40rpx;
					text-align: center;
					color: #FFFFFF;
					margin: auto 30rpx;
				}
			}
		}
	}

	.save{
		width:650rpx;
		height:80rpx;
		line-height:80rpx;
		color:#FFFFFF;
		background-color: #61A3FF;
		text-align: center;
		margin: 130rpx auto;
		border-radius: 40rpx;
	}
}
</style>
