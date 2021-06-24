<template>
	<!-- 称呼 -->
	<view class="listBox">
		<view class="title">称呼</view>
		<picker @change="change" :value="index" :range="arr" style="width:100%">
			<view class="textBox">
				<view class="text">{{show}}</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
		</picker>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		computed:{
			...mapGetters('shopArr',[
				'get_pay',
			]),
		},
		data(){
			return{
				index: 0,
				arr:['先生','女士'],
				show:'先生'
			}
		},
		methods:{
			change(e){
				this.index = e.detail.value
				this.show = this.arr[this.index]
				if(this.arr[this.index] === '先生'){
					this.$emit('update:getId',true)
				}else{
					this.$emit('update:getId',false)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		display: flex;
		margin: 30rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 28rpx;
		.title{
			width: 270rpx;
		}
		.text{
			display: flex;
			image{
				width: 15rpx;
				height: 15rpx;
				margin-top: 18rpx;
			}			
		}
	}
	.textBox{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		image{
			width: 15rpx;
			height: 15rpx;
			margin-top: 18rpx;
		}				
	}
</style>