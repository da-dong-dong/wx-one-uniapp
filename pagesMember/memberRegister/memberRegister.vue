/************************************* 注册会员 ************************************/
<template>
    <view class="content">
        <!-- 姓名 -->
        <view class="box">
            <view class="onRequired">*</view>
            <view class="fontWeight title">姓名</view>
            <input class="uni-input" type="text" v-model="param.customerName" placeholder="请输入姓名"  />
        </view>

        <!-- 性别 -->
        <view class="box">
            <view class="onRequired">*</view>
            <view class="fontWeight title">性别</view>
            <picker @change="sexChange" :value="sexIndex" :range="sexArr">
                <view class="picker">
                    <view class="text">{{sexArr[sexIndex]}}</view>
                    <i-icon class="icon" type="enter" size="16" color="#80848f"/>
                </view>
            </picker>
        </view>

        <!-- 手机号 -->
        <view class="box">
            <view class="onRequired">*</view>
            <view class="fontWeight title">手机号</view>
            <input class="uni-input" type="text" v-model="param.customerMobile" placeholder="请输入手机号" maxlength="11" />
        </view>

        <!-- 生日 -->
        <view class="box">
            <view class="fontWeight title">生日</view>
            <picker mode="date" :value="param.birthday" @change="bindDateChange($event, param)">
                <view class="picker">
                    <view class="text">{{param.birthday ? param.birthday : '生日' | times}}</view>
                    <i-icon class="icon" type="enter" size="16" color="#80848f"/>
                </view>
            </picker>
        </view>

        <!-- QQ -->
        <view class="box">
            <view class="fontWeight title">QQ</view>
            <input class="uni-input" type="text" v-model="param.qq" placeholder="请输入QQ号" />
        </view>

        <!-- 微信 -->
        <view class="box">
            <view class="fontWeight title">微信</view>
            <input class="uni-input" type="text" v-model="param.wechatNumber" placeholder="请输入微信号" />
        </view>

        <!-- 备注 -->
        <textarea v-model="param.remarks" placeholder="请输入备注信息"></textarea>
        
        <checkbox-group @change="onCheck">
            <view v-for="(item,index) in CardTypeList" :key="index">
                <!-- 开卡类型 -->
                <view class="box" style="border:none">
                    <view class="fontWeight title">开卡类型</view>
                    <view>
                        <checkbox style="transform:scale(0.7)" color="#61A3FF" :value="item.typeName" :checked="item.automaticCard == 1?true:false" />{{item.typeName}}
                    </view>
                </view>
                <!-- 卡号 -->
                <view class="box">
                    <view class="fontWeight title">卡号</view>
                    <input class="uni-input" type="text" v-model="item.cardNumber" placeholder="请输入卡号" />
                </view>
            </view>
        </checkbox-group>

        <view class="save" @click="saveBut">开卡</view>

        <!-- 接口弹窗 -->
        <i-message id="message" />
        <goRecharge v-if="flga" @ok="ok" @cancel="cancel"></goRecharge>
        <typeVip v-if="flgaVip" @okVip="okVip" @cancelVip="cancelVip" :title="vipList"></typeVip>
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'
    const { $Message } = require('@/wxcomponents/base/index.js');
    import { getMemberCardTypeList, registered, getMemberCardList } from '@/util/api/member.js'
    import goRecharge from '../components/goRecharge.vue'
    import typeVip from '../components/typeVip.vue'
    export default {
        components:{goRecharge,typeVip},
        computed:{
			...mapGetters('app',[
				'shopId'
			]),
            ...mapGetters('shopArr',[
				'get_shopAllArr'
			]),
		},
        data(){
            return{
                sexIndex: 0,
				sexArr: ['女', '男'],
                flga:false, // 弹窗确认
                flgaVip:false, // 是否多个会员卡
                vipList:[], // 多个会员
                CardTypeList:[], // 会员卡类型数据
                customerId:'', // 返回的id
                // 提交注册字段
                param:{
                    address: null, // 地址
                    area: null, // 区
                    autoActivateCard: true, // 自动开卡
                    birthday: null, // 生日
                    cardNumberAddDtos: [ // 添加会员类型
                        // {
                        //     cardNumber: null, // 会员卡卡号
                        //     cardTypeId: null, // 会员卡类型ID
                        // }
                    ],
                    childBirthDate: null, // 预产日期
                    city: null, // 市
                    companyId: null, // 企业中心ID
                    customerMobile: null, // 客户手机号
                    customerName: null, // 客户名称
                    operationPeopleId: null, // 操作人ID
                    operationPeopleName: null, // 操作人姓名
                    paymentPassword: null, // 支付密码
                    province: null, // 省
                    qq: null, // QQ号
                    remarks: null, // 备注
                    sex: 0, // 性别：1男0女
                    shopFirstEntry: null, 	// 首次录入门店
                    sourceFirstEntry: null, // 首次录入来源
                    wechatNumber: null, // 微信号
                    weddingDate: null // 结婚日期
                }
            }
        },
        methods:{
            // 获取随机数
            getRandom () {
                let random = parseInt(Number(Math.random().toFixed(13)) * (10 ** 13))
                return random
            },
            // 性别改变
            sexChange(e){
                this.sexIndex = e.detail.value
                this.param.sex = this.sexIndex
            },

            // 生日
            bindDateChange (e, item) {
				item.birthday = new Date(e.target.value)
			},

            // 获取联盟卡接口
            getMemberCardTypeList(){
                getMemberCardTypeList().then(res=>{
                    let data = res.data.data
                    data = data.filter(item=>{
                        // 过滤开卡类型
                        if(item.state == 'ENABLE'){
                            item.cardNumber = this.getRandom()
                            return item
                        }
                        
                    })
                    this.CardTypeList = data
                })
            },

            // 是否勾选会员卡
            onCheck(e){
                let items = this.CardTypeList,
                    values = e.detail.value;
                for (let i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.typeName)){
                        this.$set(item,'automaticCard',1)
                    }else{
                        this.$set(item,'automaticCard',0)
                    }
                }
            },

            // 提交
            saveBut(){
                //判断为空
				let {customerName, customerMobile} = this.param;
                if(!customerName || !customerMobile){
                    $Message({
						content: '请输入姓名',
						type: 'error'
					});
					return
                }
                // 判断开卡是否勾选
                let cardNumberAddDtosArr = this.CardTypeList.filter(item=>item.automaticCard == "1")
                cardNumberAddDtosArr.map(item=>{
                    let json = {}
                    json.cardNumber = item.cardNumber
                    json.cardTypeId = item.uniqueId
                    this.param.cardNumberAddDtos.push(json)
                })
                
                registered(this.param).then(res=>{
                    if(res.data.code == 200){
                        $Message({
                            content: '注册成功',
                            type: "success"
                        });
                        this.flga = true
                        this.customerId = res.data.data
                    }
                })
            },

            // 获取会员类型
            getMemberCardList(data){
                let customerId = {}
                customerId.customerId = this.customerId
                getMemberCardList(customerId).then(res=>{
                    let data = res.data.data
                    this.vipList = data
                    if(data.length>1){
                        this.flgaVip = true
                    }else{
                        this.okVip(0)
                    }
                })
            },

            // 多个会员列表
            okVip(e){
                let data = this.vipList[e]
                // 跳转
                uni.redirectTo({
					url:`/pagesMember/memberRecharge/memberRecharge?cardId=${data.uniqueId}&cardNumber=${data.cardNumber}&balance=${data.balance}&typeName=${data.typeName}&rechargeArrears=0&arrearageRechargeMoney=0`
				})
            },
            cancelVip(){
                this.flgaVip = false
            },
            
            // 弹窗
            ok(){
                this.getMemberCardList()
            },
            cancel(){
                this.flga = false
                // 返回
                uni.navigateBack()
            }
        },
        mounted(){
            // 调取接口
            this.getMemberCardTypeList()
            this.param.shopFirstEntry = this.get_shopAllArr.filter(item=>item.shopId == this.shopId)[0].shopNo
        }
    }
</script>

<style lang="scss" scoped>
    @import '../comm.scss';
    .fontWeight{
        font-weight: bold;
    }
    .content{
        padding-bottom: 130rpx;
    }

</style>