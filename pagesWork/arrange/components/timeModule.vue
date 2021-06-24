/************************* 预约时间 ***************************/
<template>
	<view>
		<view class="box">
			<view class="title">预约时间</view>
			<view class="flex_arr">
				<input type="text" v-model="sTime" @input="input" @blur="timeBlur"/>
				<picker @change="change" :value="index" :range="arr">
					<view class="text" style="width: 150rpx">
						<view class="text_cloor">选择</view>
						<i-icon class="icon" type="enter" size="16" color="#80848f"/>
					</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	import { getChooseClothesTime, getPhotoTime, getChooseTime, getWatchTime, getPickupTime } from '@/util/api/shop.js'
	export default{
		props:['date','shopId','typography','time','getType'],
		data(){
			return{
				// picker预约时间段
				index:0,
				arr:['时间段'],
				timeArr:[],
				sTime:null,
				
				// 是否在范围内
				isTime:false,
			}
		},
		methods:{
			// 获取预约时间段
			getTimePeriod(){
				let params ={
					reservationDate: this.date, //预约日期
					reservationShopId: this.shopId,	//预约门店ID
					typographyTypeId: this.typography //模板ID
				}
				switch(this.getType){
					case 'xy':
						this.getChooseClothesTime(params)
						break
					case 'pz':
						this.getPhotoTime(params)
						break
					case 'xp':
						this.getChooseTime(params)
						break
					case 'kb':
						this.getWatchTime(params)
						break
					case 'qj':
						this.getPickupTime(params)
						break
				}
			},
			getPikcer(data){
				this.timeArr = data
				let arr = []
				data.forEach((i)=>{
					let name = `${i.timeFrameStr} ${i.useTypographyNum}/${i.typographyCount}`
					arr.push(name)
				})
				this.arr = arr
			},
			// 选衣时间段
			getChooseClothesTime(params){
				getChooseClothesTime(params).then(res=>{
					this.getPikcer(res.data.data)
					console.log(res.data.data,'时间段')
				})
			},
			// 拍照时间段
			getPhotoTime(params){
				getPhotoTime(params).then(res=>{
					this.getPikcer(res.data.data)
					console.log(res.data.data,'时间段')
				})
			},
			// 选片时间段
			getChooseTime(params){
				getChooseTime(params).then(res=>{
					this.getPikcer(res.data.data)
				})
			},
			// 看板时间段
			getWatchTime(params){
				getWatchTime(params).then(res=>{
					this.getPikcer(res.data.data)
				})
			},
			// 取件时间段
			getPickupTime(params){
				getPickupTime(params).then(res=>{
					this.getPikcer(res.data.data)
				})
			},
			
			// input监听
			input(e){
				// 判断时间格式 
				if(this.sTime.indexOf(":") !== -1 && this.sTime.length === 5){
					let result = []
					this.timeArr.forEach(item => { // (this.timeArr 为 所有的预约时间)
						let start
						let end
						let bool
						let timeStr = this.sTime
						if (item.timeFrameType === 'EQUALS') {
							start = item.startTime
							bool = Number(start.replace(':', '')) === Number(timeStr.replace(':', ''))
							result.push(bool)
						} else {
							start = item.startTime
							end = item.endTime
							bool = Number(start.replace(':', '')) <= Number(timeStr.replace(':', '')) && Number(timeStr.replace(':', '')) <= Number(end.replace(':', ''))
							result.push(bool)
						}
					})
					this.isTime = result[0]
				}else{
					this.isTime =  false
				}
				
			},
			// input失去焦点
			timeBlur(){
				this.$emit('getTime',{time:this.sTime,bool:this.isTime})
			},
			// picker选择时间
			change(e){
				this.index = e.detail.value
				let time = this.timeArr[this.index]
				this.sTime = time.startTime
				this.isTime = true
				this.$emit('getTime',{time:this.sTime,bool:this.isTime})
			},
		},
		watch:{
			typography(){
				if(this.typography){
					this.getTimePeriod()
				}else{
					this.timeArr = []
					this.arr = ['时间段']
					this.index = 0
				}
			},
			time(){
				console.log('time',this.time)
				this.sTime = this.time
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import './component.scss';
	input{
		border: 1rpx solid #DDDDDD;
		width: 200rpx;
		margin-right: 20rpx;
		padding: 0 10rpx;
		border-radius: 10rpx;
	}
	image{
		width: 15rpx;
		height: 15rpx;
		margin: 18rpx 0 0 5rpx;
	}	
	.text_cloor{
		color: #61A3FF;
	}
	.flex_arr{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
