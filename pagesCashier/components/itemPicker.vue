<template>
	<!-- 消费订单 -->
	<view class="listBox">
		<view class="title">消费订单</view>
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
		props:['itemList'],
		data(){
			return{
				index: 0,
				arr:[],
				show:'请选择'
			}
		},
		methods:{
			change(e){
				this.index = e.detail.value
				this.getParams()
			},
			getParams(){
				this.show = this.arr[this.index]
				this.$emit('update:getId',this.itemList[this.index].id)
				this.$emit('update:getNo',this.itemList[this.index].itemNo)
			},
		},
		watch:{
			itemList(){
				this.arr = this.itemList.map((i)=>{ return i.name})
				this.getParams()
			}
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