<template>
	<view>
		<view class="bigBox">
			<view class="left">
				<i-icon type="homepage_fill" size="28" color="#61A3FF"/>
				<view class="title">企业</view>
			</view>
			<picker @change="change" :value="index" :range="arr">
				<view class="textBox">
					<view class="text">{{show}}</view>
					<i-icon type="unfold" size="16" color="#333333"/>
				</view>
			</picker>
		</view>
		<view class="button" @click="enCCID">确定</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters, mapActions } from 'vuex'
	import { getHaveEnterprise } from '@/util/api/common.js'
	export default {
		computed:{
			...mapGetters('app',[
				'get_ccId',
			]),
		},
		data() {
			return {
				enterpriseInfo:[],
				index:0,
				arr:[],
				show:'请选择',
				ccId:null,
			};
		},
		mounted(){
			uni.hideHomeButton()
			$Message({
				content: '请选择企业',
				type: 'warning'
			});
			this.getHaveEnterprise()
		},
		methods:{
			...mapActions('app',[
				'act_ccId'
			]),
			getHaveEnterprise(){
				getHaveEnterprise().then(res=>{
					if(res.data.code === 400){
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pages/login/login'
							})
						},1000)
					}else{
						this.enterpriseInfo = res.data.data
						this.arr = this.enterpriseInfo.map((i)=>{ return i.name })
						if(this.get_ccId){
							this.index = this.enterpriseInfo.findIndex((i)=>{ return this.get_ccId === i.enterpriseNo})
							this.show = this.enterpriseInfo[this.index].name
							this.ccId = this.enterpriseInfo[this.index].enterpriseNo
						}
						if(this.arr.length === 1){
							this.show = this.enterpriseInfo[this.index].name
							this.ccId = this.enterpriseInfo[this.index].enterpriseNo
							this.enCCID()
						}
					}
				})
			},
			change(e){
				this.index = e.detail.value
				this.ccId = this.enterpriseInfo[this.index].enterpriseNo
				this.show = this.enterpriseInfo[this.index].name
			},
			enCCID(){
				if(this.ccId){
					if(this.ccId === this.get_ccId){
						uni.switchTab({
							url:'/pages/index/index'
						})
					}else{
						let that = this
						uni.setStorage({
							key:'ccId',
							data:that.ccId
						})
						this.act_ccId(this.ccId)
					}
				}else{
					$Message({
						content: '请选择企业',
						type: 'warning'
					});
				}
			},
		},
	}
</script>

<style lang="scss">
	.bigBox{
		display: flex;
		width: 570rpx;
		padding: 15rpx;
		border-radius: 100rpx;
		border: 1rpx solid #dbdde1;
		margin-top: 150rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		.left{
			margin-right: 30rpx;
			padding-right: 30rpx;
			display: flex;
			border-right: 1rpx solid #DDDDDD;
			.title{
				line-height: 58rpx;
			}
		}
		.textBox{
			display: flex;
			justify-content: space-between;
			line-height: 58rpx;
			.text{
				max-width: 330rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	
	.button{
		width: 600rpx;
		height: 80rpx;
		margin-top: 100rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		background-color: #61A3FF;
		color: #FFFFFF;
		text-align: center;
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
