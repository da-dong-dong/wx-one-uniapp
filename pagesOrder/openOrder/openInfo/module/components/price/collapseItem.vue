/******************** 折叠组件 ***********************/
<template>
	<view class="collapseItem">
		<!-- 顶部标题组件 -->
		<view class="titleBox">
			<view class="left">
				<view class="butDown" @tap="trigger">
					<i-icon class="icon" color="#FFFFFF" size="16" type="enter" :i-class="showContent ? 'i-collapse-item-arrow-show' : 'i-collapse-item-arrow'"/>
				</view>
				<input type="text" v-model="info.name" @input="input"/>
			</view>
			<view class="right">
				<view class="addTool" @click="addTool">新增</view>
				<view class="del" @click="delList">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			
		</view>
		<view class="i-collapse-item-content" :class="showContent">
			<priceItemInfo :info="info" :index="index"></priceItemInfo>
		</view>
	</view>
</template>

<script>
	import priceItemInfo from './priceItemInfo.vue'
	export default{
		props:['info','index'],
		components:{
			priceItemInfo
		},
		data(){
			return{
				// 当前数据
				showContent:'i-collapse-item-show-content'
			}
		},
		methods:{
			input() {
				let data = {
					index:this.index,
					info:this.info
				}
				uni.$emit('itemInfo',data)
			},
			// 折叠
			trigger(e){
				this.showContent = (Boolean(this.showContent) ? '' : 'i-collapse-item-show-content')
			},
			addTool(){
				this.$emit('addTool')
			},
			// 打开删除模态框
			delList(){
				this.$emit('del')
			}, 
		},
	}
</script>

<style lang="scss">
	.collapseItem{
		font-size: 28rpx;
		.titleBox{
			padding: 10rpx 0;
			background-color: #61a3ff;
			display: flex;
			justify-content: space-between;
			.left{
				display: flex;
				.butDown{
					margin-top: 12rpx;
					.icon{
						padding: 0 30rpx;
					}
				}
				input{
					color: #FFFFFF;
					background-color: #4188ed;
					width: 210rpx;
					height: 40rpx;
					padding: 8rpx;
					border-radius: 10rpx;
				}
			}
			.right{
				display: flex;
				.addTool{
					color: #61a3ff;
					background-color: #FFFFFF;
					padding: 10rpx;
					height: 40rpx;
					line-height: 40rpx;
					border-radius: 10rpx;
				}
				.del{
					padding: 0 30rpx;
					margin-top: 14rpx;
				}
			}
		}
		.i-collapse-item-content{
			padding:6px;
			display:none
		}
		.i-collapse-item-show-content{
			display:block
		}
	}
	/deep/.i-collapse-item-arrow{
		transition:transform .2s ease-in-out
	}
	/deep/.i-collapse-item-arrow-show{
		transition:transform .2s ease-in-out;
		transform-origin: center center;
		transform:rotate(90deg);
	}
</style>
