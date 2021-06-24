/********************************  套系内容  *************************************/
<template>
		<view class="bigBox">
			<view class="titleBox">
				<view class="butDown" @tap="trigger">
					<view class="title">{{info.name}}</view>
					<i-icon class="icon" color="#FFFFFF" size="16" type="enter" :i-class="showContent ? 'i-collapse-item-arrow-show' : 'i-collapse-item-arrow'"/>
				</view>
				
			</view>
			<view class="i-collapse-item-content" :class="showContent">
				<view class="basisInfo">
					<view class="list">
						<view class="title">价格：</view>
						<view class="text">{{info.price}}</view>
					</view>
					<view class="list">
						<view class="title">精修：</view>
						<view class="text">{{info.refineCount}}</view>
					</view>
					<view class="list">
						<view class="title">拍摄张数：</view>
						<view class="text">{{info.photoCount}}</view>
					</view>
					<view class="list">
						<view class="title">入底：</view>
						<view class="text">{{info.bottomCount}}</view>
					</view>
					<view class="list">
						<view class="title">入册：</view>
						<view class="text">{{info.bookCount}}</view>
					</view>
				</view>
				<assemblyTable :orderItem="item"></assemblyTable>
			</view>
		</view>
</template>

<script>
	import assemblyTable from './assemblyTable.vue'
	import { getOrderItem } from '@/util/api/shop.js'
	export default{
		props:['info'],
		components:{
			assemblyTable
		},
		data(){
			return{
				showContent:'',
				item:{
					orderItemGoods:[],
					orderItemDressInfo:[],
					orderItemPlace:[],
					orderItemService:[],
				},
			}
		},
		mounted(){
			this.getOrderItem()
			uni.$on('changeItem',()=>{
				this.getOrderItem()
			})
		},
		methods:{
			// 折叠
			trigger(e){
				this.showContent = (Boolean(this.showContent) ? '' : 'i-collapse-item-show-content')
			},
			// 获取子订单详情
			getOrderItem(){
				getOrderItem({itemId:this.info.itemId}).then(res=>{
					this.item = res.data.data
				})
			},
		},
	}
</script>

<style lang="scss">
	.bigBox{
		font-size: 28rpx;
		.titleBox{
			.butDown{
				display: flex;
				justify-content: space-between;
				background-color: #61A3FF;
				padding: 15rpx 30rpx;
				.title{
					color: #FFFFFF;
				}
			}
		}
		.basisInfo{
			.list{
				display: flex;
				font-size: 28rpx;
				padding: 0 20rpx;
				padding-top: 15rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1rpx solid #f9f9f9;
				.title{
					width: 270rpx;
				}
			}
		}
	}
	.i-collapse-item-content{
		padding:6px;
		padding-top: 0rpx;
		display:none;
		box-shadow: 1rpx 7rpx 30rpx 6rpx rgba(0, 0, 0, 0.03);
	}
	.i-collapse-item-show-content{
		display:block
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
