<template>
	<view>
		<!-- 预约日期 -->
		<view class="box">
			<view class="title">预约日期</view>
			<view class="text" @click="openMyCalendar">
				<view>{{reservationDate | time}}</view>
				<i-icon type="enter" color="#80848f"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['reservationDate','shopId','getType'],
		data(){
			return{
				
			}
		},
		methods:{
			// 打开选日期
			openMyCalendar(){
				uni.navigateTo({
					url:'/pages/calendar/calendar?id=' + this.shopId + '&type=' + this.getType
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
