/******************************** 选择器组件 ***************************************/
<template>
	<view>
		<picker @change="change" :value="index" :range="list">
			<view class="textBox">
				<view class="text">{{list[index]}}</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
		</picker>
	</view>
</template>

<script>
	export default{
		externalClasses:['my-img'],
		props:['arrInfo','nowName'],
		computed:{
			dateRange() {
				const {
					arrInfo,
					nowName,
				} = this
				return {
					arrInfo,
					nowName
				}
			}
		},
		data(){
			return{
				// picker
				index:0,
				list:[],
			}
		},
		mounted(){
			this.newArr()
		},
		methods:{
			// 创建门店数组
			newArr(){
				let arr = this.arrInfo.map((i)=>{
					return i.name
				})
				this.list = arr
				// 已经选择来源名字
				if(this.nowName){
					this.index = this.list.findIndex((i)=>{
						return i === this.nowName
					})
				}else{
					this.index = 0
				}
			},
			
			change(e){
				this.index = e.detail.value
				this.arrInfo.some((i)=>{
					if(i.name === this.list[e.detail.value]){
						this.$emit('getId',i)
					}
				})
			},
		},
		watch:{
			dateRange(){
				this.newArr()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.textBox{
		font-size: 28rpx;
		display: flex;
		image{
			width: 15rpx;
			height: 15rpx;
		}				
	}
</style>
