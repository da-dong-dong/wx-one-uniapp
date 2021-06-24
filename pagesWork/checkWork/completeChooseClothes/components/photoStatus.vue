<template>
	<view>
		<view class="box">
			<view class="title">选衣状态</view>
			<picker @change="change" :value="index" :range="arr" class="flex_arr">
				<view class="textBox">
					<view class="text">{{show}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default{
		props:['status'],
		data(){
			return{
				statusArr:[
					{
						id:'NOT_PROCESSING',
						name:'未选衣'
					},
					{
						id:'PROCESSING',
						name:'选衣中'
					},
					{
						id:'COMPLETE',
						name:'已选衣'
					}
				],
				arr:['未选衣','选衣中','已选衣'],
				show:'未选衣',
				index:0,
			}
		},
		mounted(){
			this.$emit('update:getId','NOT_PROCESSING')
		},
		methods:{
			change(e){
				this.index = e.detail.value
				this.$emit('update:getId',this.statusArr[this.index].id)
				this.show = this.statusArr[this.index].name
			}
		},
		watch:{
			status(){
				this.index = this.statusArr.findIndex((i)=>{ return i.id === this.status})
				this.show = this.statusArr[this.index].name
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesWork/arrange/components/component.scss';
	.textBox{
		font-size: 28rpx;
		display: flex;
		image{
			width: 15rpx;
			height: 15rpx;
			margin-top: 18rpx;
		}				
	}
</style>
