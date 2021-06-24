/************  喜爱风格模态框  ************/

<template>
	<view class="bigBox">
		<view class="box">
			<view class="mian">
				<i-checkbox-group :current="current" @change="handleFruitChange">
					<i-checkbox :position="'left'" v-for="item in likeStyle" :key="item.id" :value="item.name">
					</i-checkbox>
				</i-checkbox-group>
				<input type="text" class="inputs" placeholder="请输入更多风格" v-model="val"/>
			</view>
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['enLike'],
		data(){
			return{
				// 风格数组
				likeStyle: [
					{ id: 1, name: '复古典雅' },
					{ id: 2, name: '传统大方' },
					{ id: 3, name: '温文尔雅' },
					{ id: 4, name: '豪华艳丽' }
				],
				current:[],
				val:''
			}
		},
		mounted(){
			if(this.enLike !== '喜爱风格' && this.enLike !== '请选择'){
				let arr  = this.enLike.split('/')
				this.likeStyle.map(item=>{
					if(arr.includes(item.name)){
						this.current.push(item.name) 
					}
				})
				let val = arr.filter(item=>!this.current.includes(item))
				if(val.length>0){
					this.val = val[0]
				}
			}
		},
		methods:{
			handleFruitChange({ detail = {} }) {
				const index = this.current.indexOf(detail.value);
				index === -1 ? this.current.push(detail.value) : this.current.splice(index, 1);
			},
			cancel(){
				this.$emit('cancel')
			},
			ok(){
				if(this.val.length>0){
					this.current.push(this.val)
				}
				this.$emit('ok',this.current)
			}
		},
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
			width: 70%;
			// height: 300rpx;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 50%;
			// transform: translateY(-50%);
			position: relative;
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
			.mian{
				padding: 10rpx;
			}
			.but{
				position: absolute;
				background-color: #FFFFFF;
				display: flex;
				border-top: 1rpx solid #DDDDDD;
				text-align: center;
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
				.cancel{
					width: 50%;
				}
				.ok{
					border-left: 1rpx solid #DDDDDD;
					color: #578ff4;
					width: 50%;
				}
			}
		}
	}
	.inputs{
		border: 1px solid #DDDDDD;
		border-radius: 20rpx;
		padding: 5rpx 20rpx 5rpx;
		font-size: 26rpx;
	}
</style>
