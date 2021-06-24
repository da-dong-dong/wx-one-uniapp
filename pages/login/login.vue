<template>
	<view class="bigBox">
		
		<!-- 输入手机号 -->
		<view class="ip">
			<view class="left">
				<i-icon class="icon" type="mine_fill" size="28" color="#61A3FF" />
				<input type="text" placeholder="请输入用户名或手机号" v-model="ticketBody.unumber"/>
			</view>
			<view class="close" @click="close(1)">
				<i-icon type="delete" size="28" color="#80848f" />
			</view>
		</view>
		
		<!-- 输入密码 -->
		<view class="ip">
			<view class="left">
				<i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
				<input style="width: 430rpx" type="password" placeholder="请输入密码" v-model="ticketBody.password"/>
			</view>
			<view class="close" @click="close(2)">
				<i-icon type="delete" size="28" color="#80848f" />
			</view>
		</view>

		<!-- 三次错误弹出验证码 -->
		<view class="ip" v-if="showFlag">
			<view class="left">
				<i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
				<input type="text" placeholder="请输入验证码" v-model="ticketBody.code"/>
			</view>
			<view>
				<img :src="codeImg" class="img_code" @click="getCaptcha"  alt="验证码" title="点击换一张">
			</view>
			<view class="close" @click="close(3)">
				<i-icon type="delete" size="28" color="#80848f" />
			</view>
		</view>
		
		<!-- 登录按键 -->
		<view class="but" @click="login">登录</view>

		<!-- 忘记密码 -->
		<view class="forget" @click="forget">忘记密码</view>

		<!-- 弹窗组件 -->
		<pop-input v-if="popShow" @offPopShow="offPopShow"/>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import { getTicket,captcha } from '@/util/api/common.js'
	import { mapGetters, mapActions } from 'vuex'
	const { $Message } = require('@/wxcomponents/base/index');
	import popInput from './components/pop-input.vue'
	export default {
		components:{popInput},
		computed:{
			...mapActions('app',[
				'get_userInfo'
			]),
			
		},
		data() {
			return {
				// 获取ticket的包体
				ticketBody: {
					unumber:null,
					password:null,
					service:"",
					code:"",
					app:"erp"
				},
				//展示修改密码弹窗
				popShow:false,
				//验证码图片
				codeImg:'',
				//显示错误验证码
				showFlag:false,
			};
		},
		onLoad(){
			uni.hideHomeButton()
		},
		mounted(){
		},
		methods:{
			...mapActions('app',[
				'act_ticket'
			]),

			//获取验证码
			getCaptcha(){
				 this.codeImg = `${captcha}?num=${Math.random()}`;
			},
			
			// 清空输入框input
			close(i){
				// 清空手机号
				if(i == 1){
					this.ticketBody.unumber = null
					// 清空密码
				}else if(i == 2){
					this.ticketBody.password = null
				}else if(i == 3){
					this.ticketBody.code = null
				}
			},
			// 登录
			login(){
				//判断为空
				let {unumber,password,code} = this.ticketBody;
				
				if(!unumber || !password){
					$Message({
						content: !unumber?'用户名不能为空！':'密码不能为空！',
						type: 'error'
					});
					return
				}
				//判断是否出现验证码
				if(this.num>=3){
					if(!code){
						$Message({
							content:'验证码密码不能为空！',
							type: 'error'
						});
						return
					}
				}
				getTicket(this.ticketBody).then(res=>{
					console.log('登陆按钮：',res)
					//判断是否首次登陆
					if(res.data.code == 3008){
						console.log('弹窗修改密码！');
						this.popShow = true
					}
					//判断错误次数
					if(res.data.code == 3101){
						this.showFlag = true
						this.getCaptcha()
					}
					uni.setStorage({
						key:'ticket',
						data:res.data.data.ticket
					})
					this.act_ticket(res.data.data.ticket)
					uni.redirectTo({
						url:'/pages/enterprise/enterprise'
					})
				}).catch(err=>{
					console.log(err)
				})
			},
			
			// 忘记密码
			forget(){
				console.log('aaaa')
				uni.navigateTo({
					url:'/pages/forget/forget'
				})
			},

			//关闭弹窗
			offPopShow(val){
				this.popShow = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ip{
		display: flex;
		justify-content: space-between;
		width: 570rpx;
		padding: 15rpx;
		border-radius: 100rpx;
		border: 1rpx solid #dbdde1;
		margin-top: 50rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		.left{
			display: flex;
			>view{
				margin-top: 6rpx;
				padding-right: 15rpx;
			}
		}
		input{
			margin-top: 6rpx;
		}
	}
	.ip:nth-child(1){
		margin-top: 200rpx;
		.icon{
			margin-right: 15rpx;
		}
	}
	.ip:nth-child(2){
		.icon{
			margin-right: 15rpx;
		}
	}
	.ip:nth-child(3){
		.icon{
			margin-right: 15rpx;
		}
	}
	.but{
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
	.img_code{
		width: 150rpx;
		height: 45rpx;
	}
	.forget{
		text-align: center;
		margin-top: 60rpx;
	}
</style>
