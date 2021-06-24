/******************************** 忘记密码 ***************************************/
<template>
	<view class="bigBox">
		<!-- 输入手机号 -->
		<view class="ip">
			<view class="left">
				<i-icon class="icon" type="mine_fill" size="28" color="#61A3FF" />
				<input type="text" placeholder="请输入手机号" v-model="ticketBody.phone"/>
			</view>
			<view class="close" @click="close(1)">
				<i-icon type="delete" size="28" color="#80848f" />
			</view>
		</view>
		
		<!-- 输入密码 -->
		<view class="ip">
			<view class="left">
				<i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
				<input type="password" placeholder="请输入新密码" v-model="ticketBody.password"/>
			</view>
			<view class="close" @click="close(2)">
				<i-icon type="delete" size="28" color="#80848f" />
			</view>
		</view>

		<!-- 手机验证码 -->
		<view class="fillPone">
			<view class="left_border">
				<view class="left">
					<i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
					<input type="text" placeholder="请输入手机验证码" v-model="ticketBody.code"/>
				</view>
				<view class="close" @click="close(3)">
					<i-icon type="delete" size="28" color="#80848f" />
				</view>
			</view>
			<view class="let_text" @click="onClickText">
				{{showText}}
			</view>
		</view>
		
		<!-- 图形验证码 -->
		<popInput v-if="popShow" :phone="ticketBody.phone" @offPopShow="offPopShow"/>
		<!-- 登录按键 -->
		<view class="but" @click="login">确定重置密码</view>

		<!-- 忘记密码 -->
		<view class="forget" @click="forget">返回登录</view>
		<i-message id="message" />
	</view>
</template>

<script>
	import { findBackPassword } from '@/util/api/common.js'
	import { mapGetters, mapActions } from 'vuex'
	const { $Message } = require('@/wxcomponents/base/index');
	import popInput from './components/pop-input.vue'
	export default {
		components:{popInput},
		data() {
			return {
				// 获取ticket的包体
				ticketBody: {
					phone:null,
					password:null,
					code:null,
				},
				//展示修改验证码弹窗
				popShow:false,
				showText:'发送验证码',
				time:null,
				timeNub:60
				
			};
		},
		onLoad(){
		},
		mounted(){
		},
		methods:{
			...mapActions('app',[
				'act_ticket'
			]),
			// 发送短信弹窗
			onClickText(){
				//判断为空
				let {phone} = this.ticketBody;
				
				if(!(/^1[34578]\d{9}$/.test(phone))){
					$Message({
						content: '手机号码有误，请重填',
						type: 'error'
					});
					return
				}
				if(this.time) return 
				this.time= setInterval(() => {
					this.timeNub--
					this.showText = `${this.timeNub}秒后重发`
					if(this.timeNub == 0){
						clearInterval(this.time)
						this.time = null
						this.showText = '发送验证码'
						this.timeNub = 60
					}
				}, 1000);
				this.popShow = true
				
			},
			
			// 清空输入框input
			close(i){
				// 清空手机号
				if(i == 1){
					this.ticketBody.phone = null
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
				let {phone,password,code} = this.ticketBody;

				if(!(/^1[34578]\d{9}$/.test(phone))){
					$Message({
						content: '手机号码有误，请重填',
						type: 'error'
					});
					return
				}
				
				if(!phone || !password){
					$Message({
						content: !phone?'手机号不能为空！':'密码不能为空！',
						type: 'error'
					});
					return
				}
				findBackPassword(this.ticketBody).then(res=>{
					let data = res.data
                    console.log(data)
                    switch (data.code) {
                        // code 判断
                        case 1000:
                            $Message({
                                content: '密码设置成功，请重新登陆',
                                type: 'success'
							});
							setTimeout(() => {
								this.forget()
							}, 1000);
                            break;
                    }      
				}).catch(err=>{
					console.log(err)
				})
			},

			// 返回上级
			forget(){
				uni.navigateBack()
			},
			
			//关闭弹窗
			offPopShow(val){
				this.popShow = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fillPone{
		width: 590rpx;
		padding: 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 50rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		.left_border{
			display: flex;
			padding: 15rpx 10rpx;
			width: 335rpx;
			justify-content: space-between;
			align-items: center;
			border-radius: 100rpx;
			border: 1rpx solid #dbdde1;
		}
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
	.let_text{
		width: 232rpx;
		text-align: right;
	}
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
