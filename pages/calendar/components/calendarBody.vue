<template>
	<view class="bigBox">
		<!-- 头部 -->
		<view class="header">
			<!-- 日历年月 -->
			<view class="Y_M_Box">
				<!-- 上个月 -->
			  <view class='icon' @tap='lastMonth'>
					<i-icon type="enterinto_fill" size="20" color="#92c0ff" />
			  </view>
				<!-- 显示年月 -->
				<view class="Y_M">
					<picker mode="date" fields="month" :value="pickerDate" :start="pickerStartDate" :end="pickerEndDate" @change="DateChange">
						<view class="showDate">{{pickerDate}}</view>
					</picker>
				</view>
			  <!-- 下个月 -->
			  <view class='icon' @tap='nextMonth'>
					<i-icon type="enterinto_fill" size="20" color="#92c0ff" />
			  </view>
			</view>
			<!-- 星期 -->
			<view class="weekBox">
				<view v-for="(item,index) in weekArr" :key="index">{{item}}</view>
			</view>
		</view>
		<!-- 日历主体 -->
		<view class="calenarBox">
			<view v-for="(item,index) in dateAllArr" :key="index">
				<view class="list">
					<view class="bg" :class="noBg(dateDetail,(item.num - 1)) ? (bgColor(dateDetail,(item.num-1)) ? 'optional' : 'ban' ) :'noBg'" @click="enDate(dateDetail,item.num,item.date,index)">
						<view class="day">{{item.num}}</view>
						<view class="typographyNum">{{dateDetail | typographyNum(item.num-1)}}</view>
					</view>
				</view>
			</view>
		</view>
	<i-message id="message" />	
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	export default{
		props:['dateDetail'],
		filters:{
			typographyNum(arr,i){
				if(i !== NaN){
					if(arr[i]){
						// 是否休息
						let isVacation = arr[i].isVacation
						if(isVacation){
							return '休息'
						}else{
							// 可预约时间
							let can = arr[i].defaultTypographyNum + arr[i].addTypographyNum
							// 已预约时间
							let ed = arr[i].inTypographyNum + arr[i].notInTypographyNum
							// 剩余
							let ing = can - ed
							//return `${can}/${ed}/${ing}`
							return `${ed}/${can}`
						}
					}
				}
			},
		},
		data(){
			return{
				// picker
				pickerDate:'',
				pickerStartDate:'2010-01-01',
				pickerEndDate:'2050-12-31',
				
				weekArr:['日', '一', '二', '三', '四', '五', '六'],
				
				// 日历
				dateAllArr: []
			}
		},
		created(){
			this.getNowDate();
		},
		methods:{
			
			// 获取当天日期
			getNowDate(){
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				this.pickerDate = `${year}-${this.completeDate(month)}-${this.completeDate(day)}`
				this.dateInit()
			},
			
			// 日月补0
			completeDate(value) {
				return value < 10 ? "0" + value:value;
			},
			
			// 获取日历本体
			dateInit(){
				this.show = false
				let arr = this.pickerDate.split('-')
				
				// 当前年份
				let nowYear = Number(arr[0])
				// 当前月份
				let nowMonth = Number(arr[1])
				// 获得当月多少天
				let dayNums = new Date(nowYear, nowMonth, 0).getDate();
				
				// 获取当月1号对应的星期
				let startWeek = new Date(nowYear + '/' + nowMonth + '/' + 1).getDay()
				let dateAllArr = []
				let obj = [];
				
				for (let i = 0; i < startWeek + dayNums ; i++){
					if(i >= startWeek){
						obj = {
							num: i-startWeek + 1,
							date: `${nowYear}-${this.completeDate(nowMonth)}-${this.completeDate(i-startWeek+1)}`,
							data:null
						}
					} else {
						obj = []
					}
					dateAllArr[i] = obj
				}
				this.dateAllArr = dateAllArr
			},
			
			// 判断是否需要背景色
			noBg(arr,i){
				if(String(i)){
					if(arr[i]){
						let isVacation = arr[i].isVacation
						if(isVacation){
							return false
						}else{
							return true
						}
					}
				}else{
					return false
				}
			},
			
			// 判断可不可选背景色
			bgColor(arr,i){
				if(String(i)){
					if(arr[i]){
						// 可预约时间
						let can = arr[i].defaultTypographyNum
						// 已预约时间
						let ed = arr[i].inTypographyNum
						// 剩余
						let ing = can - ed
						if( ing > 0 ){
							return true
						}else{
							return false
						}
					}
				}
			},

			// 切换上月
			lastMonth(){
				let arr = this.pickerDate.split('-')
				// 获得当前年份
				let nowYear = Number(arr[0])
				// 获得当前月份
				let nowMonth = Number(arr[1])
				// 判断需不需要减去年份
				let newYear = nowMonth < 2 ? nowYear - 1 : nowYear
				// 获取新月份
				let newMonth = nowMonth < 2 ? 12 : nowMonth -1
				this.pickerDate = `${newYear}-${this.completeDate(newMonth)}-${arr[2]}`
				// this.dateInit()
			},
			// 切换下月
			nextMonth(){
				let arr = this.pickerDate.split('-')
				// 获得当前年份
				let nowYear = Number(arr[0])
				// 获得当前月份
				let nowMonth = Number(arr[1])
				// 判断需不需要增加年份
				let newYear = nowMonth > 11 ? nowYear + 1 : nowYear
				// 获取新月份
				let newMonth = nowMonth > 11 ? 1 : nowMonth + 1
				this.pickerDate = `${newYear}-${this.completeDate(newMonth)}-${arr[2]}`
				// this.dateInit()
			},
			// 日历选择返回
			DateChange(e){
				this.pickerDate = e.detail.value + `-01`
				console.log(this.pickerDate)
				this.dateInit()
			},		
		
			enDate(detail,num,time,index){
				this.pickerDate = this.dateAllArr[index].date
				let isVacation = detail[num-1].isVacation
				if(!isVacation){
					this.$emit('enDate',time)
				}else{
					$Message({
						content: '该时间为休息日',
						type: 'warning'
					});
				}
			},
			
		},
		watch:{
			pickerDate(){
				this.$emit('getDate',this.pickerDate);
			},
			dateDetail(val){
				//重新加载日期
				this.dateInit()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		font-size: 32rpx;
		.header{
			width: 690rpx;
			margin: 30rpx;
			margin-bottom: 0rpx;
			border-radius: 10rpx 10rpx 0 0 ;
			color: #FFFFFF;
			background-color: #61A3FF;
			.Y_M_Box{
				padding: 30rpx 0 ;
				width: 300rpx;
				display: flex;
				justify-content: space-between;
				margin-left: 50%;
				transform: translateX(-50%);
				.icon:nth-child(1){
					transform:rotateY(180deg)
				}
				.Y_M{
					.showDate{
						padding: 0 15rpx;
					}
				}
			}
			.weekBox{
				display: flex;
				justify-content: space-around;
				padding-bottom: 20rpx;
			}
		}
		.calenarBox{
			width: 690rpx;
			margin: 30rpx;
			margin-top: 0rpx;
			display: flex;
			flex-wrap:wrap;
			background-color: #FFFFFF;
			box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
			border-radius:0 0 10rpx 10rpx;
			.list{
				width: 39px;
				text-align: center;
				padding: 10rpx;
				.bg{
					border-radius: 10rpx;
					.typographyNum{
						font-size: 18rpx;
						padding: 5rpx;
					}
				}
				.noBg{
					.typographyNum{
						color: #FF0000;
					}
				}
				.optional{
					background-color: #61A3FF;
					color: #FFFFFF;
					box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
				}
				.ban{
					background-color: #CCCCCC;
					color: #FFFFFF;
					box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
				}
			}
		}
	}
</style>
