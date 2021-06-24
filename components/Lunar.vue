/**  待删除 ***/
<template>
	<view>
		<view class="box">	
			<view class="left" @click="openCalendar">
				<view class="title">{{timeTitle}}</view>
				<view class="value">{{showTime}}</view>
			</view>
			<view class="right">
				<switch @change="typeLunar" color="#61a3ff" class="switch"/><span>农历</span>
			</view>
		</view>
		
		
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		props:['timeTitle'],
		components:{
			uniCalendar
		},
		data() {
			return {
				// 显示时间
				showTime:null,
				// 新历时间
				showNew:null,
				// 农历时间
				showLunar:null,
				
				// 新历时间 时间戳
				newTime:null,
				// 农历时间 字符串
				Lunar:null,
				
				
				// 时间返回值
				timeValue:{
					// 订单类型时间
					typeTime:null,
					// 	订单类型时间是否农历
					typeLunar:false,
					// 时间为农历传
					typeStr:null,
					// 生肖
					zodiac:null,
				}
				
			};
		},
		mounted(){
			this.showTime = this.timeTitle
		},
		methods:{
			// 是否为农历
			typeLunar(e){
				this.timeValue.typeLunar = e.target.value
				if(this.showTime !== this.timeTitle){
					if(e.target.value){
						this.showTime = this.showLunar
						this.timeValue.typeStr = this.Lunar
						this.timeValue.typeTime = null
					}else{
						this.showTime = this.showNew
						this.timeValue.typeStr = null
						this.timeValue.typeTime = this.newTime
					}
				}
				
			},
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				// 生肖
				this.timeValue.zodiac = e.lunar.Animal
				// 获得农历
				let year = e.lunar.Animal
				let month = e.lunar.IMonthCn
				let day = e.lunar.IDayCn
				let lunar = `${year}年-${month}-${day}`
				// 农历显示时间
				this.showLunar = lunar
				// 新历显示时间
				this.showNew = e.fulldate
				// 新历时间 时间戳
				this.newTime = Date.parse(new Date(e.fulldate))
				// 农历时间 字符串
				this.Lunar = this.LunarToNew(lunar)
				
				// 如果先选为农历
				if(this.timeValue.typeLunar){
					this.showTime = this.showLunar
					this.timeValue.typeStr = this.Lunar
					this.timeValue.typeTime = null
				}else{
					this.showTime = this.showNew
					this.timeValue.typeStr = null
					this.timeValue.typeTime = this.newTime
				}
			},
			
			// 农历转成新历字符串
			LunarToNew(lunar){
				let arr = lunar.split('-')
				let year = this.showNew.split('-')[0]
				let month = this.CNToNumMonth(arr[1])
				let day
				if(arr[2] === '初十'){
					day = 10
				}else{
					let dayArr1 = this.CNToNumDay1(arr[2].split('')[0])
					let dayArr2 = this.CNToNumDay2(arr[2].split('')[1])
					day = dayArr1+dayArr2
				}
				let newArr = `${year}-${month}-${day}`
				return newArr
			},
			// 汉字转换数字 月份
			CNToNumMonth(cn){
				switch(cn){
					case '一月':
						return '01'
						break;
					case '二月':
						return '02'
						break;
					case '三月':
						return '03'
						break;
					case '四月':
						return '04'
						break;
					case '五月':
						return '05'
						break;
					case '六月':
						return '06'
						break;
					case '七月':
						return '07'
						break;
					case '八月':
						return '08'
						break;
					case '九月':
						return '09'
						break;
					case '十月':
						return '10'
						break;
					case '十一月':
						return '11'
						break;
					case '十二月':
						return '12'
						break;
					
				}
			},
			// 汉字转换数字 日 第一个字符串
			CNToNumDay1(cn){
				switch(cn){
					case '初':
						return '0'
						break;
					case '十':
						return '1'
						break;
					case '甘':
						return '2'
						break;
					case '三':
						return '3'
						break;
				}
			},
			// 汉字转换数字 日 第二个字符串
			CNToNumDay2(cn){
				switch(cn){
					case '一':
						return '1'
						break;
					case '二':
						return '2'
						break;
					case '三':
						return '3'
						break;
					case '四':
						return '4'
						break;
					case '五':
						return '5'
						break;
					case '六':
						return '6'
						break;
					case '七':
						return '7'
						break;
					case '八':
						return '8'
						break;
					case '九':
						return '9'
						break;
					case '十':
						return '0'
						break;
				}
			},
		},
		watch:{
			timeValue:{
				deep:true,
				handler(newVal,oldVal){
					this.$emit('typeTimeValue',this.timeValue)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		height: 80rpx;
		display: flex;
		margin: 0 30rpx;
		justify-content: space-between;
		border-bottom: 1rpx solid #f9f9f9;
		.left{
			width: 75%;
			font-size: 28rpx;
			display: flex;
			line-height: 80rpx;
			.title{
				margin: 0;
				margin-right: 30rpx;
			}
			.value{
				color: #8d8d8d;
			}
		}
		.right{
			font-size: 24rpx;
			color: #61a3ff;
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
				margin-top: 10rpx;
				transform:scale(0.5);
			}
		}
	}
</style>
