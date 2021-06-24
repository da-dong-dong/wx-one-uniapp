<template>
	<view>
		<view class="box">
			<view class="title">通知状态</view>
			<picker @change="change" :value="index" :range="arr" class="flex_arr">
				<view class="picker">
					<view class="text">{{show}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default{
		props:['notice'],
		data(){
			return{
				arr:['已通知','未通知'],
				noticeArr:[
					{id:true,name:'已通知'},
					{id:false,name:'未通知'},
				],
				index:0,
				show:'已通知'
			}
		},
		mounted(){
			this.$emit('update:getId',this.noticeArr[this.index].id)
		},
		methods:{
			change(e){
				this.$emit('update:getId',this.noticeArr[e.detail.value].id)
			}
		},
		watch:{
			notice(){
				this.index = this.noticeArr.findIndex((i)=>{ return this.notice === i.id })
				this.show = this.arr[this.index]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
