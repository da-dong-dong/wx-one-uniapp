/************************************* 会员查看 ************************************/
<template>
    <view>
        <section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
             <!-- 搜索 -->
            <searchModul ref="searchModul" @search="search"></searchModul>
            <!-- 列表 -->
            <view class="boxList" v-if="list.length>0">
                <view class="li" v-for="(item,index) in list" :key="index">
                    <view class="li_name">
                        <view class="name">
                            <view>{{item.customerName}}</view>
                            <view class="name_ico">
                                <image src="/static/nv.png" mode="" class="img" v-if="item.sex == 0" ></image>
                                <image src="/static/na.png" mode="" class="img" v-else ></image>
                            </view>
                        </view>
                        <view class="tal">
                            手机号：{{item.customerMobile}}
                        </view>
                        <view class="tal">
                            微信号：{{item.wechatNumber?item.wechatNumber:''}}
                        </view>
                    </view>
                    <view class="li_goditle" @click="onClickDetail(item.uniqueId)">
                        详情
                        <i-icon class="icon" type="enter" size="16" color="#61A3FF"/>
                    </view>
                </view>
            </view>
            <view class="noMove" v-if="showNoMore">没有更多数据</view>
        </s-pull-scroll>
		</section>

        <!-- 按钮 -->
        <view class="save" @click="saveBut">查询</view>
        <!-- 接口弹窗 -->
        <i-message id="message" />
    </view>
</template>

<script>
    import searchModul from '@/components/searchModul.vue'
    const { $Message } = require('@/wxcomponents/base/index.js');
	import sPullScroll from '@/components/s-pull-scroll';
    import { getMemberCustomerPage } from '@/util/api/member.js'
    export default {
        components:{
			searchModul,
            sPullScroll
		},
        data(){
            return{
                param:{
                    customerKey:'', // 搜索条件 
                    isSearchCount: true, 
                    page: 1, // 页码
                    limit: 10 , // 分页
                },
                // 没有更多
				showNoMore:false,
                // 总数量
				total:11,
                list:[], // 数据
            }
        },
        methods:{
            // 搜索
			search(e){
				this.param = e
                this.list = [];
                this.saveBut()
			},

            // 查询
            saveBut(){
                // 整合条件
                if(this.param.contactName){
                    this.param.customerKey = this.param.contactName
                }else if(this.param.contactMobile){
                    this.param.customerKey = this.param.contactMobile
                }else if(this.param.orderNo){
                    this.param.customerKey = this.param.orderNo
                }else{
                    this.param.customerKey = ''
                }
                getMemberCustomerPage(this.param).then(res=>{
                    this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
                })
            },

            // 跳转详情
            onClickDetail(id){
                uni.navigateTo({
					url:`/pagesMember/memberDetails/memberDetails?customerId=${id}`
				})
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
					this.saveBut()
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
 @import '../comm.scss';
 .noMove{
    padding: 20rpx;
    text-align: center;
}
.boxList{
    background: #F9F9F9;
    padding: 30rpx 0;
}
.li{
    width: 694rpx;
    height: 181rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    margin: 20rpx 30rpx;
    display: flex;
    padding: 30rpx;
    box-sizing: border-box;
    color: #999999;
    align-items: center;
    justify-content: space-between;
    .name{
        font-size: 32rpx;
        color: #000000;
        display: flex;
        font-weight: bold;
        .name_ico{
            width: 38rpx;
            height: 38rpx;
            margin-left: 10rpx;
            .img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .tal{
        font-size: 24rpx;
        margin-top: 15rpx;
    }
    .li_goditle{
        font-size: 28rpx;
        font-weight: bold;
        color: #61A3FF;
        .icon{
            margin-left: 10rpx;
        }
    }
}
</style>