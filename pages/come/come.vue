<template>
	<view class="bg">
		<i-message id="message" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		mounted(){
			this.getStorageTicket();
		},
		methods:{
			// 获取本地缓存ticket
			getStorageTicket() {
				let that = this
				// 在本地缓存中获取ticket
				uni.getStorage({
					key: 'ticket',
					success: function(res) {
						uni.reLaunch({
							url:'/pages/index/index'
						})
					},
					fail: function(err) {
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				})
			},
		}
	}
</script>
<style>
	page{
		background-color: #61a3ff;
	}
</style>
<style lang="scss">

</style>
