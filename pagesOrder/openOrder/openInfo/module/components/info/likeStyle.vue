<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">风格</view>
			<view class="picker" @click="openLike">
				<view class="text">{{likeStyle}}</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['likeStyle'],
		data(){
			return{

			}
		},
		methods:{
			openLike(){
				this.$emit('open')
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
