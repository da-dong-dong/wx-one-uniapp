/**************************** 拍照类型 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title">拍照类型</view>
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
		props:['process'],
		data(){ 
			return{
				arr:['正常','重拍','补拍','加拍'],
				processArr:[
					{
						id:'NORMAL',
						name:'正常'
					},
					{
						id:'RETAKE',
						name:'重拍'
					},
					{
						id:'MAKE_UP',
						name:'补拍'
					},
					{
						id:'ADD',
						name:'加拍'
					},
				],
				index:0,
				show:'正常'
			}
		},
		mounted(){
			this.$emit('update:getId',this.processArr[this.index].id)
		},
		methods:{
			// 获得当前拍照类型
			change(e){
				this.$emit('update:getId',this.processArr[e.detail.value].id)
			},
		},
		watch:{
			process(){
				this.index = this.processArr.findIndex((i)=>{ return this.process === i.id })
				this.show = this.arr[this.index]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>