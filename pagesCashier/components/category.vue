<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">区域</view>
			<picker 
				@change="enList" 
				:value="index" 
				:range="categoryArr"
				mode = multiSelector
				@columnchange="changeList"
			>
				<view class="picker">
					<view class="text">{{areaShow}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import area from '@/static/area.js'
	export default{
		props:['city','province','region'],
		computed:{
			cityData(){
				const {
					city,
					province,
					region
				} = this
				return{
					city,
					province,
					region
				}
			}		
		},
		data(){
			return{
				// 显示
				areaShow:'请选择',
				
				categoryArr:[[],[],[]],
				secondArr:null,
				thirdArr:null,
				index:[0,0,0],
				params:{
					city:null,
					province:null,
					region:null,
				},
			}
		},
		mounted(){
			this.categoryArr[0] = area.map((i)=>{return i.value})
			this.getSecond()
		},
		methods:{
			// 获取市辖
			getSecond(){
				// 获取省下标
				let firstIndex = this.index[0]
				this.secondArr = area[firstIndex].children
				this.categoryArr[1] = this.secondArr.map((i)=>{return i.value})
				this.getThird()
				this.$forceUpdate()
			},
			// 获取区
			getThird(){
				// 获取省下标
				let firstIndex = this.index[0]
				// 获取市辖下标
				let secondIndex = this.index[1]
				this.thirdArr = this.secondArr[secondIndex].children
				this.categoryArr[2] = this.thirdArr.map((i)=>{return i.value})
				this.$forceUpdate()
			},
			changeList(e){
				let ind = e.detail.column
				this.index[ind] = e.detail.value
				this.getSecond()
				this.$forceUpdate()
			},
			enList(e){
				this.params.province = area[this.index[0]].value
				this.params.city = this.secondArr[this.index[1]].value
				this.params.region = this.thirdArr[this.index[2]].value
				this.show()
				this.$emit('getCategory',this.params)
			},
			show(){
				let first = area[this.index[0]]
				let second = first.children[this.index[1]]
				let third = second.children[this.index[2]]
				this.areaShow = `${first.value}/${second.value}/${third.value}`
			}
		},
		watch:{
			cityData:{
				deep:true,
				handler(){
					this.index[0] = area.findIndex((i)=>{ return i.value === this.cityData.province})
					this.getSecond()
					this.index[1] = this.secondArr.findIndex((i)=>{ return i.value === this.cityData.city})
					this.getThird()
					this.index[2] = this.thirdArr.findIndex((i)=>{ return i.value === this.cityData.region})
					this.show()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		margin: 0 30rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			font-size: 28rpx;
		}
		.title{
			margin-right: 30rpx;
		}
		.picker{
			display: flex;
			justify-content: space-between;
			width: 605rpx;
		}
	}
</style>
