<template>
	<view>
		<view class="topBox">
			<view class="topBut">
				<view class="switchStores" @click="switchStores" v-if="switchBool">切换企业</view>
				<view class="switchStores" > </view>
				<view class="SignIn" @click="SignIn">登出</view>
			</view>
			
			<view class="avatarBox">
				<image :src="get_userInfo.portrait ? get_userInfo.portrait : 'https://storagetest.lyfz.net/static/img/default-user.jpg'" mode=""  class="avatar"></image>
			</view>
			<view class="name">{{get_userInfo.name}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">电话</view>
			<view class="text">{{get_userInfo.mobile}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">工号</view>
			<view class="text">{{get_userInfo.jobNumber}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">生日</view>
			<view class="text">{{get_userInfo.birthday | time}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">性别</view>
			<view class="text">{{get_userInfo.sex ? '男' : '女'}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">邮件</view>
			<view class="text">{{get_userInfo.email}}</view>
		</view>

		<view class="listBox" @click="onClickModify">
			<view class="title">修改密码</view>
			<view class="text"></view>
		</view>

		<!-- 弹窗组件修改 -->
		<pop-input v-if="popShow" @offPopShow="offPopShow"/>
		
		<i-message id="message" />
		<tabBar :index="5"></tabBar>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import { getHaveEnterprise } from '@/util/api/common.js'
	import popInput from '@/pages/login/components/pop-input.vue'
	export default {
		components:{popInput},
		computed:{
			...mapGetters('app',[
				'get_userInfo'
			])
		},
		data() {
			return {
				switchBool: false,
				//展示修改密码弹窗
				popShow:false,
			};
		},
		methods:{
			...mapActions('app',[
				'act_ticket',
				'act_ccId',
				'act_userInfo'
			]),
			// 登出
			SignIn(){
				uni.removeStorage({
					key: 'ticket',
				});
				this.act_ticket(null)
				this.act_ccId(null)
				uni.redirectTo({
					url:'/pages/login/login'
				})
			},
			// 切换企业
			switchStores(){
				uni.navigateTo({
					url:'/pages/enterprise/enterprise'
				})
			},
			getHaveEnterprise(){
				getHaveEnterprise().then(res=>{
					this.switchBool = res.data.data.length > 1
				})
			},

			// 修改密码
			onClickModify(){
				this.popShow = true
			},
			//关闭弹窗
			offPopShow(val){
				this.popShow = val
			}
		},
		created () {
			this.getHaveEnterprise()
		}
	}
</script>

<style lang="scss" scoped>
	.topBox{
		.topBut{
			display: flex;
			justify-content: space-between;
			color: #FFFFFF;
			font-size: 28rpx;
			text-align: right;
			.SignIn,.switchStores{
				padding: 0 30rpx;
				padding-top: 10rpx;
			}
		}
		// padding-top: 20rpx;
		background-color: #61a3ff;
		border-bottom: 20rpx solid #e7e5f4;
		width: 100%;
		.avatarBox{
			width: 200rpx;
			height: 200rpx;
			margin: 0 auto;
			.avatar{
				width: 180rpx;
				height: 180rpx;
				border: 10rpx solid #007AFF;
				overflow: hidden;
				border-radius: 50%;
			}
		}
		.name{
			color: #FFFFFF;
			font-size: 36rpx;
			text-align: center;
			margin-top: 30rpx;
			padding-bottom: 50rpx;
		}
	}
	.listBox{
		font-size: 34rpx;
		margin: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #e7e5f4;
		display: flex;
		justify-content: space-between;
	}
	// .switchStores{
	// 	font-size: 30rpx;
	// 	background-color: #61a3ff;
	// 	color: #FFFFFF;
	// 	width: 180rpx;
	// 	height: 66rpx;
	// 	border-radius: 33rpx;
	// 	text-align: center;
	// 	line-height: 66rpx;
	// 	margin: 0 auto;
	// }
</style>
