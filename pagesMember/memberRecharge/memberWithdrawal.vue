/************************************* 提现会员 ************************************/
<template>
    <view>
        <!-- 卡片 -->
        <view class="vip_img">
            <view class="flex">
                <view class="text">{{param.cardNumber}}</view>
                <view class="text">￥{{balance}}</view>
            </view>
            <view class="name">{{typeName}}</view>
        </view>

        <!-- 提现金额 -->
        <view class="box">
            <view class="fontWeight title">提现金额</view>
            <input class="uni-input" type="text" v-model="param.rechargeBalance" placeholder="请输入提现金额(元)" />
        </view>

        <!-- 交易密码 -->
        <!-- <view class="box">
            <view class="fontWeight title">交易密码</view>
            <input class="uni-input" type="text" v-model="param.pawss" placeholder="请输入交易密码" />
        </view> -->

        <!-- 备注 -->
        <textarea v-model="param.remarks" placeholder="请输入备注信息"></textarea>

        <view class="save" @click="saveBut">提现</view>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { withdraw } from '@/util/api/member.js'
    const { $Message } = require('@/wxcomponents/base/index.js');
    export default {
         computed:{
            ...mapGetters('app',[
				'shopId'
			]),
		},
        onLoad(options) {
            this.param.cardUniqueId = options.cardId
            this.param.cardNumber = options.cardNumber
            this.balance = options.balance
            this.typeName = options.typeName;
            this.param.shopId = this.shopId  
        },
        data(){
            return{
                balance:0, // 余额
                typeName:'', // 类型
                param:{
                    rechargeBalance:0, // 充值金额
                    pawss:null,
                    cardUniqueId:null,// 企业中心ID
                    cardNumber: null, // 会员卡号
                    remarks:null, // 充值备注
                    shopId:null, // 充值门店
                    rechargeTime:null, // 充值时间
                }
            }
        },
        methods:{
            saveBut(){
                this.param.rechargeTime = new Date();
                console.log(this.param)
                withdraw(this.param).then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        $Message({
                            content: '充值成功',
                            type: "success"
                        });
                        setTimeout(() => {
                            uni.navigateBack()
                        }, 1000);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../comm.scss';

</style>