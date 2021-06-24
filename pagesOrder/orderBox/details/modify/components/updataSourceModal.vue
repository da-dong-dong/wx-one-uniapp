/************************************ 编辑客户来源 ***********************************/
<template>
	<view class="bigBox">
		<view class="box">			
			<view class="titleBox">
				<view class="title">编辑客户来源</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
				
			<view class="mainBox">
				<!-- 客户来源 -->
				<view class="listBox">
					<view class="titleB">
						<view class="title">客户来源：</view>
					</view>
					<picker @change="changeCustomer" :value="indexCustomer" :range="arrCustomer" class="flex_all" >
						<view class="textBox">
							<view class="text">{{source}}</view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>	
				<!-- 介绍人 -->
				<view class="listBox">
					<view class="titleB">
						<view class="title">介绍人：</view>
					</view>
					<view class="textBox">
						<input class="input" type="text" v-model="params.referrerName" placeholder="介绍人" />
					</view>
				</view>
				<!-- 手机号码 -->
				<view class="listBox">
					<view class="titleB"> 
						<view class="title">手机号码：</view>
					</view>
					<view class="textBox">
						<input class="input" type="number" v-model="params.referrerMobile" placeholder="手机号码" />
					</view>
				</view>
			</view>
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view :class="!fnPermissionShopId('STORE_DETAILS_CUS_ORIGIN')?'':'fn_back'" class="ok" @click="ok">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { updataSource } from '@/util/api/shop.js'
	import { getCategoryList } from '@/util/api/common.js'
	export default {
		props:['openInfo'],
		computed:{
			...mapGetters('shopArr',[
				// 来源
				'get_origin',
			])
		},
		data() {
			return {
				// 显示
				source:null,

				arrCustomer:[], //客户来源数据
				indexCustomer:0, //客户来源索引
				
				params:{}
			};
		},
		mounted(){
			let info = {
				originStr:this.openInfo.customerGroupVo.originStr,
				orderId:this.openInfo.orderId,
				referrerMobile:this.openInfo.customerGroupVo.referrerMobile,
				referrerName:this.openInfo.customerGroupVo.referrerName,
			}
			this.params = info

			getCategoryList({ type: 'CUSTOMER_SOURCE' }).then(res => {
				console.log('来源', res)
				console.log('openInfo',this.openInfo)
				this.otherSourceList = res.data.data
				//优化客户来源
				let arrRes = this.otherSourceList.filter(_ => _.level === 2)
				this.arrCustomer = arrRes.map((i)=>{ if(i.name.indexOf("删除") == -1 ){return i.name }else{return ""}})

				//显示
				this.source = this.params.originStr
			})
		},
		methods:{
			
			//客户来源
			changeCustomer(val){
				let index = val.detail.value
				this.indexCustomer = index
				this.params.originStr = this.arrCustomer[index]
				this.source = this.arrCustomer[index]
			},
			
			// 取消
			cancel(){
				this.$emit('cancel')
			},
			// 保存
			ok(){
				updataSource(this.params).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './updataModal.scss';
	input{
		margin-top: 15rpx !important;
	}
	.flex_all{
		width: 60%;
	}
</style>