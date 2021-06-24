/******************************** 空档期 ***************************************/
<template>
    <view class="gapBox">
        <view class="gap gapHeader">
            <text class="header1">档期分组</text>
            <text class="header3">预约时间</text>
            <text class="header4">预约</text>
        </view>
        <view class="gap gapBody" v-for="(item,index) in gapList" :key="index">
            <view class="header1 gap">
                <text>{{item.stage}}</text> 
                <text class="lab labg">{{item.isOnline}}</text>
            </view>
            <view class="header3 gap">
                <text>{{item.timeFrameStr}}</text>
                <text class="lab labu">X {{item.liLength}}</text>
            </view>
            <view class="header4" @click="gapChange(item)">
                <i-icon class="header4" type="brush_fill" size="16" color="#61A3FF" />
            </view>
        </view>
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props:['dateDetail','pickerDate','reservationShopId'],
        computed:{
			...mapGetters('shopArr',[
				// 预约档期
				'get_schedule',
			])
		},
        data(){
			return{
				// 过滤档期分组
				scheduleMap: new Map(),
				// 预约模板
				templateMap:new Map([
					['ALL','任意'],
					['WEDDING_DRESS','婚纱'],
					['BABY','儿童'],
					['PREGNANT','孕妈'],
					['PORTRAY','写真'],
					['SERVICE','服务'],
					['WEDDING','婚庆'],
                ]),
                // 预约日期
                reservationDate:null,
                // 预约时间
                reservationTime:null,
                // 模板ID
                typographyTypeId:null,
                // 空档期
                gapList:[]
			}
        },
        methods:{
            // 过滤生成数组
            getArray(){
                let arr = this.dateDetail.filter(res=>res.operationTime == this.reservationDate)
                if(arr.length==0) return
                arr = arr[0].reservationGroupVos
                const online = new Map([
					[true,'线上'],
					[false,'线下'],
				])
                let arrAy = []
                
                arr.map(res=>{
                    // 组装类型
                    res.reservationGroupTypeVos.map(res1=>{
                        // 档期时间
                        res1.timeFrames.map(res2=>{
                            // 计算空档期 总 - 选择 = 空
                            let liLength = res2.typographyCount - res2.useTypographyNum
                            let json = {};
                            // 预约日期
                            json.reservationDate = this.reservationDate
                            // 组装档期
                            json.stage = `${res.groupTypeCategoryId==-1?'':this.scheduleMap.get(res.groupTypeCategoryId)}（${this.templateMap.get(res1.controlType)}）`
                            // 档期线上线上
                            json.isOnline = online.get(res.isOnline)
                            json.controlType = this.templateMap.get(res1.controlType)
                            // 模板ID
                            json.typographyTypeId = res1.typographyTypeId
                            // 预约门店
                            json.reservationShopId = this.reservationShopId
                            // 档期时间
                            json.timeFrameStr = res2.timeFrameStr
                            json.startTime = res2.startTime
                            // 空档期数量 
                            json.liLength = liLength
                            arrAy.push(json)
                        })
                    })
                })
                this.gapList = arrAy
                console.log(arrAy)
            },
            // 跳转页面
            gapChange(item){
                this.$emit("gapChange",item)
            }
        },
        watch:{
            // 时间变化
            pickerDate(){
                this.reservationDate = Date.parse(new Date(this.pickerDate)) - 28800000
                this.getArray()
            },
            // 数据变化
            dateDetail(){
                // 档期分组过滤
                this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
                this.reservationDate = Date.parse(new Date(this.pickerDate)) - 28800000
                this.getArray()
            }
        }
    }
</script>

<style lang="scss" scoped>
.gapBox{
    padding: 0 30rpx;
    font-size: 28rpx;
}
.gap{
    display: flex;
    align-items: center;
}
.gapHeader{
    height: 60rpx;
    background: #F8F8F8;
    border-top: 1rpx solid #DDDDDD;
    border-bottom: 1rpx solid #DDDDDD;
    .header1{
        padding-left: 40rpx;
    }
}
.gapBody{
    background: none;
    background: none;
    height: 80rpx;
    border-bottom: 1rpx solid #DDDDDD;
}
.header1{
    width: 450rpx;
    padding-left: 20rpx;
    
}
.header2{
    width: 250rpx;
}
.header3{
    width: 250rpx;
}
.header4{
    width: 100rpx;
}
.labg{
    background: #61A3FF;
    color: #fff;
}
.labu{
    color: #61A3FF;
}
.lab{
    font-size: 20rpx;
    border-radius: 10rpx;
    padding: 0 5rpx;
}
</style>