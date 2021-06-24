<template>
	<view>
		<!-- 客资来源 -->
		<sourceModule ref="source" :type="type"></sourceModule>
		<!-- 宝宝信息 -->
		<babyInfoModule ref="baby" v-if="type === 'BABY'"></babyInfoModule>
		<!-- 客户联系人信息 -->
		<userInfoModule ref="userInfo" :mainContact="mainContact" :secondContact="secondContact" :type="type"></userInfoModule>
		<!-- 结婚日期 -->
		<judgingTimeModule ref="judgingTime" :type="type"/>
		<!-- 开单信息模块 -->
		<openInfoModule ref="info" :addressInfo="addressInfo"></openInfoModule>
		<!-- 订单套系内容 -->
		<priceModule ref="price" :type="type" :giftInfo="giftInfo"></priceModule>
		
		<view class="save" @click="saveBut">保存订单</view>
		<view class="botBox"></view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index.js');
	import { mapGetters } from 'vuex'
	import { getSecondContact, getMainContact } from '@/util/api/common.js'
	import sourceModule from './module/sourceModule.vue'
	import babyInfoModule from './module/babyInfoModule.vue'
	import userInfoModule from './module/userInfoModule.vue'
	import openInfoModule from './module/openInfoModule.vue'
	import priceModule from './module/priceModule.vue'
	import judgingTimeModule from './module/judgingTimeModule.vue'
	import { 
		openWedding, 
		openBaby, 
		openPortray,
		openPregnant,
		openService, 
		openWeddingDress
	} from '@/util/api/shop.js'
	export default {	
		components:{
			sourceModule,
			babyInfoModule,
			userInfoModule,
			openInfoModule,
			priceModule,
			judgingTimeModule
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
		},
		provide() {
			return {
				porThis:this,
			};
		},
		data() {
			return {
				customerId:null,
				// 订单类型
				type:null,
				// 联系人
				addressInfo:null,
				// 工具箱
				toolInfo:null,
				// 礼包
				giftInfo:null,
				openOrderData:{},
				// 主联系人
				mainContact: {
					address: null, //地址
					birthdayLunar: false, //是否农历	
					birthdayTime: null,	//出生日期
					callName: null,	//	联系人称呼
					display:true, //是否显示	
					email: null, //邮箱
					main: true,	//是否主联系人	
					mobile:  null, //手机号码	
					name: null,	//客户姓名	
					qq: null, //QQ
					sex: true, //性别
					tel: null, //固定电话	
					wechat: null //微信
				},
				// 次联系人
				secondContact: {
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
				},
				params:{},
			};
		},
		onLoad(option){
			// this.customerId = option.id
			this.type = option.type
			console.log(this.type)
			// this.customerId = 'b5f893fe998b49cbb47b23a476c18b3d'
			// this.type = 'BABY'
			const result = new Map([
				['WEDDING_DRESS','婚纱开单'],
				['BABY','儿童开单'],
				['PREGNANT','孕妈开单'],
				['SERVICE','服务开单'],
				['PORTRAY','写真开单'],
				['WEDDING','婚庆开单'],
			])
			// 赋值小程序标题
			uni.setNavigationBarTitle({
				title: result.get(this.type)
			});
		},
		onShow(){
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let address = currPage.data.address;
			let tool = currPage.data.tool;
			let gift = currPage.data.gift;
			this.addressInfo = address
			this.toolInfo = tool
			this.giftInfo = gift
		},
		mounted(){
			// 赋值当前门店ID
			this.params.shopId = this.shopId
			// this.getMainContact()
		},
		methods:{
			// 主联系人信息
			getMainContact(){
				getMainContact({customerId:this.customerId}).then(res=>{
					if(res.data.code === 1000){
						this.mainContact = res.data.data
						// 主联系人请求成功 再请求次联系人
						this.getSecondContact()
					}
				})
			},
			// 次联系人信息
			getSecondContact(){
				getSecondContact({customerId:this.customerId}).then(res=>{
					this.secondContact = res.data.data
				})
			},
			saveBut(){
				// 来源
				let source = this.$refs.source.save()
				// 客户信息
				let userInfo = this.$refs.userInfo.save()
				// 判断日期类型
				let judgingTime = this.$refs.judgingTime.save()
				// 开单信息
				let info = this.$refs.info.save()
				// 套系内容
				let price = this.$refs.price.save()

				//融合对象
				Object.assign(source,judgingTime)
				this.params.customerGroup = source
				//判断是否重复联系人
				let newUserInfo = []
				let oldUserInfo = []
				userInfo.forEach(item => {
					if(typeof(item.workUnit) == "undefined"){
						//新
						newUserInfo.push(item);
					}else{
						oldUserInfo.push(item)
					}
				})
				this.params.customerGroup.newCustomerContactDtos = newUserInfo
				this.params.customerGroup.oldCustomerContactDtos = oldUserInfo
				// this.params.customerGroup.newCustomerContactDtos.forEach(_ => {
				// 	_.birthdayTime = _.birthdayTime ? _.birthdayTime : null
				// })
				this.params.typeTime = source.typeTime ? new Date(source.typeTime).getTime() - 60*60*8*1000 : null
				this.params.typeLunar = source.typeLunar
				// 宝宝信息
				if(this.type === 'BABY'){
					let baby = this.$refs.baby.save()
					this.params.customerGroup.newCustomerBabyDtos = baby
					this.params.customerGroup.newCustomerBabyDtos.forEach(_ => {
						_.birthdayTime = _.birthdayTime ? _.birthdayTime : null
					})
				}
				
				Object.assign(this.params,info,price)
				if(!this.params.orderTime){
					$Message({
							content: '请选择开单时间',
							type: 'error'
					});
					return false
				}
				switch(this.type){
					case 'WEDDING_DRESS': //婚纱开单
						this.openWeddingDress()
						break
					case 'BABY': //儿童开单
						this.openBaby()
						break
					case 'PREGNANT': //孕妈开单
						this.openPregnant()
						break
					case 'SERVICE': //服务开单
						this.openService()
						break
					case 'PORTRAY': //写真开单
						this.openPortray()
						break
					case 'WEDDING': //婚庆开单
						this.openWedding()
						break
				}
			},
			// 开单成功跳转
			success(paramId){
				$Message({
						content: '开单成功',
						type: 'success'
				});
				setTimeout(()=>{
					uni.redirectTo({
						url:`../openSuccess/openSuccess?id=${paramId.id}&recordId=${paramId.recordId}`
					})
				},1000)
			},
			// 婚纱开单
			openWeddingDress(){
				openWeddingDress(this.params).then(res=>{
					if(res.data.code === 200){
						let paramId ={
							id: res.data.data.id,
							recordId: res.data.data.recordId
						} 
						this.success(paramId)
					}
				})
			},
			// 儿童开单
			openBaby(){
				openBaby(this.params).then(res=>{
					if(res.data.code === 200){
						let paramId ={
							id: res.data.data.id,
							recordId: res.data.data.recordId
						} 
						this.success(paramId)
					}
				})
			},
			// 孕妈开单
			openPregnant(){
				openPregnant(this.params).then(res=>{
					if(res.data.code === 200){
						let paramId ={
							id: res.data.data.id,
							recordId: res.data.data.recordId
						} 
						this.success(paramId)
					}
				})
			},
			// 服务开单
			openService(){
				openService(this.params).then(res=>{
					if(res.data.code === 200){
						let paramId ={
							id: res.data.data.id,
							recordId: res.data.data.recordId
						} 
						this.success(paramId)
					}
				})
			},
			// 写真开单
			openPortray(){
				
				openPortray(this.params).then(res=>{
					if(res.data.code === 200){
						let paramId ={
							id: res.data.data.id,
							recordId: res.data.data.recordId
						} 
						this.success(paramId)
					}
				})
			},
			// 婚庆开单
			openWedding(){
				openWedding(this.params).then(res=>{
					if(res.data.code === 200){
						let paramId ={
							id: res.data.data.id,
							recordId: res.data.data.recordId
						} 
						this.success(paramId)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.save{
		position: fixed;
		bottom: 30rpx;
		width: 500rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		text-align: center;
		background-color: #61a3ff;
		color: #FFFFFF;
		margin-left: 50%;
		transform: translateX(-50%);
		z-index: 2;
	}
	.botBox{
		height: 140rpx;
	}
</style>
