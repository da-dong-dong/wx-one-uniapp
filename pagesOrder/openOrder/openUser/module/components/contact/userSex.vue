<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">性别</view>
			<picker
				@change="enList"
				:value="index" 
				:range="sexArr" 
			>
				<view class="picker">
					<view class="text">{{sexArr[index]}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default{
		props:['sex'],
		data(){
			return{
				index:0,
				sexArr:['男','女'],
			}
		},
		methods:{
			enList(e){
				this.index = e.detail.value
				this.$emit('update:getSex',this.sexArr[this.index])
			}
		},
		watch:{
			sex(){
				if(this.sex === '男'){
					this.index = 0
				}else{
					this.index = 1
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
</style>
