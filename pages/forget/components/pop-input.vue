<template>
    <view>
        <view class="show-box-bg wx-login-box">
            <view class="conten">
                <view class="conten_hed">
                    图形验证码
                </view>
                <!-- 输入图形验证码 -->
               <view class="ip" >
                    <view class="left">
                        <i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
                        <input type="text" placeholder="请输入验证码" v-model="code"/>
                    </view>
                    <view>
                        <img :src="codeImg" class="img_code" @click="getCaptcha"  alt="验证码" title="点击换一张">
                    </view>
                    <view class="close" @click="close()">
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
import { sendMsgCode, getSendMsgCaptcha} from '@/util/api/common.js'
    export default {
        props:['phone'],
        data() {
            return {
                code:"",
                //验证码图片
				codeImg:'',
            }
        },
        mounted(){
            this.getCaptcha()
		},
        methods:{
            operation(e){
                let type = e
                this.$emit('operation',type)
            },
            //获取验证码
			getCaptcha(){
				 this.codeImg = `${getSendMsgCaptcha}?phone=${this.phone}&num=${Math.random()}`;
			},
            // 清空输入框input
			close(i){
				this.code = ""
            },
            
            //确认按钮
            onClickBtn(){
                let code = this.code
                let phone = this.phone

                //判断是否为空
                if(!code){
					$Message({
						content: '验证码不能为空',
						type: 'error'
					});
					return 
                }
                
                //请求接口
                sendMsgCode({code,phone}).then(res=>{
                    let data = res.data
                    console.log(data)
                    switch (data.code) {
                        // code 判断
                        case 1000:
                            $Message({
                                content: '短信验证码发送成功',
                                type: 'success'
                            });
                            this.$emit('offPopShow',false)
                            break;
                    
                        case 3001:
                             $Message({
                                content: '电话号码不正确',
                                type: 'error'
                            });
                            this.$emit('offPopShow',false)
                            break;
                        case 3002:
                            $Message({
                                content: '图形验证码错误',
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
            height: 175rpx;
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
    .img_code{
		width: 150rpx;
		height: 45rpx;
	}
	
	
    
</style>