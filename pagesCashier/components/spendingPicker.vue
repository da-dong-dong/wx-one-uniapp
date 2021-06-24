<template>
	<!-- 收款项目 -->
	<view class="listBox">
		<view class="title">{{showText=='收款项目'?'收款项目':'支出项目'}}</view>
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
		props:{
			nowSpending:{
				default:null,
			},
			showText:{
				default:'收款项目',
			}
		},
		computed:{
			...mapGetters('shopArr',[
				'get_spending',
			]),
		},
		data(){
			return{
				index: 0,
				arr:[],
				allArr:[],
				show:'请选择'
			}
		},
		created(){
			this.getArr()
		},
		methods:{
			getArr(){
				let arr = []
				this.allArr = this.get_spending.filter((i)=>{ return i.level === 2 })
				this.arr = this.allArr.map((i)=>{ return i.name })
			},
			change(e){
				this.index = e.detail.value
				this.show = this.arr[this.index]
				this.$emit('update:getId',this.allArr[this.index].id)
				this.$emit('update:getName',this.show)
			}
		},
		watch:{
			nowSpending(){
				this.index = this.allArr.findIndex((i)=>{ return i.id === this.nowSpending})
				this.show = this.arr[this.index]
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
		width: 100%;
		justify-content: space-between;
		image{
			width: 15rpx;
			height: 15rpx;
			margin-top: 18rpx;
		}				
	}
</style>