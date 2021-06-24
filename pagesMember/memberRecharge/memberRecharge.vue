/************************************* 充值会员 ************************************/
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

        <!-- 充值金额 -->
        <view class="box">
            <view class="fontWeight title">充值金额</view>
            <input class="uni-input active" v-if="qiankuan>0"  disabled type="number" :value="money" placeholder="请输入充值金额(元)" />
            <input class="uni-input" v-else type="number" @input="changeMoney" v-model="param.rechargeMoney" placeholder="请输入充值金额(元)" />
        </view>

        <!-- 赠送金额 -->
        <view class="box">
            <view class="fontWeight title">赠送金额</view>
            <input class="uni-input active" type="text" value="0" disabled placeholder="请输入赠送金额(元)" />
        </view>

         <!-- 实收金额 -->
        <view class="box">
            <view class="fontWeight title">实收金额</view>
            <view class="picker">
                <input class="uni-input active" v-if="qiankuan>0"  disabled type="number" :value="okMoney" placeholder="请输入实收金额(元)" />
                <input class="uni-input" v-else type="number" v-model="param.receiptMoney" placeholder="请输入实收金额(元)" />
                <view class="red">!欠款{{qiankuan>0?qiankuan:arrearageMoney}}</view>
            </view>
        </view>

        <!-- 充值欠款 -->
        <view class="box" v-if="qiankuan>0">
            <view class="fontWeight title">充值欠款</view>
            <input class="uni-input" type="number"  v-model="goMoney"  placeholder="请输入赠送金额(元)" />
        </view>

        <!-- 支付方式 -->
        <view class="box">
            <view class="onRequired">*</view>
            <view class="fontWeight title">支付方式</view>
            <picker @change="payChange" :value="payIndex" :range="payArr">
                <view class="picker">
                    <view class="text">{{payArr[payIndex]}}</view>
                    <i-icon class="icon" type="enter" size="16" color="#80848f"/>
                </view>
            </picker>
        </view>

        <!-- 收款日期 -->
        <view class="box">
            <view class="fontWeight title">收款日期</view>
            <picker mode="date" :value="param.receiptTime" @change="bindDateChange($event, param)">
                <view class="picker">
                    <view class="text">{{param.receiptTime ? param.receiptTime : '收款日期' | times}}</view>
                    <i-icon class="icon" type="enter" size="16" color="#80848f"/>
                </view>
            </picker>
        </view>

        <!-- 接单人 -->
        <view class="box">
            <list :title="'接单人'" :show="reception" :type="'RECEPTION'" @goAddress="goAddress" style="width:100%"></list>
        </view>

        <!-- 备注 -->
        <textarea v-model="param.remarks" placeholder="请输入备注信息"></textarea>

        <view class="save" @click="saveBut">{{qiankuan>0?'充欠款':'充值'}}</view>
        <!-- 弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'
    import list from '@/components/detailWorkMain/personList.vue'
    import { cardRecharge } from '@/util/api/member.js'
    const { $Message } = require('@/wxcomponents/base/index.js');
    export default {
        components:{
			list,
		},
        computed:{
			...mapGetters('shopArr',[
				'get_pay',
			]),
            ...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
            arrearageMoney(){
                return this.param.rechargeMoney-this.param.receiptMoney
            }
		},
        onLoad(options) {
            this.param.cardId = options.cardId
            this.param.cardNumber = options.cardNumber
            this.balance = options.balance
            this.typeName = options.typeName
            if(options.rechargeArrears>0){
                // 欠款
                this.qiankuan = options.rechargeArrears
                // 充值金额
                this.money = options.arrearageRechargeMoney
                // 实收金额 = 充值金额 - 欠款 
                this.okMoney = options.arrearageRechargeMoney - options.rechargeArrears
                // 充值欠款
                this.goMoney = options.rechargeArrears
            }
        },
        created(){
            //展示默认接单人
			this.reception = this.get_userInfo.anotherName
            this.param.sellPeopleName = this.get_userInfo.anotherName
            this.param.sellPeopleId = this.get_userInfo.userId
            this.param.shopId = this.shopId  
            this.param.receiptTime = new Date()
			this.getArr()
		},
        data(){
            return{
                payIndex:0,
                payArr:[], // 支付方式
                receiptArr:[],
                // 接单人
				reception:'请选择',
                balance:0, // 余额
                typeName:'', // 类型
                qiankuan:0, // 欠款
                okMoney:0, // 实收
                money:0, // 充值金额
                goMoney:0, // 充值欠款
                param:{
                    arrearageMoney: 0, // 欠款金额
                    cardId: null, // 会员卡id
                    cardNumber: null, // 会员卡号
                    paymentMethod: null, // 支付方式
                    receiptMoney: 0, // 实收金额
                    receiptTime: null, // 收款时间
                    receiptType: 1, // 收/退款类型(1前期收款；2退款；3后期收款)
                    rechargeMoney: 0, // 充值金额
                    remarks: null, // 备注
                    sellPeopleId: null, // 销售人员ID
                    sellPeopleName: '请选择', // 销售人员名称
                    shopId: null, // 收款门店
                }
            }
        },
        onShow(){
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			let address = currPages.data.address
			if(address){
                address.enArr.forEach((i)=>{
					this.param.sellPeopleId = i.id
				})
				this.param.sellPeopleName = address.show
                this.reception = address.show
			}
		},
        methods:{
            getArr(){
				let arr = []
				this.receiptArr = this.get_pay.filter((i)=>{ return i.level === 2 && i.name !== "储值卡扣款" })
				this.payArr = this.receiptArr.map((i)=>{ return i.name })
			},
            // 触发充值金额和付款金额一致
            changeMoney(e){
                let val = e.detail.value
                this.param.receiptMoney = val
            },
            // 支付方式
            payChange(e){
                this.payIndex = e.detail.value
                this.param.paymentMethod = this.payArr[this.payIndex]
            },

            // 跳转接单人
            goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=RECEPTION' + '&show=' + this.reception + '&num=1'
				})
			},

            // 收款时间
            bindDateChange (e, item) {
				item.receiptTime = new Date(e.target.value)
			},
            // 时间过滤
            geiTime(time){
                let myDate = new Date(time);
                let year = myDate.getFullYear();
                let month = myDate.getMonth()+1;
                let date = myDate.getDate();
                let h = myDate.getHours();
                let m = myDate.getMinutes();
                let s = myDate.getSeconds();
                let now = year + '-' + this.getMakeZero(month) + "-" + this.getMakeZero(date) + " " + this.getMakeZero(h) + ':' + this.getMakeZero(m) + ":" + this.getMakeZero(s);
                return now
            },
           // 时间补0
            getMakeZero(s) {
                return s < 10 ? '0' + s : s;
            },

            // 充值
            saveBut(){
                this.param.paymentMethod = this.payArr[this.payIndex]
                this.param.arrearageMoney = this.arrearageMoney
                if(this.qiankuan>0){
                    // 充值金额
                    this.param.rechargeMoney = this.goMoney
                    // 实收金额
                    this.param.receiptMoney = this.goMoney
                    // 欠款金额
                    this.param.arrearageMoney = this.qiankuan - this.goMoney
                }
                this.param.receiptTime = this.geiTime(this.param.receiptTime)
                cardRecharge(this.param).then(res=>{
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
.active{
    background: #DDD;
}
</style>