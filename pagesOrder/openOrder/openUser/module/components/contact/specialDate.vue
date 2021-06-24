<template>
	<view>
		<view class="bigBox">
			<view class="left">
				<view class="title">{{timeTitle}}</view>
				<view class="text" @click="openCalendar">{{showTime ? showTime : timeTitle}}</view>
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
	export default{
		props:['typeTime','type'],
		components:{
			uniCalendar
		},
		data(){
			return{
				timeTitle:null,
				showTime:null,
			}
		},
		mounted(){
			switch(this.type){
				case 'WEDDING_DRESS':
					this.timeTitle = '结婚日期'
					break;
				case 'PREGNANT':
					this.timeTitle = '预产日期'
					break;
			}
		},
		methods:{
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				this.showTime = e.fulldate
				this.$emit('update:getTypeDate',`${this.showTime} 0:0:0`)
			},
		},
		watch:{
			typeTime(){
				this.showTime = this.typeTime.split(/[ ]+/)[0]
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
</style>
