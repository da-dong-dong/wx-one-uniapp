/************************************* 储值记录 ************************************/
<template>
     <view class="points">
         <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
             <view class="tab flex">
                 <view class="text_tab" @click="tabChange(index)" v-for="(item,index) in tabList" :class="index == tabInde?'color':''" :key="index">{{item}}</view>
             </view>
             <!-- 充值 -->
            <view v-if="tabInde == 0">
                <view class="points_list" v-for="(item,index) in list" :key="index">
                    <view class="flex">
                        <view class="text1">充值</view>
                        <view class="text2">+ {{item.rechargeBalance}}</view>
                    </view>
                    <view class="list_text">
                        <view>{{item.typeName}}</view>
                        <view class="flex">
                            <text>会员卡号：{{item.cardNumber}}</text>
                        </view>
                        <view class="flex">
                            <text>实收金额：{{item.rechargeBalance}}</text>
                        </view>
                        <view class="flex">
                            <text>支付方式：{{item.rechargeType | typeta}}</text>
                        </view>
                        <view class="flex">
                            <text>操作时间：{{item.rechargeTime}}</text>
                            <text>业绩人员：{{item.sellPeopleName}}</text>
                        </view>
                        <view class="flex">
                            <text>收款人员：{{item.operationPeopleName}}</text>
                        </view>
                        
                        <view>备注信息：{{item.remarks}}</view>
                    </view>
                </view>
            </view>
            <!-- 提现 -->
            <view v-else>
                <view class="points_list" v-for="(item,index) in list" :key="index">
                    <view class="flex">
                        <view class="text1">提现</view>
                        <view class="text2" style="color:#000">- {{item.rechargeBalance}}</view>
                    </view>
                    <view class="list_text">
                        <view>{{item.typeName}}</view>
                        <view class="flex">
                            <text>会员卡号：{{item.cardNumber}}</text>
                            <text>提现人员：{{item.operationPeopleName}}</text>
                        </view>
                        <view class="flex">
                            <text>实收金额：{{item.rechargeBalance}}</text>
                        </view>
                        <view class="flex">
                            <text>操作时间：{{item.rechargeTime}}</text>
                        </view>
                        
                        <view>备注信息：{{item.remarks}}</view>
                    </view>
                </view>
            </view>
            <view class="noMove" v-if="showNoMore || list.length == 0">没有更多数据</view>
        </s-pull-scroll>
        
        <!-- 接口弹窗 -->
        <i-message id="message" />
     </view>
</template>

<script>
    import { pageRechargeRecord } from '@/util/api/member.js'
    const { $Message } = require('@/wxcomponents/base/index.js');
    export default {
        filters:{
            typeta(val){
                switch (val) {
                    case "RECHARGE":
                        return '充值'
                        break;
                
                    case "CLEAR":
                        return '抹账'
                        break;

                    case "GIVEN":
                        return '赠送'
                        break;

                    case "CASH":
                        return '提现'
                        break;

                    case "REFUND":
                        return '退款'
                        break;
                
                }
            }
        },
        data(){
            return{
                param:{
                    customerUniqueId:null,
                    limit:10,
                    page:1,
                    isSearchCount:true
                },            
                tabInde:0,
                tabList:['充值记录','提现记录'],
                // 没有更多
				showNoMore:false,
                // 总数量
				total:11,
                list:[], // 数据
            }
        },
        onLoad(options) {
            this.param.customerUniqueId = options.customerUniqueId
            this.pageRechargeRecord()
        }, 
        methods:{
            // 充值
            pageRechargeRecord(){
                
                pageRechargeRecord(this.param).then(res=>{
                    this.total = res.data.data.total
                    let curList = []
                    if(this.tabInde == 0){
                        // 充值
                        curList = res.data.data.records.filter(item=>item.rechargeType == 'RECHARGE')
                    }else{
                        // 提现
                        curList = res.data.data.records.filter(item=>item.rechargeType == 'CASH')
                    }
                    curList.forEach((i)=>{
                        this.list.push(i)
                    })
                })
               
                
            },

            // tab改变
            tabChange(val){
                this.tabInde = val;
                this.list = []
                this.page = 1
                this.pageRechargeRecord()
            },

            // 组件
			refresh () {
			  this.$nextTick(() => {
			    this.$refs.pullScroll.refresh();
			  });
			},
			pullDown (pullScroll) {
			  setTimeout(() => {
			    this.loadData(pullScroll);
			  }, 200);
			},
			loadData (pullScroll) {
				if (pullScroll.page == 1) {
					this.list = [];
				}
				if(!this.showNoMore){
					this.param.page = pullScroll.page
				}
				if(this.list.length < this.total){
					this.pageRechargeRecord()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				pullScroll.success();
			},
        }
    }
</script>

<style lang="scss" scoped>
.noMove{
    padding: 20rpx;
    text-align: center;
}
.flex{
    display: flex;
    justify-content: space-between;
}

.points{
    background: #F9F9F9;
    .tab{
        color:#999;
        font-size: 32rpx;
        justify-content: space-around;
        padding: 30rpx;
        background: #fff;
        .color{
            color: #61A3FF; 
        }
        .text_tab{
            justify-content: center;
        }
    }
}
.points_list{
    background: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    .text1{
        color: #000;
        font-weight: bold;
        font-size: 32rpx;
    }
    .text2{
        color: #FE9025;
        font-weight: bold;
        font-size: 40rpx;
    }
    .list_text{
        .red{
          color: #FC5256;
        }
        padding-top: 20rpx;
        color: #AEB5B7;
        font-size: 24rpx;
        line-height: 40rpx;
    }
}
</style>