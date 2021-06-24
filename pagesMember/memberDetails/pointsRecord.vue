/************************************* 积分记录 ************************************/
<template>
     <view class="points">
         <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
            <view class="points_list" v-for="(item,index) in list" :key="index">
                <view class="flex">
                    <view class="text1">{{item.pointsSource}}</view>
                    <view class="text2">{{item.points}}</view>
                </view>
                <view class="list_text">
                    <view>订单编号：202102250978</view>
                    <view>总积分：202102250978</view>
                    <view class="flex">
                        <text>操作时间：{{item.pointsTime}}</text>
                        <text>操作员：{{item.operationPeopleName}}</text>
                    </view>
                    <view>备注信息：{{item.remarks}}</view>
                </view>
            </view>
            <view class="noMove" v-if="showNoMore || list.length == 0">没有更多数据</view>
        </s-pull-scroll>
        
        <!-- 接口弹窗 -->
        <i-message id="message" />
     </view>
</template>

<script>
    import { pointsRecord } from '@/util/api/member.js'
    const { $Message } = require('@/wxcomponents/base/index.js');
    export default {
        data(){
            return{
                param:{
                    customerUniqueId:null,
                    limit:10,
                    page:1,
                    isSearchCount:true
                },
                // 没有更多
				showNoMore:false,
                // 总数量
				total:11,
                list:[], // 数据
            }
        },
        onLoad(options) {
            this.param.customerUniqueId = options.customerUniqueId
            this.pointsRecord()
        },
        methods:{
            // 记录查询
            pointsRecord(){
                pointsRecord(this.param).then(res=>{
                    this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
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
					this.pointsRecord()
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
        padding-top: 20rpx;
        color: #AEB5B7;
        font-size: 24rpx;
        line-height: 40rpx;
    }
}
</style>