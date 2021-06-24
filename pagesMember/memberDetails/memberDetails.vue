/************************************* 会员详情 ************************************/
<template>
    <view>
        <!-- 用户信息 -->
        <view class="infor">
            <view>
                <view class="infor_name flex">
                    <view class="flex">
                        <view class="name">{{list.customerName}}</view>
                        <view class="name_ico">
                            <image src="/static/nv.png" mode="" class="img" v-if="list.sex == 0" ></image>
                            <image src="/static/na.png" mode="" class="img" v-else ></image>
                        </view>
                    </view>
                    <view class="tal">
                        <view class="talNmae">{{list.customerMobile}}</view>
                        <image src="/static/tal.png" mode="" class="img" ></image>
                    </view>
                </view>
                <!-- 联系，qq -->
                <view class="flex_box flex">
                    <view class="flex">
                        <image src="/static/wx.png" mode="" class="img" ></image>
                        <view class="talNmae">{{list.wechatNumber?list.wechatNumber:''}}</view>
                    </view>
                    <view class="flex">
                        <image src="/static/qq.png" mode="" class="img" ></image>
                        <view class="talNmae">{{list.qq?list.qq:''}}</view>
                    </view>
                </view>
                <!-- <view class="flex_box flex">
                    <view class="flex">
                        <image src="/static/wb.png" mode="" class="img" ></image>
                        <view class="talNmae">11111111111</view>
                    </view>
                </view> -->

                <!-- 备注 -->
                <view class="remarks">备注：{{list.remarks?list.remarks:''}}</view>

                <!-- 装饰图 -->
                <image src="/static/border.png" mode="" class="img imgborder" ></image>
            </view>
        </view>

        <!-- 积分 -->
        <view class="integral_box">
            <view class="integral flex">
                <view>
                    积分 <text>{{list.usablePoints}}</text>
                </view>
                <view>累计 {{list.totalPoints}}</view>
            </view>
            <view class="flex btn_box">
                <view class="btn" @click="onClickintegral('赠送积分')">赠送积分</view>
                <view class="btn" @click="onClickintegral('积分兑换')">积分兑换</view>
                <view class="btn" @click="onClickPointsRecord">积分记录</view>
            </view>
        </view>

        <!-- 会员卡 -->
        <view class="vipBox">
            <view class="vip_num">会员卡（{{list.memberCardListVos.length}}）</view>
            <view class="vip_ka" v-for="(item,index) in list.memberCardListVos" :key="index">
                <view class="textR" :class="index ==1?'color':''">{{item.cardNumber}}</view>
                <view class="btn_text flex" :class="index ==1?'color':''">
                    <view class="text_left">
                        <text>￥{{item.balance}}</text>
                        <text @click="onClickGoRecharge(item)">{{item.rechargeArrears>0?'充欠款 >':'去充值 >'}}</text>
                    </view>
                    <view class="flex btn_check">
                        <view @click="onClickGoWithDrawal(item)" class="btn">提现</view>
                        <view @click="onClickGoStored(item)" class="btn">储值记录</view>
                    </view>
                </view>
                <image v-if="index == 0" src="/static/vip1.png" mode="" class="img" ></image>
                <image v-else src="/static/vip2.png" mode="" class="img" ></image>
            </view>
        </view>
        <!-- 接口弹窗 -->
        <i-message id="message" />
        <integralChange v-if="flga" @ok="ok" @cancel="cancel" :title="title"></integralChange>
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getMemberData, giftIntegral, pointsExchange } from '@/util/api/member.js'
    const { $Message } = require('@/wxcomponents/base/index.js');
    import integralChange from '../components/integralChange.vue'
    export default {
        components:{integralChange},
        computed:{
			
            ...mapGetters('app',[
				'shopId'
			]),
           
		},
        data(){
            return{
                list:[], // 数据
                flga:false, // 显示弹窗
                title:'', // 显示抬头
                customerId:'', // ID
            }
        },
        onLoad(options) {
            this.customerId = options.customerId
            this.getMemberData()
        },
        onShow(){
            if(this.list.customerName){
                this.getMemberData()
            }
		},
        methods:{
            // 获取详情接口
            getMemberData(){
                let customerId = this.customerId
                getMemberData({customerId}).then(res=>{
                    console.log(res.data.data)
                    this.list = res.data.data
                })
            },

            // 积分弹窗
            onClickintegral(vla){
                this.title = vla
                this.flga = true
            },

            // 赠送积分接口
            giftIntegral(params){
                giftIntegral(params).then(res=>{
                    if(res.data.code == 200){
                        $Message({
                            content: '赠送成功',
                            type: "success"
                        });
                        this.flga = false;
                        this.getMemberData()
                    }
                })
            },

            // 积分记录 跳转
            onClickPointsRecord(){
                uni.navigateTo({
					url:`/pagesMember/memberDetails/pointsRecord?customerUniqueId=${this.customerId}`
				})
            },

            // 去充值
            onClickGoRecharge(data){
                uni.navigateTo({
					url:`/pagesMember/memberRecharge/memberRecharge?cardId=${data.uniqueId}&cardNumber=${data.cardNumber}&balance=${data.balance}&typeName=${data.typeName}&rechargeArrears=${data.rechargeArrears}&arrearageRechargeMoney=${data.arrearageRechargeMoney?data.arrearageRechargeMoney:0}`
				})
            },

            // 去提现
            onClickGoWithDrawal(data){
                uni.navigateTo({
					url:`/pagesMember/memberRecharge/memberWithdrawal?cardId=${data.uniqueId}&cardNumber=${data.cardNumber}&balance=${data.balance}&typeName=${data.typeName}`
				})
            },

            // 储值记录
            onClickGoStored(data){
                uni.navigateTo({
					url:`/pagesMember/memberDetails/storedValueRecord?customerUniqueId=${this.customerId}`
				})
            },

            // 兑换礼物接口
            pointsExchange(params){
                pointsExchange(params).then(res=>{
                    if(res.data.code == 200){
                        $Message({
                            content: '兑换成功',
                            type: "success"
                        });
                        this.flga = false;
                        this.getMemberData()
                    }
                })
            },

            // 弹窗
            ok(e){
                let params = e
                params.shopId = this.shopId
                params.customerId = this.customerId
                params.pointsTime = new Date()
                if(this.title == '赠送积分'){
                    this.giftIntegral(params)
                }
                if(this.title == '积分兑换'){
                    this.pointsExchange(params)
                }
            },
            cancel(){
                this.flga = false
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../comm.scss';

.vipBox{
    margin: 70rpx 30rpx;
    .vip_num{
        font-size: 32rpx;
        color: #333333;
        font-weight: bold;
    }
    .textR{
        font-size: 28rpx;
        color: #7D5522;
        font-weight: bold;
        text-align: right;
        padding-right: 20rpx;
    }
    .btn_text{
        margin-top: 95rpx;
        padding-left: 20rpx;
        color: #7F5521;
        justify-content: space-between;
        align-items: center;
        .text_left{
            text{
                font-weight: bold;
                &:nth-child(1){
                    font-size: 48rpx;
                }
                &:nth-child(2){
                    padding-left: 10rpx;
                    font-size: 26rpx;
                }
            }
        }
        .btn_check{
            color: #fff;
            font-size: 24rpx;
            .btn{
                padding: 10rpx 20rpx;
                border-radius: 30rpx;
                border: 1rpx solid #fff;
                margin-right: 20rpx;
            }
        }
    }
    .vip_ka{
        margin-top: 30rpx;
        padding: 20rpx;
        width: 654rpx;
        height: 226rpx;
        position: relative;
        box-sizing: content-box;
        .color{
            color:#fff
        }
        .img{
            top:0;
            width: 654rpx;
            height: 226rpx;
            position: absolute;
            z-index: -1;
        }
    }
}
.integral_box{
    margin: 30rpx;
    font-size: 24rpx;
    color: #999999;
}
.integral{
    justify-content: space-between;
    align-items: center;
    text{
        font-weight: bold;
        font-size: 48rpx;
        color: #333333;
        padding-left: 10rpx;
    }
}
.btn_box{
   justify-content: space-between; 
   align-items: center;
   margin-top: 17rpx;
   .btn{
        width: 160rpx;
        height: 63rpx;
        border-radius: 4rpx;
        border: 1rpx solid #DDDDDD;
        color: #333;
        text-align: center;
        line-height: 63rpx;
   }
}
.infor{
    margin: 30rpx;
    .name{
        font-size: 32rpx;
        font-weight: bold;
    }
    .name_ico{
        width: 38rpx;
        height: 38rpx;
        margin-left: 10rpx;
    }
    .img{
        width: 100%;
        height: 100%;
    }
    .tal{
        width: 182rpx;
        height: 32rpx;
        position: relative;
        margin-left: 20rpx;
        .talNmae{
            position: absolute;
            font-size: 20rpx;
            color: #333333;
            padding-left: 36rpx;
            top: 5rpx;
        }
    }
    .flex_box{
        margin-top: 30rpx;
        justify-content: space-between;
        .flex{
            align-items: center;
        }
        .talNmae{
            font-weight: bold;
            color: #000000;
            font-size: 24rpx;
        }
        .img{
            width: 28rpx;
            height: 28rpx;
            margin-right: 20rpx;
        }
    }
    .remarks{
        font-size: 24rpx;
        color: #626262;
        margin: 30rpx 0;
    }
    .imgborder{
        margin-top: 45rpx;
        height: 30rpx;
    }
}
</style>