<template>
	<!-- 收款项目 -->
	<view class="listBox">
		<view class="title">{{text === "收款"?"收款项目":"退收款项目"}}</view>
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
		props:['text'],
		computed:{
			...mapGetters('shopArr',[
				'get_receipt',
			]),
		},
		data(){
			return{
				index: 0,
				arr:[],
				receiptArr:[],
				show:'请选择'
			}
		},
		created(){
			this.getArr()
		},
		methods:{
			getArr(){
				let arr = []
				this.receiptArr = this.get_receipt.filter((i)=>{ return i.level === 2 })
				this.arr = this.receiptArr.map((i)=>{ return i.name })
			},
			change(e){
				this.index = e.detail.value
				this.show = this.arr[this.index]
				this.$emit('update:getId',this.show)
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