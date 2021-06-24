<template>
    <view>
        <view class="bigBox">
            <view class="left">
                <view class="onRequired">*</view>
                <view class="title">手机</view>
                <!-- <view class="text">{{item.mobile | noData('电话')}}</view> -->
                <input class="uni-input" type="text" v-model="mobileVlaue" placeholder="手机" @input="onKeyUpMobile(mobileIndex)" maxlength="11"/>
            </view>
        </view>
        <view class="bigBoxModel" v-if="showMobileModel">
            <view class="box">
                <view class="text">该手机已经存在，是否使用</view>
                <view class="but">
                    <view class="cancel" @click="cancel">取消</view>
                    <view class="ok" @click="ok">确定</view>
                </view>
            </view>
	    </view>
    </view>
	
</template>

<script>
import { getShowMobileList } from '@/util/api/goods.js'
	export default {
		props:['mobileIndex','mobile'],
		data() {
			return {
                mobileVlaue:'',
                showMobileModel:false,//重复弹窗
                mobilemobileList:null,
			};
        },
        mounted(){
            this.mobileVlaue = this.mobile
        },
		methods:{
            //不使用该联系人
			cancel(){
                //删除后一位
                this.mobileVlaue = this.mobileVlaue.substring(0,this.mobileVlaue.length-1)
                this.$emit('update:mobile',this.mobileVlaue);
                this.showMobileModel = false
            },
            //使用该联系人
			ok(){
                this.$emit('confirmMobile',this.mobilemobileList,this.mobileIndex);
                this.showMobileModel = false
            },

            //查询电话电话号码
			onKeyUpMobile(e,index){
				//监听最后一位，弹框
				let mobile = this.mobileVlaue
				if(mobile.length>10){
					getShowMobileList({mobile,isSearchCount: false }).then(res=>{
						let mobileList = res.data.data.records
						if(mobileList.length > 0){
                            this.showMobileModel = true
                            mobileList[0].dataStatus = "UPDATE"
							this.mobilemobileList = mobileList[0]
							//失去焦点
							uni.hideKeyboard();
						}else{
                            this.$emit('update:mobile',this.mobileVlaue);
                        }
					})
				}
			},
		}
	}
</script>

<style lang="scss">
@import './moduleStyle.scss';
	.bigBoxModel{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
			margin: 50% auto;
			border-radius: 15rpx;
			.text{
				padding: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 36rpx;
				text-align: center;
			}
			.but{
				display: flex;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				border-top: 1rpx solid #f9f9f9;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					border-left: 1rpx solid #f9f9f9;
					color: #FF0000;
				}
			}
		}
	}
</style>
