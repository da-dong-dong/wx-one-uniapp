/*********************** 开单选择页面 **************************/
<template>
	<view>
		<image :src="url+'hsBut.png'" mode="" @click="goOpen('WEDDING_DRESS')"></image>
		<image :src="url+'etBut.png'" mode="" @click="goOpen('BABY')"></image>
		<image :src="url+'ymBut.png'" mode="" @click="goOpen('PREGNANT')"></image>
		<image :src="url+'xzBut.png'" mode="" @click="goOpen('PORTRAY')"></image>
		<image :src="url+'fwBut.png'" mode="" @click="goOpen('SERVICE')"></image>
		<image :src="url+'hqBut.png'" mode="" @click="goOpen('WEDDING')"></image>
		<i-message id="message" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/openOrder/',
			};
		},
		methods:{
			goOpen(type){
				console.log(type)
				uni.navigateTo({
					// url:'openUser/openUser?type=' + type
					url: 'openInfo/openInfo?type=' + type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	image{
		width: 690rpx;
		height: 160rpx;
		margin: 15rpx 0;
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
