<template>
	<view>
		<view class="bigBox">
			<view class="left">
				<view class="title">生日</view>
				<view class="text" @click="openCalendar">{{showTime ? showTime : '生日'}}</view>
			</view>
			<switch @change="change" :checked="checked" color="#61a3ff" class="switch"/>
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
		props:['birthdayTime','birthdayLunar'],
		components:{
			uniCalendar
		},
		computed:{
			dataTime(){
				const {
					birthdayTime,
					birthdayLunar
				} = this
				return {
					birthdayTime,
					birthdayLunar					
				}
			}
		},
		data(){
			return{
				checked:false,
				showTime:null,
			}
		},
		methods:{
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				this.showTime = e.fulldate
				this.$emit('update:getBTime',`${this.showTime} 0:0:0`)
			},
			change(e){
				this.checked = e.target.value
				this.checked ? this.$emit('update:getBLunar',1) :this.$emit('update:getBLunar',0)
			}
		},
		watch:{
			dataTime(){
				this.showTime = this.dataTime.birthdayTime.split(/[ ]+/)[0]
				Boolean(this.dataTime.birthdayLunar) ? this.checked = true : this.checked = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
</style>

