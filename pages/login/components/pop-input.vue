<template>
    <view>
        <view class="show-box-bg wx-login-box">
            <view class="conten">
                <view class="conten_hed">
                    修改登陆密码
                </view>
                <!-- 输入手机号 -->
                <view class="ip">
                    <view class="left">
                        <i-icon class="icon" type="mobilephone_fill" size="28" color="#61A3FF" />
                        <input type="text" placeholder="请输入用户名或手机号" v-model="modify.phone"/>
                    </view>
                    <view class="close" @click="close(1)">
                        <i-icon type="delete" size="28" color="#80848f" />
                    </view>
                </view>
                 <!-- 请输入旧密码 -->
                 <view class="ip">
                    <view class="left">
                        <i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
                        <input type="password" placeholder="请输入旧密码" v-model="modify.oldPassword"/>
                    </view> 
                    <view class="close" @click="close(2)">
                        <i-icon type="delete" size="28" color="#80848f" />
                    </view>
                </view>
                 <!-- 请输入新密码 -->
               <view class="ip">
                    <view class="left">
                        <i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
                        <input type="password" placeholder="请输入新密码" v-model="modify.newPassword"/>
                    </view>
                    <view class="close" @click="close(3)">
                        <i-icon type="delete" size="28" color="#80848f" />
                    </view>
                </view>
                 <!-- 请确认密码 -->
                 <view class="ip right">
                    <view class="left">
                        <i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
                        <input type="password" placeholder="请确认密码" v-model="modify.newAgainPassword"/>
                    </view>
                    <view class="close" @click="close(4)">
                        <i-icon type="delete" size="28" color="#80848f" />
                    </view>
                </view>
            </view>
            <!-- 确认按钮 -->
            <view class="but" @click="onClickBtn">确认</view>
        </view>
        <i-message id="message" />
    </view>
</template>

<script>
const { $Message } = require('@/wxcomponents/base/index');
import { modifyPassword } from '@/util/api/common.js'
    export default {
        props:['textmsg'],
        data() {
            return {
                modify:{
                    phone:"",
                    oldPassword:"",
                    newPassword:"",
                    newAgainPassword:""
                }
            }
        },
        methods:{
            operation(e){
                let type = e
                this.$emit('operation',type)
            },
            // 清空输入框input
			close(i){
               
				switch (i) {
                    // 清空手机号
                    case 1:
                        this.modify.phone = ""
                        break;
                
                    case 2:
                        this.modify.oldPassword = ""
                        break;
                    case 3:
                        this.modify.newPassword = ""
                        break;
                    case 4:
                        this.modify.newAgainPassword =""
                        break;
                }       
            },
            
            //确认按钮
            onClickBtn(){
                let {phone,oldPassword,newPassword,newAgainPassword} = this.modify

                //判断是否为空
                if(!phone || !oldPassword || !newPassword || !newAgainPassword ){
					$Message({
						content: !phone?'用户名不能为空！':'密码不能为空！',
						type: 'error'
					});
					return 
                }

                //判断两次密码是否一致
                if(newPassword != newAgainPassword){
                    $Message({
						content: '请输入相同密码',
						type: 'error'
					});
					return 
                }

                //请求接口
                modifyPassword(this.modify).then(res=>{
                    let data = res.data
                    console.log(data)
                    switch (data.code) {
                        // code 判断
                        case 1000:
                            $Message({
                                content: '修改成功',
                                type: 'success'
                            });
                            this.$emit('offPopShow',false)
                            break;
                    
                        case 3001:
                             $Message({
                                content: '账号错误',
                                type: 'error'
                            });
                            break;
                        case 3003:
                            $Message({
                                content: '密码错误',
                                type: 'error'
                            });
                            break;
                        case 3101:
                            $Message({
                                content: '验证码错误',
                                type: 'error'
                            });
                            break;
                    }      
                    
                })
                
            }
        }
    }
</script>

<style scoped lang="scss">
    .wx-login-box {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 901;
        .conten {
            width: 580rpx;
            // height: 400upx;
            z-index: 1000;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border-radius: 14upx;
            overflow: hidden;
            background: #fff;
            box-sizing: border-box;
            padding: 10rpx;
            box-sizing: content-box;
            .conten_hed{
                text-align: center;
                padding: 10rpx 0;
            }
        }
        .but{
            position: absolute;
            bottom: 15%;
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
    .ip{
		display: flex;
		justify-content: space-between;
		width: 550rpx;
		padding: 15rpx;
		border-radius: 100rpx;
        margin-top: 20rpx;
		border: 1rpx solid #dbdde1;
		.bord{
            border-right: 1rpx solid #dbdde1;
        }
		.left{
			display: flex;
			>view{
				margin-top: 6rpx;
				padding-right: 15rpx;
			}
            .icon{
                padding-right: 10rpx;
            }
		}
		input{
			margin-top: 6rpx;
		}
       
	}
    .right{
        margin-bottom: 20rpx;
    }
	
	
    
</style>