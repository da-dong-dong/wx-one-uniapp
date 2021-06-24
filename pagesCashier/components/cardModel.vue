/******************************** 储蓄卡弹窗 ***************************************/
<template>
    <view class="bigBox">
		<view class="box">
            <view class="carTop">请输入会员手机号</view>
			<view class="listBox1">
                <input type="text" class="input" placeholder="请输入手机号" v-model="params.mobile" maxlength='11'/>
                <view class="btn" @click="onClickCheck">查询</view>
            </view>
            <view class="showCar">
                <view class="listBox1">
                    <view class="text">持卡人</view>
                    <input type="text" class="input" placeholder="客户" v-model="dataList.customerName" disabled='true'/>
                </view>
                <view class="listBox1">
                    <view class="text">手机号</view>
                    <input type="text" class="input" placeholder="手机号" v-model="dataList.cardNumber" disabled='true'/>
                </view>
                <view class="listBox1">
                    <view class="text">可用积分</view>
                    <input type="text" class="input" placeholder="可用积分" v-model="dataList.usablePoints" disabled='true'/>
                </view>
                <view class="listBox1">
                    <view class="text">可用金额</view>
                    <input type="text" class="input" placeholder="可用金额" v-model="dataList.balance" disabled='true'/>
                </view>
            </view>
            <view class="btncl">
                <view class="btnLis" @click="onClear">取消</view>
                <view class="btnLis" @click="onOk">确定</view>
            </view>
		</view>
	</view>
</template>

<script>
    import { getSimpleDataList } from '@/util/api/goods.js'
    const { $Message } = require('@/wxcomponents/base/index');
	export default{
        props:['typeCar'],
		data(){
			return{
				index: 0,
				arr:['卡号','客户姓名','客户电话'],
				receiptArr:[],
                show:'请选择',
                params:{
                    mobile:null
                },
                dataList:null
			}
		},
		
		methods:{
			onClickCheck(){
				getSimpleDataList(this.params).then(res=>{
                    this.dataList = res.data.data[0]
                })
            },
            // 取消
            onClear(){
                this.$emit('update:showCar',false)
            },

            // 确认
            onOk(){
                if(this.dataList.balance<=0 && this.typeCar){
                    $Message({
						content: '余额不足',
						type: 'error'
                    });
                    return 
                }
                this.$emit('update:expandField',this.dataList.cardUniqueId)
                this.$emit('update:showCar',false)
            }
		}
	}
</script>

<style lang="scss" scoped>
    .bigBox{
		z-index: 1000;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
		    transform: translate(-50%, -50%);
            position: relative;
            left: 50%;
            top: 50%;
            border-radius: 15rpx;
		}
    }
    .carTop{
        padding: 20rpx 20rpx 0 20rpx;
        color: #666;
        font-size: 30rpx;
    }
    .listBox1{
        display: flex;
        padding: 20rpx;
        font-size: 28rpx;
        justify-content: space-between;
        align-items: center;
		.input{
			width: 380rpx;
            height: 60rpx;
            border: 1px solid #E1E1E1;
            border-radius: 10rpx;
            padding-left: 20rpx;
		}
		.btn{
			background: #3894FF;
            color: #fff;
            padding: 10rpx 20rpx;
            border-radius: 10rpx;
		}
    }
    .showCar{
        padding-top: 20rpx;
        border-top: 1px solid #E1E1E1;
        border-bottom: 1px solid #E1E1E1;
        .listBox1{
            .input{
                width: 350rpx;
                background: #FAFAFA;
            }
        }
    }
    .btncl{
        display: flex;
        height: 100rpx;
        align-items: center;
        justify-content: space-around;
        .btnLis{
            padding: 10rpx 20rpx;
            border: 1px solid #E1E1E1;
            color: #333;
        }
    }
</style>