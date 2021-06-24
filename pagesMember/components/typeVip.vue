<template>
	<view class="bigBox">
		<view class="box">
			<view class="text">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd flex" v-for="(item, index) in title" :key="index">
						<view>
							<radio :value="item.typeName" :checked="index === current" />
						</view>
						<view>{{item.typeName}}</view>
					</label>
				</radio-group>
			</view>
			<view class="but">
				<view class="cancel" @click="cancelVip">取消</view>
				<view class="ok" @click="okVip">去充值</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['title'],
		data() {
			return {
				current: 0
			};
		},
		methods:{
			radioChange: function(evt) {
				for (let i = 0; i < this.title.length; i++) {
					if (this.title[i].typeName === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			cancelVip(){
				this.$emit('cancelVip')
			},
			okVip(){
				this.$emit('okVip',this.current)
			}
		}
	}
</script>

<style lang="scss">
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
			margin: 50% auto;
			border-radius: 15rpx;
			.text{
				padding: 30rpx;
				height: 200rpx;
				line-height: 100rpx;
				font-size: 36rpx;
				text-align: center;
				font-weight: bold;
				color: #000000;
			}
			.but{
				display: flex;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				border-top: 1rpx solid #f9f9f9;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					border-left: 1rpx solid #f9f9f9;
					color: #61A3FF;
				}
			}
		}
	}

	.flex{
		display: flex;
	}
</style>
