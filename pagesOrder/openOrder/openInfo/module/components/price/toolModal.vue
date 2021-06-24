/********************    工具箱模态框      *********************/
<template>
	<view class="bigBox">
		<view class="listBox">
			<view class="close">
				<view class="closeBut" @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			<view class="textBox">
				<view class="text" @click="go('GOODS')">商品</view>
				<view class="text" @click="go('DRESSINFO')">服装</view>
				<view class="text" @click="go('PLACE')">景点</view>
				<view class="text" @click="go('SERVICES')">服务</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['index'],
		data(){
			return{
			}
		},
		methods:{
			// 关闭模态框
			close(){
				this.$emit('close')
			},
			go(type){
				this.$emit('close')
				let url
				if(type === 'GOODS'){
					url = '/pages/tool/tool?type=' + type + '&index=' + this.index + '&commodityUses=UNIVERSAL,EARLY'
				}else{
					url = '/pages/tool/tool?type=' + type + '&index=' + this.index
				}
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		.listBox{
			width: 650rpx;
			margin: 50% auto;
			border-radius: 15rpx;
			background-color: #FFFFFF;
			.close{
				display: flex;
				flex-direction: row-reverse;
				.closeBut{
					margin: 20rpx;
				}
			}
			.textBox{
				margin: 0 30rpx;
				padding-bottom: 30rpx;
				.text{
					font-size: 32rpx;
					line-height: 100rpx;
					border-bottom: 1rpx solid #f9f9f9
				}
			}
		}
	}
</style>
